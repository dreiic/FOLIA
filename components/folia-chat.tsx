"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { chatCopy } from "../lib/chat/copy";
import { chatHistoryLimit, chatIdleMs, chatInputLimit, chatWarningMs, type ChatMessage, type ChatReply } from "../lib/chat/types";
import { emailUrl, whatsappUrl } from "../lib/content";
import { localizedPath, type Locale } from "../lib/routing";
import { Icon } from "./icons";

type Turn = { question: string; answer?: ChatReply };
type Availability = "checking" | "available" | "unavailable";

const noSubscription = () => () => {};
const alwaysVisible = () => true;
const initiallyHidden = () => false;

function heroHasPassed() {
  const hero = document.getElementById("home-hero");
  return hero !== null && hero.getBoundingClientRect().bottom <= 0;
}

function observeHero(onChange: () => void) {
  const hero = document.getElementById("home-hero");
  if (!hero) return noSubscription();
  const observer = new IntersectionObserver(onChange);
  observer.observe(hero);
  return () => observer.disconnect();
}

export function FoliaChat({ locale, waitForHero }: { locale: Locale; waitForHero: boolean }) {
  const copy = chatCopy[locale];
  const visible = useSyncExternalStore(
    waitForHero ? observeHero : noSubscription,
    waitForHero ? heroHasPassed : alwaysVisible,
    waitForHero ? initiallyHidden : alwaysVisible,
  );
  const id = useId();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<"waiting" | "visible" | "dismissed">("waiting");
  const [availability, setAvailability] = useState<Availability>("checking");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [sessionBusy, setSessionBusy] = useState(false);
  const [sessionError, setSessionError] = useState("");
  const [ended, setEnded] = useState<"confirmed" | "idle">();
  const [idleWarning, setIdleWarning] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [activity, setActivity] = useState(0);
  const startAttempt = useRef<{ contact: string; id: string } | null>(null);
  const sessionRequest = useRef(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const inFlight = useRef<AbortController | null>(null);
  const panelOpen = open && visible;

  useEffect(() => () => inFlight.current?.abort(), []);
  useEffect(() => {
    if (!visible || prompt !== "waiting") return;
    const timer = window.setTimeout(() => setPrompt("visible"), 10_000);
    return () => window.clearTimeout(timer);
  }, [visible, prompt]);
  useEffect(() => {
    if (!panelOpen) return;
    closeButton.current?.focus();
    const controller = new AbortController();
    fetch("/api/chat", { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(8_000)]), cache: "no-store" })
      .then(async (response) => response.ok ? await response.json() : null)
      .then((status) => {
        if (controller.signal.aborted) return;
        setAvailability(status?.available ? "available" : "unavailable");
      })
      .catch(() => { if (!controller.signal.aborted) setAvailability("unavailable"); });
    return () => controller.abort();
  }, [panelOpen]);

  useEffect(() => {
    const panelLog = log.current;
    if (panelLog) panelLog.scrollTop = panelLog.scrollHeight;
  }, [panelOpen, turns, pending, error, sessionError, ended, idleWarning, confirmEnd]);

  useEffect(() => {
    if (!sessionId || ended || pending) return;
    const warning = window.setTimeout(() => setIdleWarning(true), chatWarningMs);
    const expiry = window.setTimeout(() => setEnded("idle"), chatIdleMs);
    return () => {
      window.clearTimeout(warning);
      window.clearTimeout(expiry);
    };
  }, [sessionId, ended, pending, activity]);

  async function changeSession(action: "start" | "continue" | "finish", id: string, fields = {}) {
    if (sessionRequest.current || inFlight.current) return;
    sessionRequest.current = true;
    setSessionBusy(true);
    setSessionError("");
    try {
      const response = await fetch("/api/chat-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, ...fields }),
        signal: AbortSignal.timeout(15_000),
      });
      if (response.status === 409 && action !== "start") {
        setEnded("idle");
        return;
      }
      if (!response.ok) {
        if (response.status === 409) startAttempt.current = null;
        setSessionError(response.status === 422 ? copy.invalidContact : copy.quoteFailed);
        return;
      }

      setIdleWarning(false);
      setConfirmEnd(false);
      if (action === "finish") setEnded("confirmed");
      if (action === "continue") setActivity((value) => value + 1);
      if (action === "start") {
        startAttempt.current = null;
        setSessionId(id);
      }
    } catch {
      setSessionError(copy.quoteFailed);
    } finally {
      sessionRequest.current = false;
      setSessionBusy(false);
    }
  }

  function startChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const contact = { name: String(fields.get("name")).trim(), phone: String(fields.get("phone")).trim() };
    const key = JSON.stringify(contact);
    if (startAttempt.current?.contact !== key) startAttempt.current = { contact: key, id: crypto.randomUUID() };
    void changeSession("start", startAttempt.current.id, contact);
  }

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  function openChat() {
    setPrompt("dismissed");
    setOpen(true);
  }

  async function send(raw: string) {
    const question = raw.trim();
    if (!question || !sessionId || ended || inFlight.current || sessionRequest.current || availability !== "available") return;
    const controller = new AbortController();
    inFlight.current = controller;
    const previous = turns.filter((turn) => turn.answer).slice(-(chatHistoryLimit / 2 - 1));
    const history: ChatMessage[] = previous.flatMap(({ question, answer }) => [
      { role: "user", content: question },
      { role: "assistant", content: answer!.reply },
    ]);
    setError("");
    setIdleWarning(false);
    setConfirmEnd(false);
    setDraft("");
    setPending(true);
    setTurns([...turns, { question }]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Folia-Chat-Session": sessionId },
        body: JSON.stringify({ locale, previousBrief: brief, messages: [...history, { role: "user", content: question }] }),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(25_000)]),
      });
      if (!response.ok) {
        if (response.status === 409) setEnded("idle");
        setError(response.status === 429 ? copy.limited : copy.failed);
        setDraft(question);
        setTurns(turns);
        return;
      }
      const answer: ChatReply = await response.json();
      setTurns([...turns, { question, answer }]);
      setConfirmEnd(answer.handoff);
    } catch {
      if (controller.signal.aborted) return;
      setError(copy.failed);
      setDraft(question);
      setTurns(turns);
    } finally {
      inFlight.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  const brief = turns.findLast((turn) => turn.answer?.brief)?.answer?.brief;
  const inquiry = brief ? `${copy.quote}\n\n${brief}` : copy.quote;
  const disabled = availability !== "available" || pending || sessionBusy || Boolean(ended);

  if (!visible) return null;

  return (
    <div className="folia-chat" data-after-hero={waitForHero ? "" : undefined} onKeyDown={(event) => {
      if (open && event.key === "Escape") { event.stopPropagation(); close(); }
    }}>
      {open && (
        <section id={id} className="folia-chat-panel" role="dialog" aria-modal="false" aria-labelledby={`${id}-title`}>
          <div className="folia-chat-header">
            <h2 id={`${id}-title`}>{copy.title}</h2>
            <button ref={closeButton} type="button" aria-label={copy.close} onClick={close}><Icon name="close" width="18" height="18" /></button>
          </div>
          <div className="folia-chat-log" ref={log} role="log" aria-label={copy.title} tabIndex={0}>
            <p className="folia-chat-bubble">{copy.welcome}</p>
            {availability === "checking" && <p className="folia-chat-status">{copy.checking}</p>}
            {availability === "unavailable" && <p className="folia-chat-status">{copy.unavailable}</p>}
            {availability === "available" && !sessionId && (
              <form className="folia-chat-handoff folia-chat-inquiry" onSubmit={startChat}>
                <p>{copy.startNotice}</p>
                <label>{copy.quoteName}<input name="name" autoComplete="name" required maxLength={120} disabled={sessionBusy} /></label>
                <label>{copy.quotePhone}<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} disabled={sessionBusy} /></label>
                <button type="submit" className="button button-primary" disabled={sessionBusy}>{copy.startChat}</button>
              </form>
            )}
            {sessionId && !ended && !turns.length && (
              <div className="folia-chat-suggestions">
                {copy.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void send(suggestion)}>{suggestion}</button>)}
              </div>
            )}
            {turns.map(({ question, answer }, index) => (
              <div className="folia-chat-turn" key={index}>
                <p className="folia-chat-bubble folia-chat-visitor">{question}</p>
                {answer && (
                  <div className="folia-chat-answer">
                    <p className="folia-chat-bubble">{answer.reply}</p>
                    {answer.links.length > 0 && (
                      <div className="folia-chat-links">
                        {answer.links.map(({ href, label }) => <Link key={href} href={href} className="text-link" onClick={close}>{label} <Icon name="arrow" width="15" height="15" /></Link>)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {pending && <p className="folia-chat-status">{copy.thinking}</p>}
            {error && <p className="folia-chat-status" role="alert">{error}</p>}
            {sessionError && <p className="folia-chat-status" role="alert">{sessionError}</p>}
            {ended && <p className="folia-chat-bubble" role="status">{ended === "confirmed" ? copy.quoteSent : copy.idleEnded}</p>}
            {!ended && idleWarning && (
              <div className="folia-chat-handoff">
                <p className="folia-chat-bubble" role="status">{copy.stillThere}</p>
                <button className="button button-primary" type="button" disabled={sessionBusy} onClick={() => void changeSession("continue", sessionId)}>{copy.keepChatting}</button>
              </div>
            )}
            {!ended && !idleWarning && confirmEnd && (
              <div className="folia-chat-handoff">
                <p className="folia-chat-bubble">{copy.confirmHandoff}</p>
                <div className="folia-chat-contact">
                  <button className="button button-primary" type="button" disabled={sessionBusy} onClick={() => void changeSession("finish", sessionId)}>{copy.yes}</button>
                  <button className="text-link" type="button" disabled={sessionBusy} onClick={() => void changeSession("continue", sessionId)}>{copy.no}</button>
                </div>
              </div>
            )}
          </div>
          <div className="folia-chat-controls">
            {sessionId && !ended && (
              <form onSubmit={submit} className="folia-chat-form">
                <input aria-label={copy.input} placeholder={copy.input} value={draft} maxLength={chatInputLimit} onChange={(event) => setDraft(event.target.value)} disabled={disabled} />
                <button className="button button-primary" type="submit" aria-label={copy.send} disabled={disabled || !draft.trim()}><Icon name="arrow" width="18" height="18" /></button>
              </form>
            )}
            <div className="folia-chat-contact">
              <a href={whatsappUrl(inquiry)} className="text-link" target="_blank" rel="noreferrer"><Icon name="whatsapp" width="17" height="17" />{brief ? copy.withBrief : copy.whatsapp}</a>
              <a href={emailUrl(copy.subject, inquiry)} className="text-link"><Icon name="mail" width="17" height="17" />{copy.email}</a>
            </div>
            {availability !== "unavailable" && <p className="folia-chat-disclosure">{copy.disclosure} <Link href={localizedPath(locale, "/privacy")} onClick={close}>{copy.privacy}</Link></p>}
          </div>
        </section>
      )}
      {prompt === "visible" && !open && (
        <div className="folia-chat-invitation">
          <button type="button" className="folia-chat-invitation-text" onClick={openChat}>
            <Icon name="message" className="folia-chat-invitation-icon" width="22" height="22" />
            <span>{copy.prompt}<span className="folia-chat-invitation-action">{copy.openPrompt} <Icon name="arrow" width="15" height="15" /></span></span>
          </button>
          <button type="button" className="folia-chat-invitation-dismiss" aria-label={copy.dismissPrompt} onClick={() => {
            setPrompt("dismissed");
            launcher.current?.focus();
          }}><Icon name="close" width="15" height="15" /></button>
        </div>
      )}
      <button ref={launcher} type="button" className="folia-chat-launcher" aria-expanded={open} aria-controls={open ? id : undefined}
        onClick={open ? close : openChat}>
        <Icon name={open ? "close" : "message"} width="19" height="19" />
        {open ? copy.close : copy.launcher}
      </button>
    </div>
  );
}

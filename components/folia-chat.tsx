"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { chatCopy } from "../lib/chat/copy";
import { chatHistoryLimit, chatInputLimit, type ChatMessage, type ChatReply } from "../lib/chat/types";
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
  const [inquiryAvailable, setInquiryAvailable] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const inquiryAttempt = useRef<{ body: string; id: string } | null>(null);
  const sendingInquiry = useRef(false);
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
        setInquiryAvailable(status?.inquiryAvailable === true);
      })
      .catch(() => { if (!controller.signal.aborted) setAvailability("unavailable"); });
    return () => controller.abort();
  }, [panelOpen]);

  useEffect(() => {
    const panelLog = log.current;
    if (panelLog) panelLog.scrollTop = panelLog.scrollHeight;
  }, [panelOpen, turns, pending, error, inquiryOpen, inquiryStatus]);

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
    if (!question || inFlight.current || sendingInquiry.current || availability !== "available") return;
    const controller = new AbortController();
    inFlight.current = controller;
    const previous = turns.filter((turn) => turn.answer).slice(-(chatHistoryLimit / 2 - 1));
    const history: ChatMessage[] = previous.flatMap(({ question, answer }) => [
      { role: "user", content: question },
      { role: "assistant", content: answer!.reply },
    ]);
    setError("");
    setDraft("");
    setPending(true);
    setTurns([...turns, { question }]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, previousBrief: brief, messages: [...history, { role: "user", content: question }] }),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(25_000)]),
      });
      if (!response.ok) {
        setError(response.status === 429 ? copy.limited : copy.failed);
        setDraft(question);
        setTurns(turns);
        return;
      }
      const answer: ChatReply = await response.json();
      setTurns([...turns, { question, answer }]);
      if (answer.handoff) setInquiryOpen(true);
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
  const disabled = availability !== "available" || pending || inquiryStatus === "sending";
  const showInquiry = inquiryAvailable && (inquiryOpen || turns.at(-1)?.answer?.handoff);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingInquiry.current || inquiryStatus === "sent" || !brief) return;

    const fields = new FormData(event.currentTarget);
    const body = JSON.stringify({ mode: "chat", name: fields.get("name"), phone: fields.get("phone"), summary: brief });
    if (inquiryAttempt.current?.body !== body) inquiryAttempt.current = { body, id: crypto.randomUUID() };
    sendingInquiry.current = true;
    setInquiryStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": inquiryAttempt.current.id },
        body,
        signal: AbortSignal.timeout(15_000),
      });
      const result = response.ok ? await response.json() : null;
      if (result?.ok === true) inquiryAttempt.current = null;
      setInquiryStatus(result?.ok === true ? "sent" : "failed");
    } catch {
      setInquiryStatus("failed");
    } finally {
      sendingInquiry.current = false;
    }
  }

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
            {availability === "available" && !turns.length && (
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
                    {answer.handoff && !inquiryAvailable && (
                      <div className="folia-chat-handoff">
                        <a className="button button-primary" href={emailUrl(copy.subject, inquiry)}>
                          <Icon name="mail" width="17" height="17" />{copy.handoffEmail}
                        </a>
                        <p>{copy.handoffNote}</p>
                      </div>
                    )}
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
            {inquiryStatus === "sent" && <p className="folia-chat-bubble" role="status">{copy.quoteSent}</p>}
            {brief && showInquiry && inquiryStatus !== "sent" && (
              <form className="folia-chat-handoff folia-chat-inquiry" onSubmit={submitInquiry}>
                <p>{copy.quoteContactNote}</p>
                <label>{copy.quoteName}<input name="name" autoComplete="name" required maxLength={120} disabled={inquiryStatus === "sending"} /></label>
                <label>{copy.quotePhone}<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} disabled={inquiryStatus === "sending"} /></label>
                <button type="submit" className="button button-primary" disabled={pending || inquiryStatus === "sending"}>
                  <Icon name="mail" width="17" height="17" />{inquiryStatus === "sending" ? copy.quoteSending : copy.quoteSend}
                </button>
                {inquiryStatus === "failed" && <p role="alert">{copy.quoteFailed}</p>}
              </form>
            )}
          </div>
          <div className="folia-chat-controls">
            {availability !== "unavailable" && (
              <form onSubmit={submit} className="folia-chat-form">
                <input aria-label={copy.input} placeholder={copy.input} value={draft} maxLength={chatInputLimit} onChange={(event) => setDraft(event.target.value)} disabled={disabled} />
                <button className="button button-primary" type="submit" aria-label={copy.send} disabled={disabled || !draft.trim()}><Icon name="arrow" width="18" height="18" /></button>
              </form>
            )}
            <div className="folia-chat-contact">
              {brief && inquiryAvailable && !showInquiry && inquiryStatus !== "sent" && (
                <button type="button" className="text-link" onClick={() => setInquiryOpen(true)}>{copy.quoteStart}</button>
              )}
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

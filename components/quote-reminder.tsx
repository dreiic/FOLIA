"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Icon } from "./icons";

const dismissalKey = "folia-quote-reminder-dismissed";

export function QuoteReminder({ isHome, href, title, body, action, dismissLabel }: {
  isHome: boolean;
  href: string;
  title: string;
  body: string;
  action: string;
  dismissLabel: string;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(dismissalKey)) return;
    } catch {
      // The reminder still works if the browser blocks storage.
    }

    function reveal() {
      const hero = isHome ? document.querySelector(".parallax") : null;
      if (hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.5) return;
      setVisible(true);
      window.removeEventListener("scroll", reveal);
    }

    const timer = window.setTimeout(() => {
      if (isHome) window.addEventListener("scroll", reveal, { passive: true });
      reveal();
    }, 10_000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", reveal);
    };
  }, [isHome]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(dismissalKey, "1");
    } catch {
      // Dismissal is still applied on the current page.
    }
  }

  return (
    <div className="quote-reminder-region" aria-live="polite">
      {visible && (
        <aside className="quote-reminder" aria-labelledby={id} onKeyDown={(event) => {
          if (event.key === "Escape") dismiss();
        }}>
          <button type="button" className="quote-dismiss" aria-label={dismissLabel} onClick={dismiss}>
            <Icon name="close" width="17" height="17" />
          </button>
          <h2 id={id}>{title}</h2>
          <p>{body}</p>
          <Link href={href} className="text-link" prefetch={false} onNavigate={dismiss}>
            {action} <Icon name="arrow" width="16" height="16" />
          </Link>
        </aside>
      )}
    </div>
  );
}

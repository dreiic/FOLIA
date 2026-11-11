"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";

export function CollectionRail({ children, labelledBy, previousLabel, nextLabel }: { children: ReactNode; labelledBy: string; previousLabel: string; nextLabel: string }) {
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ start: true, end: true });

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    function update() {
      if (!element) return;
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const next = { start: scrollLeft <= 2, end: scrollWidth - clientWidth - scrollLeft <= 2 };
      setPosition((current) => current.start === next.start && current.end === next.end ? current : next);
    }

    update();
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number) {
    const element = track.current;
    const first = element?.children[0];
    const second = element?.children[1];
    if (!element || !first || !second) return;

    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    element.scrollBy({ left: direction * step, behavior });
  }

  return (
    <div className="collection-rail">
      <ul className="collection-track" id={id} ref={track} aria-labelledby={labelledBy} tabIndex={0}>
        {children}
      </ul>
      <div className="collection-controls">
        <button type="button" aria-controls={id} aria-label={previousLabel} aria-disabled={position.start}
          onClick={() => { if (!position.start) move(-1); }}>
          <Icon name="arrow" className="arrow-back" />
        </button>
        <button type="button" aria-controls={id} aria-label={nextLabel} aria-disabled={position.end}
          onClick={() => { if (!position.end) move(1); }}>
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

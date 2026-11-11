"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Icon } from "./icons";

export function ParallaxHero({ business, discover }: { business: string; discover: string }) {
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = parallaxRef.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 761px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      if (!context.conditions?.motion) return;

      const layers = element.querySelector<HTMLElement>("[data-parallax-layers]");
      if (!layers) return;
      const strength = context.conditions.desktop ? 1 : 0.5;
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "folia-hero",
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ].forEach(({ layer, yPercent }) => {
        timeline.to(layers.querySelectorAll(`[data-parallax-layer="${layer}"]`), {
          yPercent: yPercent * strength,
          ease: "none",
        }, 0);
      });

      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const lenis = new Lenis({
        anchors: { offset: -headerHeight },
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      });
      const update = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    }, element);

    return () => media.revert();
  }, []);

  return (
    <section id="home-hero" className="parallax" ref={parallaxRef} aria-label={`Folia · ${business}`}>
      <div className="parallax__visuals">
        <div className="parallax__layers" data-parallax-layers>
          <Image src="/parallax/restaurant-background.webp" alt="" fill unoptimized loading="eager" fetchPriority="high"
            className="parallax__layer-img" data-parallax-layer="1" aria-hidden="true" draggable={false} />
          <Image src="/parallax/restaurant-middle.webp" alt="" fill unoptimized loading="eager"
            className="parallax__layer-img" data-parallax-layer="2" aria-hidden="true" draggable={false} />
          <div data-parallax-layer="3" className="parallax__layer-title">
            <h1 className="parallax__title">
              <span className="sr-only">Folia · {business}</span>
              <span className="parallax__logo" aria-hidden="true" />
            </h1>
          </div>
          <Image src="/parallax/restaurant-foreground.webp" alt="" fill unoptimized loading="eager"
            className="parallax__layer-img" data-parallax-layer="4" aria-hidden="true" draggable={false} />
        </div>
        <div className="parallax__fade" aria-hidden="true" />
        <div className="parallax__caption">
          <p>{business}</p>
          <a href="#hero-introduction">{discover} <Icon name="arrow" width="17" height="17" /></a>
        </div>
      </div>
    </section>
  );
}

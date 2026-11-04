"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: SSR and the no-JS page always show all content.
export default function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading, .direction-card, .about-title, .values article, .founder-photo, .founder-copy, .film-note, .film-player, .invitation-copy > :not(h2), .trial > div, .lead-form, .faq > div, .contacts > div, .detail-body, [data-word]",
      ),
    );
    const show = (element: HTMLElement) => {
      element.dataset.motion = "shown";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    elements.forEach((element) => {
      // Never hide content already visible, including deep links and restored scroll.
      if (
        preference.matches ||
        element.getBoundingClientRect().top < window.innerHeight
      )
        return;
      element.dataset.motion = "pending";
      observer.observe(element);
    });
    const revealAll = () => {
      if (preference.matches) elements.forEach(show);
    };
    const revealFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const pending = event.target.closest<HTMLElement>(
        '[data-motion="pending"]',
      );
      if (pending) show(pending);
    };
    preference.addEventListener("change", revealAll);
    document.addEventListener("focusin", revealFocus);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", revealFocus);
      elements.forEach((element) => delete element.dataset.motion);
    };
  }, [pathname]);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
const words = [
  "Чувствовать",
  "Двигаться",
  "Вдохновлять",
  "Быть собой",
  "Любить",
  "Творить",
  "Танцевать",
  "Зажигать",
  "Побеждать",
];

export default function Ticker() {
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.offscreen = String(!entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="ticker" ref={ref} data-paused={paused}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {words.map((word) => (
              <span className="ticker-item" key={word}>
                {word}
                <i>✦</i>
              </span>
            ))}
            <span className="ticker-logo">VOLTA</span>
            <i>✦</i>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="ticker-toggle"
        aria-label="Пауза бегущей строки"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      </button>
    </div>
  );
}

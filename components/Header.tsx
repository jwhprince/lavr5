"use client";

import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    const close = () => {
      setOpen(false);
      toggle.current?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        header.current?.querySelectorAll<HTMLElement>("a, button") || [],
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = originalOverflow;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header ref={header} className="header" data-menu-open={open}>
      <Link
        href="/"
        className="wordmark"
        aria-label="VOLTA — на главную"
        onClick={() => setOpen(false)}
      >
        VOLTA<span>ШКОЛА ТАНЦЕВ</span>
      </Link>
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Закрыть" : "Меню"}</span>
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <nav
        id="navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Главная навигация"
        onClick={() => setOpen(false)}
      >
        <Link href="/#directions">Направления</Link>
        <Link href="/#about">О школе</Link>
        <Link href="/#founder">Тренер</Link>
        <Link href="/#students">Ученики</Link>
        <Link href="/#contacts">Контакты</Link>
      </nav>
      <Link
        className="header-cta"
        href="/#trial"
        onClick={() => setOpen(false)}
      >
        Пробный урок <span><ArrowIcon /></span>
      </Link>
    </header>
  );
}

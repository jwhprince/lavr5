"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/assets";

const photos = [
  { file: "students-with-coach", alt: "Анастасия с двумя учениками и их дипломами", caption: "Вместе с тренером" },
  { file: "student-first-steps", alt: "Двое юных учеников в танцевальном зале", caption: "Первые шаги вместе" },
  { file: "students-team", alt: "Ученики с медалями рядом с Анастасией", caption: "Поддержка команды" },
  { file: "student-practice", alt: "Ученица в жёлтом платье отрабатывает танцевальную позу в зале", caption: "На занятии" },
  { file: "students", alt: "Танцевальная пара с кубком и медалями", caption: "Наши достижения" },
  { file: "students-awards", alt: "Две ученицы с наградами на соревнованиях", caption: "Моменты, которыми гордимся" },
];

export default function StudentAlbum() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const photo = photos[active ?? 0];

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  const move = (step: number) => setActive((index) => ((index ?? 0) + step + photos.length) % photos.length);

  return (
    <>
      <div className="album-grid">
        {photos.map((item, index) => (
          <figure key={item.file}>
            <button type="button" className="album-photo" aria-label={`Открыть фото: ${item.alt}`} aria-haspopup="dialog" onClick={() => { setActive(index); dialog.current?.showModal(); }}>
              <Image src={asset(`/images/${item.file}.webp`)} alt={item.alt} fill sizes="(max-width: 760px) 44vw, 29vw" />
              <span className="album-expand" aria-hidden="true">+</span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className="album-dialog" aria-label="Альбом «Ученики»" onClose={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        {active !== null && (
          <div className="album-viewer">
            <button type="button" className="album-close" aria-label="Закрыть альбом" onClick={() => dialog.current?.close()} autoFocus>×</button>
            <div className="album-full-photo">
              <Image src={asset(`/images/${photo.file}.webp`)} alt={photo.alt} fill sizes="(max-width: 760px) 92vw, 80vw" />
            </div>
            <div className="album-controls">
              <button type="button" aria-label="Предыдущее фото" onClick={() => move(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
              <p aria-live="polite">{photo.caption}<span>{active + 1} / {photos.length}</span></p>
              <button type="button" aria-label="Следующее фото" onClick={() => move(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

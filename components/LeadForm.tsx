"use client";
import ArrowIcon from "@/components/ArrowIcon";
import { useState } from "react";
import Link from "next/link";

export default function LeadForm({
  direction = "Помогите выбрать",
}: {
  direction?: string;
}) {
  const [previewed, setPreviewed] = useState(false);
  return (
    <form
      className="lead-form"
      onSubmit={(event) => {
        event.preventDefault();
        setPreviewed(true);
      }}
    >
      <div className="form-heading">
        <span className="eyebrow">ВАШ ПЕРВЫЙ ШАГ · ДЕМО</span>
        <h3>Давай знакомиться</h3>
        <p>
          Скоро здесь можно будет выбрать направление и записаться на пробный
          урок.
        </p>
      </div>
      <label>
        Как к вам обращаться
        <input
          autoComplete="off"
          placeholder="Ваше имя"
          disabled
          aria-describedby="demo-note"
        />
      </label>
      <label>
        Номер телефона
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          disabled
          aria-describedby="demo-note"
        />
      </label>
      <label>
        Что хочется попробовать
        <select name="direction" defaultValue={direction}>
          <option>Помогите выбрать</option>
          <option>Бальные танцы</option>
          <option>Baby-dance</option>
          <option>Латина</option>
        </select>
      </label>
      <p className="consent">
        Перед записью будут доступны{" "}
        <Link href="/consent">согласие на обработку данных</Link> и{" "}
        <Link href="/privacy">политика конфиденциальности</Link>.
      </p>
      <button className="button" type="submit">
        Посмотреть, как это работает <span><ArrowIcon /></span>
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {previewed
          ? "После запуска мы свяжемся с вами и подберём время первого занятия. Сейчас это демонстрация — заявка не отправлена."
          : ""}
      </p>
      <p className="demo-note" id="demo-note">
        Тестовая версия. Приём заявок пока не подключён; персональные данные не
        собираются.
      </p>
    </form>
  );
}

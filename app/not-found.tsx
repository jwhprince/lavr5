import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section legal">
      <span className="eyebrow">404 / ШАГ В СТОРОНУ</span>
      <h1>
        Здесь пока
        <br />
        <em>никто не танцует.</em>
      </h1>
      <p>Такой страницы нет. Вернёмся к знакомству с VOLTA?</p>
      <Link href="/" className="button">
        На главную ↗
      </Link>
    </main>
  );
}

import Ticker from "@/components/Ticker";
import { asset } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { directions, faqs, siteUrl } from "@/lib/content";
export const metadata = { alternates: { canonical: "/" } };
const mapUrl =
  "https://yandex.ru/maps/?text=" +
  encodeURIComponent("Москва, Пятницкое шоссе, 25к1");
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Школа танцев VOLTA",
    url: siteUrl,
    image: `${siteUrl}/images/logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Пятницкое шоссе, 25к1",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Танцевальные направления",
      itemListElement: directions.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title },
      })),
    },
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow hero-location">
            <span className="dot" /> МОСКВА · МИТИНО
          </div>
          <h1>
            <span className="hero-kicker">Школа танцев VOLTA</span>Танец
            становится
            <br />
            <em>частью тебя.</em>
          </h1>
          <p className="hero-intro">
            Первый шаг. Новое чувство. Ваша история.
            <br />
            Откройте себя в движении — вместе с VOLTA.
          </p>
          <a href="#trial" className="button">
            Бесплатный пробный урок <span>↗</span>
          </a>
          <div className="hero-bottom">
            <span>Бальные танцы · Baby-dance · Латина</span>
            <a href="#directions" aria-label="Перейти к направлениям">
              ↓
            </a>
          </div>
        </div>
        <div className="hero-brand">
          <Image
            src={asset("/images/logo.webp")}
            alt="VOLTA — школа танцев, фирменный логотип"
            fill
            preload
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="brand-caption" aria-hidden="true">
            <span>ИСКУССТВО БЫТЬ СОБОЙ</span>
            <span>01 / VOLTA</span>
          </div>
        </div>
      </section>
      <Ticker />
      <section id="directions" className="section directions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / НАЙДИТЕ СВОЙ РИТМ</span>
            <h2>
              Три направления,
              <br />
              <em>одна любовь к танцу.</em>
            </h2>
          </div>
          <p>
            Для первых открытий и больших целей.
            <br />
            Выберите то, что откликается именно вам.
          </p>
        </div>
        <div className="direction-grid">
          {directions.map((d, i) => (
            <Link
              href={`/directions/${d.slug}`}
              className="direction-card"
              key={d.slug}
            >
              <div className={`direction-image direction-image-${d.slug}`}>
                <Image
                  src={asset(`/images/${d.image}.webp`)}
                  alt={d.title + " в школе VOLTA"}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <span className="image-index">0{i + 1}</span>
                <span className="circle-arrow">↗</span>
              </div>
              <span className="eyebrow">{d.subtitle}</span>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section id="about" className="about section">
        <div className="about-title">
          <span className="eyebrow">02 / БОЛЬШЕ, ЧЕМ ДВИЖЕНИЕ</span>
          <h2>
            Здесь вас заметят
            <br />
            <em>и помогут раскрыться.</em>
          </h2>
          <div className="about-photo">
            <Image
              src={asset("/images/hero.webp")}
              alt="Анастасия с партнёром во время танцевального выступления"
              fill
              sizes="(max-width:760px) 88vw, 35vw"
            />
          </div>
        </div>
        <div className="values">
          {[
            [
              "Индивидуальный подход",
              "У каждого свой темп и своя история. Помогаем раскрыться и почувствовать уверенность — с самого первого занятия.",
            ],
            [
              "Тренер + родитель",
              "Мы на одной стороне. После занятий делимся обратной связью по каждому ученику: замечаем успехи и обсуждаем следующие шаги.",
            ],
            [
              "Педагоги, которые вдохновляют",
              "Опыт, внимание к технике и любовь к своему делу. Рядом тренер, который поддержит и поможет двигаться дальше.",
            ],
            [
              "От зала — к новым вершинам",
              "Участие в мероприятиях и соревнованиях помогает ученикам расти, ставить цели и проживать свои моменты на паркете.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="value-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="founder" className="founder section">
        <div className="founder-photo">
          <Image
            src={asset("/images/founder.webp")}
            alt="Маврина Анастасия, основатель и тренер школы VOLTA"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <span className="portrait-caption">
            АНАСТАСИЯ МАВРИНА / ОСНОВАТЕЛЬ VOLTA
          </span>
        </div>
        <div className="founder-copy">
          <span className="eyebrow">03 / ЧЕЛОВЕК ЗА ИМЕНЕМ</span>
          <h2>
            С опытом на паркете.
            <br />
            <em>С вниманием к вам.</em>
          </h2>
          <h3 className="founder-name">Анастасия Маврина</h3>
          <p className="founder-role">
            Руководитель и основатель школы.
            <br />
            Тренер по танцевальному спорту.
          </p>
          <div className="stats">
            <div>
              <strong>12+</strong>
              <span>лет преподавания</span>
            </div>
            <div>
              <strong>М</strong>
              <span>класс мастерства</span>
            </div>
            <div>
              <strong>КМС</strong>
              <span>кандидат в мастера спорта</span>
            </div>
          </div>
          <ul className="credentials">
            <li>Победитель международных и всероссийских соревнований</li>
            <li>Серебряный призёр Чемпионата Самарской области</li>
            <li>
              Сертифицированный специалист «Тренер по танцевальному спорту»
            </li>
          </ul>
          <a className="text-link" href="#trial">
            Познакомиться на пробном уроке ↗
          </a>
        </div>
      </section>
      <section className="film section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 / ПОЧУВСТВУЙТЕ АТМОСФЕРУ</span>
            <h2>
              Меньше слов.
              <br />
              <em>Больше танца.</em>
            </h2>
          </div>
          <p>
            Моменты, ради которых
            <br />
            хочется возвращаться в зал.
          </p>
        </div>
        <div className="film-layout">
          <div className="film-note">
            <span className="eyebrow">В СВОЁМ РИТМЕ</span>
            <h3>
              От первого шага
              <br />
              <em>до любимого движения.</em>
            </h3>
            <p>
              Пробуем, учимся, поддерживаем друг друга. Так проходит обычное
              занятие в VOLTA.
            </p>
            <a href="#trial" className="text-link">
              Попробовать вместе с нами ↗
            </a>
          </div>
          <div className="film-player">
            <video
              controls
              playsInline
              preload="none"
              poster={asset("/images/video-poster.webp")}
              aria-label="Видео танцевального занятия VOLTA"
            >
              <source src={asset("/lesson.mp4")} type="video/mp4" />
              Ваш браузер не поддерживает видео.{" "}
              <a href={asset("/lesson.mp4")}>Открыть видео</a>
            </video>
          </div>
        </div>
        <div className="film-caption">
          <span>VOLTA В ДВИЖЕНИИ</span>
          <span>НАША ИСТОРИЯ — В КАЖДОМ ШАГЕ</span>
        </div>
      </section>
      <section className="invitation">
        <Image
          src={asset("/images/together.webp")}
          alt="Ученики школы танцев вместе"
          fill
          sizes="100vw"
        />
        <div className="invitation-copy">
          <span className="eyebrow">А ВДРУГ ЭТО ВАШЕ?</span>
          <h2>
            <span
              data-word
              style={{ "--word-index": 0 } as React.CSSProperties}
            >
              «У меня
            </span>{" "}
            <span
              data-word
              style={{ "--word-index": 1 } as React.CSSProperties}
            >
              получится?»
            </span>
            <br />
            <em>
              <span
                data-word
                style={{ "--word-index": 2 } as React.CSSProperties}
              >
                Давайте
              </span>{" "}
              <span
                data-word
                style={{ "--word-index": 3 } as React.CSSProperties}
              >
                попробуем.
              </span>
            </em>
          </h2>
          <p>
            Не нужно уметь танцевать, чтобы начать.
            <br />
            Приходите на бесплатный пробный урок.
          </p>
          <a className="button light" href="#trial">
            Сделать первый шаг <span>↗</span>
          </a>
        </div>
      </section>
      <section id="trial" className="trial section">
        <div>
          <span className="eyebrow">05 / ВАША ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</span>
          <h2>
            Сегодня — знакомство.
            <br />
            <em>Завтра — новая история.</em>
          </h2>
          <p className="trial-intro">
            Знакомство с танцем — без спешки
            <br />и лишних ожиданий.
          </p>
          <div className="trial-step">
            <span>01</span>
            <p>
              <strong>Индивидуальный формат</strong>Внимание тренера — только
              вам.
            </p>
          </div>
          <div className="trial-step">
            <span>02</span>
            <p>
              <strong>Обратная связь после урока</strong>Обсудим впечатления и
              следующие шаги.
            </p>
          </div>
          <div className="trial-step">
            <span>03</span>
            <p>
              <strong>Бесплатно</strong>Чтобы познакомиться и почувствовать.
            </p>
          </div>
        </div>
        <LeadForm />
      </section>
      <section className="faq section">
        <div>
          <span className="eyebrow">ПЕРЕД ПЕРВЫМ ШАГОМ</span>
          <h2>
            Можно
            <br />
            <em>спросить?</em>
          </h2>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="contacts" className="contacts section">
        <div>
          <span className="eyebrow">06 / ВСТРЕТИМСЯ В VOLTA</span>
          <h2>
            Танцы.
            <br />
            <em>Рядом с вами.</em>
          </h2>
          <address>Москва, Пятницкое шоссе, 25к1</address>
          <p>
            <span className="metro">М</span> Митино · около 5 минут пешком*
          </p>
          <p className="contact-note">
            Ждём жителей Митино и соседнего Красногорска. От «Волоколамской» и
            «Пятницкого шоссе» выбирайте удобный маршрут до школы.
          </p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Построить маршрут в Яндекс Картах ↗
          </a>
          <small>
            * Ориентир из материалов школы. Время зависит от выхода из метро и
            маршрута.
          </small>
        </div>
        <div className="map">
          <iframe
            title="Адрес VOLTA на Яндекс Картах"
            src={
              "https://yandex.ru/map-widget/v1/?text=" +
              encodeURIComponent("Москва, Пятницкое шоссе, 25к1") +
              "&z=16"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href={mapUrl} target="_blank" rel="noreferrer">
            Пятницкое шоссе, 25к1 <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}

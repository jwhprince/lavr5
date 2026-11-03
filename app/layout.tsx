import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteUrl, published } from '@/lib/content';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Школа танцев VOLTA в Митино — бесплатный пробный урок',template:'%s | VOLTA'},description:'Бальные танцы, Baby-dance и латина в школе VOLTA. Москва, Пятницкое шоссе, 25к1, рядом с метро Митино. Индивидуальный бесплатный пробный урок.',robots:{index:published,follow:published},openGraph:{type:'website',locale:'ru_RU',siteName:'VOLTA — школа танцев',images:[{url:'/images/og.jpg',width:1200,height:630,alt:'Школа танцев VOLTA'}]},verification:{yandex:process.env.YANDEX_VERIFICATION}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body id="top"><a className="skip-link" href="#main">Перейти к содержимому</a><Header/>{children}<Footer/></body></html>}

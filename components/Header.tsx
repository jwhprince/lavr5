'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function Header(){const [open,setOpen]=useState(false);return <header className="header"><Link href="/" className="wordmark" aria-label="VOLTA — на главную">VOLTA<span>ШКОЛА ТАНЦЕВ</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'Закрыть ✕':'Меню ☰'}</button><nav id="navigation" className={open?'nav open':'nav'} aria-label="Главная навигация" onClick={()=>setOpen(false)}><Link href="/#directions">Направления</Link><Link href="/#about">О школе</Link><Link href="/#founder">Тренер</Link><Link href="/#contacts">Контакты</Link></nav><a className="header-cta" href="/#trial">Пробный урок <span>↗</span></a></header>}

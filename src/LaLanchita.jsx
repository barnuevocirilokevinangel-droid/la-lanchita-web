import React, { useEffect, useState, useMemo } from 'react';
import {
  Fish,
  Anchor,
  Mic,
  Wine,
  MapPin,
  Phone,
  Clock,
  Award,
  Flame,
  Ship,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  Users,
  Music,
  ShieldCheck,
  Navigation,
  Sun,
  Moon,
  Star,
  Mail,
  ChefHat,
  Lightbulb,
  Quote,
  Play,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  Check,
} from 'lucide-react';
import logoImg from './assets/logo-lanchita.png';
import { subscribeHeroPrincipal } from './firebase.js';

/* =========================================================================
   CONFIGURACIÓN DEL NEGOCIO
   ========================================================================= */
const CONFIG = {
  name: 'La Lanchita',
  fullName: 'Restaurant Cevichería La Lanchita',
  founder: 'Marco Antonio Pucutay Bermúdez',
  whatsapp: '51943000000',
  phoneDisplay: '+51 943 000 000',
  email: 'reservas@lalanchita.pe',
  address: 'Av. Pacífico s/n, Urb. Buenos Aires',
  city: 'Nuevo Chimbote, Áncash – Perú',
  mapsQuery: 'Cevicheria La Lanchita Nuevo Chimbote',
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
};

/* Fotos del local */
const IMAGES = {
  logo: '/logo-lanchita.png',
  salon: '/images/salon.jpg',
  terraza: '/images/terraza-karaoke.jpg',
  historia: '/images/carta-historia.jpg',
};

const DEFAULT_MESSAGE = 'Hola La Lanchita, quiero hacer una reserva';

const waLink = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  CONFIG.mapsQuery
)}`;
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  CONFIG.mapsQuery
)}&output=embed`;

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Tradición', href: '#tradicion' },
  { label: 'Carta Marina', href: '#carta' },
  { label: 'Terraza Karaoke', href: '#terraza' },
  { label: 'Ubicación', href: '#ubicacion' },
];

/* Estilos de texto neón cálido */
const NEON_TEXT =
  'text-amber-200 [text-shadow:0_0_6px_rgba(253,230,138,0.9),0_0_18px_rgba(245,158,11,0.8),0_0_42px_rgba(217,119,6,0.7)]';
const NEON_SOFT =
  'text-amber-300 [text-shadow:0_0_10px_rgba(245,158,11,0.6),0_0_28px_rgba(217,119,6,0.45)]';

/* =========================================================================
   PLATOS ESTRELLA INTERACTIVOS DEL HERO
   ========================================================================= */
const HERO_STAR_DISHES = [
  {
    id: 'hero-ceviche-clasico',
    name: 'Ceviche Clásico',
    badge: 'Plato Bandera',
    badgeColor: 'from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30',
    desc: 'Cortes gruesos de pesca del día, leche de tigre al instante, camote glaseado y choclo tierno.',
    price: 38,
    priceDisplay: 'S/ 38.00',
    image: '/images/platos/ceviche-clasico.jpg',
    floatAnimation: 'animate-float-1',
    offsetY: 'lg:-translate-y-4',
  },
  {
    id: 'hero-chicharron-mixto',
    name: 'Chicharrón Mixto',
    badge: 'Más Crocante',
    badgeColor: 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30',
    desc: 'Pota, pescado fresco y langostinos crocantes con yucas doradas y salsa tártara de la casa.',
    price: 42,
    priceDisplay: 'S/ 42.00',
    image: '/images/platos/chicharron-mixto.jpg',
    floatAnimation: 'animate-float-2',
    offsetY: 'lg:translate-y-6',
  },
  {
    id: 'hero-arroz-mariscos',
    name: 'Arroz con Mariscos',
    badge: 'Fuego Vivo',
    badgeColor: 'from-orange-600/20 to-amber-600/10 text-orange-400 border-orange-600/30',
    desc: 'Salteado al wok con mixtura selecta, culantro de huerto, ají panca y lluvia de parmesano.',
    price: 45,
    priceDisplay: 'S/ 45.00',
    image: '/images/platos/arroz-mariscos.jpg',
    floatAnimation: 'animate-float-3',
    offsetY: 'lg:-translate-y-2',
  },
];

/* =========================================================================
   DATA: CARTA MARINA
   ========================================================================= */
const MENU = {
  ceviches: {
    label: 'Ceviches & Tiraditos',
    icon: Fish,
    items: [
      {
        id: 'ceviche-clasico-lanchita',
        name: 'Ceviche Clásico La Lanchita',
        desc: 'Pesca del día cortada al momento, limón recién exprimido, ají limo y cebolla morada crocante. Con camote glaseado y choclo serrano.',
        price: 38,
        chef: true,
      },
      {
        id: 'ceviche-mixto-chimbotano',
        name: 'Ceviche Mixto Chimbotano',
        desc: 'Pescado, pulpo, langostinos y conchas en leche de tigre de la casa, con un toque de rocoto y cancha tostada.',
        price: 45,
        chef: false,
      },
      {
        id: 'tiradito-aji-amarillo',
        name: 'Tiradito al Ají Amarillo',
        desc: 'Láminas finas de pescado bañadas en una crema sedosa de ají amarillo, culantro fresco y aceite de oliva.',
        price: 40,
        chef: true,
      },
      {
        id: 'leche-tigre-levantamuertos',
        name: 'Leche de Tigre Levantamuertos',
        desc: 'El concentrado más potente del puerto: mariscos, chicharrón de pota y un golpe de rocoto. Ideal para recargar energías.',
        price: 25,
        chef: false,
      },
    ],
  },
  chicharrones: {
    label: 'Chicharrones & Pescados',
    icon: Flame,
    items: [
      {
        id: 'chicharron-pescado',
        name: 'Chicharrón de Pescado',
        desc: 'Trozos dorados y crujientes por fuera, jugosos por dentro. Con yuca frita, sarsa criolla y salsa tártara artesanal.',
        price: 36,
        chef: true,
      },
      {
        id: 'chicharron-mixto-marino',
        name: 'Chicharrón Mixto Marino',
        desc: 'Pescado, pota, langostinos y calamar en fritura ligera, acompañados de yucas doradas y nuestra cremita de rocoto.',
        price: 42,
        chef: false,
      },
      {
        id: 'pescado-a-lo-macho',
        name: 'Pescado a lo Macho',
        desc: 'Filete frito cubierto con una salsa cremosa de mariscos, ají panca y un toque de pisco. Servido con arroz blanco.',
        price: 48,
        chef: true,
      },
      {
        id: 'sudado-pescado-norteno',
        name: 'Sudado de Pescado Norteño',
        desc: 'Pescado fresco cocido a fuego lento con tomate, cebolla, chicha de jora y ají amarillo. Reconfortante y lleno de sabor.',
        price: 40,
        chef: false,
      },
    ],
  },
  rondas: {
    label: 'Rondas & Dúos Marinos',
    icon: Anchor,
    items: [
      {
        id: 'ronda-marina-lanchita',
        name: 'Ronda Marina La Lanchita',
        desc: 'Para compartir: ceviche, chicharrón de pescado, arroz con mariscos y causa de langostinos. El festín familiar del puerto.',
        price: 95,
        chef: true,
      },
      {
        id: 'duo-ceviche-chicharron',
        name: 'Dúo Ceviche + Chicharrón',
        desc: 'La pareja perfecta: ceviche clásico y chicharrón de pescado crocante en un solo plato generoso.',
        price: 46,
        chef: true,
      },
      {
        id: 'trio-marino',
        name: 'Trío Marino',
        desc: 'Ceviche, arroz con mariscos y jalea mixta. Tres clásicos chimbotanos para quienes lo quieren todo.',
        price: 55,
        chef: false,
      },
      {
        id: 'jalea-real-compartir',
        name: 'Jalea Real para Compartir',
        desc: 'Montaña de mariscos y pescado frito sobre yuca, coronada con sarsa criolla, limón y salsas de la casa.',
        price: 68,
        chef: false,
      },
    ],
  },
};

/* =========================================================================
   ÍCONOS DE REDES (SVG inline)
   ========================================================================= */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z" />
  </svg>
);

/* =========================================================================
   COMPONENTES REUTILIZABLES
   ========================================================================= */
function SectionTitle({ eyebrow, title, subtitle, dark = false, center = true }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? 'text-amber-400' : 'text-wood'
        }`}
      >
        <span className={`h-px w-8 ${dark ? 'bg-amber-400' : 'bg-wood'}`} />
        {eyebrow}
        <span className={`h-px w-8 ${dark ? 'bg-amber-400' : 'bg-wood'}`} />
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-ivory' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function WhatsAppButton({ message, children, className = '', variant = 'primary' }) {
  const variants = {
    primary:
      'bg-wood text-white shadow-lg shadow-wood-dark/25 hover:bg-wood-dark hover:shadow-xl hover:shadow-wood-dark/35',
    light: 'bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white hover:text-slate-900',
    outline: 'border border-wood text-wood hover:bg-wood hover:text-white',
  };
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`}
    >
      <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      {children}
    </a>
  );
}

/* =========================================================================
   1. TOP BAR & NAVBAR
   ========================================================================= */
function Header({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-night px-4 py-2 text-center text-[11px] font-medium tracking-wide text-amber-200/90 sm:text-xs">
        <span className="inline-flex items-center gap-2">
          <Anchor className="h-3.5 w-3.5 shrink-0" />
          30 Años de Tradición Pesquera en Nuevo Chimbote
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Desde 1995</span>
        </span>
      </div>

      {/* Navbar */}
      <nav
        className={`border-b transition-all duration-300 ${
          scrolled ? 'border-wood/15 bg-ivory/95 shadow-sm backdrop-blur-md' : 'border-transparent bg-ivory'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <a
            href="#"
            className="group flex items-center transition-transform hover:opacity-95"
            onClick={() => setOpen(false)}
            aria-label="La Lanchita – Ir al inicio"
          >
            <img
              src={logoImg}
              alt="La Lanchita - Desde 1995"
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium text-slate-700 transition-colors hover:text-wood after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-wood after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            {/* Botón Carrito en Navbar */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 px-4 py-2.5 text-xs font-bold text-orange-700 transition-all duration-300 hover:bg-orange-100 hover:scale-105 active:scale-95"
              aria-label="Ver mi pedido"
            >
              <ShoppingBag className="h-4 w-4 text-orange-600" />
              <span>Mi Pedido</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[11px] font-extrabold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <WhatsAppButton>Reservar Mesa / WhatsApp</WhatsAppButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative rounded-lg p-2 text-orange-700 hover:bg-orange-50"
              aria-label="Ver carrito"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-slate-800 transition hover:bg-wood/10"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden bg-ivory transition-[max-height] duration-300 lg:hidden ${
            open ? 'max-h-[28rem] border-t border-wood/15' : 'max-h-0'
          }`}
        >
          <ul className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-amber-50 hover:text-wood"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>
            ))}
            <li className="pt-3">
              <WhatsAppButton className="w-full">Reservar Mesa / WhatsApp</WhatsAppButton>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

/* =========================================================================
   2. HERO CINEMÁTICO PREMIUM CON PLATOS FLOTANTES INTERACTIVOS (image_89.png)
   ========================================================================= */
function Hero({ onAddToCart }) {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDishId, setActiveDishId] = useState(null);

  // Suscripción en tiempo real a Firebase Firestore + 500ms suave para evitar parpadeo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    const unsub = subscribeHeroPrincipal((data) => {
      if (data) {
        setHeroData(data);
      }
    });

    return () => {
      clearTimeout(timer);
      unsub();
    };
  }, []);

  const tituloOriginal = heroData?.titulo || 'SABOR QUE DESPIERTA EL MAR';
  const subtitulo =
    heroData?.subtitulo ||
    'Pesca del día cortada al instante, limón sutil recién exprimido y el secreto de 30 años de tradición.';

  // Función para destacar palabras clave en gradiente naranja encendido
  const renderStyledTitle = (rawText) => {
    const highlightPhrase = 'DESPIERTA EL MAR';
    const upper = rawText.toUpperCase();

    if (upper.includes(highlightPhrase)) {
      const idx = upper.indexOf(highlightPhrase);
      const before = rawText.substring(0, idx);
      const phrase = rawText.substring(idx, idx + highlightPhrase.length);
      const after = rawText.substring(idx + highlightPhrase.length);

      return (
        <>
          {before}
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(249,115,22,0.45)]">
            {phrase}
          </span>
          {after}
        </>
      );
    }

    // Si no contiene la frase exacta, destaca las últimas palabras
    const words = rawText.split(' ');
    if (words.length > 2) {
      const first = words.slice(0, words.length - 3).join(' ');
      const last = words.slice(words.length - 3).join(' ');
      return (
        <>
          {first}{' '}
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(249,115,22,0.45)]">
            {last}
          </span>
        </>
      );
    }

    return rawText;
  };

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[92vh] flex items-center overflow-hidden bg-[#0f111a] py-16 lg:py-24"
    >
      {/* 1. Fondo con patrón de cuadrícula de bajo contraste */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* 2. Resplandores ambientales cálidos-naranja de fondo */}
      <div className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute top-1/3 right-0 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14)_0%,transparent_65%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Contenedor Principal */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ========================================================
              COLUMNA IZQUIERDA: TEXTO, CTA Y BADGES
             ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 z-10 text-center lg:text-left">
            {/* Tag superior en vivo */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span>30 Años de Tradición · Nuevo Chimbote</span>
            </div>

            {/* Título gigante con gran peso visual */}
            <h1
              className={`font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-white transition-opacity duration-500 ${
                loading ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {renderStyledTitle(tituloOriginal)}
            </h1>

            {/* Subtítulo en tono gris/blanco roto suave */}
            <p
              className={`mt-6 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-slate-300 max-w-xl mx-auto lg:mx-0 transition-opacity duration-500 ${
                loading ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {subtitulo}
            </p>

            {/* Botón principal "VER CARTA DIGITAL" y acción secundaria */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#carta"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-8 py-4 text-base font-extrabold text-white shadow-[0_0_22px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(249,115,22,0.65)] active:scale-95"
              >
                <span>VER CARTA DIGITAL</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <Play className="h-3.5 w-3.5 fill-white text-white ml-0.5" />
                </span>
              </a>

              <a
                href={waLink('Hola La Lanchita, quiero hacer una consulta o pedido')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-orange-400" />
                <span>Reservas / Pedidos</span>
              </a>
            </div>

            {/* Tres badges inferiores discretos con íconos de Lucide */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">100% Pesca Fresca</p>
                  <p className="text-[11px] text-slate-400">Del mar a tu plato</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                  <Flame className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Preparado al Instante</p>
                  <p className="text-[11px] text-slate-400">Fuego y limón vivo</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Pedido directo</p>
                  <p className="text-[11px] text-slate-400">Por WhatsApp fácil</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMNA DERECHA: FILA DE PLATOS INTERACTIVOS (3D & GLOW)
             ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-6 lg:mt-0">
            {/* Halo ambiental centrado en la fila de platos */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-600/10 blur-3xl pointer-events-none" />

            {/* Título de sección interactiva en móvil */}
            <div className="text-center mb-4 lg:hidden">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                ✦ Especialidades del Capitán · Toca un plato
              </span>
            </div>

            {/* Contenedor de los 3 platos estrella en cascada/fila */}
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-5 overflow-x-auto pb-4 pt-2 lg:overflow-visible no-scrollbar">
              {HERO_STAR_DISHES.map((dish) => {
                const isHovered = activeDishId === dish.id;

                return (
                  <div
                    key={dish.id}
                    onMouseEnter={() => setActiveDishId(dish.id)}
                    onMouseLeave={() => setActiveDishId(null)}
                    className={`group relative flex flex-col items-center shrink-0 cursor-pointer transition-all duration-500 ${dish.floatAnimation} ${dish.offsetY}`}
                    style={{ width: 'clamp(140px, 28vw, 190px)' }}
                  >
                    {/* Partículas de vapor ascendentes en hover */}
                    <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <span className="h-3 w-1 rounded-full bg-orange-400/70 blur-[1px] animate-steam" />
                      <span className="h-4 w-1 rounded-full bg-amber-300/80 blur-[1px] animate-steam [animation-delay:0.3s]" />
                      <span className="h-3.5 w-1 rounded-full bg-white/70 blur-[1px] animate-steam [animation-delay:0.6s]" />
                    </div>

                    {/* Estructura del plato sobre base de piedra oscura */}
                    <div className="relative rounded-full p-2 sm:p-2.5 bg-gradient-to-b from-stone-800 via-stone-900 to-black ring-1 ring-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-110 group-hover:ring-orange-500/60 group-hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]">
                      {/* Resplandor naranja de fondo en el plato */}
                      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-orange-600/30 to-amber-500/30 blur-xl opacity-30 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125" />

                      {/* Imagen circular de alta calidad */}
                      <div className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40 xl:h-44 xl:w-44 overflow-hidden rounded-full aspect-square border border-white/15">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115 group-hover:rotate-3"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                      </div>

                      {/* Badge flotante en el borde del plato */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                          {dish.badge}
                        </span>
                      </div>
                    </div>

                    {/* Minicard descriptiva y precio emergente */}
                    <div className="mt-4 flex flex-col items-center text-center transition-all duration-300">
                      <h3 className="font-display text-sm sm:text-base font-bold text-white transition-colors group-hover:text-orange-400">
                        {dish.name}
                      </h3>

                      <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400 max-w-[170px] hidden sm:block">
                        {dish.desc}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-display font-extrabold text-sm sm:text-base text-amber-400 drop-shadow">
                          {dish.priceDisplay}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart({
                              id: dish.id,
                              name: dish.name,
                              price: dish.price,
                            });
                          }}
                          className="inline-flex items-center justify-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:scale-105 active:scale-95"
                          title={`Agregar ${dish.name} al pedido`}
                        >
                          <Plus className="h-3 w-3" />
                          <span>Pedir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mensaje de interacción inferior */}
            <p className="mt-6 text-center text-xs text-slate-400/80">
              ✦ Haz clic en <span className="text-orange-400 font-semibold">+ Pedir</span> para agregar directamente a tu pedido
            </p>
          </div>

        </div>
      </div>

      {/* Ola marina decorativa de transición a la sección blanca inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          className="w-full h-8 sm:h-12 text-ivory fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,32 C320,64 720,0 1080,36 C1260,54 1380,24 1440,32 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

/* =========================================================================
   3. HISTORIA & TRAYECTORIA
   ========================================================================= */
function History() {
  const stats = [
    { icon: Award, value: '30', unit: 'Años', label: 'de historia', desc: 'Sirviendo a Chimbote y Nuevo Chimbote desde 1995.' },
    { icon: Fish, value: '+10,000', unit: '', label: 'ceviches servidos', desc: 'Cada uno preparado al momento, como el primero.' },
    { icon: Anchor, value: '3', unit: 'Niveles', label: 'de experiencia', desc: 'Salón familiar, ambiente privado y terraza karaoke.' },
  ];

  return (
    <section id="tradicion" className="scroll-mt-28 bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Marco rústico con la reseña real */}
          <figure className="group relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rotate-[-2deg] rounded-2xl bg-gradient-to-br from-wood-light via-wood to-wood-dark opacity-90 shadow-xl transition-transform duration-500 group-hover:rotate-0" />
            <div className="relative rounded-xl bg-gradient-to-br from-wood to-wood-dark p-2.5 shadow-2xl shadow-wood-dark/30">
              <div className="overflow-hidden rounded-lg border-2 border-amber-200/40 bg-ivory">
                <img
                  src={IMAGES.historia}
                  alt={`Reseña de los 30 años de La Lanchita, fundada por ${CONFIG.founder}`}
                  className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Sello 1995 */}
            <div className="absolute -bottom-6 -right-4 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-ivory bg-night text-center shadow-xl sm:-right-6 sm:h-28 sm:w-28">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-300">Desde</span>
              <span className="font-display text-2xl font-bold text-ivory sm:text-3xl">1995</span>
            </div>
            <figcaption className="sr-only">Carta conmemorativa de los 30 años de La Lanchita</figcaption>
          </figure>

          {/* Reseña */}
          <div>
            <SectionTitle center={false} eyebrow="Nuestra Tradición" title="Nacimos del mar, crecimos con Chimbote" />

            <blockquote className="relative mb-8 rounded-2xl border-l-4 border-wood bg-amber-50/70 p-6 shadow-sm">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-wood/20" />
              <p className="font-display text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
                Fundado por <span className="text-wood-dark">{CONFIG.founder}</span> en Chimbote, pioneros en traer el
                ceviche a las noches chimbotanas.
              </p>
            </blockquote>

            <div className="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                Todo comenzó en <strong className="text-slate-900">1995</strong>, inspirado en los pescadores
                chimbotanos que cada madrugada regresaban al muelle con lo mejor del Pacífico. De ese homenaje nació{' '}
                <strong className="text-slate-900">La Lanchita</strong>: una cocina honesta, de pescado fresco del día y
                limón recién exprimido.
              </p>
              <p>
                Cuando el ceviche era cosa solo del mediodía, nos atrevimos a llevarlo a la noche. Así nos convertimos en{' '}
                <strong className="text-wood">pioneros de las noches marinas</strong>, y hoy, entre mesas de madera y
                murales del mar, tres generaciones de familias siguen sentándose a nuestra mesa.
              </p>
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div className="mt-20 grid gap-5 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, unit, label, desc }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-wood/15 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-wood/40 hover:shadow-xl hover:shadow-wood-dark/10"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-100 opacity-60 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-night text-amber-400 transition-colors duration-300 group-hover:bg-wood group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 font-display text-4xl font-bold text-slate-900">
                  {value} <span className="text-2xl text-wood">{unit}</span>
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. CARTA MARINA CON AGREGADO DIRECTO AL CARRITO
   ========================================================================= */
function DishCard({ dish, onAddToCart, inCartCount }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-wood/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-wood/40 hover:shadow-2xl hover:shadow-wood-dark/10">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-wood-dark">
          {dish.name}
        </h3>
        <span className="shrink-0 rounded-lg bg-amber-50 px-3 py-1 font-display text-lg font-bold text-wood">
          S/. {dish.price}
        </span>
      </div>

      {dish.chef && (
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-wood-dark ring-1 ring-amber-200">
          <ChefHat className="h-3.5 w-3.5" />
          Recomendación del Chef
        </span>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{dish.desc}</p>

      {/* Acciones de Pedido */}
      <div className="mt-6 border-t border-dashed border-wood/20 pt-4 space-y-2">
        <button
          type="button"
          onClick={() => onAddToCart(dish)}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-bold transition-all duration-300 ${
            inCartCount > 0
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
              : 'bg-orange-500/10 text-orange-700 hover:bg-orange-500 hover:text-white'
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{inCartCount > 0 ? `En Pedido (${inCartCount}) · Agregar otro` : 'Agregar al Pedido'}</span>
        </button>

        <WhatsAppButton
          variant="outline"
          className="w-full text-xs py-2"
          message={`Hola La Lanchita, quiero pedir: ${dish.name} (S/. ${dish.price})`}
        >
          Pedir por WhatsApp directo
        </WhatsAppButton>
      </div>
    </article>
  );
}

function MenuSection({ onAddToCart, cart }) {
  const [active, setActive] = useState('ceviches');
  const current = MENU[active];

  return (
    <section id="carta" className="scroll-mt-28 bg-gradient-to-b from-[#F6F0E4] to-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Carta Marina"
          title="Nuestros Platos Estrella"
          subtitle="Recetas que han pasado de generación en generación, preparadas con la pesca fresca que llega cada mañana."
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Categorías de la carta"
          className="-mx-4 mb-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0"
        >
          {Object.entries(MENU).map(([key, cat]) => {
            const Icon = cat.icon;
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-wood-dark text-amber-100 shadow-lg shadow-wood-dark/30'
                    : 'border border-wood/25 bg-white text-slate-700 hover:border-wood hover:text-wood'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div key={active} role="tabpanel" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {current.items.map((dish) => (
            <DishCard
              key={dish.id || dish.name}
              dish={dish}
              onAddToCart={onAddToCart}
              inCartCount={cart[dish.id || dish.name]?.count || 0}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          * Precios referenciales en soles. Sujetos a disponibilidad de la pesca del día.
        </p>
      </div>
    </section>
  );
}

/* =========================================================================
   5. TERRAZA & KARAOKE – 3ER PISO
   ========================================================================= */
function Terrace() {
  const features = [
    { icon: Wine, title: 'Coctelería de autor', desc: 'Pisco sour, chilcanos y cócteles de la casa preparados al momento en nuestra barra.' },
    { icon: Anchor, title: 'Barra de madera rústica', desc: 'El corazón del 3er piso: madera cálida, banquetas altas y el mejor ambiente para brindar.' },
    { icon: Lightbulb, title: 'Luces cálidas', desc: 'Iluminación ámbar y neón que convierten cada noche en una celebración.' },
    { icon: Music, title: 'Noches de karaoke', desc: 'Sonido envolvente profesional y zona lounge para cantar con los tuyos.' },
  ];

  return (
    <section id="terraza" className="relative isolate scroll-mt-28 overflow-hidden bg-night py-20 text-ivory sm:py-28">
      <img
        src={IMAGES.terraza}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-20 blur-md"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/90 to-night" />

      {/* Luces cálidas ámbar */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-wood-light/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            <Moon className="h-3.5 w-3.5" /> 3er Piso · Noches La Lanchita
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Terraza <span className={NEON_SOFT}>&</span>{' '}
            <span className={`font-sans font-extrabold uppercase tracking-[0.12em] ${NEON_TEXT}`}>Karaoke</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            El punto de encuentro para tus noches de canto, cócteles y buen ambiente. Celebra cumpleaños, aniversarios o
            simplemente el fin de semana en un espacio seguro, privado y con el sabor de siempre.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="group relative lg:col-span-3">
            <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-amber-400/60 via-wood-light/40 to-transparent opacity-70 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-amber-400/30">
              <img
                src={IMAGES.terraza}
                alt="Terraza del 3er piso con barra de madera iluminada, letrero de neón Karaoke y zona lounge"
                className="h-[380px] w-full object-cover object-[center_48%] transition-transform duration-700 group-hover:scale-105 sm:h-[480px] lg:h-[540px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-night/60 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400 text-night shadow-[0_0_30px_rgba(245,158,11,0.7)]">
                  <Mic className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ivory">Barra · Lounge · Karaoke</p>
                  <p className="text-sm text-slate-300">Jueves a sábado desde las 7:00 p.m.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.06] hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.4)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-wood-dark/40 ring-1 ring-amber-500/30">
                    <Icon className="h-5 w-5 text-amber-300 transition-transform duration-300 group-hover:scale-110 [filter:drop-shadow(0_0_6px_rgba(245,158,11,0.8))]" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ivory">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-amber-400" /> Ambiente seguro y privado para eventos
            </div>

            <a
              href={waLink('Hola La Lanchita, quiero reservar la Terraza Karaoke (3er piso) para un evento / cumpleaños')}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-wood-light via-wood to-wood-dark px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_-5px_rgba(217,119,6,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_-5px_rgba(245,158,11,0.9)]"
            >
              <Mic className="h-4 w-4" />
              Reservar Terraza para Eventos / Cumpleaños
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. UBICACIÓN & CONTACTO
   ========================================================================= */
function Location() {
  const schedules = [
    { icon: Sun, title: 'Almuerzos Marinos', days: 'Lunes a Domingo', hours: '11:00 a.m. – 5:00 p.m.' },
    { icon: Moon, title: 'Noches de Terraza Karaoke', days: 'Jueves a Sábado', hours: '7:00 p.m. – 2:00 a.m.' },
  ];

  const cardCls =
    'rounded-2xl border border-wood/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg';

  return (
    <section id="ubicacion" className="scroll-mt-28 bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Visítanos"
          title="Ubicación & Contacto"
          subtitle="Te esperamos en Nuevo Chimbote con la mesa servida y el mar en cada plato."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <div className={cardCls}>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-wood">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Dirección</h3>
                  <p className="mt-1 text-slate-600">{CONFIG.address}</p>
                  <p className="text-slate-600">{CONFIG.city}</p>
                </div>
              </div>
            </div>

            {schedules.map(({ icon: Icon, title, days, hours }) => (
              <div key={title} className={cardCls}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-night text-amber-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 text-wood" /> {days}
                    </p>
                    <p className="font-display text-lg font-bold text-slate-900">{hours}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className={cardCls}>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-wood">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">Reservas</h3>
                  <a href={`tel:+${CONFIG.whatsapp}`} className="mt-1 block text-slate-600 hover:text-wood">
                    {CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-night px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                <Navigation className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Cómo llegar con Google Maps
              </a>
              <WhatsAppButton className="flex-1">Reservar</WhatsAppButton>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border-4 border-white shadow-lg ring-1 ring-wood/20 lg:col-span-3">
            <iframe
              title="Mapa de La Lanchita en Nuevo Chimbote"
              src={mapsEmbed}
              className="absolute inset-0 h-full w-full grayscale-[30%] transition duration-500 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. FOOTER
   ========================================================================= */
function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: 'Facebook', href: CONFIG.facebook, Icon: FacebookIcon },
    { label: 'Instagram', href: CONFIG.instagram, Icon: InstagramIcon },
    { label: 'TikTok', href: CONFIG.tiktok, Icon: TikTokIcon },
  ];

  return (
    <footer className="bg-night text-slate-300">
      <div className="h-1 bg-gradient-to-r from-wood-dark via-wood-light to-wood-dark" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="inline-block transition-transform hover:opacity-95" aria-label="La Lanchita – Ir al inicio">
              <div className="inline-flex items-center rounded-xl bg-ivory/95 p-2 shadow-sm ring-1 ring-amber-500/20">
                <img
                  src={logoImg}
                  alt="La Lanchita - Desde 1995"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Fundado en 1995 por {CONFIG.founder}. Treinta años llevando el auténtico sabor del mar chimbotano a la
              mesa de las familias, de día y de noche.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-wood-light hover:bg-wood hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white">Navegación</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-amber-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  {CONFIG.address}, {CONFIG.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <a href={`tel:+${CONFIG.whatsapp}`} className="hover:text-amber-400">
                  {CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <a href={`mailto:${CONFIG.email}`} className="hover:text-amber-400">
                  {CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                <span>Lun – Dom · 11:00 a.m.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {CONFIG.fullName}. Todos los derechos reservados.
          </p>
          <p className="inline-flex items-center gap-2">
            <Anchor className="h-3.5 w-3.5 text-amber-500" />
            Tradición marina chimbotana desde 1995
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   SISTEMA DE CARRITO DE PEDIDOS ('TU PEDIDO' S/ 0.00 Y WHATSAPP ESTRUCTURADO)
   ========================================================================= */
function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const items = Object.values(cart);
  const total = items.reduce((acc, curr) => acc + curr.item.price * curr.count, 0);

  // Mensaje estructurado de WhatsApp limpio y amigable
  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let text = `🌊 *PEDIDO LA LANCHITA - WEB OFICIAL*\n`;
    text += `¡Hola! Deseo realizar el siguiente pedido marino:\n\n`;

    items.forEach((entry, idx) => {
      const sub = (entry.item.price * entry.count).toFixed(2);
      text += `${idx + 1}. *${entry.count}x* ${entry.item.name} — S/ ${sub}\n`;
    });

    text += `\n💰 *TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;
    text += `📍 *Dirección o Mesa:* (Completar)\n`;
    text += `🛵 *Tipo:* Delivery / Recojo en Local\n`;
    text += `¡Muchas gracias!`;

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-white/10 text-white flex flex-col shadow-2xl">
          {/* Header del Carrito */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">Tu Pedido Marino</h3>
                <p className="text-xs text-slate-400">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'} seleccionados
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Cerrar pedido"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lista de Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
                  <ShoppingBag className="h-8 w-8 text-slate-500" />
                </div>
                <p className="font-bold text-white text-base">Tu pedido está vacío</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Explora la carta y agrega tus ceviches o chicharrones favoritos haciendo clic en "Pedir".
                </p>
                <a
                  href="#carta"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-orange-600"
                >
                  Ver Carta Marina
                </a>
              </div>
            ) : (
              items.map(({ item, count }) => (
                <div
                  key={item.id || item.name}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="flex-1 pr-3">
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-xs text-amber-400 font-semibold mt-0.5">
                      S/ {item.price.toFixed(2)} c/u
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Controles de cantidad */}
                    <div className="flex items-center rounded-lg bg-white/10 p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id || item.name, count - 1)}
                        className="h-6 w-6 rounded flex items-center justify-center text-slate-300 hover:bg-white/20 transition"
                        aria-label="Disminuir"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">{count}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id || item.name, count + 1)}
                        className="h-6 w-6 rounded flex items-center justify-center text-slate-300 hover:bg-white/20 transition"
                        aria-label="Aumentar"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id || item.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito con Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-stone-950 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white">
                  <span>Total estimado</span>
                  <span className="text-xl text-amber-400 font-display">S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all hover:scale-102 hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] active:scale-98"
              >
                <MessageCircle className="h-5 w-5 fill-white text-emerald-800" />
                <span>Confirmar Pedido por WhatsApp</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition"
              >
                Vaciar pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   WIDGET FLOTANTE INFERIOR DERECHO ('TU PEDIDO' S/ 0.00 Y WHATSAPP)
   ========================================================================= */
function FloatingOrderWidget({ cart, onOpenCart }) {
  const items = Object.values(cart);
  const totalCount = items.reduce((acc, curr) => acc + curr.count, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.item.price * curr.count, 0);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {/* Botón interactivo de "TU PEDIDO" sincronizado en tiempo real */}
      <button
        type="button"
        onClick={onOpenCart}
        className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-stone-900 via-stone-950 to-black p-2 pr-4 border border-orange-500/40 text-white shadow-2xl shadow-orange-950/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] active:scale-95"
      >
        <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
          <ShoppingBag className="h-5 w-5" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-orange-600 shadow animate-bounce">
              {totalCount}
            </span>
          )}
        </span>

        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
            {totalCount > 0 ? `${totalCount} ${totalCount === 1 ? 'plato' : 'platos'}` : 'Tu Pedido'}
          </p>
          <p className="font-display text-sm sm:text-base font-extrabold text-white leading-none">
            S/ {totalPrice.toFixed(2)}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Botón flotante clásico de WhatsApp para reservas */}
      <a
        href={waLink(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reservar por WhatsApp"
        className="group flex items-center gap-2"
      >
        <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          ¡Reserva tu mesa!
        </span>
        <span className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-transform duration-300 hover:scale-110 active:scale-95">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
          <MessageCircle className="relative h-6 w-6" />
        </span>
      </a>
    </div>
  );
}

/* =========================================================================
   PÁGINA PRINCIPAL
   ========================================================================= */
export default function LaLanchita() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Funciones de Carrito
  const handleAddToCart = (item) => {
    const id = item.id || item.name;
    setCart((prev) => {
      const existing = prev[id];
      if (existing) {
        return {
          ...prev,
          [id]: { ...existing, count: existing.count + 1 },
        };
      }
      return {
        ...prev,
        [id]: { item, count: 1 },
      };
    });
  };

  const handleUpdateQuantity = (id, newCount) => {
    if (newCount <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], count: newCount },
      };
    });
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-ivory">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main>
        <Hero onAddToCart={handleAddToCart} />
        <History />
        <MenuSection onAddToCart={handleAddToCart} cart={cart} />
        <Terrace />
        <Location />
      </main>
      <Footer />

      {/* Widget flotante de pedido y WhatsApp */}
      <FloatingOrderWidget
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Drawer modal de Tu Pedido */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

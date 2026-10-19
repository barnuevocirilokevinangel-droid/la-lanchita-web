import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import logoImg from './assets/logo-lanchita.png';

/* =========================================================================
   CONFIGURACIÓN DEL NEGOCIO (edita estos datos con la información real)
   ========================================================================= */
const CONFIG = {
  name: 'La Lanchita',
  fullName: 'Restaurant Cevichería La Lanchita',
  founder: 'Marco Antonio Pucutay Bermúdez',
  // Formato internacional sin "+" ni espacios (Perú = 51)
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

/* Fotos reales del local */
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

/* Estilos de texto neón cálido (arbitrary properties de Tailwind v3.4) */
const NEON_TEXT =
  'text-amber-200 [text-shadow:0_0_6px_rgba(253,230,138,0.9),0_0_18px_rgba(245,158,11,0.8),0_0_42px_rgba(217,119,6,0.7)]';
const NEON_SOFT =
  'text-amber-300 [text-shadow:0_0_10px_rgba(245,158,11,0.6),0_0_28px_rgba(217,119,6,0.45)]';

/* =========================================================================
   DATA: CARTA MARINA
   ========================================================================= */
const MENU = {
  ceviches: {
    label: 'Ceviches & Tiraditos',
    icon: Fish,
    items: [
      {
        name: 'Ceviche Clásico La Lanchita',
        desc: 'Pesca del día cortada al momento, limón recién exprimido, ají limo y cebolla morada crocante. Con camote glaseado y choclo serrano.',
        price: 38,
        chef: true,
      },
      {
        name: 'Ceviche Mixto Chimbotano',
        desc: 'Pescado, pulpo, langostinos y conchas en leche de tigre de la casa, con un toque de rocoto y cancha tostada.',
        price: 45,
        chef: false,
      },
      {
        name: 'Tiradito al Ají Amarillo',
        desc: 'Láminas finas de pescado bañadas en una crema sedosa de ají amarillo, culantro fresco y aceite de oliva.',
        price: 40,
        chef: true,
      },
      {
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
        name: 'Chicharrón de Pescado',
        desc: 'Trozos dorados y crujientes por fuera, jugosos por dentro. Con yuca frita, sarsa criolla y salsa tártara artesanal.',
        price: 36,
        chef: true,
      },
      {
        name: 'Chicharrón Mixto Marino',
        desc: 'Pescado, pota, langostinos y calamar en fritura ligera, acompañados de yucas doradas y nuestra cremita de rocoto.',
        price: 42,
        chef: false,
      },
      {
        name: 'Pescado a lo Macho',
        desc: 'Filete frito cubierto con una salsa cremosa de mariscos, ají panca y un toque de pisco. Servido con arroz blanco.',
        price: 48,
        chef: true,
      },
      {
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
        name: 'Ronda Marina La Lanchita',
        desc: 'Para compartir: ceviche, chicharrón de pescado, arroz con mariscos y causa de langostinos. El festín familiar del puerto.',
        price: 95,
        chef: true,
      },
      {
        name: 'Dúo Ceviche + Chicharrón',
        desc: 'La pareja perfecta: ceviche clásico y chicharrón de pescado crocante en un solo plato generoso.',
        price: 46,
        chef: true,
      },
      {
        name: 'Trío Marino',
        desc: 'Ceviche, arroz con mariscos y jalea mixta. Tres clásicos chimbotanos para quienes lo quieren todo.',
        price: 55,
        chef: false,
      },
      {
        name: 'Jalea Real para Compartir',
        desc: 'Montaña de mariscos y pescado frito sobre yuca, coronada con sarsa criolla, limón y salsas de la casa.',
        price: 68,
        chef: false,
      },
    ],
  },
};

/* =========================================================================
   ÍCONOS DE REDES (SVG inline para no depender de íconos de marca)
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

/**
 * Logo oficial. En fondos oscuros se monta sobre una "placa" marfil para
 * conservar la legibilidad del dibujo y del texto "Desde 1995".
 * Si la imagen no carga, muestra un respaldo con el ícono de barco.
 */
/**
 * Logo oficial.
 * Renderizado limpio con fallback en caso de error.
 * En fondos oscuros (dark) incluye una base sutil para mantener el contraste y nitidez.
 */
function Logo({ dark = false, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-night text-amber-400 ring-2 ring-wood/40 ${className}`}
      >
        <Ship className="h-7 w-7" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden transition-transform duration-300 ${
        dark ? 'rounded-xl bg-ivory p-1.5 shadow-md ring-1 ring-wood-light/30' : ''
      } ${className}`}
    >
      <img
        src="/logo-lanchita.png"
        alt="La Lanchita - Desde 1995"
        className="h-14 w-auto object-contain transition-all duration-300"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

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
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
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

          <div className="hidden lg:block">
            <WhatsAppButton>Reservar Mesa / WhatsApp</WhatsAppButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-800 transition hover:bg-wood/10 lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
   2. HERO (foto real del salón)
   ========================================================================= */
function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-night">
      <img
        src={IMAGES.salon}
        alt="Salón comedor de La Lanchita con mesas de madera rústica y mural marino"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_38%]"
      />
      {/* Overlay oscuro + degradado cálido madera para máxima legibilidad */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/75 to-night/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-wood-dark/60 via-transparent to-night/40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.35),transparent_60%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-wood-light/50 bg-wood-dark/30 px-4 py-2 text-xs font-medium text-amber-100 backdrop-blur sm:text-sm">
            <Award className="h-4 w-4 text-amber-400" />
            <span className="font-semibold">30 Años (1995 - Presente)</span>
            <span className="hidden text-amber-400/60 sm:inline">•</span>
            <span>Fundado por {CONFIG.founder}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white drop-shadow-lg sm:text-5xl lg:text-7xl">
            30 Años de{' '}
            <span className="bg-gradient-to-r from-amber-300 via-wood-light to-amber-500 bg-clip-text text-transparent">
              Sabor, Corazón
            </span>{' '}
            y Tradición Marina
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            Pioneros del ceviche en Nuevo Chimbote, con el auténtico pescado fresco de nuestra costa, mesas de madera
            que guardan historias y la calidez familiar de siempre.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#carta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
            >
              <Fish className="h-4 w-4 text-wood" />
              Ver Especialidades
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <WhatsAppButton className="px-7 py-3.5">Reservar por WhatsApp</WhatsAppButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Pesca fresca del día
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-400" /> Ambiente familiar
            </span>
            <span className="inline-flex items-center gap-2">
              <Mic className="h-4 w-4 text-amber-400" /> Terraza Karaoke 3er piso
            </span>
          </div>
        </div>
      </div>

      {/* Ola decorativa */}
      <svg
        className="absolute bottom-0 left-0 w-full text-ivory"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0,48 C240,96 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

/* =========================================================================
   3. HISTORIA & TRAYECTORIA (foto de la carta / reseña)
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
            {/* Tablón de madera detrás */}
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
   4. CARTA MARINA
   ========================================================================= */
function DishCard({ dish }) {
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

      <div className="mt-6 border-t border-dashed border-wood/20 pt-5">
        <WhatsAppButton
          variant="outline"
          className="w-full"
          message={`Hola La Lanchita, quiero pedir: ${dish.name} (S/. ${dish.price})`}
        >
          Pedir por WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  );
}

function MenuSection() {
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
            <DishCard key={dish.name} dish={dish} />
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
   5. TERRAZA & KARAOKE – 3ER PISO (modo noche con neón cálido)
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
      {/* Fondo ambiental con la foto real, muy difuminada */}
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
        {/* Encabezado neón */}
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
          {/* Tarjeta principal con la foto real */}
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

          {/* Atributos */}
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
          {/* Info */}
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

          {/* Mapa */}
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
   BOTÓN FLOTANTE DE WHATSAPP
   ========================================================================= */
function FloatingWhatsApp() {
  return (
    <a
      href={waLink(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        ¡Reserva tu mesa!
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
      </span>
    </a>
  );
}

/* =========================================================================
   PÁGINA PRINCIPAL
   ========================================================================= */
export default function LaLanchita() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <Hero />
        <History />
        <MenuSection />
        <Terrace />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

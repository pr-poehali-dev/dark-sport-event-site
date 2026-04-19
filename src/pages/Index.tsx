import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = "https://cdn.poehali.dev/projects/2470a998-bb78-4c10-ae3f-eaf1e3d86bc3/files/e71e398d-4128-4953-bb73-d00c6ed750e6.jpg";

// ---------- DATA ----------
const roadDistances = [
  { id: 'mile', name: '1 миля', age: 'с 18 лет', icon: 'Footprints', color: '#60a5fa' },
  { id: '5k', name: '5 км', age: 'с 14 лет', icon: 'Footprints', color: '#60a5fa' },
  { id: '10k', name: '10 км', age: 'с 18 лет', icon: 'Footprints', color: '#60a5fa' },
  { id: 'half', name: '21,1 км', age: 'с 18 лет', icon: 'Footprints', color: '#60a5fa' },
];

const trailDistances = [
  {
    id: 'trail25',
    km: 25,
    name: '25 км. Круг трёх озёр',
    shortDesc: 'Идеальный вход в трейлраннинг. Живописная трасса вокруг озёр Барахтан, Уфимское, Серебры. Набор высоты 550 м.',
    gain: 550,
    color: '#f97316',
    icon: 'Mountain',
    fullDesc: [
      'Эта дистанция — идеальный выбор для тех, кто хочет попробовать себя в трейлраннинге, но не готов к серьёзному набору высоты. Общий набор высоты на 25 км составит около 550 метров. Трасса пройдёт по живописному кругу, соединяющему три уникальных озера — настоящих природных жемчужины Челябинской области.',
    ],
    highlights: [
      {
        icon: '🏞️',
        title: 'Озеро Барахтан',
        text: 'Озеро вытянутой формы, словно затерянное в густом смешанном лесу из берёз и сосен. Плавучие островки-лабузы придают ему особый, таинственный шарм. Водится чебак, окунь, щука, линь и налим.',
      },
      {
        icon: '💧',
        title: 'Озеро Уфимское',
        text: 'Гидрологический памятник природы. Именно отсюда берёт начало великая река Уфа. Вы сможете сказать, что бежали у самого истока одной из крупнейших рек региона!',
      },
      {
        icon: '✨',
        title: 'Озеро Серебры',
        text: 'Главная «голубая жемчужина» Карабаша. С 1985 года — памятник природы и источник питьевой воды города. Серебристый оттенок — от слюдистых сланцев на дне. По берегам растёт редкая ягода — княженика.',
      },
    ],
  },
  {
    id: 'trail45',
    km: 45,
    name: '45 км. Путь на Юрму',
    shortDesc: 'Настоящий горный трейл с набором высоты 950 м. Покорение вершины-тысячника (гора Юрма, 1003 м) и трёх озёр.',
    gain: 950,
    color: '#ef4444',
    icon: 'Mountain',
    fullDesc: [
      'Старт, как и у всех дистанций, на главной площади города Карабаша. Но уже на первых километрах вы окажетесь в самом сердце уральской тайги.',
    ],
    highlights: [
      {
        icon: '🏔️',
        title: 'Покорение вершины-тысячника',
        text: 'Главная цель — гора Юрма, 1003 м над уровнем моря. Самая северная вершина национального парка «Таганай» и северная граница Южного Урала. Общий набор высоты — почти 1000 м.',
      },
      {
        icon: '🪨',
        title: 'Скалы Чертовы Ворота',
        text: 'Главная достопримечательность горы — причудливые скальные останцы на пути к вершине. Прикоснитесь к древней истории Уральских гор.',
      },
      {
        icon: '🌊',
        title: 'Три жемчужных озера',
        text: 'Маршрут проведёт вас по цепочке из трёх удивительных озёр: Барахтан, Уфимское и Серебры.',
      },
    ],
  },
];

const kidsDistances = [
  { id: 'kids500', name: '500 м', age: 'с 3 до 7 лет', icon: 'Baby', color: '#a78bfa' },
  { id: 'kids1k', name: '1 км', age: 'с 8 до 17 лет', icon: 'Star', color: '#a78bfa' },
];

// для секции Registration (оставляем совместимость)
const distances = [
  { id: 'mile', name: '1 МИЛЯ', km: 1.6 },
  { id: '5k', name: '5 КМ', km: 5 },
  { id: '10k', name: '10 КМ', km: 10 },
  { id: 'half', name: '21,1 КМ', km: 21.1 },
  { id: 'trail25', name: '25 КМ ТРЕЙЛ', km: 25 },
  { id: 'trail45', name: '45 КМ ТРЕЙЛ', km: 45 },
];

const schedule = [
  {
    day: '17 июля', subtitle: 'регистрация', items: [
      { time: '10:00–20:00', event: 'Регистрация участников', note: 'Центр мероприятий, выдача стартовых пакетов' },
      { time: '14:00–18:00', event: 'Брифинг для участников ULTRA и SKY', note: 'Обязательное посещение' },
      { time: '20:00', event: 'Pasta Party', note: 'Ужин для участников и гостей' },
    ]
  },
  {
    day: '18 июля', subtitle: 'день старта', items: [
      { time: '04:00', event: 'Старт SKY RACE (80 км)', note: '' },
      { time: '06:00', event: 'Старт ULTRA (50 км)', note: '' },
      { time: '08:00', event: 'Старт TRAIL (25 км)', note: '' },
      { time: '10:00', event: 'Старт SPRINT (10 км)', note: '' },
      { time: '14:00–20:00', event: 'Финиш. Награждение призёров', note: 'Живая музыка, зона отдыха' },
    ]
  },
];

interface MapPoint {
  id: string; x: number; y: number;
  type: 'start' | 'checkpoint' | 'hotel' | 'aid';
  label: string; info: string;
}

const mapPoints: MapPoint[] = [
  { id: 's1', x: 48, y: 72, type: 'start', label: 'Старт / Финиш', info: 'Центральная поляна, 1450м' },
  { id: 'c1', x: 30, y: 45, type: 'checkpoint', label: 'КП 1', info: '8 км, 1890м над уровнем моря' },
  { id: 'c2', x: 20, y: 28, type: 'checkpoint', label: 'КП 2', info: '18 км, 2340м над уровнем моря' },
  { id: 'c3', x: 38, y: 18, type: 'checkpoint', label: 'КП 3 — Вершина', info: '28 км, 3050м — высшая точка' },
  { id: 'c4', x: 62, y: 30, type: 'checkpoint', label: 'КП 4', info: '38 км, 2100м' },
  { id: 'c5', x: 75, y: 55, type: 'checkpoint', label: 'КП 5', info: '45 км, 1720м' },
  { id: 'h1', x: 55, y: 80, type: 'hotel', label: 'Горный отель "Вершина"', info: '★★★★ · 2 км от старта' },
  { id: 'h2', x: 70, y: 85, type: 'hotel', label: 'База "Альпика"', info: '★★★ · 4 км от старта' },
  { id: 'h3', x: 35, y: 88, type: 'hotel', label: 'Кемпинг "Поляна"', info: '⛺ 500м от старта' },
  { id: 'a1', x: 22, y: 55, type: 'aid', label: 'Питательный пункт', info: 'Вода, изотоник, фрукты' },
  { id: 'a2', x: 65, y: 42, type: 'aid', label: 'Питательный пункт', info: 'Вода, изотоник, горячее питание' },
];

const pointColors: Record<string, string> = {
  start: '#f97316',
  checkpoint: '#3b82f6',
  hotel: '#22c55e',
  aid: '#eab308',
};

const requirements = [
  { icon: 'FileText', text: 'Медицинская справка', note: 'Допуск к соревнованиям по бегу, не старше 6 месяцев' },
  { icon: 'Shield', text: 'Страховка от НС', note: 'На период мероприятия, включая горные риски' },
  { icon: 'User', text: 'Возраст 18+', note: 'Для ULTRA и SKY — минимум 21 год' },
  { icon: 'Award', text: 'Квалификация для SKY', note: 'Финиш на дистанции 50+ км за последние 2 года' },
];

const gear = [
  { icon: 'Backpack', text: 'Рюкзак-жилет', required: true },
  { icon: 'Droplets', text: 'Запас воды 1,5л', required: true },
  { icon: 'Smartphone', text: 'Заряженный телефон', required: true },
  { icon: 'MapPin', text: 'Карта или трек в GPS', required: true },
  { icon: 'Wind', text: 'Ветрозащитная куртка', required: true },
  { icon: 'Thermometer', text: 'Термоодеяло', required: true },
  { icon: 'Bandage', text: 'Аптечка первой помощи', required: true },
  { icon: 'Flashlight', text: 'Налобный фонарь + батареи', required: false },
  { icon: 'Utensils', text: 'Запас питания на маршруте', required: false },
  { icon: 'Sun', text: 'Солнцезащитные очки и крем', required: false },
];

const partners = [
  { name: 'SALOMON', category: 'Генеральный спонсор', color: '#f97316' },
  { name: 'ISPO', category: 'Технический партнёр', color: '#666' },
  { name: 'GARMIN', category: 'Официальный партнёр', color: '#666' },
  { name: 'GU ENERGY', category: 'Партнёр питания', color: '#666' },
  { name: 'ОРТОС', category: 'Медицинский партнёр', color: '#666' },
  { name: 'MOUNTAIN LOOK', category: 'Медиа партнёр', color: '#666' },
];

// ---------- HOOKS ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ---------- NAVBAR ----------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Дистанции', href: '#distances' },
    { label: 'О марафоне', href: '#about' },
    { label: 'Программа', href: '#schedule' },
    { label: 'Карта', href: '#map' },
    { label: 'Регистрация', href: '#registration' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-oswald text-xl font-bold tracking-widest">
          PEAK<span style={{ color: '#f97316' }}>RUN</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="font-golos text-sm text-white/60 hover:text-white transition-colors uppercase tracking-wide">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#registration" className="hidden md:block text-black font-oswald font-bold px-5 py-2 text-sm uppercase tracking-wider hover:opacity-90 transition-all" style={{ backgroundColor: '#f97316' }}>
          Регистрация
        </a>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={24} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-golos text-white/80 uppercase tracking-wide text-sm py-1">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- HERO ----------
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Горный марафон" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)' }} />
      </div>
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#f97316' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: '#f97316' }} />
            <span className="font-golos uppercase tracking-widest text-sm font-medium" style={{ color: '#f97316' }}>
              18 июля 2026 · Горный регион
            </span>
          </div>

          <h1 className="font-oswald font-bold uppercase leading-none mb-4" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
            PEAK
            <br />
            <span style={{ color: '#f97316' }}>RUN</span>
            <span className="text-white/20 ml-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>2026</span>
          </h1>

          <p className="font-golos text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Горный трейловый марафон. 4 дистанции от 10 до 80 км. Проверь себя на вершине.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a href="#registration" className="text-black font-oswald font-bold px-8 py-4 text-base uppercase tracking-wider hover:opacity-90 transition-all" style={{ backgroundColor: '#f97316' }}>
              Зарегистрироваться
            </a>
            <a href="#distances" className="border border-white/30 text-white font-oswald font-medium px-8 py-4 text-base uppercase tracking-wider hover:border-orange-500 transition-all" style={{ '--hover-color': '#f97316' } as React.CSSProperties}>
              Выбрать дистанцию
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '4', label: 'Дистанции' },
              { val: '80', label: 'Км максимум' },
              { val: '5200', label: 'М набор высоты' },
              { val: '1000+', label: 'Участников' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-oswald text-3xl md:text-4xl font-bold" style={{ color: '#f97316' }}>{s.val}</div>
                <div className="font-golos text-white/50 text-sm uppercase tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
        <Icon name="ChevronDown" size={20} />
      </div>
    </section>
  );
}

// ---------- TRAIL MODAL ----------
interface TrailModalProps {
  trail: typeof trailDistances[0] | null;
  onClose: () => void;
}
function TrailModal({ trail, onClose }: TrailModalProps) {
  useEffect(() => {
    if (!trail) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [trail, onClose]);

  if (!trail) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#111', border: `1px solid ${trail.color}40` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full" style={{ backgroundColor: trail.color }} />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
          >
            <Icon name="X" size={20} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Icon name="Mountain" size={22} style={{ color: trail.color }} fallback="Mountain" />
            <span className="font-golos text-xs uppercase tracking-widest" style={{ color: trail.color }}>
              Трейл · {trail.gain} м набор высоты
            </span>
          </div>

          <h3 className="font-oswald text-3xl font-bold text-white uppercase mb-4 leading-tight">
            {trail.name}
          </h3>

          {trail.fullDesc.map((p, i) => (
            <p key={i} className="font-golos text-white/65 leading-relaxed mb-4 text-sm">{p}</p>
          ))}

          <div className="space-y-4 mt-6">
            {trail.highlights.map(h => (
              <div key={h.title} className="flex gap-4 p-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl flex-shrink-0 mt-0.5">{h.icon}</span>
                <div>
                  <div className="font-oswald text-white font-bold text-sm uppercase tracking-wide mb-1">{h.title}</div>
                  <div className="font-golos text-white/55 text-sm leading-relaxed">{h.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border-t border-white/8 flex items-center gap-2">
            <Icon name="Info" size={14} style={{ color: '#f97316' }} />
            <span className="font-golos text-white/40 text-xs">
              Стоимость зависит от даты регистрации. Уточняйте на платформе.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- DISTANCES ----------
function Distances() {
  const [modal, setModal] = useState<typeof trailDistances[0] | null>(null);

  return (
    <section id="distances" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <TrailModal trail={modal} onClose={() => setModal(null)} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-16">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Участие</span>
          <h2 className="font-oswald font-bold uppercase text-white mt-2 leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            ДИСТАНЦИИ ДЛЯ КАЖДОГО:<br />
            <span style={{ color: '#f97316' }}>ОТ НОВИЧКА ДО ПРОФИ</span>
          </h2>
          <p className="font-golos text-white/50 mt-3 max-w-xl text-sm leading-relaxed">
            Шоссейные дистанции для любителей гладкого бега и трейлы для покорителей гор
          </p>
        </div>

        {/* ── БЛОК 1: Шоссейные ── */}
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6" style={{ backgroundColor: '#60a5fa' }} />
            <h3 className="font-oswald text-xl font-bold text-white uppercase tracking-wide">Взрослые шоссейные дистанции</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roadDistances.map((d, i) => (
              <div
                key={d.id}
                className="reveal relative p-5 transition-all duration-200"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  backgroundColor: '#111',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: d.color }} />
                <div className="font-oswald text-3xl font-bold text-white mb-1">{d.name}</div>
                <div className="font-golos text-xs text-white/40 uppercase tracking-wide mb-4">{d.age}</div>
                <div className="font-golos text-xs text-white/30 leading-relaxed">
                  Стоимость зависит от даты регистрации. Уточняйте на платформе.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── БЛОК 2: Трейлы ── */}
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6" style={{ backgroundColor: '#f97316' }} />
            <h3 className="font-oswald text-xl font-bold text-white uppercase tracking-wide">Трейловые дистанции</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trailDistances.map((d, i) => (
              <div
                key={d.id}
                className="reveal relative p-6 transition-all duration-300"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  backgroundColor: '#111',
                  border: `1px solid rgba(255,255,255,0.07)`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: d.color }} />

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Mountain" size={16} style={{ color: d.color }} fallback="Mountain" />
                      <span className="font-golos text-xs uppercase tracking-widest" style={{ color: d.color }}>
                        Трейл · набор {d.gain} м
                      </span>
                    </div>
                    <h4 className="font-oswald text-2xl font-bold text-white uppercase leading-tight">{d.name}</h4>
                  </div>
                  <div className="font-oswald text-4xl font-bold flex-shrink-0" style={{ color: 'rgba(255,255,255,0.07)' }}>
                    {d.km}
                  </div>
                </div>

                <p className="font-golos text-white/55 text-sm leading-relaxed mb-5">{d.shortDesc}</p>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-golos text-white/30 text-xs leading-relaxed max-w-xs">
                    Стоимость зависит от даты регистрации. Уточняйте на платформе.
                  </span>
                  <button
                    onClick={() => setModal(d)}
                    className="flex-shrink-0 font-oswald text-sm font-bold uppercase tracking-wider px-5 py-2 transition-all hover:opacity-90"
                    style={{ backgroundColor: d.color, color: '#000' }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── БЛОК 3: Детские ── */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6" style={{ backgroundColor: '#a78bfa' }} />
            <h3 className="font-oswald text-xl font-bold text-white uppercase tracking-wide">Детские дистанции</h3>
            <span className="font-golos text-xs uppercase tracking-widest px-3 py-1 font-bold" style={{ backgroundColor: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}>
              Бесплатно
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {kidsDistances.map((d, i) => (
              <div
                key={d.id}
                className="reveal relative p-5 transition-all duration-200"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  backgroundColor: '#111',
                  border: '1px solid rgba(167,139,250,0.12)',
                }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: d.color }} />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{d.icon === 'Baby' ? '👶' : '⭐'}</span>
                  <div className="font-oswald text-2xl font-bold text-white">{d.name}</div>
                </div>
                <div className="font-golos text-xs text-white/40 uppercase tracking-wide">{d.age}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(249,115,22,0.05)' }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>О нас</span>
            <h2 className="font-oswald font-bold uppercase text-white mt-2 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              ПОЧЕМУ<br /><span style={{ color: '#f97316' }}>PEAK RUN</span>
            </h2>
            <p className="font-golos text-white/60 leading-relaxed mb-4">
              PEAK RUN — это больше, чем гонка. Это встреча с горами, с собой и с сообществом людей, которые выбирают настоящее приключение. С 2019 года мы собираем атлетов со всего мира.
            </p>
            <p className="font-golos text-white/60 leading-relaxed mb-8">
              Каждая трасса разработана опытными трейлраннерами и картографами. Мы гарантируем безопасность, честную хронометрию и незабываемую атмосферу.
            </p>
            <div className="flex gap-8">
              {[{ val: '7', l: 'лет истории' }, { val: '12', l: 'стран-участниц' }, { val: '98%', l: 'вернутся снова' }].map(s => (
                <div key={s.l}>
                  <div className="font-oswald text-4xl font-bold" style={{ color: '#f97316' }}>{s.val}</div>
                  <div className="font-golos text-white/40 text-xs uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-2 gap-3">
            {[
              { icon: 'Trophy', title: 'Квалификация UTMB®', text: 'ULTRA и SKY дают квалификационные камни для Western States и UTMB®', full: true },
              { icon: 'Heart', title: 'Медицина на трассе', text: 'Врачи на всех КП, вертолётная эвакуация', full: false },
              { icon: 'Users', title: '5000+ финишёров', text: 'Большое комьюнити за 7 лет', full: false },
              { icon: 'Globe', title: 'Статус ITRA', text: 'Международный рейтинг', full: false },
              { icon: 'Camera', title: 'Фото на трассе', text: 'Профи-фотографы на ключевых точках', full: false },
            ].map(f => (
              <div
                key={f.title}
                className={`border border-white/10 p-5 transition-all hover:border-orange-500/30 ${f.full ? 'col-span-2' : ''}`}
                style={{ backgroundColor: '#111' }}
              >
                <Icon name={f.icon as 'Trophy'} size={f.full ? 20 : 16} className="mb-3" style={{ color: '#f97316' }} fallback="Star" />
                <div className="font-oswald text-white font-bold text-sm mb-1">{f.title}</div>
                <div className="font-golos text-white/40 text-xs leading-relaxed">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- SCHEDULE ----------
function Schedule() {
  return (
    <section id="schedule" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-16">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Расписание</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-white mt-2">ПРОГРАММА</h2>
          <p className="font-golos text-white/40 mt-2 text-sm">Регистрация накануне — 17 июля. Гонка — 18 июля 2026</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {schedule.map((day, di) => (
            <div key={day.day} className="reveal" style={{ transitionDelay: `${di * 150}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-black font-oswald font-bold px-4 py-2 text-sm uppercase tracking-wider" style={{ backgroundColor: '#f97316' }}>
                  {day.day}
                </div>
                <span className="font-golos text-xs uppercase tracking-wide" style={{ color: di === 1 ? '#f97316' : 'rgba(255,255,255,0.3)' }}>
                  · {day.subtitle}
                </span>
              </div>
              <div className="space-y-3">
                {day.items.map((item, ii) => (
                  <div key={ii} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#f97316' }} />
                      {ii < day.items.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-oswald text-sm font-bold tracking-wider" style={{ color: '#f97316' }}>{item.time}</span>
                        <span className="font-golos text-white font-medium">{item.event}</span>
                      </div>
                      {item.note && <div className="font-golos text-white/40 text-xs mt-0.5">{item.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- KIT ----------
function Kit() {
  return (
    <section id="kit" className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-16">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Что тебя ждёт</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-white mt-2">ПАКЕТЫ УЧАСТНИКА</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: 'Package', title: 'Стартовый пакет', accent: false,
              items: [
                'Именной стартовый номер',
                'Фирменная футболка PEAK RUN 2026',
                'Брендовый слаломный мешок',
                'Питание на контрольных пунктах',
                'Хронометраж с личным результатом',
                'Доступ в финишную зону',
                'Электронный сертификат участника',
              ]
            },
            {
              icon: 'Medal', title: 'Финишёрский набор', accent: true,
              items: [
                'Памятная медаль с 3D-рельефом',
                'Брендовый шерстяной плед',
                'Горячее питание и восстановительный коктейль',
                'Фотографии с маршрута (электронно)',
                'Печатный диплом с результатом',
                'Эксклюзивная наклейка "Finisher"',
                'Скидка 15% на следующий год',
              ]
            }
          ].map(kit => (
            <div
              key={kit.title}
              className="relative overflow-hidden p-8"
              style={{
                backgroundColor: '#111',
                border: `1px solid ${kit.accent ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#f97316' }} />
              {kit.accent && (
                <div className="absolute top-4 right-4 text-black font-oswald text-xs font-bold px-2 py-1 uppercase tracking-wide" style={{ backgroundColor: '#f97316' }}>
                  Финишёрам
                </div>
              )}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                  <Icon name={kit.icon as 'Package'} size={20} style={{ color: '#f97316' }} fallback="Star" />
                </div>
                <h3 className="font-oswald text-2xl font-bold text-white uppercase">{kit.title}</h3>
              </div>
              <ul className="space-y-3">
                {kit.items.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <Icon name={kit.accent ? 'Star' : 'Check'} size={14} style={{ color: '#f97316' }} className="flex-shrink-0" />
                    <span className="font-golos text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- REGISTRATION ----------
function Registration() {
  return (
    <section id="registration" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.05), transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl reveal">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Участие</span>
          <h2 className="font-oswald font-bold uppercase text-white mt-2 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            РЕГИСТРАЦИЯ<br /><span style={{ color: '#f97316' }}>И СТОИМОСТЬ</span>
          </h2>
          <p className="font-golos text-white/60 leading-relaxed mb-8">
            Регистрация открыта. Количество мест на каждую дистанцию ограничено. Цена зависит от периода регистрации — чем раньше, тем выгоднее. Подробности на официальной платформе.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {distances.map(d => (
              <div
                key={d.id}
                className="p-4 transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#111' }}
              >
                <div className="font-oswald text-white text-lg font-bold">{d.name}</div>
                <div className="font-golos text-white/40 text-xs mt-1">{d.km} км</div>
                <div className="font-oswald text-sm mt-2 uppercase tracking-wide" style={{ color: '#f97316' }}>Уточнить →</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="text-black font-oswald font-bold px-10 py-4 text-base uppercase tracking-wider hover:opacity-90 transition-all inline-flex items-center gap-2"
              style={{ backgroundColor: '#f97316' }}
            >
              <Icon name="ExternalLink" size={18} />
              Зарегистрироваться
            </a>
            <div className="border border-white/10 px-6 py-4 flex items-center gap-3">
              <Icon name="Clock" size={16} style={{ color: '#f97316' }} />
              <span className="font-golos text-white/60 text-sm">Ранняя регистрация до 1 марта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- REQUIREMENTS ----------
function Requirements() {
  return (
    <section id="requirements" className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-16">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Допуск к старту</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-white mt-2">ТРЕБОВАНИЯ</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <h3 className="font-oswald text-xl text-white uppercase tracking-wide mb-6 flex items-center gap-2">
              <Icon name="FileText" size={18} style={{ color: '#f97316' }} />
              Документы и допуск
            </h3>
            <div className="space-y-3">
              {requirements.map(r => (
                <div key={r.text} className="flex gap-4 items-start p-4 border border-white/8 transition-colors" style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                    <Icon name={r.icon as 'FileText'} size={14} style={{ color: '#f97316' }} fallback="Check" />
                  </div>
                  <div>
                    <div className="font-oswald text-white font-bold text-sm uppercase tracking-wide">{r.text}</div>
                    <div className="font-golos text-white/50 text-xs mt-1">{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h3 className="font-oswald text-xl text-white uppercase tracking-wide mb-6 flex items-center gap-2">
              <Icon name="Backpack" size={18} style={{ color: '#f97316' }} />
              Обязательное снаряжение
            </h3>
            <div className="space-y-1">
              {gear.map(g => (
                <div key={g.text} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <Icon name={g.required ? 'CheckCircle' : 'Circle'} size={14} style={{ color: g.required ? '#f97316' : 'rgba(255,255,255,0.2)' }} className="flex-shrink-0" />
                  <span className="font-golos text-white/70 text-sm">{g.text}</span>
                  {g.required && (
                    <span className="ml-auto text-xs font-golos uppercase tracking-wide flex-shrink-0" style={{ color: 'rgba(249,115,22,0.6)' }}>обяз.</span>
                  )}
                </div>
              ))}
            </div>
            <p className="font-golos text-white/30 text-xs mt-4">
              * Проверка снаряжения на старте. Без обязательного снаряжения — не допускаются.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- MAP ----------
function InteractiveMap() {
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'Все', color: '#f97316' },
    { key: 'checkpoint', label: 'КП', color: '#3b82f6' },
    { key: 'hotel', label: 'Отели', color: '#22c55e' },
    { key: 'aid', label: 'Питание', color: '#eab308' },
    { key: 'start', label: 'Старт/Финиш', color: '#f97316' },
  ];

  const filtered = mapPoints.filter(p => filter === 'all' || p.type === filter);

  return (
    <section id="map" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-8">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Навигация</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-white mt-2">КАРТА МАРШРУТОВ</h2>
        </div>

        <div className="reveal flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-golos text-xs uppercase tracking-wider px-4 py-2 border transition-all"
              style={{
                borderColor: filter === f.key ? '#f97316' : 'rgba(255,255,255,0.15)',
                color: filter === f.key ? '#f97316' : 'rgba(255,255,255,0.5)',
                backgroundColor: filter === f.key ? 'rgba(249,115,22,0.1)' : 'transparent',
              }}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: f.color }} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="reveal grid lg:grid-cols-3 gap-6">
          {/* Map canvas */}
          <div className="lg:col-span-2 relative border border-white/10 overflow-hidden" style={{ height: 500, backgroundColor: '#111' }}>
            {/* Topographic SVG */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
              {/* Mountains silhouette */}
              <polygon points="0,500 150,200 280,350 400,100 520,280 650,180 800,350 800,500" fill="rgba(255,255,255,0.03)" />
              {/* Contour lines */}
              <ellipse cx="38%" cy="18%" rx="15%" ry="8%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
              <ellipse cx="38%" cy="18%" rx="22%" ry="14%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
              <ellipse cx="38%" cy="18%" rx="30%" ry="22%" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.6"/>
            </svg>

            {/* Route lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points="48,72 30,45 20,28 38,18 62,30 75,55 48,72" fill="none" stroke="#ef4444" strokeWidth="0.4" strokeDasharray="2,1" opacity="0.6"/>
              <polyline points="48,72 55,60 62,55 75,55" fill="none" stroke="#22c55e" strokeWidth="0.4" opacity="0.5"/>
            </svg>

            {/* Points */}
            {filtered.map(point => (
              <button
                key={point.id}
                onClick={() => setSelected(selected?.id === point.id ? null : point)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div
                  className="w-3 h-3 rounded-full border-2 border-black/50 transition-all group-hover:scale-150"
                  style={{
                    backgroundColor: pointColors[point.type],
                    boxShadow: selected?.id === point.id ? `0 0 12px ${pointColors[point.type]}` : 'none',
                    transform: selected?.id === point.id ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                {(point.type === 'start' || selected?.id === point.id) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-white text-xs font-golos px-2 py-1 pointer-events-none"
                    style={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {point.label}
                  </div>
                )}
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 p-3 space-y-1.5" style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { color: '#f97316', label: 'Старт / Финиш' },
                { color: '#3b82f6', label: 'Контрольный пункт' },
                { color: '#22c55e', label: 'Размещение' },
                { color: '#eab308', label: 'Питание' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="font-golos text-white/50 text-xs">{l.label}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="font-oswald text-white/40 text-xs">N</span>
            </div>
          </div>

          {/* Sidebar list */}
          <div className="overflow-y-auto" style={{ maxHeight: 500 }}>
            {selected && (
              <div className="p-4 mb-4" style={{ backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.35)' }}>
                <div className="font-oswald text-white font-bold text-sm uppercase">{selected.label}</div>
                <div className="font-golos text-white/60 text-xs mt-1">{selected.info}</div>
              </div>
            )}
            <p className="font-golos text-white/30 text-xs mb-3 uppercase tracking-wide">Нажми на точку для деталей</p>
            {mapPoints.filter(p => filter === 'all' || p.type === filter).map(point => (
              <button
                key={point.id}
                onClick={() => setSelected(selected?.id === point.id ? null : point)}
                className="w-full text-left p-3 border mb-2 transition-all block"
                style={{
                  border: `1px solid ${selected?.id === point.id ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  backgroundColor: selected?.id === point.id ? 'rgba(249,115,22,0.05)' : '#111',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pointColors[point.type] }} />
                  <div>
                    <div className="font-golos text-white text-sm">{point.label}</div>
                    <div className="font-golos text-white/40 text-xs mt-0.5">{point.info}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- HOW TO GET ----------
function HowToGet() {
  return (
    <section id="howtoget" className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-16">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Логистика</span>
          <h2 className="font-oswald font-bold uppercase text-white mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            КАК ДОБРАТЬСЯ<br /><span style={{ color: '#f97316' }}>И ГДЕ ОСТАНОВИТЬСЯ</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: 'Car', title: 'На авто', desc: 'По трассе М-4, съезд на 280-м км. Парковка на 500 машин у стадиона.' },
            { icon: 'Train', title: 'На поезде', desc: 'Поезд до ст. Горная, далее бесплатный шаттл каждые 30 мин.' },
            { icon: 'Plane', title: 'На самолёте', desc: 'Аэропорт в 120 км. Трансфер по предварительной заявке.' },
          ].map((r, i) => (
            <div key={r.title} className="reveal p-6" style={{ transitionDelay: `${i * 100}ms`, backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                <Icon name={r.icon as 'Car'} size={18} style={{ color: '#f97316' }} fallback="MapPin" />
              </div>
              <h3 className="font-oswald text-white text-lg font-bold uppercase mb-2">{r.title}</h3>
              <p className="font-golos text-white/50 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal font-oswald text-2xl text-white uppercase tracking-wide mb-6">Размещение</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Горный отель "Вершина"', stars: 4, distance: '2 км от старта', desc: 'Спа, бассейн, ресторан. Специальные условия для участников.', price: 'от 5 800 ₽/ночь' },
            { name: 'База "Альпика"', stars: 3, distance: '4 км от старта', desc: 'Уютные номера, трансфер на старт и от финиша.', price: 'от 3 200 ₽/ночь' },
            { name: 'Кемпинг "Поляна"', stars: 0, distance: '500м от старта', desc: 'Палаточный лагерь, горячий душ, кафе.', price: 'от 600 ₽/ночь' },
          ].map((h, i) => (
            <div key={h.name} className="reveal p-6" style={{ transitionDelay: `${i * 100}ms`, backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-oswald text-white font-bold text-sm uppercase">{h.name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {h.stars > 0
                      ? Array.from({ length: h.stars }).map((_, si) => <Icon key={si} name="Star" size={10} style={{ color: '#f97316' }} />)
                      : <span className="font-golos text-white/40 text-xs">⛺ Кемпинг</span>
                    }
                  </div>
                </div>
                <span className="font-golos text-xs uppercase tracking-wide px-2 py-1" style={{ color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
                  {h.distance}
                </span>
              </div>
              <p className="font-golos text-white/50 text-sm leading-relaxed mb-4">{h.desc}</p>
              <div className="font-oswald text-white font-bold text-sm">{h.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PARTNERS ----------
function Partners() {
  return (
    <section id="partners" className="py-20 border-t" style={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-12">
          <span className="font-golos text-white/30 uppercase tracking-widest text-sm">Партнёры PEAK RUN 2026</span>
        </div>
        <div className="reveal flex flex-wrap justify-center items-center gap-10">
          {partners.map(p => (
            <div key={p.name} className="group text-center cursor-pointer">
              <div className="font-oswald text-2xl font-bold tracking-widest transition-colors" style={{ color: p.color }}>
                {p.name}
              </div>
              <div className="font-golos text-white/20 text-xs uppercase tracking-wide mt-1 group-hover:text-white/40 transition-colors">
                {p.category}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal text-center mt-12">
          <p className="font-golos text-white/30 text-sm">
            Стать партнёром —{' '}
            <a href="mailto:partners@peakrun.ru" style={{ color: '#f97316' }} className="hover:underline">partners@peakrun.ru</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACTS ----------
function Contacts() {
  return (
    <section id="contacts" className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-12">
          <span className="font-golos uppercase tracking-widest text-sm" style={{ color: '#f97316' }}>Связь</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-white mt-2">КОНТАКТЫ</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: 'Mail', label: 'Email', val: 'info@peakrun.ru', href: 'mailto:info@peakrun.ru' },
            { icon: 'Phone', label: 'Телефон', val: '+7 (800) 100-XX-XX', href: 'tel:+78001000000' },
            { icon: 'MapPin', label: 'Адрес', val: 'Горный регион, Центр мероприятий', href: '#map' },
          ].map(c => (
            <a key={c.label} href={c.href} className="reveal flex items-start gap-4 p-6 transition-colors" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                <Icon name={c.icon as 'Mail'} size={18} style={{ color: '#f97316' }} fallback="Info" />
              </div>
              <div>
                <div className="font-golos text-white/40 text-xs uppercase tracking-wide mb-1">{c.label}</div>
                <div className="font-golos text-white font-medium text-sm">{c.val}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal">
          <p className="font-golos text-white/40 uppercase tracking-widest text-xs mb-4">Соцсети</p>
          <div className="flex gap-3">
            {[
              { icon: 'Send', label: 'Telegram' },
              { icon: 'Instagram', label: 'Instagram' },
              { icon: 'Youtube', label: 'YouTube' },
              { icon: 'MessageCircle', label: 'ВКонтакте' },
            ].map(s => (
              <a
                key={s.label}
                href="#"
                title={s.label}
                className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#f97316'; (e.currentTarget as HTMLElement).style.color = '#f97316'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <Icon name={s.icon as 'Send'} size={16} fallback="Globe" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="py-8 border-t" style={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-oswald text-xl font-bold tracking-widest">
          PEAK<span style={{ color: '#f97316' }}>RUN</span>
          <span className="font-golos text-white/20 text-sm font-normal ml-2 tracking-normal">2026</span>
        </div>
        <nav className="flex flex-wrap gap-6 justify-center">
          {[
            { label: 'Дистанции', href: '#distances' },
            { label: 'Карта', href: '#map' },
            { label: 'Регистрация', href: '#registration' },
            { label: 'Контакты', href: '#contacts' },
          ].map(l => (
            <a key={l.href} href={l.href} className="font-golos text-white/30 hover:text-white transition-colors text-sm uppercase tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="font-golos text-white/20 text-xs">© 2026 PEAK RUN</div>
      </div>
    </footer>
  );
}

// ---------- PAGE ----------
export default function Index() {
  useReveal();

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0a0a0a' }}>
      <Navbar />
      <Hero />
      <Distances />
      <About />
      <Schedule />
      <Kit />
      <Registration />
      <Requirements />
      <InteractiveMap />
      <HowToGet />
      <Partners />
      <Contacts />
      <Footer />
    </div>
  );
}
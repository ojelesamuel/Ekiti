import React, { useState, useEffect } from "react";
import { MapPin, Mic, Wallet, BarChart3, ShieldCheck, Sprout, Radio, ArrowUpRight, CheckCircle2, Menu, X } from "lucide-react";

const HERO_IMG = "https://images.nigeriapropertycentre.com/area-guides/beb2e014-6f7d-4cb0-ae56-72a5d44fac98.jpg";
const IKOGOSI_IMG = "http://ekitistate.gov.ng/wp-content/uploads/2012/06/Canadian-12.jpg";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const COLORS = {
  green: "#005826",
  gold: "#D4AF37",
  neutral: "#0A1A10",
  canvas: "#F4F7F5",
  onDark: "#F4F7F5",
  onDarkMuted: "#C9D2CC",
};

function GeofenceGrid({ style }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }} preserveAspectRatio="none">
      <defs>
        <pattern id="geofence" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.gold} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geofence)" />
    </svg>
  );
}

function CornerBrackets({ color }) {
  const s = { position: "absolute", width: 14, height: 14, borderColor: color };
  return (
    <>
      <div style={{ ...s, top: 10, left: 10, borderTop: "2px solid", borderLeft: "2px solid" }} />
      <div style={{ ...s, top: 10, right: 10, borderTop: "2px solid", borderRight: "2px solid" }} />
      <div style={{ ...s, bottom: 10, left: 10, borderBottom: "2px solid", borderLeft: "2px solid" }} />
      <div style={{ ...s, bottom: 10, right: 10, borderBottom: "2px solid", borderRight: "2px solid" }} />
    </>
  );
}

const gateways = [
  {
    code: "PT/01",
    title: "Voice & Market Hub",
    dialect: "Ọjà Ìbílẹ̀",
    desc: "List produce, request services, and report roadside issues by speaking Ekiti Yoruba into your phone. No reading or typing required.",
    icon: Mic,
    stat: "12,480 voice listings this month",
  },
  {
    code: "PT/02",
    title: "Tasker Radar",
    dialect: "Àwọn Òṣìṣẹ́",
    desc: "Claim 10-metre mapping and verification zones near you, submit geo-tagged evidence, and get paid the moment it's confirmed.",
    icon: Radio,
    stat: "3,214 zones verified, ₦18.6m paid out",
  },
  {
    code: "PT/03",
    title: "State Command Deck",
    dialect: "Ìjọba Ìpínlẹ̀",
    desc: "Track internally generated revenue growth, live infrastructure faults, and contractor accountability across all 16 LGAs.",
    icon: BarChart3,
    stat: "IGR up 34% year-on-year",
  },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Geofenced anti-fraud verification" },
  { icon: Sprout, label: "Farm-to-market produce exchange" },
  { icon: Wallet, label: "Instant split-settlement payouts" },
];

const navLinks = [
  { label: "Voice & Market Hub", anchor: "#gateways" },
  { label: "Tasker Radar", anchor: "#gateways" },
  { label: "State Command Deck", anchor: "#gateways" },
  { label: "Farm to Market", anchor: "#farm" },
];

export default function EkitiWorksHome() {
  const [imgFailed, setImgFailed] = useState({ hero: false, ikogosi: false });
  const [ticker, setTicker] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => (t + 1) % gateways.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.canvas, color: COLORS.neutral }} className="min-h-screen w-full">
      <style>{FONT_IMPORT}{`
        .display { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* TOP BAR */}
      <header className="relative flex items-center justify-between px-5 sm:px-10 py-4 border-b" style={{ borderColor: "#0A1A1015" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: COLORS.green }}>
            <span className="text-xs font-bold mono" style={{ color: "#FFFFFF" }}>EK</span>
          </div>
          <span className="text-sm sm:text-base font-semibold tracking-tight" style={{ color: COLORS.neutral }}>
            EkitiWorks <span style={{ color: COLORS.gold }}>·</span>{" "}
            <span style={{ color: COLORS.neutral, opacity: 0.6, fontWeight: 400 }}>Omoluabi Digital</span>
          </span>
        </div>

        {/* Desktop status badge + links */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5">
            {navLinks.slice(0, 3).map((l) => (
              <a key={l.label} href={l.anchor} className="text-sm font-medium hover:opacity-70" style={{ color: COLORS.neutral }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: "#EAF2ED", color: COLORS.green }}>
            <CheckCircle2 size={13} /> Ekiti State Government Platform
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-sm"
          style={{ background: "#EAF2ED", color: COLORS.green }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 z-30 border-t"
            style={{ background: COLORS.neutral, borderColor: "#FFFFFF20" }}
          >
            <nav className="flex flex-col px-5 py-2">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.anchor}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 text-base font-medium border-b flex items-center justify-between"
                  style={{ color: COLORS.onDark, borderColor: "#FFFFFF14" }}
                >
                  {l.label}
                  <ArrowUpRight size={16} style={{ color: COLORS.gold }} />
                </a>
              ))}
              <div className="py-4 flex items-center gap-2 mono text-[11px] uppercase tracking-wider" style={{ color: COLORS.gold }}>
                <CheckCircle2 size={13} /> Ekiti State Government Platform
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "560px" }}>
        <div className="absolute inset-0">
          {!imgFailed.hero ? (
            <img
              src={HERO_IMG}
              alt="Aerial view of Ekiti State urban landscape"
              className="w-full h-full object-cover"
              onError={() => setImgFailed((f) => ({ ...f, hero: true }))}
            />
          ) : (
            <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${COLORS.neutral}, ${COLORS.green})` }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,26,16,0.55) 0%, rgba(10,26,16,0.85) 65%, #0A1A10 100%)" }} />
          <GeofenceGrid style={{ opacity: 0.22 }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 pt-16 pb-16 sm:pt-28 sm:pb-24">
          <div className="mono text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: COLORS.gold }}>
            Project Omoluabi Digital &nbsp;/&nbsp; Zone-locked civic infrastructure
          </div>
          <h1 className="display text-4xl sm:text-6xl leading-[1.05] font-medium max-w-3xl" style={{ color: "#FFFFFF" }}>
            Every task, every farm, every naira —{" "}
            <span style={{ color: COLORS.gold }}>mapped, verified, and paid.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: COLORS.onDark }}>
            One portal for the citizen who cannot read a form, the young tasker mapping her own street,
            and the state officer watching revenue rise in real time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="px-6 py-3.5 rounded-sm font-semibold text-sm transition-transform hover:-translate-y-0.5" style={{ background: COLORS.gold, color: COLORS.neutral }}>
              Enter the Portal
            </button>
            <button className="px-6 py-3.5 rounded-sm font-semibold text-sm border transition-colors hover:bg-white/10" style={{ borderColor: COLORS.canvas, color: COLORS.canvas }}>
              Sọ̀rọ̀ ní Yorùbá →
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: COLORS.onDark }}>
                <Icon size={16} style={{ color: COLORS.gold }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GATEWAY REGISTER */}
      <section id="gateways" className="max-w-6xl mx-auto px-5 sm:px-10 py-16 sm:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="mono text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: COLORS.green }}>Register of Portals</div>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: COLORS.neutral }}>Choose your gateway</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: COLORS.neutral, opacity: 0.6 }}>
            Each pass below routes to a purpose-built interface — no portal makes you learn the others.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {gateways.map((g, i) => {
            const Icon = g.icon;
            const active = i === ticker;
            const textColor = active ? COLORS.onDark : COLORS.neutral;
            return (
              <div
                key={g.code}
                className="relative p-6 pt-8 rounded-sm border transition-all duration-500"
                style={{
                  background: active ? COLORS.neutral : "#FFFFFF",
                  borderColor: active ? COLORS.gold : "#0A1A1018",
                }}
              >
                <CornerBrackets color={active ? COLORS.gold : "#00582640"} />
                <div className="flex items-center justify-between mb-6">
                  <span className="mono text-[11px] tracking-widest" style={{ color: active ? COLORS.gold : COLORS.green }}>{g.code}</span>
                  <Icon size={20} style={{ color: active ? COLORS.gold : COLORS.green }} />
                </div>
                <h3 className="display text-xl font-medium mb-1" style={{ color: textColor }}>{g.title}</h3>
                <div className="text-xs mono mb-4" style={{ color: textColor, opacity: 0.6 }}>{g.dialect}</div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: textColor, opacity: 0.85 }}>{g.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: active ? "#FFFFFF20" : "#0A1A1012" }}>
                  <span className="text-[11px] mono" style={{ color: textColor, opacity: 0.6 }}>{g.stat}</span>
                  <ArrowUpRight size={16} style={{ color: active ? COLORS.gold : COLORS.green }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AGRICULTURAL STRIP */}
      <section id="farm" className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <div className="absolute inset-0">
          {!imgFailed.ikogosi ? (
            <img
              src={IKOGOSI_IMG}
              alt="Ikogosi Warm Springs, Ekiti State"
              className="w-full h-full object-cover"
              onError={() => setImgFailed((f) => ({ ...f, ikogosi: true }))}
            />
          ) : (
            <div className="w-full h-full" style={{ background: `linear-gradient(120deg, ${COLORS.neutral}, ${COLORS.green})` }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,26,16,0.94) 25%, rgba(10,26,16,0.55) 75%)" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 h-full flex items-center py-16">
          <div className="max-w-md">
            <div className="mono text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: COLORS.gold }}>Farm to Market</div>
            <h3 className="display text-2xl sm:text-3xl font-medium leading-snug mb-4" style={{ color: "#FFFFFF" }}>
              From Ikogosi's farms to the city market, by voice alone.
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.onDark }}>
              A farmer records a price and quantity in her own dialect. Buyers nearby see it instantly,
              with distance and freshness — no smartphone literacy needed.
            </p>
            <button className="text-sm font-semibold px-5 py-3 rounded-sm" style={{ background: COLORS.gold, color: COLORS.neutral }}>
              Open Market Hub
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 sm:px-10 py-10 flex flex-wrap items-center justify-between gap-4" style={{ background: COLORS.neutral, color: COLORS.onDark }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.onDark, opacity: 0.85 }}>
          <MapPin size={14} style={{ color: COLORS.gold }} />
          Ekiti State, Nigeria — Office of the Executive Governor
        </div>
        <div className="mono text-[11px]" style={{ color: COLORS.onDark, opacity: 0.5 }}>Project Omoluabi Digital · Preview Build</div>
      </footer>
    </div>
  );
}

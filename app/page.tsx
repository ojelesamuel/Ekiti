import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, MapPin, Mic, Radio } from "lucide-react";
import EkitiHero from "@/components/home/EkitiHero";
import SiteHeader from "@/components/home/SiteHeader";

const IKOGOSI_IMG = "http://ekitistate.gov.ng/wp-content/uploads/2012/06/Canadian-12.jpg";

const gateways = [
  {
    code: "PT/01",
    href: "/voice-hub",
    title: "Voice & Market Hub",
    dialect: "Ọjà Ìbílẹ̀",
    desc: "List produce, request services, and report roadside issues by speaking Ekiti Yoruba into your phone. No reading or typing required.",
    icon: Mic,
    stat: "12,480 voice listings this month",
  },
  {
    code: "PT/02",
    href: "/radar",
    title: "Tasker Radar",
    dialect: "Àwọn Òṣìṣẹ́",
    desc: "Claim 10-metre mapping and verification zones near you, submit geo-tagged evidence, and get paid the moment it's confirmed.",
    icon: Radio,
    stat: "3,214 zones verified, ₦18.6m paid out",
  },
  {
    code: "PT/03",
    href: "/igr-analytics",
    title: "State Command Deck",
    dialect: "Ìjọba Ìpínlẹ̀",
    desc: "Track internally generated revenue growth, live infrastructure faults, and contractor accountability across all 16 LGAs.",
    icon: BarChart3,
    stat: "IGR up 34% year-on-year",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ekiti-canvas">
      <SiteHeader />

      <EkitiHero />

      <section className="max-w-6xl mx-auto px-5 sm:px-10 py-16 sm:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-2 text-ekiti-green">
              Register of Portals
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium">Choose your gateway</h2>
          </div>
          <p className="max-w-xs text-sm opacity-60 leading-relaxed">
            Each pass below routes to a purpose-built interface — no portal makes you learn the others.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {gateways.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.code}
                href={g.href}
                className="group relative p-6 pt-8 rounded-sm border border-ekiti-neutral/10 bg-white transition-colors hover:border-ekiti-gold"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] tracking-widest text-ekiti-green">{g.code}</span>
                  <Icon size={20} className="text-ekiti-green" />
                </div>
                <h3 className="font-display text-xl font-medium mb-1">{g.title}</h3>
                <div className="text-xs font-mono mb-4 opacity-60">{g.dialect}</div>
                <p className="text-sm leading-relaxed opacity-80 mb-6">{g.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-ekiti-neutral/10">
                  <span className="text-[11px] font-mono opacity-60">{g.stat}</span>
                  <ArrowUpRight size={16} className="text-ekiti-green group-hover:text-ekiti-gold" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden min-h-[320px]">
        <div className="absolute inset-0">
          <Image src={IKOGOSI_IMG} alt="Ikogosi Warm Springs, Ekiti State" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(10,26,16,0.92) 20%, rgba(10,26,16,0.35) 75%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 h-full flex items-center py-16">
          <div className="max-w-md">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3 text-ekiti-gold">
              Farm to Market
            </div>
            <h3 className="font-display text-white text-2xl sm:text-3xl font-medium leading-snug mb-4">
              From Ikogosi&apos;s farms to the city market, by voice alone.
            </h3>
            <p className="text-[#EDEFE9] text-sm leading-relaxed mb-6">
              A farmer records a price and quantity in her own dialect. Buyers nearby see it instantly,
              with distance and freshness — no smartphone literacy needed.
            </p>
            <Link
              href="/market"
              className="inline-block text-sm font-semibold px-5 py-3 rounded-sm bg-ekiti-gold text-ekiti-neutral"
            >
              Open Market Hub
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 sm:px-10 py-10 flex flex-wrap items-center justify-between gap-4 bg-ekiti-neutral text-ekiti-canvas">
        <div className="flex items-center gap-2 text-sm opacity-80">
          <MapPin size={14} className="text-ekiti-gold" />
          Ekiti State, Nigeria — Office of the Executive Governor
        </div>
        <div className="font-mono text-[11px] opacity-50">Project Omoluabi Digital</div>
      </footer>
    </main>
  );
}

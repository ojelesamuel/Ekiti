"use client";

import React, { useMemo } from "react";
import { AlertTriangle, ArrowUpRight, TrendingUp, Users } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

interface LgaRevenue {
  lga: string;
  igrNaira: number;
  growthPercent: number;
  activeTaskers: number;
}

const LGA_DATA: LgaRevenue[] = [
  { lga: "Ado-Ekiti", igrNaira: 42_500_000, growthPercent: 38, activeTaskers: 612 },
  { lga: "Ikere", igrNaira: 18_200_000, growthPercent: 22, activeTaskers: 214 },
  { lga: "Ikole", igrNaira: 11_800_000, growthPercent: 19, activeTaskers: 158 },
  { lga: "Oye", igrNaira: 9_400_000, growthPercent: 27, activeTaskers: 133 },
  { lga: "Emure", igrNaira: 6_100_000, growthPercent: 14, activeTaskers: 92 },
  { lga: "Ise/Orun", igrNaira: 5_700_000, growthPercent: 31, activeTaskers: 87 },
];

const INFRASTRUCTURE_FAULTS = [
  { id: "flt-01", location: "Fajuyi Road, Ado-Ekiti", type: "Pothole cluster", severity: "High", reportedHoursAgo: 3 },
  { id: "flt-02", location: "Ikere-Ise Expressway", type: "Broken streetlight run", severity: "Medium", reportedHoursAgo: 9 },
  { id: "flt-03", location: "Oye Market Road", type: "Blocked drainage", severity: "High", reportedHoursAgo: 5 },
  { id: "flt-04", location: "Ikole Township Stadium Rd", type: "Signage damage", severity: "Low", reportedHoursAgo: 27 },
];

function formatNaira(amount: number): string {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}m`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}k`;
  return `₦${amount}`;
}

export default function IgrAnalyticsPage() {
  const { settlements } = useWallet();

  const totals = useMemo(() => {
    const totalIgr = LGA_DATA.reduce((sum, l) => sum + l.igrNaira, 0);
    const totalTaskers = LGA_DATA.reduce((sum, l) => sum + l.activeTaskers, 0);
    const avgGrowth = LGA_DATA.reduce((sum, l) => sum + l.growthPercent, 0) / LGA_DATA.length;
    const platformTreasuryToDate = settlements.reduce((sum, s) => sum + s.treasuryShareNaira, 0);
    const platformTaskerToDate = settlements.reduce((sum, s) => sum + s.taskerShareNaira, 0);
    return { totalIgr, totalTaskers, avgGrowth, platformTreasuryToDate, platformTaskerToDate };
  }, [settlements]);

  const maxIgr = Math.max(...LGA_DATA.map((l) => l.igrNaira));

  return (
    <div className="min-h-screen bg-ekiti-neutral text-ekiti-canvas">
      <header className="px-5 sm:px-10 py-6 border-b border-white/10">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ekiti-gold mb-1">
          State Executive Command Deck
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium">
          Internally Generated Revenue &amp; Infrastructure
        </h1>
      </header>

      <main className="px-5 sm:px-10 py-8 space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 text-ekiti-gold mb-3">
              <TrendingUp size={16} />
              <span className="font-mono text-[11px] uppercase tracking-widest">Total IGR (6 LGAs)</span>
            </div>
            <div className="font-display text-3xl">{formatNaira(totals.totalIgr)}</div>
            <div className="text-xs font-mono opacity-60 mt-1">avg growth +{totals.avgGrowth.toFixed(0)}%</div>
          </div>

          <div className="rounded-sm bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 text-ekiti-gold mb-3">
              <Users size={16} />
              <span className="font-mono text-[11px] uppercase tracking-widest">Active taskers</span>
            </div>
            <div className="font-display text-3xl">{totals.totalTaskers.toLocaleString()}</div>
            <div className="text-xs font-mono opacity-60 mt-1">across all mapped zones</div>
          </div>

          <div className="rounded-sm bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 text-ekiti-gold mb-3">
              <ArrowUpRight size={16} />
              <span className="font-mono text-[11px] uppercase tracking-widest">Treasury share to date</span>
            </div>
            <div className="font-display text-3xl">₦{totals.platformTreasuryToDate.toLocaleString()}</div>
            <div className="text-xs font-mono opacity-60 mt-1">80% of platform settlements</div>
          </div>

          <div className="rounded-sm bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 text-ekiti-gold mb-3">
              <ArrowUpRight size={16} />
              <span className="font-mono text-[11px] uppercase tracking-widest">Tasker commission to date</span>
            </div>
            <div className="font-display text-3xl">₦{totals.platformTaskerToDate.toLocaleString()}</div>
            <div className="text-xs font-mono opacity-60 mt-1">20% of platform settlements</div>
          </div>
        </section>

        <section className="rounded-sm bg-white/5 border border-white/10 p-6">
          <h2 className="font-display text-lg font-medium mb-5">IGR growth by Local Government Area</h2>
          <div className="space-y-4">
            {LGA_DATA.map((l) => (
              <div key={l.lga}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">{l.lga}</span>
                  <span className="font-mono text-xs opacity-70">
                    {formatNaira(l.igrNaira)} · +{l.growthPercent}% · {l.activeTaskers} taskers
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-ekiti-gold rounded-full"
                    style={{ width: `${(l.igrNaira / maxIgr) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-sm bg-white/5 border border-white/10 p-6">
          <h2 className="font-display text-lg font-medium mb-5">Active infrastructure faults</h2>
          <ul className="divide-y divide-white/10">
            {INFRASTRUCTURE_FAULTS.map((f) => (
              <li key={f.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    size={16}
                    className={
                      f.severity === "High"
                        ? "text-red-400"
                        : f.severity === "Medium"
                        ? "text-ekiti-gold"
                        : "text-white/50"
                    }
                  />
                  <div>
                    <div className="text-sm font-medium">{f.location}</div>
                    <div className="text-xs font-mono opacity-60">{f.type}</div>
                  </div>
                </div>
                <div className="text-xs font-mono opacity-60 whitespace-nowrap">
                  {f.reportedHoursAgo}h ago
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

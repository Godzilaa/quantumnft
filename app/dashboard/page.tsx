"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthUser { username: string; id?: string; walletAddress?: string; }

const NAV_ITEMS = [
  { icon: "home",                  label: "Home",     fill: true  },
  { icon: "account_balance_wallet",label: "Wallet",   fill: false },
  { icon: "group",                 label: "Team",     fill: false },
  { icon: "payments",              label: "Earn",     fill: false },
  { icon: "settings",              label: "Settings", fill: false },
];

const INCOME_ROWS = [
  { color: "bg-primary",            label: "Comprehensive", daily: "$1,240.50", total: "$45,210.00",  highlight: false },
  { color: "bg-secondary",          label: "Reserve",       daily: "$450.20",   total: "$12,890.15",  highlight: false },
  { color: "bg-tertiary",           label: "Team",          daily: "$892.00",   total: "$21,440.00",  highlight: false },
  { color: "bg-outline",            label: "Activity",      daily: "$125.10",   total: "$3,120.50",   highlight: false },
  { color: "bg-primary-container",  label: "Earn",          daily: "$3,100.00", total: "$88,400.00",  highlight: true  },
  { color: "bg-secondary-container",label: "Bid",           daily: "$0.00",     total: "$5,200.00",   highlight: false },
  { color: "bg-tertiary-container", label: "Stake",         daily: "$560.40",   total: "$19,230.70",  highlight: false },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tf_user");
      const token  = localStorage.getItem("tf_token");
      if (!stored || !token) { router.push("/"); return; }
      setUser(JSON.parse(stored));
    } catch {
      router.push("/");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("tf_token");
    localStorage.removeItem("tf_user");
    router.push("/");
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-on-surface-variant text-sm font-medium font-body">Loading vault…</p>
        </div>
      </div>
    );
  }

  const initials = user.username.slice(0, 2).toUpperCase();
  const displayName = user.walletAddress
    ? `${user.walletAddress.slice(0, 6)}…${user.walletAddress.slice(-4)}`
    : user.username;

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container min-h-screen">

      {/* ── Fixed Left Sidebar ─────────────────────────────── */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low/80 backdrop-blur-xl flex flex-col p-6 gap-2 z-50 border-r border-outline-variant/20">

        {/* Logo */}
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-400 bg-clip-text text-transparent font-headline">
            Treasure Fun
          </h1>
          <p className="text-xs text-on-surface-variant tracking-wider uppercase font-semibold mt-1">
            The Ethereal Vault
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ icon, label, fill }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`px-4 py-3 flex items-center gap-3 rounded-full text-sm font-medium font-plus-jakarta transition-all text-left w-full
                  ${isActive
                    ? "bg-secondary-container/50 text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-teal-50/50"
                  }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={fill && isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {icon}
                </span>
                {label}
              </button>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="mt-auto p-4 bg-surface-container-highest/30 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold truncate">{displayName}</p>
            <p className="text-xs text-on-surface-variant truncate">
              {user.walletAddress ? "Wallet user" : `ID: ${user.id?.slice(0, 7) ?? "—"}`}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="text-on-surface-variant hover:text-error transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Canvas ────────────────────────────────────── */}
      <main className="ml-64 min-h-screen">

        {/* Sticky Header */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface/70 backdrop-blur-lg flex justify-between items-center px-8 z-40 font-plus-jakarta text-base border-b border-outline-variant/10">
          {/* Search */}
          <div className="flex items-center gap-3 bg-surface-container-highest/50 px-4 py-2.5 rounded-full w-96">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <input
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full text-on-surface placeholder:text-on-surface-variant"
              placeholder="Search transactions or assets…"
              type="text"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Airdrop chip */}
            <div className="bg-gradient-to-r from-secondary-container to-secondary-fixed-dim px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-secondary scale-75"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="text-xs font-bold text-on-secondary-container tracking-tight">Airdrop</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-on-surface-variant hover:opacity-80 transition-opacity rounded-full hover:bg-surface-container">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-on-surface-variant hover:opacity-80 transition-opacity rounded-full hover:bg-surface-container"
                title="Log out"
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pt-28 pb-20 px-8 max-w-7xl mx-auto">

          {/* ── Balance Cards Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* Wallet Balance */}
            <div className="relative overflow-hidden bg-surface-container-lowest p-8 rounded-lg shadow-sm border-l-4 border-primary">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                <span className="material-symbols-outlined" style={{ fontSize: "96px" }}>account_balance_wallet</span>
              </div>
              <p className="text-on-surface-variant font-medium text-xs mb-2 uppercase tracking-widest">Wallet Balance</p>
              <h2 className="text-5xl font-extrabold font-headline text-on-surface mb-6">$124,582.00</h2>
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                  Deposit
                </button>
                <button className="bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-full font-bold text-sm hover:bg-surface-container-high transition-colors">
                  Withdraw
                </button>
              </div>
            </div>

            {/* TUFT Balance */}
            <div className="relative overflow-hidden bg-surface-container-lowest p-8 rounded-lg shadow-sm border-l-4 border-tertiary">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                <span className="material-symbols-outlined" style={{ fontSize: "96px" }}>token</span>
              </div>
              <p className="text-on-surface-variant font-medium text-xs mb-2 uppercase tracking-widest">TUFT Balance</p>
              <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-5xl font-extrabold font-headline text-on-surface">842.15</h2>
                <span className="text-tertiary font-bold text-lg">TUFT</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container border-2 border-surface-container-lowest" />
                  <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface-container-lowest" />
                </div>
                <p className="text-xs text-on-surface-variant font-medium">Staking yield active: +12.4% APR</p>
              </div>
            </div>
          </div>

          {/* ── Main Grid: Income Table + Team Sidebar ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Income Breakdown (2/3) */}
            <div className="xl:col-span-2">
              <div className="bg-surface-container-low rounded-lg p-1">
                <div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm">

                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold font-headline">Income Breakdown</h3>
                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                      History
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    {/* Table header */}
                    <div className="grid grid-cols-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-low/50 rounded-lg mb-4">
                      <div>Category</div>
                      <div className="text-right">Daily Income</div>
                      <div className="text-right">Total Income</div>
                    </div>

                    {/* Rows */}
                    {INCOME_ROWS.map((row) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-3 px-4 py-5 hover:bg-surface-container-low/30 rounded-lg transition-colors items-center
                          ${row.highlight ? "border-l-2 border-primary-container" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${row.color}`} />
                          <span className="font-bold text-sm">{row.label}</span>
                        </div>
                        <div className={`text-right font-headline font-semibold ${row.highlight ? "text-primary font-bold" : "text-on-surface"}`}>
                          {row.daily}
                        </div>
                        <div className="text-right font-headline text-on-surface font-semibold">
                          {row.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="flex flex-col gap-8">

              {/* My Team */}
              <div className="bg-surface-container-lowest rounded-lg p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <h3 className="text-xl font-bold font-headline mb-6">My Team</h3>

                <div className="space-y-4 relative z-10">
                  {[
                    { label: "Active Members", value: "1,284", icon: "diversity_3",   color: "text-primary"    },
                    { label: "Team Volume",     value: "$428K", icon: "monitoring",    color: "text-secondary"  },
                    { label: "Rank Progress",   value: "Gold II", icon: "military_tech", color: "text-tertiary" },
                  ].map(({ label, value, icon, color }) => (
                    <div key={label} className="flex justify-between items-center p-4 bg-surface-container-low rounded-xl">
                      <div>
                        <p className="text-xs text-on-surface-variant font-bold uppercase">{label}</p>
                        <p className="text-2xl font-extrabold font-headline">{value}</p>
                      </div>
                      <span className={`material-symbols-outlined text-3xl ${color}`}>{icon}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Next Level: Platinum</span>
                    <span>82%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[82%] transition-all" />
                  </div>
                </div>

                <button className="w-full mt-8 py-4 bg-surface-container-highest text-on-surface font-bold rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                  Invite Members
                  <span className="material-symbols-outlined text-lg">person_add</span>
                </button>
              </div>

              {/* Unlock Rewards callout */}
              <div className="bg-gradient-to-br from-on-primary-fixed-variant to-primary p-8 rounded-lg text-white shadow-xl">
                <h4 className="font-headline font-bold text-lg mb-2">Unlock Rewards</h4>
                <p className="text-sm opacity-80 mb-6">
                  Complete your weekly challenge to earn a bonus of 50 TUFT.
                </p>
                <div className="relative h-40 w-full rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover opacity-50 absolute inset-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA35g2Z27W46OYRcgGI8Ev8D630DiEsWEFMVLpOvU_XxmiO5TQM8s-2qEoO8rEy5Ff-HsoayCNikhP7-Ua2QPI0MZSQGVzTEWH2aVDxsNargvNBJQBXIavFfN-82YOjgnUocZWOnopwtszFfDBEG8IYQI5te-ut8Axi8OpRdYvQyYXlijZPLawTOFVNJyuu0vs1D1ZVToUper5B-atKLEDj9xt7ULNNK2MZ7SZPAa7Ry3IDHtyN-5O3u6i8hhODTPQBa9usEGv3GN0"
                    alt="Abstract treasure chest in ethereal glowing digital space"
                  />
                  <span
                    className="material-symbols-outlined text-6xl relative z-10 text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    card_giftcard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

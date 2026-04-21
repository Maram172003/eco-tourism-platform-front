"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";

type User = {
    id: string;
    email: string;
    role: string;
    status: string;
    full_name: string;
};

type EcoProfile = {
    sustainability_score: number | null;
    profile_completion: number;
    is_onboarded: boolean;
    traveler_types: string[] | null;
};

function getScoreLabel(score: number | null): string {
    if (score === null) return "—";
    if (score >= 80) return "Ambassadeur durable";
    if (score >= 60) return "Écovoyageur engagé";
    if (score >= 40) return "Voyageur sensible";
    return "Voyageur classique";
}

function getScoreColor(score: number | null): string {
    if (score === null) return "text-slate-400";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
}

export default function EcoVoyageurDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<EcoProfile | null>(null);
    const [activeItem, setActiveItem] = useState("Tableau de bord");

    const navItems = [
        { label: "Tableau de bord", icon: "dashboard" },
        { label: "Explorer", icon: "explore" },
        { label: "Mes Voyages", icon: "map" },
        { label: "Impact Éco", icon: "energy_savings_leaf" },
        { label: "Favoris", icon: "favorite" },
        { label: "Paramètres", icon: "settings" },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("access_token");

        if (!storedUser || !token) { router.push("/auth/login"); return; }

        try {
            const parsedUser: User = JSON.parse(storedUser);
            if (parsedUser.role !== "eco_traveler") { router.push("/auth/login"); return; }
            setUser(parsedUser);

            // Fetch eco profile
            apiFetch<EcoProfile>("/eco-traveler/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((p) => {
                    setProfile(p);
                    // Redirect to onboarding if not done
                    if (!p?.is_onboarded) router.push("/onboarding");
                })
                .catch(() => router.push("/onboarding"));
        } catch {
            router.push("/auth/login");
        }
    }, [router]);

    async function handleLogout() {
        const token = localStorage.getItem("access_token");
        try { if (token) await logoutUser(token); } catch { }
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        router.push("/auth/login");
    }

    const score = profile?.sustainability_score ?? null;
    const scoreWidth = score !== null ? `${score}%` : "0%";

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-72 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col fixed h-full">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-10">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: "2.5rem" }}>eco</span>
                            <h1 className="text-xl font-extrabold tracking-tight">Éco-Voyage</h1>
                        </div>

                        <nav className="flex-1 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => setActiveItem(item.label)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeItem === item.label
                                            ? "bg-primary/10 text-primary font-bold"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span>Déconnexion</span>
                            </button>
                        </nav>

                        {/* Profile completion */}
                        {profile && (
                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profil complété</p>
                                    <p className="text-xs font-extrabold text-primary">{profile.profile_completion}%</p>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{ width: `${profile.profile_completion}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => router.push("/eco-traveler/questionnaire")}
                            className="mt-4 w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">add_location_alt</span>
                            Réserver un voyage
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 ml-72">
                    {/* Header */}
                    <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 px-10 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center gap-12 shrink-0">
                            <h2 className="text-2xl font-bold whitespace-nowrap">
                                Bonjour, {user?.full_name || "Voyageur"} 👋
                            </h2>
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2 gap-2 whitespace-nowrap">
                                <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                                <span className="text-sm font-semibold">
                                    {score !== null ? getScoreLabel(score) : "Ambassadeur Éco"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-10 flex-1 justify-end">
                            <div className="relative w-full max-w-md">
                                <input
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
                                    placeholder="Rechercher une expérience, un lieu…"
                                />
                                <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 text-xl">search</span>
                            </div>
                            <button className="size-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary transition-colors shrink-0">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 shrink-0" />
                            <div className="size-11 rounded-full bg-slate-200 border-2 border-primary overflow-hidden shrink-0" />
                        </div>
                    </header>

                    <div className="p-8">
                        {/* Score banner if no questionnaire done yet */}
                        {score === null && (
                            <div className="mb-6 p-5 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl">quiz</span>
                                    <div>
                                        <p className="font-bold text-slate-800">Passez votre test de durabilité</p>
                                        <p className="text-sm text-slate-500 font-medium">Obtenez votre score et des recommandations personnalisées.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => router.push("/eco-traveler/questionnaire")}
                                    className="px-5 py-2.5 bg-primary text-slate-900 font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                                >
                                    Commencer →
                                </button>
                            </div>
                        )}

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Score card */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Score de durabilité</p>
                                        <h3 className={`text-3xl font-extrabold mt-1 ${getScoreColor(score)}`}>
                                            {score !== null ? `${score}` : "—"}
                                            {score !== null && <span className="text-slate-400 text-lg font-normal">/100</span>}
                                        </h3>
                                    </div>
                                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: scoreWidth }} />
                                </div>
                                <p className="text-xs font-bold mt-3" style={{ color: score !== null ? (score >= 60 ? "#22c55e" : "#f97316") : "#94a3b8" }}>
                                    {score !== null ? getScoreLabel(score) : "Questionnaire non complété"}
                                </p>
                            </div>

                            {/* Plans actifs */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Plans actifs</p>
                                        <h3 className="text-3xl font-extrabold mt-1">3</h3>
                                    </div>
                                    <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
                                        <span className="material-symbols-outlined">edit_calendar</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">2 en groupe, 1 en solo</p>
                                <p className="text-xs text-slate-400 mt-3 italic">Mis à jour récemment</p>
                            </div>

                            {/* Réservations */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Réservations confirmées</p>
                                        <h3 className="text-3xl font-extrabold mt-1">4</h3>
                                    </div>
                                    <div className="bg-green-500/10 p-2 rounded-lg text-green-500">
                                        <span className="material-symbols-outlined">task_alt</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Expériences et séjours validés</p>
                                <p className="text-xs text-slate-400 mt-3 italic">Consulté il y a 5 min</p>
                            </div>

                            {/* Paiements */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Paiements effectués</p>
                                        <h3 className="text-2xl font-extrabold mt-1">1 240 <span className="text-slate-400 text-lg font-normal uppercase">Tnd</span></h3>
                                    </div>
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Individuel et groupe</p>
                                <p className="text-xs text-slate-400 mt-3 italic">Total cumulé ce mois</p>
                            </div>
                        </div>

                        {/* Rest of dashboard (plans + badges) - same as before */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Mes Plans de Voyage</h3>
                                    <a className="text-primary font-bold text-sm hover:underline" href="#">Voir tout</a>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: "Randonnée durable à Zaghouan", badge: "Randonnée", badgeColor: "bg-green-100 text-green-700", date: "14 - 15 Oct. • 4 participants", status: "Confirmé", statusColor: "bg-green-500", eco: "A+", icon: "hiking", tag: "Zéro déchet", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD5akWau1kblm8fq7Tx2Gb_0_xLp3mQzhBkmRMTCwP4gTD9CSQAANQlL0YDLaTPuPJRU6KvcFPO6k2Z0XaqbQoKbMAOK5WBHeMHMnt1TRMgl1Y7aUZFQNg1FT4jZWgn0Wrxv71JI-UPJCAjt8_4-3bzG2SNsAgq_Ftpl-L1bToKH-hqsogDzYBKSTbxXhEQLfsVHEB_B4TUu3cTA9B7ioPh1f6qctmXGcTpXYceiy91_3s4bDfyCVRUFpnILZV0dgP9ZKtZF0fa6A" },
                                        { title: "Séjour nature à Aïn Draham", badge: "Plan partagé", badgeColor: "bg-blue-100 text-blue-700", date: "22 - 25 Oct. • 2 participants", status: "En cours", statusColor: "bg-orange-400", eco: "A", icon: "cottage", tag: "Éco-gîte", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPCrg1ZmXVLbEPD-8lp6H0mdqw8OUDeijVrAZTFq0zto2v3-_cD4n4oGhCFYORXsbpOhhim9BsoK6fLjA3KZ4WXULIFZ4GtIDPiqVEGjsr2jqkm0Eo5SO102iyX57ppBgj1gpfLy_3nCiWbRpyYAzfzsG-z1YeqFFSsfqFDlXhUdy0YrGeHUEP4uCOZxSFvr0V9ZOTlmb9te0xg3vgZkiVH0xWtqyukLVEbUxYn580NOCZ7P712ArePj4isI0atUXHzpvfrtqTrpw" },
                                        { title: "Week-end éco en groupe à Tozeur", badge: "Groupe", badgeColor: "bg-orange-100 text-orange-700", date: "02 - 04 Nov. • 8 participants", status: "Confirmé", statusColor: "bg-green-500", eco: "A+", icon: "train", tag: "Transport collectif", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5jT6WYwSYRRMZkPCNOBrnz44sPEOf3vt8vGQAXP_9oauhXfRuN3iCW8E7E6gc-OZQ8vsDzOUvVh_5xdOYt_rO_F8qZPcDl9P-dGlbHnCdip5hG5VauEsZxb7L4MFmkIgmuxDjB5jpLJ24b6cbwAGNiHXzgmm7GYixoWH_vRGfaPxQiDRFW6S80aZzKe_X0FtOCQKwgh_TcAdy4tAq9weqRrUYIrpoC7OXPXi8oF6ZKGnTcuPoGSJuouQ9yZ3yhw7ldps2FdgyNBg" },
                                    ].map((plan, idx) => (
                                        <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-primary/5 hover:border-primary/30 transition-all group cursor-pointer">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-48 h-32 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url("${plan.img}")` }} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider mb-2 ${plan.badgeColor}`}>{plan.badge}</span>
                                                            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{plan.title}</h4>
                                                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-sm">calendar_today</span> {plan.date}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className={`px-2 py-1 rounded text-white text-[10px] font-bold uppercase ${plan.statusColor}`}>{plan.status}</span>
                                                            <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-green-600 text-sm">eco</span>
                                                                <span className="text-green-600 text-xs font-bold">{plan.eco}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">{plan.icon}</span>
                                                            <span className="text-xs text-slate-500">{plan.tag}</span>
                                                        </div>
                                                        <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                            <span className="material-symbols-outlined">more_horiz</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Badges */}
                            <div>
                                <h3 className="text-xl font-bold mb-6">Mes Badges</h3>
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/10">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: "explore", label: "Explorateur Durable", status: "Débloqué", active: true },
                                            { icon: "stars", label: "Ambassadeur Éco", status: "Débloqué", active: true },
                                            { icon: "groups", label: "Contributeur Communautaire", status: "En cours", active: false, dashed: true },
                                            { icon: "lock", label: "Protecteur de la Nature", status: "Verrouillé", active: false, locked: true },
                                        ].map((badge, i) => (
                                            <div
                                                key={i}
                                                className={`flex flex-col items-center text-center p-4 rounded-xl border-2 
                          ${badge.locked ? "bg-slate-100 dark:bg-slate-800/50 border-dashed border-slate-200 dark:border-slate-700"
                                                        : badge.dashed ? "bg-slate-50 dark:bg-slate-800 border-dashed border-primary/20"
                                                            : "bg-slate-50 dark:bg-slate-800 border-primary/20"}`}
                                            >
                                                <div className="size-16 flex items-center justify-center mb-2">
                                                    <span
                                                        className={`material-symbols-outlined text-4xl ${badge.locked ? "text-slate-200" : badge.active ? "text-primary" : "text-primary/40"}`}
                                                        style={badge.active ? { fontVariationSettings: '"FILL" 1' } : {}}
                                                    >
                                                        {badge.icon}
                                                    </span>
                                                </div>
                                                <p className={`text-xs font-bold ${badge.locked ? "text-slate-300" : ""}`}>{badge.label}</p>
                                                <p className={`text-[10px] font-bold uppercase mt-1 ${badge.active ? "text-green-500" : badge.locked ? "text-slate-300" : "text-slate-400"}`}>
                                                    {badge.status}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Link to retake questionnaire */}
                                    <button
                                        onClick={() => router.push("/eco-traveler/questionnaire")}
                                        className="w-full mt-4 py-3 rounded-xl border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 transition-all"
                                    >
                                        Refaire le test →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
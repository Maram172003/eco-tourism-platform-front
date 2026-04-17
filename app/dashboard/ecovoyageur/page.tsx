"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

type User = {
    id: string;
    email: string;
    role: string;
    status: string;
    full_name: string;
};

export default function EcoVoyageurDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
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

        if (!storedUser || !token) {
            router.push("/auth/login");
            return;
        }

        try {
            const parsedUser: User = JSON.parse(storedUser);

            if (parsedUser.role !== "eco_traveler") {
                router.push("/auth/login");
                return;
            }

            setUser(parsedUser);
        } catch {
            router.push("/auth/login");
        }
    }, [router]);

    async function handleLogout() {
        const token = localStorage.getItem("access_token");

        try {
            if (token) {
                await logoutUser(token);
            }
        } catch { }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        router.push("/auth/login");
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex min-h-screen">
                <aside className="w-72 bg-white dark:bg-slate-900 border-r border-primary/10 flex flex-col fixed h-full">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="size-10 rounded-xl flex items-center justify-center">
                                <span
                                    className="material-symbols-outlined text-primary"
                                    style={{ fontSize: "2.5rem" }}
                                >
                                    eco
                                </span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold leading-tight">
                                    <span
                                        className="text-xl font-extrabold tracking-tight"
                                        style={{ letterSpacing: "-0.025em" }}
                                    >
                                        Éco-Voyage
                                    </span>
                                </h1>
                            </div>
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

                        <div className="mt-auto pt-6">
                            <button className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">add_location_alt</span>
                                Réserver un voyage
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 ml-72">
                    <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 px-10 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center gap-12 shrink-0">
                            <h2 className="text-2xl font-bold whitespace-nowrap">
                                Bonjour, {user?.full_name || "Voyageur"} 👋
                            </h2>

                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2 gap-2 whitespace-nowrap">
                                <span className="material-symbols-outlined text-primary text-base">
                                    verified_user
                                </span>
                                <span className="text-sm font-semibold">Ambassadeur Éco</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-10 flex-1 justify-end">
                            <div className="relative w-full max-w-md">
                                <input
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
                                    placeholder="Rechercher une expérience, un lieu ou un plan..."
                                    type="text"
                                />
                                <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 text-xl">
                                    search
                                </span>
                            </div>

                            <button className="size-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary transition-colors shrink-0">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>

                            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 shrink-0"></div>

                            <div className="flex items-center gap-4 shrink-0">
                                <div className="size-11 rounded-full bg-slate-200 border-2 border-primary overflow-hidden"></div>
                            </div>
                        </div>
                    </header>

                    <div className="p-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Card 1 */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">Score de durabilité</p>
                                        <h3 className="text-3xl font-extrabold mt-1">85<span className="text-slate-400 text-lg font-normal">/100</span></h3>
                                    </div>
                                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[85%] rounded-full"></div>
                                </div>
                                <p className="text-xs text-green-500 font-bold mt-3">+5 points après vos derniers retours</p>
                            </div>
                            {/* Card 2 */}
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
                            {/* Card 3 */}
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
                            {/* Card 4 */}
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

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Travel Plans Section */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Mes Plans de Voyage</h3>
                                    <a className="text-primary font-bold text-sm hover:underline" href="#">Voir tout</a>
                                </div>
                                <div className="space-y-4">
                                    {/* Plan 1 */}
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-primary/5 hover:border-primary/30 transition-all group cursor-pointer overflow-hidden relative">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-48 h-32 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBD5akWau1kblm8fq7Tx2Gb_0_xLp3mQzhBkmRMTCwP4gTD9CSQAANQlL0YDLaTPuPJRU6KvcFPO6k2Z0XaqbQoKbMAOK5WBHeMHMnt1TRMgl1Y7aUZFQNg1FT4jZWgn0Wrxv71JI-UPJCAjt8_4-3bzG2SNsAgq_Ftpl-L1bToKH-hqsogDzYBKSTbxXhEQLfsVHEB_B4TUu3cTA9B7ioPh1f6qctmXGcTpXYceiy91_3s4bDfyCVRUFpnILZV0dgP9ZKtZF0fa6A")' }}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2">Randonnée</span>
                                                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Randonnée durable à Zaghouan</h4>
                                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">calendar_today</span> 14 - 15 Oct. • 4 participants
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="px-2 py-1 rounded bg-green-500 text-white text-[10px] font-bold uppercase">Confirmé</span>
                                                        <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-green-600 text-sm">eco</span>
                                                            <span className="text-green-600 text-xs font-bold">A+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">hiking</span>
                                                            <span className="text-xs text-slate-500">Zéro déchet</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                        <span className="material-symbols-outlined">more_horiz</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Plan 2 */}
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-primary/5 hover:border-primary/30 transition-all group cursor-pointer overflow-hidden relative">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-48 h-32 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPCrg1ZmXVLbEPD-8lp6H0mdqw8OUDeijVrAZTFq0zto2v3-_cD4n4oGhCFYORXsbpOhhim9BsoK6fLjA3KZ4WXULIFZ4GtIDPiqVEGjsr2jqkm0Eo5SO102iyX57ppBgj1gpfLy_3nCiWbRpyYAzfzsG-z1YeqFFSsfqFDlXhUdy0YrGeHUEP4uCOZxSFvr0V9ZOTlmb9te0xg3vgZkiVH0xWtqyukLVEbUxYn580NOCZ7P712ArePj4isI0atUXHzpvfrtqTrpw")' }}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2">Plan partagé</span>
                                                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Séjour nature à Aïn Draham</h4>
                                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">calendar_today</span> 22 - 25 Oct. • 2 participants
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="px-2 py-1 rounded bg-orange-400 text-white text-[10px] font-bold uppercase">En cours</span>
                                                        <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-green-600 text-sm">eco</span>
                                                            <span className="text-green-600 text-xs font-bold">A</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">cottage</span>
                                                            <span className="text-xs text-slate-500">Éco-gîte</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                        <span className="material-symbols-outlined">more_horiz</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Plan 3 */}
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-primary/5 hover:border-primary/30 transition-all group cursor-pointer overflow-hidden relative">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-48 h-32 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5jT6WYwSYRRMZkPCNOBrnz44sPEOf3vt8vGQAXP_9oauhXfRuN3iCW8E7E6gc-OZQ8vsDzOUvVh_5xdOYt_rO_F8qZPcDl9P-dGlbHnCdip5hG5VauEsZxb7L4MFmkIgmuxDjB5jpLJ24b6cbwAGNiHXzgmm7GYixoWH_vRGfaPxQiDRFW6S80aZzKe_X0FtOCQKwgh_TcAdy4tAq9weqRrUYIrpoC7OXPXi8oF6ZKGnTcuPoGSJuouQ9yZ3yhw7ldps2FdgyNBg")' }}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2">Groupe</span>
                                                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Week-end éco en groupe à Tozeur</h4>
                                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">calendar_today</span> 02 - 04 Nov. • 8 participants
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="px-2 py-1 rounded bg-green-500 text-white text-[10px] font-bold uppercase">Confirmé</span>
                                                        <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-green-600 text-sm">eco</span>
                                                            <span className="text-green-600 text-xs font-bold">A+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">train</span>
                                                            <span className="text-xs text-slate-500">Transport collectif</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                        <span className="material-symbols-outlined">more_horiz</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Sidebar - Badges */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-6">Mes Badges</h3>
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/10">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Badge 1 */}
                                            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-primary/20">
                                                <div className="size-16 flex items-center justify-center mb-2">
                                                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>explore</span>
                                                </div>
                                                <p className="text-xs font-bold">Explorateur Durable</p>
                                                <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Débloqué</p>
                                            </div>
                                            {/* Badge 2 */}
                                            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-primary/20">
                                                <div className="size-16 flex items-center justify-center mb-2">
                                                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                                                </div>
                                                <p className="text-xs font-bold">Ambassadeur Éco</p>
                                                <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Débloqué</p>
                                            </div>
                                            {/* Badge 3 */}
                                            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-primary/20">
                                                <div className="size-16 flex items-center justify-center mb-2">
                                                    <span className="material-symbols-outlined text-4xl text-primary/40">groups</span>
                                                </div>
                                                <p className="text-xs font-bold">Contributeur Communautaire</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">En cours</p>
                                            </div>
                                            {/* Badge 4 */}
                                            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700">
                                                <div className="size-16 flex items-center justify-center mb-2">
                                                    <span className="material-symbols-outlined text-4xl text-slate-200">lock</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-300">Protecteur de la Nature</p>
                                                <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">Verrouillé</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* TopAppBar */}
      <Navbar variant="auth" currentPage="register" backHref="/" />
        
      

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tertiary/5 blur-3xl rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full max-w-[1100px] grid md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative z-10 border border-outline-variant/30">
          {/* Left Side */}
          <div className="hidden md:block relative h-full min-h-[600px]">
            <img
              alt="Paysage naturel"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN6tiV3dBSYxTvOXc-dOPFD0dt3jN014897IcLpaqpnZcQvaV7SwmflJnLdnU5ZRbKefXlfKtP4hKxhMxP_BRWz4KsNInID_S7OidKVdJHMN3E0owyrDQmwPqQVFSrgELDsUlMaA_zfoWzLXHWSCkRHHUyzclC8xN1FSoUveoZSxEfXBT6IoI_RmTnzLUpazuEzp57PRLClpH8m17WCLM8FRqn-fppSgvvd2SfkPk43P3a-GTigO3DEgO71krkxiU4k4BIf9njQlI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-12 text-white">
              <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                Rejoignez la révolution du voyage durable.
              </h1>
              <p className="text-lg font-medium opacity-90 max-w-sm">
                Découvrez des destinations uniques, soutenez des projets locaux et réduisez votre empreinte carbone.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      alt="Utilisateur"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXwzaeggaUZfoICPDfCywb1LMgBgP-IIi2inuZ1bZT4GFGTxIaGiTwbvAMQ642grVieA5EmhnJsIl0z9eNHnVqdx0im9vqWngSD1eduBYLKBfIe0APzWz1epUfoPMYuP7PeUBK17FIpEa68sFIwr3TUayGW-BrDPjaJIdSeMoLiE-YLlndCNK5Bjm6m33mNbbzwkzJ2VvCgbi8_8z0magbCOG6jj10iS12Kq4rA58PwkVauQM11MgewBztYDCtNXAxX56Ith0VRGM"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      alt="Utilisateur"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXabqEWeCIgjDxqy8BieBYrd4Y7RbNm3OIAS_brPJ_X0pk49LVtSQcUBXAUdWwlL9LHz5o63eQBwmbnOs1jRb3UdkJEATFgVeW8C8W7wEaXsvOiVNx7w0SQD-Eshyt5ic8j203crggrhgnTdrMQBfz8ntuF4RQ7h_x5nhWskLXgvjfnufmcHx3Qblr5gk0psbMim1XfuCgOLGnZmFm7px6OIYWVV3m6f_xRbgw5RU7MVjizFzS-WJjmLEGRQYvJjuw3iTabqWDEks"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden flex items-center justify-center font-bold text-xs">
                    +2k
                  </div>
                </div>
                <span className="text-sm font-medium self-center">
                  Déjà plus de 2,000 voyageurs engagés.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col">
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                Créer un compte
              </h2>
              <p className="text-slate-500 font-medium">
                Commencez votre aventure éco-responsable dès aujourd&apos;hui.
              </p>
            </div>

            <form className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 block ml-1">
                  Je suis un...
                </label>

                <div className="grid gap-3 grid-cols-3">
                  <label className="relative flex flex-col items-center p-3 rounded-xl border-2 border-slate-100 bg-surface-container-low cursor-pointer hover:border-primary/30 transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      defaultChecked
                      className="sr-only"
                      name="role"
                      type="radio"
                      value="eco_traveler"
                    />
                    <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary transition-colors mb-1">
                      travel_explore
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-primary uppercase tracking-wider">
                      Éco-voyageur
                    </span>
                  </label>

                  <label className="relative flex flex-col items-center p-3 rounded-xl border-2 border-slate-100 bg-surface-container-low cursor-pointer hover:border-primary/30 transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input className="sr-only" name="role" type="radio" value="project" />
                    <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary transition-colors mb-1">
                      potted_plant
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-primary uppercase tracking-wider">
                      Propriétaire du projet
                    </span>
                  </label>

                  <label className="relative flex flex-col items-center p-3 rounded-xl border-2 border-slate-100 bg-surface-container-low cursor-pointer hover:border-primary/30 transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input className="sr-only" name="role" type="radio" value="guide" />
                    <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary transition-colors mb-1">
                      explore
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-primary uppercase tracking-wider">
                      Guide
                    </span>
                  </label>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="full_name">
                    Nom complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-xl">
                        person
                      </span>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-3.5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                      id="full_name"
                      name="full_name"
                      placeholder="Jean Dupont"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400 text-xl">
                        mail
                      </span>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-3.5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                      id="email"
                      name="email"
                      placeholder="nom@exemple.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="password">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 text-xl">
                          lock
                        </span>
                      </div>
                      <input
                        className="w-full pl-11 pr-4 py-3.5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="confirm_password">
                      Confirmer
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 text-xl">
                          verified_user
                        </span>
                      </div>
                      <input
                        className="w-full pl-11 pr-4 py-3.5 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 ml-1">
                <input
                  className="mt-1 rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 transition-colors"
                  id="terms"
                  type="checkbox"
                />
                <label className="text-xs text-slate-500 font-medium" htmlFor="terms">
                  J&apos;accepte les{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Conditions d&apos;Utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Politique de Confidentialité
                  </Link>
                  .
                </label>
              </div>

              <button
                className="w-full py-4 bg-primary text-black font-extrabold text-lg rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Créer un compte
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="text-sm text-slate-500 font-medium">
                Déjà un compte ?
              </span>
              <Link href="/login" className="text-sm font-bold text-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-8">
          <span className="font-manrope text-xs font-medium text-slate-500 dark:text-slate-400">
            © 2024 Éco-Voyage. Tous droits réservés.
          </span>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-manrope text-xs font-medium text-slate-500 transition-colors hover:text-primary"
            >
              Confidentialité
            </Link>
            <Link
              href="#"
              className="font-manrope text-xs font-medium text-slate-500 transition-colors hover:text-primary"
            >
              Conditions
            </Link>
            <Link
              href="#"
              className="font-manrope text-xs font-medium text-slate-500 transition-colors hover:text-primary"
            >
              Aide
            </Link>
            <Link
              href="#"
              className="font-manrope text-xs font-medium text-slate-500 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
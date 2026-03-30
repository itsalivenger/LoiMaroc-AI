"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Calendar, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem("user");
    
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("[Profile Debug] Failed to parse user", e);
        localStorage.removeItem("user");
        router.push("/sign-in");
      }
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Trigger storage event for Navbar
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-morocco-ivory/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-morocco-emerald font-bold hover:text-morocco-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-morocco-emerald/10"
        >
          {/* Header/Banner */}
          <div className="h-32 bg-morocco-emerald relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-morocco-gold flex items-center justify-center text-white text-3xl font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-morocco-emerald">{user.name}</h1>
                <p className="text-morocco-emerald/60 font-medium flex items-center gap-2 mt-1">
                  <Mail size={16} />
                  {user.email}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center gap-1.5 border border-green-200">
                  <ShieldCheck size={16} />
                  Compte Vérifié
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <ProfileCard 
                icon={<User className="text-morocco-gold" />}
                title="Informations Personnelles"
                content="Gérez votre nom et vos préférences de compte."
              />
              <ProfileCard 
                icon={<Calendar className="text-morocco-gold" />}
                title="Activité"
                content="Consultez l'historique de vos recherches LoiMaroc AI."
              />
            </div>

            <div className="mt-12 pt-8 border-t border-morocco-emerald/10 flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-3 rounded-xl bg-morocco-emerald text-white font-bold hover:bg-morocco-emerald/90 transition-all shadow-md active:scale-95"
              >
                Modifier le profil
              </button>
              <button 
                onClick={handleLogout}
                className="px-8 py-3 rounded-xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <LogOut size={20} />
                Se déconnecter
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="p-6 rounded-2xl bg-morocco-ivory/20 border border-morocco-emerald/5 hover:border-morocco-gold/30 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-morocco-emerald mb-1">{title}</h3>
      <p className="text-sm text-morocco-emerald/60 font-medium leading-relaxed">{content}</p>
    </div>
  );
}

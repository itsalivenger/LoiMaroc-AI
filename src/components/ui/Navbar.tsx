"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = () => {
      if (typeof window === 'undefined') return;
      const storedUser = localStorage.getItem("user");
      
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    
    // Listen for cross-tab logins as a bonus
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full glass border-b shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo_LoiMaroc_AI.png"
            alt="LoiMaroc AI"
            width={48}
            height={48}
            className="object-contain transition-transform group-hover:scale-110 scale-[1.3]"
          />
          <span className="font-serif text-xl font-bold text-morocco-emerald tracking-tight">
            LoiMaroc <span className="text-morocco-gold font-sans font-light text-base text-bold uppercase">AI</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-bold text-foreground/80">
          <Link href="/jurisprudence" className="hover:text-morocco-gold transition-colors">Jurisprudence</Link>
          <Link href="/codes" className="hover:text-morocco-gold transition-colors">Les Codes</Link>
          <Link href="/about" className="hover:text-morocco-gold transition-colors">À Propos</Link>
          <Link href="/contact" className="hover:text-morocco-gold transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/profile" 
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-morocco-gold bg-morocco-gold/10 hover:bg-morocco-gold/20 transition-colors text-morocco-gold font-bold"
              >
                <div className="w-6 h-6 rounded-full bg-morocco-gold flex items-center justify-center text-[10px] text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-foreground">{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-red-600 hover:text-red-700 transition-colors"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              href="/sign-in" 
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-morocco-emerald bg-morocco-emerald/5 hover:bg-morocco-emerald/10 transition-all text-morocco-emerald dark:text-morocco-ivory font-bold shadow-sm"
            >
              <User size={18} />
              <span>Connexion</span>
            </Link>
          )}

          <Link 
            href="/chat" 
            className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full bg-morocco-gold text-white hover:bg-morocco-gold/90 shadow-md hover:shadow-lg transition-all active:scale-95 font-bold"
          >
            <LayoutDashboard size={18} />
            Lancer l'IA
          </Link>

          <button className="md:hidden p-2 text-foreground">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

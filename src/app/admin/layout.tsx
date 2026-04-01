"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  History, 
  LogOut, 
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (!authorized && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Tableau de Bord", href: "/admin" },
    { icon: <Users size={20} />, label: "Utilisateurs", href: "/admin/users" },
    { icon: <Settings size={20} />, label: "Configuration", href: "/admin/config" },
    { icon: <History size={20} />, label: "Historique", href: "/admin/history" },
    { icon: <Star size={20} />, label: "Avis Clients", href: "/admin/reviews" },
  ];

  return (
    <div className="min-h-screen bg-morocco-ivory/10 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-morocco-emerald text-white fixed h-full z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-morocco-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">AdminPanel</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                pathname === item.href 
                ? 'bg-morocco-gold text-white shadow-lg' 
                : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4 font-bold uppercase text-xs tracking-widest">
                {item.icon}
                {item.label}
              </div>
              <ChevronRight size={16} className={`transition-transform ${pathname === item.href ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-all font-bold uppercase text-xs tracking-widest"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-morocco-emerald text-white p-4 flex items-center justify-between z-30 shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck size={24} className="text-morocco-gold" />
          <span className="font-serif font-bold italic">AdminPanel</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 bg-morocco-emerald z-20 pt-20"
          >
            <nav className="p-8 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 text-white font-bold"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-red-500/10 text-red-300 font-bold mt-8"
              >
                <LogOut size={20} />
                Déconnexion
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow lg:pl-72 pt-16 lg:pt-0">
        <div className="p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Échec de l'authentification admin");

      localStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-morocco-ivory/30 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 rounded-[3.5rem] bg-white border border-morocco-emerald/5 shadow-2xl space-y-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-morocco-gold/10 rounded-full blur-3xl" />
        
        <div className="text-center space-y-4 relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-morocco-emerald text-morocco-gold mx-auto flex items-center justify-center shadow-xl">
            <ShieldAlert size={40} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-morocco-emerald">Accès Administrateur</h1>
          <p className="text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Zone Sécurisée</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-morocco-emerald/20 group-focus-within:text-morocco-gold transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-morocco-ivory/30 border-2 border-transparent focus:border-morocco-emerald focus:bg-white outline-none transition-all font-bold text-morocco-emerald"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-morocco-emerald/20 group-focus-within:text-morocco-gold transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-morocco-ivory/30 border-2 border-transparent focus:border-morocco-emerald focus:bg-white outline-none transition-all font-bold text-morocco-emerald"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full py-5 rounded-2xl bg-morocco-emerald text-morocco-ivory font-bold flex items-center justify-center gap-3 hover:bg-morocco-emerald/90 transition-all shadow-xl active:scale-[0.98] group"
          >
            Se Connecter
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-sm font-bold text-morocco-emerald/30 uppercase tracking-[0.2em] relative z-10">
          Seuls les administrateurs autorisés peuvent accéder à ce panneau.
        </p>
      </motion.div>
    </div>
  );
}

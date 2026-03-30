"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Gavel } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/chat");
    }
    
    if (searchParams.get("registered")) {
      setRegistered(true);
    }
  }, [searchParams, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Échec de la connexion");

      if (data.user && data.user.email) {
        // Save user session and clear guest chats
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("loimaroc_chats");
        
        // IMPORTANT: Trigger storage event for the Navbar to react immediately
        window.dispatchEvent(new Event("storage"));
        router.push("/chat");
      } else {
        setError("Une erreur s'est produite lors de la connexion.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Left side: Image Content */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-morocco-emerald items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
            alt="Justice" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Gavel className="text-morocco-gold mb-6" size={64} />
            <h2 className="font-serif text-5xl font-bold leading-tight">Bienvenue sur <br/><span className="text-morocco-gold italic">LoiMaroc AI</span></h2>
            <p className="text-xl text-morocco-ivory/70 font-light mt-4 leading-relaxed">
              Accédez à la puissance de l'IA pour vos recherches juridiques marocaines en quelques secondes.
            </p>
          </motion.div>
        </div>
        
        {/* Abstract Moroccan Pattern Overlay */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-morocco-gold/10 rounded-full blur-3xl -mb-32 -mr-32" />
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-morocco-emerald mb-2">Se Connecter</h1>
            <p className="text-morocco-emerald/80 font-bold text-lg">Reprenez votre consultation juridique.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {registered && (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-bold border border-green-200">
                Compte créé ! Veuillez vous connecter.
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider">Email professionnel</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="nom@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-gold outline-none transition-all font-bold text-morocco-emerald placeholder:text-morocco-emerald/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider">Mot de passe</label>
                <Link href="#" className="text-sm font-bold text-morocco-gold hover:underline">Oublié ?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-gold outline-none transition-all font-bold text-morocco-emerald placeholder:text-morocco-emerald/50"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-200">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl bg-morocco-emerald text-morocco-ivory font-bold text-lg hover:shadow-2xl hover:bg-morocco-emerald/90 transition-all active:scale-[0.98] group flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Chargement..." : "Connexion"}
              {!loading && <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="pt-8 text-center lg:text-left">
            <p className="text-morocco-emerald/60">
              Pas encore de compte ? {" "}
              <Link href="/sign-up" className="text-morocco-gold font-bold hover:underline transition-all">
                Créer un compte gratuitement
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignInContent />
    </Suspense>
  );
}

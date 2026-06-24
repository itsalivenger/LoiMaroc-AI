"use client";

import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Gavel, CheckCircle } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1); // 1 = Info, 2 = Verify
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/chat");
    }
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Échec de l'inscription");

      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Code incorrect");

      router.push("/sign-in?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Left side: branding remains the same */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-morocco-emerald items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
            alt="Law Library" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Gavel className="text-morocco-gold mb-6" size={64} />
            <h2 className="font-serif text-5xl font-bold leading-tight">Rejoignez la <br/><span className="text-morocco-gold italic">Révolution Juridique</span></h2>
          </motion.div>
          <div className="space-y-4">
            <FeatureItem text="Accès illimité au Code du Travail" />
            <FeatureItem text="Citations certifiées par l'IA" />
            <FeatureItem text="Historique de recherche sécurisé" />
          </div>
        </div>
      </div>

      {/* Right side: Registration Form / Verification */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-morocco-emerald mb-2">
              {step === 1 ? "Inscription" : "Vérification"}
            </h1>
            <p className="text-morocco-emerald/60 font-medium">
              {step === 1 
                ? "Commencez votre expérience LoiMaroc AI." 
                : `Un code a été envoyé à ${formData.email}`}
            </p>
          </div>

          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider">Nom complet</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ali Benani"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-gold outline-none transition-all font-medium text-morocco-emerald"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider">Email professionnel</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nom@exemple.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-gold outline-none transition-all font-medium text-morocco-emerald"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider">Mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
                  <input 
                    type="password" required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Minimum 8 caractères"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-gold outline-none transition-all font-medium text-morocco-emerald"
                  />
                </div>
              </div>

              {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold">{error}</div>}

              <button disabled={loading} className="w-full mt-4 py-5 rounded-2xl bg-morocco-emerald text-morocco-ivory font-bold text-lg hover:shadow-2xl hover:bg-morocco-emerald/90 transition-all active:scale-95 group">
                {loading ? "Chargement..." : "Continuer"}
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerify}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-morocco-emerald uppercase tracking-wider text-center block">Code de vérification (6 chiffres)</label>
                <input 
                  type="text" required
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="000000"
                  className="w-full text-center text-3xl tracking-[1rem] py-6 rounded-2xl border-2 border-morocco-emerald/20 bg-morocco-ivory/10 focus:bg-white focus:border-morocco-emerald outline-none transition-all font-black text-morocco-emerald"
                />
              </div>

              {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold">{error}</div>}

              <button disabled={loading} className="w-full mt-4 py-5 rounded-2xl bg-morocco-gold text-white font-bold text-lg hover:shadow-2xl transition-all active:scale-95 group">
                {loading ? "Vérification..." : "Confirmer mon compte"}
              </button>

              <button type="button" onClick={() => setStep(1)} className="w-full text-morocco-emerald/50 font-bold hover:text-morocco-emerald transition-colors">
                Retour à l'inscription
              </button>
            </form>
          )}

          <div className="pt-8 text-center lg:text-left">
            <p className="text-morocco-emerald/60">
              Déjà inscrit ? {" "}
              <Link href="/sign-in" className="text-morocco-gold font-bold hover:underline transition-all">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-morocco-ivory/80">
      <CheckCircle className="text-morocco-gold" size={20} />
      <span className="font-medium">{text}</span>
    </div>
  );
}

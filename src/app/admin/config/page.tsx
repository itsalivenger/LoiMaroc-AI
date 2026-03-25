"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Save, 
  RefreshCcw, 
  Info, 
  Mail, 
  Globe,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface AppConfig {
  persistence_threshold: number;
  rag_k: number;
  about_title: string;
  about_content: string;
  contact_recipient: string;
  contact_phone: string;
  linkedin_url: string;
  portfolio_url: string;
}

export default function AdminConfigPage() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`);
      if (response.ok) {
        setConfig(await response.json());
      }
    } catch (e) {
      console.error("Failed to fetch config", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        setMessage({ type: 'success', text: "Configuration enregistrée avec succès." });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (e) {
      setMessage({ type: 'error', text: "Échec de l'enregistrement de la configuration." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <RefreshCcw className="animate-spin text-morocco-gold" size={48} />
        <p className="font-bold text-morocco-emerald animate-pulse">Chargement de la configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-12">
      <header>
        <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Configuration Système</h1>
        <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest">Paramètres globaux et contenu public</p>
      </header>

      <div className="space-y-8">
        {/* RAG & Engine Settings */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-morocco-emerald/5 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-morocco-emerald/5 text-morocco-emerald">
              <Settings size={20} />
            </div>
            <h2 className="text-xl font-bold text-morocco-emerald">Performances de l'IA</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Seuil de Persistance</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number"
                  value={config?.persistence_threshold ?? ""}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                    setConfig(prev => prev ? {...prev, persistence_threshold: val} : null)
                  }}
                  className="w-24 p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald text-center placeholder-morocco-emerald/50 shadow-sm"
                />
                <p className="text-xs font-medium text-morocco-emerald/50">Messages avant sauvegarde forcée.</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Articles RAG (K)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number"
                  value={config?.rag_k ?? ""}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                    setConfig(prev => prev ? {...prev, rag_k: val} : null)
                  }}
                  className="w-24 p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald text-center placeholder-morocco-emerald/50 shadow-sm"
                />
                <p className="text-xs font-medium text-morocco-emerald/50">Articles extraits par question.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Content (About Page) */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-morocco-emerald/5 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-morocco-gold/5 text-morocco-gold">
              <Globe size={20} />
            </div>
            <h2 className="text-xl font-bold text-morocco-emerald">Page "À Propos"</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Titre de la Page</label>
              <input 
                type="text"
                value={config?.about_title}
                onChange={(e) => setConfig(prev => prev ? {...prev, about_title: e.target.value} : null)}
                className="w-full p-4 rounded-xl bg-morocco-ivory/30 border-2 border-transparent focus:border-morocco-emerald outline-none font-bold text-morocco-emerald"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Contenu (Description)</label>
              <textarea 
                rows={5}
                value={config?.about_content}
                onChange={(e) => setConfig(prev => prev ? {...prev, about_content: e.target.value} : null)}
                className="w-full p-6 rounded-3xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald resize-none shadow-sm placeholder-morocco-emerald/50"
              />
            </div>
          </div>
        </section>

        {/* Contact System */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-morocco-emerald/5 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Mail size={20} />
            </div>
            <h2 className="text-xl font-bold text-morocco-emerald">Système de Contact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Email de Reception des messages</label>
              <input 
                type="email"
                placeholder="example@loimaroc.ma"
                value={config?.contact_recipient || ""}
                onChange={(e) => setConfig(prev => prev ? {...prev, contact_recipient: e.target.value} : null)}
                className="w-full p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald shadow-sm placeholder-morocco-emerald/50"
              />
              <p className="text-xs font-medium text-morocco-emerald/50 italic">
                Redirection des formulaires de la page contact.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Numéro de Téléphone Externe</label>
              <input 
                type="tel"
                placeholder="+212 6 XX XX XX XX"
                value={config?.contact_phone || ""}
                onChange={(e) => setConfig(prev => prev ? {...prev, contact_phone: e.target.value} : null)}
                className="w-full p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald shadow-sm placeholder-morocco-emerald/50"
              />
              <p className="text-xs font-medium text-morocco-emerald/50 italic">
                Numéro affiché publiquement sur la page contact.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-morocco-emerald/5">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Lien LinkedIn</label>
              <input 
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={config?.linkedin_url || ""}
                onChange={(e) => setConfig(prev => prev ? {...prev, linkedin_url: e.target.value} : null)}
                className="w-full p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald shadow-sm placeholder-morocco-emerald/50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest">Lien Portfolio</label>
              <input 
                type="url"
                placeholder="https://votre-portfolio.com"
                value={config?.portfolio_url || ""}
                onChange={(e) => setConfig(prev => prev ? {...prev, portfolio_url: e.target.value} : null)}
                className="w-full p-4 rounded-xl bg-white border-2 border-morocco-emerald/40 focus:border-morocco-emerald outline-none font-black text-lg text-morocco-emerald shadow-sm placeholder-morocco-emerald/50"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between pt-8">
        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`flex items-center gap-2 font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            >
              {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="ml-auto px-10 py-5 rounded-2xl bg-morocco-emerald text-white font-bold flex items-center gap-3 hover:bg-morocco-emerald/90 transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} />}
          Enregistrer Tout
        </button>
      </div>
    </div>
  );
}

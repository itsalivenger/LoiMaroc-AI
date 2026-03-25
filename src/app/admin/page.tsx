"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Activity, 
  Database, 
  ShieldCheck, 
  AlertCircle, 
  Save, 
  RefreshCcw,
  BarChart3,
  Users,
  MessageSquare,
  Cpu
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SystemHealth {
  status: string;
  mongodb: string;
  rag_engine: string;
}

interface AppConfig {
  persistence_threshold: number;
  rag_k: number;
}

export default function AdminPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [config, setConfig] = useState<AppConfig>({ persistence_threshold: 5, rag_k: 5 });
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const router = useRouter();

  const fetchHealth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/health`);
      if (response.ok) {
        setHealth(await response.json());
        setLastUpdated(new Date());
      }
    } catch (e) {
      console.error("Failed to fetch health", e);
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`);
      if (response.ok) {
        setConfig(await response.json());
      }
    } catch (e) {
      console.error("Failed to fetch config", e);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchConfig();
    const interval = setInterval(fetchHealth, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        // Success notification logic could go here
      }
    } catch (e) {
      console.error("Failed to save config", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Tableau de Bord</h1>
        <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest">Monitoring & Contrôle RAG</p>
      </div>

      {/* System Health Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <HealthCard 
          title="Statut Global"
          value={health?.status || "Inconnu"}
          icon={<Activity size={24} />}
          status={health?.status === 'healthy' ? 'success' : 'error'}
        />
        <HealthCard 
          title="Base MongoDB"
          value={health?.mongodb === 'connected' ? "Connecté" : "Déconnecté"}
          icon={<Database size={24} />}
          status={health?.mongodb === 'connected' ? 'success' : 'error'}
        />
        <HealthCard 
          title="Moteur RAG"
          value={health?.rag_engine === 'ready' ? "Opérationnel" : "Erreur"}
          icon={<Cpu size={24} />}
          status={health?.rag_engine === 'ready' ? 'success' : 'error'}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Configuration Panel */}
        <section className="lg:col-span-2 space-y-8">
          <div className="p-10 rounded-[3rem] bg-white border border-morocco-emerald/5 shadow-xl space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-morocco-emerald/5 text-morocco-emerald">
                <Settings size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-morocco-emerald">Paramètres du Système</h2>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="block text-morocco-emerald font-bold text-lg">Seuil de Persistance (Messages)</label>
                <p className="text-sm text-morocco-emerald/80 font-bold uppercase tracking-wider">
                  Nombre de messages avant synchronisation forcée avec LocalStorage.
                </p>
                <div className="flex items-center gap-6">
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={config.persistence_threshold}
                    onChange={(e) => setConfig({...config, persistence_threshold: parseInt(e.target.value)})}
                    className="flex-grow h-2 bg-morocco-ivory rounded-lg appearance-none cursor-pointer accent-morocco-gold"
                  />
                  <span className="w-16 h-16 rounded-2xl bg-morocco-emerald text-morocco-gold flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
                    {config.persistence_threshold}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-morocco-emerald font-bold text-lg">Profondeur d'Extraction (K-Voisins)</label>
                <p className="text-sm text-morocco-emerald/80 font-bold uppercase tracking-wider">
                  Nombre d'articles extrais par ChromaDB pour chaque question.
                </p>
                <div className="flex items-center gap-6">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={config.rag_k}
                    onChange={(e) => setConfig({...config, rag_k: parseInt(e.target.value)})}
                    className="flex-grow h-2 bg-morocco-ivory rounded-lg appearance-none cursor-pointer accent-morocco-gold"
                  />
                  <span className="w-16 h-16 rounded-2xl bg-morocco-emerald text-morocco-gold flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
                    {config.rag_k}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-morocco-emerald/5">
              <button 
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="w-full py-5 rounded-2xl bg-morocco-emerald text-white font-bold flex items-center justify-center gap-3 hover:bg-morocco-emerald/90 transition-all shadow-xl disabled:opacity-50 group"
              >
                {isSaving ? <RefreshCcw className="animate-spin" /> : <Save size={20} />}
                Sauvegarder les Paramètres
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats Sidebar */}
        <aside className="space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-morocco-emerald text-morocco-ivory shadow-2xl space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-morocco-gold/10 rounded-full blur-3xl opacity-50" />
             <div className="flex items-center gap-4 relative z-10">
               <BarChart3 className="text-morocco-gold" size={24} />
               <h2 className="text-xl font-bold">Aperçu du Trafic</h2>
             </div>
             
             <div className="space-y-6 relative z-10">
               <StatRow icon={<MessageSquare size={18}/>} label="Total Requêtes" value="1,248" />
               <StatRow icon={<Users size={18}/>} label="Utilisateurs Actifs" value="42" />
               <StatRow icon={<ShieldCheck size={18}/>} label="Taux de Précision" value="98.5%" />
             </div>

             <div className="pt-6 border-t border-white/10 text-sm font-bold uppercase tracking-widest text-morocco-ivory/50 flex justify-between relative z-10">
               <span>Dernière Maj</span>
               <span>{lastUpdated.toLocaleTimeString()}</span>
             </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl space-y-4">
            <h3 className="font-bold text-morocco-emerald flex items-center gap-2">
              <AlertCircle size={18} className="text-morocco-gold" />
              Journal des Alertes
            </h3>
            <div className="space-y-3">
              <AlertItem type="warning" text="Latence Gemini > 2.5s" time="12m" />
              <AlertItem type="success" text="Indexation ChromaDB" time="1h" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function HealthCard({ title, value, icon, status }: { title: string, value: string, icon: React.ReactNode, status: 'success' | 'error' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl flex items-center gap-6 group hover:border-morocco-gold/30 transition-all"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${
        status === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-morocco-emerald/70 uppercase tracking-widest mb-1">{title}</p>
        <p className={`text-2xl font-serif font-bold ${
          status === 'success' ? 'text-morocco-emerald' : 'text-red-700'
        }`}>{value}</p>
      </div>
    </motion.div>
  );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-morocco-ivory/70">
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </div>
      <span className="text-xl font-bold text-morocco-gold font-serif">{value}</span>
    </div>
  );
}

function AlertItem({ type, text, time }: { type: 'success' | 'warning' | 'error', text: string, time: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-morocco-ivory/30">
      <p className="text-sm text-morocco-emerald font-bold leading-tight">{text}</p>
      <span className="text-[10px] text-morocco-emerald/80 font-bold whitespace-nowrap">{time}</span>
    </div>
  );
}

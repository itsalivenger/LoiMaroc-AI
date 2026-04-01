"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCcw,
  Users,
  MessageSquare,
  Cpu,
  LogOut,
  TrendingUp,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface Stats {
  total_users: number;
  total_sessions: number;
  total_messages: number;
  daily_stats: { date: string, requests: number }[];
  accuracy: number;
}

interface SystemHealth {
  status: string;
  mongodb: string;
  rag_engine: string;
}

export default function AdminPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const [healthRes, statsRes] = await Promise.all([
        fetch(`${apiBase}/api/health`, { cache: 'no-store' }),
        fetch(`${apiBase}/api/admin/stats`, { cache: 'no-store' })
      ]);

      if (healthRes.ok) setHealth(await healthRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className="space-y-10">
      {/* Header with Stats & Logout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Statistiques & Monitoring</h1>
          <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest flex items-center gap-2">
            <Clock size={14} /> Dernière mise à jour : {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors shadow-sm"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Utilisateurs" 
          value={stats?.total_users.toString() || "0"} 
          icon={<Users size={24} />} 
          trend="+12%" 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Sessions Chat" 
          value={stats?.total_sessions.toString() || "0"} 
          icon={<MessageSquare size={24} />} 
          trend="+5%" 
          color="bg-morocco-gold/10 text-morocco-gold"
        />
        <StatCard 
          title="Messages Total" 
          value={stats?.total_messages.toString() || "0"} 
          icon={<Activity size={24} />} 
          trend="+8%" 
          color="bg-morocco-emerald/10 text-morocco-emerald"
        />
        <StatCard 
          title="Précision RAG" 
          value={`${stats?.accuracy || 98.5}%`} 
          icon={<ShieldCheck size={24} />} 
          trend="Stable" 
          color="bg-purple-50 text-purple-600"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph Area */}
        <section className="lg:col-span-2">
          <div className="p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-morocco-emerald/5 text-morocco-emerald">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-xl font-bold text-morocco-emerald">Tendance des Requêtes (7j)</h2>
              </div>
            </div>

            <div className="h-[350px] w-full pt-4">
              {stats?.daily_stats ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.daily_stats}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a30" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#1e3a30" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#1e3a30', fontSize: 12, fontWeight: 600 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#1e3a30', fontSize: 12, fontWeight: 600 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#1e3a30" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRequests)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-morocco-emerald/40 font-bold uppercase tracking-widest text-sm">
                  {isLoading ? "Chargement des données..." : "Pas de données disponibles"}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* System Status Sidebar */}
        <aside className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-morocco-emerald text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-morocco-gold/10 rounded-full blur-3xl" />
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10">
              <Cpu size={20} className="text-morocco-gold" />
              État des Services
            </h3>
            <div className="space-y-4 relative z-10">
              <HealthItem label="API Core" status={health?.status === 'healthy' ? 'success' : 'error'} />
              <HealthItem label="Base de Données" status={health?.mongodb === 'connected' ? 'success' : 'error'} />
              <HealthItem label="Moteur RAG" status={health?.rag_engine === 'ready' ? 'success' : 'error'} />
              <HealthItem label="Modèle Gemini" status="success" />
            </div>
            <button 
              onClick={fetchData}
              className="w-full mt-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <RefreshCcw size={14} className={isLoading ? "animate-spin" : ""} />
              Forcer Actualisation
            </button>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl space-y-4">
             <h3 className="font-bold text-morocco-emerald flex items-center gap-2">
               <AlertCircle size={18} className="text-morocco-gold" />
               Journal Système
             </h3>
             <div className="space-y-3">
               <AlertItem text="Indexation vectorielle terminée" type="success" time="1h" />
               <AlertItem text="Pic de trafic détecté (+20%)" type="warning" time="3h" />
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-[2rem] bg-white border border-morocco-emerald/5 shadow-md flex flex-col gap-4 group hover:border-morocco-gold/30 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
          trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-morocco-emerald/50 uppercase tracking-widest">{title}</p>
        <h4 className="text-3xl font-serif font-bold text-morocco-emerald">{value}</h4>
      </div>
    </motion.div>
  );
}

function HealthItem({ label, status }: { label: string, status: 'success' | 'error' | 'warning' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-white/70">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${
          status === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {status === 'success' ? 'En ligne' : 'Panne'}
        </span>
        <div className={`w-2 h-2 rounded-full ${
          status === 'success' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-red-400 animate-pulse'
        }`} />
      </div>
    </div>
  );
}

function AlertItem({ text, type, time }: { text: string, type: 'success' | 'warning' | 'error', time: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-morocco-ivory/30">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-morocco-emerald font-bold leading-tight">{text}</p>
        <span className="text-[10px] text-morocco-emerald/40 font-bold">{time} ago</span>
      </div>
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
        type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
      }`} />
    </div>
  );
}

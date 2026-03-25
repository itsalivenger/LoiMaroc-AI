"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Trash2, 
  Search, 
  Mail, 
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  RefreshCcw,
  MoreVertical,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  createdAt: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/users`);
      if (response.ok) {
        setUsers(await response.json());
      }
    } catch (e) {
      console.error("Failed to fetch users", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${email} ? Cette action supprimera également tout son historique.`)) return;
    
    setIsActionLoading(email);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/users/${email}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setUsers(users.filter(u => u.email !== email));
      }
    } catch (e) {
      console.error("Failed to delete user", e);
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleToggleVerify = async (email: string) => {
    setIsActionLoading(email);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/users/${email}/verify`, {
        method: 'PATCH'
      });
      if (response.ok) {
        const result = await response.json();
        setUsers(users.map(u => u.email === email ? { ...u, verified: result.verified } : u));
      }
    } catch (e) {
      console.error("Failed to toggle verify", e);
    } finally {
      setIsActionLoading(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Gestion des Utilisateurs</h1>
          <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest">Contrôle des accès et comptes clients</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-morocco-emerald/10 text-morocco-emerald font-bold hover:bg-morocco-emerald hover:text-white transition-all shadow-sm"
        >
          <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Utilisateurs" value={users.length} icon={<Users />} color="emerald" />
        <StatCard title="Comptes Vérifiés" value={users.filter(u => u.verified).length} icon={<UserCheck />} color="gold" />
        <StatCard title="En attente" value={users.filter(u => !u.verified).length} icon={<UserX />} color="red" />
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-morocco-emerald/5 shadow-xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-8 border-b border-morocco-emerald/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-morocco-ivory/10">
          <div className="relative flex-grow max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-morocco-emerald/20 group-focus-within:text-morocco-gold transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-morocco-emerald focus:bg-white outline-none transition-all font-bold text-morocco-emerald"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-morocco-emerald/60 uppercase tracking-[0.2em]">{filteredUsers.length} résultats</span>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-32 flex flex-col items-center justify-center space-y-4">
              <Loader2 size={48} className="text-morocco-gold animate-spin" />
              <p className="font-bold text-morocco-emerald animate-pulse">Chargement de la base utilisateurs...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-morocco-ivory/20 text-morocco-emerald/70 text-xs font-bold uppercase tracking-[0.2em] border-b border-morocco-emerald/5">
                  <th className="px-8 py-6">Utilisateur</th>
                  <th className="px-8 py-6">Email</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Inscription</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-morocco-emerald/5 hover:bg-morocco-emerald/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-morocco-emerald/5 flex items-center justify-center text-morocco-emerald font-serif font-bold text-xl">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-morocco-emerald">{user.name}</p>
                            <p className="text-[10px] text-morocco-emerald/30 font-bold uppercase tracking-widest italic flex items-center gap-1">
                              ID: {user.id.substring(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-morocco-emerald/90 font-bold text-sm">
                          <Mail size={14} className="text-morocco-gold" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 w-fit ${
                          user.verified 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {user.verified ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {user.verified ? "Vérifié" : "Non vérifié"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <p className="text-sm font-bold text-morocco-emerald/90 flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-morocco-emerald/30 font-bold ml-6 uppercase">
                            {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleVerify(user.email)}
                            disabled={isActionLoading === user.email}
                            title={user.verified ? "Invalider" : "Vérifier"}
                            className={`p-3 rounded-xl transition-all shadow-sm ${
                              user.verified 
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' 
                              : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                            }`}
                          >
                            {isActionLoading === user.email ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.email)}
                            disabled={isActionLoading === user.email}
                            title="Supprimer"
                            className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          >
                            {isActionLoading === user.email ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredUsers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-30">
                        <Users size={64} />
                        <p className="text-xl font-serif font-bold text-morocco-emerald">Aucun utilisateur trouvé</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: 'emerald' | 'gold' | 'red' }) {
  const colorMap = {
    emerald: 'bg-morocco-emerald/5 text-morocco-emerald',
    gold: 'bg-morocco-gold/5 text-morocco-gold',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl flex items-center justify-between group hover:border-morocco-emerald/20 transition-all">
      <div>
        <p className="text-xs font-bold text-morocco-emerald/60 uppercase tracking-[0.2em] mb-2">{title}</p>
        <p className="text-4xl font-serif font-bold text-morocco-emerald">{value}</p>
      </div>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
}

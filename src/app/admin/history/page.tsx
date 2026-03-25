"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Search, Trash2, Eye, X, RefreshCcw, User, Clock, MessageSquare, AlertCircle } from "lucide-react";

interface Message {
  role: string;
  content: string;
  source?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  email?: string;
  updatedAt: number;
}

export default function AdminHistoryPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/sessions`);
      if (response.ok) {
        setSessions(await response.json());
      }
    } catch (e) {
      console.error("Failed to fetch sessions", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Voulez-vous vraiment supprimer cette conversation ?")) return;
    
    setIsDeleting(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/sessions/${id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (selectedSession?.id === id) setSelectedSession(null);
      }
    } catch (e) {
      console.error("Failed to delete session", e);
      alert("Erreur lors de la suppression.");
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (session.email && session.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Historique des Conversations</h1>
          <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest">Gérez et consultez les sessions de vos utilisateurs</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-morocco-emerald/5 shadow-sm flex-grow max-w-md">
          <Search className="text-morocco-emerald/80 ml-2" size={20} />
          <input 
            type="text"
            placeholder="Rechercher par titre ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none p-2 font-bold text-morocco-emerald placeholder-morocco-emerald/30"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-morocco-emerald/5 shadow-xl overflow-hidden relative min-h-[500px]">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
            <RefreshCcw className="animate-spin text-morocco-gold mb-4" size={48} />
            <p className="font-bold text-morocco-emerald animate-pulse">Synchronisation des historiques...</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-morocco-emerald/80">
            <History size={64} className="mb-4 opacity-20" />
            <p className="font-bold text-lg">Aucune conversation trouvée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-morocco-ivory/20 text-morocco-emerald border-b border-morocco-emerald/10">
                  <th className="p-6 font-black uppercase text-xs tracking-wider">Date</th>
                  <th className="p-6 font-black uppercase text-xs tracking-wider">Titre</th>
                  <th className="p-6 font-black uppercase text-xs tracking-wider">Utilisateur</th>
                  <th className="p-6 font-black uppercase text-xs tracking-wider text-center">Messages</th>
                  <th className="p-6 font-black uppercase text-xs tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-morocco-emerald/5">
                {filteredSessions.map((session) => (
                  <tr 
                    key={session.id} 
                    onClick={() => setSelectedSession(session)}
                    className={`transition-colors cursor-pointer group ${
                      selectedSession?.id === session.id ? 'bg-morocco-gold/5' : 'hover:bg-morocco-emerald/5'
                    }`}
                  >
                    <td className="p-6 text-sm font-bold text-morocco-emerald/90 whitespace-nowrap">
                      {new Date(session.updatedAt).toLocaleString('fr-FR', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-6 font-bold text-morocco-emerald max-w-[200px] truncate">
                      {session.title}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-morocco-emerald/10 flex items-center justify-center text-morocco-emerald">
                          <User size={14} />
                        </div>
                        <span className="font-bold text-sm text-morocco-emerald/80 truncate max-w-[150px]">
                          {session.email || "Anonyme"}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-center font-bold text-morocco-emerald/90">
                      <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 inline-flex mx-auto">
                        <MessageSquare size={14} />
                        {session.messages.length}
                      </div>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedSession(session); }}
                        className="p-2 rounded-xl text-morocco-emerald/80 hover:text-morocco-emerald hover:bg-morocco-emerald/10 transition-colors"
                        title="Voir la conversation"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(session.id, e)}
                        disabled={isDeleting === session.id}
                        className="p-2 rounded-xl text-red-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Supprimer"
                      >
                        {isDeleting === session.id ? <RefreshCcw size={20} className="animate-spin" /> : <Trash2 size={20} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Session Viewer Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-morocco-emerald/90 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 50 }}
              className="bg-white rounded-[2rem] w-full max-w-4xl max-h-full flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8 bg-morocco-ivory/30 border-b border-morocco-emerald/10 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-morocco-emerald">{selectedSession.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm font-bold text-morocco-emerald/90">
                    <span className="flex items-center gap-1"><User size={14}/> {selectedSession.email || 'Anonyme'}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {new Date(selectedSession.updatedAt).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSession(null)}
                  className="p-3 rounded-xl bg-white text-morocco-emerald shadow-sm hover:bg-morocco-gold hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6 bg-morocco-ivory/10">
                {selectedSession.messages.length === 0 ? (
                  <p className="text-center text-morocco-emerald/50 font-medium italic py-10">Aucun message dans cette session.</p>
                ) : (
                  selectedSession.messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-3xl p-6 ${
                        msg.role === 'user' 
                          ? 'bg-morocco-emerald text-white rounded-tr-none' 
                          : 'bg-white border text-morocco-emerald rounded-tl-none shadow-sm'
                      }`}>
                        <div className="flex items-center gap-2 mb-2 opacity-50 text-sm font-black uppercase tracking-widest">
                          {msg.role === 'user' ? <User size={12} /> : <AlertCircle size={12} />}
                          {msg.role === 'user' ? 'Utilisateur' : 'LoiMaroc AI'}
                        </div>
                        <p className={`whitespace-pre-wrap leading-relaxed font-medium ${msg.role === 'user' ? 'text-white' : 'text-morocco-emerald/80'}`}>
                          {msg.content}
                        </p>
                        {msg.source && msg.role !== 'user' && (
                          <div className="mt-4 pt-4 border-t border-morocco-emerald/10">
                            <p className="text-sm font-bold text-morocco-gold flex items-center gap-1">
                              <AlertCircle size={12} /> Source Juridique:
                            </p>
                            <p className="text-sm font-bold text-morocco-emerald/80 mt-1 line-clamp-3 italic">
                              {msg.source}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

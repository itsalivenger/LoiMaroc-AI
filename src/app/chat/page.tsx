"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Scale, User, Paperclip, Search, Plus, Trash2, BookOpen, Clock, ChevronRight, MessageSquare, ShieldCheck } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export default function ChatPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle hydration and load sessions
  useEffect(() => {
    setMounted(true);
    
    // Get logged in user
    const storedUser = localStorage.getItem("user");
    let currentUserEmail = null;
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setUser(u);
        currentUserEmail = u.email;
      } catch (e) {}
    }

    // Load from backend if possible, else fallback to localStorage
    const loadSessions = async () => {
      if (currentUserEmail) {
        // Clear local storage sessions logic as requested
        localStorage.removeItem("loimaroc_chats");
        
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/sessions/user/${currentUserEmail}`);
          if (res.ok) {
            const data = await res.json();
            if (data.length > 0) {
              setSessions(data);
              setCurrentSessionId(data[0].id);
            } else {
              createNewSession();
            }
            return;
          }
        } catch (e) {
          console.error("Failed to load backend sessions", e);
        }
        
        // If logged in but fetch fails, still don't fallback to local
        createNewSession();
        return;
      }

      // Fallback to local
      const saved = localStorage.getItem("loimaroc_chats");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSessions(parsed);
          if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
          else createNewSession();
        } catch (e) {
          createNewSession();
        }
      } else {
        createNewSession();
      }
    };

    loadSessions();
  }, []);

  // Save sessions to LocalStorage only for guests
  useEffect(() => {
    if (mounted && sessions.length > 0 && !user) {
      localStorage.setItem("loimaroc_chats", JSON.stringify(sessions));
    }
  }, [sessions, mounted, user]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sessions, currentSessionId]);

  const createNewSession = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: "Nouvelle Consultation",
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  // Prevent hydration mismatch
  if (!mounted) return <div className="h-screen bg-morocco-ivory/20" />;

  const handleSend = async (overrideText?: string) => {
    const text = overrideText ?? input;
    if (!text.trim() || !currentSessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    // Optimistic update
    const updatedMessages = [...(currentSession?.messages || []), userMessage];
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: updatedMessages, updatedAt: Date.now() };
      }
      return s;
    }));

    if (!overrideText) setInput("");
    else setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          session_id: currentSessionId,
          user_email: user?.email || null
        })
      });

      if (!response.ok) throw new Error("Erreur de communication avec le serveur");

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.answer,
        source: data.sources?.[0] || undefined
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          const finalMessages = [...updatedMessages, aiMessage];
          // Sync with backend MongoDB
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...s, messages: finalMessages, email: user?.email })
          });
          return { ...s, messages: finalMessages };
        }
        return s;
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-morocco-ivory/20 overflow-hidden font-sans">
      {/* Sidebar - Recent Chats */}
      <aside className="hidden lg:flex flex-col w-80 shrink-0 bg-white border-r border-morocco-emerald/5 shadow-xl overflow-hidden">
        <div className="p-6">
          <button 
            onClick={createNewSession}
            className="w-full py-4 rounded-2xl bg-morocco-emerald text-morocco-ivory font-bold flex items-center justify-center gap-2 hover:bg-morocco-emerald/90 transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Nouvelle Question
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-4 space-y-2 pb-8">
          <h3 className="px-4 text-xs font-black text-morocco-emerald/40 uppercase tracking-[0.2em] mb-4">Historique Récent</h3>
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`w-full p-4 rounded-2xl text-left flex items-start gap-4 transition-all group ${
                currentSessionId === session.id 
                ? 'bg-morocco-emerald/5 border-morocco-emerald/10 border' 
                : 'hover:bg-morocco-emerald/5 border-transparent border'
              }`}
            >
              <div className={`mt-1 ${currentSessionId === session.id ? 'text-morocco-gold' : 'text-morocco-emerald/30'}`}>
                <MessageSquare size={18} />
              </div>
              <div className="flex-grow min-w-0">
                <p className={`text-sm font-bold truncate ${currentSessionId === session.id ? 'text-morocco-emerald' : 'text-morocco-emerald/70'}`}>
                  {session.messages[0]?.content || 'Nouvelle Consultation'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className="text-morocco-emerald/30" />
                  <p className="text-[10px] text-morocco-emerald/40 font-bold uppercase">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative bg-white lg:rounded-tl-[3rem] shadow-inner overflow-hidden">
        {/* Chat Header */}
        <header className="px-8 py-6 border-b border-morocco-emerald/5 flex justify-between items-center bg-white/50 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-morocco-emerald flex items-center justify-center text-morocco-gold shadow-lg">
              <Scale size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-morocco-emerald">Moteur IA Juridique</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-morocco-emerald/50 font-bold uppercase tracking-widest">Connecté au Code du Travail</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl bg-morocco-ivory text-morocco-emerald hover:bg-morocco-gold/10 transition-colors">
              <BookOpen size={20} />
            </button>
            <button className="p-3 rounded-xl bg-morocco-ivory text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto px-6 py-10 space-y-8 scroll-smooth" ref={scrollRef}>
          {currentSession?.messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-8">
              <div className="w-24 h-24 rounded-full bg-morocco-emerald/5 flex items-center justify-center text-morocco-emerald mb-4">
                <Search size={48} className="opacity-20" />
              </div>
              <div className="space-y-4">
                <h1 className="font-serif text-4xl font-bold text-morocco-emerald">Comment puis-je vous éclairer ?</h1>
                <p className="text-lg text-morocco-emerald font-bold leading-relaxed">
                  Posez une question sur le droit du travail marocain, une réglementation spécifique ou un précédent juridique.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <SuggestionCard text="Quelles sont les conditions de licenciement ?" onSelect={(t) => handleSend(t)} />
                <SuggestionCard text="Puis-je avoir un contrat verbal ?" onSelect={(t) => handleSend(t)} />
                <SuggestionCard text="La durée légale de la période d'essai ?" onSelect={(t) => handleSend(t)} />
                <SuggestionCard text="Calcul de la prime d'ancienneté" onSelect={(t) => handleSend(t)} />
              </div>
            </div>
          )}

          {currentSession?.messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] space-y-2`}>
                <div className={`p-6 rounded-[2rem] shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-morocco-emerald text-morocco-ivory rounded-tr-none' 
                  : 'bg-morocco-ivory text-morocco-emerald rounded-tl-none border border-morocco-emerald/5'
                }`}>
                  <p className="leading-relaxed text-lg font-bold">{msg.content}</p>
                </div>
                {msg.source && (
                  <div className="px-4 flex items-center gap-2 text-morocco-gold text-xs font-bold uppercase tracking-widest italic">
                    <ShieldCheck size={14} /> Source: {msg.source}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="p-6 rounded-[2rem] bg-morocco-ivory/50 rounded-tl-none flex gap-2">
                <div className="w-2 h-2 rounded-full bg-morocco-emerald/20 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-morocco-emerald/40 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-morocco-emerald/60 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-morocco-emerald/5">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center group">
              <div className="absolute left-6 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors">
                <Paperclip size={24} />
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question juridique..."
                className="w-full pl-16 pr-20 py-6 rounded-[2.5rem] border-2 border-morocco-emerald/10 bg-morocco-ivory/20 focus:bg-white focus:border-morocco-emerald outline-none transition-all text-lg font-medium text-morocco-emerald"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="absolute right-4 p-4 rounded-3xl bg-morocco-emerald text-morocco-gold hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:scale-100"
              >
                <Send size={24} />
              </button>
            </div>
            <p className="text-center mt-4 text-xs text-morocco-emerald/30 font-bold uppercase tracking-[0.2em]">
              L'IA peut faire des erreurs. Pour toute décision critique, consultez un avocat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SuggestionCard({ text, onSelect }: { text: string; onSelect: (text: string) => void }) {
  return (
    <button
      onClick={() => onSelect(text)}
      className="p-4 rounded-2xl bg-morocco-ivory/40 text-left hover:bg-morocco-gold/10 hover:border-morocco-gold/30 border border-transparent transition-all group flex items-center justify-between"
    >
      <span className="text-sm font-bold text-morocco-emerald group-hover:text-morocco-emerald">{text}</span>
      <ChevronRight size={16} className="text-morocco-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
    </button>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MessageSquare, CheckCircle, AlertCircle, Loader2, Phone, 
  MapPin, Clock, ArrowRight, ExternalLink, Globe as GlobeIcon, Mail
} from "lucide-react";

const LinkedinIconSVG = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface AppConfig {
  contact_recipient?: string;
  contact_phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`);
        if (response.ok) {
          setConfig(await response.json());
        }
      } catch (e) {
        console.error("Failed to fetch contact config", e);
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', text: "Votre message a volé vers nous avec succès. À très vite !" });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(data.detail || "Échec de l'envoi");
      }
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || "Un problème est survenu. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#071E15] text-white selection:bg-morocco-gold selection:text-white relative overflow-hidden pb-32">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-morocco-emerald/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-morocco-gold/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center pt-24 pb-16 px-6 relative z-10"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-morocco-gold text-sm font-bold uppercase tracking-[0.2em] mb-8 shadow-2xl backdrop-blur-md">
          <MessageSquare size={16} /> Entrons en contact
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
          Une Idée ? Une Question ?
        </h1>
        <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl font-medium leading-relaxed">
          Que vous soyez un citoyen cherchant clarté ou un partenaire technique, nous sommes là pour créer l'avenir juridique ensemble.
        </p>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Infos & Socials */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-lg group hover:border-morocco-gold/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-morocco-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <MapPin className="text-morocco-gold mb-6 relative z-10" size={32} />
                <h3 className="text-xl font-bold mb-2 relative z-10 text-white">Siège Social</h3>
                <p className="text-white/60 font-medium relative z-10">Technopark, Casablanca<br/>Maroc</p>
              </motion.div>

              <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-lg group hover:border-morocco-gold/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-morocco-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <Clock className="text-morocco-gold mb-6 relative z-10" size={32} />
                <h3 className="text-xl font-bold mb-2 relative z-10 text-white">Disponibilité</h3>
                <p className="text-white/60 font-medium relative z-10">Lun - Ven : 09h à 18h<br/>IA 24/7</p>
              </motion.div>

              {config?.contact_recipient && (
                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-lg group hover:border-morocco-gold/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-morocco-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <Mail className="text-morocco-gold mb-6 relative z-10" size={32} />
                  <h3 className="text-xl font-bold mb-2 relative z-10 text-white">Email</h3>
                  <a href={`mailto:${config.contact_recipient}`} className="text-white/60 font-medium relative z-10 hover:text-white transition-colors block">{config.contact_recipient}</a>
                </motion.div>
              )}

              {config?.contact_phone && (
                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-lg group hover:border-morocco-gold/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-morocco-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <Phone className="text-morocco-gold mb-6 relative z-10" size={32} />
                  <h3 className="text-xl font-bold mb-2 relative z-10 text-white">Téléphone</h3>
                  <p className="text-white/60 font-medium relative z-10">{config.contact_phone}</p>
                </motion.div>
              )}
            </div>

            {/* Social Links Panel */}
            <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-morocco-emerald/20 border border-morocco-emerald/30 shadow-2xl backdrop-blur-md">
              <h3 className="font-serif text-2xl font-bold mb-6 text-white">Connectons-nous</h3>
              <div className="flex flex-col gap-4">
                {config?.linkedin_url ? (
                  <a 
                    href={config.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#0A66C2] border border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 font-bold text-white">
                      <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:bg-white group-hover:text-[#0A66C2] transition-colors">
                        <LinkedinIconSVG size={20} />
                      </div>
                      LinkedIn Profile
                    </div>
                    <ExternalLink size={18} className="text-white/30 group-hover:text-white transition-colors" />
                  </a>
                ) : (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/30 text-sm font-medium italic">
                    LinkedIn non configuré
                  </div>
                )}

                {config?.portfolio_url ? (
                  <a 
                    href={config.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-morocco-gold border border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 font-bold text-white">
                      <div className="w-10 h-10 rounded-full bg-morocco-gold text-[#071E15] flex items-center justify-center group-hover:bg-[#071E15] group-hover:text-morocco-gold transition-colors">
                        <GlobeIcon size={20} />
                      </div>
                      Portfolio Web
                    </div>
                    <ExternalLink size={18} className="text-white/30 group-hover:text-[#071E15] transition-colors" />
                  </a>
                ) : (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/30 text-sm font-medium italic">
                    Portfolio non configuré
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Dynamic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Form Glow Effect based on focus */}
            <div className={`absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-morocco-gold to-transparent opacity-0 transition-opacity duration-700 ${focusedField ? 'opacity-100' : ''}`} />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative group">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">Appelez-moi</label>
                  <div className="relative">
                    <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-morocco-gold' : 'text-white/30'}`} size={20} />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#03110C]/50 border-2 border-transparent focus:border-morocco-gold focus:bg-[#03110C] outline-none transition-all font-medium text-white placeholder-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative group">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">Email</label>
                  <div className="relative">
                    <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-morocco-gold' : 'text-white/30'}`} size={20} />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#03110C]/50 border-2 border-transparent focus:border-morocco-gold focus:bg-[#03110C] outline-none transition-all font-medium text-white placeholder-white/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">Téléphone <span className="text-white/20 normal-case">(Optionnel)</span></label>
                <div className="relative">
                  <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'phone' ? 'text-morocco-gold' : 'text-white/30'}`} size={20} />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#03110C]/50 border-2 border-transparent focus:border-morocco-gold focus:bg-[#03110C] outline-none transition-all font-medium text-white placeholder-white/20"
                    placeholder="+212 6 XX XX XX XX"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-2">Votre Message</label>
                <div className="relative">
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-6 rounded-3xl bg-[#03110C]/50 border-2 border-transparent focus:border-morocco-gold focus:bg-[#03110C] outline-none transition-all font-medium text-white placeholder-white/20 resize-none"
                    placeholder="Dites-nous tout..."
                  />
                </div>
              </div>

              <AnimatePresence>
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`flex items-center gap-3 p-5 rounded-2xl font-bold text-sm border backdrop-blur-sm ${
                      status.type === 'success' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                      {status.text}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 rounded-3xl bg-white text-[#071E15] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-morocco-gold hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(207,169,104,0.3)] disabled:opacity-50 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Envoyer"}
                  {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              </button>
            </form>
          </motion.div>
          
        </div>
      </main>
    </div>
  );
}

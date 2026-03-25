"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, Info, BookOpen, Users, Globe } from "lucide-react";

interface AboutData {
  about_title: string;
  about_content: string;
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/config`);
        if (response.ok) {
          setData(await response.json());
        }
      } catch (e) {
        console.error("Failed to fetch about content", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="min-h-screen bg-morocco-ivory/10 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-morocco-emerald">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-morocco-gold rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-morocco-gold rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-morocco-gold rounded-3xl mx-auto flex items-center justify-center shadow-2xl mb-8"
          >
            <ShieldCheck size={40} className="text-white" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-serif text-5xl md:text-7xl text-white font-bold"
          >
            {isLoading ? "Chargement..." : data?.about_title || "À Propos de LoiMaroc AI"}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            className="h-1 bg-morocco-gold mx-auto rounded-full"
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto -mt-20 px-6 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-morocco-emerald/5 p-12 md:p-20 space-y-12">
          
          <div className="prose prose-lg max-w-none">
            <p className="text-morocco-emerald/80 leading-relaxed font-bold text-xl first-letter:text-5xl first-letter:font-serif first-letter:text-morocco-gold first-letter:mr-3 first-letter:float-left">
              {data?.about_content || "Chargement du contenu..."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-morocco-emerald/5">
            <FeatureCard 
              icon={<Scale className="text-morocco-gold" />}
              title="Précis & Officiel"
              desc="Nos réponses sont exclusivement basées sur les Bulletins Officiels et les textes de loi marocains."
            />
            <FeatureCard 
              icon={<BookOpen className="text-morocco-gold" />}
              title="Base Documentaire"
              desc="Accédez à une bibliothèque exhaustive de codes, décrets et jurisprudence marocaine."
            />
            <FeatureCard 
              icon={<Users className="text-morocco-gold" />}
              title="Pour Tous"
              desc="Simple pour les citoyens, puissant pour les professionnels du droit et étudiants."
            />
            <FeatureCard 
              icon={<Globe className="text-morocco-gold" />}
              title="Accessible 24/7"
              desc="Une assistance juridique instantanée, où que vous soyez au Maroc ou ailleurs."
            />
          </div>
        </div>
      </main>

      {/* Vision Section */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <div className="p-12 md:p-20 rounded-[4rem] bg-morocco-emerald text-morocco-ivory relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-morocco-gold/10 rounded-full blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Notre Vision</h2>
              <div className="h-1 w-24 bg-morocco-gold rounded-full" />
              <p className="text-lg font-bold text-morocco-ivory/80 leading-loose">
                LoiMaroc AI est le premier pont intelligent entre le texte de loi brut et la réalité quotidienne des citoyens. Nous croyons que la technologie doit démocratiser l'information juridique.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square rounded-3xl bg-morocco-gold/20 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <BookOpen size={40} className="text-morocco-gold" />
                <p className="font-serif text-3xl font-bold">100%</p>
                <p className="text-xs font-black uppercase tracking-widest text-morocco-gold">Légal & Sûr</p>
              </div>
              <div className="aspect-square rounded-3xl bg-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <Users size={40} className="text-morocco-gold" />
                <p className="font-serif text-3xl font-bold">V1.0</p>
                <p className="text-xs font-black uppercase tracking-widest text-morocco-gold">Officiel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center px-6">
        <p className="text-sm font-bold text-morocco-emerald/30 uppercase tracking-[0.4em]">© 2026 LoiMaroc AI • Fièrement Marocain 🇲🇦</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="p-4 rounded-2xl bg-morocco-emerald/5 group-hover:bg-morocco-gold/10 transition-colors">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold text-morocco-emerald">{title}</h3>
        <p className="text-morocco-emerald/50 text-sm font-bold leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

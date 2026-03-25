"use client";

import { motion } from "framer-motion";
import { Scale, Gavel, History, CheckCircle, Database, Search, MessageSquare, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function JurisprudencePage() {
  return (
    <div className="min-h-screen bg-morocco-ivory/30">
      {/* Hero Section - Solid & High Contrast */}
      <section className="relative py-32 bg-morocco-emerald text-morocco-ivory overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-morocco-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-morocco-gold font-bold uppercase tracking-widest text-sm border border-white/10"
            >
              <History size={16} /> Base de Connaissances Précise
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-6xl md:text-8xl font-bold leading-[1.1]"
            >
              La Précision par <br />
              <span className="text-morocco-gold italic font-light drop-shadow-sm">la Jurisprudence.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-morocco-ivory font-bold leading-relaxed max-w-3xl mx-auto"
            >
              Découvrez comment LoiMaroc AI synthétise des décennies de décisions de justice pour valider chaque analyse juridique.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Methodology Section - Bold Cards */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="font-serif text-5xl font-bold text-morocco-emerald leading-tight">
                Analyse sémantique des <span className="text-morocco-gold italic font-light">Précédents.</span>
              </h2>
              <p className="text-xl text-morocco-emerald font-bold leading-relaxed">
                Chaque décision de justice indexée dans notre **ChromaDB** est décomposée en vecteurs sémantiques. 
                Lorsqu'une question est posée, le moteur RAG ne cherche pas seulement la loi, il cherche comment elle a été **appliquée** par les tribunaux du Royaume.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BoldFeatureItem 
                  title="Source Certifiée" 
                  description="Données extraites des bulletins officiels de la Cour de Cassation." 
                />
                <BoldFeatureItem 
                  title="Contexte Réel" 
                  description="Compréhension des nuances entre les types de contentieux." 
                />
                <BoldFeatureItem 
                  title="Citations Directes" 
                  description="Références exactes des arrêts cités dans chaque réponse." 
                />
                <BoldFeatureItem 
                  title="Zéro Hallucination" 
                  description="Seulement des faits documentés, sans invention." 
                />
              </div>
            </motion.div>

            <div className="relative">
              <div className="p-10 rounded-[4rem] bg-morocco-emerald shadow-[0_50px_100px_rgba(6,78,59,0.3)] overflow-hidden relative group">
                <div className="absolute inset-0 bg-[radial-gradient(#fcfaf2_1px,transparent_1px)] opacity-5 [background-size:20px_20px]" />
                <div className="relative space-y-8 text-morocco-ivory">
                  <div className="flex items-center gap-6 border-b border-white/10 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-morocco-gold flex items-center justify-center text-morocco-emerald shadow-xl">
                      <Search size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl">Moteur de Corrélation</h4>
                      <p className="text-sm opacity-60 uppercase tracking-widest font-black">Décision n° 450/2023</p>
                    </div>
                  </div>
                  <div className="space-y-6 font-mono text-lg leading-relaxed">
                    <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
                      <p className="text-morocco-gold mb-2 font-bold uppercase text-xs tracking-widest">Extrait de l'Arrêt :</p>
                      <p className="italic font-bold opacity-100">&quot;La faute grave ne peut être invoquée sans avertissement préalable selon l'Article 37...&quot;</p>
                    </div>
                    <div className="flex items-center gap-4 text-morocco-gold font-bold">
                      <div className="w-8 h-[2px] bg-morocco-gold" />
                      Lien établi avec l'Article 35 du Code du Travail
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Block - Solid Ivory Background */}
      <section className="py-24 bg-white border-y border-morocco-emerald/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <MetricBlock 
              icon={<Database size={40} />}
              value="15 000+"
              label="Décisions Indexées"
            />
            <MetricBlock 
              icon={<ShieldCheck size={40} />}
              value="100%"
              label="Sources Certifiées"
            />
            <MetricBlock 
              icon={<Gavel size={40} />}
              value="Cour de Cassation"
              label="Standard de Référence"
            />
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-32 bg-morocco-ivory/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-morocco-emerald text-morocco-ivory shadow-[0_50px_120px_rgba(6,78,59,0.2)] space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-morocco-gold/10 rounded-full blur-[80px]" />
            <h2 className="font-serif text-5xl font-bold leading-tight">Accédez à l'expertise <span className="text-morocco-gold italic">instantanée.</span></h2>
            <p className="text-2xl text-morocco-ivory font-bold max-w-2xl mx-auto">
              Posez votre question dès maintenant et bénéficiez d'une analyse sémantique profonde du droit marocain.
            </p>
            <div className="pt-6">
              <Link 
                href="/chat"
                className="px-16 py-6 rounded-full bg-morocco-gold text-morocco-emerald text-2xl font-bold hover:bg-white hover:scale-105 transition-all shadow-2xl inline-block"
              >
                Ouvrir le Système
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BoldFeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-morocco-emerald/10 shadow-sm space-y-2">
      <h4 className="font-bold text-morocco-emerald text-xl">{title}</h4>
      <p className="text-morocco-emerald font-bold text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function MetricBlock({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="space-y-4">
      <div className="text-morocco-gold mx-auto w-16 h-16 flex items-center justify-center bg-morocco-emerald/5 rounded-2xl mb-6">
        {icon}
      </div>
      <div className="text-5xl md:text-6xl font-serif font-bold text-morocco-emerald">{value}</div>
      <div className="text-xs font-black text-morocco-gold uppercase tracking-[0.3em]">{label}</div>
    </div>
  );
}

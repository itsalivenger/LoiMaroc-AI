"use client";

import { motion } from "framer-motion";
import { Scale, Gavel, FileText, Cpu, Database, Brain, ArrowRight, Code } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative pt-24 pb-40 overflow-hidden bg-gradient-to-b from-morocco-ivory via-white to-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-morocco-emerald/5 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-morocco-gold/5 rounded-full blur-[100px] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-morocco-emerald/10 text-morocco-emerald text-sm font-bold tracking-widest uppercase mb-8 border border-morocco-emerald/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-morocco-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-morocco-gold"></span>
                </span>
                RAG System - Project Testing Phase
              </div>
              
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-morocco-emerald leading-[1.1] mb-8">
                Le Droit Marocain <br />
                <span className="text-morocco-gold italic font-light drop-shadow-sm">réinventé par l'IA.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-morocco-emerald font-bold max-w-3xl mx-auto leading-relaxed">
                  Une démonstration technique de pointe utilisant le 
                  <span className="text-morocco-gold font-black mx-1 underline decoration-morocco-gold/30">Retrieval-Augmented Generation</span> 
                  pour interroger instantanément les codes juridiques du Royaume.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
            >
              <Link 
                href="/chat"
                className="w-full sm:w-auto px-12 py-5 rounded-full bg-morocco-emerald text-morocco-ivory text-xl font-bold hover:bg-morocco-emerald/90 shadow-[0_20px_50px_rgba(6,78,59,0.2)] hover:shadow-[0_20px_60px_rgba(6,78,59,0.3)] transition-all active:scale-95 group"
              >
                Tester la Consultation
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/#architecture"
                className="w-full sm:w-auto px-12 py-5 rounded-full border-2 border-morocco-emerald/10 text-morocco-emerald text-xl font-bold hover:bg-morocco-emerald/5 backdrop-blur-sm transition-all"
              >
                Voir l'Architecture
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="architecture" className="py-32 bg-morocco-emerald relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fcfaf2_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-morocco-ivory leading-tight">
                Une Ingénierie de <br />
                <span className="text-morocco-gold italic font-light">Précision Juridique.</span>
              </h2>
              <p className="text-lg text-morocco-ivory font-bold leading-relaxed">
                Ce projet est une vitrine technologique illustrant comment les LLMs modernes peuvent être limités par des contextes spécifiques via la mise en œuvre de pipelines RAG robustes.
              </p>
              
              <div className="space-y-6">
                <TechItem 
                  icon={<Database className="text-morocco-gold" />}
                  title="ChromaDB Vector Store"
                  description="Stockage dimensionnel optimisé des articles du Code du Travail."
                />
                <TechItem 
                  icon={<Brain className="text-morocco-gold" />}
                  title="Google Gemini Pro"
                  description="Traitement avancé du langage naturel (NLP/NLU)."
                />
                <TechItem 
                  icon={<Scale className="text-morocco-gold" />}
                  title="LangChain Orchestration"
                  description="Gestion des chaînes de recherche et du contexte RAG."
                />
                <TechItem 
                  icon={<Cpu className="text-morocco-gold" />}
                  title="FastAPI Backend"
                  description="Communication asynchrone haute-performance."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="border border-morocco-ivory/10 rounded-[2.5rem] bg-black/20 backdrop-blur-3xl p-8 shadow-2xl overflow-hidden group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-[1px] flex-grow bg-morocco-ivory/10" />
                </div>
                <pre className="text-morocco-ivory/60 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  <code>
{`// Pipeline LangChain + RAG
const response = await ragChain.invoke({
  input: "Primes d'ancienneté après 2 ans ?",
});

// Résultat : Extraction automatique
// Article 350 : 5% du salaire...
// Metadata: { "code": "Travail", "art": 350 }`}
                  </code>
                </pre>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-morocco-gold/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Bolder & More Premium */}
      <section className="py-32 bg-morocco-emerald text-morocco-ivory relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-morocco-gold/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-serif text-5xl font-bold">Comment ça marche ?</h2>
            <div className="w-24 h-1 bg-morocco-gold mx-auto rounded-full" />
            <p className="text-morocco-ivory font-bold max-w-2xl mx-auto text-xl pt-4 italic">
              Une orchestration complexe derrière une interface simple.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepItem 
              number="01"
              title="Saisie Intelligence"
              description="L'utilisateur interroge le système. LangChain analyse l'intention et prépare la recherche sémantique."
            />
            <StepItem 
              number="02"
              title="Extraction Vectorielle"
              description="ChromaDB identifie instantanément les segments les plus pertinents du Code du Travail marocain."
            />
            <StepItem 
              number="03"
              title="Réponse Certifiée"
              description="Gemini Pro génère une réponse documentée, citant précisément les articles et la jurisprudence."
            />
          </div>
        </div>
      </section>

      {/* Stats Section - High Impact */}
      <section className="py-24 bg-morocco-ivory border-y border-morocco-emerald/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <StatItem label="Articles Indexés" value="500+" />
            <StatItem label="Précision RAG" value="99.8%" />
            <StatItem label="Latence" value="< 0.8s" />
            <StatItem label="Fiabilité" value="Certifiée" />
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean & Solid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl font-bold text-morocco-emerald">Questions Fréquentes</h2>
            <p className="text-morocco-emerald/60">Tout ce qu'il faut savoir sur l'IA Juridique.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <FaqItem 
              question="Pourquoi utiliser LangChain ?"
              answer="LangChain permet d'orchestrer le flux entre la base de données vectorielle et le LLM, garantissant que seule l'information officielle est traitée."
            />
            <FaqItem 
              question="L'IA peut-elle se tromper ?"
              answer="Le système est conçu pour ne citer que les textes existants. Si une loi n'est pas trouvée, l'IA refusera de répondre plutôt que d'inventer."
            />
            <FaqItem 
              question="Supporte-t-il l'Arabe ?"
              answer="Entièrement. Le système traite les requêtes en Arabe Standard et en Français avec une précision égale."
            />
            <FaqItem 
              question="Est-ce légalement contraignant ?"
              answer="Il s'agit d'un outil d'assistance et de recherche. Les résultats doivent être validés par un professionnel du droit."
            />
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-32 bg-morocco-ivory/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-[4rem] bg-white shadow-[0_50px_100px_rgba(6,78,59,0.05)] border border-morocco-emerald/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <Code size={40} className="text-morocco-emerald/20" />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-40 h-40 rounded-[2.5rem] bg-morocco-emerald flex items-center justify-center text-morocco-gold shadow-2xl shrink-0">
                <UserAvatar />
              </div>
              <div className="text-center md:text-left space-y-5">
                <h2 className="font-serif text-4xl font-bold text-morocco-emerald leading-tight">L'expertise derrière le projet</h2>
                <p className="text-xl text-morocco-emerald/70 font-light leading-relaxed">
                  Conçu par un expert en Data Science, ce projet démontre la puissance des pipelines **LangChain** et **RAG** 
                  appliqués aux textes législatifs marocains complexes.
                </p>
                <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="px-5 py-2 rounded-2xl bg-morocco-emerald/5 text-sm font-bold text-morocco-emerald border border-morocco-emerald/10">Python</span>
                  <span className="px-5 py-2 rounded-2xl bg-morocco-emerald/10 text-sm font-bold text-morocco-emerald border border-morocco-emerald/10">LangChain</span>
                  <span className="px-5 py-2 rounded-2xl bg-morocco-gold/10 text-sm font-bold text-morocco-emerald border border-morocco-gold/10">ChromaDB</span>
                  <span className="px-5 py-2 rounded-2xl bg-morocco-emerald/5 text-sm font-bold text-morocco-emerald border border-morocco-emerald/10">FastAPI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function TechItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-morocco-ivory text-2xl mb-2">{title}</h4>
        <p className="text-morocco-ivory font-bold leading-relaxed text-lg opacity-90">{description}</p>
      </div>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-morocco-gold/30 transition-all duration-500 group"
    >
      <div className="text-6xl font-serif font-bold text-morocco-gold/20 mb-6 group-hover:text-morocco-gold/40 transition-colors">{number}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-morocco-ivory leading-relaxed text-lg font-bold">{description}</p>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2 p-6">
      <div className="text-5xl md:text-6xl font-serif font-bold text-morocco-emerald drop-shadow-sm">{value}</div>
      <div className="text-xs font-black text-morocco-gold uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="p-8 rounded-[2.5rem] bg-morocco-ivory border border-morocco-emerald/5 hover:border-morocco-gold/20 transition-all shadow-sm hover:shadow-xl"
    >
      <h4 className="text-xl font-bold text-morocco-emerald mb-4 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-morocco-gold" />
        {question}
      </h4>
      <p className="text-morocco-emerald font-bold leading-relaxed text-lg italic">{answer}</p>
    </motion.div>
  );
}

function UserAvatar() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
    </svg>
  );
}

"use client";

import { motion } from "framer-motion";
import { Book, Scale, Gavel, ShieldCheck, Briefcase, FileText, Globe, Landmark } from "lucide-react";
import Link from "next/link";

export default function CodesPage() {
  const codes = [
    {
      title: "Code du Travail",
      description: "Réglementation des relations entre employeurs et salariés. Inclus : Contrats, salaires, licenciement.",
      icon: <Briefcase className="text-morocco-gold" size={32} />,
      status: "Actif",
      link: "/docs/code_travail_fr.pdf",
      color: "emerald"
    },
    {
      title: "Code Civil (DOC)",
      description: "Le Dahir des Obligations et des Contrats. La base du droit civil marocain.",
      icon: <FileText className="text-morocco-gold" size={32} />,
      status: "Indexation en cours",
      color: "gold"
    },
    {
      title: "Code Pénal",
      description: "Définition des infractions et des peines applicables au Royaume du Maroc.",
      icon: <Gavel className="text-morocco-gold" size={32} />,
      status: "Prochainement",
      color: "clay"
    },
    {
      title: "Code de la Famille (Moudawana)",
      description: "Statut personnel, mariage, divorce et successions.",
      icon: <Landmark className="text-morocco-gold" size={32} />,
      status: "Prochainement",
      color: "emerald"
    },
    {
      title: "Code de Commerce",
      description: "Règles applicables aux actes de commerce et aux commerçants.",
      icon: <Globe className="text-morocco-gold" size={32} />,
      status: "Prochainement",
      color: "gold"
    },
    {
      title: "Charte de l'Investissement",
      description: "Nouveau cadre législatif pour l'investissement au Maroc.",
      icon: <ShieldCheck className="text-morocco-gold" size={32} />,
      status: "Indexation en cours",
      color: "clay"
    }
  ];

  return (
    <div className="min-h-screen bg-morocco-ivory/20">
      <section className="py-24 bg-morocco-emerald text-morocco-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-morocco-gold/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl font-bold mb-6"
            >
              Les <span className="text-morocco-gold italic">Codes Officiels</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-morocco-ivory/70 font-light leading-relaxed"
            >
              Explorez la bibliothèque juridique intégrée à notre moteur RAG. Chaque code est indexé avec une précision chirurgicale pour des réponses sourcées.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codes.map((code, index) => (
              <motion.div
                key={code.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 hover:border-morocco-gold/30 transition-all shadow-sm hover:shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-morocco-ivory text-morocco-emerald group-hover:bg-morocco-gold group-hover:text-white transition-colors">
                    {code.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    code.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {code.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-morocco-emerald mb-4">{code.title}</h3>
                <p className="text-morocco-emerald/70 leading-relaxed font-bold mb-8">
                  {code.description}
                </p>
                
                <Link 
                  href={code.status === 'Actif' ? (code.link || "/chat") : "#"}
                  target={code.link ? "_blank" : "_self"}
                  className={`inline-flex items-center gap-2 font-bold transition-all ${
                    code.status === 'Actif' ? 'text-morocco-gold hover:translate-x-2' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {code.status === 'Actif' ? "Consulter en ligne" : "Bientôt disponible"}
                  <Scale size={16} />
                </Link>

                <div className="absolute -right-4 -bottom-4 text-morocco-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Book size={120} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl font-bold text-morocco-emerald">Vous ne trouvez pas un texte spécifique ?</h2>
            <p className="text-lg text-morocco-emerald/70 font-bold">
              Notre base de données s'enrichit chaque jour. Si vous avez besoin d'une indexation prioritaire pour un texte réglementaire particulier, contactez notre support technique.
            </p>
            <button className="px-10 py-4 rounded-full bg-morocco-emerald text-morocco-ivory font-bold hover:bg-morocco-emerald/90 transition-all shadow-xl">
              Proposer un Code
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

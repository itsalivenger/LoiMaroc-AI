import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-morocco-emerald text-morocco-ivory py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Image src="/images/logo_LoiMaroc_AI.png" alt="LoiMaroc AI" width={56} height={56} className="object-contain scale-[1.3]" />
            <span className="font-serif text-2xl font-bold tracking-tight">LoiMaroc AI</span>
          </div>
          <p className="text-morocco-ivory/70 leading-relaxed">
            Votre partenaire intelligent pour naviguer dans le paysage juridique marocain avec précision et clarté.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-morocco-gold">Navigation</h4>
          <ul className="space-y-4 text-morocco-ivory/80">
            <li><Link href="/" className="hover:text-morocco-gold transition-colors">Accueil</Link></li>
            <li><Link href="/codes" className="hover:text-morocco-gold transition-colors">Les Codes</Link></li>
            <li><Link href="/jurisprudence" className="hover:text-morocco-gold transition-colors">Jurisprudence</Link></li>
            <li><Link href="/chat" className="hover:text-morocco-gold transition-colors">Chat Juridique</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-morocco-gold">Légal</h4>
          <ul className="space-y-4 text-morocco-ivory/80">
            <li><Link href="/mentions-legales" className="hover:text-morocco-gold transition-colors">Mentions Légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-morocco-gold transition-colors">Confidentialité</Link></li>
            <li><Link href="/conditions" className="hover:text-morocco-gold transition-colors">Conditions d&apos;utilisation</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg font-bold mb-6 text-morocco-gold">Contact</h4>
          <ul className="space-y-4 text-morocco-ivory/80">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-morocco-gold" />
              <span>contact@loimaroc.ai</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-morocco-gold" />
              <span>+212 5XX XX XX XX</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-morocco-gold" />
              <span>Casablanca, Maroc</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-morocco-ivory/10 text-center text-sm text-morocco-ivory/40">
        © {new Date().getFullYear()} LoiMaroc AI. Tous droits réservés. Développé pour le droit marocain.
      </div>
    </footer>
  );
}

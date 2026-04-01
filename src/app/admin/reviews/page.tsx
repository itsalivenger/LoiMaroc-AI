"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Clock, User, ShieldCheck, Search, Filter } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  session_id: string;
  user_email?: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (e) {
      console.error("Failed to fetch reviews", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(r => 
    r.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (r.user_email && r.user_email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-morocco-emerald mb-2">Avis Clients</h1>
          <p className="text-morocco-emerald/60 font-semibold uppercase text-xs tracking-widest">Retours d'expérience utilisateurs</p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-3 rounded-2xl bg-white border border-morocco-emerald/5 shadow-sm flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-morocco-gold/10 text-morocco-gold flex items-center justify-center">
                <Star size={20} fill="currentColor" />
             </div>
             <div>
                <p className="text-[10px] font-black text-morocco-emerald/40 uppercase">Moyenne</p>
                <p className="text-xl font-serif font-bold text-morocco-emerald">
                  {reviews.length > 0 
                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
                    : "0.0"}
                </p>
             </div>
          </div>
          <div className="px-6 py-3 rounded-2xl bg-white border border-morocco-emerald/5 shadow-sm flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-morocco-emerald/5 text-morocco-emerald flex items-center justify-center">
                <MessageSquare size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-morocco-emerald/40 uppercase">Total</p>
                <p className="text-xl font-serif font-bold text-morocco-emerald">{reviews.length}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-morocco-emerald/30 group-focus-within:text-morocco-gold transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher dans les commentaires ou emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-morocco-emerald/10 bg-white focus:border-morocco-gold outline-none transition-all font-medium text-morocco-emerald"
          />
        </div>
        <button className="px-6 py-4 rounded-2xl bg-white border border-morocco-emerald/10 text-morocco-emerald font-bold flex items-center gap-2 hover:bg-morocco-ivory transition-colors">
          <Filter size={20} />
          Filtrer
        </button>
      </div>

      {/* Grid of Reviews */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 rounded-[2.5rem] bg-white animate-pulse border border-morocco-emerald/5" />
          ))}
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="p-20 text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-morocco-emerald/20">
          <div className="w-20 h-20 rounded-full bg-morocco-emerald/5 flex items-center justify-center mx-auto text-morocco-emerald/20">
            <Star size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-morocco-emerald">Aucun avis trouvé</h3>
            <p className="text-morocco-emerald/60">Les retours des utilisateurs s'afficheront ici.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group p-8 rounded-[2.5rem] bg-white border border-morocco-emerald/5 shadow-xl hover:shadow-2xl hover:border-morocco-gold/30 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star 
                        key={s} 
                        size={16} 
                        className={s <= review.rating ? "fill-morocco-gold text-morocco-gold" : "text-morocco-emerald/10 fill-transparent"} 
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-black text-morocco-emerald/30 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={12} />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-morocco-emerald font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-morocco-emerald/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-morocco-emerald/5 flex items-center justify-center text-morocco-emerald">
                    <User size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-morocco-emerald uppercase truncate">
                      {review.user_email?.split('@')[0] || "Anonyme"}
                    </p>
                    <p className="text-[10px] text-morocco-emerald/40 font-bold truncate">
                      {review.user_email || "Utilisateur Invité"}
                    </p>
                  </div>
                </div>
                <div title="ID de Session: {review.session_id}" className="w-8 h-8 rounded-lg bg-morocco-ivory flex items-center justify-center text-morocco-emerald/20 hover:text-morocco-emerald transition-colors cursor-help">
                  <ShieldCheck size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, CheckCircle2, MessageSquare, Send } from "lucide-react";

interface ReviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  userEmail?: string | null;
}

export default function ReviewOverlay({ isOpen, onClose, sessionId, userEmail }: ReviewOverlayProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Veuillez sélectionner une note.");
      return;
    }
    if (!comment.trim()) {
      setError("Veuillez laisser un commentaire.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment,
          session_id: sessionId,
          user_email: userEmail
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset after closing
          setTimeout(() => {
            setIsSuccess(false);
            setRating(0);
            setComment("");
          }, 500);
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-morocco-emerald/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-morocco-emerald/10"
          >
            {/* Success State Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <CheckCircle2 size={80} className="text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-serif font-bold text-morocco-emerald">Merci pour votre avis !</h2>
                  <p className="text-morocco-emerald/60 font-medium">Votre feedback nous aide à améliorer LoiMaroc AI.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-8 pb-0 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif font-bold text-morocco-emerald">Évaluer l'Assistant</h2>
                <p className="text-sm text-morocco-emerald/60 font-bold uppercase tracking-widest mt-1">Votre expérience compte</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-morocco-ivory text-morocco-emerald/40 transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Star Rating */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                      className="transition-all transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        size={40} 
                        className={`transition-colors ${
                          (hoverRating || rating) >= s 
                          ? 'fill-morocco-gold text-morocco-gold' 
                          : 'text-morocco-emerald/10 fill-transparent'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm font-bold text-morocco-gold uppercase tracking-[0.2em]">
                  {rating === 1 ? "Décevant" : 
                   rating === 2 ? "Passable" :
                   rating === 3 ? "Satisfaisant" :
                   rating === 4 ? "Excellent" :
                   rating === 5 ? "Parfait" : "Sélectionnez une note"}
                </p>
              </div>

              {/* Comment Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-morocco-emerald text-xs font-black uppercase tracking-widest">
                  <MessageSquare size={14} />
                  <span>Votre Commentaire</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Qu'avez-vous pensé de la pertinence des réponses ?"
                  className="w-full min-h-[120px] p-4 rounded-2xl border-2 border-morocco-emerald/10 bg-morocco-ivory/20 focus:bg-white focus:border-morocco-emerald outline-none transition-all text-morocco-emerald font-medium resize-none"
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm font-bold text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Action Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === 0 || !comment.trim()}
                className="w-full py-5 rounded-2xl bg-morocco-emerald text-morocco-gold font-bold flex items-center justify-center gap-3 hover:bg-morocco-emerald/90 transition-all shadow-xl disabled:opacity-50 group hover:scale-[1.02] active:scale-95"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-morocco-gold border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Soumettre l'Avis
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

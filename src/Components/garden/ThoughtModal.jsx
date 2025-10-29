import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  contentment: "bg-stone-100 text-stone-700 border-stone-200",
  nostalgia: "bg-amber-100 text-amber-700 border-amber-200",
  gratitude: "bg-yellow-100 text-yellow-700 border-yellow-200",
  melancholy: "bg-blue-100 text-blue-700 border-blue-200",
  renewal: "bg-green-100 text-green-700 border-green-200",
  peace: "bg-purple-100 text-purple-700 border-purple-200",
  loneliness: "bg-gray-100 text-gray-700 border-gray-200",
  restlessness: "bg-red-100 text-red-700 border-red-200",
  hope: "bg-lime-100 text-lime-700 border-lime-200",
  reflection: "bg-pink-100 text-pink-700 border-pink-200",
  satisfaction: "bg-orange-100 text-orange-700 border-orange-200",
  fatigue: "bg-slate-100 text-slate-700 border-slate-200",
  wonder: "bg-indigo-100 text-indigo-700 border-indigo-200",
  regret: "bg-violet-100 text-violet-700 border-violet-200",
  love: "bg-rose-100 text-rose-700 border-rose-200"
};

export default function ThoughtModal({ thought, onClose }) {
  if (!thought) return null;

  const getFormattedDate = () => {
    try {
      if (!thought.entry_date && !thought.created_date) return "Unknown date";
      const dateStr = thought.entry_date || thought.created_date;
      const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
      return isValid(date) ? format(date, "MMMM d, yyyy") : "Unknown date";
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 opacity-50" />
          
          <div className="relative p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <Badge className={`${categoryColors[thought.category]} border`}>
                  {thought.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-lg leading-relaxed text-stone-800 font-serif">
                  "{thought.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                    Planted
                  </p>
                  <p className="text-sm text-stone-700 font-medium">
                    {getFormattedDate()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                    Bloomed as
                  </p>
                  <p className="text-sm text-stone-700 font-medium capitalize">
                    {thought.plant_type?.replace(/_/g, ' ') || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
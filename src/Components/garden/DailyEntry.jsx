import React from "react";
import { motion } from "framer-motion";
import { format, isValid, parseISO } from "date-fns";
import PlantVisualization from "./PlantVisualization";

export default function DailyEntry({ thought, index, onClick }) {
  const getFormattedDate = () => {
    try {
      if (!thought.entry_date) return "?";
      const date = typeof thought.entry_date === 'string' ? parseISO(thought.entry_date) : new Date(thought.entry_date);
      return isValid(date) ? format(date, "d") : "?";
    } catch (error) {
      return "?";
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.7,
        type: "spring",
        stiffness: 120
      }}
    >
      {/* Date badge above flower */}
      <motion.div
        className="mb-3 bg-white/95 px-4 py-2 rounded-full shadow-lg border-2 border-emerald-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.2 }}
      >
        <span className="text-lg font-bold text-emerald-700">
          {getFormattedDate()}
        </span>
      </motion.div>

      {/* Flower */}
      <PlantVisualization 
        thought={thought}
        onClick={onClick}
      />

      {/* Ground patch under flower */}
      <motion.div 
        className="mt-2 w-20 h-4 bg-green-700/30 rounded-full blur-sm"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
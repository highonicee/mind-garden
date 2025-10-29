import React from "react";
import { motion } from "framer-motion";

export default function PlantVisualization({ thought, onClick }) {
  const getFlowerEmoji = (plantType) => {
    const emojiMap = {
      chamomile: "🌼",
      jasmine: "🌸",
      sunflower: "🌻",
      bluebell: "🔔",
      lily: "🌷",
      lavender: "💜",
      moonflower: "🌙",
      red_poppy: "🌺",
      dandelion: "🌾",
      lotus: "🪷",
      marigold: "🌼",
      wilted_rose: "🥀",
      morning_glory: "🌸",
      hydrangea: "🌺",
      rose: "🌹",
    };
    return emojiMap[plantType] || "🌸";
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.2, y: -10 }}
    >
      {/* Flower emoji */}
      <motion.div
        className="text-6xl mb-2"
        animate={{ 
          rotate: [0, 5, 0, -5, 0],
          y: [0, -5, 0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {getFlowerEmoji(thought.plant_type)}
      </motion.div>
      
      {/* Hover tooltip */}
      <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-xs text-stone-700 max-w-[140px] truncate font-medium px-3 py-1.5 bg-white/90 rounded-lg shadow-md border border-stone-200">
          {thought.text}
        </p>
      </div>
    </motion.div>
  );
}
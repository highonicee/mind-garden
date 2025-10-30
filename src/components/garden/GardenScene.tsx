import React from "react";
import { motion } from "framer-motion";
import { Download, Share2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { IconButton } from "../ui/ActionButton.jsx";
import DailyEntry from "./DailyEntry.jsx";

export default function GardenScene({ thoughts, onThoughtClick }) {
  const handleDownload = () => {
    alert("To save your garden, take a screenshot! On mobile: Press power + volume down. On desktop: Use your OS screenshot tool.");
  };

  const handleShare = async () => {
    const text = `Check out my Mind Garden! I've been cultivating my emotions for ${thoughts.length} days 🌸🌿`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Mind Garden',
          text: text,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error sharing:", error);
        }
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Message copied to clipboard! Share it with your friends.");
    }
  };

  // Group thoughts by month and sort by date within each month
  const groupedByMonth = thoughts.reduce((acc, thought) => {
    const date = new Date(thought.entry_date);
    const monthKey = format(date, 'yyyy-MM');
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(thought);
    return acc;
  }, {});

  // Sort months in descending order (most recent first)
  const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => b.localeCompare(a));

  return (
    <div className="relative space-y-12">
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-3 z-20">
        <IconButton
          icon={Download}
          onClick={handleDownload}
          tooltip="Save garden (screenshot)"
        />
        <IconButton
          icon={Share2}
          onClick={handleShare}
          tooltip="Share garden"
        />
      </div>

      {sortedMonths.map((monthKey, monthIndex) => {
        const monthThoughts = groupedByMonth[monthKey].sort((a, b) => 
          new Date(a.entry_date).getDate() - new Date(b.entry_date).getDate()
        );
        const monthDate = new Date(monthKey);

        return (
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: monthIndex * 0.1, duration: 0.8 }}
            className="relative"
          >
            {/* Month Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-emerald-200">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="text-xl font-serif font-semibold text-stone-800">
                  {format(monthDate, 'MMMM yyyy')}
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
            </div>

            {/* Simple Garden Container */}
            <div className="relative min-h-[300px] bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200">
              {/* Flowers arranged left to right by date */}
              <div className="relative z-10 flex flex-wrap items-end justify-start gap-8 sm:gap-12 md:gap-16">
                {monthThoughts.map((thought, index) => (
                  <DailyEntry
                    key={thought.id}
                    thought={thought}
                    index={index}
                    onClick={() => onThoughtClick(thought)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
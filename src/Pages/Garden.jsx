import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PrimaryButton } from "../components/ui/ActionButton.jsx";
import GardenScene from "../components/garden/GardenScene.tsx";
import ThoughtModal from "../components/garden/ThoughtModal.jsx";
import { someFunction } from "@/lib/thoughtsapi";


export default function Garden() {
  const [selectedThought, setSelectedThought] = useState(null);

  // THIS NEEDS TO BE INSIDE THE COMPONENT!
  const { data: thoughts, isLoading } = useQuery({
    queryKey: ['thoughts'],
    queryFn: () => thoughtsApi.list('-entry_date'),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600 font-serif">Growing your garden...</p>
        </div>
      </div>
    );
  }

  if (thoughts.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-serif font-semibold text-stone-800 mb-4">
            Your Garden Awaits
          </h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Every day, plant one feeling. Watch your garden grow with beautiful flowers 
            and peaceful objects. Each entry tells the story of your emotional journey.
          </p>
          <Link to={createPageUrl("AddThought")}>
            <PrimaryButton icon={Sparkles} className="w-full">
              Plant Today's Feeling
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-2">
              Your Mind Garden
            </h1>
            <p className="text-stone-600">
              {thoughts.length} {thoughts.length === 1 ? 'day' : 'days'} of growth and reflection
            </p>
          </div>
        </div>
      </motion.div>

      <GardenScene 
        thoughts={thoughts}
        onThoughtClick={setSelectedThought}
      />

      <ThoughtModal
        thought={selectedThought}
        onClose={() => setSelectedThought(null)}
      />
    </div>
  );
}
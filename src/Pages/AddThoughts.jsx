import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { PrimaryButton, SecondaryButton } from "../components/ui/ActionButton.jsx";
import { thoughtsApi } from "@/lib/thoughtsapi";


const emotionMapping = {
  contentment: { flower: "chamomile", object: "bench", color: "#f9fafb", emoji: "🌙" },
  nostalgia: { flower: "jasmine", object: "lantern", color: "#fef3c7", emoji: "🌅" },
  gratitude: { flower: "sunflower", object: "birdbath", color: "#fbbf24", emoji: "🌤️" },
  melancholy: { flower: "bluebell", object: "watering_can", color: "#93c5fd", emoji: "🌧️" },
  renewal: { flower: "lily", object: "seedling", color: "#fce7f3", emoji: "🌿" },
  peace: { flower: "lavender", object: "pathway", color: "#c4b5fd", emoji: "🌇" },
  loneliness: { flower: "moonflower", object: "swing", color: "#e0e7ff", emoji: "🌑" },
  restlessness: { flower: "red_poppy", object: "wind_chime", color: "#f87171", emoji: "🔥" },
  hope: { flower: "dandelion", object: "garden_gate", color: "#fef08a", emoji: "🌾" },
  reflection: { flower: "lotus", object: "pond", color: "#fbcfe8", emoji: "💭" },
  satisfaction: { flower: "marigold", object: "soil", color: "#fb923c", emoji: "✨" },
  fatigue: { flower: "wilted_rose", object: "trellis", color: "#9ca3af", emoji: "🌙" },
  wonder: { flower: "morning_glory", object: "fireflies", color: "#a5b4fc", emoji: "💫" },
  regret: { flower: "hydrangea", object: "clay_pot", color: "#c084fc", emoji: "💔" },
  love: { flower: "rose", object: "vines", color: "#fda4af", emoji: "🌸" },
};

const categories = [
  { value: "contentment", label: "Contentment" },
  { value: "nostalgia", label: "Nostalgia" },
  { value: "gratitude", label: "Gratitude" },
  { value: "melancholy", label: "Melancholy" },
  { value: "renewal", label: "Renewal" },
  { value: "peace", label: "Peace" },
  { value: "loneliness", label: "Loneliness" },
  { value: "restlessness", label: "Restlessness" },
  { value: "hope", label: "Hope" },
  { value: "reflection", label: "Reflection" },
  { value: "satisfaction", label: "Satisfaction" },
  { value: "fatigue", label: "Fatigue" },
  { value: "wonder", label: "Wonder" },
  { value: "regret", label: "Regret" },
  { value: "love", label: "Love" },
];

export default function AddThought() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");
  
  const [formData, setFormData] = useState({
    text: "",
    category: "reflection",
    entry_date: today
  });

  const createThoughtMutation = useMutation({
    mutationFn: (thoughtData) => thoughtsApi.create(thoughtData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thoughts'] });
      navigate(createPageUrl("Garden"));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emotion = emotionMapping[formData.category];
    const fullData = {
      ...formData,
      text: formData.text.trim() || `Feeling ${formData.category} today`,
      plant_type: emotion.flower,
      garden_object: emotion.object,
      color: emotion.color,
    };
    createThoughtMutation.mutate(fullData);
  };

  const selectedEmotion = emotionMapping[formData.category];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg"
               style={{ imageRendering: 'pixelated' }}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-2">
            How Are You Feeling Today?
          </h1>
          <p className="text-stone-600">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-4 border-stone-200/50">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium text-stone-700 mb-3 block">
                  Choose Your Emotion
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {categories.map((cat) => {
                    const emotion = emotionMapping[cat.value];
                    return (
                      <motion.button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.value })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          formData.category === cat.value
                            ? "border-emerald-500 bg-emerald-50 scale-105 shadow-md"
                            : "border-stone-300 hover:border-stone-400 hover:bg-stone-50"
                        }`}
                      >
                        <div className="text-2xl mb-1">{emotion.emoji}</div>
                        <div className="text-xs font-medium text-stone-700">
                          {cat.label}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Preview of what will bloom */}
              <motion.div
                className="p-6 bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl border-2 border-stone-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm font-medium text-stone-600 mb-3">Today will bloom:</p>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg border-2 border-stone-300 flex items-center justify-center text-2xl"
                  >
                    {selectedEmotion.emoji}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-stone-800 capitalize">
                      {selectedEmotion.flower.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-stone-600 capitalize">
                      {formData.category}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div>
                <Label htmlFor="thought" className="text-base font-medium text-stone-700 mb-3 block">
                  Share Your Thoughts (Optional)
                </Label>
                <Textarea
                  id="thought"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="What made you feel this way today? What's on your mind?"
                  className="min-h-[120px] text-base resize-none border-2 border-stone-300 focus:border-emerald-400 rounded-2xl font-serif"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <SecondaryButton
              onClick={() => navigate(createPageUrl("Garden"))}
              disabled={createThoughtMutation.isPending}
              className="flex-1"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={createThoughtMutation.isPending}
              loading={createThoughtMutation.isPending}
              icon={Sparkles}
              className="flex-1"
            >
              {createThoughtMutation.isPending ? "Planting..." : "Plant Today's Feeling"}
            </PrimaryButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

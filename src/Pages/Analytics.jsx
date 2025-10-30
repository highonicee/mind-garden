import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Heart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfWeek, endOfWeek, isWithinInterval, format, subWeeks, isValid, parseISO } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { thoughtsApi } from "@/lib/thoughtsapi";


const categoryColors = {
  contentment: "#f9fafb",
  nostalgia: "#fef3c7",
  gratitude: "#fbbf24",
  melancholy: "#93c5fd",
  renewal: "#86efac",
  peace: "#c4b5fd",
  loneliness: "#9ca3af",
  restlessness: "#f87171",
  hope: "#fef08a",
  reflection: "#e9d5ff",
  satisfaction: "#fbbf24",
  fatigue: "#d1d5db",
  wonder: "#a5b4fc",
  regret: "#fda4af",
  love: "#fbcfe8"
};

export default function Analytics() {
  const { data: thoughts, isLoading } = useQuery({
    queryKey: ['thoughts'],
    queryFn: () => thoughtsApi.list('-created_at'),
    initialData: [],
  });

  const getValidDate = (dateStr) => {
    try {
      if (!dateStr) return null;
      const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
      return isValid(date) ? date : null;
    } catch (error) {
      return null;
    }
  };

  const getWeeklyData = () => {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(new Date(), i));
      const weekEnd = endOfWeek(weekStart);
      const count = thoughts.filter(t => {
        const date = getValidDate(t.entry_date || t.created_at);
        return date && isWithinInterval(date, { start: weekStart, end: weekEnd });
      }).length;
      weeks.push({
        name: i === 0 ? 'This Week' : `${i} week${i > 1 ? 's' : ''} ago`,
        thoughts: count
      });
    }
    return weeks;
  };

  const getCategoryData = () => {
    const categoryCounts = {};
    thoughts.forEach(t => {
      if (t.category) {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
      }
    });
    return Object.entries(categoryCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: categoryColors[name]
    }));
  };

  const getThisWeekCount = () => {
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());
    return thoughts.filter(t => {
      const date = getValidDate(t.entry_date || t.created_at);
      return date && isWithinInterval(date, { start: weekStart, end: weekEnd });
    }).length;
  };

  const getFavoriteCategory = () => {
    const categoryData = getCategoryData();
    if (categoryData.length === 0) return null;
    return categoryData.reduce((max, cat) => cat.value > max.value ? cat : max);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600 font-serif">Loading insights...</p>
        </div>
      </div>
    );
  }

  const weeklyData = getWeeklyData();
  const categoryData = getCategoryData();
  const thisWeekCount = getThisWeekCount();
  const favoriteCategory = getFavoriteCategory();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-2">
          Your Growth Journey
        </h1>
        <p className="text-stone-600">
          Insights and patterns from your mind garden
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-stone-600">
                  Total Thoughts
                </CardTitle>
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-stone-800">
                {thoughts.length}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Flowers in your garden
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-stone-600">
                  This Week
                </CardTitle>
                <Calendar className="w-5 h-5 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-stone-800">
                {thisWeekCount}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                New thoughts planted
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-stone-600">
                  Favorite Theme
                </CardTitle>
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stone-800 capitalize">
                {favoriteCategory?.name || 'N/A'}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                {favoriteCategory?.value || 0} thoughts
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-stone-600">
                  Streak
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-stone-800">
                {Math.ceil(thoughts.length / 7)}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Weeks of growth
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    stroke="#78716c"
                  />
                  <YAxis stroke="#78716c" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="thoughts" 
                    fill="#10b981" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Thought Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-stone-500">
                  No data yet
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Thoughts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Recent Reflections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {thoughts.slice(0, 5).map((thought, index) => {
                const date = getValidDate(thought.entry_date || thought.created_at);
                const dateStr = date ? format(date, "MMM d, yyyy") : "Unknown date";
                
                return (
                  <motion.div
                    key={thought.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-stone-50 to-transparent rounded-2xl border border-stone-200"
                  >
                    <p className="text-stone-700 font-serif mb-2">
                      "{thought.text}"
                    </p>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="capitalize">{thought.category}</span>
                      <span>•</span>
                      <span>{dateStr}</span>
                      <span>•</span>
                      <span className="capitalize">{thought.plant_type?.replace(/_/g, ' ') || 'Unknown'}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

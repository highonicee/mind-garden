import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Plus, BarChart3, Flower2 } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-stone-800">
                Mind Garden
              </span>
            </Link>

            <nav className="flex gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive('/')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Garden</span>
              </Link>

              <Link
                to="/addthought"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive('/addthought')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add</span>
              </Link>

              <Link
                to="/analytics"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive('/analytics')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-stone-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-stone-600 text-sm">
          <p>🌸 Cultivate your emotions, one day at a time 🌸</p>
        </div>
      </footer>
    </div>
  );
}
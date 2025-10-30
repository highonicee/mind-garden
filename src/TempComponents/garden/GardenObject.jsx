import React from "react";
import { motion } from "framer-motion";

export default function GardenObject({ objectType, category }) {
  const objectStyles = {
    bench: (
      <motion.div 
        className="relative w-24 h-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-4 left-2 w-3 h-8 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-4 right-2 w-3 h-8 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-12 left-0 w-24 h-2 bg-amber-700 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-14 left-0 w-24 h-8 bg-amber-800 rounded-t-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
      </motion.div>
    ),
    lantern: (
      <motion.div 
        className="relative w-16 h-24"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-8 left-6 w-1 h-12 bg-stone-800" style={{ boxShadow: '1px 1px 0 rgba(0,0,0,0.3)' }} />
        <motion.div 
          className="absolute bottom-20 left-4 w-8 h-10 bg-amber-200 rounded-sm border-2 border-amber-900"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
        />
        <div className="absolute bottom-30 left-6 w-4 h-2 bg-stone-800 rounded-t-sm" />
      </motion.div>
    ),
    birdbath: (
      <motion.div 
        className="relative w-20 h-24"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-4 left-7 w-6 h-12 bg-stone-400 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-16 left-3 w-14 h-8 bg-stone-300 rounded-full border-2 border-stone-500" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <motion.div 
          className="absolute bottom-17 left-6 w-2 h-2 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ),
    watering_can: (
      <motion.div 
        className="relative w-20 h-16"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-4 left-4 w-12 h-8 bg-teal-700 rounded-lg border-2 border-teal-900" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-8 left-2 w-6 h-6 bg-teal-600 rounded-sm" style={{ transform: 'rotate(-30deg)' }} />
        <div className="absolute bottom-5 right-2 w-2 h-4 bg-teal-800 rounded-sm" />
        <motion.div
          className="absolute bottom-1 left-6 w-1 h-2 bg-blue-300"
          animate={{ height: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    ),
    seedling: (
      <motion.div 
        className="relative w-16 h-16"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, type: "spring" }}
      >
        <div className="absolute bottom-2 left-2 w-12 h-8 bg-amber-900 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <motion.div 
          className="absolute bottom-8 left-6 w-1 h-6 bg-green-600"
          animate={{ height: [4, 24, 4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-12 left-5 w-3 h-2 bg-green-500 rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ),
    pathway: (
      <motion.div 
        className="relative w-32 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-10 bg-stone-400 rounded-sm border border-stone-600"
            style={{ 
              left: `${i * 16}px`,
              bottom: `${i % 2 === 0 ? 0 : 4}px`,
              boxShadow: '2px 2px 0 rgba(0,0,0,0.2)'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </motion.div>
    ),
    swing: (
      <motion.div 
        className="relative w-24 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-8 left-2 w-2 h-24 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-8 right-2 w-2 h-24 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute top-0 left-2 right-2 h-2 bg-amber-900 rounded-sm" />
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-14 left-6 origin-top"
        >
          <div className="w-1 h-12 bg-stone-600" />
          <div className="w-12 h-4 bg-amber-700 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        </motion.div>
      </motion.div>
    ),
    wind_chime: (
      <motion.div 
        className="relative w-20 h-24"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute top-2 left-7 w-6 h-2 bg-stone-700 rounded-full" />
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-12 bg-cyan-400 rounded-full"
            style={{ 
              left: `${20 + i * 8}px`,
              top: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            animate={{ 
              x: [0, Math.sin(i) * 3, 0],
              rotate: [0, Math.sin(i) * 5, 0]
            }}
            transition={{ 
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    ),
    garden_gate: (
      <motion.div 
        className="relative w-28 h-28"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-4 left-2 w-3 h-24 bg-stone-700 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-4 right-2 w-3 h-24 bg-stone-700 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-2 h-16 bg-amber-700 rounded-sm"
            style={{ 
              left: `${12 + i * 12}px`,
              bottom: '12px',
              boxShadow: '1px 1px 0 rgba(0,0,0,0.3)'
            }}
          />
        ))}
        <div className="absolute top-4 left-2 right-2 h-3 bg-stone-700 rounded-sm" />
      </motion.div>
    ),
    pond: (
      <motion.div 
        className="relative w-32 h-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div 
          className="absolute bottom-2 left-2 w-28 h-16 bg-blue-300 rounded-full border-2 border-blue-500"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{ left: '20px', bottom: '10px' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ),
    soil: (
      <motion.div 
        className="relative w-24 h-12"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="w-full h-full bg-amber-900 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-950 rounded-sm"
            style={{ 
              left: `${10 + i * 8}px`,
              top: `${4 + (i % 2) * 4}px`
            }}
          />
        ))}
      </motion.div>
    ),
    trellis: (
      <motion.div 
        className="relative w-20 h-32"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-4 left-2 w-2 h-28 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-4 right-2 w-2 h-28 bg-amber-800 rounded-sm" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-16 h-1 bg-amber-700"
            style={{ 
              bottom: `${12 + i * 6}px`,
              left: '2px',
              transform: `rotate(${15}deg)`
            }}
          />
        ))}
      </motion.div>
    ),
    fireflies: (
      <motion.div className="relative w-24 h-24">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{ 
              left: `${Math.random() * 80}px`,
              top: `${Math.random() * 80}px`,
              boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
              x: [0, Math.sin(i) * 10, 0],
              y: [0, Math.cos(i) * 10, 0]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    ),
    clay_pot: (
      <motion.div 
        className="relative w-16 h-16"
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-orange-800 rounded-b-lg border-2 border-orange-900" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }} />
        <div className="absolute bottom-8 left-4 w-8 h-3 bg-orange-700 rounded-t-lg" />
        <div className="absolute bottom-12 left-3 w-3 h-4 bg-orange-900 rounded-sm" style={{ transform: 'rotate(-15deg)' }} />
      </motion.div>
    ),
    vines: (
      <motion.div 
        className="relative w-24 h-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {[0, 1].map((vine) => (
          <motion.div key={vine} className="absolute" style={{ left: `${vine * 12}px` }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-4 bg-green-600 rounded-sm"
                style={{ 
                  top: `${i * 8}px`,
                  left: `${Math.sin(i * 0.8) * 8}px`,
                  transform: `rotate(${Math.sin(i) * 30}deg)`
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    ),
  };

  return objectStyles[objectType] || null;
}
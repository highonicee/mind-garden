import React from 'react';

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-xl border-2 border-stone-300 focus:border-emerald-500 focus:outline-none transition-colors ${className}`}
      {...props}
    />
  );
}
import React from 'react';
import { Button } from './button';

export function PrimaryButton({ children, icon: Icon, loading, className = '', ...props }) {
  return (
    <Button
      className={`bg-emerald-600 hover:bg-emerald-700 text-white ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <Button
      variant="outline"
      className={`border-stone-300 hover:bg-stone-50 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function IconButton({ icon: Icon, onClick, tooltip, className = '' }) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-stone-200 hover:bg-white hover:shadow-xl transition-all ${className}`}
    >
      <Icon className="w-5 h-5 text-stone-700" />
    </button>
  );
}
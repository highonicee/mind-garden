import React from 'react';

export function Button({ children, variant = 'default', size = 'default', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700',
    outline: 'border-2 border-stone-300 bg-white hover:bg-stone-50',
    ghost: 'hover:bg-stone-100'
  };
  
  const sizes = {
    default: 'px-6 py-3 text-base',
    sm: 'px-4 py-2 text-sm',
    icon: 'p-2'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
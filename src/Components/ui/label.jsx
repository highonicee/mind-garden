import React from 'react';

export function Label({ children, className = '', ...props }) {
  return (
    <label className={`text-sm font-medium text-stone-700 ${className}`} {...props}>
      {children}
    </label>
  );
}
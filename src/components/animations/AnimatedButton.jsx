import React from 'react';

export const AnimatedButton = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  const baseClasses = `
    px-8 py-4 font-bold text-base uppercase tracking-widest
    rounded-lg cursor-pointer transition-all duration-300
    relative overflow-hidden shadow-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const primaryClasses = `
    bg-gradient-to-r from-brand-cyan to-brand-cyan-dark text-dark-bg
    hover:shadow-glow-cyan hover:-translate-y-1
    active:-translate-y-0.5
    before:content-[''] before:absolute before:top-0 before:left-0
    before:w-full before:h-full before:bg-gradient-to-r
    before:from-transparent before:via-white before:to-transparent
    before:opacity-20 before:translate-x-[-100%]
    hover:before:translate-x-full before:transition-transform before:duration-500
  `;

  const secondaryClasses = `
    bg-dark-surface bg-opacity-80 text-white border-2 border-brand-cyan border-opacity-30
    hover:border-brand-cyan hover:border-opacity-100
    hover:bg-brand-cyan hover:bg-opacity-10
    hover:shadow-glow-cyan-sm hover:-translate-y-1
    active:-translate-y-0.5
  `;

  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {/* Ripple effect */}
      <span
        className="absolute top-1/2 left-1/2 w-0 h-0 bg-white rounded-full pointer-events-none
        transform -translate-x-1/2 -translate-y-1/2"
        style={{
          animation: 'ripple 0.6s ease-out',
        }}
      />
    </button>
  );
};

export default AnimatedButton;
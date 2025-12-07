import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ isVisible, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const next = prev + Math.random() * 30;
        if (next >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center z-50 animate-fade-in">
      {/* Pulse Ring Animation */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-10">
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]"
        >
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#0099ff" stopOpacity="1" />
            </linearGradient>
          </defs>
          {[0, 0.4, 0.8].map((delay, i) => (
            <circle
              key={i}
              cx="60"
              cy="60"
              r="30"
              fill="none"
              stroke="url(#pulseGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse-wave"
              style={{
                animationDelay: `${delay}s`,
                opacity: 1 - delay * 0.4,
              }}
            />
          ))}
        </svg>
        <div className="absolute text-xs font-bold text-brand-cyan tracking-widest uppercase animate-fade-in-out">
          Initializing
        </div>
      </div>

      {/* Title */}
      <div className="text-xl font-semibold text-white letter-spacing-wider mb-8 animate-slide-up">
        Voice Health Arena
      </div>

      {/* Progress Bar */}
      <div className="w-52 h-0.5 bg-brand-cyan bg-opacity-20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-full transition-all duration-300"
          style={{ width: `${Math.min(displayProgress, 100)}%` }}
        />
      </div>

      {/* Progress Text */}
      <div className="mt-4 text-xs text-dark-text font-medium">
        {Math.round(displayProgress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;
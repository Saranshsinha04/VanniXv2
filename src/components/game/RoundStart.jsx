import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const RoundStart = ({ roundNumber, onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recording', { state: { roundNumber } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, roundNumber]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4">
      <div className="relative z-10 text-center">
        <div className="animate-bounce mb-8">
          <div className="text-8xl">🎮</div>
        </div>
        
        <h1 className="text-5xl font-black text-white mb-4 animate-pulse">
          Round {roundNumber}
        </h1>
        
        <p className="text-2xl text-brand-cyan font-bold mb-8 animate-pulse">
          {roundNumber === 1 && 'Warm Up'}
          {roundNumber === 2 && 'Intensity'}
          {roundNumber === 3 && 'Final Push'}
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                num <= roundNumber ? 'bg-brand-cyan' : 'bg-dark-text'
              }`}
            />
          ))}
        </div>

        <p className="text-dark-text animate-pulse">Get ready...</p>
      </div>
    </div>
  );
};
export default RoundStart;
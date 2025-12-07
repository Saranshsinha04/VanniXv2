import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// 1. GAME ENTRY SCREEN
// ============================================================================

export const GameEntry = ({ userId, username }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            🎮 Voice Battle
          </h1>
          <p className="text-dark-text text-lg">Compete with your voice. Win with your health!</p>
        </div>

        {/* Two Game Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Host Game Card */}
          <button
            onClick={() => navigate('/host-game')}
            className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-brand-cyan/10 via-dark-surface to-brand-purple/10 border border-brand-cyan border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-brand-cyan/50 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="text-6xl">👑</div>
              <h2 className="text-2xl font-bold text-white">Host Game</h2>
              <p className="text-dark-text text-sm">Create a room and invite friends</p>
              <div className="text-brand-cyan font-semibold mt-4">→ Start</div>
            </div>
          </button>

          {/* Join Game Card */}
          <button
            onClick={() => navigate('/join-game')}
            className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-brand-purple/10 via-dark-surface to-brand-cyan/10 border border-brand-purple border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/0 via-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="text-6xl">🎯</div>
              <h2 className="text-2xl font-bold text-white">Join Game</h2>
              <p className="text-dark-text text-sm">Enter a room code and play</p>
              <div className="text-brand-purple font-semibold mt-4">→ Join</div>
            </div>
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center text-dark-text text-sm">
          <p>Playing as: <span className="text-brand-cyan font-semibold">{username}</span></p>
        </div>
      </div>
    </div>
  );
};
export default GameEntry;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';
import ProfileCard from '@/components/common/ProfileCard';

export const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center">
      {/* Background Effects */}
      <ParticlesBg />

      {/* Profile Header */}
      <ProfileCard username="Guest Player" avatar="A" />

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors z-20"
      >
        ← Back
      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-12 px-4">
        <div className="animate-fade-in-scale">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Game Arena
          </h1>
          <p className="text-lg text-dark-text font-medium">
            Voice interaction game would be implemented here
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="w-96 h-64 rounded-2xl border-2 border-brand-cyan border-opacity-30 bg-dark-surface bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-brand-cyan font-semibold">Game Coming Soon</p>
          </div>
        </div>

        <div className="flex gap-4">
          <AnimatedButton variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default 
Game;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';
import ProfileCard from '@/components/common/ProfileCard';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center">
      <ParticlesBg />

      <ProfileCard username="Player One" avatar="P" />

      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors z-20"
      >
        ← Home
      </button>

      <div className="relative z-10 text-center flex flex-col items-center gap-12 px-4">
        <div className="animate-fade-in-scale">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-dark-text font-medium">
            Welcome back! Here's your gaming summary
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            { label: 'Games Played', value: '24', icon: '🎮' },
            { label: 'Total Score', value: '8,450', icon: '⭐' },
            { label: 'Achievements', value: '12', icon: '🏆' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-dark-surface bg-opacity-40 backdrop-blur-lg border border-brand-cyan border-opacity-20 rounded-2xl p-6 hover:border-opacity-40 transition-all"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-brand-cyan font-semibold text-sm uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <AnimatedButton
            variant="primary"
            onClick={() => navigate('/game')}
          >
            Play Game
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
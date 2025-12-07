import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/animations/LoadingScreen';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';
import ProfileCard from '@/components/common/ProfileCard';

export const Home = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    navigate('/game');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <LoadingScreen isVisible={showLoading} />

      <div className={`fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center transition-opacity duration-500 ${showLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Effects */}
        <ParticlesBg />

        {/* Profile Header */}
        <ProfileCard username="Guest Player" avatar="A" />

        {/* Main Content */}
        <div className="relative z-10 text-center flex flex-col items-center gap-12 px-4">
          {/* Title Section */}
          <div className={`${showLoading ? '' : 'animate-fade-in-scale'}`}>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-3 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
              Voice Health Arena
            </h1>
            <p className="text-sm md:text-base text-dark-text font-semibold tracking-widest uppercase">
              Master Your Voice, Elevate Your Health
            </p>
          </div>

          {/* Button Group */}
          <div className={`flex flex-col gap-4 w-full max-w-xs ${showLoading ? '' : 'animate-slide-in-up'}`}>
            <AnimatedButton
              variant="primary"
              onClick={handlePlay}
            >
              Play
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              onClick={handleSignIn}
            >
              Sign In
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              onClick={handleSignUp}
            >
              Sign Up
            </AnimatedButton>
          </div>

          {/* Keyboard Hint */}
          <div className="text-xs text-dark-text opacity-60 mt-4">
            Press <kbd className="bg-dark-surface px-2 py-1 rounded border border-brand-cyan border-opacity-20">Enter</kbd> to play
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
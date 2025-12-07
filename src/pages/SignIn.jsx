import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email && password) {
      alert(`Signing in with ${email}`);
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center">
      <ParticlesBg />

      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors z-20"
      >
        ← Back
      </button>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-scale">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Sign In
          </h1>
          <p className="text-dark-text text-sm">Welcome back to Voice Health Arena</p>
        </div>

        <div className="bg-dark-surface bg-opacity-40 backdrop-blur-lg border border-brand-cyan border-opacity-20 rounded-2xl p-8 space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-brand-cyan tracking-widest uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-brand-cyan tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all"
            />
          </div>

          {/* Sign In Button */}
          <AnimatedButton
            variant="primary"
            onClick={handleSignIn}
            className="w-full"
          >
            Sign In
          </AnimatedButton>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-dark-text">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-brand-cyan hover:text-brand-cyan-dark transition-colors font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
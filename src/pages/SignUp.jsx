import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';
import { supabase } from '@/supabaseClient';

export const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log('Starting signup for:', email);

      // Sign up with Supabase
      // Profile is auto-created by the database trigger!
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Pass username and avatar as metadata
          // The trigger will use these to create the profile
          data: {
            username: username,
            avatar: username.charAt(0).toUpperCase(),
          },
        },
      });

      if (authError) {
        console.error('Auth error:', authError);
        setError('Sign up error: ' + authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        console.error('No user returned from signup');
        setError('Failed to create account');
        setLoading(false);
        return;
      }

      console.log('✅ Auth user created:', authData.user.id);
      console.log('📋 Profile will be auto-created by database trigger');

      // Success!
      setError('');
      alert(
        '✅ Account created successfully!\n\n' +
        'Please check your email to verify your account before signing in.'
      );
      navigate('/signin');
    } catch (err) {
      console.error('Signup exception:', err);
      setError('Error: ' + (err.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center overflow-y-auto py-8">
      <ParticlesBg />

      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors z-20"
      >
        ← Back
      </button>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-scale my-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-dark-text text-sm">Join Voice Health Arena Today</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-dark-surface bg-opacity-40 backdrop-blur-lg border border-brand-cyan border-opacity-20 rounded-2xl p-8 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold text-brand-cyan tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              disabled={loading}
              autoComplete="username"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all disabled:opacity-50"
            />
          </div>

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
              disabled={loading}
              autoComplete="email"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all disabled:opacity-50"
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
              disabled={loading}
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-xs font-semibold text-brand-cyan tracking-widest uppercase mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white placeholder-dark-text placeholder-opacity-50 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Sign Up Button */}
          <AnimatedButton
            variant="primary"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </AnimatedButton>

          {/* Sign In Link */}
          <div className="text-center text-sm text-dark-text">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-brand-cyan hover:text-brand-cyan-dark transition-colors font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
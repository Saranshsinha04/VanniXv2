import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from '@/components/animations/ParticlesBg';
import AnimatedButton from '@/components/animations/AnimatedButton';
import { supabase } from '@/services/supabaseClient';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    achievements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

        if (authError || !authUser) {
          navigate('/signin');
          return;
        }

        // Fetch user profile
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('username, avatar, games_played, total_score, achievements')
          .eq('id', authUser.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        }

        if (userProfile) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            username: userProfile.username,
            avatar: userProfile.avatar || userProfile.username?.charAt(0).toUpperCase() || 'U',
          });

          setStats({
            gamesPlayed: userProfile.games_played || 0,
            totalScore: userProfile.total_score || 0,
            achievements: userProfile.achievements || 0,
          });
        } else {
          setUser({
            id: authUser.id,
            email: authUser.email,
            username: '',
            avatar: 'P',
          });
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('user');
      navigate('/');
    } else {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex items-center justify-center">
        <div className="text-brand-cyan text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center overflow-y-auto py-8">
      <ParticlesBg />

      {/* Profile Header */}
      {user && (
        <div className="absolute top-8 right-8 flex items-center gap-3 px-5 py-3 bg-dark-surface bg-opacity-60 border border-brand-cyan border-opacity-20 rounded-full backdrop-blur-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-cyan to-brand-cyan-dark flex items-center justify-center font-bold text-sm text-dark-bg">
            {user.avatar}
          </div>
          <span className="text-xs text-dark-text font-medium">{user.username}</span>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors z-20"
      >
        ← Home
      </button>

      <div className="relative z-10 text-center flex flex-col items-center gap-12 px-4 w-full max-w-4xl">
        <div className="animate-fade-in-scale">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-dark-text font-medium">
            Welcome back, {user?.username}! Here's your gaming summary
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            { label: 'Games Played', value: stats.gamesPlayed.toString(), icon: '🎮' },
            { label: 'Total Score', value: stats.totalScore.toLocaleString(), icon: '⭐' },
            { label: 'Achievements', value: stats.achievements.toString(), icon: '🏆' },
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

        {/* User Email */}
        <div className="text-xs text-dark-text opacity-60">
          Logged in as: {user?.email}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
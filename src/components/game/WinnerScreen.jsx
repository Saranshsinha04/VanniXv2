import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const WinnerScreen = ({ roomCode, userId, username }) => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(true);
  const [finalLeaderboard] = useState([
    { rank: 1, username: 'Alice', totalTokens: 42, totalScore: 267, winner: true },
    { rank: 2, username: 'Bob', totalTokens: 35, totalScore: 245 },
    { rank: 3, username: 'You', totalTokens: 23, totalScore: 198 },
  ]);

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  const winner = finalLeaderboard[0];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                width: '10px',
                height: '10px',
                background: Math.random() > 0.5 ? '#00d4ff' : '#7c3aed',
                borderRadius: '50%',
                animation: `fall ${2 + Math.random() * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl">
        {/* Winner Banner */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-cyan bg-clip-text text-transparent mb-4">
            Game Over!
          </h1>
          <p className="text-dark-text text-lg">
            {winner.username === username ? '🎉 You Won!' : `${winner.username} Won!`}
          </p>
        </div>

        {/* Winner Card */}
        <div className="bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border-2 border-brand-cyan rounded-2xl p-8 mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center mx-auto mb-4 text-4xl font-bold">
            {winner.username.charAt(0)}
          </div>
          <h2 className="text-3xl font-black text-white mb-2">{winner.username}</h2>
          <div className="flex justify-center gap-8 mt-6">
            <div>
              <p className="text-dark-text text-xs mb-1">Total Tokens</p>
              <p className="text-3xl font-bold text-brand-cyan">{winner.totalTokens}</p>
            </div>
            <div>
              <p className="text-dark-text text-xs mb-1">Total Score</p>
              <p className="text-3xl font-bold text-brand-purple">{winner.totalScore}</p>
            </div>
          </div>
        </div>

        {/* Final Leaderboard */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-brand-cyan uppercase mb-4">Final Leaderboard</h2>
          
          <div className="space-y-3">
            {finalLeaderboard.map((player, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  player.winner
                    ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border-2 border-brand-cyan'
                    : 'bg-dark-surface'
                }`}
              >
                <div className="text-2xl">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{player.username}</p>
                  <p className="text-dark-text text-xs">{player.totalScore} total pts</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-cyan text-lg">{player.totalTokens} 🪙</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/game-entry')}
            className="w-full py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-dark-surface border border-brand-cyan border-opacity-30 rounded-lg font-bold text-brand-cyan hover:border-opacity-100 transition-all"
          >
            Exit to Dashboard
          </button>
        </div>

        {/* Room Stats */}
        <div className="mt-12 text-center text-dark-text text-sm">
          <p>Room: <span className="text-brand-cyan font-semibold">{roomCode}</span></p>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WinnerScreen;
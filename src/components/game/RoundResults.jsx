import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// 6. ROUND RESULTS SCREEN
// ============================================================================

export const RoundResultsScreen = ({ roomCode, roundNumber, score, tokensWon, userId }) => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, username: 'Alice', tokens: 15, score: 92 },
    { rank: 2, username: 'Bob', tokens: 10, score: 85 },
    { rank: 3, username: 'You', tokens: 7, score: 78 },
  ]);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animate score display
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let increment = 0;
    const interval = setInterval(() => {
      if (increment < score) {
        increment += score / 10;
        setDisplayScore(Math.floor(increment));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [score]);

  const handleNextRound = () => {
    if (roundNumber >= 3) {
      navigate('/winner', { state: { roomCode } });
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate('/round-start', { state: { roomCode, roundNumber: roundNumber + 1 } });
      }, 1000);
    }
  };

  const isLastRound = roundNumber >= 3;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
      <div className="relative z-10 w-full max-w-2xl">
        {/* Round Header */}
        <div className="text-center mb-12">
          <p className="text-brand-cyan text-sm uppercase mb-2">Round {roundNumber} Complete</p>
          <h1 className="text-4xl font-black text-white mb-4">Your Score</h1>
        </div>

        {/* Score Display */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 border-2 border-brand-cyan rounded-2xl p-12 text-center mb-8">
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple mb-4">
              {displayScore}
            </div>
            <p className="text-dark-text mb-6">Health Score</p>
            
            {/* Tokens Won/Lost */}
            <div className={`text-2xl font-bold ${tokensWon >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {tokensWon >= 0 ? '+' : ''}{tokensWon} Tokens
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-surface rounded-lg p-4 text-center">
              <p className="text-dark-text text-xs mb-1">Multiplier</p>
              <p className="text-2xl font-bold text-brand-cyan">1.2x</p>
            </div>
            <div className="bg-dark-surface rounded-lg p-4 text-center">
              <p className="text-dark-text text-xs mb-1">Boost</p>
              <p className="text-2xl font-bold text-brand-purple">+15%</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-brand-cyan uppercase mb-4">Round Leaderboard</h2>
          
          <div className="space-y-2">
            {leaderboard.map((player, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  player.username === 'You'
                    ? 'bg-brand-cyan bg-opacity-20 border border-brand-cyan'
                    : 'bg-dark-surface'
                }`}
              >
                <div className="text-lg font-bold text-brand-cyan w-8">#{player.rank}</div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{player.username}</p>
                  <p className="text-dark-text text-xs">{player.score} pts</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-purple">{player.tokens} 🪙</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isHost ? (
          <button
            onClick={handleNextRound}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all disabled:opacity-50"
          >
            {loading ? 'Starting next round...' : isLastRound ? 'See Results' : 'Next Round'}
          </button>
        ) : (
          <div className="text-center text-dark-text">
            <p className="animate-pulse">⏳ Waiting for host to start next round...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RoundResultsScreen;
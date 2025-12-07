import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export const Lobby = ({ userId, username, isHost, roomCode }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { id: userId, username, avatar: username.charAt(0), tokens: 10, isHost: true },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Subscribe to real-time player updates
    const mockPlayers = [
      { id: userId, username, avatar: username.charAt(0), tokens: 10, isHost: true },
      { id: 'user-2', username: 'Bob', avatar: 'B', tokens: 10, isHost: false },
      { id: 'user-3', username: 'Charlie', avatar: 'C', tokens: 10, isHost: false },
    ];
    setPlayers(mockPlayers);
  }, []);

  const handleStartGame = async () => {
    setLoading(true);
    // TODO: Update room status in Supabase
    setTimeout(() => {
      navigate('/round-start', { state: { roomCode, roundNumber: 1 } });
    }, 1000);
  };

  const totalTokens = players.reduce((sum, p) => sum + p.tokens, 0);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
      {/* Room Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="text-center">
          <p className="text-dark-text text-sm mb-2">Room Code</p>
          <div className="text-4xl font-black text-brand-cyan tracking-widest mb-4">{roomCode}</div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-sm font-semibold text-brand-cyan uppercase mb-4">Players ({players.length})</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-dark-surface bg-opacity-40 border border-brand-cyan border-opacity-20 rounded-xl p-4 text-center hover:border-opacity-50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                {player.avatar}
              </div>
              <p className="font-semibold text-white text-sm">{player.username}</p>
              <p className="text-dark-text text-xs mt-1">{player.tokens} Tokens</p>
              {player.isHost && <p className="text-brand-cyan text-xs mt-1">👑 Host</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Token Pool */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-brand-cyan border-opacity-30 rounded-lg p-6 text-center">
          <p className="text-dark-text text-sm mb-2">Total Token Pool</p>
          <div className="text-3xl font-black text-brand-cyan">{totalTokens}</div>
          <p className="text-dark-text text-xs mt-2">Distributed based on round scores</p>
        </div>
      </div>

      {/* Start Button (Host Only) */}
      {isHost && (
        <button
          onClick={handleStartGame}
          disabled={loading || players.length < 2}
          className="px-12 py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Starting...' : 'Start Game'}
        </button>
      )}

      {!isHost && (
        <div className="text-center text-dark-text">
          <p className="animate-pulse">⏳ Waiting for host to start...</p>
        </div>
      )}
    </div>
  );
};
export default Lobby;
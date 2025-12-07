import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export const HostGame = ({ userId, username }) => {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  const generateRoomCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateRoom = async () => {
    setLoading(true);
    const code = generateRoomCode();
    setRoomCode(code);
    
    // TODO: Create room in Supabase
    console.log('Creating room with code:', code, 'Max players:', playerCount);
    
    setTimeout(() => {
      navigate('/lobby', { state: { roomCode: code, isHost: true } });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate('/game-entry')}
        className="absolute top-8 left-8 text-brand-cyan hover:text-brand-cyan-dark transition-colors"
      >
        ← Back
      </button>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-dark-text bg-clip-text text-transparent">
            Host Game
          </h1>
          <p className="text-dark-text text-sm">Set up your game room</p>
        </div>

        <div className="bg-dark-surface bg-opacity-40 backdrop-blur-lg border border-brand-cyan border-opacity-20 rounded-2xl p-8 space-y-8">
          {/* Player Count Selector */}
          <div>
            <label className="block text-sm font-semibold text-brand-cyan uppercase mb-4">
              Number of Players
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                className="px-4 py-2 bg-dark-surface border border-brand-cyan border-opacity-30 rounded-lg hover:border-opacity-100 transition-all"
              >
                −
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-brand-cyan">{playerCount}</div>
                <p className="text-dark-text text-xs mt-1">players</p>
              </div>

              <button
                onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
                className="px-4 py-2 bg-dark-surface border border-brand-cyan border-opacity-30 rounded-lg hover:border-opacity-100 transition-all"
              >
                +
              </button>
            </div>
            <p className="text-dark-text text-xs mt-4">Minimum: 2 | Maximum: 10</p>
          </div>

          {/* Room Code Display (after creation) */}
          {roomCode && (
            <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-brand-cyan border-opacity-30 rounded-lg p-6 text-center">
              <p className="text-dark-text text-sm mb-2">Room Code</p>
              <div className="text-4xl font-black text-brand-cyan tracking-widest">{roomCode}</div>
              <p className="text-dark-text text-xs mt-3">Share this code with friends to join</p>
            </div>
          )}

          {/* Create Room Button */}
          <button
            onClick={handleCreateRoom}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Room...' : 'Create Room'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default HostGame;
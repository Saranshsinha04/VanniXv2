import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export const JoinGame = ({ userId, username }) => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: Validate room code in Supabase
      console.log('Joining room:', roomCode);
      
      setTimeout(() => {
        navigate('/lobby', { state: { roomCode: roomCode.toUpperCase(), isHost: false } });
      }, 1000);
    } catch (err) {
      setError('Room not found. Check the code and try again.');
    } finally {
      setLoading(false);
    }
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
            Join Game
          </h1>
          <p className="text-dark-text text-sm">Enter the room code from the host</p>
        </div>

        <div className="bg-dark-surface bg-opacity-40 backdrop-blur-lg border border-brand-cyan border-opacity-20 rounded-2xl p-8 space-y-6">
          {/* Room Code Input */}
          <div>
            <label className="block text-sm font-semibold text-brand-cyan uppercase mb-3">
              Room Code
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength="6"
              className="w-full px-4 py-3 bg-dark-surface border border-brand-cyan border-opacity-20 rounded-lg text-white text-center text-2xl font-bold tracking-widest placeholder-dark-text placeholder-opacity-30 focus:outline-none focus:border-brand-cyan focus:border-opacity-100 focus:ring-2 focus:ring-brand-cyan focus:ring-opacity-20 transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Join Button */}
          <button
            onClick={handleJoinRoom}
            disabled={loading || roomCode.length < 6}
            className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-lg font-bold text-white hover:shadow-lg hover:shadow-brand-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining...' : 'Join Room'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinGame;
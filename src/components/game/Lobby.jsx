import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "@/context/GameContext";

const Lobby = () => {
  const navigate = useNavigate();
  const { room, players, round } = useContext(GameContext);

  const [loading, setLoading] = useState(false);

  // Extract values safely
  const roomCode = room?.code;
  const hostId = room?.hostId;

  // For now, assume FIRST PLAYER is current user (replace later with logged-in user)
  const currentUser = players[0] || null;
  const userId = currentUser?.id;
  const username = currentUser?.username || "Unknown";
  const isHost = userId === hostId;

  // Avatar fallback
  const safeAvatar = username?.charAt(0)?.toUpperCase() || "?";

  // PAGE LOADING GUARD
  if (!roomCode || players.length === 0) {
    return (
      <div className="text-white w-full h-screen flex items-center justify-center">
        <p>Loading lobby...</p>
      </div>
    );
  }

  // START GAME
  const handleStartGame = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/round-start", {
        state: {
          roomCode,
          roundNumber: round.number || 1,
        },
      });
    }, 1000);
  };

  const totalTokens = players.reduce((sum, p) => sum + p.tokens, 0);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
      
      {/* Room Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="text-center">
          <p className="text-dark-text text-sm mb-2">Room Code</p>
          <div className="text-4xl font-black text-brand-cyan tracking-widest mb-4">
            {roomCode}
          </div>
        </div>
      </div>

      {/* Player Grid */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-sm font-semibold text-brand-cyan uppercase mb-4">
          Players ({players.length})
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-dark-surface bg-opacity-40 border border-brand-cyan border-opacity-20 rounded-xl p-4 text-center hover:border-opacity-50 transition-all"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                {player.username?.charAt(0)?.toUpperCase() || "?"}
              </div>

              {/* Username */}
              <p className="font-semibold text-white text-sm">
                {player.username || "Unknown"}
              </p>

              {/* Tokens */}
              <p className="text-dark-text text-xs mt-1">
                {player.tokens} Tokens
              </p>

              {/* Host */}
              {player.id === hostId && (
                <p className="text-brand-cyan text-xs mt-1">👑 Host</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Token Pool */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-brand-cyan border-opacity-30 rounded-lg p-6 text-center">
          <p className="text-dark-text text-sm mb-2">Total Token Pool</p>
          <div className="text-3xl font-black text-brand-cyan">
            {totalTokens}
          </div>
          <p className="text-dark-text text-xs mt-2">
            Distributed based on round scores
          </p>
        </div>
      </div>

      {/* Start Game */}
      {isHost ? (
        <button
          onClick={handleStartGame}
          disabled={loading || players.length < 2}
          className="px-12 py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Starting..." : "Start Game"}
        </button>
      ) : (
        <div className="text-center text-dark-text">
          <p className="animate-pulse">⏳ Waiting for host to start...</p>
        </div>
      )}
    </div>
  );
};

export { Lobby };

export default Lobby;

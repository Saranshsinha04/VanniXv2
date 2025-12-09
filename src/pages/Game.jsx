import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GameProvider } from '@/context/GameContext';

// Import all game components
import { GameEntry } from '@/components/game/GameEntry';
import { HostGame } from '@/components/game/HostGame';
import { JoinGame } from '@/components/game/JoinGame';
import { Lobby } from '@/components/game/Lobby';
import { RoundStart } from '@/components/game/RoundStart';
import { RecordingScreen } from '@/components/game/RecordingScreen';
import { RoundResults } from '@/components/game/RoundResults';
import { WinnerScreen } from '@/components/game/WinnerScreen';

// ============================================================================
// GamePage.jsx - Main Game Routing & Page Container
// ============================================================================

/**
 * Game Routes Component - Handles all navigation
 * Provides game flow routing and page transitions
 */
function GameRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [routeHistory, setRouteHistory] = useState([]);

  useEffect(() => {
    // Track navigation for debugging
    console.log('🎮 Navigation:', location.pathname);
    setRouteHistory(prev => [...prev, location.pathname]);
  }, [location.pathname]);

  // Handle back navigation
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen">
      <Routes>
        {/* ========== ENTRY POINT ========== */}
        {/* Choose to Host or Join */}
        <Route path="/" element={<GameEntry />} />
        <Route path="/game-entry" element={<GameEntry />} />

        {/* ========== HOST FLOW ========== */}
        {/* Host creates new game room */}
        <Route path="/host-game" element={<HostGame />} />

        {/* ========== JOIN FLOW ========== */}
        {/* Player joins existing game */}
        <Route path="/join-game" element={<JoinGame />} />

        {/* ========== LOBBY ========== */}
        {/* Wait for game to start, show players joining */}
        <Route path="/lobby" element={<Lobby />} />

        {/* ========== ROUND START ========== */}
        {/* Animation showing round number and rules */}
        <Route path="/round-start" element={<RoundStart />} />

        {/* ========== RECORDING ========== */}
        {/* 5-second audio recording screen */}
        <Route path="/recording" element={<RecordingScreen />} />

        {/* ========== ROUND RESULTS ========== */}
        {/* Show score, health tier, tokens won */}
        <Route path="/round-results" element={<RoundResults />} />

        {/* ========== WINNER SCREEN ========== */}
        {/* Final leaderboard and winner announcement */}
        <Route path="/winner" element={<WinnerScreen />} />

        {/* ========== FALLBACK ========== */}
        {/* Redirect unknown routes to entry */}
        <Route path="*" element={<Navigate to="/game-entry" replace />} />
      </Routes>
    </div>
  );
}

/**
 * GamePage - Main container component
 * Wraps all game routes with GameProvider for global state management
 * 
 * Usage:
 * <GamePage />
 * 
 * Features:
 * - Global game state via Context API
 * - Real-time synchronization
 * - Audio recording pipeline
 * - Score calculations
 * - Token distribution
 * - 3-round game progression
 */
export function GamePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize app
    console.log('🎮 Game App Initialized');
    
    // Check browser support
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Audio recording not supported in your browser');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#141829] to-[#1a1f3a] flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
          <p className="text-red-300">{error}</p>
          <p className="text-red-200 text-sm mt-4">
            Please use a modern browser with microphone access
          </p>
        </div>
      </div>
    );
  }

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#141829] to-[#1a1f3a]">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Gradient blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#00d4ff]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#7c3aed]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <GameRoutes />
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#00d4ff] border-t-transparent"></div>
          </div>
        )}
      </div>
    </GameProvider>
  );
}

/**
 * Export GameRoutes separately for custom layout use
 */
export { GameRoutes };

/**
 * Default export
 */
export default GamePage;
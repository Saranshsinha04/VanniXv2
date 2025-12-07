// src/pages/GamePage.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameEntry } from '@/components/game/GameEntry';
import { HostGame } from '@/components/game/HostGame';
import { JoinGame } from '@/components/game/JoinGame';
import { Lobby } from '@/components/game/Lobby';
import { RecordingScreen } from '@/components/game/RecordingScreen';
import { RoundResultsScreen } from '@/components/game/RoundResults';
import { WinnerScreen } from '@/components/game/WinnerScreen';

export const GameRoutes = () => (
  <Routes>
    <Route path="/game-entry" element={<GameEntry />} />
    <Route path="/host-game" element={<HostGame />} />
    <Route path="/join-game" element={<JoinGame />} />
    <Route path="/lobby" element={<Lobby />} />
    <Route path="/recording" element={<RecordingScreen />} />
    <Route path="/round-results" element={<RoundResultsScreen />} />
    <Route path="/winner" element={<WinnerScreen />} />
  </Routes>
);
export default GameRoutes;
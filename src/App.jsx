import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from '@/pages/Home';
import Game from '@/pages/Game';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import './index.css';


import { GameProvider } from '@/context/GameContext';

// Import all game components
import { GameEntry } from '@/components/game/GameEntry';
import { HostGame } from '@/components/game/HostGame';
import { JoinGame } from '@/components/game/JoinGame';
import  Lobby  from '@/components/game/Lobby';
import { RoundStart } from '@/components/game/RoundStart';
import { RecordingScreen } from '@/components/game/RecordingScreen';
import { RoundResults } from '@/components/game/RoundResults';
import { WinnerScreen } from '@/components/game/WinnerScreen';


import { supabase } from '@/services/supabaseClient'

export function TestApp() {
  

  
  useEffect(() => {
  async function test() {
    await supabase.from("test_table").insert([{ message: "Test message" }]);

    const { data, error } = await supabase.from("test_table").select("*");
    console.log("Data after insert:", data);
  }
  test();
}, []);
}


export const App = () => {
  return (
    <Router>
      <Routes>
        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/*" element={<Game />} />

        {/* GAME FLOW */}
        <Route path="/game-entry" element={<GameEntry />} />
        <Route path="/host-game" element={<HostGame />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/round-start" element={<RoundStart />} />
        <Route path="/recording" element={<RecordingScreen />} />
        <Route path="/round-results" element={<RoundResults />} />
        <Route path="/winner" element={<WinnerScreen />} />

        {/* 404 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
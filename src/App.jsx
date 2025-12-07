import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Game from '@/pages/Game';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import './index.css';

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
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 404 - Redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
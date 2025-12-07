import React, { createContext, useState, useCallback } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Room State
  const [room, setRoom] = useState({
    id: null,
    code: null,
    hostId: null,
    maxPlayers: 4,
    status: 'lobby', // 'lobby' | 'playing' | 'results' | 'finished'
  });

  // Players State
  const [players, setPlayers] = useState([]);

  // Round State
  const [round, setRound] = useState({
    number: 1,
    status: 'waiting', // 'waiting' | 'recording' | 'submitted' | 'processing' | 'complete'
    scores: {},
  });

  // Audio State
  const [audio, setAudio] = useState({
    isRecording: false,
    duration: 0,
    audioBlob: null,
    isUploading: false,
  });

  // Actions
  const createRoom = useCallback(async (hostId, maxPlayers) => {
    const roomCode = generateRoomCode();
    const { data, error } = await supabase
      .from('rooms')
      .insert([{ code: roomCode, host_id: hostId, max_players: maxPlayers }])
      .select()
      .single();

    if (!error) {
      setRoom({ id: data.id, code: data.code, hostId, maxPlayers, status: 'lobby' });
    }
    return { roomId: data?.id, roomCode, error };
  }, []);

  const joinRoom = useCallback(async (roomCode, userId, username, avatar) => {
    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('code', roomCode)
      .single();

    if (roomError) return { error: 'Room not found' };

    const { data: playerData, error: joinError } = await supabase
      .from('room_players')
      .insert([{ room_id: roomData.id, user_id: userId, username, avatar }])
      .select()
      .single();

    if (!joinError) {
      setRoom(roomData);
    }
    return { roomId: roomData.id, error: joinError };
  }, []);

  const addPlayer = useCallback((player) => {
    setPlayers(prev => [...prev, player]);
  }, []);

  const updatePlayerTokens = useCallback((playerId, newTokens) => {
    setPlayers(prev =>
      prev.map(p => p.id === playerId ? { ...p, tokens: newTokens } : p)
    );
  }, []);

  const startRound = useCallback(async () => {
    setRound(prev => ({ ...prev, status: 'recording' }));
  }, []);

  const submitAudio = useCallback(async (audioBlob, roundNumber) => {
    setAudio(prev => ({ ...prev, isUploading: true }));
    // Upload logic
    setAudio(prev => ({ ...prev, isUploading: false, audioBlob }));
  }, []);

  const advanceRound = useCallback(() => {
    if (round.number < 3) {
      setRound(prev => ({ ...prev, number: prev.number + 1, status: 'waiting' }));
    } else {
      setRoom(prev => ({ ...prev, status: 'finished' }));
    }
  }, [round.number]);

  return (
    <GameContext.Provider
      value={{
        room,
        players,
        round,
        audio,
        createRoom,
        joinRoom,
        addPlayer,
        updatePlayerTokens,
        startRound,
        submitAudio,
        advanceRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function generateRoomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

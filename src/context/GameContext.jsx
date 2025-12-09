import React, { createContext, useState, useCallback } from "react";

// ✅ Import Supabase client
import { supabase } from "@/services/supabaseClient";

// ✅ Import Room Code Generator
import { generateRoomCode } from "@/lib/roomCode";

// (Optional Future Imports)
// import { audioService } from "@/services/audioService";
// import { gameService } from "@/services/gameService";
// import { calculateScore } from "@/lib/scoreCalculation";
// import { distributeTokens } from "@/lib/tokenDistribution";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // =========================
  // ROOM STATE
  // =========================
  const [room, setRoom] = useState({
    id: null,
    code: null,
    hostId: null,
    maxPlayers: 4,
    status: "lobby", // lobby | playing | results | finished
  });

  // =========================
  // PLAYERS STATE
  // =========================
  const [players, setPlayers] = useState([]);

  // =========================
  // ROUND STATE
  // =========================
  const [round, setRound] = useState({
    number: 1,
    status: "waiting", // waiting | recording | submitted | processing | complete
    scores: {},
  });

  // =========================
  // AUDIO STATE
  // =========================
  const [audio, setAudio] = useState({
    isRecording: false,
    duration: 0,
    audioBlob: null,
    isUploading: false,
  });

  // =========================
  // ACTIONS
  // =========================

  // CREATE ROOM (HOST)
  const createRoom = useCallback(async (hostId, maxPlayers) => {
    const roomCode = generateRoomCode();

    const { data, error } = await supabase
      .from("rooms")
      .insert([
        { code: roomCode, host_id: hostId, max_players: maxPlayers },
      ])
      .select()
      .single();

    if (!error) {
      setRoom({
        id: data.id,
        code: data.code,
        hostId,
        maxPlayers,
        status: "lobby",
      });
    }

    return { roomId: data?.id, roomCode, error };
  }, []);

  // JOIN ROOM (PLAYER)
  const joinRoom = useCallback(
    async (roomCode, userId, username, avatar) => {
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("*")
        .eq("code", roomCode)
        .single();

      if (roomError) return { error: "Room not found" };

      const { data: playerData, error: joinError } = await supabase
        .from("room_players")
        .insert([
          {
            room_id: roomData.id,
            user_id: userId,
            username,
            avatar,
            tokens: 10,
          },
        ])
        .select()
        .single();

      if (!joinError) setRoom(roomData);

      return { roomId: roomData.id, error: joinError };
    },
    []
  );

  // ADD PLAYER LOCALLY
  const addPlayer = useCallback((player) => {
    setPlayers((prev) => [...prev, player]);
  }, []);

  // UPDATE TOKENS LOCALLY
  const updatePlayerTokens = useCallback((playerId, newTokens) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId ? { ...p, tokens: newTokens } : p
      )
    );
  }, []);

  // START ROUND
  const startRound = useCallback(() => {
    setRound((prev) => ({ ...prev, status: "recording" }));
  }, []);

  // SUBMIT AUDIO
  const submitAudio = useCallback(async (audioBlob, roundNumber) => {
    setAudio((prev) => ({ ...prev, isUploading: true }));

    // TODO: replace with:
    // const { url } = await audioService.uploadAudio(room.id, userId, audioBlob);
    // const score = await calculateScore(url);
    // await gameService.updateScore(userId, score);

    setAudio((prev) => ({
      ...prev,
      isUploading: false,
      audioBlob,
    }));
  }, []);

  // ADVANCE ROUND (3 ROUNDS ONLY)
  const advanceRound = useCallback(() => {
    if (round.number < 3) {
      setRound((prev) => ({
        ...prev,
        number: prev.number + 1,
        status: "waiting",
      }));
    } else {
      setRoom((prev) => ({ ...prev, status: "finished" }));
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

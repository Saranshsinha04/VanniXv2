// src/hooks/useRoomSync.js
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export const useRoomSync = (roomId, setPlayers, setRoom, setRound) => {
  useEffect(() => {
    if (!roomId) return;

    // Subscribe to room updates (status, maxPlayers, host change)
    const roomChannel = supabase
      .channel(`room-changes-${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
        (payload) => {
          if (payload.new) setRoom(payload.new);
        }
      )
      .subscribe();

    // Subscribe to players joining/leaving
    const playersChannel = supabase
      .channel(`room-players-${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${roomId}` },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    const fetchPlayers = async () => {
      const { data } = await supabase
        .from("room_players")
        .select("*")
        .eq("room_id", roomId);

      setPlayers(data || []);
    };

    fetchPlayers();

    return () => {
      supabase.removeChannel(roomChannel);
      supabase.removeChannel(playersChannel);
    };
  }, [roomId, setPlayers, setRoom, setRound]);
};

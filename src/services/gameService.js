import { supabase } from "../lib/supabaseClient";

export const gameService = {
  async createRoom(hostId, maxPlayers, roomCode) {
    return await supabase
      .from("rooms")
      .insert([{ host_id: hostId, max_players: maxPlayers, code: roomCode }])
      .select()
      .single();
  },

  async joinRoom(roomCode, userId, username, avatar) {
    const { data: roomData, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", roomCode)
      .single();

    if (error) return { error };

    const newPlayer = await supabase
      .from("room_players")
      .insert([{ room_id: roomData.id, user_id: userId, username, avatar, tokens: 10 }])
      .select()
      .single();

    return { roomData, newPlayer };
  },

  async updateScore(playerId, score) {
    return await supabase
      .from("room_players")
      .update({ score })
      .eq("id", playerId);
  },

  async updateTokens(playerId, tokens) {
    return await supabase
      .from("room_players")
      .update({ tokens })
      .eq("id", playerId);
  },

  async updateRoomStatus(roomId, status) {
    return await supabase
      .from("rooms")
      .update({ status })
      .eq("id", roomId);
  }
};

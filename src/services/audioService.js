import { supabase } from "../lib/supabaseClient";

export const audioService = {
  async uploadAudio(roomId, userId, audioBlob) {
    const fileName = `room_${roomId}/user_${userId}_${Date.now()}.webm`;

    const { data, error } = await supabase.storage
      .from("voice-recordings")
      .upload(fileName, audioBlob);

    if (error) return { error };

    const { data: publicUrl } = supabase.storage
      .from("voice-recordings")
      .getPublicUrl(fileName);

    return { url: publicUrl.publicUrl };
  },

  async getMLScore(audioUrl) {
    // Placeholder – replace with your API endpoint
    const res = await fetch("http://localhost:5000/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audioUrl }),
    });

    const data = await res.json();
    return data.score;
  }
};

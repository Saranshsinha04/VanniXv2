import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export const RecordingScreen = ({ roomCode, roundNumber, userId }) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const MAX_DURATION = 5;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Timer
      timerRef.current = setInterval(() => {
        setDuration((d) => {
          if (d >= MAX_DURATION) {
            stopRecording();
            return MAX_DURATION;
          }
          return d + 0.1;
        });
      }, 100);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const submitAudio = async () => {
    setIsUploading(true);

    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      
      // TODO: Upload to Supabase and process
      console.log('Uploading audio:', audioBlob.size, 'bytes');
      
      setTimeout(() => {
        navigate('/round-results', {
          state: {
            roomCode,
            roundNumber,
            score: 85,
            tokensWon: 3,
          },
        });
      }, 2000);
    } catch (err) {
      console.error('Error uploading audio:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const progressPercent = (duration / MAX_DURATION) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-surface-alt to-[#1a1f3a] flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <p className="text-brand-cyan text-sm uppercase mb-2">Round {roundNumber}</p>
          <h1 className="text-4xl font-black text-white mb-2">Record Your Voice</h1>
          <p className="text-dark-text">Speak clearly for 5 seconds</p>
        </div>

        {/* Mic Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isUploading}
            className={`relative w-32 h-32 rounded-full transition-all flex items-center justify-center text-5xl ${
              isRecording
                ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse'
                : 'bg-gradient-to-br from-brand-cyan to-brand-purple hover:shadow-lg hover:shadow-brand-cyan/50'
            }`}
          >
            {isRecording ? '⏹️' : '🎤'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-dark-surface rounded-full h-3 overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-cyan">{duration.toFixed(1)}s</p>
            <p className="text-dark-text text-sm">/ {MAX_DURATION}s</p>
          </div>
        </div>

        {/* Waveform Animation */}
        {isRecording && (
          <div className="flex justify-center gap-1 mb-8 h-16 items-end">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-brand-cyan to-brand-purple rounded-full"
                style={{
                  height: `${30 + Math.sin(Date.now() / 100 + i) * 20}px`,
                  animation: `wave 0.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={submitAudio}
          disabled={!audioChunksRef.current.length || isUploading}
          className="w-full py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan-dark rounded-lg font-bold text-dark-bg hover:shadow-lg hover:shadow-brand-cyan/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Submit Recording'}
        </button>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 30px; }
          50% { height: 60px; }
        }
      `}</style>
    </div>
  );
};
export default RecordingScreen;
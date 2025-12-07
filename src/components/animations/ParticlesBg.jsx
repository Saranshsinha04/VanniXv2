import React, { useEffect, useState } from 'react';

export const ParticlesBg = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 2,
      tx: (Math.random() - 0.5) * 100,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div
          className="w-full h-full animate-[moveGrid_20s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-brand-cyan rounded-full opacity-30 animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              '--tx': `${particle.tx}px`,
              animation: `floatParticle ${particle.duration}s infinite linear ${particle.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ParticlesBg;
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'heart' | 'star' | 'sparkle';
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        type: ['heart', 'star', 'sparkle'][Math.floor(Math.random() * 3)] as Particle['type'],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 8,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const renderParticle = (type: Particle['type'], size: number) => {
    switch (type) {
      case 'heart':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-primary/60">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-champagne/50">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'sparkle':
        return (
          <div 
            className="rounded-full bg-rose-light/40"
            style={{ width: size / 2, height: size / 2 }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsl(350 70% 65% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(320 60% 55% / 0.1) 0%, transparent 50%)',
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-slow"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `translate3d(${mousePosition.x * (particle.id % 3 === 0 ? 1 : 0.5)}px, ${mousePosition.y * (particle.id % 2 === 0 ? 1 : 0.5)}px, 0)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {renderParticle(particle.type, particle.size)}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;

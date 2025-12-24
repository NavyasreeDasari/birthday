import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  type: 'confetti' | 'heart';
}

interface ConfettiBurstProps {
  active: boolean;
}

const ConfettiBurst = ({ active }: ConfettiBurstProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const colors = [
        'hsl(350, 70%, 65%)',
        'hsl(40, 50%, 90%)',
        'hsl(320, 60%, 55%)',
        'hsl(350, 80%, 85%)',
        'hsl(40, 40%, 85%)',
      ];

      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          duration: Math.random() * 2 + 2,
          size: Math.random() * 10 + 5,
          type: Math.random() > 0.5 ? 'confetti' : 'heart',
        });
      }
      setPieces(newPieces);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {piece.type === 'heart' ? (
            <svg 
              width={piece.size} 
              height={piece.size} 
              viewBox="0 0 24 24" 
              fill={piece.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <div
              style={{
                width: piece.size,
                height: piece.size * 0.6,
                backgroundColor: piece.color,
                borderRadius: '2px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfettiBurst;

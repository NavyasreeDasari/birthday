import { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import SurpriseButton from './SurpriseButton';

interface Section1EntryProps {
  onOpenSurprise: () => void;
}

const Section1Entry = ({ onOpenSurprise }: Section1EntryProps) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSecondLine(true), 2000);
    const timer2 = setTimeout(() => setShowButton(true), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      {/* Main greeting text */}
      <div className="text-center max-w-4xl">
        <AnimatedText
          text="Hey babygirl ❤️"
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 text-glow"
          delay={500}
        />

        {showSecondLine && (
          <AnimatedText
            text="finally! It's your dayyyyy 🥳"
            className="font-display text-3xl md:text-5xl lg:text-6xl text-primary/90 text-glow"
            delay={0}
          />
        )}
      </div>

      {/* Surprise button */}
      <SurpriseButton onClick={onOpenSurprise} visible={showButton} />

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1Entry;

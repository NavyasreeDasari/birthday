import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

const AnimatedText = ({ text, className = '', delay = 0, onComplete }: AnimatedTextProps) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const words = text.split(' ');

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev >= words.length) {
            clearInterval(interval);
            if (onComplete) onComplete();
            return prev;
          }
          return prev + 1;
        });
      }, 300);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [words.length, delay, onComplete]);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-3 transition-all duration-700 ${
            index < visibleWords
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;

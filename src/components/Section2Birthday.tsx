import { useState, useEffect } from 'react';
import MemorySlider from './MemorySlider';
import ConfettiBurst from './ConfettiBurst';

interface Section2BirthdayProps {
  images: string[];
}

const Section2Birthday = ({ images }: Section2BirthdayProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTitle(true);
      setShowConfetti(true);
    }, 500);
    
    const timer2 = setTimeout(() => setShowSlider(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <ConfettiBurst active={showConfetti} />

      {/* Birthday title */}
      <div 
        className={`text-center mb-16 transition-all duration-1000 ${
          showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground text-glow mb-4">
          Hey beautiful, cheers to another year of looking hot and serving looks 🔥🥂
        </h1>
      </div>

      {/* Memory slider */}
      <div 
        className={`w-full transition-all duration-1000 delay-500 ${
          showSlider ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <MemorySlider images={images} />
      </div>

      {/* Decorative hearts */}
      <div className="absolute top-20 left-10 text-4xl animate-float-slow opacity-50">😍</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float-slow opacity-50" style={{ animationDelay: '2s' }}>❤️</div>
      <div className="absolute top-1/3 right-20 text-3xl animate-float-slow opacity-40" style={{ animationDelay: '1s' }}>💖</div>
    </div>
  );
};

export default Section2Birthday;

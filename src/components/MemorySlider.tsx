import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface MemorySliderProps {
  images: string[];
}

const MemorySlider = ({ images }: MemorySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalImages = images.length;
    
    // Handle wraparound
    let adjustedDiff = diff;
    if (diff > totalImages / 2) adjustedDiff = diff - totalImages;
    if (diff < -totalImages / 2) adjustedDiff = diff + totalImages;

    const isActive = index === currentIndex;
    const isNext = adjustedDiff === 1;
    const isPrev = adjustedDiff === -1;
    const isSecondNext = adjustedDiff === 2;
    const isSecondPrev = adjustedDiff === -2;

    if (isActive) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
      };
    } else if (isNext) {
      return {
        transform: 'translateX(60%) scale(0.75) rotateY(-15deg)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'brightness(0.7)',
      };
    } else if (isPrev) {
      return {
        transform: 'translateX(-60%) scale(0.75) rotateY(15deg)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'brightness(0.7)',
      };
    } else if (isSecondNext) {
      return {
        transform: 'translateX(100%) scale(0.5) rotateY(-25deg)',
        zIndex: 10,
        opacity: 0.3,
        filter: 'brightness(0.5)',
      };
    } else if (isSecondPrev) {
      return {
        transform: 'translateX(-100%) scale(0.5) rotateY(25deg)',
        zIndex: 10,
        opacity: 0.3,
        filter: 'brightness(0.5)',
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.3)',
        zIndex: 0,
        opacity: 0,
        filter: 'brightness(0.3)',
      };
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1200px' }}>
      {/* 3D Card Stack Container */}
      <div className="relative h-72 sm:h-80" style={{ transformStyle: 'preserve-3d' }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 w-52 sm:w-60 cursor-pointer"
            style={{
              ...getCardStyle(index),
              marginLeft: '-6.5rem',
              marginTop: '-8rem',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
            }}
            onClick={() => goToSlide(index)}
          >
            {/* Polaroid-style card */}
            <div className="bg-card p-2 pb-8 rounded-lg shadow-2xl border border-primary/10">
              <div className="relative aspect-[3/4] rounded overflow-hidden">
                <img
                  src={image}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
              </div>
              {/* Decorative heart */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <Heart className="w-4 h-4 text-primary fill-primary/30" />
              </div>
            </div>
            {/* Glow effect for active card */}
            {index === currentIndex && (
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl -z-10 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 z-40"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 z-40"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-primary w-6 shadow-[0_0_10px_hsl(var(--primary)/0.5)]'
                : 'bg-muted-foreground/30 w-2 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MemorySlider;

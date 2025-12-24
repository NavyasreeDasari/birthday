import { useState, useRef, useEffect } from 'react';
import FloatingParticles from '@/components/FloatingParticles';
import Section1Entry from '@/components/Section1Entry';
import Section2Birthday from '@/components/Section2Birthday';
import VideoSection from '@/components/VideoSection';

// Import memory images
import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
import memory4 from '@/assets/memory-4.jpg';
import memory5 from '@/assets/memory-5.jpg';
import video from '@/assets/video.mp4';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const memoryImages = [memory1, memory2, memory3, memory4, memory5];

  // Placeholder video URL - replace with actual video
  const videoUrl = video;

  useEffect(() => {
    // Create audio element for background music
    audioRef.current = new Audio();
    // You can replace this with your actual background music URL
    audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOpenSurprise = () => {
    setIsTransitioning(true);
    
    // Start background music
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
    }

    setTimeout(() => {
      setCurrentSection(2);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleVideoPlay = () => {
    // Fade out background music when video plays
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0.3;
          }
          clearInterval(fadeOut);
        }
      }, 100);
    }
  };

  const handleScrollToVideo = () => {
    setCurrentSection(3);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Transition overlay */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-opacity duration-1000 pointer-events-none ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Section 1: Entry Experience */}
      {currentSection === 1 && (
        <div className={`transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Section1Entry onOpenSurprise={handleOpenSurprise} />
        </div>
      )}

      {/* Section 2: Birthday Reveal + Memory Slider */}
      {currentSection >= 2 && (
        <div className="animate-fade-in">
          <Section2Birthday images={memoryImages} />
          
          {/* Scroll indicator to video section */}
          {currentSection === 2 && (
            <div className="flex flex-col items-center pb-20 animate-fade-in-up" style={{ animationDelay: '3s' }}>
              <button
                onClick={handleScrollToVideo}
                className="group flex flex-col items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span className="font-body text-lg">There's more...</span>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="w-3 h-3 rounded-full border-2 border-primary/50 animate-bounce" />
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Section 3: Video Message */}
      {currentSection === 3 && (
        <div className="animate-fade-in">
          <VideoSection videoUrl={videoUrl} onPlay={handleVideoPlay} />
          
          {/* Footer */}
          <div className="text-center py-20">
            
            <div className="mt-8 flex justify-center gap-4">
              {['💕', '✨', '🎂', '✨', '💕'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-2xl animate-float-slow" 
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

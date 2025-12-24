import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  videoUrl: string;
  onPlay: () => void;
}

const VideoSection = ({ videoUrl, onPlay }: VideoSectionProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const handlePlayClick = () => {
    setTextVisible(false);
    setTimeout(() => {
      setShowVideo(true);
      onPlay();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Intro text */}
      <div 
        className={`text-center transition-all duration-700 ${
          textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <p className="font-display text-2xl md:text-4xl text-foreground leading-relaxed mb-12 text-glow">
          Well, there's something I want you to hear from me. 💕
        </p>

        {!showVideo && (
          <button
            onClick={handlePlayClick}
            className="
              group relative px-10 py-5
              font-display text-xl md:text-2xl font-medium
              bg-gradient-to-r from-primary/20 to-accent/20
              border-2 border-primary/40
              rounded-full
              text-foreground
              transition-all duration-500 ease-out
              transform hover:scale-105
              floating pulse-glow
            "
          >
            <span className="relative z-10 flex items-center gap-3">
              <Play className="w-6 h-6" />
              Listen to meee!
            </span>
          </button>
        )}
      </div>

      {/* Video player */}
      {showVideo && (
        <div className="w-full max-w-4xl animate-scale-in">
          <div className="relative aspect-video rounded-3xl overflow-hidden box-glow bg-card">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              style={{
                borderRadius: '1.5rem',
              }}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Decorative border glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-primary/30" />
          </div>
          
          {/* Caption */}
          <p className="text-center mt-6 text-muted-foreground font-body text-lg">
            Love you Babe😘
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection;

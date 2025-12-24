import { useState } from 'react';

interface SurpriseButtonProps {
  onClick: () => void;
  visible: boolean;
}

const SurpriseButton = ({ onClick, visible }: SurpriseButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-10 py-5 mt-12
        font-display text-xl md:text-2xl font-medium
        bg-gradient-to-r from-primary/20 to-accent/20
        border-2 border-primary/40
        rounded-full
        text-foreground
        transition-all duration-500 ease-out
        transform hover:scale-105
        animate-fade-in-up
        ${isHovered ? 'box-glow' : ''}
      `}
      style={{
        animationDelay: '2s',
        animation: visible ? 'float 4s ease-in-out infinite, fadeInUp 0.8s ease-out forwards' : '',
      }}
    >
      <span className="relative z-10">Well there's more!</span>
      
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-primary/30 to-accent/30
          blur-xl transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Shimmer effect */}
      <div 
        className={`
          absolute inset-0 rounded-full overflow-hidden
          ${isHovered ? 'shimmer' : ''}
        `}
      />
    </button>
  );
};

export default SurpriseButton;

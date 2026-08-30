import { useState, useEffect } from 'react';
import type { CompanionEmotion } from '@/lib/companion';
import { getRandomCompanionPhrase } from '@/lib/companion';
import { useVoice } from '@/lib/useVoice';

interface CompanionProps {
  emotion?: CompanionEmotion;
  dialogue?: string;
  childName?: string;
  size?: number;
  showDialogue?: boolean;
  onTap?: () => void;
  voiceEnabled?: boolean;
  className?: string;
}

export function Companion({
  emotion = 'welcoming',
  dialogue,
  childName,
  size = 110,
  showDialogue = true,
  onTap,
  voiceEnabled = true,
  className = '',
}: CompanionProps) {
  const { speak } = useVoice();
  const [currentText, setCurrentText] = useState<string>(
    dialogue || getRandomCompanionPhrase(emotion, childName)
  );
  const [bounce, setBounce] = useState(false);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (dialogue) {
      setCurrentText(dialogue);
    } else {
      setCurrentText(getRandomCompanionPhrase(emotion, childName));
    }
  }, [dialogue, emotion, childName]);

  const handleTap = () => {
    setTapped(true);
    setBounce(true);
    const phrase = getRandomCompanionPhrase('laughing', childName);
    setCurrentText(phrase);
    if (voiceEnabled) {
      speak(phrase, true);
    }
    if (onTap) onTap();
    setTimeout(() => {
      setBounce(false);
      setTapped(false);
    }, 1200);
  };

  // SVG-based mascot creature: "Kido" the Magic Cosmic Fox/Dragon
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {showDialogue && currentText && (
        <div
          className="relative mb-2 px-3.5 py-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-pop text-slate-800 text-xs font-display font-bold border-2 border-amber-300 max-w-[220px] text-center animate-pop-in z-30"
          style={{ animationDuration: '0.3s' }}
        >
          {currentText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-300 transform rotate-45" />
        </div>
      )}

      {/* Creature Avatar */}
      <button
        type="button"
        onClick={handleTap}
        className={`relative btn-press cursor-pointer transition-transform duration-300 ${
          bounce ? 'scale-115 -translate-y-2' : 'hover:scale-105'
        }`}
        style={{ width: size, height: size }}
        title="Tap Kido to talk!"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-lg"
        >
          <defs>
            <linearGradient id="kidoBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <linearGradient id="kidoBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="earInside" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
            <radialGradient id="sparkleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing aura */}
          <circle cx="60" cy="60" r="54" fill="url(#sparkleGlow)" className="animate-pulse-soft" />

          {/* Tail */}
          <path
            d="M85 85 C110 80, 115 50, 95 40 C85 55, 80 75, 75 85 Z"
            fill="url(#kidoBody)"
          />
          <circle cx="98" cy="45" r="7" fill="#ffffff" />
          <path d="M96 40 Q105 45 96 50" stroke="#fde047" strokeWidth="2" fill="none" />

          {/* Left Ear */}
          <polygon points="28,45 15,10 48,28" fill="url(#kidoBody)" />
          <polygon points="28,40 20,18 42,30" fill="url(#earInside)" />

          {/* Right Ear */}
          <polygon points="92,45 105,10 72,28" fill="url(#kidoBody)" />
          <polygon points="92,40 100,18 78,30" fill="url(#earInside)" />

          {/* Head & Body Base */}
          <ellipse cx="60" cy="68" rx="36" ry="34" fill="url(#kidoBody)" />

          {/* Soft White Cheeks & Belly */}
          <ellipse cx="60" cy="78" rx="20" ry="18" fill="url(#kidoBelly)" />
          <circle cx="34" cy="68" r="8" fill="#fbcfe8" opacity="0.7" />
          <circle cx="86" cy="68" r="8" fill="#fbcfe8" opacity="0.7" />

          {/* Eyes depending on emotion */}
          {emotion === 'celebrating' || emotion === 'laughing' ? (
            <>
              {/* Happy squint eyes */}
              <path d="M40 58 Q48 50 54 58" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M66 58 Q72 50 80 58" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : emotion === 'thinking' ? (
            <>
              {/* Curious/thinking eyes */}
              <circle cx="47" cy="54" r="5.5" fill="#1e293b" />
              <circle cx="45" cy="52" r="2" fill="#ffffff" />
              <circle cx="73" cy="50" r="6" fill="#1e293b" />
              <circle cx="71" cy="48" r="2" fill="#ffffff" />
              <path d="M42 46 Q47 43 52 46" stroke="#1e293b" strokeWidth="2" fill="none" />
              <path d="M68 42 Q73 40 78 44" stroke="#1e293b" strokeWidth="2" fill="none" />
            </>
          ) : (
            <>
              {/* Big sparkling eyes */}
              <circle cx="46" cy="56" r="6" fill="#1e293b" />
              <circle cx="44" cy="53" r="2.5" fill="#ffffff" />
              <circle cx="48" cy="58" r="1" fill="#ffffff" />

              <circle cx="74" cy="56" r="6" fill="#1e293b" />
              <circle cx="72" cy="53" r="2.5" fill="#ffffff" />
              <circle cx="76" cy="58" r="1" fill="#ffffff" />
            </>
          )}

          {/* Cute Nose */}
          <polygon points="57,63 63,63 60,67" fill="#831843" />

          {/* Smile */}
          <path d="M54 68 Q60 74 66 68" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Forehead Star / Cosmic Jewel */}
          <path
            d="M60 42 L62 47 L67 47 L63 50 L65 55 L60 52 L55 55 L57 50 L53 47 L58 47 Z"
            fill="#38bdf8"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Front Paws */}
          <ellipse cx="46" cy="95" rx="8" ry="6" fill="#fb923c" />
          <ellipse cx="74" cy="95" rx="8" ry="6" fill="#fb923c" />
        </svg>

        {tapped && (
          <div className="absolute -top-3 -right-2 text-xl animate-pop-in">✨</div>
        )}
      </button>
    </div>
  );
}

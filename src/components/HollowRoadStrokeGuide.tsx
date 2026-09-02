import React from 'react';

export interface StrokeSegment {
  d: string; // SVG path string
  badge?: {
    num: number;
    x: number;
    y: number;
    color: string; // Tailwind or Hex
    arrow: string; // e.g. '↓', '↘', '→', '↙', '↗'
  };
}

export interface CharacterTrackData {
  char: string;
  viewBox?: string;
  strokes: StrokeSegment[];
}

// Pre-defined high accuracy stroke roads for English Alphabet (A-Z), Numbers (1-9), and Common characters
export const HOLLOW_STROKE_ROAD_DATA: Record<string, CharacterTrackData> = {
  // Uppercase A (Exact match to the reference image!)
  A: {
    char: 'A',
    viewBox: '0 0 300 340',
    strokes: [
      {
        // Stroke 1: Top apex down to bottom-left
        d: 'M 150 40 L 45 290',
        badge: { num: 1, x: 132, y: 55, color: '#f43f5e', arrow: '↙' },
      },
      {
        // Stroke 2: Top apex down to bottom-right
        d: 'M 150 40 L 255 290',
        badge: { num: 2, x: 168, y: 75, color: '#3b82f6', arrow: '↘' },
      },
      {
        // Stroke 3: Horizontal crossbar left to right
        d: 'M 85 200 L 215 200',
        badge: { num: 3, x: 105, y: 200, color: '#f97316', arrow: '➔' },
      },
    ],
  },
  B: {
    char: 'B',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 C 220 40, 220 160, 75 160',
        badge: { num: 2, x: 140, y: 40, color: '#3b82f6', arrow: '↷' },
      },
      {
        d: 'M 75 160 C 235 160, 235 290, 75 290',
        badge: { num: 3, x: 150, y: 160, color: '#f97316', arrow: '↷' },
      },
    ],
  },
  C: {
    char: 'C',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 240 85 C 130 20, 60 90, 60 165 C 60 240, 130 310, 240 245',
        badge: { num: 1, x: 235, y: 85, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
  D: {
    char: 'D',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 C 265 40, 265 290, 75 290',
        badge: { num: 2, x: 145, y: 40, color: '#3b82f6', arrow: '↷' },
      },
    ],
  },
  E: {
    char: 'E',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 L 230 40',
        badge: { num: 2, x: 110, y: 40, color: '#3b82f6', arrow: '➔' },
      },
      {
        d: 'M 75 165 L 205 165',
        badge: { num: 3, x: 110, y: 165, color: '#f97316', arrow: '➔' },
      },
      {
        d: 'M 75 290 L 230 290',
        badge: { num: 4, x: 110, y: 290, color: '#10b981', arrow: '➔' },
      },
    ],
  },
  F: {
    char: 'F',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 L 230 40',
        badge: { num: 2, x: 110, y: 40, color: '#3b82f6', arrow: '➔' },
      },
      {
        d: 'M 75 165 L 205 165',
        badge: { num: 3, x: 110, y: 165, color: '#f97316', arrow: '➔' },
      },
    ],
  },
  G: {
    char: 'G',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 240 85 C 130 20, 60 90, 60 165 C 60 240, 130 310, 240 245 L 240 165 L 165 165',
        badge: { num: 1, x: 235, y: 85, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
  H: {
    char: 'H',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 225 40 L 225 290',
        badge: { num: 2, x: 225, y: 55, color: '#3b82f6', arrow: '↓' },
      },
      {
        d: 'M 75 165 L 225 165',
        badge: { num: 3, x: 115, y: 165, color: '#f97316', arrow: '➔' },
      },
    ],
  },
  I: {
    char: 'I',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 150 40 L 150 290',
        badge: { num: 1, x: 150, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 85 40 L 215 40',
        badge: { num: 2, x: 105, y: 40, color: '#3b82f6', arrow: '➔' },
      },
      {
        d: 'M 85 290 L 215 290',
        badge: { num: 3, x: 105, y: 290, color: '#f97316', arrow: '➔' },
      },
    ],
  },
  J: {
    char: 'J',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 190 40 L 190 230 C 190 295, 110 305, 75 240',
        badge: { num: 1, x: 190, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 115 40 L 245 40',
        badge: { num: 2, x: 135, y: 40, color: '#3b82f6', arrow: '➔' },
      },
    ],
  },
  K: {
    char: 'K',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 225 50 L 75 175',
        badge: { num: 2, x: 215, y: 65, color: '#3b82f6', arrow: '↙' },
      },
      {
        d: 'M 105 150 L 235 290',
        badge: { num: 3, x: 125, y: 170, color: '#f97316', arrow: '↘' },
      },
    ],
  },
  L: {
    char: 'L',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 85 40 L 85 290 L 235 290',
        badge: { num: 1, x: 85, y: 55, color: '#f43f5e', arrow: '↓' },
      },
    ],
  },
  M: {
    char: 'M',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 60 290 L 60 40',
        badge: { num: 1, x: 60, y: 260, color: '#f43f5e', arrow: '↑' },
      },
      {
        d: 'M 60 40 L 150 200',
        badge: { num: 2, x: 75, y: 65, color: '#3b82f6', arrow: '↘' },
      },
      {
        d: 'M 150 200 L 240 40',
        badge: { num: 3, x: 165, y: 170, color: '#f97316', arrow: '↗' },
      },
      {
        d: 'M 240 40 L 240 290',
        badge: { num: 4, x: 240, y: 65, color: '#10b981', arrow: '↓' },
      },
    ],
  },
  N: {
    char: 'N',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 70 290 L 70 40',
        badge: { num: 1, x: 70, y: 260, color: '#f43f5e', arrow: '↑' },
      },
      {
        d: 'M 70 40 L 230 290',
        badge: { num: 2, x: 90, y: 65, color: '#3b82f6', arrow: '↘' },
      },
      {
        d: 'M 230 290 L 230 40',
        badge: { num: 3, x: 230, y: 260, color: '#f97316', arrow: '↑' },
      },
    ],
  },
  O: {
    char: 'O',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 150 40 C 60 40, 60 290, 150 290 C 240 290, 240 40, 150 40 Z',
        badge: { num: 1, x: 150, y: 40, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
  P: {
    char: 'P',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 C 230 40, 230 170, 75 170',
        badge: { num: 2, x: 135, y: 40, color: '#3b82f6', arrow: '↷' },
      },
    ],
  },
  Q: {
    char: 'Q',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 150 40 C 60 40, 60 280, 150 280 C 240 280, 240 40, 150 40 Z',
        badge: { num: 1, x: 150, y: 40, color: '#f43f5e', arrow: '↺' },
      },
      {
        d: 'M 160 210 L 250 295',
        badge: { num: 2, x: 175, y: 225, color: '#3b82f6', arrow: '↘' },
      },
    ],
  },
  R: {
    char: 'R',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 75 40 C 230 40, 230 165, 75 165',
        badge: { num: 2, x: 135, y: 40, color: '#3b82f6', arrow: '↷' },
      },
      {
        d: 'M 140 165 L 235 290',
        badge: { num: 3, x: 155, y: 185, color: '#f97316', arrow: '↘' },
      },
    ],
  },
  S: {
    char: 'S',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 225 85 C 225 35, 85 30, 85 105 C 85 170, 220 170, 220 235 C 220 305, 75 300, 75 245',
        badge: { num: 1, x: 215, y: 80, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
  T: {
    char: 'T',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 150 40 L 150 290',
        badge: { num: 1, x: 150, y: 65, color: '#f43f5e', arrow: '↓' },
      },
      {
        d: 'M 50 40 L 250 40',
        badge: { num: 2, x: 75, y: 40, color: '#3b82f6', arrow: '➔' },
      },
    ],
  },
  U: {
    char: 'U',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 40 L 75 220 C 75 295, 225 295, 225 220 L 225 40',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↓' },
      },
    ],
  },
  V: {
    char: 'V',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 60 40 L 150 290',
        badge: { num: 1, x: 75, y: 55, color: '#f43f5e', arrow: '↘' },
      },
      {
        d: 'M 150 290 L 240 40',
        badge: { num: 2, x: 165, y: 260, color: '#3b82f6', arrow: '↗' },
      },
    ],
  },
  W: {
    char: 'W',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 50 40 L 95 290',
        badge: { num: 1, x: 55, y: 60, color: '#f43f5e', arrow: '↘' },
      },
      {
        d: 'M 95 290 L 150 120',
        badge: { num: 2, x: 105, y: 260, color: '#3b82f6', arrow: '↗' },
      },
      {
        d: 'M 150 120 L 205 290',
        badge: { num: 3, x: 160, y: 145, color: '#f97316', arrow: '↘' },
      },
      {
        d: 'M 205 290 L 250 40',
        badge: { num: 4, x: 215, y: 260, color: '#10b981', arrow: '↗' },
      },
    ],
  },
  X: {
    char: 'X',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 65 45 L 235 285',
        badge: { num: 1, x: 75, y: 60, color: '#f43f5e', arrow: '↘' },
      },
      {
        d: 'M 235 45 L 65 285',
        badge: { num: 2, x: 225, y: 60, color: '#3b82f6', arrow: '↙' },
      },
    ],
  },
  Y: {
    char: 'Y',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 60 45 L 150 165',
        badge: { num: 1, x: 75, y: 60, color: '#f43f5e', arrow: '↘' },
      },
      {
        d: 'M 240 45 L 150 165',
        badge: { num: 2, x: 225, y: 60, color: '#3b82f6', arrow: '↙' },
      },
      {
        d: 'M 150 165 L 150 290',
        badge: { num: 3, x: 150, y: 185, color: '#f97316', arrow: '↓' },
      },
    ],
  },
  Z: {
    char: 'Z',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 65 50 L 235 50 L 65 285 L 235 285',
        badge: { num: 1, x: 80, y: 50, color: '#f43f5e', arrow: '➔' },
      },
    ],
  },

  // Numbers 1 - 9
  '1': {
    char: '1',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 90 90 L 155 45 L 155 290',
        badge: { num: 1, x: 95, y: 90, color: '#f43f5e', arrow: '↗' },
      },
      {
        d: 'M 85 290 L 225 290',
        badge: { num: 2, x: 105, y: 290, color: '#3b82f6', arrow: '➔' },
      },
    ],
  },
  '2': {
    char: '2',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 100 C 75 35, 225 35, 225 125 C 225 200, 75 285, 75 285 L 235 285',
        badge: { num: 1, x: 90, y: 80, color: '#f43f5e', arrow: '↷' },
      },
    ],
  },
  '3': {
    char: '3',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 75 55 L 225 55 L 145 155 C 225 155, 235 285, 75 285',
        badge: { num: 1, x: 90, y: 55, color: '#f43f5e', arrow: '➔' },
      },
    ],
  },
  '4': {
    char: '4',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 195 40 L 70 205 L 245 205',
        badge: { num: 1, x: 185, y: 55, color: '#f43f5e', arrow: '↙' },
      },
      {
        d: 'M 195 120 L 195 290',
        badge: { num: 2, x: 195, y: 135, color: '#3b82f6', arrow: '↓' },
      },
    ],
  },
  '5': {
    char: '5',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 220 50 L 95 50 L 95 150 C 130 135, 230 145, 230 225 C 230 295, 80 295, 75 245',
        badge: { num: 1, x: 200, y: 50, color: '#f43f5e', arrow: '←' },
      },
    ],
  },
  '6': {
    char: '6',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 205 60 C 90 70, 65 170, 65 225 C 65 295, 225 295, 225 220 C 225 155, 75 155, 75 220',
        badge: { num: 1, x: 195, y: 65, color: '#f43f5e', arrow: '↙' },
      },
    ],
  },
  '7': {
    char: '7',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 65 50 L 235 50 L 125 290',
        badge: { num: 1, x: 80, y: 50, color: '#f43f5e', arrow: '➔' },
      },
    ],
  },
  '8': {
    char: '8',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 150 160 C 100 160, 90 50, 150 50 C 210 50, 200 160, 150 160 C 90 160, 80 285, 150 285 C 220 285, 210 160, 150 160 Z',
        badge: { num: 1, x: 150, y: 160, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
  '9': {
    char: '9',
    viewBox: '0 0 300 340',
    strokes: [
      {
        d: 'M 225 125 C 225 55, 75 55, 75 125 C 75 190, 225 190, 225 125 L 225 230 C 225 295, 110 300, 85 255',
        badge: { num: 1, x: 220, y: 110, color: '#f43f5e', arrow: '↺' },
      },
    ],
  },
};

interface HollowRoadStrokeGuideProps {
  character: string;
  className?: string;
  showStrokeOrder?: boolean;
}

export const HollowRoadStrokeGuide: React.FC<HollowRoadStrokeGuideProps> = ({
  character,
  className = '',
  showStrokeOrder = true,
}) => {
  const roadData = HOLLOW_STROKE_ROAD_DATA[character.toUpperCase()];

  // If we have accurate vector stroke definition
  if (roadData) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none p-1 sm:p-2 ${className}`}>
        <svg
          viewBox={roadData.viewBox || '0 0 300 340'}
          className="w-full h-full max-w-[440px] max-h-[500px] drop-shadow-xl scale-100 sm:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Outer Bold Track Contour (Dark road edge) */}
          {roadData.strokes.map((s, idx) => (
            <path
              key={`outer-${idx}`}
              d={s.d}
              stroke="#0f172a"
              strokeWidth="68"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Layer 2: Inner Hollow White Roadway */}
          {roadData.strokes.map((s, idx) => (
            <path
              key={`inner-${idx}`}
              d={s.d}
              stroke="#ffffff"
              strokeWidth="52"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Layer 3: Dashed Centerline Track */}
          {roadData.strokes.map((s, idx) => (
            <path
              key={`dash-${idx}`}
              d={s.d}
              stroke="#64748b"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="12 14"
            />
          ))}

          {/* Layer 4: Numbered Circular Stroke Badges & Directional Arrows */}
          {showStrokeOrder &&
            roadData.strokes.map((s, idx) => {
              if (!s.badge) return null;
              return (
                <g key={`badge-${idx}`} className="animate-pulse">
                  {/* Outer circle halo */}
                  <circle
                    cx={s.badge.x}
                    cy={s.badge.y}
                    r="16"
                    fill={s.badge.color}
                    stroke="#ffffff"
                    strokeWidth="3"
                    className="drop-shadow-md"
                  />
                  {/* Number text */}
                  <text
                    x={s.badge.x}
                    y={s.badge.y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    {s.badge.num}
                  </text>
                  {/* Arrow indicator */}
                  <text
                    x={s.badge.x + 20}
                    y={s.badge.y + 6}
                    fill="#334155"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {s.badge.arrow}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>
    );
  }

  // High-Definition Large Hollow Road Track for Tamil Vowels & Words
  const isTamil = /[\u0B80-\u0BFF]/.test(character);
  const charLength = character.trim().length;

  if (isTamil) {
    const isSingleChar = charLength <= 1;
    // For single Tamil vowel (அ, ஆ, இ, ஈ, உ, ஊ, எ, ஏ, ஐ, ஒ, ஓ, ஔ, ஃ)
    // Scale viewBox and font size so the Tamil letter is HUGE and fills the canvas just like English A-Z!
    const tamilViewBox = isSingleChar
      ? '0 0 260 260'
      : charLength <= 3
      ? '0 0 360 220'
      : '0 0 460 220';
    const tamilFontSize = isSingleChar ? 300 : charLength <= 3 ? 170 : charLength <= 5 ? 130 : 90;
    const strokeOuter = isSingleChar ? 46 : 28;
    const strokeInner = isSingleChar ? 32 : 18;
    const strokeDash = isSingleChar ? 6 : 4;

    return (
      <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none p-1 sm:p-2 ${className}`}>
        <svg
          viewBox={tamilViewBox}
          className="w-full h-full max-w-[480px] max-h-[520px] drop-shadow-2xl scale-105 sm:scale-110 transform transition-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Outer Bold Road Border */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="central"
            stroke="#0f172a"
            strokeWidth={strokeOuter}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="#ffffff"
            fontSize={tamilFontSize}
            fontWeight="900"
            fontFamily="'Nirmala UI', 'Latha', 'Vijaya', 'Mukta Malar', system-ui, -apple-system, sans-serif"
          >
            {character}
          </text>

          {/* Layer 2: Inner Hollow White Roadway */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth={strokeInner}
            strokeLinejoin="round"
            strokeLinecap="round"
            fontSize={tamilFontSize}
            fontWeight="900"
            fontFamily="'Nirmala UI', 'Latha', 'Vijaya', 'Mukta Malar', system-ui, -apple-system, sans-serif"
          >
            {character}
          </text>

          {/* Layer 3: Dashed Centerline Track Guide */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="central"
            fill="none"
            stroke="#64748b"
            strokeWidth={strokeDash}
            strokeDasharray="10 12"
            strokeLinejoin="round"
            strokeLinecap="round"
            fontSize={tamilFontSize}
            fontWeight="900"
            fontFamily="'Nirmala UI', 'Latha', 'Vijaya', 'Mukta Malar', system-ui, -apple-system, sans-serif"
          >
            {character}
          </text>
        </svg>
      </div>
    );
  }

  // Fallback for full words, lowercase, numbers: High-definition Large Hollow Road Track
  const fontSize = charLength > 5 ? 70 : charLength > 3 ? 95 : charLength > 1 ? 140 : 250;
  const yPos = '56%';

  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none p-1 sm:p-2 ${className}`}>
      <svg
        viewBox="0 0 360 320"
        className="w-full h-full max-w-[460px] max-h-[500px] drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Outer bold outline road edge */}
        <text
          x="50%"
          y={yPos}
          textAnchor="middle"
          dominantBaseline="central"
          stroke="#0f172a"
          strokeWidth="38"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="#ffffff"
          fontSize={fontSize}
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {character}
        </text>

        {/* Layer 2: Inner white roadway */}
        <text
          x="50%"
          y={yPos}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="26"
          strokeLinejoin="round"
          strokeLinecap="round"
          fontSize={fontSize}
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {character}
        </text>

        {/* Layer 3: Center dotted / dashed track line */}
        <text
          x="50%"
          y={yPos}
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke="#64748b"
          strokeWidth="5"
          strokeDasharray="10 10"
          strokeLinejoin="round"
          strokeLinecap="round"
          fontSize={fontSize}
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {character}
        </text>
      </svg>
    </div>
  );
};

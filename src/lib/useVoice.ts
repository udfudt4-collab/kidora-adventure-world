import { soundEngine } from './soundEngine';

export function useVoice() {
  const speak = (
    text: string,
    enabled = true,
    options?: {
      rate?: number;
      pitch?: number;
      volume?: number;
      lang?: string;
      onEnd?: () => void;
    }
  ) => {
    if (!enabled) return;
    soundEngine.speak(text, options);
  };

  const stop = () => {
    soundEngine.stop();
  };

  return {
    speak,
    stop,
    playPop: () => soundEngine.playPop(),
    playStarDing: () => soundEngine.playStarDing(),
    playCelebration: () => soundEngine.playCelebration(),
    playChime: () => soundEngine.playChime(),
    playCorrect: () => soundEngine.playCorrect(),
    playWrong: () => soundEngine.playWrong(),
  };
}

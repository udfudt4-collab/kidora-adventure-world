export function useVoice() {
  const speak = (text: string, enabled = true) => {
    if (!enabled) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return { speak, stop };
}

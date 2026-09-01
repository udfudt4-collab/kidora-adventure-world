// 🎵 Universal Sound & Voice Engine for Web & Android/iOS WebView (Capacitor)
// Solves Android WebView Garbage Collection bugs, AudioContext suspension, and TTS silent failure.

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isWarmedUp = false;
  private activeUtterances = new Set<SpeechSynthesisUtterance>();

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize Web Audio Context on first user touch/interaction
      const initAudio = () => {
        this.warmup();
        window.removeEventListener('click', initAudio);
        window.removeEventListener('touchstart', initAudio);
        window.removeEventListener('keydown', initAudio);
      };
      window.addEventListener('click', initAudio, { passive: true, once: true });
      window.addEventListener('touchstart', initAudio, { passive: true, once: true });
      window.addEventListener('keydown', initAudio, { passive: true, once: true });

      // Voice loading for mobile WebView
      if ('speechSynthesis' in window) {
        this.loadVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      this.voices = window.speechSynthesis.getVoices() || [];
    } catch {
      this.voices = [];
    }
  }

  public warmup() {
    if (this.isWarmedUp) return;
    this.isWarmedUp = true;

    // 1. Resume AudioContext
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // 2. Warm up SpeechSynthesis for Android
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        // Silent micro-utterance to wake up Android TTS audio track
        const warmupUtterance = new SpeechSynthesisUtterance(' ');
        warmupUtterance.volume = 0.01;
        warmupUtterance.rate = 10;
        this.activeUtterances.add(warmupUtterance);
        warmupUtterance.onend = () => this.activeUtterances.delete(warmupUtterance);
        warmupUtterance.onerror = () => this.activeUtterances.delete(warmupUtterance);
        window.speechSynthesis.speak(warmupUtterance);
      } catch {
        // Ignore warmup errors
      }
    }
  }

  /**
   * Speak text with robust Android WebView GC retention & voice matching
   */
  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      volume?: number;
      lang?: string;
      onEnd?: () => void;
      playFallbackTone?: boolean;
    }
  ) {
    if (typeof window === 'undefined') return;

    // Ensure AudioContext is active
    this.getAudioContext();

    if (!('speechSynthesis' in window)) {
      if (options?.playFallbackTone !== false) {
        this.playTone(440, 0.2);
      }
      options?.onEnd?.();
      return;
    }

    try {
      // Resume if Android engine was paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      // Clean text for speech
      const cleaned = text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
      if (!cleaned) {
        options?.onEnd?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = options?.rate ?? 0.88;
      utterance.pitch = options?.pitch ?? 1.1;
      utterance.volume = options?.volume ?? 1.0;
      utterance.lang = options?.lang ?? 'en-US';

      // Pick the best natural English or requested language voice
      if (this.voices.length > 0) {
        const matchingVoice =
          this.voices.find(
            (v) =>
              (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')) &&
              (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female'))
          ) ||
          this.voices.find((v) => v.lang.startsWith('en')) ||
          this.voices[0];

        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      // CRITICAL FOR ANDROID: Prevent garbage collection before audio ends
      this.activeUtterances.add(utterance);

      utterance.onend = () => {
        this.activeUtterances.delete(utterance);
        options?.onEnd?.();
      };

      utterance.onerror = (err) => {
        this.activeUtterances.delete(utterance);
        // If Android TTS failed, play musical chime fallback
        if (options?.playFallbackTone !== false) {
          this.playChime();
        }
        options?.onEnd?.();
      };

      window.speechSynthesis.speak(utterance);

      // Android WebView safety timeout: If speech is stuck paused, force resume
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 100);
    } catch {
      if (options?.playFallbackTone !== false) {
        this.playChime();
      }
      options?.onEnd?.();
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        this.activeUtterances.clear();
      } catch {}
    }
  }

  // --- 🎹 Real-Time Web Audio Synthesized Sound Effects (Zero Audio Files Needed) ---

  public playPop() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  public playStarDing() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [987.77, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + i * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch {}
  }

  public playCelebration() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 Fanfare
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.1;
        const duration = idx === notes.length - 1 ? 0.6 : 0.18;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {}
  }

  public playChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  public playTone(freq = 440, duration = 0.2) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  public playMusicalCrayonNote(noteIndex = 0) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      // Pentatonic scale (C5, D5, E5, G5, A5, C6, D6, E6)
      const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
      const freq = scale[Math.abs(noteIndex) % scale.length];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
    } catch {}
  }

  public triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        if (type === 'light') navigator.vibrate(10);
        else if (type === 'medium') navigator.vibrate(25);
        else if (type === 'success') navigator.vibrate([30, 40, 50]);
      } catch {}
    }
  }

  public playPhonicsJingle(letter: string, word: string, sound: string) {
    this.playCelebration();
    setTimeout(() => {
      this.speak(`${letter} is for ${word}. ${sound}, ${sound}, ${word}!`, {
        rate: 0.9,
        pitch: 1.15,
      });
    }, 400);
  }

  public playCorrect() {
    this.playStarDing();
    this.triggerHaptic('success');
  }

  public playWrong() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
      this.triggerHaptic('medium');
    } catch {}
  }

  public playRainSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.05;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, start);
        gain.gain.setValueAtTime(0.06, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.05);
      }
    } catch {}
  }

  public playWindSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.4);
      osc.frequency.linearRampToValueAtTime(120, now + 0.9);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.9);
    } catch {}
  }

  public playThunderSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.7);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      this.triggerHaptic('medium');
    } catch {}
  }

  public playBirdChirp() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch {}
  }
}

export const soundEngine = new SoundEngine();

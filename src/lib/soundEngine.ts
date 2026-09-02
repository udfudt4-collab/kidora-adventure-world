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
    // 1. Resume AudioContext immediately
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
        if (this.voices.length === 0) {
          this.loadVoices();
        }
        if (!this.isWarmedUp) {
          this.isWarmedUp = true;
          const warmupUtterance = new SpeechSynthesisUtterance('');
          warmupUtterance.volume = 0.001;
          warmupUtterance.rate = 10;
          this.activeUtterances.add(warmupUtterance);
          warmupUtterance.onend = () => this.activeUtterances.delete(warmupUtterance);
          warmupUtterance.onerror = () => this.activeUtterances.delete(warmupUtterance);
          window.speechSynthesis.speak(warmupUtterance);
        }
      } catch {}
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

    // 1. Ensure Web Audio Context is active and play an instant UI chime/pop
    this.warmup();
    if (options?.playFallbackTone !== false) {
      this.playPop();
    }

    if (!('speechSynthesis' in window)) {
      options?.onEnd?.();
      return;
    }

    try {
      if (this.voices.length === 0) {
        this.loadVoices();
      }

      // Resume if Android engine was paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Clean text for speech
      let cleaned = text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
      if (!cleaned) {
        options?.onEnd?.();
        return;
      }

      // Check if text contains Tamil characters
      const hasTamil = /[\u0B80-\u0BFF]/.test(cleaned);

      // Search for a native Tamil voice
      const tamilVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('ta') ||
          v.lang.toLowerCase().includes('ta-in') ||
          v.name.toLowerCase().includes('tamil')
      );

      // If Tamil text is present and NO native Tamil voice exists on device:
      // Replace Tamil characters with clear, smooth English phonetic syllables so it sounds natural!
      if (hasTamil && !tamilVoice) {
        const TAMIL_MAP: Record<string, string> = {
          'அம்மா': 'Amma',
          'ஆடு': 'Aadu',
          'இலை': 'Ilai',
          'ஈட்டி': 'Eetti',
          'உரல்': 'Ural',
          'ஊஞ்சல்': 'Oonjal',
          'எலி': 'Eli',
          'ஏணி': 'Aeni',
          'ஐந்து': 'Ainthu',
          'ஒட்டகம்': 'Ottagam',
          'ஓடம்': 'Odam',
          'ஔவையார்': 'Avvaiyaar',
          'எஃகு': 'Ehku',
          'அ': 'Ah',
          'ஆ': 'Aah',
          'இ': 'Ee',
          'ஈ': 'Eee',
          'உ': 'Oo',
          'ஊ': 'Ooo',
          'எ': 'Eh',
          'ஏ': 'Aay',
          'ஐ': 'Eye',
          'ஒ': 'Oh',
          'ஓ': 'Oah',
          'ஔ': 'Au',
          'ஃ': 'Akh',
          'சிங்கம்': 'Singam',
          'யானை': 'Yaanai',
          'புலி': 'Puli',
          'திராட்சை': 'Dhiratchai',
          'ஒட்டகச்சிவிங்கி': 'Ottagachivingi',
          'வரிக்குதிரை': 'Varikkuthirai',
          'கங்காரு': 'Kangaroo',
          'பசு மாடு': 'Pasu Maadu',
          'குதிரை': 'Kuthirai',
          'செம்மறி ஆடு': 'Semmari Aadu',
          'வாத்து': 'Vaathu',
          'டால்பின்': 'Dolphin',
          'திமிங்கலம்': 'Timingalam',
          'கடல் ஆமை': 'Kadal Aamai',
          'எண்காலி': 'Enkaali',
          'மயில்': 'Mayil',
          'கிளி': 'Kili',
          'ஆந்தை': 'Aanthai',
          'நாய்': 'Naai',
          'பூனை': 'Poonai',
          'பனிவீடு': 'Paniveedu',
          'பழச்சாறு': 'Pazhachaaru',
          'ஆரஞ்சு': 'Orange',
          'தர்பூசணி': 'Dharpoosani',
        };

        for (const [k, v] of Object.entries(TAMIL_MAP)) {
          cleaned = cleaned.split(k).join(v);
        }
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = options?.rate ?? (hasTamil && tamilVoice ? 0.82 : 0.88);
      utterance.pitch = options?.pitch ?? (hasTamil ? 1.05 : 1.1);
      utterance.volume = options?.volume ?? 1.0;

      if (hasTamil && tamilVoice) {
        utterance.lang = 'ta-IN';
        utterance.voice = tamilVoice;
      } else {
        utterance.lang = options?.lang ?? 'en-IN';

        if (this.voices.length > 0) {
          const matchingVoice =
            this.voices.find((v) => v.lang.includes('IN') || v.name.includes('India')) ||
            this.voices.find(
              (v) =>
                (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')) &&
                (v.name.includes('Natural') ||
                  v.name.includes('Google') ||
                  v.name.includes('Samantha') ||
                  v.name.includes('Female'))
            ) ||
            this.voices.find((v) => v.lang.startsWith('en')) ||
            this.voices[0];

          if (matchingVoice) {
            utterance.voice = matchingVoice;
          }
        }
      }

      // CRITICAL FOR ANDROID: Prevent garbage collection before audio ends
      this.activeUtterances.add(utterance);
      (window as unknown as { __lastUtterance?: SpeechSynthesisUtterance }).__lastUtterance = utterance;

      utterance.onend = () => {
        this.activeUtterances.delete(utterance);
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        this.activeUtterances.delete(utterance);
        options?.onEnd?.();
      };

      // In Android WebView, if speech is ongoing, cancel and queue
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          try {
            window.speechSynthesis.speak(utterance);
          } catch {}
        }, 35);
      } else {
        window.speechSynthesis.speak(utterance);
      }

      // Safety timeout: If speech is stuck paused on Android, force resume
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 80);
    } catch {
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

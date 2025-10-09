class SoundManager {
  private context: AudioContext | null = null;
  private flipAudio: HTMLAudioElement | null = null;
  private isSequencePlaying = false;

  private initContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, volume: number = 0.3) {
    this.initContext();
    if (!this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  /** Plays an audio file and returns a Promise when it ends */
  private playAudioFile(audioPath: string, volume: number = 0.5): Promise<void> {
    return new Promise((resolve) => {
      const audio = new Audio(audioPath);
      audio.volume = volume;
      audio.onended = () => resolve();
      audio.onerror = () => resolve(); // fail gracefully
      audio.play().catch(() => resolve());
    });
  }

  private ensureFlipAudio() {
    if (!this.flipAudio) {
      try {
        this.flipAudio = new Audio('/sound/flipcard.mp3');
        this.flipAudio.preload = 'auto';
        this.flipAudio.volume = 0.6;
        try {
          this.flipAudio.load();
        } catch {}
        this.flipAudio.addEventListener('error', () => {
          this.flipAudio = null;
        });
      } catch {
        this.flipAudio = null;
      }
    }
  }

  private stopFlip() {
    if (this.flipAudio) {
      try {
        this.flipAudio.pause();
        this.flipAudio.currentTime = 0;
      } catch {}
    }
  }

  /** ✅ Plays flip sound and returns a Promise when finished */
  async flip(): Promise<void> {
    if (this.isSequencePlaying) return;

    this.ensureFlipAudio();
    if (!this.flipAudio) {
      // fallback tone
      this.playTone(650, 0.06, 0.25);
      return new Promise((res) => setTimeout(res, 100));
    }

    return new Promise((resolve) => {
      try {
        if (this.flipAudio) {
          this.flipAudio.pause();
          this.flipAudio.currentTime = 0;
          const p = this.flipAudio.play();
          this.flipAudio.onended = () => resolve();
          if (p && typeof p.then === 'function') {
            p.catch(() => {
              this.playTone(650, 0.06, 0.25);
              setTimeout(resolve, 100);
            });
          } else {
            setTimeout(resolve, 300);
          }
        } else {
          this.playTone(650, 0.06, 0.25);
          setTimeout(resolve, 100);
        }
      } catch {
        this.playTone(650, 0.06, 0.25);
        setTimeout(resolve, 100);
      }
    });
  }

  /** ✅ Plays success tune, but only after flip sound completes */
  async match() {
    this.isSequencePlaying = true;
    await this.flip(); // wait for flip sound first

    this.initContext();
    if (!this.context) return;

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 0.25), i * 100);
    });

    setTimeout(() => (this.isSequencePlaying = false), notes.length * 100 + 200);
  }

  /** ✅ Plays flip sound, then unmatch tone after it finishes */
  async unflip() {
    this.isSequencePlaying = true;
    await this.flip(); // wait for flip sound
    this.playTone(360, 0.12, 0.12);
    setTimeout(() => (this.isSequencePlaying = false), 250);
  }

  click() {
    this.playTone(800, 0.05, 0.1);
  }

  async win() {
    this.isSequencePlaying = true;
    await this.playAudioFile('/sound/win.mp3', 0.6);
    this.isSequencePlaying = false;
  }
}

export const soundManager = new SoundManager();

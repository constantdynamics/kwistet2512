// Sound utility for quiz feedback
// Uses Web Audio API for low-latency sound effects

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;

  private ensureContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Generate a synthetic "correct" sound (ascending tone)
  playCorrect(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.1); // G5

      gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  // Generate a synthetic "incorrect" sound (descending tone)
  playIncorrect(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(349.23, ctx.currentTime); // F4
      oscillator.frequency.exponentialRampToValueAtTime(174.61, ctx.currentTime + 0.2); // F3

      gainNode.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  // Generate a synthetic "click" sound
  playClick(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);

      gainNode.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  // Generate a "level up" fanfare
  playLevelUp(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const duration = 0.15;

      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * duration);

        const startTime = ctx.currentTime + index * duration;
        gainNode.gain.setValueAtTime(this.volume * 0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  // Generate a "badge unlock" sound
  playBadgeUnlock(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  // Generate a "streak" celebration sound
  playStreak(): void {
    if (!this.enabled) return;

    try {
      const ctx = this.ensureContext();
      const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      const duration = 0.1;

      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * duration);

        const startTime = ctx.currentTime + index * duration;
        gainNode.gain.setValueAtTime(this.volume * 0.15, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration * 1.5);
      });
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }
}

export const soundManager = new SoundManager();

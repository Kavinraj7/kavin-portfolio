// Audio synthesis helper for tactile UI feedback using Web Audio API

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastHoverTime: number = 0;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playTone(freq = 440, duration = 0.05, type: OscillatorType = 'sine', volume = 0.03) {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors on locked browsers
    }
  }

  public playHover() {
    const now = Date.now();
    if (now - this.lastHoverTime < 75) return; // throttle rapid triggers
    this.lastHoverTime = now;
    this.playTone(540, 0.04, 'triangle', 0.015);
  }

  public playSelect() {
    this.playTone(720, 0.08, 'square', 0.025);
    setTimeout(() => {
      this.playTone(960, 0.07, 'sine', 0.025);
    }, 40);
  }

  public playConfirm() {
    this.playTone(880, 0.1, 'sine', 0.03);
  }

  public playTerminal() {
    this.playTone(640, 0.05, 'triangle', 0.02);
  }

  public playDismiss() {
    this.playTone(320, 0.06, 'sine', 0.02);
  }
}

export const soundFx = new SoundEngine();

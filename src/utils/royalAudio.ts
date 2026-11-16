const BACKGROUND_AUDIO_SRC =
  '/assets/aistudio/Naveen_Kumar_-_Jashn_E_Bahaara_Instrumental_-_Flute__mp3.pm__84842dba.mp3';

const TARGET_VOLUME = 0.55;
const FADE_STEP_MS = 50;

/**
 * Plays the attached flute instrumental background track ("Jashn-E-Bahaara" by Naveen Kumar)
 * in a continuous loop with smooth fade-in and fade-out transitions.
 */
class RoyalAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private fadeTimer: number | null = null;
  private isPlaying = false;

  private ensureAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') {
      return null;
    }
    if (!this.audio) {
      const audio = new Audio(BACKGROUND_AUDIO_SRC);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;
      this.audio = audio;
    }
    return this.audio;
  }

  private clearFadeTimer() {
    if (this.fadeTimer !== null) {
      window.clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private fadeTo(target: number, durationMs: number, onComplete?: () => void) {
    const audio = this.audio;
    if (!audio) {
      onComplete?.();
      return;
    }
    this.clearFadeTimer();
    const startVolume = audio.volume;
    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    let currentStep = 0;

    this.fadeTimer = window.setInterval(() => {
      currentStep += 1;
      const progress = Math.min(1, currentStep / steps);
      audio.volume = Math.max(0, Math.min(1, startVolume + (target - startVolume) * progress));
      if (progress >= 1) {
        this.clearFadeTimer();
        onComplete?.();
      }
    }, FADE_STEP_MS);
  }

  public start(): boolean {
    if (this.isPlaying) return true;
    const audio = this.ensureAudio();
    if (!audio) return false;

    try {
      this.clearFadeTimer();
      audio.volume = 0.02;
      const playPromise = audio.play();
      this.isPlaying = true;

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (this.isPlaying) {
              this.fadeTo(TARGET_VOLUME, 1200);
            }
          })
          .catch(() => {
            this.isPlaying = false;
            this.clearFadeTimer();
          });
      } else {
        this.fadeTo(TARGET_VOLUME, 1200);
      }

      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    const audio = this.audio;
    if (!audio) return;

    this.fadeTo(0, 350, () => {
      if (!this.isPlaying) {
        audio.pause();
      }
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    return this.start();
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const royalAudio = new RoyalAudioEngine();

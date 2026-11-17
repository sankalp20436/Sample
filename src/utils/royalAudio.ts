/**
 * Background music controller playing the uploaded instrumental flute track
 * "Jashn-E-Bahaara (Instrumental Flute)" smoothly in a loop.
 */
const AUDIO_SRC =
  '/assets/aistudio/Naveen_Kumar_-_Jashn_E_Bahaara_Instrumental_-_Flute__mp3.pm__84842dba.mp3';

class RoyalAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  private ensureAudio(): HTMLAudioElement {
    if (!this.audio) {
      const el = new Audio(AUDIO_SRC);
      el.loop = true;
      el.volume = 0.5;
      el.preload = 'auto';
      this.audio = el;
    }
    return this.audio;
  }

  public start(): boolean {
    try {
      const el = this.ensureAudio();
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          this.isPlaying = false;
        });
      }
      this.isPlaying = true;
      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
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

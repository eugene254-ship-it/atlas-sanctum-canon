// Web Audio API Ambient Generative Soundscape Engine for Atlas Sanctum

export interface SoundscapeTheme {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: "Resonance" | "Meditation" | "Atmosphere" | "Binaural";
  frequencies: number[];
  color: string;
}

export const SOUNDSCAPE_THEMES: SoundscapeTheme[] = [
  {
    id: "cosmic-resonator",
    name: "Cosmic Resonator",
    subtitle: "432 Hz Pythagorean Fundamental",
    description: "Harmonic root frequency aligned with geometric proportion and cosmic resonance.",
    category: "Resonance",
    frequencies: [108, 216, 432, 864],
    color: "#c5a059",
  },
  {
    id: "sanctum-drone",
    name: "Sanctum Drone",
    subtitle: "528 Hz Solfeggio & Harmonic Overtones",
    description: "Transformation frequency with warm sub-bass acoustics and cathedral reverberation.",
    category: "Meditation",
    frequencies: [132, 264, 528, 792],
    color: "#d4af37",
  },
  {
    id: "volcanic-geothermal",
    name: "Volcanic Geothermal",
    subtitle: "55 Hz Rift Valley Sub-Harmonics",
    description: "Deep subterranean tectonic drone blended with low-pass thermal venting acoustics.",
    category: "Atmosphere",
    frequencies: [55, 110, 165],
    color: "#e67e22",
  },
  {
    id: "binaural-focus",
    name: "Binaural Focus",
    subtitle: "6 Hz Theta Wave Contemplation",
    description: "Stereo offset binaural carrier (216Hz / 222Hz) inducing deep socratic focus.",
    category: "Binaural",
    frequencies: [216, 222],
    color: "#10b981",
  },
  {
    id: "subsaharan-rain",
    name: "Sub-Saharan Rain",
    subtitle: "Organic Biosphere Soundscape",
    description: "Continuous filtered pink-noise precipitation over fertile soil and catchment basins.",
    category: "Atmosphere",
    frequencies: [80, 240, 1200],
    color: "#38bdf8",
  },
];

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentThemeId: string = "cosmic-resonator";
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    filters: BiquadFilterNode[];
    noiseSource?: AudioBufferSourceNode;
  } = {
    oscillators: [],
    gains: [],
    filters: [],
  };
  private volume: number = 0.45;
  private listeners: (() => void)[] = [];

  constructor() {
    // Lazy init
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentThemeId: this.currentThemeId,
      volume: this.volume,
      currentTheme: SOUNDSCAPE_THEMES.find((t) => t.id === this.currentThemeId) || SOUNDSCAPE_THEMES[0],
    };
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private stopCurrentGenerators() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Fade out active gains smoothly
    this.activeNodes.gains.forEach((g) => {
      try {
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } catch (e) {
        // Safe catch for ramping edge cases
      }
    });

    setTimeout(() => {
      this.activeNodes.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      if (this.activeNodes.noiseSource) {
        try {
          this.activeNodes.noiseSource.stop();
          this.activeNodes.noiseSource.disconnect();
        } catch (e) {}
      }
      this.activeNodes.filters.forEach((f) => {
        try {
          f.disconnect();
        } catch (e) {}
      });
      this.activeNodes.gains.forEach((g) => {
        try {
          g.disconnect();
        } catch (e) {}
      });

      this.activeNodes = {
        oscillators: [],
        gains: [],
        filters: [],
      };
    }, 550);
  }

  public async togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      await this.play();
    }
  }

  public async play(themeId?: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (themeId) {
      this.currentThemeId = themeId;
    }

    this.stopCurrentGenerators();
    this.isPlaying = true;
    this.notify();

    setTimeout(() => {
      this.buildGenerativePatch(this.currentThemeId);
    }, 100);
  }

  public stop() {
    this.isPlaying = false;
    this.stopCurrentGenerators();
    this.notify();
  }

  public setTheme(themeId: string) {
    this.currentThemeId = themeId;
    if (this.isPlaying) {
      this.play(themeId);
    } else {
      this.notify();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  private buildGenerativePatch(themeId: string) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const theme = SOUNDSCAPE_THEMES.find((t) => t.id === themeId) || SOUNDSCAPE_THEMES[0];

    if (themeId === "cosmic-resonator" || themeId === "sanctum-drone") {
      // Harmonic Sine Drone Matrix
      theme.frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Gentle subtle LFO drift
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.04, now);
        lfoGain.gain.setValueAtTime(freq * 0.008, now);
        lfo.connect(osc.frequency);
        lfo.start();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(freq * 2.2, now);
        filter.Q.setValueAtTime(1.5, now);

        const targetGain = 0.28 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(targetGain, now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        this.activeNodes.oscillators.push(osc, lfo);
        this.activeNodes.gains.push(gain, lfoGain);
        this.activeNodes.filters.push(filter);
      });
    } else if (themeId === "volcanic-geothermal") {
      // Sub-bass rumble + filtered noise
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sawtooth";
      subOsc.frequency.setValueAtTime(55, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(3.5, now);

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.35, now + 1.5);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start();

      this.activeNodes.oscillators.push(subOsc);
      this.activeNodes.gains.push(subGain);
      this.activeNodes.filters.push(filter);

      // Add soft thermal noise buffer
      this.addNoiseGenerator(180, 0.12);
    } else if (themeId === "binaural-focus") {
      // Stereo Panned Binaural Beats (Left 216Hz, Right 222Hz = 6Hz Theta)
      const leftOsc = this.ctx.createOscillator();
      const rightOsc = this.ctx.createOscillator();
      const leftGain = this.ctx.createGain();
      const rightGain = this.ctx.createGain();

      leftOsc.type = "sine";
      rightOsc.type = "sine";
      leftOsc.frequency.setValueAtTime(216, now);
      rightOsc.frequency.setValueAtTime(222, now);

      // Stereo panner if supported, else dual channels
      if (this.ctx.createStereoPanner) {
        const leftPan = this.ctx.createStereoPanner();
        const rightPan = this.ctx.createStereoPanner();
        leftPan.pan.setValueAtTime(-0.85, now);
        rightPan.pan.setValueAtTime(0.85, now);

        leftGain.gain.setValueAtTime(0.0001, now);
        rightGain.gain.setValueAtTime(0.0001, now);
        leftGain.gain.exponentialRampToValueAtTime(0.28, now + 1.0);
        rightGain.gain.exponentialRampToValueAtTime(0.28, now + 1.0);

        leftOsc.connect(leftGain);
        leftGain.connect(leftPan);
        leftPan.connect(this.masterGain);

        rightOsc.connect(rightGain);
        rightGain.connect(rightPan);
        rightPan.connect(this.masterGain);
      } else {
        leftGain.gain.setValueAtTime(0.0001, now);
        rightGain.gain.setValueAtTime(0.0001, now);
        leftGain.gain.exponentialRampToValueAtTime(0.25, now + 1.0);
        rightGain.gain.exponentialRampToValueAtTime(0.25, now + 1.0);

        leftOsc.connect(leftGain);
        leftGain.connect(this.masterGain);
        rightOsc.connect(rightGain);
        rightGain.connect(this.masterGain);
      }

      leftOsc.start();
      rightOsc.start();
      this.activeNodes.oscillators.push(leftOsc, rightOsc);
      this.activeNodes.gains.push(leftGain, rightGain);
    } else if (themeId === "subsaharan-rain") {
      // Layered pink noise rain + distant thunder resonator
      this.addNoiseGenerator(650, 0.32);

      const drone = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const droneFilter = this.ctx.createBiquadFilter();

      drone.type = "sine";
      drone.frequency.setValueAtTime(82.4, now); // E2
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(160, now);

      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.exponentialRampToValueAtTime(0.2, now + 1.5);

      drone.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.masterGain);

      drone.start();
      this.activeNodes.oscillators.push(drone);
      this.activeNodes.gains.push(droneGain);
      this.activeNodes.filters.push(droneFilter);
    }
  }

  private addNoiseGenerator(cutoffFreq: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink Noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(cutoffFreq, now);
    noiseFilter.Q.setValueAtTime(0.8, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(gainLevel, now + 1.2);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start();
    this.activeNodes.noiseSource = whiteNoise;
    this.activeNodes.gains.push(noiseGain);
    this.activeNodes.filters.push(noiseFilter);
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isPlaying) {
      return [0.15, 0.25, 0.18, 0.35, 0.22, 0.14];
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    const sample = [];
    for (let i = 0; i < 6; i++) {
      const val = dataArray[i * 4] || 0;
      sample.push(Math.max(0.12, val / 255));
    }
    return sample;
  }
}

export const soundscape = new SoundscapeEngine();

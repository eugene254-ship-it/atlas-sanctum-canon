import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  Music,
  Radio,
  Sparkles,
  Waves,
  X,
  Check
} from "lucide-react";
import { soundscape, SOUNDSCAPE_THEMES, SoundscapeTheme } from "../services/soundscape";

interface SoundscapeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundscapeModal: React.FC<SoundscapeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [audioState, setAudioState] = useState(soundscape.getState());
  const [visualizerBars, setVisualizerBars] = useState<number[]>([0.2, 0.4, 0.3, 0.6, 0.4, 0.2]);

  useEffect(() => {
    const unsubscribe = soundscape.subscribe(() => {
      setAudioState(soundscape.getState());
    });
    return () => unsubscribe();
  }, []);

  // Visualizer loop when playing
  useEffect(() => {
    if (!audioState.isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setVisualizerBars(soundscape.getVisualizerData());
    }, 120);

    return () => clearInterval(interval);
  }, [audioState.isPlaying, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-[#0c0c0c] border border-[#c5a059]/40 w-full max-w-xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#080808] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#161208] border border-[#c5a059]/40 text-[#c5a059]">
              <Waves className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-light text-white tracking-wide">
                  Ambient Generative Soundscape
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-[#c5a059]/10 border border-[#c5a059]/40 text-[#c5a059]">
                  Web Audio Synthesizer
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-serif italic">
                Acoustic resonance matrix for deep contemplative inquiry
              </p>
            </div>
          </div>

          <button
            id="btn-close-soundscape-modal"
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Playback & Volume Strip */}
        <div className="px-6 py-4 bg-[#111111] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              id="btn-toggle-soundscape-playback"
              onClick={() => soundscape.togglePlay()}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] flex items-center space-x-2 transition-all ${
                audioState.isPlaying
                  ? "bg-[#c5a059] text-[#080808] hover:bg-[#b08d48] shadow-lg shadow-[#c5a059]/20"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              {audioState.isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>PAUSE RESONANCE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>ACTIVATE DRONE</span>
                </>
              )}
            </button>

            {/* Audio Spectrum Bars */}
            <div className="flex items-end space-x-1 h-6 px-3 bg-[#080808] border border-white/10">
              {visualizerBars.map((val, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#c5a059] transition-all duration-100"
                  style={{
                    height: audioState.isPlaying ? `${Math.max(15, val * 100)}%` : "15%",
                    opacity: audioState.isPlaying ? 0.9 : 0.25,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2.5">
            {audioState.volume === 0 ? (
              <VolumeX className="w-4 h-4 text-white/40" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#c5a059]" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={audioState.volume}
              onChange={(e) => soundscape.setVolume(parseFloat(e.target.value))}
              className="w-24 accent-[#c5a059] cursor-pointer bg-white/20 h-1.5 rounded-none"
            />
            <span className="text-[10px] font-mono text-white/50 w-8">
              {Math.round(audioState.volume * 100)}%
            </span>
          </div>
        </div>

        {/* Soundscape Theme Cards */}
        <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-2">
            SELECT GENERATIVE THEME
          </div>

          {SOUNDSCAPE_THEMES.map((theme) => {
            const isSelected = audioState.currentThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => soundscape.setTheme(theme.id)}
                className={`p-4 border transition-all cursor-pointer flex items-start justify-between group ${
                  isSelected
                    ? "bg-[#141108] border-[#c5a059] text-white shadow-md"
                    : "bg-[#090909] border-white/10 hover:border-white/25 text-white/70 hover:text-white"
                }`}
              >
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center space-x-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.color }}
                    ></span>
                    <h4 className="text-sm font-serif font-medium text-white tracking-wide">
                      {theme.name}
                    </h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/50 uppercase">
                      {theme.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#c5a059] font-mono">
                    {theme.subtitle}
                  </p>

                  <p className="text-[11px] text-white/50 font-serif leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                <div className="pt-1 shrink-0">
                  {isSelected ? (
                    <div className="p-1 bg-[#c5a059] text-[#080808]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 border border-white/20 group-hover:border-white/40" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#080808] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>REAL-TIME BINAURAL HARMONIC OSCILLATORS</span>
          <span className="text-[#c5a059]">0% STREAM BANDWIDTH (100% CLIENT-SYNTHESIZED)</span>
        </div>
      </div>
    </div>
  );
};

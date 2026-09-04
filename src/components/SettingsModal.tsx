import React from "react";
import {
  Sliders,
  BarChart3,
  Check,
  Eye,
  Layers,
  Globe,
  Sun,
  X,
  Sparkles,
  Palette,
  CheckCircle2
} from "lucide-react";
import { useSystemState } from "../context/SystemContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    chartTheme,
    setChartTheme,
    toggleChartTheme,
    africaMode,
    setAfricaMode,
    isZenMode,
    setIsZenMode,
    lastSavedTimestamp,
    lastSavedSource
  } = useSystemState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div
        id="modal-system-settings"
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 text-[#f2f2f2] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                SYSTEM PREFERENCES & DISPLAY
              </div>
              <h3 className="font-serif font-light text-xl text-white">
                Atlas Sanctum Settings
              </h3>
            </div>
          </div>
          <button
            id="btn-close-settings-modal"
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
            title="Close Settings (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* SECTION 1: DATA VISUALIZATION THEME TOGGLE (Requirement 4) */}
          <div className="space-y-4 p-5 bg-[#080808] border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <BarChart3 className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Data Visualization Theme
                </h4>
              </div>
              <span className="px-2 py-0.5 bg-[#141414] border border-[#c5a059]/40 text-[#c5a059] font-mono text-[10px] uppercase font-bold">
                ACTIVE: {chartTheme.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Controls the rendering style, color gamut, line thickness, and grid visibility across all system analytics, Recharts telemetry curves, resource sparklines, and D3 circular models.
            </p>

            {/* Visual Toggle Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* High-Contrast Card */}
              <div
                id="option-chart-theme-high-contrast"
                onClick={() => setChartTheme("high-contrast")}
                className={`p-4 border cursor-pointer transition-all space-y-2.5 relative ${
                  chartTheme === "high-contrast"
                    ? "bg-[#141414] border-[#c5a059] ring-1 ring-[#c5a059]/50 shadow-lg"
                    : "bg-[#0a0a0a] hover:bg-[#111111] border-white/10 text-white/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Contrast Style</span>
                  </span>
                  {chartTheme === "high-contrast" && (
                    <span className="h-4 w-4 rounded-full bg-[#c5a059] text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* High Contrast Preview Mockup */}
                <div className="h-12 bg-black border border-white/20 p-2 flex flex-col justify-between rounded-none overflow-hidden relative">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 border-white/15 opacity-40 pointer-events-none">
                    <div className="border-r border-b border-white/10"></div>
                    <div className="border-r border-b border-white/10"></div>
                    <div className="border-r border-b border-white/10"></div>
                    <div className="border-r border-b border-white/10"></div>
                    <div className="border-r border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400 z-10">
                    <span>99.8%</span>
                    <span>112ms</span>
                  </div>
                  <svg className="w-full h-5 overflow-visible z-10" viewBox="0 0 100 20">
                    <path
                      d="M0,15 Q25,2 50,11 T100,4"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,18 Q30,10 60,16 T100,8"
                      fill="none"
                      stroke="#c5a059"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="text-[10px] text-white/50 font-sans leading-snug">
                  High-luminance vivid cyan, emerald & gold telemetry. Crisp, prominent gridlines and bold 2.5px curves for high visibility.
                </div>
              </div>

              {/* Minimalist Card */}
              <div
                id="option-chart-theme-minimalist"
                onClick={() => setChartTheme("minimalist")}
                className={`p-4 border cursor-pointer transition-all space-y-2.5 relative ${
                  chartTheme === "minimalist"
                    ? "bg-[#141414] border-[#c5a059] ring-1 ring-[#c5a059]/50 shadow-lg"
                    : "bg-[#0a0a0a] hover:bg-[#111111] border-white/10 text-white/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5 text-white/70" />
                    <span>Minimalist Style</span>
                  </span>
                  {chartTheme === "minimalist" && (
                    <span className="h-4 w-4 rounded-full bg-[#c5a059] text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Minimalist Preview Mockup */}
                <div className="h-12 bg-[#0c0c0c] border border-white/5 p-2 flex flex-col justify-between rounded-none overflow-hidden relative">
                  <div className="flex items-center justify-between text-[8px] font-mono text-white/30">
                    <span>99.8%</span>
                    <span>112ms</span>
                  </div>
                  <svg className="w-full h-5 overflow-visible" viewBox="0 0 100 20">
                    <path
                      d="M0,15 Q25,2 50,11 T100,4"
                      fill="none"
                      stroke="#c5a059"
                      strokeWidth="1.2"
                      opacity="0.85"
                    />
                    <path
                      d="M0,18 Q30,10 60,16 T100,8"
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                <div className="text-[10px] text-white/50 font-sans leading-snug">
                  Muted slate, platinum and brushed gold. Ultra-clean borderless styling, no aggressive gridlines, and thin 1.2px delicate strokes.
                </div>
              </div>
            </div>

            {/* Quick Toggle Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                id="btn-toggle-chart-theme"
                onClick={toggleChartTheme}
                className="px-3.5 py-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/20 text-[#c5a059] font-mono text-xs uppercase tracking-wider flex items-center space-x-2 transition-all"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>SWITCH TO {chartTheme === "high-contrast" ? "MINIMALIST" : "HIGH-CONTRAST"}</span>
              </button>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Persisted in local storage</span>
              </span>
            </div>
          </div>

          {/* SECTION 2: SYSTEMIC LENS & ENVIRONMENT */}
          <div className="space-y-4 p-5 bg-[#080808] border border-white/10">
            <div className="flex items-center space-x-2.5">
              <Globe className="w-4 h-4 text-[#c5a059]" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Civilizational Geographic Lens
              </h4>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs text-white font-medium">Africa Matrix Mode</div>
                <div className="text-[10px] text-white/50">
                  Focuses analytics, partnership entities, and hydrological models on Kenya, the Great Lakes & East Africa.
                </div>
              </div>
              <button
                onClick={() => setAfricaMode(!africaMode)}
                className={`px-3 py-1 text-xs font-mono border transition-all ${
                  africaMode
                    ? "bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059] font-bold"
                    : "bg-[#121212] border-white/15 text-white/50"
                }`}
              >
                {africaMode ? "AFRICA LENS (ON)" : "GLOBAL LENS"}
              </button>
            </div>

            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs text-white font-medium">Contemplative Zen Mode</div>
                <div className="text-[10px] text-white/50">
                  Eliminates secondary badges and focuses visual space purely on sovereign contemplation.
                </div>
              </div>
              <button
                onClick={() => setIsZenMode(!isZenMode)}
                className={`px-3 py-1 text-xs font-mono border transition-all ${
                  isZenMode
                    ? "bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059] font-bold"
                    : "bg-[#121212] border-white/15 text-white/50"
                }`}
              >
                {isZenMode ? "ACTIVE (ON)" : "OFF"}
              </button>
            </div>
          </div>

          {/* SECTION 3: SYSTEM AUDIT & PERSISTENCE INFO */}
          <div className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between font-mono text-[11px]">
            <span className="text-white/40 uppercase tracking-wider">Recent Changes Autosave:</span>
            <div className="flex items-center space-x-2 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {lastSavedTimestamp
                  ? `Saved at ${lastSavedTimestamp} (${lastSavedSource || "Workspace"})`
                  : "Continuous state retention active"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between font-mono text-xs">
          <span className="text-white/40 text-[10px]">Atlas Sanctum v2.6 · Sovereign OS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs uppercase tracking-wider transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

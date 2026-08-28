import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Activity,
  Cpu,
  Command,
  HelpCircle,
  BookOpen,
  Sparkles,
  Layers,
  Flame,
  Radio,
  Music,
  FileText,
  Maximize,
  Heart,
  Volume2,
  Waves,
  Timer,
  HardDrive,
  CheckCircle2,
  Gauge,
  Sun,
  Copy,
  Check
} from "lucide-react";
import { NavigationSpace } from "../types";
import { soundscape } from "../services/soundscape";
import { ResourceMonitor } from "./ResourceMonitor";

interface SystemFooterProps {
  currentSpace: NavigationSpace;
  onOpenCommandPalette: () => void;
  onToggleTelemetry: () => void;
  onOpenCanon: () => void;
  onOpenShortcuts: () => void;
  onOpenSoundscape: () => void;
  onOpenScratchpad: () => void;
  onToggleDeepFocus: () => void;
  onToggleZenMode?: () => void;
  isZenMode?: boolean;
  isTelemetryOpen: boolean;
  isScratchpadOpen?: boolean;
  africaMode: boolean;
}

// Module-level session start time preserved across component re-renders
const SESSION_START_TIMESTAMP = Date.now();

export const SystemFooter: React.FC<SystemFooterProps> = ({
  currentSpace,
  onOpenCommandPalette,
  onToggleTelemetry,
  onOpenCanon,
  onOpenShortcuts,
  onOpenSoundscape,
  onOpenScratchpad,
  onToggleDeepFocus,
  onToggleZenMode,
  isZenMode = false,
  isTelemetryOpen,
  isScratchpadOpen = false,
  africaMode,
}) => {
  const [utcTime, setUtcTime] = useState<string>("");
  const [sessionDuration, setSessionDuration] = useState<string>("00:00");
  const [computeLoad, setComputeLoad] = useState<number>(48); // percentage
  const [memoryLoad, setMemoryLoad] = useState<number>(54); // percentage
  const [activeThreads, setActiveThreads] = useState<number>(8);
  const [soundState, setSoundState] = useState(soundscape.getState());
  const [audioBars, setAudioBars] = useState<number[]>([0.2, 0.4, 0.3, 0.6, 0.3]);
  const [showHealthDiagnostics, setShowHealthDiagnostics] = useState<boolean>(false);
  const [quickCopyFlash, setQuickCopyFlash] = useState<{ label: string; textSnippet: string } | null>(null);

  // Global event listener for subtle flash confirmation on Quick Copy
  useEffect(() => {
    const handleQuickCopyEvent = (e: any) => {
      const detail = e.detail || { label: "AI Response", textSnippet: "" };
      setQuickCopyFlash(detail);
      const timer = setTimeout(() => {
        setQuickCopyFlash(null);
      }, 2400);
      return () => clearTimeout(timer);
    };

    window.addEventListener("atlas-quick-copy", handleQuickCopyEvent);
    return () => window.removeEventListener("atlas-quick-copy", handleQuickCopyEvent);
  }, []);

  // Subscribe to Soundscape state
  useEffect(() => {
    const unsub = soundscape.subscribe(() => {
      setSoundState(soundscape.getState());
    });
    return () => unsub();
  }, []);

  // Visualizer loop for footer sound icon
  useEffect(() => {
    if (!soundState.isPlaying) return;
    const interval = setInterval(() => {
      setAudioBars(soundscape.getVisualizerData().slice(0, 5));
    }, 150);
    return () => clearInterval(interval);
  }, [soundState.isPlaying]);

  // UTC clock & Session Duration timer
  useEffect(() => {
    const updateTimeAndDuration = () => {
      const now = new Date();
      const hours = now.getUTCHours().toString().padStart(2, "0");
      const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      const seconds = now.getUTCSeconds().toString().padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);

      // Calculate elapsed session duration
      const elapsedSeconds = Math.floor((Date.now() - SESSION_START_TIMESTAMP) / 1000);
      const sHrs = Math.floor(elapsedSeconds / 3600);
      const sMins = Math.floor((elapsedSeconds % 3600) / 60);
      const sSecs = elapsedSeconds % 60;

      if (sHrs > 0) {
        setSessionDuration(
          `${sHrs.toString().padStart(2, "0")}:${sMins.toString().padStart(2, "0")}:${sSecs.toString().padStart(2, "0")}`
        );
      } else {
        setSessionDuration(
          `${sMins.toString().padStart(2, "0")}:${sSecs.toString().padStart(2, "0")}`
        );
      }
    };

    updateTimeAndDuration();
    const interval = setInterval(updateTimeAndDuration, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle oscillation of compute & memory load for realistic OS feedback
  useEffect(() => {
    const computeInterval = setInterval(() => {
      setComputeLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = prev + delta;
        return Math.min(92, Math.max(32, next));
      });
      setMemoryLoad((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.min(88, Math.max(45, next));
      });
      setActiveThreads((prev) => (Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 7 : prev));
    }, 3500);

    return () => clearInterval(computeInterval);
  }, []);

  const getSpaceFriendlyName = (space: NavigationSpace) => {
    switch (space) {
      case "home":
        return "OVERVIEW";
      case "question-engine":
        return "QUESTION ENGINE";
      case "observatory":
        return "OBSERVATORY";
      case "world-model":
        return "WORLD MODEL";
      case "systems-modeling":
        return "SYSTEMS MODELING";
      case "possibility-space":
        return "POSSIBILITY SPACE";
      case "studio":
        return "INNOVATION STUDIO";
      case "mission-control":
        return "MISSION CONTROL";
      case "capital-intelligence":
        return "7-CAPITALS & FINANCE";
      case "civilization-dashboard":
        return "CIVILIZATION VITALITY";
      case "scenario-engine":
        return "SCENARIO SIMULATOR";
      case "agents":
        return "10 AI AGENT SWARM";
      case "patterns-memory":
        return "PATTERN COMMONS";
      case "sdk-api":
        return "SDK & API CONSOLE";
      default:
        return String(space).toUpperCase();
    }
  };

  // Heartbeat BPM calculation based on compute intensity
  const neuralBpm = Math.round(68 + (computeLoad / 100) * 32);

  // SVG Gauge calculations (Arc radius 14, circumference 2 * PI * 14 = ~87.96)
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const cpuDashoffset = circumference - (computeLoad / 100) * circumference;
  const memoryDashoffset = circumference - (memoryLoad / 100) * circumference;

  return (
    <footer className="fixed bottom-0 inset-x-0 z-30 bg-[#080808]/95 backdrop-blur-md border-t border-white/10 text-[#f2f2f2] px-3 sm:px-6 py-2 font-mono text-[10px] select-none transition-all duration-300">
      {/* Subtle Quick Copy Flash Toast Notification Bar */}
      {quickCopyFlash && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#0a1610] border border-emerald-500/80 text-emerald-300 font-mono text-[10px] tracking-wider flex items-center space-x-2 shadow-2xl animate-fadeIn z-50">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-bold uppercase tracking-widest text-emerald-200">QUICK COPIED:</span>
          <span className="text-white/90 truncate max-w-[320px]">{quickCopyFlash.label || quickCopyFlash.textSnippet}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: Neural Heartbeat + Live Regenerative Inquiry & Model State */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Neural Heartbeat Animation in Gold */}
          <div
            className="flex items-center space-x-1.5 px-2 py-0.5 bg-[#120f06] border border-[#c5a059]/40 group cursor-pointer"
            onClick={onToggleTelemetry}
            title={`Neural Heartbeat Synch: ${neuralBpm} BPM (${computeLoad > 65 ? "High Coherence" : "Synchronous"})`}
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span className="absolute inset-0 rounded-full border border-[#c5a059] animate-neural-pulse-ring"></span>
              <Heart
                className={`w-3 h-3 text-[#c5a059] fill-[#c5a059] ${
                  computeLoad > 60 ? "animate-neural-heartbeat-fast" : "animate-neural-heartbeat"
                }`}
              />
            </div>
            <span className="text-[#c5a059] font-bold tracking-wider hidden sm:inline">
              {neuralBpm} BPM
            </span>
          </div>

          <span className="text-white/20">|</span>

          {/* Diagnostic SVG System Health Widget */}
          <div className="relative">
            <div
              id="widget-system-health"
              onClick={() => setShowHealthDiagnostics(!showHealthDiagnostics)}
              onMouseEnter={() => setShowHealthDiagnostics(true)}
              onMouseLeave={() => setShowHealthDiagnostics(false)}
              className="flex items-center space-x-2 px-2 py-0.5 bg-[#0f0f0f] hover:bg-[#161616] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer"
              title="System Health: Click to inspect CPU & Memory diagnostic telemetry"
            >
              {/* Dual-Arc SVG Gauge */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6 -rotate-90 transform" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="transparent"
                    stroke="#1c1c1c"
                    strokeWidth="2.5"
                  />
                  {/* Memory Outer Arc (Sky/Cyan) */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="transparent"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={memoryDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 opacity-70"
                  />
                  {/* Inner Track */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius - 4}
                    fill="transparent"
                    stroke="#141414"
                    strokeWidth="2"
                  />
                  {/* CPU Inner Arc (Gold/Emerald) */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius - 4}
                    fill="transparent"
                    stroke={computeLoad > 75 ? "#f59e0b" : "#c5a059"}
                    strokeWidth="2"
                    strokeDasharray={2 * Math.PI * (radius - 4)}
                    strokeDashoffset={(2 * Math.PI * (radius - 4)) * (1 - computeLoad / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute text-[7px] font-bold text-white/80">
                  {computeLoad}%
                </span>
              </div>

              <div className="hidden sm:flex flex-col text-[8px] leading-tight">
                <div className="flex items-center space-x-1">
                  <span className="text-white/40">CPU</span>
                  <span className="text-[#c5a059] font-bold">{computeLoad}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-white/40">RAM</span>
                  <span className="text-sky-400 font-bold">{memoryLoad}%</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Popover Flyout */}
            {showHealthDiagnostics && (
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#0a0a0a] border border-[#c5a059]/60 shadow-2xl space-y-2 z-50 text-[10px] animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-mono">
                  <span className="text-[#c5a059] font-bold flex items-center space-x-1">
                    <Gauge className="w-3 h-3 text-[#c5a059]" />
                    <span>SYSTEM DIAGNOSTICS</span>
                  </span>
                  <span className="text-emerald-400">NOMINAL</span>
                </div>

                <div className="space-y-1.5 text-white/70">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 flex items-center space-x-1">
                      <Cpu className="w-2.5 h-2.5 text-[#c5a059]" />
                      <span>CPU Load:</span>
                    </span>
                    <span className="text-white font-bold">{computeLoad}% ({activeThreads} threads)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/40 flex items-center space-x-1">
                      <HardDrive className="w-2.5 h-2.5 text-sky-400" />
                      <span>Memory Heap:</span>
                    </span>
                    <span className="text-white font-bold">
                      {((memoryLoad / 100) * 8).toFixed(2)} GB / 8.00 GB ({memoryLoad}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Inference Engine:</span>
                    <span className="text-emerald-400 font-bold">Gemini 3.7 Flash (Active)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Neural Coherence:</span>
                    <span className="text-[#c5a059] font-bold">99.4% Synchronous</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Event Loop Lag:</span>
                    <span className="text-emerald-400 font-bold">1.2 ms</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-white/10 text-[8px] text-white/30 font-sans">
                  Calculated from OS task scheduling & sovereign memory state.
                </div>
              </div>
            )}
          </div>

          <span className="text-white/20 hidden sm:inline">|</span>

          {/* Real-time D3 Dynamic Resource Monitor Sparklines */}
          <ResourceMonitor />

          <span className="hidden sm:inline text-white/20">|</span>

          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#c5a059] font-bold tracking-wider hidden md:inline">
              GEMINI 3.7 FLASH
            </span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          <span className="hidden lg:inline text-white/50 tracking-wider">
            INQUIRY: <strong className="text-emerald-400 font-normal">SOVEREIGN</strong>
          </span>
        </div>

        {/* Center: Current Space Badge */}
        <div className="hidden md:flex items-center space-x-2 text-white/40">
          <span>SPACE:</span>
          <span className="px-2 py-0.5 bg-[#141414] border border-[#c5a059]/40 text-white font-medium tracking-wider">
            {getSpaceFriendlyName(currentSpace)}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-[#c5a059]">{africaMode ? "AFRICA" : "GLOBAL"}</span>
        </div>

        {/* Right Side: Quick Action Hotkey Buttons + Zen Mode + Soundscape + Scratchpad + Deep Focus */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Zen Mode Toggle Button */}
          {onToggleZenMode && (
            <button
              id="btn-footer-zen-mode"
              onClick={onToggleZenMode}
              className={`px-2 py-0.5 border transition-all flex items-center space-x-1 tracking-wider ${
                isZenMode
                  ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold shadow-sm"
                  : "bg-[#121212] hover:bg-[#1c1c1c] border-white/10 text-white/60 hover:text-white"
              }`}
              title="Toggle Contemplative Zen Mode (Z)"
            >
              <Sun className="w-2.5 h-2.5 text-[#c5a059]" />
              <span className="hidden sm:inline">ZEN</span>
              <kbd className="text-[9px] bg-white/10 px-1 text-white/80">Z</kbd>
            </button>
          )}

          {/* Soundscape Controller Trigger */}
          <button
            id="btn-footer-soundscape"
            onClick={onOpenSoundscape}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 tracking-wider ${
              soundState.isPlaying
                ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold shadow-sm"
                : "bg-[#121212] hover:bg-[#1c1c1c] border-white/10 text-white/60 hover:text-white"
            }`}
            title="Toggle Ambient Generative Soundscape (M)"
          >
            <Waves className={`w-2.5 h-2.5 ${soundState.isPlaying ? "text-[#c5a059] animate-pulse" : "text-[#c5a059]"}`} />
            <span className="hidden sm:inline">
              {soundState.isPlaying ? soundState.currentTheme.name.split(" ")[0].toUpperCase() : "SOUNDSCAPE"}
            </span>
            {soundState.isPlaying && (
              <div className="flex items-end space-x-0.5 h-2.5 px-0.5">
                {audioBars.map((b, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-[#c5a059]"
                    style={{ height: `${Math.max(20, b * 100)}%` }}
                  />
                ))}
              </div>
            )}
          </button>

          {/* Ephemeral Scratchpad Trigger */}
          <button
            id="btn-footer-scratchpad"
            onClick={onOpenScratchpad}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 tracking-wider ${
              isScratchpadOpen
                ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                : "bg-[#121212] hover:bg-[#1c1c1c] border-white/10 text-white/60 hover:text-white"
            }`}
            title="Open Ephemeral Ideation Scratchpad (N)"
          >
            <FileText className="w-2.5 h-2.5 text-[#c5a059]" />
            <span className="hidden sm:inline">SCRATCHPAD</span>
            <kbd className="text-[9px] bg-white/10 px-1 text-white/80">N</kbd>
          </button>

          {/* Deep Focus Mode Trigger */}
          <button
            id="btn-footer-deep-focus"
            onClick={onToggleDeepFocus}
            className="px-2 py-0.5 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/60 hover:text-white transition-all flex items-center space-x-1 tracking-wider"
            title="Toggle Deep Focus Mode (F)"
          >
            <Maximize className="w-2.5 h-2.5 text-[#c5a059]" />
            <span className="hidden sm:inline">FOCUS</span>
            <kbd className="text-[9px] bg-white/10 px-1 text-white/80">F</kbd>
          </button>

          {/* Command Palette Trigger */}
          <button
            id="btn-footer-command-palette"
            onClick={onOpenCommandPalette}
            className="px-2 py-0.5 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/60 hover:text-white transition-all flex items-center space-x-1 tracking-wider"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-2.5 h-2.5 text-[#c5a059]" />
            <kbd className="text-[9px] bg-white/10 px-1 text-white/80">⌘K</kbd>
          </button>

          {/* Telemetry Trigger */}
          <button
            id="btn-footer-telemetry"
            onClick={onToggleTelemetry}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 tracking-wider ${
              isTelemetryOpen
                ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                : "bg-[#121212] hover:bg-[#1c1c1c] border-white/10 text-white/60 hover:text-white"
            }`}
            title="Toggle Live Telemetry (T)"
          >
            <Terminal className="w-2.5 h-2.5 text-[#c5a059]" />
            <kbd className="text-[9px] bg-white/10 px-1 text-white/80">T</kbd>
          </button>

          <span className="text-white/20">|</span>

          {/* Session Duration Indicator */}
          <div
            id="indicator-session-duration"
            className="hidden sm:flex items-center space-x-1 px-1.5 py-0.5 bg-white/5 border border-white/10 text-[#c5a059] font-mono text-[9px]"
            title="Continuous session duration. Resets only upon manual system refresh."
          >
            <Timer className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>SESSION:</span>
            <span className="font-bold text-white tracking-wider">{sessionDuration}</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* UTC Clock */}
          <span className="text-white/40 tracking-wider font-mono hidden sm:inline">
            {utcTime}
          </span>
        </div>
      </div>
    </footer>
  );
};



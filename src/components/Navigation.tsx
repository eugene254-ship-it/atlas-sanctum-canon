import React from "react";
import { NavigationSpace } from "../types";
import {
  Compass,
  HelpCircle,
  Activity,
  Globe,
  GitFork,
  Sparkles,
  Layers,
  ShieldCheck,
  Radio,
  BookOpen,
  Terminal,
  Cpu,
  BarChart3,
  Flame,
  Search,
  Sun
} from "lucide-react";

interface NavigationProps {
  currentSpace: NavigationSpace;
  onSelectSpace: (space: NavigationSpace) => void;
  onOpenDailyBrief: () => void;
  onOpenCanon: () => void;
  onOpenCommandPalette: () => void;
  onToggleTelemetry: () => void;
  onOpenShortcuts: () => void;
  onToggleZenMode?: () => void;
  isZenMode?: boolean;
  africaMode: boolean;
  onToggleAfricaMode: () => void;
  isTelemetryOpen?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSpace,
  onSelectSpace,
  onOpenDailyBrief,
  onOpenCanon,
  onOpenCommandPalette,
  onToggleTelemetry,
  onOpenShortcuts,
  onToggleZenMode,
  isZenMode = false,
  africaMode,
  onToggleAfricaMode,
  isTelemetryOpen = false,
}) => {
  const primaryNavItems: { id: NavigationSpace; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Overview", icon: Globe },
    { id: "question-engine", label: "Question Engine", icon: HelpCircle },
    { id: "observatory", label: "Observatory", icon: Activity },
    { id: "world-model", label: "World Model", icon: GitFork },
    { id: "systems-modeling", label: "Systems Modeling", icon: Layers },
    { id: "possibility-space", label: "Possibility Space", icon: Sparkles },
    { id: "studio", label: "Studio (Innovation)", icon: Compass },
    { id: "mission-control", label: "Mission Control", icon: ShieldCheck },
    { id: "capital-intelligence", label: "7-Capitals & Finance", icon: BarChart3 },
    { id: "civilization-dashboard", label: "Civilization Health", icon: Cpu },
    { id: "scenario-engine", label: "Scenario Engine", icon: Radio },
    { id: "agents", label: "AI Agent Swarm", icon: Flame },
    { id: "patterns-memory", label: "Memory & Patterns", icon: BookOpen },
    { id: "sdk-api", label: "SDK & API", icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10 text-[#f2f2f2]">
      {/* Top Banner / Pulse Bar */}
      <div className="px-6 sm:px-10 py-2.5 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">LIVE REALITY LOOP</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
            CORRIDOR: <strong className="text-[#c5a059] font-medium">{africaMode ? "AFRICA / KENYA MATRIX" : "GLOBAL REGENERATIVE NETWORK"}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Zen Mode Switcher */}
          {onToggleZenMode && (
            <button
              id="btn-nav-zen-mode"
              onClick={onToggleZenMode}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border flex items-center space-x-1.5 ${
                isZenMode
                  ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                  : "bg-[#0c0c0c] hover:bg-[#141414] border-white/15 text-white/70 hover:text-white"
              }`}
              title="Toggle Contemplative Zen Mode (Z)"
            >
              <Sun className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden md:inline">ZEN</span>
              <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">Z</kbd>
            </button>
          )}

          {/* Quick Command Palette Button */}
          <button
            id="btn-nav-command-palette"
            onClick={onOpenCommandPalette}
            className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0c0c] hover:bg-[#141414] border border-white/15 text-white/70 hover:text-white transition-all flex items-center space-x-1.5"
            title="Open Command Palette (Ctrl+K / ⌘K)"
          >
            <Search className="w-3 h-3 text-[#c5a059]" />
            <span className="hidden sm:inline">PALETTE</span>
            <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">⌘K</kbd>
          </button>

          {/* Real-time Telemetry Stream Trigger */}
          <button
            id="btn-nav-telemetry"
            onClick={onToggleTelemetry}
            className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border flex items-center space-x-1.5 ${
              isTelemetryOpen
                ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                : "bg-[#0c0c0c] hover:bg-[#141414] border-white/15 text-white/70 hover:text-white"
            }`}
            title="Toggle Live Real-Time Telemetry Stream (T)"
          >
            <Terminal className="w-3 h-3 text-[#c5a059]" />
            <span className="hidden md:inline">LOGS</span>
            <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">T</kbd>
          </button>

          {/* Africa / Kenya Lens Switcher */}
          <button
            id="btn-toggle-africa-mode"
            onClick={onToggleAfricaMode}
            className={`px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border ${
              africaMode
                ? "bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]"
                : "bg-transparent border-white/20 text-white/50 hover:text-white hover:border-white/40"
            }`}
            title="Toggle specialized Africa/Kenya economic, infrastructure, and institutional intelligence lens (A)"
          >
            {africaMode ? "✦ AFRICA LENS" : "GLOBAL LENS"}
          </button>

          {/* Canon of Greatness Drawer Trigger */}
          <button
            id="btn-open-canon"
            onClick={onOpenCanon}
            className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0c0c] hover:bg-[#141414] border border-white/15 text-white/70 hover:text-white transition-all flex items-center space-x-1.5"
            title="Open 20 Canon Pillars (C)"
          >
            <BookOpen className="w-3 h-3 text-[#c5a059]" />
            <span>20 CANON</span>
          </button>

          {/* Daily Atlas Brief Trigger */}
          <button
            id="btn-open-daily-brief"
            onClick={onOpenDailyBrief}
            className="px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-bold bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] transition-all flex items-center space-x-1.5 shadow-sm"
            title="Open Daily Executive Brief (B)"
          >
            <Activity className="w-3 h-3" />
            <span className="hidden sm:inline">DAILY BRIEF</span>
          </button>
        </div>
      </div>

      {/* Main Header / Brand & Navigation */}
      <div className="px-6 sm:px-10 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onSelectSpace("home")}>
          <div className="w-7 h-7 bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] rounded-xs transform rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-md"></div>
          <div className="pl-2">
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-light text-xl tracking-[0.35em] uppercase text-white">
                ATLAS SANCTUM
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono px-1.5 py-0.2 border border-[#c5a059]/40 text-[#c5a059]">
                SOVEREIGN
              </span>
            </div>
            <p className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-light">
              Regenerative Intelligence Operating System
            </p>
          </div>
        </div>

        {/* Global Search / Socratic Jump Bar & Command Palette Trigger */}
        <div
          onClick={onOpenCommandPalette}
          className="hidden lg:flex items-center bg-[#0c0c0c] hover:bg-[#121212] border border-white/10 hover:border-[#c5a059]/60 px-4 py-2 w-96 text-xs text-white/40 transition-all cursor-pointer select-none group"
        >
          <Search className="w-3.5 h-3.5 mr-2.5 text-[#c5a059]" />
          <span className="text-white/40 group-hover:text-white/70 text-xs flex-1 font-sans tracking-wide truncate">
            Quick jump or inquire (Ctrl+K)...
          </span>
          <div className="flex items-center space-x-1.5 shrink-0">
            <kbd className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 group-hover:bg-[#c5a059]/20 group-hover:text-[#c5a059] text-white/40 border border-white/10 transition-colors">
              ⌘K
            </kbd>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenShortcuts();
              }}
              title="View Keyboard Shortcuts (?)"
              className="p-1 hover:text-white text-white/40 hover:bg-white/10"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Space Selector Horizontal Scroll Navigation */}
      <div className="px-6 sm:px-10 border-t border-white/10 overflow-x-auto scrollbar-none flex space-x-6 py-2.5 text-xs bg-[#080808]">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSpace === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectSpace(item.id)}
              className={`pb-1 text-[10px] uppercase tracking-[0.25em] font-medium transition-all flex items-center space-x-2 shrink-0 ${
                isActive
                  ? "text-white border-b-2 border-[#c5a059] font-bold"
                  : "text-white/45 hover:text-white/90 border-b-2 border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#c5a059]" : "text-white/40"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

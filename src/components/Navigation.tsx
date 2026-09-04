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
  Sun,
  HeartHandshake,
  Sliders
} from "lucide-react";

interface NavigationProps {
  currentSpace: NavigationSpace;
  onSelectSpace: (space: NavigationSpace) => void;
  onOpenDailyBrief: () => void;
  onOpenCanon: () => void;
  onOpenCommandPalette: () => void;
  onToggleTelemetry: () => void;
  onOpenShortcuts: () => void;
  onOpenSettings?: () => void;
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
  onOpenSettings,
  onToggleZenMode,
  isZenMode = false,
  africaMode,
  onToggleAfricaMode,
  isTelemetryOpen = false,
}) => {
  const primaryNavItems: {
    id: NavigationSpace;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    shortcut: string;
    description: string;
  }[] = [
    { id: "home", label: "Overview", icon: Globe, shortcut: "1", description: "Civilization nexus & live intelligence feed" },
    { id: "partnerships", label: "Major Partnerships", icon: HeartHandshake, shortcut: "P", description: "Global alliance matrix & capital consortium" },
    { id: "question-engine", label: "Question Engine", icon: HelpCircle, shortcut: "2", description: "Socratic inquiry & first-principles unmasking" },
    { id: "observatory", label: "Observatory", icon: Activity, shortcut: "3", description: "Planetary monitoring & biophysical telemetry" },
    { id: "world-model", label: "World Model", icon: GitFork, shortcut: "4", description: "Ontological knowledge graph & causal topology" },
    { id: "systems-modeling", label: "Systems Modeling", icon: Layers, shortcut: "5", description: "Hydrology, energy & cross-sector stock-flows" },
    { id: "possibility-space", label: "Possibility Space", icon: Sparkles, shortcut: "6", description: "Counterfactual futures & frontier interventions" },
    { id: "studio", label: "Studio (Innovation)", icon: Compass, shortcut: "7", description: "Regenerative venture & prototype incubator" },
    { id: "mission-control", label: "Mission Control", icon: ShieldCheck, shortcut: "8", description: "Command center for high-stakes interventions" },
    { id: "capital-intelligence", label: "7-Capitals & Finance", icon: BarChart3, shortcut: "9", description: "Multi-capital balance sheet & non-extractive yields" },
    { id: "civilization-dashboard", label: "Civilization Health", icon: Cpu, shortcut: "0", description: "Planetary boundaries & systemic vitality index" },
    { id: "scenario-engine", label: "Scenario Engine", icon: Radio, shortcut: "S", description: "Monte Carlo stress-testing & policy sandboxes" },
    { id: "agents", label: "AI Agent Swarm", icon: Flame, shortcut: "G", description: "Multi-agent autonomous cognitive orchestrator" },
    { id: "patterns-memory", label: "Memory & Patterns", icon: BookOpen, shortcut: "M", description: "Historical wisdom & archetypal pattern repository" },
    { id: "sdk-api", label: "SDK & API", icon: Terminal, shortcut: "K", description: "Developer primitives & sovereign machine interface" },
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
            <div className="relative group/zen">
              <button
                id="btn-nav-zen-mode"
                onClick={onToggleZenMode}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border flex items-center space-x-1.5 ${
                  isZenMode
                    ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                    : "bg-[#0c0c0c] hover:bg-[#141414] border-white/15 text-white/70 hover:text-white"
                }`}
              >
                <Sun className="w-3 h-3 text-[#c5a059]" />
                <span className="hidden md:inline">ZEN</span>
                <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">Z</kbd>
              </button>

              {/* Minimalist Tooltip */}
              <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/zen:opacity-100 group-hover/zen:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
                <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                  <span className="text-white/80">Contemplative Zen Mode</span>
                  <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">Z</kbd>
                </div>
              </div>
            </div>
          )}

          {/* Quick Command Palette Button */}
          <div className="relative group/pal">
            <button
              id="btn-nav-command-palette"
              onClick={onOpenCommandPalette}
              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0c0c] hover:bg-[#141414] border border-white/15 text-white/70 hover:text-white transition-all flex items-center space-x-1.5"
            >
              <Search className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden sm:inline">PALETTE</span>
              <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">⌘K</kbd>
            </button>

            {/* Minimalist Tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/pal:opacity-100 group-hover/pal:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
              <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="text-white/80">Socratic Command Palette</span>
                <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Stream Trigger */}
          <div className="relative group/telem">
            <button
              id="btn-nav-telemetry"
              onClick={onToggleTelemetry}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border flex items-center space-x-1.5 ${
                isTelemetryOpen
                  ? "bg-[#181308] border-[#c5a059] text-[#c5a059] font-bold"
                  : "bg-[#0c0c0c] hover:bg-[#141414] border-white/15 text-white/70 hover:text-white"
              }`}
            >
              <Terminal className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden md:inline">LOGS</span>
              <kbd className="text-[9px] bg-white/10 px-1 text-white/70 font-mono">T</kbd>
            </button>

            {/* Minimalist Tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/telem:opacity-100 group-hover/telem:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
              <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="text-white/80">Swarm Telemetry & Latency</span>
                <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">T</kbd>
              </div>
            </div>
          </div>

          {/* Africa / Kenya Lens Switcher */}
          <div className="relative group/africa">
            <button
              id="btn-toggle-africa-mode"
              onClick={onToggleAfricaMode}
              className={`px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium transition-all border ${
                africaMode
                  ? "bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]"
                  : "bg-transparent border-white/20 text-white/50 hover:text-white hover:border-white/40"
              }`}
            >
              {africaMode ? "✦ AFRICA LENS" : "GLOBAL LENS"}
            </button>

            {/* Minimalist Tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/africa:opacity-100 group-hover/africa:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
              <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="text-white/80">Kenya & African Corridor Lens</span>
                <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">A</kbd>
              </div>
            </div>
          </div>

          {/* Canon of Greatness Drawer Trigger */}
          <div className="relative group/canon">
            <button
              id="btn-open-canon"
              onClick={onOpenCanon}
              className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0c0c] hover:bg-[#141414] border border-white/15 text-white/70 hover:text-white transition-all flex items-center space-x-1.5"
            >
              <BookOpen className="w-3 h-3 text-[#c5a059]" />
              <span>20 CANON</span>
            </button>

            {/* Minimalist Tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/canon:opacity-100 group-hover/canon:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
              <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="text-white/80">20 Canon Pillars of Civilizational Greatness</span>
                <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">C</kbd>
              </div>
            </div>
          </div>

          {/* System Settings & Display Preferences Trigger */}
          {onOpenSettings && (
            <div className="relative group/settings">
              <button
                id="btn-open-settings"
                onClick={onOpenSettings}
                className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0c0c] hover:bg-[#141414] border border-white/15 text-white/70 hover:text-white transition-all flex items-center space-x-1.5"
              >
                <Sliders className="w-3 h-3 text-[#c5a059]" />
                <span className="hidden lg:inline">SETTINGS</span>
              </button>

              {/* Minimalist Tooltip */}
              <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/settings:opacity-100 group-hover/settings:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
                <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                  <span className="text-white/80">Data Theme & Preferences</span>
                  <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">S</kbd>
                </div>
              </div>
            </div>
          )}

          {/* Daily Atlas Brief Trigger */}
          <div className="relative group/brief">
            <button
              id="btn-open-daily-brief"
              onClick={onOpenDailyBrief}
              className="px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-bold bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Activity className="w-3 h-3" />
              <span className="hidden sm:inline">DAILY BRIEF</span>
            </button>

            {/* Minimalist Tooltip */}
            <div className="absolute right-0 top-full mt-1.5 z-50 opacity-0 pointer-events-none group-hover/brief:opacity-100 group-hover/brief:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
              <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="text-white/80">Executive Daily Intelligence Brief</span>
                <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">B</kbd>
              </div>
            </div>
          </div>
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
            <div className="relative group/help">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenShortcuts();
                }}
                className="p-1 hover:text-white text-white/40 hover:bg-white/10"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>

              {/* Help Tooltip */}
              <div className="absolute right-0 top-full mt-2 z-50 opacity-0 pointer-events-none group-hover/help:opacity-100 group-hover/help:pointer-events-auto transition-opacity duration-150 whitespace-nowrap">
                <div className="bg-[#111111] border border-[#c5a059]/40 shadow-xl px-2.5 py-1 text-[10px] font-mono text-white flex items-center space-x-2">
                  <span>Keyboard Shortcuts Matrix</span>
                  <kbd className="bg-white/10 text-[#c5a059] px-1 py-0.2 text-[9px] font-bold">?</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Selector Horizontal Scroll Navigation with Minimalist Tooltips */}
      <div className="px-6 sm:px-10 border-t border-white/10 overflow-x-auto scrollbar-none flex space-x-6 py-2.5 text-xs bg-[#080808]">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSpace === item.id;
          return (
            <div key={item.id} className="relative group/nav shrink-0">
              <button
                id={`nav-item-${item.id}`}
                onClick={() => onSelectSpace(item.id)}
                className={`pb-1 text-[10px] uppercase tracking-[0.25em] font-medium transition-all flex items-center space-x-2 ${
                  isActive
                    ? "text-white border-b-2 border-[#c5a059] font-bold"
                    : "text-white/45 hover:text-white/90 border-b-2 border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#c5a059]" : "text-white/40"}`} />
                <span>{item.label}</span>
              </button>

              {/* Contextual Minimalist Tooltip on Hover */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto translate-y-1 group-hover/nav:translate-y-0 transition-all duration-150 ease-out whitespace-nowrap shadow-2xl">
                <div className="bg-[#0f0f0f] border border-[#c5a059]/40 px-3 py-1.5 text-left font-mono text-[10px] space-y-0.5 backdrop-blur-md">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-white font-medium">{item.label}</span>
                    <span className="text-white/30 text-[8px] uppercase">KEY:</span>
                    <kbd className="px-1.5 py-0.5 bg-white/10 text-[#c5a059] border border-[#c5a059]/40 text-[9px] font-bold font-mono">
                      {item.shortcut}
                    </kbd>
                  </div>
                  {item.description && (
                    <p className="text-[9px] text-white/50 font-sans normal-case tracking-normal max-w-xs truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
};

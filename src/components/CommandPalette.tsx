import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Globe,
  HelpCircle,
  Activity,
  GitFork,
  Layers,
  Sparkles,
  Compass,
  ShieldCheck,
  BarChart3,
  Cpu,
  Radio,
  Flame,
  BookOpen,
  Terminal,
  ArrowRight,
  Command,
  CornerDownLeft,
  X,
  Play,
  RotateCcw,
  Waves,
  FileText,
  Maximize,
  Clock,
  History,
  CheckCircle2,
  Zap,
  Sliders,
  DollarSign,
  TrendingUp,
  MapPin,
  Sun
} from "lucide-react";
import { NavigationSpace } from "../types";

export interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "Inquiry" | "Context Action";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  hotkey?: string;
  spaceContext?: NavigationSpace | "all";
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpace?: NavigationSpace;
  onNavigate: (space: NavigationSpace) => void;
  onOpenDailyBrief: () => void;
  onOpenCanon: () => void;
  onToggleAfricaMode: () => void;
  onToggleTelemetry: () => void;
  onOpenShortcuts: () => void;
  onOpenSoundscape?: () => void;
  onOpenScratchpad?: () => void;
  onToggleDeepFocus?: () => void;
  onToggleZenMode?: () => void;
  isZenMode?: boolean;
  africaMode: boolean;
}

const RECENT_COMMANDS_KEY = "atlas_recent_commands_v2";

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  currentSpace = "home",
  onNavigate,
  onOpenDailyBrief,
  onOpenCanon,
  onToggleAfricaMode,
  onToggleTelemetry,
  onOpenShortcuts,
  onOpenSoundscape,
  onOpenScratchpad,
  onToggleDeepFocus,
  onToggleZenMode,
  isZenMode = false,
  africaMode,
}) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "context" | "recents" | "navigation" | "actions">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommandIds, setRecentCommandIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_COMMANDS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 5);
      }
    } catch (e) {}
    return ["nav-question", "act-telemetry", "nav-mission-control", "act-scratchpad"];
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const registerCommandExecution = (id: string, execute: () => void) => {
    try {
      setRecentCommandIds((prev) => {
        const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 6);
        localStorage.setItem(RECENT_COMMANDS_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {}
    execute();
  };

  const commandItems: CommandItem[] = useMemo(() => [
    // Spaces Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Overview & Mission Canvas",
      subtitle: "System overview, active missions, and 10 intelligence modules",
      icon: Globe,
      hotkey: "1",
      action: () => {
        onNavigate("home");
        onClose();
      },
    },
    {
      id: "nav-question",
      category: "Navigation",
      title: "Question Engine",
      subtitle: "Socratic assumption unmasker & epistemic deepener",
      icon: HelpCircle,
      hotkey: "2",
      action: () => {
        onNavigate("question-engine");
        onClose();
      },
    },
    {
      id: "nav-observatory",
      category: "Navigation",
      title: "Observatory",
      subtitle: "Ground truth reality telemetry & multispectral sensor feeds",
      icon: Activity,
      hotkey: "3",
      action: () => {
        onNavigate("observatory");
        onClose();
      },
    },
    {
      id: "nav-world-model",
      category: "Navigation",
      title: "World Model & Epistemic Graph",
      subtitle: "First-principles knowledge nodes & verified empirical proofs",
      icon: GitFork,
      hotkey: "4",
      action: () => {
        onNavigate("world-model");
        onClose();
      },
    },
    {
      id: "nav-systems",
      category: "Navigation",
      title: "Systems Modeling & Causal Loops",
      subtitle: "Stock/flow mechanics, feedback loops & Meadows leverage points",
      icon: Layers,
      hotkey: "5",
      action: () => {
        onNavigate("systems-modeling");
        onClose();
      },
    },
    {
      id: "nav-possibility",
      category: "Navigation",
      title: "Possibility Space Engine",
      subtitle: "5-Horizon structured imagination matrix & 14-point dossiers",
      icon: Sparkles,
      hotkey: "6",
      action: () => {
        onNavigate("possibility-space");
        onClose();
      },
    },
    {
      id: "nav-studio",
      category: "Navigation",
      title: "Atlas Innovation Studio",
      subtitle: "13-step rigorous action pipeline & smallest real experiment",
      icon: Compass,
      hotkey: "7",
      action: () => {
        onNavigate("studio");
        onClose();
      },
    },
    {
      id: "nav-mission-control",
      category: "Navigation",
      title: "Mission Control",
      subtitle: "Live field operations, milestone governance & ethical risk monitor",
      icon: ShieldCheck,
      hotkey: "8",
      action: () => {
        onNavigate("mission-control");
        onClose();
      },
    },
    {
      id: "nav-capital",
      category: "Navigation",
      title: "7-Capitals & Blended Finance",
      subtitle: "Non-extractive capital stack structuring & multi-capital balance sheet",
      icon: BarChart3,
      hotkey: "9",
      action: () => {
        onNavigate("capital-intelligence");
        onClose();
      },
    },
    {
      id: "nav-civilization",
      category: "Navigation",
      title: "Civilization Vitality Dashboard",
      subtitle: "Macro-vitality diagnostics, carrying capacity & moral intelligence",
      icon: Cpu,
      hotkey: "0",
      action: () => {
        onNavigate("civilization-dashboard");
        onClose();
      },
    },
    {
      id: "nav-scenario",
      category: "Navigation",
      title: "Scenario Simulation Engine",
      subtitle: "Counterfactual trajectory simulation & storm surge outturn levers",
      icon: Radio,
      action: () => {
        onNavigate("scenario-engine");
        onClose();
      },
    },
    {
      id: "nav-agents",
      category: "Navigation",
      title: "10 AI Agents Swarm Council",
      subtitle: "Specialized multi-agent reasoning swarm & live deliberation room",
      icon: Flame,
      action: () => {
        onNavigate("agents");
        onClose();
      },
    },
    {
      id: "nav-patterns",
      category: "Navigation",
      title: "Regenerative Pattern Library",
      subtitle: "Reproducible civilizational design patterns & field replication recipes",
      icon: BookOpen,
      action: () => {
        onNavigate("patterns-memory");
        onClose();
      },
    },
    {
      id: "nav-api",
      category: "Navigation",
      title: "Developer SDK & API Console",
      subtitle: "Programmatic REST endpoints, TypeScript client & schema tests",
      icon: Terminal,
      action: () => {
        onNavigate("sdk-api");
        onClose();
      },
    },

    // Context-Aware Actions (Tailored by currentSpace)
    {
      id: "ctx-home-executive",
      category: "Context Action",
      spaceContext: "home",
      title: "Synthesize Executive Daily Directives",
      subtitle: "Review system heartbeat, high-leverage priorities, and sovereign telemetry",
      icon: Activity,
      action: () => {
        onNavigate("home");
        onOpenDailyBrief();
        onClose();
      },
    },
    {
      id: "ctx-home-pillars",
      category: "Context Action",
      spaceContext: "home",
      title: "Explore 20 Canon Greatness Pillars",
      subtitle: "Audit underlying philosophical principles and core civilizational frameworks",
      icon: BookOpen,
      action: () => {
        onOpenCanon();
        onClose();
      },
    },
    {
      id: "ctx-mission-milestone",
      category: "Context Action",
      spaceContext: "mission-control",
      title: "Inspect Field Deployment Milestones",
      subtitle: "Toggle operational tasks and audit lead guild accountability",
      icon: ShieldCheck,
      action: () => {
        onNavigate("mission-control");
        onClose();
      },
    },
    {
      id: "ctx-mission-guilds",
      category: "Context Action",
      spaceContext: "mission-control",
      title: "Audit 5 Operational Guilds Capacity",
      subtitle: "Verify guild velocity across Bio-Drainage, Agroforestry, Energy & Governance",
      icon: Layers,
      action: () => {
        onNavigate("mission-control");
        onClose();
      },
    },
    {
      id: "ctx-capital-structurer",
      category: "Context Action",
      spaceContext: "capital-intelligence",
      title: "Calibrate $250k Blended Finance Stack",
      subtitle: "Adjust first-loss grant, patient debt, and community equity sliders",
      icon: DollarSign,
      action: () => {
        onNavigate("capital-intelligence");
        onClose();
      },
    },
    {
      id: "ctx-capital-7capitals",
      category: "Context Action",
      spaceContext: "capital-intelligence",
      title: "Audit 7-Capitals Regenerative Balance",
      subtitle: "Inspect Living, Social, Intellectual, and Cultural capital reserves",
      icon: TrendingUp,
      action: () => {
        onNavigate("capital-intelligence");
        onClose();
      },
    },
    {
      id: "ctx-civilization-moral",
      category: "Context Action",
      spaceContext: "civilization-dashboard",
      title: "Run Moral Intelligence Civilizational Audit",
      subtitle: "Verify non-violence, planetary boundaries, and intergenerational justice",
      icon: Cpu,
      action: () => {
        onNavigate("civilization-dashboard");
        onClose();
      },
    },
    {
      id: "ctx-civilization-vitality",
      category: "Context Action",
      spaceContext: "civilization-dashboard",
      title: "Evaluate Planetary Boundary Thresholds",
      subtitle: "Inspect carbon, phosphorus, freshwater, and biocapacity metrics",
      icon: Activity,
      action: () => {
        onNavigate("civilization-dashboard");
        onClose();
      },
    },
    {
      id: "ctx-scenario-stress",
      category: "Context Action",
      spaceContext: "scenario-engine",
      title: "Simulate 10x Scale vs. Failure Trajectory",
      subtitle: "Run counterfactual monte-carlo simulation under 45mm/hr surge flood",
      icon: Radio,
      action: () => {
        onNavigate("scenario-engine");
        onClose();
      },
    },
    {
      id: "ctx-scenario-interventions",
      category: "Context Action",
      spaceContext: "scenario-engine",
      title: "Test Policy & Infrastructure Interventions",
      subtitle: "Stress test cascading shockwaves across 10-year horizon projections",
      icon: Sliders,
      action: () => {
        onNavigate("scenario-engine");
        onClose();
      },
    },
    {
      id: "ctx-agent-debate",
      category: "Context Action",
      spaceContext: "agents",
      title: "Convene 10-Agent Autonomous Deliberation",
      subtitle: "Prompt real-time multi-agent council on sovereign systems trade-offs",
      icon: Flame,
      action: () => {
        onNavigate("agents");
        onClose();
      },
    },
    {
      id: "ctx-pattern-replicate",
      category: "Context Action",
      spaceContext: "patterns-memory",
      title: "Filter High-Reproducibility Patterns (>85%)",
      subtitle: "Browse proven civilizational designs tested across Kenya & the Global South",
      icon: BookOpen,
      action: () => {
        onNavigate("patterns-memory");
        onClose();
      },
    },
    {
      id: "ctx-question-unmask",
      category: "Context Action",
      spaceContext: "question-engine",
      title: "Unmask Hidden Epistemic Assumptions",
      subtitle: "Deconstruct surface dogma into falsifiable thermodynamic sub-questions",
      icon: HelpCircle,
      action: () => {
        onNavigate("question-engine");
        onClose();
      },
    },
    {
      id: "ctx-question-search",
      category: "Context Action",
      spaceContext: "question-engine",
      title: "Execute Google Grounded Evidence Retrieval",
      subtitle: "Verify AI-synthesized responses with empirical search citations",
      icon: Globe,
      action: () => {
        onNavigate("question-engine");
        onClose();
      },
    },
    {
      id: "ctx-systems-loop",
      category: "Context Action",
      spaceContext: "systems-modeling",
      title: "Inspect Meadows Leverage Point #4 (Self-Organization)",
      subtitle: "Evaluate runaway feedback loops in urban watershed drainage",
      icon: Layers,
      action: () => {
        onNavigate("systems-modeling");
        onClose();
      },
    },
    {
      id: "ctx-systems-sunburst",
      category: "Context Action",
      spaceContext: "systems-modeling",
      title: "Visualize D3 Hierarchical Systems Sunburst",
      subtitle: "Interact with multi-layered systems dependencies & causal node diagrams",
      icon: Sparkles,
      action: () => {
        onNavigate("systems-modeling");
        onClose();
      },
    },
    {
      id: "ctx-observatory-telemetry",
      category: "Context Action",
      spaceContext: "observatory",
      title: "Stream Ground Truth Sensor Feeds",
      subtitle: "Audit Nairobi River moisture, canopy cover, and urban heat sensors",
      icon: Activity,
      action: () => {
        onNavigate("observatory");
        onClose();
      },
    },
    {
      id: "ctx-world-model-layers",
      category: "Context Action",
      spaceContext: "world-model",
      title: "Toggle 6-Layer Planetary GIS Stack",
      subtitle: "Inspect Hydrology, Soil Biology, Energy Microgrids & Biosphere layers",
      icon: Globe,
      action: () => {
        onNavigate("world-model");
        onClose();
      },
    },
    {
      id: "ctx-possibility-explore",
      category: "Context Action",
      spaceContext: "possibility-space",
      title: "Traverse Multidimensional Horizon Radar",
      subtitle: "Map 32 radical socio-ecological innovations against feasibility",
      icon: Sparkles,
      action: () => {
        onNavigate("possibility-space");
        onClose();
      },
    },
    {
      id: "ctx-studio-experiment",
      category: "Context Action",
      spaceContext: "studio",
      title: "Compile Living Lab Experiment Blueprint",
      subtitle: "Generate field prototyping protocol with falsification metrics",
      icon: Compass,
      action: () => {
        onNavigate("studio");
        onClose();
      },
    },
    {
      id: "ctx-sdk-test",
      category: "Context Action",
      spaceContext: "sdk-api",
      title: "Execute Live REST API Endpoint Tests",
      subtitle: "Send authenticated requests to /api/sovereign-inquiry and inspect JSON payload",
      icon: Terminal,
      action: () => {
        onNavigate("sdk-api");
        onClose();
      },
    },

    // System Actions
    {
      id: "act-zen-mode",
      category: "Action",
      title: `Toggle Contemplative Zen Mode (${isZenMode ? "Active" : "Standard"})`,
      subtitle: "Strip all borders, metrics, and distractions for pure contemplative inquiry",
      icon: Sun,
      hotkey: "Z",
      action: () => {
        onToggleZenMode?.();
        onClose();
      },
    },
    {
      id: "act-telemetry",
      category: "Action",
      title: "Toggle System Telemetry Terminal",
      subtitle: "Open live real-time inference log stream & subsystem monitor",
      icon: Terminal,
      hotkey: "T",
      action: () => {
        onToggleTelemetry();
        onClose();
      },
    },
    {
      id: "act-canon",
      category: "Action",
      title: "Open Canon of Greatness",
      subtitle: "The 20 sovereign philosophical and design pillars of Atlas Sanctum",
      icon: BookOpen,
      hotkey: "C",
      action: () => {
        onOpenCanon();
        onClose();
      },
    },
    {
      id: "act-daily-brief",
      category: "Action",
      title: "Open Daily Executive Brief",
      subtitle: "Synchronized reality briefing and high-leverage field directives",
      icon: Activity,
      hotkey: "B",
      action: () => {
        onOpenDailyBrief();
        onClose();
      },
    },
    {
      id: "act-toggle-africa",
      category: "Action",
      title: `Toggle Africa / Kenya Focus Lens (Currently ${africaMode ? "ON" : "OFF"})`,
      subtitle: "Switch specialized intelligence context for East Africa / Nairobi",
      icon: Compass,
      hotkey: "A",
      action: () => {
        onToggleAfricaMode();
        onClose();
      },
    },
    {
      id: "act-deep-focus",
      category: "Action",
      title: "Toggle Deep Focus Mode",
      subtitle: "Hide system shell, navigation & footer for distraction-free inquiry",
      icon: Maximize,
      hotkey: "F",
      action: () => {
        onToggleDeepFocus?.();
        onClose();
      },
    },
    {
      id: "act-soundscape",
      category: "Action",
      title: "Toggle Ambient Generative Soundscape",
      subtitle: "Open audio synthesis modal to select meditative ambient themes",
      icon: Waves,
      hotkey: "M",
      action: () => {
        onOpenSoundscape?.();
        onClose();
      },
    },
    {
      id: "act-scratchpad",
      category: "Action",
      title: "Open Ephemeral Ideation Scratchpad",
      subtitle: "Rapid scratchpad for notes, hypotheses, and instant inquiry transfer",
      icon: FileText,
      hotkey: "N",
      action: () => {
        onOpenScratchpad?.();
        onClose();
      },
    },
    {
      id: "act-shortcuts",
      category: "Action",
      title: "View Keyboard Shortcuts & Cheatsheet",
      subtitle: "Inspect all OS hotkeys and rapid keystroke workflows",
      icon: HelpCircle,
      hotkey: "?",
      action: () => {
        onOpenShortcuts();
        onClose();
      },
    },
  ], [
    onNavigate,
    onClose,
    onToggleTelemetry,
    onOpenCanon,
    onOpenDailyBrief,
    onToggleAfricaMode,
    onToggleDeepFocus,
    onToggleZenMode,
    isZenMode,
    onOpenSoundscape,
    onOpenScratchpad,
    onOpenShortcuts,
    africaMode
  ]);

  // Context-aware suggestions prioritized for currentSpace
  const contextSuggestions = useMemo(() => {
    return commandItems.filter(
      (item) => item.spaceContext === currentSpace || (item.id === `nav-${currentSpace}`)
    );
  }, [commandItems, currentSpace]);

  // Recent commands list
  const recentCommands = useMemo(() => {
    return recentCommandIds
      .map((id) => commandItems.find((item) => item.id === id))
      .filter((item): item is CommandItem => Boolean(item));
  }, [recentCommandIds, commandItems]);

  // Filtered items based on query and activeFilter
  const filteredItems = useMemo(() => {
    let pool = commandItems;

    if (activeFilter === "context") {
      pool = contextSuggestions;
    } else if (activeFilter === "recents") {
      pool = recentCommands;
    } else if (activeFilter === "navigation") {
      pool = commandItems.filter((i) => i.category === "Navigation");
    } else if (activeFilter === "actions") {
      pool = commandItems.filter((i) => i.category === "Action" || i.category === "Context Action");
    }

    const q = query.toLowerCase().trim();
    if (!q) {
      if (activeFilter === "all") {
        // Prioritized default view: Context-aware first, then recent items, then remaining
        const prioritized = [
          ...contextSuggestions,
          ...recentCommands.filter((r) => !contextSuggestions.some((c) => c.id === r.id)),
          ...commandItems.filter(
            (i) =>
              !contextSuggestions.some((c) => c.id === i.id) &&
              !recentCommands.some((r) => r.id === i.id)
          ),
        ];
        return prioritized;
      }
      return pool;
    }

    return pool.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        (item.spaceContext && item.spaceContext.toLowerCase().includes(q)) ||
        (item.hotkey && item.hotkey.toLowerCase() === q)
      );
    });
  }, [query, activeFilter, commandItems, contextSuggestions, recentCommands]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveFilter("all");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  // Handle keyboard arrow navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        registerCommandExecution(filteredItems[selectedIndex].id, filteredItems[selectedIndex].action);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Box */}
      <div
        className="w-full max-w-2xl bg-[#0c0c0c] border border-[#c5a059]/40 shadow-2xl overflow-hidden flex flex-col max-h-[82vh] text-[#f2f2f2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-[#080808]">
          <Search className="w-5 h-5 text-[#c5a059] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type a command, space, or action (Active Space: ${currentSpace.toUpperCase()})...`}
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/30 font-sans tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-white/40 hover:text-white text-xs font-mono"
            >
              Clear
            </button>
          )}
          <kbd className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-white/40">
            ESC
          </kbd>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-4 py-2 bg-[#0a0a0a] border-b border-white/5 flex items-center space-x-2 overflow-x-auto text-[10px] font-mono">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 border transition-all shrink-0 ${
              activeFilter === "all"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-white/50 hover:text-white border-white/10"
            }`}
          >
            All Commands
          </button>
          <button
            onClick={() => setActiveFilter("context")}
            className={`px-2.5 py-1 border transition-all shrink-0 flex items-center space-x-1 ${
              activeFilter === "context"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-[#c5a059] hover:text-white border-[#c5a059]/30"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>{currentSpace.toUpperCase()} Context ({contextSuggestions.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter("recents")}
            className={`px-2.5 py-1 border transition-all shrink-0 flex items-center space-x-1 ${
              activeFilter === "recents"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-white/50 hover:text-white border-white/10"
            }`}
          >
            <History className="w-3 h-3 text-[#c5a059]" />
            <span>Recents ({recentCommands.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter("navigation")}
            className={`px-2.5 py-1 border transition-all shrink-0 ${
              activeFilter === "navigation"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-white/50 hover:text-white border-white/10"
            }`}
          >
            Spaces
          </button>
          <button
            onClick={() => setActiveFilter("actions")}
            className={`px-2.5 py-1 border transition-all shrink-0 ${
              activeFilter === "actions"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-white/50 hover:text-white border-white/10"
            }`}
          >
            Actions & Tools
          </button>
        </div>

        {/* Top Header: Recent Commands Quick-Bar */}
        {!query && activeFilter === "all" && recentCommands.length > 0 && (
          <div className="px-4 py-2 bg-[#090909] border-b border-white/5 flex items-center space-x-2 overflow-x-auto text-[10px] font-mono">
            <div className="flex items-center space-x-1 text-white/40 shrink-0">
              <History className="w-3 h-3 text-[#c5a059]" />
              <span className="uppercase tracking-wider">FREQUENT:</span>
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {recentCommands.slice(0, 4).map((rc) => {
                const Icon = rc.icon;
                return (
                  <button
                    key={`recent-${rc.id}`}
                    onClick={() => registerCommandExecution(rc.id, rc.action)}
                    className="px-2.5 py-1 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 hover:border-[#c5a059]/50 text-white/70 hover:text-white transition-all flex items-center space-x-1.5 shrink-0"
                    title={rc.subtitle || rc.title}
                  >
                    <Icon className="w-2.5 h-2.5 text-[#c5a059]" />
                    <span className="truncate max-w-[130px] font-sans">{rc.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-xs font-sans">
              No matching commands or navigation destinations for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              const isContextMatch = item.spaceContext === currentSpace;

              return (
                <div
                  key={item.id}
                  onClick={() => registerCommandExecution(item.id, item.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xs cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-[#161616] border border-[#c5a059]/60 text-white shadow-sm"
                      : isContextMatch && !query
                      ? "bg-[#0f0d08] border border-[#c5a059]/20 text-white/90"
                      : "hover:bg-[#111111] border border-transparent text-white/70"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div
                      className={`p-2 rounded-xs border shrink-0 ${
                        isSelected
                          ? "bg-[#c5a059] text-[#080808] border-[#c5a059]"
                          : isContextMatch
                          ? "bg-[#181308] text-[#c5a059] border-[#c5a059]/40"
                          : "bg-[#080808] text-[#c5a059] border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-sm font-normal text-white">
                          {item.title}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 border ${
                            isContextMatch
                              ? "bg-[#1f190a] text-[#c5a059] border-[#c5a059]/40 font-semibold"
                              : "bg-[#080808] text-white/40 border-white/5"
                          }`}
                        >
                          {isContextMatch && !query ? `SUGGESTION FOR ${currentSpace.toUpperCase()}` : item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-white/40 truncate font-sans">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {item.hotkey && (
                      <kbd
                        className={`text-[9px] font-mono px-1.5 py-0.5 border ${
                          isSelected
                            ? "bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/40"
                            : "bg-[#080808] text-white/40 border-white/10"
                        }`}
                      >
                        {item.hotkey}
                      </kbd>
                    )}
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#c5a059]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Minimal Footer */}
        <div className="p-3 bg-[#080808] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/40">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Dismiss</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#c5a059]">Active Space: {currentSpace.toUpperCase()}</span>
            <span>·</span>
            <span>Atlas Sovereign Command Bar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

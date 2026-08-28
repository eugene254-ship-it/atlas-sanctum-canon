import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { NavigationSpace, SystemEventNotification, UserMacro, EventSeverity } from "../types";
import { soundscape } from "../services/soundscape";

interface SystemContextType {
  // Navigation & Space
  currentSpace: NavigationSpace;
  setCurrentSpace: (space: NavigationSpace) => void;
  navigateTo: (space: NavigationSpace) => void;

  // Modals & Panels State
  isDailyBriefOpen: boolean;
  setIsDailyBriefOpen: (open: boolean) => void;
  isCanonOpen: boolean;
  setIsCanonOpen: (open: boolean) => void;
  isTelemetryOpen: boolean;
  setIsTelemetryOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  isSoundscapeOpen: boolean;
  setIsSoundscapeOpen: (open: boolean) => void;
  isScratchpadOpen: boolean;
  setIsScratchpadOpen: (open: boolean) => void;

  // System Modes
  isDeepFocus: boolean;
  setIsDeepFocus: (focus: boolean | ((prev: boolean) => boolean)) => void;
  isZenMode: boolean;
  setIsZenMode: (zen: boolean | ((prev: boolean) => boolean)) => void;
  africaMode: boolean;
  setAfricaMode: (africa: boolean | ((prev: boolean) => boolean)) => void;

  // Epistemic Context
  activeQuestionId?: string;
  setActiveQuestionId: (id?: string) => void;

  // Event Log Subsystem
  events: SystemEventNotification[];
  addEvent: (event: Omit<SystemEventNotification, "id" | "timestamp">) => void;
  resolveEvent: (id: string) => void;
  clearEvents: () => void;
  simulateSampleEvent: (severity?: EventSeverity) => void;

  // User Macros
  macros: UserMacro[];
  executeMacro: (macroId: string) => void;
  macroExecutionStatus: string | null;
}

const INITIAL_EVENTS: SystemEventNotification[] = [
  {
    id: "evt-01",
    timestamp: "23:40:12 UTC",
    severity: "INFO",
    subsystem: "SYSTEM-CORE",
    title: "Sovereign Intelligence Kernel Initialized",
    message: "14 navigation spaces verified. Soundscape engine & D3 systems telemetry nominal.",
    actionTargetSpace: "home",
    actionLabel: "Inspect Overview",
    resolved: true,
  },
  {
    id: "evt-02",
    timestamp: "23:41:05 UTC",
    severity: "INFO",
    subsystem: "PARTNERSHIPS",
    title: "Major Partnership Blueprint Loaded",
    message: "10 strategic relationship targets indexed across AI, Multilateral Finance, and Foundations.",
    actionTargetSpace: "partnerships",
    actionLabel: "Open Sanctum",
    resolved: false,
  },
  {
    id: "evt-03",
    timestamp: "23:41:48 UTC",
    severity: "WARN",
    subsystem: "OBSERVATORY",
    title: "Hydrological Runoff Alert: Nairobi Basin",
    message: "Moisture saturation reached 86% in Sector 4. Recommending bioswale retention intervention.",
    actionTargetSpace: "observatory",
    actionLabel: "View Telemetry",
    resolved: false,
  },
  {
    id: "evt-04",
    timestamp: "23:42:30 UTC",
    severity: "CRITICAL",
    subsystem: "CIVILIZATION-MATRIX",
    title: "Phosphorus Biogeochemical Flow Threshold",
    message: "Planetary boundary model detects 1.4x safe boundary in Great Lakes watershed.",
    actionTargetSpace: "civilization-dashboard",
    actionLabel: "Audit Boundaries",
    resolved: false,
  },
  {
    id: "evt-05",
    timestamp: "23:43:10 UTC",
    severity: "SUCCESS",
    subsystem: "CAPITAL-INTEL",
    title: "Blended Green Bond Facility Ratified",
    message: "AfDB & World Bank concessional facility tranche allocated for Rift Valley agroforestry.",
    actionTargetSpace: "capital-intelligence",
    actionLabel: "Inspect 7-Capitals",
    resolved: false,
  },
];

const DEFAULT_MACROS: UserMacro[] = [
  {
    id: "macro-morning-routine",
    title: "Launch Morning Routine",
    description: "Opens the Daily Executive Brief, activates Ambient Generative Soundscape, and navigates to Overview.",
    category: "Workflow",
    hotkey: "M1",
    steps: [
      "Navigate to Overview Space",
      "Start Ambient Generative Soundscape (Dawn Chorus)",
      "Open Executive Daily Briefing Dossier",
    ],
  },
  {
    id: "macro-deep-work",
    title: "Deep Work Sanctuary Protocol",
    description: "Enables Deep Focus mode, mutes non-essential notifications, starts Focus Soundscape, and opens Atlas Studio.",
    category: "Focus",
    hotkey: "M2",
    steps: [
      "Engage Deep Focus Canvas Mode",
      "Switch Soundscape to Deep Focus Alpha Waves",
      "Open Atlas Studio Innovation Workspace",
    ],
  },
  {
    id: "macro-partnerships-brief",
    title: "Major Partnerships & Sovereign Capital Sweep",
    description: "Opens Major Partnerships Sanctum and cross-references AfDB/World Bank 7-Capitals facilities.",
    category: "Intelligence",
    hotkey: "M3",
    steps: [
      "Navigate to Atlas Sanctum Major Partnerships",
      "Stream 10 Frontier AI & Multilateral Relationship Targets",
      "Log Partnership Strategic Alignment Event",
    ],
  },
  {
    id: "macro-planetary-audit",
    title: "Planetary Boundaries & Systems Audit",
    description: "Switches to Africa Matrix, triggers D3 Systems Sunburst visualization, and opens Live Telemetry terminal.",
    category: "Diagnostics",
    hotkey: "M4",
    steps: [
      "Engage Africa Matrix Mode",
      "Navigate to Systems Modeling (D3 Sunburst)",
      "Deploy System Telemetry Terminal Stream",
    ],
  },
  {
    id: "macro-agent-swarm",
    title: "Autonomous 10-Agent Swarm Deliberation",
    description: "Navigates to AI Agent Swarm and triggers collaborative multi-agent reasoning epoch on water sovereignty.",
    category: "Intelligence",
    hotkey: "M5",
    steps: [
      "Navigate to AI Agent Swarm Network",
      "Broadcast Socratic Deconstruction Prompt",
      "Sync Agent Reasoning to Memory Commons",
    ],
  },
];

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSpace, setCurrentSpaceState] = useState<NavigationSpace>("home");
  const [isDailyBriefOpen, setIsDailyBriefOpen] = useState(false);
  const [isCanonOpen, setIsCanonOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isSoundscapeOpen, setIsSoundscapeOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isDeepFocus, setIsDeepFocus] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [africaMode, setAfricaMode] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState<string | undefined>(undefined);

  const [events, setEvents] = useState<SystemEventNotification[]>(INITIAL_EVENTS);
  const [macros] = useState<UserMacro[]>(DEFAULT_MACROS);
  const [macroExecutionStatus, setMacroExecutionStatus] = useState<string | null>(null);

  const setCurrentSpace = useCallback((space: NavigationSpace) => {
    setCurrentSpaceState(space);
  }, []);

  const navigateTo = useCallback((space: NavigationSpace) => {
    setCurrentSpaceState(space);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addEvent = useCallback((eventData: Omit<SystemEventNotification, "id" | "timestamp">) => {
    const now = new Date();
    const timeStr = `${now.getUTCHours().toString().padStart(2, "0")}:${now.getUTCMinutes().toString().padStart(2, "0")}:${now.getUTCSeconds().toString().padStart(2, "0")} UTC`;
    const newEvent: SystemEventNotification = {
      ...eventData,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      resolved: false,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 49)]); // keep last 50
  }, []);

  const resolveEvent = useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, resolved: true } : e))
    );
  }, []);

  const clearEvents = useCallback(() => {
    setEvents((prev) => prev.filter((e) => !e.resolved));
  }, []);

  const simulateSampleEvent = useCallback((forceSeverity?: EventSeverity) => {
    const severities: EventSeverity[] = ["INFO", "WARN", "CRITICAL", "SUCCESS"];
    const chosenSev = forceSeverity || severities[Math.floor(Math.random() * severities.length)];

    const samples: Record<EventSeverity, { subsystem: string; title: string; message: string; space: NavigationSpace }> = {
      INFO: {
        subsystem: "AI-AGENTS",
        title: "Agent Swarm Consensus Synchronized",
        message: "Epistemic verification loop completed with 99.4% coherence across 10 specialized agent personas.",
        space: "agents",
      },
      WARN: {
        subsystem: "WORLD-MODEL",
        title: "Soil Moisture Drawdown Detected",
        message: "Sensor cluster #14 indicates 12% drop in Rift Valley micro-catchment sponge porosity.",
        space: "world-model",
      },
      CRITICAL: {
        subsystem: "SCENARIO-STRESS",
        title: "Extreme Climate Cascade Triggered",
        message: "Simulated 500-year storm flood surge exceeds baseline culvert threshold by 240%.",
        space: "scenario-engine",
      },
      SUCCESS: {
        subsystem: "STUDIO-LAB",
        title: "Living Lab Experiment Falsification Verified",
        message: "Experimental bioswale skid reduced peak stormwater runoff velocity by 68% in 48-hour field trial.",
        space: "studio",
      },
    };

    const s = samples[chosenSev];
    addEvent({
      severity: chosenSev,
      subsystem: s.subsystem,
      title: s.title,
      message: s.message,
      actionTargetSpace: s.space,
      actionLabel: `Inspect ${s.subsystem}`,
    });
  }, [addEvent]);

  const executeMacro = useCallback((macroId: string) => {
    const macro = macros.find((m) => m.id === macroId);
    if (!macro) return;

    setMacroExecutionStatus(`Executing Macro: "${macro.title}"...`);

    if (macroId === "macro-morning-routine") {
      navigateTo("home");
      soundscape.play();
      setIsDailyBriefOpen(true);
      addEvent({
        severity: "INFO",
        subsystem: "USER-MACRO",
        title: "Morning Routine Macro Executed",
        message: "Overview engaged, ambient soundscape active, and daily executive brief rendered.",
        actionTargetSpace: "home",
      });
    } else if (macroId === "macro-deep-work") {
      setIsDeepFocus(true);
      soundscape.play();
      navigateTo("studio");
      addEvent({
        severity: "INFO",
        subsystem: "USER-MACRO",
        title: "Deep Work Sanctuary Engaged",
        message: "Distraction-free canvas active. Atlas Studio ready for first-principles innovation.",
        actionTargetSpace: "studio",
      });
    } else if (macroId === "macro-partnerships-brief") {
      navigateTo("partnerships");
      addEvent({
        severity: "SUCCESS",
        subsystem: "USER-MACRO",
        title: "Partnership Sanctum Activated",
        message: "Loaded 10 major relationship targets for planetary regenerative infrastructure.",
        actionTargetSpace: "partnerships",
      });
    } else if (macroId === "macro-planetary-audit") {
      setAfricaMode(true);
      navigateTo("systems-modeling");
      setIsTelemetryOpen(true);
      addEvent({
        severity: "WARN",
        subsystem: "USER-MACRO",
        title: "Planetary Systems Audit Triggered",
        message: "Africa mode enabled. Systems sunburst and real-time telemetry terminal online.",
        actionTargetSpace: "systems-modeling",
      });
    } else if (macroId === "macro-agent-swarm") {
      navigateTo("agents");
      addEvent({
        severity: "INFO",
        subsystem: "USER-MACRO",
        title: "Agent Swarm Deliberation Initiated",
        message: "Autonomous agents coordinated for cross-disciplinary systems evaluation.",
        actionTargetSpace: "agents",
      });
    }

    setTimeout(() => {
      setMacroExecutionStatus(null);
    }, 3500);
  }, [macros, navigateTo, addEvent]);

  // Periodic subtle background event generator to simulate living OS activity
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance every 45s to inject realistic event notification
      if (Math.random() < 0.35) {
        simulateSampleEvent();
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [simulateSampleEvent]);

  return (
    <SystemContext.Provider
      value={{
        currentSpace,
        setCurrentSpace,
        navigateTo,
        isDailyBriefOpen,
        setIsDailyBriefOpen,
        isCanonOpen,
        setIsCanonOpen,
        isTelemetryOpen,
        setIsTelemetryOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        isSoundscapeOpen,
        setIsSoundscapeOpen,
        isScratchpadOpen,
        setIsScratchpadOpen,
        isDeepFocus,
        setIsDeepFocus,
        isZenMode,
        setIsZenMode,
        africaMode,
        setAfricaMode,
        activeQuestionId,
        setActiveQuestionId,
        events,
        addEvent,
        resolveEvent,
        clearEvents,
        simulateSampleEvent,
        macros,
        executeMacro,
        macroExecutionStatus,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystemState = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystemState must be used within a SystemProvider");
  }
  return context;
};

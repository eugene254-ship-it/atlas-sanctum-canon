import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavigationSpace } from "./types";
import { SystemProvider, useSystemState } from "./context/SystemContext";
import { Navigation } from "./components/Navigation";
import { DailyBriefModal } from "./components/DailyBriefModal";
import { CanonDrawer } from "./components/CanonDrawer";
import { SystemTelemetry } from "./components/SystemTelemetry";
import { CommandPalette } from "./components/CommandPalette";
import { KeyboardShortcutsModal } from "./components/KeyboardShortcutsModal";
import { SystemFooter } from "./components/SystemFooter";
import { SoundscapeModal } from "./components/SoundscapeModal";
import { ScratchpadDrawer } from "./components/ScratchpadDrawer";
import { Minimize, Sun, Zap, CheckCircle2 } from "lucide-react";

import { HomeScreen } from "./components/views/HomeScreen";
import { QuestionEngineView } from "./components/views/QuestionEngineView";
import { ObservatoryView } from "./components/views/ObservatoryView";
import { WorldModelView } from "./components/views/WorldModelView";
import { SystemsModelingView } from "./components/views/SystemsModelingView";
import { PossibilitySpaceView } from "./components/views/PossibilitySpaceView";
import { AtlasStudioView } from "./components/views/AtlasStudioView";
import { MissionControlView } from "./components/views/MissionControlView";
import { CapitalIntelligenceView } from "./components/views/CapitalIntelligenceView";
import { CivilizationDashboardView } from "./components/views/CivilizationDashboardView";
import { ScenarioEngineView } from "./components/views/ScenarioEngineView";
import { AgentNetworkView } from "./components/views/AgentNetworkView";
import { MemoryPatternView } from "./components/views/MemoryPatternView";
import { ApiExplorerView } from "./components/views/ApiExplorerView";
import { PartnershipSanctumView } from "./components/views/PartnershipSanctumView";

function AppInner() {
  const {
    currentSpace,
    setCurrentSpace,
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
    macroExecutionStatus,
    executeMacro
  } = useSystemState();

  const handleLaunchQuestion = (questionTitle: string) => {
    setActiveQuestionId(undefined);
    setCurrentSpace("question-engine");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Global Keyboard Shortcuts (Ctrl+K, ?, T, C, B, A, F, Z, M, N, P, 1-9, 0, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputActive =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Ctrl+K or Cmd+K (Always active, even in input)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
        return;
      }

      // Escape key closes modals / exits Deep Focus / Zen Mode
      if (e.key === "Escape") {
        if (
          isCommandPaletteOpen ||
          isShortcutsOpen ||
          isDailyBriefOpen ||
          isCanonOpen ||
          isTelemetryOpen ||
          isSoundscapeOpen ||
          isScratchpadOpen
        ) {
          setIsCommandPaletteOpen(false);
          setIsShortcutsOpen(false);
          setIsDailyBriefOpen(false);
          setIsCanonOpen(false);
          setIsTelemetryOpen(false);
          setIsSoundscapeOpen(false);
          setIsScratchpadOpen(false);
          return;
        }
        if (isDeepFocus) {
          setIsDeepFocus(false);
          return;
        }
        if (isZenMode) {
          setIsZenMode(false);
          return;
        }
      }

      // If typing in an input field, do not trigger single-key hotkeys
      if (isInputActive) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsShortcutsOpen(!isShortcutsOpen);
      } else if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        setIsZenMode(!isZenMode);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsDeepFocus(!isDeepFocus);
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsSoundscapeOpen(!isSoundscapeOpen);
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        setIsScratchpadOpen(!isScratchpadOpen);
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setIsTelemetryOpen(!isTelemetryOpen);
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        setIsCanonOpen(!isCanonOpen);
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsDailyBriefOpen(!isDailyBriefOpen);
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        setAfricaMode(!africaMode);
      } else if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        setCurrentSpace("partnerships");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "1") {
        e.preventDefault();
        setCurrentSpace("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "2") {
        e.preventDefault();
        setCurrentSpace("question-engine");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "3") {
        e.preventDefault();
        setCurrentSpace("observatory");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "4") {
        e.preventDefault();
        setCurrentSpace("world-model");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "5") {
        e.preventDefault();
        setCurrentSpace("systems-modeling");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "6") {
        e.preventDefault();
        setCurrentSpace("possibility-space");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "7") {
        e.preventDefault();
        setCurrentSpace("studio");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "8") {
        e.preventDefault();
        setCurrentSpace("mission-control");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "9") {
        e.preventDefault();
        setCurrentSpace("capital-intelligence");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "0") {
        e.preventDefault();
        setCurrentSpace("civilization-dashboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isCommandPaletteOpen,
    isShortcutsOpen,
    isDailyBriefOpen,
    isCanonOpen,
    isTelemetryOpen,
    isSoundscapeOpen,
    isScratchpadOpen,
    isDeepFocus,
    isZenMode,
    africaMode,
    setCurrentSpace,
    setIsDailyBriefOpen,
    setIsCanonOpen,
    setIsTelemetryOpen,
    setIsCommandPaletteOpen,
    setIsShortcutsOpen,
    setIsSoundscapeOpen,
    setIsScratchpadOpen,
    setIsDeepFocus,
    setIsZenMode,
    setAfricaMode
  ]);

  return (
    <div
      className={`min-h-screen bg-[#080808] text-[#f2f2f2] font-sans selection:bg-[#c5a059]/30 selection:text-[#c5a059] ${
        isZenMode ? "atlas-zen-mode" : ""
      }`}
    >
      {/* Floating Macro Execution Toast Notification */}
      {macroExecutionStatus && (
        <div className="fixed bottom-14 right-6 z-50 animate-fadeIn">
          <div className="px-4 py-2.5 bg-[#0f0f0f]/95 border border-[#c5a059]/70 text-[#f2f2f2] font-mono text-xs shadow-2xl flex items-center space-x-2.5 backdrop-blur-md">
            <Zap className="w-4 h-4 text-[#c5a059] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-bold">
                User Macro Active
              </span>
              <span className="text-white/90">{macroExecutionStatus}</span>
            </div>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-2" />
          </div>
        </div>
      )}

      {/* Floating Deep Focus Exit Control */}
      {isDeepFocus && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <button
            id="btn-exit-deep-focus"
            onClick={() => setIsDeepFocus(false)}
            className="px-3 py-1.5 bg-[#0c0c0c]/90 hover:bg-[#181818] border border-[#c5a059]/50 hover:border-[#c5a059] text-white/80 hover:text-white font-mono text-[10px] uppercase tracking-wider flex items-center space-x-2 backdrop-blur-md shadow-2xl transition-all"
            title="Exit Deep Focus Mode (Press F or Esc)"
          >
            <Minimize className="w-3 h-3 text-[#c5a059]" />
            <span>EXIT DEEP FOCUS</span>
            <kbd className="px-1 py-0.5 bg-white/10 text-white/70 text-[9px]">F</kbd>
          </button>
        </div>
      )}

      {/* Floating Zen Mode Banner / Exit Control */}
      {isZenMode && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <button
            id="btn-exit-zen-mode"
            onClick={() => setIsZenMode(false)}
            className="px-4 py-1 bg-[#0c0c0c]/90 hover:bg-[#181818] border border-[#c5a059]/40 hover:border-[#c5a059] text-[#c5a059] font-mono text-[10px] uppercase tracking-wider flex items-center space-x-2 backdrop-blur-md shadow-lg transition-all"
            title="Contemplative Zen Mode active: Borders, icons, and non-essential text removed. Click or press Z/Esc to exit."
          >
            <Sun className="w-3 h-3 text-[#c5a059]" />
            <span>CONTEMPLATIVE ZEN MODE ACTIVE · CLICK OR PRESS Z TO EXIT</span>
          </button>
        </div>
      )}

      {/* Top Main Navigation Bar (Hidden in Deep Focus) */}
      {!isDeepFocus && (
        <Navigation
          currentSpace={currentSpace}
          onSelectSpace={(space) => {
            setCurrentSpace(space);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDailyBrief={() => setIsDailyBriefOpen(true)}
          onOpenCanon={() => setIsCanonOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleTelemetry={() => setIsTelemetryOpen(!isTelemetryOpen)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onToggleZenMode={() => setIsZenMode(!isZenMode)}
          isZenMode={isZenMode}
          africaMode={africaMode}
          onToggleAfricaMode={() => setAfricaMode(!africaMode)}
          isTelemetryOpen={isTelemetryOpen}
        />
      )}

      {/* Main Viewport Container with Framer Motion Route Transitions */}
      <main
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isDeepFocus ? "pt-8 pb-12" : isZenMode ? "pt-10 pb-20" : "pt-6 pb-24"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpace}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {currentSpace === "home" && (
              <HomeScreen
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onLaunchQuestion={handleLaunchQuestion}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "partnerships" && (
              <PartnershipSanctumView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "question-engine" && (
              <QuestionEngineView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                initialSelectedQuestionId={activeQuestionId}
              />
            )}

            {currentSpace === "observatory" && (
              <ObservatoryView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "world-model" && (
              <WorldModelView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "systems-modeling" && (
              <SystemsModelingView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "possibility-space" && (
              <PossibilitySpaceView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "studio" && (
              <AtlasStudioView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "mission-control" && (
              <MissionControlView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "capital-intelligence" && (
              <CapitalIntelligenceView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "civilization-dashboard" && (
              <CivilizationDashboardView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "scenario-engine" && (
              <ScenarioEngineView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "agents" && (
              <AgentNetworkView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "patterns-memory" && (
              <MemoryPatternView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}

            {currentSpace === "sdk-api" && (
              <ApiExplorerView
                onNavigate={(space) => {
                  setCurrentSpace(space);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                africaMode={africaMode}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Minimalist OS Footer (Hidden in Deep Focus) */}
      {!isDeepFocus && (
        <SystemFooter
          currentSpace={currentSpace}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleTelemetry={() => setIsTelemetryOpen(!isTelemetryOpen)}
          onOpenCanon={() => setIsCanonOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenSoundscape={() => setIsSoundscapeOpen(true)}
          onOpenScratchpad={() => setIsScratchpadOpen(true)}
          onToggleDeepFocus={() => setIsDeepFocus(!isDeepFocus)}
          onToggleZenMode={() => setIsZenMode(!isZenMode)}
          isZenMode={isZenMode}
          isTelemetryOpen={isTelemetryOpen}
          isScratchpadOpen={isScratchpadOpen}
          africaMode={africaMode}
        />
      )}

      {/* Real-time System Telemetry Terminal */}
      <SystemTelemetry
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        onNavigate={(space) => {
          setCurrentSpace(space);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        currentSpace={currentSpace}
        onNavigate={(space) => {
          setCurrentSpace(space);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenDailyBrief={() => setIsDailyBriefOpen(true)}
        onOpenCanon={() => setIsCanonOpen(true)}
        onToggleAfricaMode={() => setAfricaMode(!africaMode)}
        onToggleTelemetry={() => setIsTelemetryOpen(!isTelemetryOpen)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenSoundscape={() => setIsSoundscapeOpen(true)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        onToggleDeepFocus={() => setIsDeepFocus(!isDeepFocus)}
        onToggleZenMode={() => setIsZenMode(!isZenMode)}
        onExecuteMacro={(macroId) => executeMacro(macroId)}
        isZenMode={isZenMode}
        africaMode={africaMode}
      />

      {/* Ambient Generative Soundscape Modal */}
      <SoundscapeModal
        isOpen={isSoundscapeOpen}
        onClose={() => setIsSoundscapeOpen(false)}
      />

      {/* Ephemeral Ideation Scratchpad Drawer */}
      <ScratchpadDrawer
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        onTransferInquiry={(queryText) => {
          setCurrentSpace("question-engine");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Keyboard Shortcuts Helper Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Global Modals & Drawers */}
      <DailyBriefModal
        isOpen={isDailyBriefOpen}
        onClose={() => setIsDailyBriefOpen(false)}
        onNavigate={(space) => {
          setIsDailyBriefOpen(false);
          setCurrentSpace(space);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <CanonDrawer
        isOpen={isCanonOpen}
        onClose={() => setIsCanonOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <AppInner />
    </SystemProvider>
  );
}

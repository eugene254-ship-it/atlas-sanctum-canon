import React from "react";
import { HelpCircle, X, Keyboard, Command, Sparkles } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: "Global OS & System Controls",
      shortcuts: [
        { key: "Ctrl + K / ⌘K", desc: "Open Global Command Palette & User Macros" },
        { key: "P", desc: "Jump to ATLAS SANCTUM — Major Partnerships" },
        { key: "Z", desc: "Toggle Contemplative Zen Mode (Stripped UI)" },
        { key: "F", desc: "Toggle Deep Focus Mode (Immersive View)" },
        { key: "M", desc: "Toggle Ambient Generative Soundscape" },
        { key: "N", desc: "Toggle Ephemeral Ideation Scratchpad" },
        { key: "?", desc: "Open / Close this Keyboard Shortcuts Cheat Sheet" },
        { key: "T", desc: "Toggle Real-Time System Telemetry & Event Log" },
        { key: "C", desc: "Open Canon of Greatness (20 Civilizational Pillars)" },
        { key: "B", desc: "Open Synchronized Daily Executive Brief" },
        { key: "A", desc: "Toggle Africa / Kenya Focus Intelligence Lens" },
        { key: "Esc", desc: "Dismiss active modal, palette, or drawer" },
      ],
    },
    {
      title: "User Macros (Automated Multi-Step Routines)",
      shortcuts: [
        { key: "⌘K → Launch Morning Routine", desc: "Overview + Ambient Soundscape + Daily Executive Brief" },
        { key: "⌘K → Deep Work Sanctuary", desc: "Deep Focus + Alpha Soundscape + Atlas Studio Workspace" },
        { key: "⌘K → Major Partnerships Sweep", desc: "Partnerships Sanctum + 10 Frontier AI Targets + Concessional Finance" },
        { key: "⌘K → Planetary Systems Audit", desc: "Africa Lens + Systems Sunburst + Telemetry Stream" },
        { key: "⌘K → Autonomous Agent Swarm", desc: "AI Agent Swarm + Socratic Multi-Agent Deliberation" },
      ],
    },
    {
      title: "Direct Space Navigation Hotkeys",
      shortcuts: [
        { key: "1", desc: "Jump to Overview / Mission Canvas" },
        { key: "2", desc: "Jump to Socratic Question Engine" },
        { key: "3", desc: "Jump to Observatory & Reality Telemetry" },
        { key: "4", desc: "Jump to World Model & Epistemic Graph" },
        { key: "5", desc: "Jump to Systems Modeling & Causal Loops" },
        { key: "6", desc: "Jump to 5-Horizon Possibility Space" },
        { key: "7", desc: "Jump to Atlas Innovation Studio (13-Step Pipeline)" },
        { key: "8", desc: "Jump to Mission Control & Field Governance" },
        { key: "9", desc: "Jump to 7-Capitals & Blended Finance Engine" },
        { key: "0", desc: "Jump to Civilization Vitality Dashboard" },
      ],
    },
    {
      title: "Console & Interactive Actions",
      shortcuts: [
        { key: "Enter / ↵", desc: "Execute current inquiry / Run API endpoint" },
        { key: "↑ / ↓", desc: "Navigate options in Command Palette" },
        { key: "Click ID badge", desc: "Inspect Atlas Sanctum build ID & cryptographic provenance" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-[#f2f2f2]">
      <div
        className="w-full max-w-2xl bg-[#0c0c0c] border border-[#c5a059]/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#080808] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#141414] border border-[#c5a059]/40 text-[#c5a059]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                SOVEREIGN SYSTEM CHEATSHEET
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                Atlas OS Keyboard Shortcuts
              </h3>
            </div>
          </div>

          <button
            id="btn-close-shortcuts-modal"
            onClick={onClose}
            className="p-1.5 bg-[#141414] hover:bg-rose-950/40 border border-white/10 text-white/50 hover:text-rose-300 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] border-b border-white/10 pb-1.5 flex items-center space-x-2">
                <span>{group.title}</span>
              </h4>

              <div className="grid grid-cols-1 gap-1.5">
                {group.shortcuts.map((sc, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-[#080808] border border-white/5 hover:border-white/10 flex items-center justify-between text-xs transition-colors"
                  >
                    <span className="text-white/80 font-sans text-xs">{sc.desc}</span>
                    <kbd className="px-2 py-1 bg-[#121212] border border-[#c5a059]/40 text-[#c5a059] font-mono text-[11px] font-bold shadow-sm whitespace-nowrap">
                      {sc.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080808] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white/10 text-white">?</kbd> anywhere to toggle this helper</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-[10px] uppercase tracking-wider transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

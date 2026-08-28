import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Activity,
  Pause,
  Play,
  Trash2,
  Filter,
  Download,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowDown,
  Bell
} from "lucide-react";
import { SystemEventLog } from "./SystemEventLog";

export type TelemetryLogLevel = "INFO" | "REASONING" | "LEVERAGE" | "WARN" | "SUCCESS";
export type TelemetrySubsystem =
  | "OBSERVATORY"
  | "GEMINI-AI"
  | "CAUSAL-GRAPH"
  | "7-CAPITALS"
  | "SOCRATIC"
  | "MEADOWS-OPT"
  | "FIELD-IOT"
  | "CONSCIENCE"
  | "FINANCE-ROUTER";

export interface TelemetryLog {
  id: string;
  timestamp: string;
  subsystem: TelemetrySubsystem;
  level: TelemetryLogLevel;
  message: string;
  metadata?: Record<string, any>;
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: "log-1",
    timestamp: "23:35:12.104",
    subsystem: "OBSERVATORY",
    level: "INFO",
    message: "Ingesting multispectral sentinel radar tile for Nairobi Basin (01°17'S, 36°49'E). Storm lag time: 24m.",
  },
  {
    id: "log-2",
    timestamp: "23:35:14.340",
    subsystem: "GEMINI-AI",
    level: "REASONING",
    message: "Deconstructing chronic urban flooding into first-principles soil infiltration mechanics and pumice matrix porosity.",
  },
  {
    id: "log-3",
    timestamp: "23:35:16.890",
    subsystem: "CAUSAL-GRAPH",
    level: "LEVERAGE",
    message: "Detected reinforcing loop R1 (Runoff Trap). Target intervention at Meadows Leverage Point #4: Self-Organization.",
  },
  {
    id: "log-4",
    timestamp: "23:35:19.412",
    subsystem: "7-CAPITALS",
    level: "SUCCESS",
    message: "Multi-capital balance sheet verified: +38 Natural Capital, +42 Social Capital, +0 Extractive Leakage.",
  },
  {
    id: "log-5",
    timestamp: "23:35:22.015",
    subsystem: "CONSCIENCE",
    level: "INFO",
    message: "Moral Intelligence Filter applied: Canon Pillar #1 Anchor confirmed. Zero speculative displacement detected.",
  },
  {
    id: "log-6",
    timestamp: "23:35:25.750",
    subsystem: "FINANCE-ROUTER",
    level: "INFO",
    message: "Synthesizing blended capital stack: 25% Catalytic First-Loss Grant + 45% Patient Concessional Green Bond.",
  },
  {
    id: "log-7",
    timestamp: "23:35:28.190",
    subsystem: "SOCRATIC",
    level: "REASONING",
    message: "Unmasking premise: 'Urban drainage requires concrete channels' -> Falsified by Rift Valley volcanic bioswale telemetry.",
  },
  {
    id: "log-8",
    timestamp: "23:35:31.602",
    subsystem: "MEADOWS-OPT",
    level: "SUCCESS",
    message: "Simulated 10x trajectory: 42,000 residents protected, $14.2M flood damage averted annually across 1.8km corridor.",
  }
];

const SIMULATED_STREAM_MESSAGES: { subsystem: TelemetrySubsystem; level: TelemetryLogLevel; message: string }[] = [
  {
    subsystem: "FIELD-IOT",
    level: "INFO",
    message: "Soil moisture telemetry telemetry uplink from Node #08 (Kilimani-Kibera swale): Permeability holding at 138 mm/hr."
  },
  {
    subsystem: "GEMINI-AI",
    level: "REASONING",
    message: "Evaluating 5-Horizon Possibility Space: Transformational 10x corridor deployment rated at 0.94 epistemic confidence."
  },
  {
    subsystem: "CAUSAL-GRAPH",
    level: "LEVERAGE",
    message: "Meadows Leverage Point #3: Transcending paradigm from 'stormwater as hazard' to 'stormwater as community hydration'."
  },
  {
    subsystem: "CONSCIENCE",
    level: "SUCCESS",
    message: "Conscience audit passed: Elder council polycentric veto rights encoded in field governance milestone #03."
  },
  {
    subsystem: "7-CAPITALS",
    level: "INFO",
    message: "Human Capital lift index adjusted to +34 based on local youth maintenance guild apprenticeship quotas."
  },
  {
    subsystem: "OBSERVATORY",
    level: "INFO",
    message: "Atmospheric LiDAR scan confirms no severe convective microbursts in next 6-hour forecast window."
  },
  {
    subsystem: "FINANCE-ROUTER",
    level: "SUCCESS",
    message: "Non-extractive return cap confirmed: 4.8% patient dividend distribution with 100% community ownership transfer."
  },
  {
    subsystem: "SOCRATIC",
    level: "REASONING",
    message: "Generating smallest real-world intervention: 50m experimental bioswale skid with IoT acoustic flow sensors."
  },
  {
    subsystem: "MEADOWS-OPT",
    level: "INFO",
    message: "Sensitivity analysis: 85% community consensus mitigates illegal dumping risk by 92%."
  }
];

interface SystemTelemetryProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (space: any) => void;
}

export const SystemTelemetry: React.FC<SystemTelemetryProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<"STREAM" | "EVENT_LOG">("EVENT_LOG");
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>("ALL");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  // Periodic simulated real-time telemetry log generator
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const randomTemplate =
        SIMULATED_STREAM_MESSAGES[Math.floor(Math.random() * SIMULATED_STREAM_MESSAGES.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;

      const newLog: TelemetryLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: timeStr,
        subsystem: randomTemplate.subsystem,
        level: randomTemplate.level,
        message: randomTemplate.message,
      };

      setLogs((prev) => {
        const next = [...prev, newLog];
        // Keep max 200 logs in memory buffer
        return next.length > 200 ? next.slice(next.length - 200) : next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, autoScroll]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((l) => {
    const matchesSubsystem = selectedSubsystem === "ALL" || l.subsystem === selectedSubsystem;
    const matchesLevel = selectedLevel === "ALL" || l.level === selectedLevel;
    const matchesSearch =
      l.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subsystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.timestamp.includes(searchQuery);
    return matchesSubsystem && matchesLevel && matchesSearch;
  });

  const getLevelBadgeClass = (lvl: TelemetryLogLevel) => {
    switch (lvl) {
      case "REASONING":
        return "text-[#c5a059] bg-[#181308] border-[#c5a059]/40";
      case "LEVERAGE":
        return "text-purple-300 bg-[#160d1c] border-purple-800/60";
      case "SUCCESS":
        return "text-emerald-300 bg-[#0a1610] border-emerald-800/60";
      case "WARN":
        return "text-rose-300 bg-[#180d0d] border-rose-800/60";
      case "INFO":
      default:
        return "text-sky-300 bg-[#0b141a] border-sky-800/60";
    }
  };

  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `atlas-system-telemetry-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleInjectProbe = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    const probeLog: TelemetryLog = {
      id: `log-probe-${Date.now()}`,
      timestamp: timeStr,
      subsystem: "GEMINI-AI",
      level: "REASONING",
      message: "DIAGNOSTIC PROBE: Socratic unmasking protocol running on active inquiry pipeline. Latency 118ms · All 10 intelligences synchronized.",
    };
    setLogs((prev) => [...prev, probeLog]);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2 sm:p-4 pointer-events-none flex justify-center animate-fadeIn">
      <div
        className={`pointer-events-auto bg-[#080808] border border-[#c5a059]/40 shadow-2xl transition-all duration-300 flex flex-col ${
          isExpanded
            ? "w-full max-w-6xl h-[85vh]"
            : "w-full max-w-5xl h-[420px]"
        }`}
      >
        {/* Telemetry Header */}
        <div className="p-4 bg-[#0c0c0c] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                {isStreaming && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isStreaming ? "bg-emerald-500" : "bg-white/30"
                  }`}
                ></span>
              </span>
              <Terminal className="w-4 h-4 text-[#c5a059]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white font-bold">
                SYSTEM TELEMETRY ENGINE
              </h3>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center space-x-1 bg-[#121212] p-0.5 border border-white/10 text-[10px] font-mono">
              <button
                onClick={() => setActiveTab("EVENT_LOG")}
                className={`px-2.5 py-1 flex items-center space-x-1.5 transition-all ${
                  activeTab === "EVENT_LOG"
                    ? "bg-[#c5a059] text-[#080808] font-bold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Bell className="w-3 h-3" />
                <span>EVENT LOG & SEVERITY</span>
              </button>
              <button
                onClick={() => setActiveTab("STREAM")}
                className={`px-2.5 py-1 flex items-center space-x-1.5 transition-all ${
                  activeTab === "STREAM"
                    ? "bg-[#c5a059] text-[#080808] font-bold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>RAW STREAM</span>
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2">
            <button
              id="btn-telemetry-probe"
              onClick={handleInjectProbe}
              className="px-2.5 py-1 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-[10px] font-mono uppercase text-[#c5a059] flex items-center space-x-1.5 transition-all"
              title="Inject live diagnostic test probe"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Inject Probe</span>
            </button>

            <button
              id="btn-telemetry-stream-toggle"
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-2.5 py-1 border text-[10px] font-mono uppercase flex items-center space-x-1.5 transition-all ${
                isStreaming
                  ? "bg-[#0a1610] text-emerald-300 border-emerald-800"
                  : "bg-[#181308] text-[#c5a059] border-[#c5a059]/40"
              }`}
            >
              {isStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isStreaming ? "Pause" : "Resume"}</span>
            </button>

            <button
              onClick={() => setLogs([])}
              className="p-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/40 hover:text-white transition-all"
              title="Clear telemetry buffer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExportLogs}
              className="p-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/40 hover:text-white transition-all"
              title="Export telemetry log JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/40 hover:text-white transition-all"
              title={isExpanded ? "Collapse height" : "Expand full"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              id="btn-close-telemetry"
              onClick={onClose}
              className="p-1.5 bg-[#121212] hover:bg-rose-950/40 border border-white/10 text-white/60 hover:text-rose-300 transition-all"
              title="Close telemetry drawer (or press 'T')"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "EVENT_LOG" ? (
          <div className="flex-1 overflow-hidden">
            <SystemEventLog onNavigate={onNavigate} />
          </div>
        ) : (
          <>
            {/* Filter Sub-bar */}
            <div className="px-4 py-2 bg-[#0a0a0a] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/30 uppercase tracking-wider">Subsystem:</span>
                {["ALL", "OBSERVATORY", "GEMINI-AI", "CAUSAL-GRAPH", "7-CAPITALS", "CONSCIENCE", "FINANCE-ROUTER"].map(
                  (sys) => (
                    <button
                      key={sys}
                      onClick={() => setSelectedSubsystem(sys)}
                      className={`px-2 py-0.5 border transition-all ${
                        selectedSubsystem === sys
                          ? "bg-[#c5a059] text-[#080808] font-bold border-[#c5a059]"
                          : "bg-[#111111] text-white/40 hover:text-white border-white/5"
                      }`}
                    >
                      {sys}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="text-white/30 uppercase">Level:</span>
                  {["ALL", "INFO", "REASONING", "LEVERAGE", "SUCCESS"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-1.5 py-0.5 border ${
                        selectedLevel === lvl
                          ? "bg-white/20 text-white border-white/40"
                          : "text-white/30 hover:text-white/70 border-transparent"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setAutoScroll(!autoScroll)}
                  className={`px-2 py-0.5 border flex items-center space-x-1 ${
                    autoScroll
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-800"
                      : "bg-[#111111] text-white/30 border-white/5"
                  }`}
                >
                  <ArrowDown className="w-2.5 h-2.5" />
                  <span>Auto-Scroll</span>
                </button>
              </div>
            </div>

            {/* Real-Time Terminal Log Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 font-mono text-xs bg-[#050505] selection:bg-[#c5a059]/30">
              {filteredLogs.length === 0 ? (
                <div className="py-12 text-center text-white/30 text-xs">
                  No telemetry events match the current filter criteria.
                </div>
              ) : (
                filteredLogs.map((l) => (
                  <div
                    key={l.id}
                    className="py-1 px-2 hover:bg-[#0c0c0c] rounded-xs flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 text-[11px] leading-relaxed transition-colors border-l-2 border-transparent hover:border-[#c5a059]"
                  >
                    <span className="text-white/30 shrink-0 select-none">
                      {l.timestamp}
                    </span>

                    <span
                      className={`px-1.5 py-0.2 border text-[9px] font-bold uppercase tracking-wider shrink-0 w-28 text-center ${getLevelBadgeClass(
                        l.level
                      )}`}
                    >
                      {l.subsystem}
                    </span>

                    <span className="text-white/80 font-mono break-words flex-1">
                      <span className="text-white/30 mr-1.5">[{l.level}]</span>
                      {l.message}
                    </span>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </>
        )}

        {/* Minimal Terminal Footer Status */}
        <div className="px-4 py-2 bg-[#0c0c0c] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <div className="flex items-center space-x-3">
            <span className="text-emerald-400">● RUNNING INFERENCE DAEMON</span>
            <span>LATENCY: 142ms</span>
            <span>THROUGHPUT: 48 TOK/S</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>PRESS <kbd className="px-1 py-0.2 bg-white/10 text-white font-bold">T</kbd> TO HIDE/SHOW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { SystemEventNotification, EventSeverity, NavigationSpace } from "../types";
import { useSystemState } from "../context/SystemContext";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Trash2,
  Filter,
  PlusCircle,
  Radio,
  Check
} from "lucide-react";

interface SystemEventLogProps {
  onNavigate?: (space: NavigationSpace) => void;
}

export const SystemEventLog: React.FC<SystemEventLogProps> = ({ onNavigate }) => {
  const {
    events,
    resolveEvent,
    clearEvents,
    simulateSampleEvent,
    navigateTo,
  } = useSystemState();

  const [filterSeverity, setFilterSeverity] = useState<"ALL" | EventSeverity>("ALL");
  const [showResolved, setShowResolved] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SystemEventNotification | null>(null);

  const filteredEvents = events.filter((evt) => {
    if (filterSeverity !== "ALL" && evt.severity !== filterSeverity) return false;
    if (!showResolved && evt.resolved) return false;
    return true;
  });

  const getSeverityBadge = (severity: EventSeverity) => {
    switch (severity) {
      case "CRITICAL":
        return {
          icon: AlertCircle,
          color: "text-rose-400 bg-rose-950/40 border-rose-800/60",
          dot: "bg-rose-500 animate-ping",
        };
      case "WARN":
        return {
          icon: AlertTriangle,
          color: "text-amber-400 bg-amber-950/40 border-amber-800/60",
          dot: "bg-amber-500",
        };
      case "SUCCESS":
        return {
          icon: CheckCircle2,
          color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
          dot: "bg-emerald-500",
        };
      case "INFO":
      default:
        return {
          icon: Info,
          color: "text-sky-400 bg-sky-950/40 border-sky-800/60",
          dot: "bg-sky-500",
        };
    }
  };

  const criticalCount = events.filter((e) => e.severity === "CRITICAL" && !e.resolved).length;
  const warnCount = events.filter((e) => e.severity === "WARN" && !e.resolved).length;
  const infoCount = events.filter((e) => e.severity === "INFO" && !e.resolved).length;

  const handleAction = (space?: NavigationSpace) => {
    if (!space) return;
    if (onNavigate) {
      onNavigate(space);
    } else {
      navigateTo(space);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080808] border border-white/10 text-white font-mono text-xs select-none">
      {/* Top Header & Simulation Controls */}
      <div className="px-4 py-3 bg-[#0d0d0d] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center p-1.5 bg-[#141414] border border-[#c5a059]/40">
            <Bell className="w-4 h-4 text-[#c5a059]" />
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[#c5a059] font-bold uppercase tracking-wider text-xs">
                SYSTEM EVENT NOTIFICATION BUS
              </span>
              <span className="px-1.5 py-0.2 text-[9px] bg-white/10 text-white/70 border border-white/10">
                {events.length} TOTAL
              </span>
            </div>
            <p className="text-[10px] text-white/50 font-sans mt-0.5">
              Real-time asynchronous telemetry signals, anomaly flags, and autonomous state transitions.
            </p>
          </div>
        </div>

        {/* Action Controls & Simulator */}
        <div className="flex items-center space-x-2">
          {/* Quick Simulation Buttons */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-[#121212] border border-white/10 text-[10px]">
            <span className="text-white/40 uppercase tracking-wider hidden sm:inline">SIMULATE:</span>
            <button
              onClick={() => simulateSampleEvent("INFO")}
              className="px-1.5 py-0.5 bg-sky-950/50 hover:bg-sky-900/60 border border-sky-800/60 text-sky-300 font-bold"
              title="Simulate INFO event"
            >
              +INFO
            </button>
            <button
              onClick={() => simulateSampleEvent("WARN")}
              className="px-1.5 py-0.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/60 text-amber-300 font-bold"
              title="Simulate WARN event"
            >
              +WARN
            </button>
            <button
              onClick={() => simulateSampleEvent("CRITICAL")}
              className="px-1.5 py-0.5 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-bold"
              title="Simulate CRITICAL event"
            >
              +CRIT
            </button>
          </div>

          <button
            onClick={clearEvents}
            className="p-1.5 bg-[#141414] hover:bg-[#202020] border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-all"
            title="Clear all resolved events"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Bar & Counters */}
      <div className="px-4 py-2 bg-[#0a0a0a] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-white/40 flex items-center space-x-1 pr-1">
            <Filter className="w-3 h-3 text-[#c5a059]" />
            <span>FILTER:</span>
          </span>
          <button
            onClick={() => setFilterSeverity("ALL")}
            className={`px-2 py-0.5 border transition-all ${
              filterSeverity === "ALL"
                ? "bg-[#c5a059] text-[#080808] border-[#c5a059] font-bold"
                : "bg-[#111111] text-white/60 hover:text-white border-white/10"
            }`}
          >
            ALL ({events.length})
          </button>
          <button
            onClick={() => setFilterSeverity("CRITICAL")}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 ${
              filterSeverity === "CRITICAL"
                ? "bg-rose-500 text-white border-rose-500 font-bold"
                : "bg-[#111111] text-rose-400 hover:text-rose-300 border-rose-900/50"
            }`}
          >
            <span>CRITICAL</span>
            {criticalCount > 0 && <span className="font-bold">({criticalCount})</span>}
          </button>
          <button
            onClick={() => setFilterSeverity("WARN")}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 ${
              filterSeverity === "WARN"
                ? "bg-amber-500 text-black border-amber-500 font-bold"
                : "bg-[#111111] text-amber-400 hover:text-amber-300 border-amber-900/50"
            }`}
          >
            <span>WARN</span>
            {warnCount > 0 && <span className="font-bold">({warnCount})</span>}
          </button>
          <button
            onClick={() => setFilterSeverity("INFO")}
            className={`px-2 py-0.5 border transition-all flex items-center space-x-1 ${
              filterSeverity === "INFO"
                ? "bg-sky-500 text-white border-sky-500 font-bold"
                : "bg-[#111111] text-sky-400 hover:text-sky-300 border-sky-900/50"
            }`}
          >
            <span>INFO</span>
            {infoCount > 0 && <span className="font-bold">({infoCount})</span>}
          </button>
        </div>

        <label className="flex items-center space-x-1.5 cursor-pointer text-white/60 hover:text-white">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
            className="rounded border-white/20 bg-[#141414] text-[#c5a059] focus:ring-0"
          />
          <span>Show Resolved ({events.filter((e) => e.resolved).length})</span>
        </label>
      </div>

      {/* Main Event Stream Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1.5 max-h-[380px]">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-white/30 space-y-2">
            <Radio className="w-8 h-8 mx-auto text-white/20 animate-pulse" />
            <p>No active event notifications matching current filter.</p>
            <button
              onClick={() => simulateSampleEvent()}
              className="px-3 py-1 bg-[#141414] hover:bg-[#202020] border border-white/10 text-white/60 hover:text-white text-[10px] uppercase tracking-wider"
            >
              Simulate Subsystem Event
            </button>
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const badge = getSeverityBadge(evt.severity);
            const Icon = badge.icon;
            const isSelected = selectedEvent?.id === evt.id;

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className={`p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#161616] border-[#c5a059] shadow-lg"
                    : evt.resolved
                    ? "bg-[#0a0a0a]/50 border-white/5 opacity-60 hover:opacity-100"
                    : evt.severity === "CRITICAL"
                    ? "bg-rose-950/20 border-rose-900/60 hover:bg-rose-950/30"
                    : evt.severity === "WARN"
                    ? "bg-amber-950/20 border-amber-900/60 hover:bg-amber-950/30"
                    : "bg-[#0d0d0d] border-white/10 hover:bg-[#141414]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5">
                    <span
                      className={`px-2 py-0.5 border text-[9px] font-bold tracking-wider flex items-center space-x-1 shrink-0 ${badge.color}`}
                    >
                      <Icon className="w-2.5 h-2.5" />
                      <span>{evt.severity}</span>
                    </span>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#c5a059] font-bold text-[11px]">
                          {evt.title}
                        </span>
                        <span className="text-white/30 text-[9px]">• {evt.subsystem}</span>
                        {evt.resolved && (
                          <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 text-[8px] border border-emerald-800">
                            RESOLVED
                          </span>
                        )}
                      </div>

                      <p className="text-white/70 font-sans text-xs leading-relaxed">
                        {evt.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 shrink-0 text-[9px]">
                    <span className="text-white/40">{evt.timestamp}</span>

                    <div className="flex items-center space-x-1">
                      {!evt.resolved && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resolveEvent(evt.id);
                          }}
                          className="px-2 py-0.5 bg-white/5 hover:bg-emerald-950 hover:text-emerald-400 border border-white/10 hover:border-emerald-800 transition-all flex items-center space-x-1"
                          title="Mark event as resolved"
                        >
                          <Check className="w-2.5 h-2.5" />
                          <span>Resolve</span>
                        </button>
                      )}

                      {evt.actionTargetSpace && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(evt.actionTargetSpace);
                          }}
                          className="px-2 py-0.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold flex items-center space-x-1 transition-all"
                          title={`Navigate to ${evt.actionTargetSpace}`}
                        >
                          <span>{evt.actionLabel || "Inspect"}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected Event Deep Detail Bar */}
      {selectedEvent && (
        <div className="p-3 bg-[#111111] border-t border-[#c5a059]/40 flex flex-wrap items-center justify-between gap-3 text-[10px]">
          <div className="flex items-center space-x-2">
            <span className="text-[#c5a059] font-bold">SELECTED EVENT:</span>
            <span className="text-white font-sans">{selectedEvent.title}</span>
            <span className="text-white/40">({selectedEvent.id})</span>
          </div>

          <div className="flex items-center space-x-2">
            {selectedEvent.actionTargetSpace && (
              <button
                onClick={() => handleAction(selectedEvent.actionTargetSpace)}
                className="px-3 py-1 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold flex items-center space-x-1"
              >
                <span>Jump to Space ({selectedEvent.actionTargetSpace.toUpperCase()})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
            >
              Dismiss Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

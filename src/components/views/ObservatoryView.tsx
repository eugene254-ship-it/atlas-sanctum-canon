import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Filter,
  Layers,
  Sparkles,
  Compass,
  Radio,
  Search,
  CheckCircle2,
  BarChart2,
  Flame,
  Globe
} from "lucide-react";
import { ObservatorySignal, NavigationSpace } from "../../types";
import { OBSERVATORY_SIGNALS } from "../../data/seedData";

interface ObservatoryViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const ObservatoryView: React.FC<ObservatoryViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [signals, setSignals] = useState<ObservatorySignal[]>(OBSERVATORY_SIGNALS);
  const [selectedSignal, setSelectedSignal] = useState<ObservatorySignal>(OBSERVATORY_SIGNALS[0]);
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const domains = [
    { id: "all", label: "All Domains" },
    { id: "ecological", label: "Ecological & Watershed" },
    { id: "infrastructure", label: "Energy & Infrastructure" },
    { id: "market", label: "Informal Markets & Liquidity" },
    { id: "community", label: "Public Health & Community" },
    { id: "socioeconomic", label: "Clean Cooking & Bio-Economy" },
  ];

  const filteredSignals = signals.filter((sig) => {
    const matchesDomain = selectedDomain === "all" || sig.domain === selectedDomain;
    const matchesSeverity = selectedSeverity === "all" || sig.severity === selectedSeverity;
    const matchesSearch =
      sig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (sev: ObservatorySignal["severity"]) => {
    switch (sev) {
      case "critical":
        return "bg-[#180d0d] text-rose-300 border-rose-800/60";
      case "high":
        return "bg-[#181308] text-[#c5a059] border-[#c5a059]/40";
      case "medium":
        return "bg-[#0b141a] text-sky-300 border-sky-800/60";
      case "low":
        return "bg-[#0a1610] text-emerald-300 border-emerald-800/60";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>CONTINUOUS REALITY SENSING LAYER</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            The Atlas Observatory
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Live world-observation matrix ingesting telemetry from satellite radar, IoT sensor swarms, economic registries, and community ground-truth diaries.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-[#080808] border border-white/15 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 flex items-center space-x-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>NODES ONLINE: 142 LIVE</span>
          </div>
        </div>
      </div>

      {/* Telemetry Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Active Signals</span>
          <div className="text-3xl font-serif font-light text-white">{signals.length}</div>
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">100% Calibrated</span>
        </div>

        <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Critical Anomalies</span>
          <div className="text-3xl font-serif font-light text-rose-400">
            {signals.filter((s) => s.severity === "critical" || s.severity === "high").length}
          </div>
          <span className="text-[10px] text-rose-400/80 font-mono tracking-wider uppercase">Systemic Action</span>
        </div>

        <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Leverage Vectors</span>
          <div className="text-3xl font-serif font-light text-[#c5a059]">
            {signals.filter((s) => s.leveragePotential === "transformational").length}
          </div>
          <span className="text-[10px] text-[#c5a059] font-mono tracking-wider uppercase">Transformational</span>
        </div>

        <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Ground Verification</span>
          <div className="text-3xl font-serif font-light text-sky-400">94.8%</div>
          <span className="text-[10px] text-sky-400/80 font-mono tracking-wider uppercase">Community Provenance</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-5 bg-[#0c0c0c] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {domains.map((dom) => (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-colors ${
                selectedDomain === dom.id
                  ? "bg-[#c5a059] text-[#080808] font-bold"
                  : "bg-[#080808] text-white/40 hover:text-white border border-white/10"
              }`}
            >
              {dom.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#c5a059] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals, locations..."
            className="w-full pl-9 pr-3 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Signals Split View: Grid of Signals + Selected Signal Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Signals List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredSignals.map((sig) => {
            const isSelected = selectedSignal.id === sig.id;
            return (
              <div
                key={sig.id}
                onClick={() => setSelectedSignal(sig)}
                className={`p-5 border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? "bg-[#111111] border-[#c5a059] shadow-md"
                    : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className={`px-2 py-0.5 border text-[9px] ${getSeverityBadge(sig.severity)}`}>
                    {sig.severity}
                  </span>
                  <span className="text-white/40">{sig.detectedAt}</span>
                </div>

                <h4 className="font-serif font-normal text-base text-white leading-snug">
                  {sig.title}
                </h4>

                <div className="flex items-center space-x-2 text-xs text-white/50">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span className="truncate">{sig.location}</span>
                </div>

                <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono border-t border-white/5">
                  <span className="text-white/40">{sig.metric}</span>
                  <span className={sig.delta.startsWith("+") ? "text-[#c5a059]" : "text-emerald-400"}>
                    {sig.delta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Signal Deep Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className={`px-3 py-1 border font-semibold ${getSeverityBadge(selectedSignal.severity)}`}>
                  {selectedSignal.severity.toUpperCase()} SEVERITY
                </span>
                <span className="text-white/40">
                  Confidence: <strong className="text-emerald-400">{Math.round(selectedSignal.confidenceScore * 100)}%</strong> • Trend: <strong className="text-[#c5a059] uppercase">{selectedSignal.trend}</strong>
                </span>
              </div>

              <h3 className="font-serif font-light text-2xl sm:text-3xl text-white leading-snug tracking-wide">
                {selectedSignal.title}
              </h3>

              <div className="flex items-center space-x-2 text-xs text-white/50">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="font-mono text-white/80">{selectedSignal.location}</span>
              </div>
            </div>

            {/* Signal Telemetry Box */}
            <div className="p-5 bg-[#080808] border border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Telemetry Metric</span>
                <p className="text-base font-serif font-light text-white mt-1">
                  {selectedSignal.metric}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Baseline Delta</span>
                <p className="text-base font-mono text-[#c5a059] mt-1 font-bold">
                  {selectedSignal.delta}
                </p>
              </div>
            </div>

            {/* Core Summary */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Systemic Observation Summary
              </h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {selectedSignal.summary}
              </p>
            </div>

            {/* Ground Truth Note */}
            {selectedSignal.groundTruthNote && (
              <div className="p-5 bg-[#12100a] border border-[#c5a059]/30 space-y-2">
                <h4 className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Community Ground-Truth Diary</span>
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-serif italic leading-relaxed">
                  "{selectedSignal.groundTruthNote}"
                </p>
              </div>
            )}

            {/* Leverage Potential */}
            <div className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/40 uppercase tracking-wider text-[10px]">Leverage Potential:</span>
              <span className="px-3 py-1 bg-[#161616] text-[#c5a059] border border-[#c5a059]/40 uppercase text-[10px] tracking-wider">
                {selectedSignal.leveragePotential} LEVERAGE
              </span>
            </div>

            {/* Action Bridges */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onNavigate("world-model")}
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.25em] font-mono flex items-center space-x-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>World Graph</span>
              </button>

              <button
                onClick={() => onNavigate("question-engine")}
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.25em] font-mono flex items-center space-x-1.5 transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Formulate Question</span>
              </button>

              <button
                onClick={() => onNavigate("studio")}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Start Innovation Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

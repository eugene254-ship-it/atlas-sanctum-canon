import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  GitFork,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Compass,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Sun
} from "lucide-react";
import {
  CausalLoop,
  StockFlowElement,
  LeveragePoint,
  NavigationSpace
} from "../../types";
import {
  CAUSAL_LOOPS,
  STOCKS_AND_FLOWS,
  DOWELLA_MEADOWS_LEVERAGE_POINTS
} from "../../data/seedData";
import { SystemsSunburst } from "../SystemsSunburst";

interface SystemsModelingViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const SystemsModelingView: React.FC<SystemsModelingViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [activeTab, setActiveTab] = useState<"sunburst" | "loops" | "stocks-flows" | "leverage">("sunburst");
  const [loops, setLoops] = useState<CausalLoop[]>(CAUSAL_LOOPS);
  const [selectedLoop, setSelectedLoop] = useState<CausalLoop>(CAUSAL_LOOPS[0]);

  // Interactive Stock & Flow States
  const [stocks, setStocks] = useState<StockFlowElement[]>(STOCKS_AND_FLOWS);
  const [soilSpongeVolume, setSoilSpongeVolume] = useState<number>(42000);
  const [inflowSurgeRate, setInflowSurgeRate] = useState<number>(18.4);
  const [infiltrationRate, setInfiltrationRate] = useState<number>(4.1);

  // Selected Leverage Point
  const [selectedLeverage, setSelectedLeverage] = useState<LeveragePoint>(
    DOWELLA_MEADOWS_LEVERAGE_POINTS[3] // Rank 4: Self-Organization
  );

  // Derived simulation metrics
  const netInfiltrationDeficit = Math.max(0, inflowSurgeRate - infiltrationRate);
  const floodLagMinutes = Math.max(10, Math.round(120 - netInfiltrationDeficit * 6.5));
  const monthsToTargetCapacity = Math.round(
    Math.max(1, (120000 - soilSpongeVolume) / (infiltrationRate * 450))
  );

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-sky-400">
            <Layers className="w-3.5 h-3.5" />
            <span>SYSTEM DYNAMICS & FEEDBACK TOPOLOGY</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Systems Dynamics Engine
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Diagnosing why chronic challenges persist: model stocks, flows, feedback loops, delay structures, and intervene at Donella Meadows' 12 leverage points.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#080808] border border-white/10 text-xs font-mono">
          <button
            id="tab-systems-sunburst"
            onClick={() => setActiveTab("sunburst")}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all flex items-center space-x-1.5 ${
              activeTab === "sunburst"
                ? "bg-[#c5a059] text-[#080808] font-bold"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Systems Sunburst (D3)</span>
          </button>
          <button
            onClick={() => setActiveTab("loops")}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all ${
              activeTab === "loops"
                ? "bg-[#c5a059] text-[#080808] font-bold"
                : "text-white/40 hover:text-white"
            }`}
          >
            Causal Loops ({loops.length})
          </button>
          <button
            onClick={() => setActiveTab("stocks-flows")}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all ${
              activeTab === "stocks-flows"
                ? "bg-[#c5a059] text-[#080808] font-bold"
                : "text-white/40 hover:text-white"
            }`}
          >
            Stocks & Flows
          </button>
          <button
            onClick={() => setActiveTab("leverage")}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all ${
              activeTab === "leverage"
                ? "bg-[#c5a059] text-[#080808] font-bold"
                : "text-white/40 hover:text-white"
            }`}
          >
            12 Leverage Points
          </button>
        </div>
      </div>

      {/* TAB 0: D3 SYSTEMS INTELLIGENCE SUNBURST */}
      {activeTab === "sunburst" && (
        <SystemsSunburst onNavigateStudio={() => onNavigate("studio")} />
      )}

      {/* TAB 1: CAUSAL LOOP DIAGRAMS */}
      {activeTab === "loops" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Loops List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
              Identified Feedback Loops
            </h3>
            <div className="space-y-3">
              {loops.map((loop) => {
                const isSelected = selectedLoop.id === loop.id;
                const isReinforcing = loop.type === "reinforcing";

                return (
                  <div
                    key={loop.id}
                    onClick={() => setSelectedLoop(loop)}
                    className={`p-5 border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? "bg-[#111111] border-[#c5a059] shadow-md"
                        : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                      <span
                        className={`px-2 py-0.5 border text-[9px] ${
                          isReinforcing
                            ? loop.id.includes("Trap")
                              ? "bg-[#180d0d] text-rose-300 border-rose-800/60"
                              : "bg-[#0a1610] text-emerald-300 border-emerald-800/60"
                            : "bg-[#0b141a] text-sky-300 border-sky-800/60"
                        }`}
                      >
                        {isReinforcing ? "Reinforcing (R)" : "Balancing (B)"}
                      </span>
                      <span className="text-white/40">{loop.nodesInvolved.length} Nodes</span>
                    </div>

                    <h4 className="font-serif font-normal text-base text-white">
                      {loop.name}
                    </h4>

                    <p className="text-xs text-white/50 line-clamp-2 font-sans">
                      {loop.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Loop Inspector & Polarity Chain */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  {selectedLoop.type.toUpperCase()} DYNAMICS LOOP
                </span>
                <h3 className="font-serif font-light text-2xl text-white">
                  {selectedLoop.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed bg-[#080808] p-4 border border-white/5 font-sans">
                  {selectedLoop.description}
                </p>
              </div>

              {/* Node Sequence / Polarity Flow */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                  Causal Polarity Sequence
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedLoop.nodesInvolved.map((node, i) => (
                    <React.Fragment key={i}>
                      <div className="p-3 bg-[#080808] border border-white/10 text-xs text-white/80 font-mono flex items-center space-x-2">
                        <span className="text-[#c5a059] font-bold">{i + 1}.</span>
                        <span>{node}</span>
                        {selectedLoop.polaritySequence[i] && (
                          <span
                            className={`px-1.5 py-0.2 rounded-xs text-[10px] ${
                              selectedLoop.polaritySequence[i] === "+"
                                ? "bg-[#0a1610] text-emerald-400 border border-emerald-800"
                                : "bg-[#180d0d] text-rose-400 border border-rose-800"
                            }`}
                          >
                            ({selectedLoop.polaritySequence[i]})
                          </span>
                        )}
                      </div>
                      {i < selectedLoop.nodesInvolved.length - 1 && (
                        <span className="text-white/20 font-mono text-xs">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Current Bottleneck */}
              <div className="p-5 bg-[#180d0d]/80 border border-rose-800/40 space-y-2">
                <h4 className="text-[10px] font-mono text-rose-400 uppercase tracking-[0.25em] flex items-center space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Current Systemic Bottleneck</span>
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {selectedLoop.currentBottleneck}
                </p>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => onNavigate("studio")}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Engineer Leverage Intervention</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STOCKS & FLOWS INTERACTIVE SIMULATOR */}
      {activeTab === "stocks-flows" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders & Parameters (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#c5a059]" />
                  <span>Hydraulics Simulator</span>
                </h3>
                <button
                  onClick={() => {
                    setSoilSpongeVolume(42000);
                    setInflowSurgeRate(18.4);
                    setInfiltrationRate(4.1);
                  }}
                  className="text-[10px] text-white/40 hover:text-white uppercase tracking-wider flex items-center space-x-1 font-mono"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Slider 1: Stock Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">[STOCK] Soil Sponge Capacity:</span>
                  <span className="text-[#c5a059] font-bold">{soilSpongeVolume.toLocaleString()} m³</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="120000"
                  step="2000"
                  value={soilSpongeVolume}
                  onChange={(e) => setSoilSpongeVolume(Number(e.target.value))}
                  className="w-full accent-[#c5a059] bg-[#080808] cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[9px] text-white/30 font-mono">
                  <span>10k m³ (Degraded)</span>
                  <span>120k m³ (Target Sponge)</span>
                </div>
              </div>

              {/* Slider 2: Inflow Surge Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">[INFLOW] Stormwater Peak Surge:</span>
                  <span className="text-rose-400 font-bold">{inflowSurgeRate} m³/sec</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="0.5"
                  value={inflowSurgeRate}
                  onChange={(e) => setInflowSurgeRate(Number(e.target.value))}
                  className="w-full accent-rose-500 bg-[#080808] cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[9px] text-white/30 font-mono">
                  <span>5 m³/s (Moderate Rain)</span>
                  <span>30 m³/s (100-Year Cloudburst)</span>
                </div>
              </div>

              {/* Slider 3: Outflow Infiltration Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">[OUTFLOW] Infiltration / Retention:</span>
                  <span className="text-emerald-400 font-bold">{infiltrationRate} m³/sec</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={infiltrationRate}
                  onChange={(e) => setInfiltrationRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-[#080808] cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[9px] text-white/30 font-mono">
                  <span>1 m³/s (Clay Tarmac)</span>
                  <span>20 m³/s (Bioswales)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Telemetry Projections (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Simulated System Outturn</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-[#080808] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                    Overland Excess
                  </span>
                  <div className={`text-3xl font-serif font-light ${netInfiltrationDeficit > 5 ? "text-rose-400" : "text-emerald-400"}`}>
                    {netInfiltrationDeficit.toFixed(1)} m³/s
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">
                    {netInfiltrationDeficit > 5 ? "Critical Flood Hazard" : "Safe Buffer"}
                  </span>
                </div>

                <div className="p-5 bg-[#080808] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                    Estimated Peak Lag
                  </span>
                  <div className={`text-3xl font-serif font-light ${floodLagMinutes < 30 ? "text-[#c5a059]" : "text-sky-400"}`}>
                    {floodLagMinutes} mins
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">
                    Evacuation Window
                  </span>
                </div>
              </div>

              <div className="p-5 bg-[#080808] border border-white/10 space-y-2 text-xs">
                <span className="text-white/40 font-mono uppercase text-[10px] tracking-wider">Target 120,000 m³ Sponge Timeline:</span>
                <div className="text-sm text-white/80 font-serif">
                  Approx. <strong className="text-[#c5a059]">{monthsToTargetCapacity} months</strong> of staged community youth bioswale grading.
                </div>
              </div>

              <button
                onClick={() => onNavigate("studio")}
                className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <span>Translate Dynamics into Studio Prototype</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DONELLA MEADOWS' 12 LEVERAGE POINTS */}
      {activeTab === "leverage" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 12 Leverage Points List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[650px] overflow-y-auto pr-1">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] mb-2">
              Donella Meadows' 12 Leverage Points (Ranked by Power)
            </h3>
            {DOWELLA_MEADOWS_LEVERAGE_POINTS.map((lp) => {
              const isSelected = selectedLeverage.id === lp.id;
              return (
                <div
                  key={lp.id}
                  onClick={() => setSelectedLeverage(lp)}
                  className={`p-4 border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? "bg-[#111111] border-[#c5a059] shadow-md"
                      : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="font-bold text-[#c5a059]">Rank #{lp.rank}</span>
                    <span className="text-[9px] px-2 py-0.5 bg-[#161616] text-white/40 border border-white/5">
                      {lp.impactPotential}
                    </span>
                  </div>
                  <h4 className="font-serif font-normal text-sm text-white truncate">
                    {lp.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Selected Leverage Point Deep-Dive (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                  <span>DONELLA MEADOWS LEVERAGE RANK #{selectedLeverage.rank}</span>
                  <span className="text-white/40">Feasibility: {selectedLeverage.feasibility}</span>
                </div>
                <h3 className="font-serif font-light text-2xl text-white">
                  {selectedLeverage.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                  {selectedLeverage.description}
                </p>
              </div>

              {/* Comparison: Current Practice vs Regenerative Intervention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#080808] border border-rose-900/40 space-y-2">
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-[0.2em] font-semibold">
                    Current Extractive Practice
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {selectedLeverage.currentPractice}
                  </p>
                </div>

                <div className="p-5 bg-[#080808] border border-emerald-900/40 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] font-semibold">
                    Atlas Regenerative Intervention
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {selectedLeverage.regenerativeIntervention}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">
                  Impact: <strong className="text-[#c5a059]">{selectedLeverage.impactPotential}</strong>
                </span>
                <button
                  onClick={() => onNavigate("studio")}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Apply Leverage in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

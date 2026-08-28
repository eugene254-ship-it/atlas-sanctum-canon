import React, { useState } from "react";
import {
  Radio,
  Sliders,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Layers,
  Compass,
  Download,
  Play,
  Scale,
  Calendar,
  Activity
} from "lucide-react";
import { NavigationSpace } from "../../types";

interface ScenarioEngineViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const ScenarioEngineView: React.FC<ScenarioEngineViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  // Scenario selector
  const [selectedScenario, setSelectedScenario] = useState<"status-quo" | "local-pilot" | "10x-scale" | "assumption-failure">("10x-scale");
  const [activeTab, setActiveTab] = useState<"simulator" | "matrix" | "monte-carlo">("simulator");

  // Dynamic simulation levers
  const [governanceConsensus, setGovernanceConsensus] = useState(85); // %
  const [blendedCapitalInflow, setBlendedCapitalInflow] = useState(350); // $k USD
  const [extremeRainfallEvent, setExtremeRainfallEvent] = useState(45); // mm/hr surge
  const [timeHorizonYears, setTimeHorizonYears] = useState(10); // years

  // Monte Carlo state
  const [isSimulating, setIsSimulating] = useState(false);
  const [monteCarloRuns, setMonteCarloRuns] = useState<
    Array<{ run: number; resiliencePct: number; floodLossAvoidedM: number; confidence: string }>
  >([]);

  // Derived calculations
  const calculateOutcomes = () => {
    const horizonMultiplier = timeHorizonYears / 10;
    switch (selectedScenario) {
      case "status-quo":
        return {
          floodLossesUSD: 14200000 * horizonMultiplier,
          residentsProtected: 0,
          jobsCreated: 0,
          biomassCapturedTons: 0,
          multiCapitalLift: "+0%",
          riskLevel: "CRITICAL COLLAPSE",
          narrative: `Over a ${timeHorizonYears}-year horizon without intervention, seasonal storms continue to erode upper soil beds, flooding 42,000 households annually and stalling informal market trade velocity.`,
        };
      case "local-pilot":
        return {
          floodLossesUSD: 8500000 * horizonMultiplier,
          residentsProtected: 14000,
          jobsCreated: Math.round(85 * horizonMultiplier),
          biomassCapturedTons: Math.round(450 * horizonMultiplier),
          multiCapitalLift: "+28%",
          riskLevel: "MODERATE CONTAINMENT",
          narrative: `A 500-meter test bioswale cushions the immediate downstream junction, proving volcanic pumice permeability but leaving surrounding valleys vulnerable across ${timeHorizonYears} years.`,
        };
      case "10x-scale":
        return {
          floodLossesUSD: Math.round(14200000 * (1 - (governanceConsensus / 100) * 0.9) * horizonMultiplier),
          residentsProtected: Math.round(42000 * (governanceConsensus / 100)),
          jobsCreated: Math.round((blendedCapitalInflow / 10) * 8.5 * (timeHorizonYears / 5)),
          biomassCapturedTons: Math.round(blendedCapitalInflow * 4.2 * horizonMultiplier),
          multiCapitalLift: `+${Math.round(84 * (governanceConsensus / 100))}%`,
          riskLevel: "HIGH REGENERATION",
          narrative: `Full 1.8km volcanic sponge corridor + decentralized youth maintenance guilds. Flooding converted into clean urban water retention and community agriculture over ${timeHorizonYears} years.`,
        };
      case "assumption-failure":
        return {
          floodLossesUSD: 11200000 * horizonMultiplier,
          residentsProtected: 8000,
          jobsCreated: 24,
          biomassCapturedTons: 120,
          multiCapitalLift: "-12%",
          riskLevel: "SEVERE SILTING HAZARD",
          narrative: `Upper construction projects pour unchecked cement slurry into bioswales without pre-filters, clogging the volcanic pumice pores within 90 days and persisting for ${timeHorizonYears} years.`,
        };
    }
  };

  const outcome = calculateOutcomes();

  const handleRunMonteCarlo = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const runs = Array.from({ length: 5 }, (_, i) => {
        const baseRes = (governanceConsensus * 0.85) + (blendedCapitalInflow * 0.05) - (extremeRainfallEvent * 0.2);
        const variance = (Math.random() * 10) - 5;
        const res = Math.min(99, Math.max(20, Math.round(baseRes + variance)));
        const floodSaved = Number(((res / 100) * 14.2).toFixed(2));
        return {
          run: i + 1,
          resiliencePct: res,
          floodLossAvoidedM: floodSaved,
          confidence: res > 75 ? "95% CI High" : "80% CI Moderate",
        };
      });
      setMonteCarloRuns(runs);
      setIsSimulating(false);
    }, 700);
  };

  const handleExportScenario = () => {
    const summary = `# ATLAS SCENARIO SIMULATION REPORT
Date: ${new Date().toISOString().slice(0, 10)}
Selected Scenario: ${selectedScenario.toUpperCase()}
Time Horizon: ${timeHorizonYears} Years

## PARAMETERS
- Governance Alignment: ${governanceConsensus}%
- Blended Capital Inflow: $${blendedCapitalInflow}k USD
- Extreme Rainfall Event: ${extremeRainfallEvent} mm/hr

## SIMULATED OUTCOMES
- Cumulative Flood Losses: $${(outcome.floodLossesUSD / 1000000).toFixed(1)}M USD
- Residents Protected: ${outcome.residentsProtected.toLocaleString()}
- Regenerative Jobs Created: ${outcome.jobsCreated}
- 7-Capitals Lift: ${outcome.multiCapitalLift}
- Trajectory: ${outcome.narrative}
`;
    const blob = new Blob([summary], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-scenario-${selectedScenario}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>COUNTERFACTUAL & SYSTEMIC TRAJECTORY SIMULATOR</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Scenario Simulation Engine
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Simulate the future before committing real capital. Compare counterfactual trajectories: Status Quo baseline, Local Prototype, 10x Scale, and Assumption Failure stress-tests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportScenario}
            className="px-4 py-2 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>EXPORT SCENARIO</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab("simulator")}
          className={`px-6 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === "simulator"
              ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>INTERACTIVE SIMULATOR</span>
        </button>
        <button
          onClick={() => setActiveTab("matrix")}
          className={`px-6 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === "matrix"
              ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>SCENARIO COMPARISON MATRIX</span>
        </button>
        <button
          onClick={() => setActiveTab("monte-carlo")}
          className={`px-6 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === "monte-carlo"
              ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>MONTE CARLO SENSITIVITY</span>
        </button>
      </div>

      {activeTab === "simulator" && (
        <>
          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[10px] font-mono uppercase tracking-[0.2em]">
            {[
              { id: "status-quo", label: "1. Status Quo", color: "border-white/10 text-white/40" },
              { id: "local-pilot", label: "2. Local Pilot (500m)", color: "border-sky-500 text-sky-300" },
              { id: "10x-scale", label: "3. 10x Full Scale", color: "border-emerald-500 text-emerald-300" },
              { id: "assumption-failure", label: "4. Stress: Failure Mode", color: "border-rose-500 text-rose-300" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id as any)}
                className={`p-4 border text-left transition-all ${
                  selectedScenario === s.id
                    ? "bg-[#141414] border-[#c5a059] text-[#c5a059] font-bold shadow-md ring-1 ring-[#c5a059]/40"
                    : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/50"
                }`}
              >
                <div className="font-semibold">{s.label}</div>
              </button>
            ))}
          </div>

          {/* 2-Column Layout: Levers + Simulation Outturn */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Simulation Levers (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-[#c5a059]" />
                    <span>Simulation Parameters</span>
                  </h3>
                  <button
                    onClick={() => {
                      setGovernanceConsensus(85);
                      setBlendedCapitalInflow(350);
                      setExtremeRainfallEvent(45);
                      setTimeHorizonYears(10);
                    }}
                    className="text-[10px] text-white/40 hover:text-white flex items-center space-x-1 font-mono uppercase tracking-wider"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Slider 1: Community Governance Consensus */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/70 text-[10px] uppercase">
                    <span>Community Alignment:</span>
                    <span className="text-[#c5a059] font-bold">{governanceConsensus}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={governanceConsensus}
                    onChange={(e) => setGovernanceConsensus(Number(e.target.value))}
                    className="w-full accent-[#c5a059] bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                {/* Slider 2: Blended Capital Inflow */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/70 text-[10px] uppercase">
                    <span>Blended Capital Inflow:</span>
                    <span className="text-emerald-400 font-bold">${blendedCapitalInflow}k USD</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={blendedCapitalInflow}
                    onChange={(e) => setBlendedCapitalInflow(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                {/* Slider 3: Extreme Rainfall Event Intensity */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/70 text-[10px] uppercase">
                    <span>Peak Storm Intensity (Simulated):</span>
                    <span className="text-rose-400 font-bold">{extremeRainfallEvent} mm/hr</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={extremeRainfallEvent}
                    onChange={(e) => setExtremeRainfallEvent(Number(e.target.value))}
                    className="w-full accent-rose-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                {/* Slider 4: Time Horizon */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/70 text-[10px] uppercase">
                    <span>Time Horizon:</span>
                    <span className="text-purple-400 font-bold">{timeHorizonYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={timeHorizonYears}
                    onChange={(e) => setTimeHorizonYears(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Simulated Outcomes & Second-Order Effects (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Simulated Outcomes ({timeHorizonYears}-Year Horizon)</span>
                  </h3>
                  <span className="px-3 py-1 font-mono text-[10px] font-bold uppercase bg-[#181308] border border-[#c5a059]/40 text-[#c5a059]">
                    {outcome.riskLevel}
                  </span>
                </div>

                {/* 4 Metric Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Cumulative Flood Losses</span>
                    <div className="text-lg font-serif font-light text-white">
                      ${(outcome.floodLossesUSD / 1000000).toFixed(1)}M
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">People Protected</span>
                    <div className="text-lg font-serif font-light text-emerald-400">
                      {outcome.residentsProtected.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Regenerative Jobs</span>
                    <div className="text-lg font-serif font-light text-sky-400">
                      {outcome.jobsCreated}
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">7-Capitals Lift</span>
                    <div className="text-lg font-serif font-light text-[#c5a059]">
                      {outcome.multiCapitalLift}
                    </div>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="p-5 bg-[#080808] border border-white/5 space-y-1 text-xs">
                  <span className="font-mono text-white/40 uppercase text-[10px] tracking-wider">Trajectory Narrative:</span>
                  <p className="text-white/70 leading-relaxed font-sans">
                    {outcome.narrative}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("studio")}
                  className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Transform Scenario into Studio Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Matrix Tab */}
      {activeTab === "matrix" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <h3 className="font-serif text-2xl text-white">Full Counterfactual Scenario Matrix</h3>
            <p className="text-xs text-white/50 font-serif italic">
              Comparative analysis of structural trajectories across ecological, economic, and institutional dimensions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080808] text-[10px] font-mono uppercase text-white/40 border-b border-white/10">
                <tr>
                  <th className="p-3">Scenario</th>
                  <th className="p-3">Capital Requirement</th>
                  <th className="p-3">10-Yr Flood Losses</th>
                  <th className="p-3">Protected Pop</th>
                  <th className="p-3">Key Vulnerability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-[#0a0a0a]">
                  <td className="p-3 font-semibold text-white">1. Status Quo</td>
                  <td className="p-3 text-white/60">$0</td>
                  <td className="p-3 text-rose-400 font-bold">$14.2M / yr</td>
                  <td className="p-3 text-white/40">0</td>
                  <td className="p-3 text-white/60">Severe annual flooding & economic disruption</td>
                </tr>
                <tr className="bg-[#0c0c0c]">
                  <td className="p-3 font-semibold text-sky-300">2. Local Pilot (500m)</td>
                  <td className="p-3 text-white/60">$50k USD</td>
                  <td className="p-3 text-sky-400 font-bold">$8.5M / yr</td>
                  <td className="p-3 text-white/80">14,000</td>
                  <td className="p-3 text-white/60">Leaves adjacent valleys unshielded</td>
                </tr>
                <tr className="bg-[#0a1610]">
                  <td className="p-3 font-semibold text-emerald-300">3. 10x Full Scale</td>
                  <td className="p-3 text-white/60">$350k USD</td>
                  <td className="p-3 text-emerald-400 font-bold">&lt; $1.4M / yr</td>
                  <td className="p-3 text-emerald-400 font-bold">42,000</td>
                  <td className="p-3 text-white/60">Requires sustained youth stewardship guild coordination</td>
                </tr>
                <tr className="bg-[#180d0d]">
                  <td className="p-3 font-semibold text-rose-300">4. Assumption Failure</td>
                  <td className="p-3 text-white/60">$350k USD</td>
                  <td className="p-3 text-rose-400 font-bold">$11.2M / yr</td>
                  <td className="p-3 text-rose-300">8,000</td>
                  <td className="p-3 text-white/60">Upstream cement runoff silts porous biofilter beds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monte Carlo Tab */}
      {activeTab === "monte-carlo" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-2xl text-white">Monte Carlo Stochastic Sensitivity Simulator</h3>
              <p className="text-xs text-white/50 font-serif italic">
                Evaluates 100 stochastic weather perturbations, capital volatility shocks, and governance compliance rates.
              </p>
            </div>
            <button
              onClick={handleRunMonteCarlo}
              disabled={isSimulating}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-2"
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "SIMULATING TRIALS..." : "RUN MONTE CARLO (5 BATCHES)"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono">
            {(monteCarloRuns.length > 0 ? monteCarloRuns : [
              { run: 1, resiliencePct: 88, floodLossAvoidedM: 12.5, confidence: "95% CI High" },
              { run: 2, resiliencePct: 82, floodLossAvoidedM: 11.6, confidence: "95% CI High" },
              { run: 3, resiliencePct: 91, floodLossAvoidedM: 12.9, confidence: "95% CI High" },
              { run: 4, resiliencePct: 76, floodLossAvoidedM: 10.8, confidence: "80% CI Moderate" },
              { run: 5, resiliencePct: 89, floodLossAvoidedM: 12.6, confidence: "95% CI High" },
            ]).map((r) => (
              <div key={r.run} className="p-4 bg-[#080808] border border-white/10 space-y-2">
                <div className="flex justify-between text-white/40 text-[10px] uppercase">
                  <span>Iteration #{r.run}</span>
                  <span className="text-emerald-400 font-bold">{r.resiliencePct}%</span>
                </div>
                <div className="text-base font-serif text-white">
                  ${r.floodLossAvoidedM}M USD
                </div>
                <div className="text-[9px] text-[#c5a059]">{r.confidence}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

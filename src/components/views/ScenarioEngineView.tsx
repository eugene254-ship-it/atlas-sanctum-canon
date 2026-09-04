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
  Activity,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  BarChart2,
  Clock,
  BookmarkPlus,
  Check,
  History,
  FolderOpen,
  Zap
} from "lucide-react";
import { NavigationSpace, ScenarioSnapshot } from "../../types";
import { ScenarioHistoryLog } from "../ScenarioHistoryLog";
import { useSystemState } from "../../context/SystemContext";

interface ScenarioEngineViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  category: "crisis" | "growth";
  scenario: "status-quo" | "local-pilot" | "10x-scale" | "assumption-failure";
  governanceConsensus: number;
  blendedCapitalInflow: number;
  extremeRainfallEvent: number;
  timeHorizonYears: number;
  activePolicies: string[];
  description: string;
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: "preset-crisis-100yr-storm",
    name: "100-Year Climate Storm Surge",
    category: "crisis",
    scenario: "assumption-failure",
    governanceConsensus: 52,
    blendedCapitalInflow: 90,
    extremeRainfallEvent: 80,
    timeHorizonYears: 5,
    activePolicies: ["pol-01"],
    description: "Catastrophic 80mm/hr monsoon strikes during low community consensus and insufficient capital reserves.",
  },
  {
    id: "preset-crisis-capital-flight",
    name: "Capital Flight & Public Austerity",
    category: "crisis",
    scenario: "status-quo",
    governanceConsensus: 38,
    blendedCapitalInflow: 25,
    extremeRainfallEvent: 50,
    timeHorizonYears: 10,
    activePolicies: [],
    description: "External institutional capital freezes; zero bioswale maintenance leads to structural silting and severe drainage collapse.",
  },
  {
    id: "preset-crisis-silting-failure",
    name: "Volcanic Pumice Silting Emergency",
    category: "crisis",
    scenario: "assumption-failure",
    governanceConsensus: 60,
    blendedCapitalInflow: 140,
    extremeRainfallEvent: 65,
    timeHorizonYears: 3,
    activePolicies: ["pol-02"],
    description: "Unfiltered upstream construction slurry bypasses sediment traps, clogging volcanic bio-filtration in under 90 days.",
  },
  {
    id: "preset-growth-polycentric-miracle",
    name: "Polycentric Ecological Transformation",
    category: "growth",
    scenario: "10x-scale",
    governanceConsensus: 95,
    blendedCapitalInflow: 480,
    extremeRainfallEvent: 40,
    timeHorizonYears: 20,
    activePolicies: ["pol-01", "pol-02", "pol-03"],
    description: "95% customary elder consensus with capped blended finance triggers 20-year multi-capital regenerative flywheel.",
  },
  {
    id: "preset-growth-community-prototype",
    name: "Community-Led Bioswale Prototype",
    category: "growth",
    scenario: "local-pilot",
    governanceConsensus: 82,
    blendedCapitalInflow: 190,
    extremeRainfallEvent: 38,
    timeHorizonYears: 5,
    activePolicies: ["pol-01", "pol-03"],
    description: "Targeted 500m volcanic pumice test swale proves retention capacity with non-extractive community ownership.",
  },
  {
    id: "preset-growth-high-tech-sponge",
    name: "High-Tech Distributed Sponge Grid",
    category: "growth",
    scenario: "10x-scale",
    governanceConsensus: 89,
    blendedCapitalInflow: 420,
    extremeRainfallEvent: 45,
    timeHorizonYears: 15,
    activePolicies: ["pol-01", "pol-02", "pol-03"],
    description: "Decentralized biochar infiltration microgrid coupled with real-time IoT sensors and customary stewardship.",
  },
];

interface PolicyIntervention {
  id: string;
  name: string;
  description: string;
  active: boolean;
  floodReductionBonusPct: number;
  capitalCostUSD: number;
  socialEquityImpact: string;
}

const DEFAULT_SNAPSHOTS: ScenarioSnapshot[] = [
  {
    id: "snap-baseline-01",
    timestamp: "2026-09-01 10:14",
    name: "Baseline Status Quo (10-Yr)",
    notes: "Historical reference simulation: zero capital interventions, unchecked volcanic erosion.",
    scenario: "status-quo",
    governanceConsensus: 45,
    blendedCapitalInflow: 50,
    extremeRainfallEvent: 45,
    timeHorizonYears: 10,
    activePolicies: [],
    outcomes: {
      floodLossesUSD: 14200000,
      residentsProtected: 0,
      jobsCreated: 0,
      biomassCapturedTons: 0,
      multiCapitalLift: "+0%",
      riskLevel: "CRITICAL COLLAPSE",
      narrative: "Seasonal storm surges flood 42,000 households annually with zero mitigation.",
    },
  },
  {
    id: "snap-pilot-02",
    timestamp: "2026-09-02 14:30",
    name: "Rift Valley Bioswale Pilot (5-Yr)",
    notes: "500m volcanic pumice test swale + Upper basin permeable paving mandate.",
    scenario: "local-pilot",
    governanceConsensus: 72,
    blendedCapitalInflow: 180,
    extremeRainfallEvent: 40,
    timeHorizonYears: 5,
    activePolicies: ["pol-01"],
    outcomes: {
      floodLossesUSD: 3950000,
      residentsProtected: 14000,
      jobsCreated: 42,
      biomassCapturedTons: 225,
      multiCapitalLift: "+28%",
      riskLevel: "MODERATE CONTAINMENT",
      narrative: "Proves porous basalt attenuation in primary drainage corridor.",
    },
  },
  {
    id: "snap-10x-03",
    timestamp: "2026-09-03 09:45",
    name: "10x Polycentric Sponge Corridor (10-Yr)",
    notes: "Full 1.8km deployment with community land trust & non-extractive return cap.",
    scenario: "10x-scale",
    governanceConsensus: 88,
    blendedCapitalInflow: 350,
    extremeRainfallEvent: 45,
    timeHorizonYears: 10,
    activePolicies: ["pol-01", "pol-02", "pol-03"],
    outcomes: {
      floodLossesUSD: 1150000,
      residentsProtected: 42000,
      jobsCreated: 595,
      biomassCapturedTons: 1470,
      multiCapitalLift: "+89%",
      riskLevel: "HIGH REGENERATION",
      narrative: "42,000 residents shielded, $13M flood losses averted, 100% community asset ownership.",
    },
  },
];

const SNAPSHOT_STORAGE_KEY = "atlas_scenario_snapshots_v1";

export const ScenarioEngineView: React.FC<ScenarioEngineViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const { recordSavedChange } = useSystemState();

  // Preset Selector State
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [presetFeedback, setPresetFeedback] = useState<string | null>(null);

  // Scenario selector
  const [selectedScenario, setSelectedScenario] = useState<
    "status-quo" | "local-pilot" | "10x-scale" | "assumption-failure"
  >("10x-scale");
  const [activeTab, setActiveTab] = useState<"simulator" | "matrix" | "monte-carlo" | "policy" | "history">("simulator");

  // Snapshot State
  const [snapshots, setSnapshots] = useState<ScenarioSnapshot[]>(() => {
    try {
      const saved = localStorage.getItem(SNAPSHOT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SNAPSHOTS;
    } catch (e) {
      return DEFAULT_SNAPSHOTS;
    }
  });
  const [isSavingSnapshot, setIsSavingSnapshot] = useState(false);
  const [snapshotNameInput, setSnapshotNameInput] = useState("");
  const [snapshotNotesInput, setSnapshotNotesInput] = useState("");
  const [snapshotToast, setSnapshotToast] = useState<string | null>(null);

  // Dynamic simulation levers
  const [governanceConsensus, setGovernanceConsensus] = useState(85); // %
  const [blendedCapitalInflow, setBlendedCapitalInflow] = useState(350); // $k USD
  const [extremeRainfallEvent, setExtremeRainfallEvent] = useState(45); // mm/hr surge
  const [timeHorizonYears, setTimeHorizonYears] = useState(10); // years

  // Policy Sandbox Levers
  const [policies, setPolicies] = useState<PolicyIntervention[]>([
    {
      id: "pol-01",
      name: "Upstream Permeable Paving Code",
      description: "Mandates 40% pervious surfaces in all commercial developments in Upper Basin.",
      active: true,
      floodReductionBonusPct: 15,
      capitalCostUSD: 45000,
      socialEquityImpact: "Prevents upstream wealthy estates from shedding runoff into informal settlements.",
    },
    {
      id: "pol-02",
      name: "Community Riparian Land Trust (CLT)",
      description: "Perpetual 99-year collective lease protecting river corridor from predatory eviction.",
      active: true,
      floodReductionBonusPct: 20,
      capitalCostUSD: 25000,
      socialEquityImpact: "Eliminates land tenure anxiety and unleashes multi-generational tree planting.",
    },
    {
      id: "pol-03",
      name: "Non-Extractive Capital Cap (4.8%)",
      description: "Caps external investor returns to preserve surplus in local community reserve.",
      active: true,
      floodReductionBonusPct: 10,
      capitalCostUSD: 10000,
      socialEquityImpact: "Compounds $180k/yr in local youth guild maintenance stipends.",
    },
    {
      id: "pol-04",
      name: "Decentralized Early Warning IoT Mesh",
      description: "Solar hydro-sensors triggering automated bilingual SMS flood advisories.",
      active: false,
      floodReductionBonusPct: 8,
      capitalCostUSD: 18000,
      socialEquityImpact: "Zero life loss guaranteed during sudden midnight cloudburst surges.",
    },
  ]);

  // Monte Carlo state
  const [isSimulating, setIsSimulating] = useState(false);
  const [monteCarloRuns, setMonteCarloRuns] = useState<
    Array<{ run: number; resiliencePct: number; floodLossAvoidedM: number; confidence: string; status: string }>
  >([
    { run: 1, resiliencePct: 88, floodLossAvoidedM: 12.5, confidence: "95% CI High", status: "Optimal" },
    { run: 2, resiliencePct: 84, floodLossAvoidedM: 11.9, confidence: "95% CI High", status: "Optimal" },
    { run: 3, resiliencePct: 91, floodLossAvoidedM: 12.9, confidence: "95% CI High", status: "Robust" },
    { run: 4, resiliencePct: 76, floodLossAvoidedM: 10.8, confidence: "80% CI Moderate", status: "Buffer Tested" },
    { run: 5, resiliencePct: 89, floodLossAvoidedM: 12.6, confidence: "95% CI High", status: "Optimal" },
    { run: 6, resiliencePct: 81, floodLossAvoidedM: 11.5, confidence: "90% CI Good", status: "Optimal" },
    { run: 7, resiliencePct: 93, floodLossAvoidedM: 13.2, confidence: "95% CI High", status: "Frontier" },
    { run: 8, resiliencePct: 74, floodLossAvoidedM: 10.5, confidence: "80% CI Moderate", status: "Buffer Tested" },
  ]);

  const togglePolicy = (policyId: string) => {
    setPolicies(
      policies.map((p) => (p.id === policyId ? { ...p, active: !p.active } : p))
    );
  };

  const activePolicyBonus = policies
    .filter((p) => p.active)
    .reduce((sum, p) => sum + p.floodReductionBonusPct, 0);

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
          floodLossesUSD: 8500000 * horizonMultiplier * (1 - activePolicyBonus / 200),
          residentsProtected: 14000,
          jobsCreated: Math.round(85 * horizonMultiplier),
          biomassCapturedTons: Math.round(450 * horizonMultiplier),
          multiCapitalLift: "+28%",
          riskLevel: "MODERATE CONTAINMENT",
          narrative: `A 500-meter test bioswale cushions the immediate downstream junction, proving volcanic pumice permeability but leaving surrounding valleys vulnerable across ${timeHorizonYears} years.`,
        };
      case "10x-scale": {
        const policyFactor = 1 + activePolicyBonus / 100;
        const protectedPop = Math.min(
          42000,
          Math.round(42000 * (governanceConsensus / 100) * (policyFactor > 1.2 ? 1.0 : 0.95))
        );
        const lossesAvoidedPct = Math.min(0.95, (governanceConsensus / 100) * 0.9 * (policyFactor * 0.9));
        return {
          floodLossesUSD: Math.round(14200000 * (1 - lossesAvoidedPct) * horizonMultiplier),
          residentsProtected: protectedPop,
          jobsCreated: Math.round((blendedCapitalInflow / 10) * 8.5 * (timeHorizonYears / 5)),
          biomassCapturedTons: Math.round(blendedCapitalInflow * 4.2 * horizonMultiplier),
          multiCapitalLift: `+${Math.min(100, Math.round(84 * (governanceConsensus / 100) + activePolicyBonus / 3))}%`,
          riskLevel: "HIGH REGENERATION",
          narrative: `Full 1.8km volcanic sponge corridor + decentralized youth maintenance guilds. Flooding converted into clean urban water retention and community agriculture over ${timeHorizonYears} years.`,
        };
      }
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
      const runs = Array.from({ length: 8 }, (_, i) => {
        const baseRes =
          governanceConsensus * 0.75 +
          blendedCapitalInflow * 0.04 -
          extremeRainfallEvent * 0.15 +
          activePolicyBonus * 0.3;
        const variance = (Math.random() * 12) - 6;
        const res = Math.min(99, Math.max(25, Math.round(baseRes + variance)));
        const floodSaved = Number(((res / 100) * 14.2).toFixed(2));
        return {
          run: i + 1,
          resiliencePct: res,
          floodLossAvoidedM: floodSaved,
          confidence: res > 80 ? "95% CI High" : "80% CI Moderate",
          status: res > 85 ? "Optimal" : res > 75 ? "Buffer Tested" : "Volatile",
        };
      });
      setMonteCarloRuns(runs);
      setIsSimulating(false);
    }, 700);
  };

  const handleLoadPreset = (presetId: string) => {
    if (!presetId) {
      setSelectedPresetId("");
      return;
    }
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(presetId);
    setSelectedScenario(preset.scenario);
    setGovernanceConsensus(preset.governanceConsensus);
    setBlendedCapitalInflow(preset.blendedCapitalInflow);
    setExtremeRainfallEvent(preset.extremeRainfallEvent);
    setTimeHorizonYears(preset.timeHorizonYears);

    setPolicies((prev) =>
      prev.map((p) => ({
        ...p,
        active: preset.activePolicies.includes(p.id),
      }))
    );

    recordSavedChange?.(`Scenario Engine: Loaded "${preset.name}" preset`);
    setPresetFeedback(`Initialized: "${preset.name}" — ${preset.description}`);
    setTimeout(() => setPresetFeedback(null), 5000);
  };

  const handleSaveSnapshot = (customName?: string, customNotes?: string) => {
    const currentOutcome = calculateOutcomes();
    const scenarioLabelMap: Record<string, string> = {
      "status-quo": "Status Quo",
      "local-pilot": "Local Pilot",
      "10x-scale": "10x Scale",
      "assumption-failure": "Stress Test",
    };
    const defaultTitle = `Run #${snapshots.length + 1} - ${scenarioLabelMap[selectedScenario]} (${timeHorizonYears}yr)`;
    const finalName = customName || snapshotNameInput.trim() || defaultTitle;

    const now = new Date();
    const timeFormatted = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newSnap: ScenarioSnapshot = {
      id: `snap-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeFormatted,
      name: finalName,
      notes:
        customNotes ||
        snapshotNotesInput.trim() ||
        `Parameters: Alignment ${governanceConsensus}%, Capital $${blendedCapitalInflow}k, Peak storm ${extremeRainfallEvent}mm/hr`,
      scenario: selectedScenario,
      governanceConsensus,
      blendedCapitalInflow,
      extremeRainfallEvent,
      timeHorizonYears,
      activePolicies: policies.filter((p) => p.active).map((p) => p.id),
      outcomes: currentOutcome,
    };

    const updated = [newSnap, ...snapshots];
    setSnapshots(updated);
    try {
      localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    setIsSavingSnapshot(false);
    setSnapshotNameInput("");
    setSnapshotNotesInput("");
    setSnapshotToast(`Snapshot "${finalName}" saved to history log!`);
    setTimeout(() => setSnapshotToast(null), 3500);
  };

  const handleLoadSnapshot = (snap: ScenarioSnapshot) => {
    setSelectedScenario(snap.scenario);
    setGovernanceConsensus(snap.governanceConsensus);
    setBlendedCapitalInflow(snap.blendedCapitalInflow);
    setExtremeRainfallEvent(snap.extremeRainfallEvent);
    setTimeHorizonYears(snap.timeHorizonYears);
    setPolicies((prev) =>
      prev.map((p) => ({
        ...p,
        active: snap.activePolicies.includes(p.id),
      }))
    );
    setActiveTab("simulator");
    setSnapshotToast(`Restored snapshot: "${snap.name}"`);
    setTimeout(() => setSnapshotToast(null), 3000);
  };

  const handleDeleteSnapshot = (id: string) => {
    const updated = snapshots.filter((s) => s.id !== id);
    setSnapshots(updated);
    try {
      localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
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
- Active Policy Boost: +${activePolicyBonus}% flood reduction

## SIMULATED OUTCOMES
- Cumulative Flood Losses: $${(outcome.floodLossesUSD / 1000000).toFixed(1)}M USD
- Residents Protected: ${outcome.residentsProtected.toLocaleString()}
- Regenerative Jobs Created: ${outcome.jobsCreated}
- 7-Capitals Lift: ${outcome.multiCapitalLift}
- Trajectory: ${outcome.narrative}

## ACTIVE POLICIES IN SANDBOX
${policies.filter((p) => p.active).map((p) => `- ${p.name}: ${p.description}`).join("\n")}
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
            Simulate the future before committing real capital. Compare counterfactual trajectories: Status Quo baseline, Local Prototype, 10x Scale, and Assumption Failure stress-tests across intergenerational horizons.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Load Preset Dropdown */}
          <div className="relative flex items-center space-x-1.5 bg-[#141414] border border-white/20 hover:border-[#c5a059] px-2.5 py-1 text-xs font-mono transition-all shadow-sm">
            <FolderOpen className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
            <select
              id="select-load-scenario-preset"
              value={selectedPresetId}
              onChange={(e) => handleLoadPreset(e.target.value)}
              className="bg-transparent text-white text-xs font-mono focus:outline-none cursor-pointer py-1 pr-2"
              title="Quickly initialize engine with pre-configured systemic crisis or growth scenario"
            >
              <option value="" className="bg-[#141414] text-white/50">
                ⚡ LOAD PRESET...
              </option>
              <optgroup label="🚨 SYSTEMIC CRISIS SCENARIOS" className="bg-[#181010] text-rose-300 font-bold">
                {SCENARIO_PRESETS.filter((p) => p.category === "crisis").map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#141414] text-rose-200">
                    {p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="🌱 REGENERATIVE GROWTH SCENARIOS" className="bg-[#0e1812] text-emerald-300 font-bold">
                {SCENARIO_PRESETS.filter((p) => p.category === "growth").map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#141414] text-emerald-200">
                    {p.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Save Snapshot Button */}
          <button
            id="btn-save-scenario-snapshot"
            onClick={() => setIsSavingSnapshot(true)}
            className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono transition-all flex items-center space-x-1.5 shadow-sm"
            title="Save current simulation levers and outcomes as a snapshot"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>SAVE SNAPSHOT</span>
          </button>

          <button
            onClick={handleExportScenario}
            className="px-4 py-2 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>EXPORT SCENARIO</span>
          </button>
        </div>
      </div>

      {/* Preset Feedback Toast */}
      {presetFeedback && (
        <div className="p-3 bg-[#191408] border border-[#c5a059] text-[#ffd700] text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#c5a059] animate-pulse" />
            <span>{presetFeedback}</span>
          </div>
          <span className="text-[10px] text-white/50 uppercase tracking-wider">PRESET ACTIVE</span>
        </div>
      )}

      {/* Snapshot Toast Feedback */}
      {snapshotToast && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{snapshotToast}</span>
          </div>
          <button
            onClick={() => setActiveTab("history")}
            className="underline hover:text-white text-[11px] uppercase tracking-wider"
          >
            View History Log →
          </button>
        </div>
      )}

      {/* Save Snapshot Modal / Dialog */}
      {isSavingSnapshot && (
        <div className="p-6 bg-[#121212] border border-[#c5a059] shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <BookmarkPlus className="w-4 h-4 text-[#c5a059]" />
              <h4 className="font-serif text-lg text-white font-medium">
                Save Current Simulation Snapshot
              </h4>
            </div>
            <button
              onClick={() => setIsSavingSnapshot(false)}
              className="text-white/40 hover:text-white text-xs font-mono"
            >
              ✕ CANCEL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-white/60 block mb-1 uppercase tracking-wider text-[10px]">
                Snapshot Title / Label:
              </label>
              <input
                type="text"
                value={snapshotNameInput}
                onChange={(e) => setSnapshotNameInput(e.target.value)}
                placeholder={`Run #${snapshots.length + 1} - ${selectedScenario.toUpperCase()} (${timeHorizonYears}yr)`}
                className="w-full bg-[#080808] border border-white/15 px-3 py-2 text-white outline-none focus:border-[#c5a059]"
                autoFocus
              />
            </div>

            <div>
              <label className="text-white/60 block mb-1 uppercase tracking-wider text-[10px]">
                Strategic Notes (Optional):
              </label>
              <input
                type="text"
                value={snapshotNotesInput}
                onChange={(e) => setSnapshotNotesInput(e.target.value)}
                placeholder="e.g., Stress tested with 45mm/hr peak surge and 85% consensus"
                className="w-full bg-[#080808] border border-white/15 px-3 py-2 text-white outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={() => setIsSavingSnapshot(false)}
              className="px-4 py-2 border border-white/10 text-white/60 hover:text-white text-xs font-mono uppercase"
            >
              Cancel
            </button>
            <button
              id="btn-confirm-save-snapshot"
              onClick={() => handleSaveSnapshot()}
              className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Confirm & Save to History</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono overflow-x-auto scrollbar-none">
        {[
          { id: "simulator", label: "INTERACTIVE SIMULATOR", icon: Sliders },
          { id: "history", label: `HISTORY LOG & COMPARE (${snapshots.length})`, icon: History },
          { id: "matrix", label: "SCENARIO COMPARISON MATRIX", icon: Scale },
          { id: "policy", label: "POLICY INTERVENTION SANDBOX", icon: Layers },
          { id: "monte-carlo", label: "MONTE CARLO SENSITIVITY", icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === tab.id
                  ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: HISTORY LOG & SNAPSHOT COMPARISON */}
      {activeTab === "history" && (
        <ScenarioHistoryLog
          snapshots={snapshots}
          onLoadSnapshot={handleLoadSnapshot}
          onDeleteSnapshot={handleDeleteSnapshot}
          onSaveNewSnapshot={(name, notes) => handleSaveSnapshot(name, notes)}
        />
      )}

      {/* TAB 1: INTERACTIVE SIMULATOR */}
      {activeTab === "simulator" && (
        <>
          {/* Quick Snapshot Toggle Strip */}
          <div className="p-3 bg-[#0a0a0a] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2 text-white/50 text-[10px] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Toggle Previous Runs:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {snapshots.slice(0, 4).map((snap) => (
                <button
                  key={`quick-${snap.id}`}
                  onClick={() => handleLoadSnapshot(snap)}
                  className="px-2.5 py-1 bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-[#c5a059] text-[10px] transition-all flex items-center space-x-1"
                  title={`Restore "${snap.name}" - ${snap.scenario} (${snap.timeHorizonYears}yr)`}
                >
                  <RotateCcw className="w-2.5 h-2.5 text-[#c5a059]" />
                  <span className="truncate max-w-[140px]">{snap.name}</span>
                </button>
              ))}
              <button
                onClick={() => setActiveTab("history")}
                className="px-2 py-1 text-[10px] text-[#c5a059] hover:underline"
              >
                All Snapshots ({snapshots.length}) →
              </button>
            </div>
          </div>

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                  <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-[#c5a059]" />
                    <span>Simulation Parameters</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <select
                      id="select-load-scenario-preset-card"
                      value={selectedPresetId}
                      onChange={(e) => handleLoadPreset(e.target.value)}
                      className="bg-[#121212] border border-white/20 text-white text-[10px] font-mono px-2 py-1 focus:outline-none cursor-pointer"
                      title="Load preset scenario"
                    >
                      <option value="">⚡ PRESETS...</option>
                      <optgroup label="🚨 CRISIS">
                        {SCENARIO_PRESETS.filter((p) => p.category === "crisis").map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="🌱 GROWTH">
                        {SCENARIO_PRESETS.filter((p) => p.category === "growth").map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                    </select>
                    <button
                      onClick={() => {
                        setGovernanceConsensus(85);
                        setBlendedCapitalInflow(350);
                        setExtremeRainfallEvent(45);
                        setTimeHorizonYears(10);
                        recordSavedChange?.("Scenario Engine: Reset to default baseline");
                      }}
                      className="text-[10px] text-white/40 hover:text-white flex items-center space-x-1 font-mono uppercase tracking-wider"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
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
                    onChange={(e) => {
                      setGovernanceConsensus(Number(e.target.value));
                    }}
                    onPointerUp={() => recordSavedChange?.("Scenario Engine: Community Alignment adjusted")}
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
                    onChange={(e) => {
                      setBlendedCapitalInflow(Number(e.target.value));
                    }}
                    onPointerUp={() => recordSavedChange?.("Scenario Engine: Blended Capital adjusted")}
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
                    onChange={(e) => {
                      setExtremeRainfallEvent(Number(e.target.value));
                    }}
                    onPointerUp={() => recordSavedChange?.("Scenario Engine: Storm Intensity adjusted")}
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
                    onChange={(e) => {
                      setTimeHorizonYears(Number(e.target.value));
                    }}
                    onPointerUp={() => recordSavedChange?.("Scenario Engine: Time Horizon adjusted")}
                    className="w-full accent-purple-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                {/* Active Policy Boost Badge */}
                {activePolicyBonus > 0 && (
                  <div className="p-3 bg-[#0a1610] border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center justify-between">
                    <span>Active Policy Boost:</span>
                    <span className="font-bold">+{activePolicyBonus}% Shielding</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Simulated Outcomes (7 cols) */}
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
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                      Cumulative Flood Losses
                    </span>
                    <div className="text-lg font-serif font-light text-white">
                      ${(outcome.floodLossesUSD / 1000000).toFixed(1)}M
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                      People Protected
                    </span>
                    <div className="text-lg font-serif font-light text-emerald-400">
                      {outcome.residentsProtected.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                      Regenerative Jobs
                    </span>
                    <div className="text-lg font-serif font-light text-sky-400">
                      {outcome.jobsCreated}
                    </div>
                  </div>

                  <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                      7-Capitals Lift
                    </span>
                    <div className="text-lg font-serif font-light text-[#c5a059]">
                      {outcome.multiCapitalLift}
                    </div>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="p-5 bg-[#080808] border border-white/5 space-y-1 text-xs">
                  <span className="font-mono text-white/40 uppercase text-[10px] tracking-wider">
                    Trajectory Narrative:
                  </span>
                  <p className="text-white/70 leading-relaxed font-sans">{outcome.narrative}</p>
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

      {/* TAB 2: SCENARIO MATRIX */}
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

      {/* TAB 3: POLICY INTERVENTION SANDBOX */}
      {activeTab === "policy" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              <Layers className="w-3.5 h-3.5" />
              <span>REGULATORY & GOVERNANCE INTERVENTION LEVERS</span>
            </div>
            <h3 className="font-serif text-2xl text-white">Policy Intervention Sandbox</h3>
            <p className="text-xs text-white/50 font-serif italic">
              Toggle systemic regulatory instruments to evaluate how legal covenants and community property rights amplify physical engineering resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((pol) => (
              <div
                key={pol.id}
                onClick={() => togglePolicy(pol.id)}
                className={`p-5 border cursor-pointer transition-all space-y-3 ${
                  pol.active
                    ? "bg-[#0a1610] border-emerald-600 text-white"
                    : "bg-[#080808] hover:bg-[#111111] border-white/10 text-white/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold">{pol.name}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 border uppercase ${
                        pol.active
                          ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                          : "bg-white/5 text-white/40 border-white/10"
                      }`}
                    >
                      {pol.active ? "ACTIVE POLICY" : "OFFLINE"}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    +{pol.floodReductionBonusPct}% Impact
                  </span>
                </div>

                <p className="text-xs text-white/70 font-sans leading-relaxed">{pol.description}</p>

                <div className="pt-2 border-t border-white/5 text-[11px] text-white/50 font-sans">
                  <strong>Equity Impact:</strong> {pol.socialEquityImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MONTE CARLO SENSITIVITY */}
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
              <span>{isSimulating ? "SIMULATING TRIALS..." : "RUN STOCHASTIC TRIALS (8 BATCHES)"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            {monteCarloRuns.map((r) => (
              <div key={r.run} className="p-4 bg-[#080808] border border-white/10 space-y-2">
                <div className="flex justify-between text-white/40 text-[10px] uppercase">
                  <span>Iteration #{r.run}</span>
                  <span className="text-emerald-400 font-bold">{r.resiliencePct}%</span>
                </div>
                <div className="text-base font-serif text-white">${r.floodLossAvoidedM}M USD Saved</div>
                <div className="flex items-center justify-between text-[9px] text-[#c5a059]">
                  <span>{r.confidence}</span>
                  <span className="text-white/40">[{r.status}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

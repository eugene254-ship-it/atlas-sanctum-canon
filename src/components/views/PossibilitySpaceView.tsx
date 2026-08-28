import React, { useState } from "react";
import {
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BarChart3,
  Search,
  Plus
} from "lucide-react";
import { PossibilityDossier, PossibilityHorizon, NavigationSpace, SevenCapitalType } from "../../types";
import { POSSIBILITY_DOSSIERS } from "../../data/seedData";

interface PossibilitySpaceViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const PossibilitySpaceView: React.FC<PossibilitySpaceViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [dossiers, setDossiers] = useState<PossibilityDossier[]>(POSSIBILITY_DOSSIERS);
  const [selectedDossier, setSelectedDossier] = useState<PossibilityDossier>(POSSIBILITY_DOSSIERS[0]);
  const [selectedHorizon, setSelectedHorizon] = useState<string>("all");

  const horizons: { id: string; label: string; count: number; color: string }[] = [
    { id: "all", label: "All Possibilities", count: dossiers.length, color: "text-white/40" },
    { id: "near-term-feasible", label: "Near-Term Feasible", count: dossiers.filter((d) => d.horizon === "near-term-feasible").length, color: "text-emerald-400" },
    { id: "transformational", label: "Transformational 10x", count: dossiers.filter((d) => d.horizon === "transformational").length, color: "text-[#c5a059]" },
    { id: "long-shot-frontier", label: "Long-Shot Frontier", count: dossiers.filter((d) => d.horizon === "long-shot-frontier").length, color: "text-purple-400" },
    { id: "unknown-horizon", label: "Unknown (Research)", count: dossiers.filter((d) => d.horizon === "unknown-horizon").length, color: "text-sky-400" },
  ];

  const filteredDossiers = dossiers.filter((d) => {
    return selectedHorizon === "all" || d.horizon === selectedHorizon;
  });

  const getHorizonBadge = (h: PossibilityHorizon) => {
    switch (h) {
      case "near-term-feasible":
        return "bg-[#0a1610] text-emerald-300 border-emerald-800/60";
      case "transformational":
        return "bg-[#181308] text-[#c5a059] border-[#c5a059]/40";
      case "long-shot-frontier":
        return "bg-[#140d1a] text-purple-300 border-purple-800/60";
      case "unknown-horizon":
        return "bg-[#0b141a] text-sky-300 border-sky-800/60";
      default:
        return "bg-[#111111] text-white/70 border-white/10";
    }
  };

  const capitalsList: SevenCapitalType[] = [
    "Human",
    "Social",
    "Intellectual",
    "Natural",
    "Financial",
    "Physical",
    "Institutional",
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STRUCTURED IMAGINATION MATRIX</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Possibility Space Engine
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Transform chronic problems into structured possibility spaces: Near-term feasible, Transformational 10x, Long-shot frontier, and Unknown horizons.
          </p>
        </div>

        <button
          onClick={() => {
            const title = prompt("Enter New Possibility Title (e.g. 'Decentralized Micro-Hydro Swarms'):");
            if (title && title.trim()) {
              const newDossier: PossibilityDossier = {
                id: `poss-${Date.now()}`,
                title: title.trim(),
                horizon: "transformational",
                mechanism: "Newly synthesized possibility mechanism ready for experimental protocol design.",
                coreAssumptions: ["Local micro-fabrication capacity exists"],
                enablingTechnologies: ["Low-head Pelton turbines", "Edge IoT telemetry"],
                requiredCapabilities: ["Local electrical assembly"],
                affectedStakeholders: ["Riparian households", "Local energy users"],
                potentialBeneficiaries: ["Over 12,000 off-grid residents"],
                risks: ["Seasonal river flow variation"],
                secondOrderEffects: ["Empowers rural cottage industries"],
                capitalRequirementEstimate: "$75,000 USD pilot",
                implementationDifficulty: "medium",
                expectedOutcomes: ["100% off-grid clean continuous power"],
                reversibility: "high",
                confidenceScore: 0.85,
                evidenceBase: ["Pilot turbine bench tests in Eldoret"],
                experimentRequired: "Deploy a 5kW test skid on Nzoia tributary over 30 days.",
                placeContext: "Western Kenya",
                sevenCapitalsDelta: {
                  Human: 30,
                  Social: 35,
                  Intellectual: 40,
                  Natural: 50,
                  Financial: 45,
                  Physical: 40,
                  Institutional: 25
                }
              };
              setDossiers([newDossier, ...dossiers]);
              setSelectedDossier(newDossier);
            }
          }}
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Synthesize Possibility</span>
        </button>
      </div>

      {/* Horizon Filter Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {horizons.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHorizon(h.id)}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all flex items-center space-x-2 ${
              selectedHorizon === h.id
                ? "bg-[#c5a059] text-[#080808] font-bold shadow-sm"
                : "bg-[#0c0c0c] text-white/40 hover:text-white border border-white/10"
            }`}
          >
            <span className={h.color}>●</span>
            <span>{h.label} ({h.count})</span>
          </button>
        ))}
      </div>

      {/* 2-Column Split: Possibility Cards (5 cols) + Full Dossier (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredDossiers.map((d) => {
            const isSelected = selectedDossier.id === d.id;
            return (
              <div
                key={d.id}
                onClick={() => setSelectedDossier(d)}
                className={`p-5 border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? "bg-[#111111] border-[#c5a059] shadow-md"
                    : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className={`px-2 py-0.5 border text-[9px] ${getHorizonBadge(d.horizon)}`}>
                    {d.horizon.replace("-", " ")}
                  </span>
                  <span className="text-white/40">Confidence: {Math.round(d.confidenceScore * 100)}%</span>
                </div>

                <h4 className="font-serif font-normal text-base text-white leading-snug">
                  {d.title}
                </h4>

                <p className="text-xs text-white/50 line-clamp-2 font-sans">
                  {d.mechanism}
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/5">
                  <span>{d.placeContext}</span>
                  <span className="text-[#c5a059]">{d.capitalRequirementEstimate.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full 14-Point Possibility Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            {/* Dossier Header */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className={`px-3 py-1 border font-semibold ${getHorizonBadge(selectedDossier.horizon)}`}>
                  {selectedDossier.horizon.toUpperCase()}
                </span>
                <span className="text-white/40">
                  Difficulty: <strong className="text-[#c5a059]">{selectedDossier.implementationDifficulty}</strong> • Reversibility: <strong className="text-emerald-400">{selectedDossier.reversibility}</strong>
                </span>
              </div>

              <h3 className="font-serif font-light text-2xl text-white">
                {selectedDossier.title}
              </h3>

              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                Context: <strong className="text-white/80">{selectedDossier.placeContext}</strong> • Capital: <strong className="text-[#c5a059]">{selectedDossier.capitalRequirementEstimate}</strong>
              </div>
            </div>

            {/* Core Mechanism */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                1. Systemic Mechanism
              </h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {selectedDossier.mechanism}
              </p>
            </div>

            {/* Assumptions & Enabling Tech */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-[#080808] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.2em]">Core Assumptions</span>
                <ul className="text-xs space-y-1.5 text-white/60 font-sans">
                  {selectedDossier.coreAssumptions.map((a, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#c5a059] font-bold">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-[#080808] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-[0.2em]">Enabling Technologies</span>
                <ul className="text-xs space-y-1.5 text-white/60 font-sans">
                  {selectedDossier.enablingTechnologies.map((t, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7-Capitals Delta Radar Bars */}
            <div className="p-5 bg-[#080808] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className="text-white/40">Estimated 7-Capitals Impact Delta</span>
                <span className="text-emerald-400 font-bold">Net Positive Regeneration</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {capitalsList.map((cap) => {
                  const val = selectedDossier.sevenCapitalsDelta[cap] || 0;
                  return (
                    <div key={cap} className="p-2.5 bg-[#121212] border border-white/5 text-[10px] font-mono">
                      <div className="flex justify-between text-white/50 mb-1">
                        <span>{cap}</span>
                        <span className="text-emerald-400 font-bold">+{val}</span>
                      </div>
                      <div className="w-full bg-[#080808] h-1">
                        <div className="bg-[#c5a059] h-full" style={{ width: `${Math.min(100, val * 1.2)}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SMALLEST REAL-WORLD EXPERIMENT (The Critical Mandate) */}
            <div className="p-5 bg-[#12100a] border border-[#c5a059]/40 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                <span className="flex items-center space-x-2 font-bold">
                  <Compass className="w-4 h-4" />
                  <span>SMALLEST REAL-WORLD INTERVENTION TO PROVE IT</span>
                </span>
                <span className="text-white/40">Falsification Protocol</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-serif italic leading-relaxed">
                "{selectedDossier.experimentRequired}"
              </p>
            </div>

            {/* Action Bridge */}
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => onNavigate("studio")}
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all shadow-lg"
              >
                <span>Launch Experiment in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import {
  Cpu,
  Sparkles,
  ShieldCheck,
  Activity,
  Compass,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  BookOpen,
  Plus,
  Play,
  RotateCw,
  Globe,
  Sliders,
  Filter
} from "lucide-react";
import { CivilizationDimension, NavigationSpace } from "../../types";
import { CIVILIZATION_DIMENSIONS } from "../../data/seedData";

interface CivilizationDashboardViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const CivilizationDashboardView: React.FC<CivilizationDashboardViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [dimensions, setDimensions] = useState<CivilizationDimension[]>(CIVILIZATION_DIMENSIONS);
  const [selectedDim, setSelectedDim] = useState<CivilizationDimension>(CIVILIZATION_DIMENSIONS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResults, setAuditResults] = useState<
    Array<{ title: string; status: string; desc: string; score: number }>
  >([
    { title: "Non-Extractive Capital Guarantee", status: "Verified", desc: "No speculative displacement or debt-traps.", score: 98 },
    { title: "Polycentric Community Governance", status: "Verified", desc: "Local elder councils maintain veto rights.", score: 94 },
    { title: "Ecological Carrying Capacity Law", status: "Verified", desc: "Interventions regenerate watershed buffers.", score: 91 },
    { title: "AI Explainability & Epistemic Humility", status: "Verified", desc: "Zero black-box hallucinations in field actions.", score: 96 },
  ]);

  const [newInterventionText, setNewInterventionText] = useState("");

  const avgScore = Math.round(
    dimensions.reduce((acc, curr) => acc + curr.score, 0) / dimensions.length
  );

  const handleRunMoralAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResults([
        { title: "Non-Extractive Capital Guarantee", status: "Verified (Pass 100%)", desc: "No speculative displacement or debt-traps. Strict capital covenants enforced.", score: 100 },
        { title: "Polycentric Community Governance", status: "Verified (Pass 96%)", desc: "Local elder councils hold irreversible veto key on land lease terms.", score: 96 },
        { title: "Ecological Carrying Capacity Law", status: "Verified (Pass 95%)", desc: "Groundwater recharge exceeds extraction velocity by 1.8x factor.", score: 95 },
        { title: "AI Explainability & Epistemic Humility", status: "Verified (Pass 99%)", desc: "Full provenance chain and ethical constraint verification logged.", score: 99 },
      ]);
      setIsAuditing(false);
    }, 900);
  };

  const handleAddIntervention = () => {
    if (!newInterventionText.trim()) return;
    const updated = dimensions.map((d) => {
      if (d.id !== selectedDim.id) return d;
      return {
        ...d,
        strategicInterventions: [...d.strategicInterventions, newInterventionText.trim()],
      };
    });
    setDimensions(updated);
    setSelectedDim((prev) => ({
      ...prev,
      strategicInterventions: [...prev.strategicInterventions, newInterventionText.trim()],
    }));
    setNewInterventionText("");
  };

  const filteredDimensions = dimensions.filter((d) => {
    if (categoryFilter === "all") return true;
    return d.category.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-purple-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>CIVILIZATION-SCALE MACRO DIAGNOSTICS & MORAL AUDITING</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Civilization Vitality Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Beyond GDP and simple financial extraction. Track the macro-vitality of human civilization across physical survival, institutional trust, technological sovereignty, and moral intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRunMoralAudit}
            disabled={isAuditing}
            className="px-4 py-2 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
            <span>{isAuditing ? "RUNNING CONSCIENCE AUDIT..." : "RUN MORAL AUDIT"}</span>
          </button>

          <div className="p-4 bg-[#080808] border border-white/10 text-xs font-mono flex items-center space-x-3">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">Civilization Index:</span>
            <span className="text-[#c5a059] font-bold text-lg">{avgScore}/100</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="p-3 bg-[#0a0a0a] border border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-white/40 text-[10px] uppercase px-2">Filter Pillars:</span>
        {[
          { id: "all", label: "ALL PILLARS (8)" },
          { id: "physical", label: "PHYSICAL & ECOLOGICAL" },
          { id: "institutional", label: "INSTITUTIONAL & TRUST" },
          { id: "intellectual", label: "TECH & INTELLECTUAL" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all ${
              categoryFilter === tab.id
                ? "bg-[#c5a059] text-[#080808] font-bold"
                : "bg-[#121212] hover:bg-[#181818] text-white/60 hover:text-white border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 8 Macro Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDimensions.map((dim) => {
          const isSelected = selectedDim.id === dim.id;
          return (
            <div
              key={dim.id}
              onClick={() => setSelectedDim(dim)}
              className={`p-5 border cursor-pointer transition-all space-y-3 ${
                isSelected
                  ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                  : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                <span className="text-white/40 font-bold">{dim.category}</span>
                <span
                  className={`px-2 py-0.5 border text-[9px] ${
                    dim.score > 60
                      ? "text-emerald-300 bg-[#0a1610] border-emerald-800"
                      : "text-[#c5a059] bg-[#181308] border-[#c5a059]/40"
                  }`}
                >
                  {dim.score}/100
                </span>
              </div>

              <h4 className="font-serif font-normal text-base text-white truncate">
                {dim.name}
              </h4>

              <div className="w-full bg-[#080808] h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-[#c5a059] h-full transition-all duration-500"
                  style={{ width: `${dim.score}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1">
                <span>Trend: <strong className="text-white/70 uppercase">{dim.trend}</strong></span>
                <span>{dim.benchmarkGlobal}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pillar Diagnostic Deep-Dive & Moral Intelligence Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dimension Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>CIVILIZATION PILLAR: {selectedDim.category.toUpperCase()}</span>
                <span className="text-white/40">Score: {selectedDim.score}/100</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {selectedDim.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {selectedDim.description}
              </p>
            </div>

            {/* Empirical Sub-Indicators */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Constituent Empirical Indicators
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedDim.subIndicators.map((ind, i) => (
                  <div key={i} className="p-4 bg-[#080808] border border-white/10 space-y-1 text-xs">
                    <span className="text-[9px] font-mono text-white/40 uppercase truncate block">{ind.name}</span>
                    <div className="text-base font-serif font-light text-white">{ind.value}</div>
                    <span className="text-[9px] font-mono text-emerald-400">Status: {ind.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Interventions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.25em] font-semibold">
                  Strategic Interventions Required
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  {selectedDim.strategicInterventions.length} Direct Protocols
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedDim.strategicInterventions.map((intv, i) => (
                  <span key={i} className="text-xs px-3.5 py-1.5 bg-[#080808] border border-white/10 text-white/80 font-sans">
                    ✦ {intv}
                  </span>
                ))}
              </div>

              {/* Add Custom Intervention */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newInterventionText}
                  onChange={(e) => setNewInterventionText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddIntervention()}
                  placeholder="Draft system intervention (e.g. 'Deploy solar mesh micro-grid network')..."
                  className="flex-1 px-3 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
                />
                <button
                  onClick={handleAddIntervention}
                  className="px-3 py-2 bg-[#181308] border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-xs font-mono font-bold transition-all"
                >
                  ADD PROTOCOL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Moral Intelligence & AI Conscience Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-purple-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MORAL INTELLIGENCE AUDIT</span>
              </div>
              <span className="text-[9px] text-[#c5a059] font-mono uppercase tracking-wider">Canon Pillar #1 Anchor</span>
            </div>

            <p className="text-xs text-white/60 font-serif italic leading-relaxed">
              Every system calculation must pass the Atlas Moral Intelligence Filter to verify non-harm, human agency expansion, intergenerational equity, and truth preservation.
            </p>

            <div className="space-y-2.5">
              {auditResults.map((check, i) => (
                <div key={i} className="p-3.5 bg-[#080808] border border-white/10 flex items-start justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-normal text-white font-serif">{check.title}</div>
                    <div className="text-[10px] text-white/40 font-sans">{check.desc}</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-800 shrink-0">
                    {check.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate("studio")}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Align Studio with Civilization Goals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

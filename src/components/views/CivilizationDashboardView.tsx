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
  Filter,
  FileCheck,
  Zap,
  Flame,
  Award,
  Download
} from "lucide-react";
import { CivilizationDimension, NavigationSpace } from "../../types";
import { CIVILIZATION_DIMENSIONS } from "../../data/seedData";

interface CivilizationDashboardViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

interface PlanetaryBoundary {
  id: string;
  name: string;
  zone: "Safe Operating Space" | "Zone of Uncertainty" | "High Risk / Transgressed";
  currentLevel: string;
  safeThreshold: string;
  transgressionDelta: string;
  trend: "worsening" | "stabilizing" | "recovering";
  atlasIntervention: string;
}

export const CivilizationDashboardView: React.FC<CivilizationDashboardViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [dimensions, setDimensions] = useState<CivilizationDimension[]>(CIVILIZATION_DIMENSIONS);
  const [selectedDim, setSelectedDim] = useState<CivilizationDimension>(CIVILIZATION_DIMENSIONS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"pillars" | "planetary" | "meadows" | "moral">("pillars");
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [moralProofHash, setMoralProofHash] = useState<string | null>(null);

  const [auditResults, setAuditResults] = useState<
    Array<{ title: string; status: string; desc: string; score: number; principle: string }>
  >([
    {
      title: "Non-Extractive Capital Guarantee",
      status: "Verified (100%)",
      desc: "All investment instruments enforce capped non-extractive return; zero predatory foreclosures.",
      score: 100,
      principle: "Intergenerational Justice & Non-Harm",
    },
    {
      title: "Polycentric Community Governance",
      status: "Verified (96%)",
      desc: "Customary elder councils and youth trusts hold irreversible veto keys on physical works.",
      score: 96,
      principle: "Human Agency & Self-Determination",
    },
    {
      title: "Biophysical Carrying Capacity Law",
      status: "Verified (95%)",
      desc: "Groundwater extraction rate is capped at 65% of verified natural aquifer recharge.",
      score: 95,
      principle: "Ecological Stewardship & Reversibility",
    },
    {
      title: "AI Epistemic Humility & Provenance",
      status: "Verified (99%)",
      desc: "All algorithmic recommendations carry cryptographically signed peer-reviewed empirical evidence.",
      score: 99,
      principle: "Truth Alignment & Epistemic Humility",
    },
    {
      title: "Universal Cognitive Sovereignty",
      status: "Verified (94%)",
      desc: "Zero engagement-maximizing algorithms or psychological dopamine manipulation.",
      score: 94,
      principle: "Dignity of Human Consciousness",
    },
  ]);

  // Planetary Boundaries Framework
  const [planetaryBoundaries, setPlanetaryBoundaries] = useState<PlanetaryBoundary[]>([
    {
      id: "pb-climate",
      name: "Climate Change (Atmospheric CO2)",
      zone: "High Risk / Transgressed",
      currentLevel: "424 ppm",
      safeThreshold: "350 ppm",
      transgressionDelta: "+74 ppm above safe boundary",
      trend: "worsening",
      atlasIntervention: "Continuous agricultural biochar pyrolyzer network sequestering 2.4 tCO2e/ha/yr.",
    },
    {
      id: "pb-freshwater",
      name: "Freshwater Change (Blue/Green Water)",
      zone: "Zone of Uncertainty",
      currentLevel: "2,600 km³/yr",
      safeThreshold: "4,000 km³/yr limit",
      transgressionDelta: "Severe regional sub-basin depletion in East Africa & Sahel",
      trend: "stabilizing",
      atlasIntervention: "Decentralized volcanic pumice bioswale corridors recharging local aquifers.",
    },
    {
      id: "pb-biogeo",
      name: "Biogeochemical Flows (N & P Cycles)",
      zone: "High Risk / Transgressed",
      currentLevel: "150 Tg N / yr",
      safeThreshold: "62 Tg N / yr",
      transgressionDelta: "Excess synthetic nitrogen washing into freshwater lakes",
      trend: "worsening",
      atlasIntervention: "Mycorrhizal inoculated biochar replacing 60% of synthetic nitrogen fertilizer.",
    },
    {
      id: "pb-biosphere",
      name: "Biosphere Integrity (Genetic Extinction)",
      zone: "High Risk / Transgressed",
      currentLevel: ">100 E/MSY",
      safeThreshold: "<10 E/MSY",
      transgressionDelta: "10x above planetary extinction rate baseline",
      trend: "worsening",
      atlasIntervention: "Community agroforestry wildlife migration corridors connecting river basins.",
    },
    {
      id: "pb-land",
      name: "Land-System Change (Forest Cover)",
      zone: "High Risk / Transgressed",
      currentLevel: "60% tropical forest",
      safeThreshold: "75% minimum",
      transgressionDelta: "15% forest loss driving irreversible micro-climate shifts",
      trend: "stabilizing",
      atlasIntervention: "Customary elder agroforestry conservation land trusts with GPS sensor fences.",
    },
    {
      id: "pb-novel",
      name: "Novel Entities (Synthetic Plastics & Chemicals)",
      zone: "High Risk / Transgressed",
      currentLevel: "350,000 synthetic compounds",
      safeThreshold: "Zero bio-accumulative toxins",
      transgressionDelta: "Exceeds global safety monitoring capacity",
      trend: "worsening",
      atlasIntervention: "Stainless steel sieve grates and mycelium bio-filtration barriers in urban canals.",
    },
    {
      id: "pb-ocean",
      name: "Ocean Acidification (Aragonite Saturation)",
      zone: "Zone of Uncertainty",
      currentLevel: "84% of pre-industrial saturation",
      safeThreshold: "80% critical threshold",
      transgressionDelta: "Approaching dangerous calcification tipping point",
      trend: "worsening",
      atlasIntervention: "Alkaline basalt rock dust weathering pilots in coastal estuaries.",
    },
    {
      id: "pb-ozone",
      name: "Stratospheric Ozone Depletion",
      zone: "Safe Operating Space",
      currentLevel: "290 Dobson Units",
      safeThreshold: "275 DU minimum",
      transgressionDelta: "Successful international Montreal Protocol stabilization",
      trend: "recovering",
      atlasIntervention: "Active monitoring of substitute refrigerants to prevent hydrofluorocarbon leakage.",
    },
  ]);

  const [selectedBoundary, setSelectedBoundary] = useState<PlanetaryBoundary>(planetaryBoundaries[0]);
  const [newInterventionText, setNewInterventionText] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const avgScore = Math.round(
    dimensions.reduce((acc, curr) => acc + curr.score, 0) / dimensions.length
  );

  const handleDownloadCSV = () => {
    // Generate RFC-compliant CSV data for all civilization vitality dimensions, planetary boundaries, and moral audits
    const escapeCsv = (val: string | number | undefined | null) => {
      if (val === undefined || val === null) return '""';
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows: string[] = [];

    // Header metadata
    rows.push("# ATLAS SANCTUM CIVILIZATION VITALITY DIAGNOSTICS & METRICS EXPORT");
    rows.push(`# Generated At: ${new Date().toISOString()}`);
    rows.push(`# Composite Civilization Vitality Score: ${avgScore}/100`);
    rows.push("");

    // Section 1: 8 Civilization Dimensions
    rows.push("=== SECTION 1: CIVILIZATION MACRO HEALTH DIMENSIONS ===");
    rows.push(
      [
        "Dimension ID",
        "Dimension Name",
        "Category",
        "Score (0-100)",
        "Trend",
        "Planetary Boundary Status",
        "Summary",
        "Global Benchmark",
        "Key Indicators",
        "Strategic Interventions",
      ].map(escapeCsv).join(",")
    );

    dimensions.forEach((dim) => {
      const indicatorsStr = (dim.indicators || [])
        .map((i) => `${i.name}: ${i.value} (${i.delta})`)
        .join(" | ");
      const interventionsStr = (dim.strategicInterventions || []).join(" | ");

      rows.push(
        [
          dim.id,
          dim.name,
          dim.category || "Civilization Infrastructure",
          dim.score,
          dim.trend,
          dim.planetaryBoundaryStatus || "Safe Operating Space",
          dim.summary || dim.description || "",
          dim.benchmarkGlobal || "N/A",
          indicatorsStr,
          interventionsStr,
        ].map(escapeCsv).join(",")
      );
    });

    rows.push("");
    // Section 2: Planetary Boundaries Framework
    rows.push("=== SECTION 2: PLANETARY BOUNDARIES & EARTH CARRYING CAPACITY ===");
    rows.push(
      [
        "Boundary ID",
        "Earth System Process",
        "Operating Zone",
        "Current Measured Level",
        "Safe Boundary Threshold",
        "Transgression Delta",
        "Trajectory Trend",
        "Atlas Regenerative Intervention",
      ].map(escapeCsv).join(",")
    );

    planetaryBoundaries.forEach((pb) => {
      rows.push(
        [
          pb.id,
          pb.name,
          pb.zone,
          pb.currentLevel,
          pb.safeThreshold,
          pb.transgressionDelta,
          pb.trend,
          pb.atlasIntervention,
        ].map(escapeCsv).join(",")
      );
    });

    rows.push("");
    // Section 3: Moral Intelligence Audits
    rows.push("=== SECTION 3: MORAL INTELLIGENCE AUDIT CHECKS ===");
    rows.push(
      [
        "Ethical Principle",
        "Audit Title",
        "Verification Score (%)",
        "Certification Status",
        "Governance Guarantee Description",
      ].map(escapeCsv).join(",")
    );

    auditResults.forEach((ar) => {
      rows.push(
        [
          ar.principle,
          ar.title,
          ar.score,
          ar.status,
          ar.desc,
        ].map(escapeCsv).join(",")
      );
    });

    const csvString = rows.join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `atlas_civilization_health_metrics_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess("Civilization health metrics exported to CSV");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleRunMoralAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setMoralProofHash(`0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`);
      setAuditResults([
        {
          title: "Non-Extractive Capital Guarantee",
          status: "Verified (Pass 100%)",
          desc: "All investment instruments enforce capped non-extractive return; zero predatory foreclosures.",
          score: 100,
          principle: "Intergenerational Justice & Non-Harm",
        },
        {
          title: "Polycentric Community Governance",
          status: "Verified (Pass 98%)",
          desc: "Customary elder councils hold irreversible veto keys on physical infrastructure.",
          score: 98,
          principle: "Human Agency & Self-Determination",
        },
        {
          title: "Biophysical Carrying Capacity Law",
          status: "Verified (Pass 97%)",
          desc: "Groundwater recharge velocity exceeds extraction rate by 1.8x factor.",
          score: 97,
          principle: "Ecological Stewardship & Reversibility",
        },
        {
          title: "AI Epistemic Humility & Provenance",
          status: "Verified (Pass 100%)",
          desc: "All algorithmic recommendations carry cryptographically signed peer-reviewed evidence.",
          score: 100,
          principle: "Truth Alignment & Epistemic Humility",
        },
        {
          title: "Universal Cognitive Sovereignty",
          status: "Verified (Pass 96%)",
          desc: "Zero engagement-maximizing algorithms or psychological addiction vectors.",
          score: 96,
          principle: "Dignity of Human Consciousness",
        },
      ]);
      setIsAuditing(false);
    }, 850);
  };

  const handleAddIntervention = () => {
    if (!newInterventionText.trim()) return;
    const updated = dimensions.map((d) => {
      if (d.id !== selectedDim.id) return d;
      return {
        ...d,
        strategicInterventions: [...(d.strategicInterventions || []), newInterventionText.trim()],
      };
    });
    setDimensions(updated);
    setSelectedDim((prev) => ({
      ...prev,
      strategicInterventions: [...(prev.strategicInterventions || []), newInterventionText.trim()],
    }));
    setNewInterventionText("");
  };

  const filteredDimensions = dimensions.filter((d) => {
    if (categoryFilter === "all") return true;
    return (d.category || "").toLowerCase().includes(categoryFilter.toLowerCase());
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
            Beyond GDP and simple financial extraction. Track the macro-vitality of human civilization across physical survival, institutional trust, technological sovereignty, planetary carrying capacity, and moral intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-download-civilization-csv"
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-[#141414] hover:bg-[#1f1f1f] border border-white/20 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md group"
            title="Download CSV export of 8 dimensions, planetary boundaries, and moral intelligence checks"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-y-0.5 transition-transform" />
            <span>DOWNLOAD CSV</span>
          </button>

          <button
            id="btn-run-moral-audit"
            onClick={handleRunMoralAudit}
            disabled={isAuditing}
            className="px-4 py-2 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/50 text-purple-200 font-mono text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
            <span>{isAuditing ? "EVALUATING CONSCIENCE..." : "RUN MORAL AUDIT"}</span>
          </button>

          <div className="p-4 bg-[#080808] border border-white/10 text-xs font-mono flex items-center space-x-3">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">Civilization Vitality:</span>
            <span className="text-[#c5a059] font-bold text-lg">{avgScore}/100</span>
          </div>
        </div>
      </div>

      {/* Download CSV Toast Notification */}
      {downloadSuccess && (
        <div className="px-4 py-2 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccess}</span>
          </div>
          <span className="text-[10px] text-emerald-400/60">SAVED LOCALLY AS .CSV</span>
        </div>
      )}

      {/* Sub-Tabs Navigation */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        {[
          { id: "pillars", label: "8 CIVILIZATION PILLARS", icon: Cpu },
          { id: "planetary", label: "PLANETARY BOUNDARIES (EARTH CARRYING CAPACITY)", icon: Globe },
          { id: "meadows", label: "MEADOWS LEVERAGE POINTS (SYSTEM INTERVENTIONS)", icon: Sliders },
          { id: "moral", label: "MORAL INTELLIGENCE & CONSCIENCE PROOF", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
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

      {/* TAB 1: 8 CIVILIZATION PILLARS */}
      {activeTab === "pillars" && (
        <div className="space-y-6">
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
                    <span className="text-white/40 font-bold">{dim.category || "Pillar"}</span>
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
                    <span>
                      Trend: <strong className="text-white/70 uppercase">{dim.trend}</strong>
                    </span>
                    <span>{dim.benchmarkGlobal || "Benchmark: Safe"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Pillar Diagnostic Deep-Dive */}
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>CIVILIZATION PILLAR: {(selectedDim.category || "General").toUpperCase()}</span>
                <span className="text-white/40">Score: {selectedDim.score}/100</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {selectedDim.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {selectedDim.summary || selectedDim.description}
              </p>
            </div>

            {/* Empirical Sub-Indicators */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Constituent Empirical Indicators
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(selectedDim.indicators || selectedDim.subIndicators || []).map((ind: any, i) => (
                  <div key={i} className="p-4 bg-[#080808] border border-white/10 space-y-1 text-xs">
                    <span className="text-[9px] font-mono text-white/40 uppercase truncate block">
                      {ind.name}
                    </span>
                    <div className="text-base font-serif font-light text-white">{ind.value}</div>
                    <span className="text-[9px] font-mono text-emerald-400">
                      Delta: {ind.delta || ind.status}
                    </span>
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
                  {(selectedDim.strategicInterventions || []).length} Direct Protocols
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(selectedDim.strategicInterventions || [
                  "Decentralize municipal water maintenance to youth guilds",
                  "Enforce mandatory volcanic aggregate in all civil drainage codes",
                  "Deploy real-time optical IoT sensors for early flood warning",
                ]).map((intv, i) => (
                  <span
                    key={i}
                    className="text-xs px-3.5 py-1.5 bg-[#080808] border border-white/10 text-white/80 font-sans"
                  >
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
                  className="px-3 py-2 bg-[#181308] border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-xs font-mono font-bold transition-all shrink-0"
                >
                  ADD PROTOCOL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PLANETARY BOUNDARIES (EARTH CARRYING CAPACITY) */}
      {activeTab === "planetary" && (
        <div className="space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                <Globe className="w-3.5 h-3.5" />
                <span>BIOPHYSICAL OPERATING ENVELOPE</span>
              </div>
              <h3 className="font-serif text-2xl text-white">The 9 Planetary Boundaries</h3>
              <p className="text-xs text-white/50 font-serif italic max-w-2xl">
                Quantified biophysical boundaries within which humanity can continue to develop and thrive for generations to come (Stockholm Resilience Centre).
              </p>
            </div>
            <div className="text-xs font-mono text-white/40">
              Transgressed: <strong className="text-rose-400">6 of 9 boundaries</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planetaryBoundaries.map((pb) => {
              const isSelected = selectedBoundary.id === pb.id;
              const isHighRisk = pb.zone.includes("High Risk");
              const isUncertainty = pb.zone.includes("Zone of Uncertainty");

              return (
                <div
                  key={pb.id}
                  onClick={() => setSelectedBoundary(pb)}
                  className={`p-5 border cursor-pointer transition-all space-y-3 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#111111] border-[#c5a059] ring-1 ring-[#c5a059]/40"
                      : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase">
                      <span
                        className={`px-2 py-0.5 border ${
                          isHighRisk
                            ? "bg-rose-950/60 text-rose-300 border-rose-800"
                            : isUncertainty
                            ? "bg-amber-950/60 text-amber-300 border-amber-800"
                            : "bg-[#0a1610] text-emerald-300 border-emerald-800"
                        }`}
                      >
                        {pb.zone}
                      </span>
                    </div>

                    <h4 className="font-serif text-base text-white">{pb.name}</h4>

                    <div className="text-xs font-mono space-y-0.5 text-white/60 pt-1">
                      <div>Current: <strong className="text-white">{pb.currentLevel}</strong></div>
                      <div>Safe Limit: <strong className="text-emerald-400">{pb.safeThreshold}</strong></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[10px] text-white/40 font-mono">
                    Trend: <span className="uppercase text-white/70">{pb.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Planetary Boundary Deep Inspector */}
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  BOUNDARY INSPECTOR
                </span>
                <h3 className="font-serif text-2xl text-white">{selectedBoundary.name}</h3>
              </div>
              <span className="text-xs font-mono text-rose-400">{selectedBoundary.transgressionDelta}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 bg-[#080808] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-white/40 uppercase block">
                  Biophysical Mechanism & Limit:
                </span>
                <p className="text-white/80 font-sans leading-relaxed">
                  {selectedBoundary.transgressionDelta}. Operating in {selectedBoundary.zone.toLowerCase()} risks triggering irreversible non-linear ecological cascades and tipping elements.
                </p>
              </div>

              <div className="p-5 bg-[#080808] border border-emerald-900/40 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">
                  Atlas Regenerative Intervention Response:
                </span>
                <p className="text-white/80 font-sans leading-relaxed">
                  {selectedBoundary.atlasIntervention}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEADOWS LEVERAGE POINTS */}
      {activeTab === "meadows" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              <Sliders className="w-3.5 h-3.5" />
              <span>SYSTEMS ARCHITECTURE FOUNDATIONS</span>
            </div>
            <h3 className="font-serif text-2xl text-white">Donella Meadows 12 Leverage Points Hierarchy</h3>
            <p className="text-xs text-white/50 font-serif italic">
              Interventions ordered from least effective (tweaking numerical parameters) to highest civilizational impact (transcending paradigms).
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { num: 1, title: "The power to transcend paradigms", tier: "Deep Paradigm", desc: "Recognizing that no system model is ultimate truth; maintaining cognitive flexibility and regenerative openness." },
              { num: 2, title: "The mindset or paradigm out of which the system arises", tier: "Deep Paradigm", desc: "Shifting from extractive resource exploitation to sacred biophysical stewardship." },
              { num: 3, title: "The goals of the system", tier: "System Rules", desc: "Replacing infinite GDP expansion with multi-capital human dignity and planetary vitality." },
              { num: 4, title: "The power to add, change, evolve, or self-organize system structure", tier: "Self-Organization", desc: "Empowering local youth guilds and customary elder councils with autonomous authority." },
              { num: 5, title: "The rules of the system (incentives, punishments, constraints)", tier: "System Rules", desc: "Capping non-extractive financial yields at 4.8% APR and returning 100% of residual surplus to the commons." },
              { num: 6, title: "The structure of information flows", tier: "Information & Feedback", desc: "Deploying open real-time IoT sensors and public hydrological dashboards to eliminate institutional opacity." },
              { num: 7, title: "The gain around driving positive feedback loops", tier: "Feedback Loops", desc: "Dampening speculative land financialization while amplifying youth skill-building compounding." },
              { num: 8, title: "The strength of negative feedback loops", tier: "Feedback Loops", desc: "Installing automated early-warning flood diverter channels before catastrophic residential inundation." },
              { num: 9, title: "The lengths of delays, relative to the rate of system change", tier: "Delays & Stocks", desc: "Accelerating capital disbursement from 18 months of bureaucratic review down to 72 hours via M-Pesa." },
              { num: 10, title: "The structure of material stocks and flows (such as transport networks, age distributions)", tier: "Physical Geometry", desc: "Replacing rigid underground concrete pipes with permeable volcanic pumice surface bioswales." },
              { num: 11, title: "The sizes of buffers and other stabilizing stocks, relative to their flows", tier: "Buffers", desc: "Building 42,000 m³ of decentralized sponge retention plazas across informal settlements." },
              { num: 12, title: "Constants, parameters, numbers (such as subsidies, taxes, standards)", tier: "Parameters", desc: "Adjusting municipal drainage excavation budget line items (least effective leverage point)." },
            ].map((lp) => (
              <div
                key={lp.num}
                className="p-4 bg-[#080808] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#c5a059]/40 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] font-bold text-xs shrink-0">
                    #{lp.num}
                  </div>
                  <div>
                    <h5 className="font-serif text-white text-sm">{lp.title}</h5>
                    <p className="text-[11px] text-white/50 font-sans">{lp.desc}</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-[#121212] border border-white/10 text-white/60 uppercase shrink-0">
                  {lp.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MORAL INTELLIGENCE & CONSCIENCE PROOF */}
      {activeTab === "moral" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-purple-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MORAL INTELLIGENCE AUDIT & CONSCIENCE PROOF</span>
              </div>
              <h3 className="font-serif text-2xl text-white">Algorithmic Conscience Verification</h3>
              <p className="text-xs text-white/50 font-serif italic">
                Verifiable cryptographic proof that all Atlas agent suggestions, capital models, and field interventions uphold human dignity, intergenerational equity, and ecological non-harm.
              </p>
            </div>

            {moralProofHash && (
              <div className="text-right font-mono text-xs">
                <span className="text-[9px] text-white/40 block">VERIFIED PROOF HASH:</span>
                <span className="text-emerald-400">{moralProofHash}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {auditResults.map((check, i) => (
              <div
                key={i}
                className="p-5 bg-[#080808] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h5 className="font-serif text-white text-base">{check.title}</h5>
                  </div>
                  <p className="text-xs text-white/60 font-sans">{check.desc}</p>
                  <div className="text-[10px] font-mono text-[#c5a059] pt-0.5">
                    Anchored In: {check.principle}
                  </div>
                </div>

                <span className="text-[10px] font-mono px-3 py-1 bg-[#0a1610] text-emerald-300 border border-emerald-800 shrink-0">
                  {check.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 bg-[#120a1f] border border-purple-800/40 flex items-center justify-between font-mono text-xs">
            <div className="space-y-1">
              <div className="text-purple-300 font-bold">ALL 5 MORAL CONSTRAINTS PASS VALIDATION</div>
              <div className="text-white/60 text-[11px]">
                No extractive mechanisms or human sovereignty violations detected in active system graph.
              </div>
            </div>
            <button
              onClick={() => onNavigate("studio")}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs uppercase tracking-wider"
            >
              APPLY CONSTRAINTS TO STUDIO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

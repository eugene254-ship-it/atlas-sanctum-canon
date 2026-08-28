import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Compass,
  ArrowRight,
  Search,
  Filter,
  ShieldCheck,
  Layers,
  Activity,
  Plus,
  Download,
  X,
  Globe2,
  Zap
} from "lucide-react";
import { RegenerativePattern, NavigationSpace } from "../../types";
import { REGENERATIVE_PATTERNS } from "../../data/seedData";
import { dispatchGeminiInquiry } from "../../services/api";

interface MemoryPatternViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const MemoryPatternView: React.FC<MemoryPatternViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [patterns, setPatterns] = useState<RegenerativePattern[]>(REGENERATIVE_PATTERNS);
  const [selectedPattern, setSelectedPattern] = useState<RegenerativePattern>(REGENERATIVE_PATTERNS[0]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal for new pattern
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatternName, setNewPatternName] = useState("");
  const [newPatternCategory, setNewPatternCategory] = useState("Ecological Infrastructure");
  const [newPatternProblem, setNewPatternProblem] = useState("");
  const [newPatternSolution, setNewPatternSolution] = useState("");
  const [newPatternRecipe, setNewPatternRecipe] = useState("");
  const [newPatternLocation, setNewPatternLocation] = useState("");

  // Adaptation engine
  const [adaptationGeography, setAdaptationGeography] = useState("");
  const [isAdapting, setIsAdapting] = useState(false);
  const [adaptationResult, setAdaptationResult] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Patterns" },
    { id: "Ecological Infrastructure", label: "Ecological Infrastructure" },
    { id: "Clean Energy", label: "Clean Energy & Thermal" },
    { id: "Socioeconomic & Land", label: "Socioeconomic & Land" },
    { id: "Agrifood & Agronomy", label: "Bio-Economy & Agrifood" },
  ];

  const getCategory = (p: RegenerativePattern) => p.category || p.domain || "Ecological Infrastructure";
  const getProblem = (p: RegenerativePattern) => p.problemContext || p.problemSolved || "Recurring civilizational friction.";
  const getSolution = (p: RegenerativePattern) => p.patternSolution || p.coreMechanism || "Generative pattern solution.";
  const getProvenance = (p: RegenerativePattern) => p.provenancePlaces || (p.originPlace ? [p.originPlace] : ["Global Commons"]);
  const getRecipe = (p: RegenerativePattern) => p.replicationRecipe || p.coreMechanism || "Follow standard regenerative deployment protocols.";
  const getOutcomes = (p: RegenerativePattern) => p.measuredOutcomes || p.validatedOutcomeMetrics || ["Measurable community and ecological lift"];

  const filteredPatterns = patterns.filter((p) => {
    const cat = getCategory(p);
    const prob = getProblem(p);
    const sol = getSolution(p);
    const matchesCategory = filterCategory === "all" || cat.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory.toLowerCase().includes(cat.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegisterPattern = () => {
    if (!newPatternName.trim() || !newPatternSolution.trim()) return;

    const newPat: RegenerativePattern = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      name: newPatternName.trim(),
      category: newPatternCategory,
      domain: newPatternCategory,
      problemContext: newPatternProblem.trim() || "Unspecified civilizational friction.",
      problemSolved: newPatternProblem.trim() || "Unspecified civilizational friction.",
      patternSolution: newPatternSolution.trim(),
      coreMechanism: newPatternSolution.trim(),
      provenancePlaces: newPatternLocation.trim() ? [newPatternLocation.trim()] : ["Global Commons"],
      originPlace: newPatternLocation.trim() || "Global Commons",
      replicationRecipe: newPatternRecipe.trim() || "Follow standardized regenerative installation protocols.",
      measuredOutcomes: ["100% community compliance", "Measurable ecological lift"],
      validatedOutcomeMetrics: ["100% community compliance", "Measurable ecological lift"],
      reproducibilityScore: 0.92,
    };

    setPatterns([newPat, ...patterns]);
    setSelectedPattern(newPat);
    setShowAddModal(false);
    setNewPatternName("");
    setNewPatternProblem("");
    setNewPatternSolution("");
    setNewPatternRecipe("");
    setNewPatternLocation("");
  };

  const handleAdaptPattern = async () => {
    if (!adaptationGeography.trim()) return;
    setIsAdapting(true);
    setAdaptationResult(null);

    const prompt = `Adapt this proven regenerative civilizational pattern:
Pattern: "${selectedPattern.name}"
Category: "${getCategory(selectedPattern)}"
Origin Context: "${getProblem(selectedPattern)}"
Solution Pattern: "${getSolution(selectedPattern)}"
Replication Recipe: "${getRecipe(selectedPattern)}"

To this new target geography and socio-ecological context:
"${adaptationGeography}"

Provide a structured 3-part blueprint:
1. Local Material & Cultural Equivalents
2. Key Ecological & Regulatory Constraints to Anticipate
3. Step-by-Step Transposition Recipe`;

    const result = await dispatchGeminiInquiry(
      prompt,
      "You are the Atlas Sanctum Regenerative Architecture Transposition Engine."
    );

    setAdaptationResult(result);
    setIsAdapting(false);
  };

  const handleExportPattern = () => {
    const content = `# REGENERATIVE PATTERN DOSSIER: ${selectedPattern.name}
ID: #${selectedPattern.id.toUpperCase()}
Category: ${getCategory(selectedPattern)}
Reproducibility Score: ${Math.round(selectedPattern.reproducibilityScore * 100)}%
Provenance: ${getProvenance(selectedPattern).join(", ")}

## RECURRING PROBLEM CONTEXT
${getProblem(selectedPattern)}

## VERIFIED GENERATIVE SOLUTION
${getSolution(selectedPattern)}

## FIELD REPLICATION RECIPE
${getRecipe(selectedPattern)}

## MEASURED OUTCOMES
${getOutcomes(selectedPattern).map((o) => `- ${o}`).join("\n")}
`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pattern-${selectedPattern.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL MEMORY & REGENERATIVE DESIGN COMMONS</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Regenerative Pattern Library
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            A living repository of proven, reproducible civilizational patterns. Each pattern maps a recurring problem context to a verified generative solution with measured outcomes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>REGISTER NEW PATTERN</span>
          </button>
          <div className="p-4 bg-[#080808] border border-white/10 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
            <span className="text-white/60 text-[10px] uppercase tracking-wider">PATTERNS: {patterns.length}</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="p-5 bg-[#0c0c0c] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-all ${
                filterCategory === c.id
                  ? "bg-[#c5a059] text-[#080808] font-bold"
                  : "bg-[#080808] text-white/50 hover:text-white border border-white/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pattern library..."
            className="w-full pl-9 pr-4 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
          />
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pattern Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          {filteredPatterns.map((p) => {
            const isSelected = selectedPattern.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPattern(p);
                  setAdaptationResult(null);
                }}
                className={`p-5 border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                    : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="text-[#c5a059]">{getCategory(p)}</span>
                  <span className="text-emerald-400">Score: {Math.round(p.reproducibilityScore * 100)}%</span>
                </div>

                <h4 className="font-serif font-normal text-base text-white">
                  {p.name}
                </h4>

                <p className="text-xs text-white/50 line-clamp-2 font-sans">
                  {getProblem(p)}
                </p>

                <div className="pt-2 flex items-center text-[9px] font-mono text-white/40 border-t border-white/5">
                  <span>Tested in: {getProvenance(p).join(", ")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Pattern Dossier Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>PATTERN #{selectedPattern.id.toUpperCase()}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-white/40">Reproducibility: {Math.round(selectedPattern.reproducibilityScore * 100)}%</span>
                  <button
                    onClick={handleExportPattern}
                    className="p-1 text-white/50 hover:text-white"
                    title="Export Pattern Dossier"
                  >
                    <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  </button>
                </div>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {selectedPattern.name}
              </h3>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Category: <strong className="text-white/80">{getCategory(selectedPattern)}</strong> • Provenance: <strong className="text-white/80">{getProvenance(selectedPattern).join(", ")}</strong>
              </div>
            </div>

            {/* Problem vs Pattern Solution */}
            <div className="space-y-4 text-xs">
              <div className="p-5 bg-[#080808] border border-rose-900/40 space-y-1.5">
                <span className="font-mono text-rose-400 uppercase font-semibold text-[10px] tracking-wider">
                  Recurring Problem Context
                </span>
                <p className="text-white/70 leading-relaxed font-sans">
                  {getProblem(selectedPattern)}
                </p>
              </div>

              <div className="p-5 bg-[#080808] border border-emerald-900/40 space-y-1.5">
                <span className="font-mono text-emerald-400 uppercase font-semibold text-[10px] tracking-wider">
                  Verified Regenerative Solution Pattern
                </span>
                <p className="text-white/70 leading-relaxed font-sans">
                  {getSolution(selectedPattern)}
                </p>
              </div>
            </div>

            {/* Replication Recipe */}
            <div className="p-5 bg-[#12100a] border border-[#c5a059]/40 space-y-2">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase font-semibold tracking-[0.25em]">
                Replication Recipe & Field Instructions
              </span>
              <p className="text-xs text-white/80 leading-relaxed font-serif italic">
                {getRecipe(selectedPattern)}
              </p>
            </div>

            {/* Measured Outcomes */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Empirical Measured Outcomes
              </span>
              <div className="flex flex-wrap gap-2">
                {getOutcomes(selectedPattern).map((outc, i) => (
                  <span key={i} className="text-xs px-3.5 py-1.5 bg-[#080808] border border-white/10 text-emerald-300 font-sans flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{outc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Geographic Transposition Engine */}
            <div className="p-5 bg-[#080808] border border-white/10 space-y-3">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-purple-400">
                <Globe2 className="w-3.5 h-3.5" />
                <span>AI GEOGRAPHIC TRANSPOSITION ENGINE</span>
              </div>
              <p className="text-[11px] text-white/50 font-sans">
                Transmute this pattern to another biome, legal system, or city.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adaptationGeography}
                  onChange={(e) => setAdaptationGeography(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdaptPattern()}
                  placeholder="Target geography (e.g. 'Accra, Ghana coastal estuary' or 'Kigali volcanic terraces')..."
                  className="flex-1 px-3 py-2 bg-[#121212] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-purple-400 font-sans"
                />
                <button
                  onClick={handleAdaptPattern}
                  disabled={isAdapting}
                  className="px-4 py-2 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center space-x-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 text-purple-300" />
                  <span>{isAdapting ? "ADAPTING..." : "ADAPT"}</span>
                </button>
              </div>

              {adaptationResult && (
                <div className="mt-3 p-4 bg-[#0a0a0f] border border-purple-900/50 space-y-2 text-xs font-sans text-white/80 leading-relaxed whitespace-pre-line animate-fadeIn">
                  <div className="font-mono text-[10px] text-purple-300 uppercase tracking-wider font-bold">
                    Transposed Pattern Specification for {adaptationGeography}:
                  </div>
                  {adaptationResult}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate("studio")}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Instantiate Pattern in Active Studio Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Register New Pattern */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-white/20 p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl text-white">Register Regenerative Pattern</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Pattern Name</label>
                <input
                  type="text"
                  value={newPatternName}
                  onChange={(e) => setNewPatternName(e.target.value)}
                  placeholder="e.g. Decentralized Bamboo Biogas Digester Ring"
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Category</label>
                  <select
                    value={newPatternCategory}
                    onChange={(e) => setNewPatternCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                  >
                    <option>Ecological Infrastructure</option>
                    <option>Clean Energy</option>
                    <option>Socioeconomic & Land</option>
                    <option>Agrifood & Agronomy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Provenance / Tested Location</label>
                  <input
                    type="text"
                    value={newPatternLocation}
                    onChange={(e) => setNewPatternLocation(e.target.value)}
                    placeholder="e.g. Kisumu, Kenya"
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Recurring Problem Context</label>
                <textarea
                  value={newPatternProblem}
                  onChange={(e) => setNewPatternProblem(e.target.value)}
                  placeholder="Describe the failure mode or systemic breakdown..."
                  rows={2}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Verified Generative Solution Pattern</label>
                <textarea
                  value={newPatternSolution}
                  onChange={(e) => setNewPatternSolution(e.target.value)}
                  placeholder="Explain the technical / institutional solution mechanism..."
                  rows={2}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase mb-1">Field Replication Recipe</label>
                <textarea
                  value={newPatternRecipe}
                  onChange={(e) => setNewPatternRecipe(e.target.value)}
                  placeholder="Specific sequence of actions for deployment teams..."
                  rows={2}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-[#141414] text-white/60 hover:text-white text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={handleRegisterPattern}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-wider"
              >
                PUBLISH TO COMMONS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Activity,
  Compass,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Layers,
  Cpu,
  Terminal,
  Search,
  CheckCircle2,
  GitFork,
  Radio,
  History,
  Bookmark,
  Trash2,
  Copy,
  Check
} from "lucide-react";
import { NavigationSpace } from "../../types";
import {
  OBSERVATORY_SIGNALS,
  ACTIVE_MISSIONS,
  INITIAL_QUESTIONS,
  POSSIBILITY_DOSSIERS
} from "../../data/seedData";
import { dispatchGeminiInquiry } from "../../services/api";

interface CachedInquiry {
  id: string;
  query: string;
  timestamp: string;
  category: string;
  pillar: string;
  isPinned?: boolean;
  previewResponse?: string;
}

const CACHE_KEY = "atlas_historical_inquiries_v1";

const INITIAL_CACHE: CachedInquiry[] = [
  {
    id: "hist-01",
    query: "Why does seasonal flash flooding persist in Nairobi despite drainage allocations?",
    timestamp: "2026-08-27T18:30:00.000Z",
    category: "Hydrology & Watersheds",
    pillar: "Pillar #14: Ecological Restoration",
    isPinned: true,
    previewResponse: "Upper catchment deforestation and impermeable paved riverbanks create a 4.8 m/s runoff surge, overwhelming civil culverts.",
  },
  {
    id: "hist-02",
    query: "How to decouple Rift Valley agricultural cold chains from diesel grid?",
    timestamp: "2026-08-27T14:15:00.000Z",
    category: "Clean Thermal Energy",
    pillar: "Pillar #6: Innovation",
    isPinned: true,
    previewResponse: "Tapping direct geothermal brine at 145°C drives ammonia-water absorption chillers, eliminating 92% of diesel generator overhead.",
  },
  {
    id: "hist-03",
    query: "What catalytic capital mechanism yields 100% community equity return in youth bioswale construction?",
    timestamp: "2026-08-26T21:00:00.000Z",
    category: "7-Capitals & Finance",
    pillar: "Pillar #9: Financial Sovereignty",
    isPinned: false,
    previewResponse: "Blended concessionary grant tranches guarantee municipal flood avoidance savings, passing micro-equity dividends directly to local guilds.",
  },
  {
    id: "hist-04",
    query: "How can autonomous environmental sensor swarms empower local youth monitors?",
    timestamp: "2026-08-26T09:40:00.000Z",
    category: "Autonomous Systems",
    pillar: "Pillar #1: Sovereignty",
    isPinned: false,
    previewResponse: "Low-cost LoRaWAN soil moisture probes paired with tokenized verification reward micro-catchment stewards for real-time telemetry verification.",
  },
];

interface HomeScreenProps {
  onNavigate: (space: NavigationSpace) => void;
  onLaunchQuestion: (question: string) => void;
  africaMode: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onLaunchQuestion,
  africaMode,
}) => {
  const [inquiryInput, setInquiryInput] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisOutput, setSynthesisOutput] = useState<string | null>(null);

  // Historical inquiry cache state
  const [cachedInquiries, setCachedInquiries] = useState<CachedInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return INITIAL_CACHE;
  });
  const [memorySearch, setMemorySearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      if (Array.isArray(cachedInquiries)) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedInquiries));
      }
    } catch (e) {}
  }, [cachedInquiries]);

  const saveInquiryToCache = (queryText: string, preview?: string) => {
    const newEntry: CachedInquiry = {
      id: `hist-${Date.now()}`,
      query: queryText,
      timestamp: new Date().toISOString(),
      category: africaMode ? "Africa Matrix Inquiry" : "Civilization Matrix",
      pillar: "Socratic First Principles",
      isPinned: false,
      previewResponse: preview || "Socratic first-principles synthesis executed.",
    };
    setCachedInquiries((prev) => {
      const safePrev = Array.isArray(prev) ? prev : INITIAL_CACHE;
      return [newEntry, ...safePrev.filter((item) => (item?.query || "").toLowerCase() !== queryText.toLowerCase())];
    });
  };

  const handleRunInquiry = async (customPrompt?: string) => {
    const q = customPrompt || inquiryInput;
    if (!q.trim()) return;

    setIsSynthesizing(true);
    setSynthesisOutput(null);

    const result = await dispatchGeminiInquiry(
      `You are the Atlas Sanctum Master Socratic Intelligence Engine. Deconstruct this inquiry from first principles across truth, systems dynamics, human agency, 7-capitals, and the smallest real-world falsification experiment: "${q}"`,
      "Atlas Sanctum Master Reasoning Engine"
    );

    setSynthesisOutput(result);
    saveInquiryToCache(q, result.slice(0, 180) + "...");
    setIsSynthesizing(false);
  };

  const togglePinInquiry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCachedInquiries((prev) => {
      const safePrev = Array.isArray(prev) ? prev : INITIAL_CACHE;
      return safePrev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item));
    });
  };

  const deleteInquiry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCachedInquiries((prev) => {
      const safePrev = Array.isArray(prev) ? prev : INITIAL_CACHE;
      return safePrev.filter((item) => item.id !== id);
    });
  };

  const clearAllHistory = () => {
    if (window.confirm("Clear all inquiry history from cache?")) {
      setCachedInquiries([]);
    }
  };

  const copyInquiryText = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const safeInquiryList = Array.isArray(cachedInquiries) ? cachedInquiries : INITIAL_CACHE;
  const filteredHistory = safeInquiryList.filter(
    (item) =>
      item &&
      ((item.query || "").toLowerCase().includes(memorySearch.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(memorySearch.toLowerCase()))
  );

  return (
    <div className="space-y-10 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* 1. Primary Central Inquiry Bar — Sophisticated Dark Hero Section */}
      <section className="relative overflow-hidden bg-[#080808] border border-white/10 p-8 sm:p-14 shadow-2xl">
        <div className="absolute inset-0 bg-luxury-grid opacity-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 bg-[#0c0c0c] border border-[#c5a059]/40 text-[10px] uppercase tracking-[0.35em] font-medium text-[#c5a059]">
            <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse"></span>
            <span>CIVILIZATION REGENERATIVE MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-[0.04em] leading-[1.15]">
            Given what is true, what is possible—<br />
            <span className="text-[#c5a059] italic font-normal">and what ought we to build?</span>
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Securing legacy and resilience through first principles: connecting Truth, Systems Modeling, 7-Capitals, and Catalytic Action.
          </p>

          {/* Inquiry Input */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center bg-[#0c0c0c] border border-white/15 focus-within:border-[#c5a059] p-2 transition-all">
              <div className="flex items-center w-full px-3">
                <Search className="w-4 h-4 text-[#c5a059] mr-3 shrink-0" />
                <input
                  type="text"
                  value={inquiryInput}
                  onChange={(e) => setInquiryInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRunInquiry()}
                  placeholder="Inquire: 'Given what is true, what is possible?'"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white/30 text-sm font-sans tracking-wide"
                />
              </div>
              <button
                id="btn-run-home-inquiry"
                onClick={() => handleRunInquiry()}
                disabled={isSynthesizing}
                className="w-full sm:w-auto px-6 py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2 sm:mt-0"
              >
                {isSynthesizing ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>SYNTHESIZING</span>
                  </>
                ) : (
                  <>
                    <span>DECONSTRUCT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Socratic Prompt Starters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span className="text-[#c5a059]">Curated Inquiries:</span>
              <button
                onClick={() => {
                  setInquiryInput("Why does seasonal flash flooding persist in Nairobi despite drainage allocations?");
                  handleRunInquiry("Why does seasonal flash flooding persist in Nairobi despite drainage allocations?");
                }}
                className="px-2.5 py-1 bg-[#0c0c0c] hover:bg-[#141414] text-white/70 hover:text-white border border-white/10 hover:border-[#c5a059]/40 transition-all"
              >
                Nairobi Basin Hydrology
              </button>
              <button
                onClick={() => {
                  setInquiryInput("How to decouple Rift Valley agricultural cold chains from diesel grid?");
                  handleRunInquiry("How to decouple Rift Valley agricultural cold chains from diesel grid?");
                }}
                className="px-2.5 py-1 bg-[#0c0c0c] hover:bg-[#141414] text-white/70 hover:text-white border border-white/10 hover:border-[#c5a059]/40 transition-all"
              >
                Geothermal Cold Hubs
              </button>
              <button
                onClick={() => {
                  setInquiryInput("How can autonomous environmental sensor swarms empower local youth monitors?");
                  handleRunInquiry("How can autonomous environmental sensor swarms empower local youth monitors?");
                }}
                className="px-2.5 py-1 bg-[#0c0c0c] hover:bg-[#141414] text-white/70 hover:text-white border border-white/10 hover:border-[#c5a059]/40 transition-all"
              >
                Sensor Swarm Commons
              </button>
            </div>
          </div>

          {/* Socratic Output Banner if active */}
          {synthesisOutput && (
            <div className="text-left mt-8 p-6 bg-[#0c0c0c] border border-[#c5a059]/50 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-mono text-[#c5a059]">
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ATLAS REASONING SYNTHESIS</span>
                </span>
                <button
                  onClick={() => onLaunchQuestion(inquiryInput || "Custom Inquiry")}
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <span>Open in Question Engine</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="text-sm text-white/90 font-sans leading-relaxed whitespace-pre-line border-t border-white/10 pt-4">
                {synthesisOutput}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. DEDICATED 'MEMORY LANE' — HISTORICAL INQUIRY CACHE */}
      <section className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-1">
              <History className="w-3.5 h-3.5" />
              <span>Socratic Memory Matrix</span>
            </div>
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-wide">
              Memory Lane: Historical Inquiries
            </h3>
            <p className="text-xs text-white/40 font-serif italic mt-1">
              Persisted cognitive repository of prior hypotheses, questions, and first-principles deconstructions
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Memory Search */}
            <div className="flex items-center bg-[#080808] border border-white/15 px-3 py-1.5 text-xs text-white/70">
              <Search className="w-3.5 h-3.5 mr-2 text-[#c5a059]" />
              <input
                type="text"
                value={memorySearch}
                onChange={(e) => setMemorySearch(e.target.value)}
                placeholder="Filter memory lane..."
                className="bg-transparent border-none outline-none text-white text-xs placeholder-white/30 w-36 sm:w-48 font-sans"
              />
            </div>

            {cachedInquiries.length > 0 && (
              <button
                onClick={clearAllHistory}
                title="Clear all stored inquiries"
                className="px-2.5 py-1.5 bg-[#080808] hover:bg-red-950/40 text-white/40 hover:text-red-400 border border-white/15 transition-all text-[10px] font-mono flex items-center space-x-1"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">CLEAR</span>
              </button>
            )}
          </div>
        </div>

        {/* History Grid */}
        {filteredHistory.length === 0 ? (
          <div className="py-12 text-center text-white/40 font-serif italic text-sm">
            No inquiries recorded in Memory Lane yet. Run a Socratic inquiry above to record your first exploration.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setInquiryInput(item.query);
                  handleRunInquiry(item.query);
                }}
                className={`p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                  item.isPinned
                    ? "bg-[#141108] border-[#c5a059]/60 hover:border-[#c5a059]"
                    : "bg-[#080808] border-white/10 hover:border-white/25"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#181818] border border-white/10 text-[#c5a059]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {/* Copy */}
                      <button
                        onClick={(e) => copyInquiryText(item.query, item.id, e)}
                        title="Copy inquiry"
                        className="p-1 text-white/40 hover:text-white transition-colors"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Pin */}
                      <button
                        onClick={(e) => togglePinInquiry(item.id, e)}
                        title={item.isPinned ? "Unpin" : "Pin inquiry"}
                        className={`p-1 transition-colors ${
                          item.isPinned ? "text-[#c5a059]" : "text-white/30 hover:text-white"
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={item.isPinned ? "#c5a059" : "none"} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => deleteInquiry(item.id, e)}
                        title="Delete from memory"
                        className="p-1 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-normal text-white group-hover:text-[#c5a059] transition-colors leading-snug">
                    "{item.query}"
                  </h4>

                  {item.previewResponse && (
                    <p className="text-xs text-white/45 font-sans leading-relaxed line-clamp-2">
                      {item.previewResponse}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span className="truncate">{item.pillar}</span>
                  <span className="text-[#c5a059] group-hover:translate-x-1 transition-transform flex items-center space-x-1 shrink-0">
                    <span>Re-Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. THE 8 CIVILIZATION-SCALE REALITY PILLARS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-1">
              Civilization Audit
            </div>
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white tracking-wide">
              The 8 Reality Diagnostic Pillars
            </h3>
          </div>
          <button
            onClick={() => onNavigate("observatory")}
            className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] hover:text-white flex items-center space-x-1.5 transition-colors"
          >
            <span>View Full Observatory</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 8-Card Diagnostic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate("observatory")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-emerald-400">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-3 h-3" />
                <span>1. Telemetry</span>
              </span>
              <span className="text-white/30">REALITY</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Nairobi Basin Runoff Surge
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              Soil sealing in upper catchment has accelerated peak runoff velocity to 4.8 m/s, shrinking storm lag time by 74%.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Infiltration: 48%</span>
              <span className="text-emerald-400">Lag: 24m</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate("capital-intelligence")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059]">
              <span className="flex items-center space-x-1.5">
                <Layers className="w-3 h-3" />
                <span>2. 7-Capitals</span>
              </span>
              <span className="text-white/30">WEALTH</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Human Dignity & Asset Protection
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              $14.2M in annual informal flood damages converted into community wealth via non-extractive bioswales.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Human Lift: +88</span>
              <span className="text-[#c5a059]">Social: +92</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate("world-model")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-sky-400">
              <span className="flex items-center space-x-1.5">
                <TrendingUp className="w-3 h-3" />
                <span>3. Dynamics</span>
              </span>
              <span className="text-white/30">VELOCITY</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Liquidity & Mini-Grid Surplus
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              Informal trade velocity in Eastleigh surged +42% via programmable escrows while mini-grids vent 3.4 MWh surplus.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Surplus: 3.4 MWh/d</span>
              <span className="text-sky-400">+42% Growth</span>
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate("systems-modeling")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-rose-400">
              <span className="flex items-center space-x-1.5">
                <AlertTriangle className="w-3 h-3" />
                <span>4. Bottlenecks</span>
              </span>
              <span className="text-white/30">LEVERAGE</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Post-Harvest Cold Gaps
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              38% of smallholder vegetables rot before reaching urban centers due to high capex electric chilling barriers.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Meadows: #4 Self-Org</span>
              <span className="text-rose-400">Rot: 38%</span>
            </div>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => onNavigate("possibility-space")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059]">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3" />
                <span>5. Possibility</span>
              </span>
              <span className="text-white/30">HORIZON</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Geothermal Waste-Heat Chilling
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              Tapping 85°C geothermal brine to power zero-electricity ammonia absorption refrigeration at $0.03/kg produce.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>10x Shift</span>
              <span className="text-[#c5a059]">$0.03/kg</span>
            </div>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => onNavigate("question-engine")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-amber-400">
              <span className="flex items-center space-x-1.5">
                <HelpCircle className="w-3 h-3" />
                <span>6. Inquiries</span>
              </span>
              <span className="text-white/30">SOCRATIC</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Polycentric Land Stewardship
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              How customary elder land councils (Wazee wa Mtaa) and cryptographic registries prevent predatory displacement.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Canon Pillar: #13</span>
              <span className="text-amber-400">Depth: 5/5</span>
            </div>
          </div>

          {/* Card 7 */}
          <div
            onClick={() => onNavigate("mission-control")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-emerald-400">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>7. Missions</span>
              </span>
              <span className="text-white/30">ACTION</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Operation Blue Sponge: 1.8km
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              42,000 residents protected by youth-constructed volcanic pumice bioswales. Health Index: 92/100.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Capital: $185k / $250k</span>
              <span className="text-emerald-400">Health: 92%</span>
            </div>
          </div>

          {/* Card 8 */}
          <div
            onClick={() => onNavigate("patterns-memory")}
            className="p-6 bg-[#0c0c0c] hover:bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059]">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>8. Patterns</span>
              </span>
              <span className="text-white/30">MEMORY</span>
            </div>
            <h4 className="font-serif font-normal text-lg text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              Volcanic Pumice Porosity
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
              Validated in Silanga: Pumice amendment yields 140mm/hr absorption, dropping maintenance overhead by 94%.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
              <span>Reproducibility: 0.94</span>
              <span className="text-[#c5a059]">Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE REGENERATIVE FLYWHEEL */}
      <section className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-1">
              Methodology
            </div>
            <h3 className="font-serif font-light text-2xl text-white">
              The Sovereign Regenerative Flywheel
            </h3>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">
              Observe → Question → Model → Possibility → Studio → Execute → Learn → Regenerate
            </p>
          </div>
          <button
            onClick={() => onNavigate("studio")}
            className="px-4 py-2 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch Studio Pipeline</span>
          </button>
        </div>

        {/* Interactive Flywheel Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center text-xs">
          {[
            { step: "1. OBSERVE", desc: "Telemetry & Signals", space: "observatory", color: "text-emerald-400" },
            { step: "2. QUESTION", desc: "Socratic Inquiries", space: "question-engine", color: "text-[#c5a059]" },
            { step: "3. MODEL", desc: "Causal Loops & Stocks", space: "systems-modeling", color: "text-sky-400" },
            { step: "4. DISCOVER", desc: "5-Horizon Discovery", space: "possibility-space", color: "text-[#c5a059]" },
            { step: "5. DESIGN", desc: "13-Step Studio", space: "studio", color: "text-amber-400" },
            { step: "6. FUND", desc: "7-Capitals Balance", space: "capital-intelligence", color: "text-emerald-400" },
            { step: "7. EXECUTE", desc: "Mission Control", space: "mission-control", color: "text-sky-400" },
            { step: "8. REGENERATE", desc: "Memory & Patterns", space: "patterns-memory", color: "text-[#c5a059]" },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(item.space as NavigationSpace)}
              className="p-4 bg-[#080808] hover:bg-[#141414] border border-white/10 hover:border-[#c5a059] cursor-pointer transition-all space-y-1.5 group"
            >
              <div className={`font-mono font-bold text-[10px] uppercase tracking-[0.2em] ${item.color}`}>
                {item.step}
              </div>
              <div className="text-[10px] text-white/40 truncate font-sans">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ACTIVE REGENERATIVE MISSIONS SNAPSHOT */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-1">
              Field Deployments
            </div>
            <h3 className="font-serif font-light text-2xl text-white">
              Active Missions Deployed in Reality
            </h3>
          </div>
          <button
            onClick={() => onNavigate("mission-control")}
            className="text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-white flex items-center space-x-1.5 transition-colors"
          >
            <span>All Missions ({ACTIVE_MISSIONS.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVE_MISSIONS.map((msn) => (
            <div
              key={msn.id}
              onClick={() => onNavigate("mission-control")}
              className="p-6 bg-[#0c0c0c] border border-white/10 hover:border-[#c5a059]/60 cursor-pointer transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-[0.2em] px-2.5 py-1 bg-[#161616] text-[#c5a059] border border-[#c5a059]/30 uppercase">
                    {msn.codeName}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-white/40">
                    Health: <strong className="text-emerald-400">{msn.healthScore}%</strong>
                  </span>
                </div>
                <h4 className="font-serif font-normal text-xl text-white leading-snug">
                  {msn.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
                  {msn.objective}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span className="uppercase tracking-wider">Capital Mobilized:</span>
                  <span className="text-[#c5a059]">${msn.capitalMobilizedUSD.toLocaleString()} / ${msn.capitalTargetUSD.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#161616] h-1 overflow-hidden">
                  <div
                    className="bg-[#c5a059] h-full transition-all"
                    style={{ width: `${Math.min(100, (msn.capitalMobilizedUSD / msn.capitalTargetUSD) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/30 tracking-wider uppercase">
                  <span>Beneficiaries: {msn.communityBeneficiaries.toLocaleString()}</span>
                  <span>{msn.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

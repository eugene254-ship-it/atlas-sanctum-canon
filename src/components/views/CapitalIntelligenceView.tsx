import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Layers,
  CheckCircle2,
  DollarSign,
  PieChart,
  Download,
  Sliders,
  Scale,
  RefreshCw,
  Zap,
  Globe
} from "lucide-react";
import { SevenCapitalsAnalysis, NavigationSpace } from "../../types";
import { SEVEN_CAPITALS_DATA } from "../../data/seedData";

interface CapitalIntelligenceViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const CapitalIntelligenceView: React.FC<CapitalIntelligenceViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [capitals, setCapitals] = useState<SevenCapitalsAnalysis[]>(SEVEN_CAPITALS_DATA);
  const [selectedCapital, setSelectedCapital] = useState<SevenCapitalsAnalysis>(SEVEN_CAPITALS_DATA[0]);
  const [activeTab, setActiveTab] = useState<"structurer" | "comparison" | "ledger">("structurer");

  // Interactive Blended Finance Slider States
  const [totalFundingTarget, setTotalFundingTarget] = useState(250000); // $250k USD
  const [catalyticGrantPct, setCatalyticGrantPct] = useState(25);
  const [concessionalDebtPct, setConcessionalDebtPct] = useState(45);
  const [communityEquityPct, setCommunityEquityPct] = useState(30);

  const grantUSD = (totalFundingTarget * catalyticGrantPct) / 100;
  const debtUSD = (totalFundingTarget * concessionalDebtPct) / 100;
  const equityUSD = (totalFundingTarget * communityEquityPct) / 100;

  const averageHealth = Math.round(
    capitals.reduce((acc, curr) => acc + curr.netScore, 0) / capitals.length
  );

  const handleScoreUpdate = (capitalName: string, delta: number) => {
    setCapitals((prev) =>
      prev.map((c) => {
        if (c.capital !== capitalName) return c;
        const newScore = Math.min(100, Math.max(10, c.netScore + delta));
        return { ...c, netScore: newScore };
      })
    );

    if (selectedCapital.capital === capitalName) {
      setSelectedCapital((prev) => ({
        ...prev,
        netScore: Math.min(100, Math.max(10, prev.netScore + delta)),
      }));
    }
  };

  const handleExportArchitecture = () => {
    const summary = `# ATLAS 7-CAPITALS & BLENDED FINANCE ARCHITECTURE
Date: ${new Date().toISOString().slice(0, 10)}
Target Funding: $${totalFundingTarget.toLocaleString()} USD

## BLENDED CAPITAL STRUCTURE
- Catalytic First-Loss Grant: ${catalyticGrantPct}% ($${grantUSD.toLocaleString()})
- Patient Concessional Debt / Green Bond: ${concessionalDebtPct}% ($${debtUSD.toLocaleString()})
- Community Cooperative Equity: ${communityEquityPct}% ($${equityUSD.toLocaleString()})

## 7-CAPITALS BALANCE SHEET
${capitals.map((c) => `- ${c.capital}: ${c.netScore}/100 | ${c.valueCreated}`).join("\n")}

Holistic Capital Index: ${averageHealth}/100
`;
    const blob = new Blob([summary], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-blended-capital-architecture-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>HOLISTIC MULTI-CAPITAL ACCOUNTING & BLENDED STRUCTURING</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            7-Capitals & Blended Finance
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Financial capital is merely an ephemeral conversion medium. True regenerative civilizational health measures the simultaneous compounding of Human, Social, Intellectual, Natural, Financial, Physical, and Institutional capital.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportArchitecture}
            className="px-4 py-2 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>EXPORT ARCHITECTURE</span>
          </button>

          <div className="p-4 bg-[#080808] border border-white/10 text-xs font-mono flex items-center space-x-3">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">Multi-Capital Index:</span>
            <span className="text-[#c5a059] font-bold text-lg">{averageHealth}/100</span>
          </div>
        </div>
      </div>

      {/* 7-Capitals Multi-Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {capitals.map((cap) => {
          const isSelected = selectedCapital.capital === cap.capital;
          return (
            <div
              key={cap.capital}
              onClick={() => setSelectedCapital(cap)}
              className={`p-4 border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                  : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="uppercase text-white/70 font-bold">{cap.capital}</span>
                <span className="text-[#c5a059] font-bold">{cap.netScore}</span>
              </div>

              <div className="w-full bg-[#080808] h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-[#c5a059] h-full transition-all duration-500"
                  style={{ width: `${cap.netScore}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                <span>Index Score</span>
                <span className="text-emerald-400 font-semibold">+{cap.netScore}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab("structurer")}
          className={`px-6 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === "structurer"
              ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>BLENDED STACK STRUCTURER</span>
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`px-6 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === "comparison"
              ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>EXTRACTIVE VS. REGENERATIVE MODEL</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === "structurer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Selected Capital Audit (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <div className="space-y-1.5 border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                    <span>MULTI-CAPITAL BALANCE SHEET</span>
                  </div>
                  <h3 className="font-serif font-light text-2xl text-white">
                    {selectedCapital.capital} Capital
                  </h3>
                </div>

                <div className="flex items-center space-x-1.5 bg-[#080808] p-1 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => handleScoreUpdate(selectedCapital.capital, -5)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/80"
                    title="Calibrate score down"
                  >
                    -5
                  </button>
                  <span className="px-2 font-bold text-[#c5a059]">{selectedCapital.netScore}/100</span>
                  <button
                    onClick={() => handleScoreUpdate(selectedCapital.capital, 5)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/80"
                    title="Calibrate score up"
                  >
                    +5
                  </button>
                </div>
              </div>

              {/* Asset Descriptions */}
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#080808] border border-emerald-900/40 space-y-1">
                  <span className="font-mono text-emerald-400 uppercase font-semibold text-[10px] tracking-wider">
                    Value Created
                  </span>
                  <p className="text-white/70 leading-relaxed font-sans">
                    {selectedCapital.valueCreated}
                  </p>
                </div>

                <div className="p-4 bg-[#080808] border border-sky-900/40 space-y-1">
                  <span className="font-mono text-sky-400 uppercase font-semibold text-[10px] tracking-wider">
                    Value Preserved & Protected
                  </span>
                  <p className="text-white/70 leading-relaxed font-sans">
                    {selectedCapital.valuePreserved}
                  </p>
                </div>

                <div className="p-4 bg-[#080808] border border-rose-900/40 space-y-1">
                  <span className="font-mono text-rose-400 uppercase font-semibold text-[10px] tracking-wider">
                    Value Destroyed or Displaced
                  </span>
                  <p className="text-white/70 leading-relaxed font-sans">
                    {selectedCapital.valueDestroyedOrDisplaced}
                  </p>
                </div>

                <div className="p-4 bg-[#080808] border border-[#c5a059]/30 space-y-1">
                  <span className="font-mono text-[#c5a059] uppercase font-semibold text-[10px] tracking-wider">
                    Systemic Externalities
                  </span>
                  <p className="text-white/70 leading-relaxed font-sans">
                    {selectedCapital.externalities}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Blended Finance Structurer (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
              <div className="space-y-1.5 border-b border-white/10 pb-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                  <span>NON-EXTRACTIVE CAPITAL STRUCTURING</span>
                  <span className="text-white/40">Target: ${totalFundingTarget.toLocaleString()} USD</span>
                </div>
                <h3 className="font-serif font-light text-2xl text-white flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-[#c5a059]" />
                  <span>Blended Capital Stack Engine</span>
                </h3>
              </div>

              {/* Target Funding Input */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-white/60 text-[10px] uppercase">
                  <span>Total Intervention Tranche Target</span>
                  <span className="text-[#c5a059] font-bold">${totalFundingTarget.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={totalFundingTarget}
                  onChange={(e) => setTotalFundingTarget(Number(e.target.value))}
                  className="w-full accent-[#c5a059] bg-[#080808] cursor-pointer h-1.5"
                />
              </div>

              {/* Slider Stack */}
              <div className="space-y-4 text-xs font-mono pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-white/70">
                    <span>Catalytic Concessional Grant (First-Loss):</span>
                    <span className="text-emerald-400 font-bold">{catalyticGrantPct}% (${grantUSD.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={catalyticGrantPct}
                    onChange={(e) => setCatalyticGrantPct(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/70">
                    <span>Patient Concessional Debt / Green Bond:</span>
                    <span className="text-sky-400 font-bold">{concessionalDebtPct}% (${debtUSD.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    value={concessionalDebtPct}
                    onChange={(e) => setConcessionalDebtPct(Number(e.target.value))}
                    className="w-full accent-sky-500 bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-white/70">
                    <span>Community Cooperative Equity & Revenue Share:</span>
                    <span className="text-[#c5a059] font-bold">{communityEquityPct}% (${equityUSD.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={communityEquityPct}
                    onChange={(e) => setCommunityEquityPct(Number(e.target.value))}
                    className="w-full accent-[#c5a059] bg-[#080808] cursor-pointer h-1.5"
                  />
                </div>
              </div>

              {/* Simulated Return Profile */}
              <div className="p-5 bg-[#080808] border border-white/10 space-y-3 text-xs">
                <div className="font-mono text-white/40 uppercase text-[10px] tracking-wider">
                  Simulated Financial & Non-Financial Returns
                </div>
                <ul className="space-y-2 text-white/70 font-sans">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Financial Yield: <strong className="text-white">4.8% patient yield</strong> (non-extractive capped dividend).</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Natural ROI: <strong className="text-white">$14.2M prevented flood damage</strong> & 42k lives protected.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Social ROI: <strong className="text-white">100% community asset ownership</strong> transfer over 7 years.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate("studio")}
                className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <span>Attach Capital Architecture to Studio Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Tab */}
      {activeTab === "comparison" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <h3 className="font-serif text-2xl text-white">Extractive Venture Model vs. Atlas 7-Capitals Architecture</h3>
            <p className="text-xs text-white/50 font-serif italic">
              A direct thermodynamic and institutional comparison of incentives, asset ownership, and long-term societal resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-6 bg-[#080808] border border-rose-900/40 space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-rose-400">
                <span>TRADITIONAL EXTRACTIVE VC MODEL</span>
                <span>ZERO-SUM</span>
              </div>
              <ul className="space-y-3 text-white/70 font-sans">
                <li>• <strong>Objective:</strong> Maximum liquidity exit (10x-100x return in 5-7 years).</li>
                <li>• <strong>Community Equity:</strong> 0% - Local labor treated as depreciable cost center.</li>
                <li>• <strong>Ecological Accounting:</strong> Negative externalities dumped onto public watershed commons.</li>
                <li>• <strong>Governance:</strong> Foreign shareholders hold 100% voting power over local water/energy assets.</li>
                <li>• <strong>Failure Mode:</strong> System collapse, hyper-gentrification, depleted regional aquifer.</li>
              </ul>
            </div>

            <div className="p-6 bg-[#080808] border border-emerald-900/40 space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-emerald-400">
                <span>ATLAS 7-CAPITALS BLENDED MODEL</span>
                <span>POSITIVE-SUM REGENERATIVE</span>
              </div>
              <ul className="space-y-3 text-white/70 font-sans">
                <li>• <strong>Objective:</strong> Perpetual compounding of human, social, and ecological commons.</li>
                <li>• <strong>Community Equity:</strong> 100% perpetual ownership transfer to local youth stewardship guilds.</li>
                <li>• <strong>Ecological Accounting:</strong> Soil carbon and groundwater recharge recorded as core balance sheet assets.</li>
                <li>• <strong>Governance:</strong> Quad-triad consensus (Elders, Technical Guilds, Youth, Patient Investors).</li>
                <li>• <strong>Resilience Mode:</strong> Survives 100-year flood event with zero community displacement.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

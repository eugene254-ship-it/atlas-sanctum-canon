import React, { useState } from "react";
import { ScenarioSnapshot } from "../types";
import {
  Clock,
  RotateCcw,
  Scale,
  Trash2,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Sliders,
  TrendingUp,
  Bookmark,
  Share2
} from "lucide-react";

interface ScenarioHistoryLogProps {
  snapshots: ScenarioSnapshot[];
  onLoadSnapshot: (snapshot: ScenarioSnapshot) => void;
  onDeleteSnapshot: (id: string) => void;
  onSaveNewSnapshot: (name: string, notes?: string) => void;
}

export const ScenarioHistoryLog: React.FC<ScenarioHistoryLogProps> = ({
  snapshots,
  onLoadSnapshot,
  onDeleteSnapshot,
  onSaveNewSnapshot,
}) => {
  const [selectedSnapshotAId, setSelectedSnapshotAId] = useState<string>(
    snapshots[0]?.id || ""
  );
  const [selectedSnapshotBId, setSelectedSnapshotBId] = useState<string>(
    snapshots[1]?.id || snapshots[0]?.id || ""
  );
  const [newSnapshotName, setNewSnapshotName] = useState("");
  const [newSnapshotNotes, setNewSnapshotNotes] = useState("");
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);

  const snapshotA = snapshots.find((s) => s.id === selectedSnapshotAId) || snapshots[0];
  const snapshotB = snapshots.find((s) => s.id === selectedSnapshotBId) || snapshots[1] || snapshots[0];

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSnapshotName.trim()) {
      onSaveNewSnapshot(newSnapshotName.trim(), newSnapshotNotes.trim());
      setNewSnapshotName("");
      setNewSnapshotNotes("");
      setIsCreatingSnapshot(false);
    }
  };

  const calculateDelta = (valA: number, valB: number, unit = "") => {
    const diff = valB - valA;
    const pct = valA !== 0 ? ((diff / valA) * 100).toFixed(1) : "0.0";
    const isPositive = diff >= 0;
    return {
      diff: Math.abs(diff),
      pct: `${isPositive ? "+" : ""}${pct}%`,
      isPositive,
      text: `${isPositive ? "+" : "-"}${Math.abs(diff).toLocaleString()}${unit}`,
    };
  };

  const exportAllSnapshotsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(snapshots, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `atlas-scenario-snapshots-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Snapshot Actions */}
      <div className="p-6 bg-[#0c0c0c] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
            <Clock className="w-3.5 h-3.5" />
            <span>SIMULATION HISTORY LOG & COMPARISON ENGINE</span>
          </div>
          <h3 className="font-serif text-2xl text-white">
            Saved Counterfactual Snapshots ({snapshots.length})
          </h3>
          <p className="text-xs text-white/50 font-serif italic">
            Toggle between previous simulation runs, restore parameters instantly, and analyze cross-scenario deltas.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportAllSnapshotsJSON}
            className="px-3 py-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
            title="Export all saved snapshots as JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>EXPORT ALL</span>
          </button>
        </div>
      </div>

      {/* Snapshots Toggle Strip / Card List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/40 px-1">
          <span>Click any snapshot to load or compare:</span>
          <span>{snapshots.length} Runs Recorded</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {snapshots.map((snap) => {
            const isComparing = snap.id === selectedSnapshotAId || snap.id === selectedSnapshotBId;
            return (
              <div
                key={snap.id}
                className={`p-4 border transition-all flex flex-col justify-between space-y-3 ${
                  isComparing
                    ? "bg-[#141414] border-[#c5a059] shadow-md"
                    : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 uppercase font-bold">
                      {snap.scenario}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 flex items-center space-x-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{snap.timestamp}</span>
                    </span>
                  </div>

                  <h4 className="font-serif text-base text-white font-medium">{snap.name}</h4>
                  {snap.notes && (
                    <p className="text-xs text-white/50 font-serif italic mt-1 line-clamp-2">
                      {snap.notes}
                    </p>
                  )}
                </div>

                {/* Snapshot Metrics Summary Chips */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block">LOSSES:</span>
                    <span className="text-white font-bold">
                      ${(snap.outcomes.floodLossesUSD / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block">PROTECTED:</span>
                    <span className="text-emerald-400 font-bold">
                      {snap.outcomes.residentsProtected.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block">HORIZON:</span>
                    <span className="text-purple-400 font-bold">{snap.timeHorizonYears} Yrs</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-1 text-xs font-mono">
                  <button
                    onClick={() => onLoadSnapshot(snap)}
                    className="px-2.5 py-1 bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#c5a059] hover:text-[#080808] border border-[#c5a059]/40 font-bold uppercase transition-all flex items-center space-x-1"
                    title="Restore these levers into the simulator"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>LOAD INTO SIMULATOR</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setSelectedSnapshotAId(snap.id)}
                      className={`px-1.5 py-1 border text-[10px] uppercase ${
                        selectedSnapshotAId === snap.id
                          ? "bg-sky-500 text-black font-bold border-sky-400"
                          : "bg-white/5 text-white/50 hover:text-white border-white/10"
                      }`}
                      title="Set as Snapshot A for comparison"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setSelectedSnapshotBId(snap.id)}
                      className={`px-1.5 py-1 border text-[10px] uppercase ${
                        selectedSnapshotBId === snap.id
                          ? "bg-amber-500 text-black font-bold border-amber-400"
                          : "bg-white/5 text-white/50 hover:text-white border-white/10"
                      }`}
                      title="Set as Snapshot B for comparison"
                    >
                      B
                    </button>
                    {snapshots.length > 1 && (
                      <button
                        onClick={() => onDeleteSnapshot(snap.id)}
                        className="p-1 text-white/30 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete snapshot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Snapshot Comparison Matrix Panel */}
      {snapshotA && snapshotB && (
        <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-[#c5a059]" />
              <h3 className="font-serif text-xl text-white">
                Side-by-Side Simulation Comparison
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-sky-400 font-bold">Snapshot A:</span>
                <select
                  value={selectedSnapshotAId}
                  onChange={(e) => setSelectedSnapshotAId(e.target.value)}
                  className="bg-[#141414] border border-sky-400/50 text-white px-2.5 py-1 text-xs outline-none"
                >
                  {snapshots.map((s) => (
                    <option key={`a-${s.id}`} value={s.id}>
                      {s.name} ({s.scenario})
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-white/20">VS</span>

              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">Snapshot B:</span>
                <select
                  value={selectedSnapshotBId}
                  onChange={(e) => setSelectedSnapshotBId(e.target.value)}
                  className="bg-[#141414] border border-amber-400/50 text-white px-2.5 py-1 text-xs outline-none"
                >
                  {snapshots.map((s) => (
                    <option key={`b-${s.id}`} value={s.id}>
                      {s.name} ({s.scenario})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Comparison Delta Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-white/40 border-b border-white/10 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Simulation Dimension</th>
                  <th className="py-2.5 px-3 text-sky-400">Snapshot A: {snapshotA.name}</th>
                  <th className="py-2.5 px-3 text-amber-400">Snapshot B: {snapshotB.name}</th>
                  <th className="py-2.5 px-3 text-right">Variance / Delta (B vs A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {/* Scenario Archetype */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Scenario Type</td>
                  <td className="py-2.5 px-3 uppercase text-sky-300">{snapshotA.scenario}</td>
                  <td className="py-2.5 px-3 uppercase text-amber-300">{snapshotB.scenario}</td>
                  <td className="py-2.5 px-3 text-right text-white/40">
                    {snapshotA.scenario === snapshotB.scenario ? "Identical" : "Modified Archetype"}
                  </td>
                </tr>

                {/* Time Horizon */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Time Horizon</td>
                  <td className="py-2.5 px-3">{snapshotA.timeHorizonYears} Years</td>
                  <td className="py-2.5 px-3">{snapshotB.timeHorizonYears} Years</td>
                  <td className="py-2.5 px-3 text-right">
                    {snapshotB.timeHorizonYears - snapshotA.timeHorizonYears >= 0 ? "+" : ""}
                    {snapshotB.timeHorizonYears - snapshotA.timeHorizonYears} Years
                  </td>
                </tr>

                {/* Governance Alignment */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Community Alignment</td>
                  <td className="py-2.5 px-3">{snapshotA.governanceConsensus}%</td>
                  <td className="py-2.5 px-3">{snapshotB.governanceConsensus}%</td>
                  <td className="py-2.5 px-3 text-right">
                    {snapshotB.governanceConsensus - snapshotA.governanceConsensus >= 0 ? "+" : ""}
                    {snapshotB.governanceConsensus - snapshotA.governanceConsensus}%
                  </td>
                </tr>

                {/* Capital Inflow */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Blended Capital Invested</td>
                  <td className="py-2.5 px-3">${snapshotA.blendedCapitalInflow}k USD</td>
                  <td className="py-2.5 px-3">${snapshotB.blendedCapitalInflow}k USD</td>
                  <td className="py-2.5 px-3 text-right">
                    {snapshotB.blendedCapitalInflow - snapshotA.blendedCapitalInflow >= 0 ? "+" : ""}
                    ${snapshotB.blendedCapitalInflow - snapshotA.blendedCapitalInflow}k USD
                  </td>
                </tr>

                {/* Flood Losses */}
                <tr className="hover:bg-white/5 bg-white/[0.02]">
                  <td className="py-2.5 px-3 font-bold text-white">Cumulative Flood Losses</td>
                  <td className="py-2.5 px-3 font-bold text-white">
                    ${(snapshotA.outcomes.floodLossesUSD / 1000000).toFixed(1)}M USD
                  </td>
                  <td className="py-2.5 px-3 font-bold text-white">
                    ${(snapshotB.outcomes.floodLossesUSD / 1000000).toFixed(1)}M USD
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold">
                    {(() => {
                      const delta = snapshotB.outcomes.floodLossesUSD - snapshotA.outcomes.floodLossesUSD;
                      const deltaM = (delta / 1000000).toFixed(1);
                      // Fewer losses in B is better (emerald)
                      const isBetter = delta <= 0;
                      return (
                        <span className={isBetter ? "text-emerald-400" : "text-rose-400"}>
                          {delta >= 0 ? `+$${deltaM}M (+$${Math.abs(Number(deltaM))}M loss)` : `-$${Math.abs(Number(deltaM))}M avoided`}
                        </span>
                      );
                    })()}
                  </td>
                </tr>

                {/* Residents Protected */}
                <tr className="hover:bg-white/5 bg-white/[0.02]">
                  <td className="py-2.5 px-3 font-bold text-white">People Protected</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">
                    {snapshotA.outcomes.residentsProtected.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">
                    {snapshotB.outcomes.residentsProtected.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold">
                    {(() => {
                      const delta = snapshotB.outcomes.residentsProtected - snapshotA.outcomes.residentsProtected;
                      return (
                        <span className={delta >= 0 ? "text-emerald-400" : "text-rose-400"}>
                          {delta >= 0 ? `+${delta.toLocaleString()}` : delta.toLocaleString()}
                        </span>
                      );
                    })()}
                  </td>
                </tr>

                {/* Regenerative Jobs */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Regenerative Jobs</td>
                  <td className="py-2.5 px-3 text-sky-300">{snapshotA.outcomes.jobsCreated}</td>
                  <td className="py-2.5 px-3 text-sky-300">{snapshotB.outcomes.jobsCreated}</td>
                  <td className="py-2.5 px-3 text-right">
                    {snapshotB.outcomes.jobsCreated - snapshotA.outcomes.jobsCreated >= 0 ? "+" : ""}
                    {snapshotB.outcomes.jobsCreated - snapshotA.outcomes.jobsCreated}
                  </td>
                </tr>

                {/* 7-Capitals Lift */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">7-Capitals Lift</td>
                  <td className="py-2.5 px-3 text-[#c5a059]">{snapshotA.outcomes.multiCapitalLift}</td>
                  <td className="py-2.5 px-3 text-[#c5a059]">{snapshotB.outcomes.multiCapitalLift}</td>
                  <td className="py-2.5 px-3 text-right text-white/50">Multi-Asset Index</td>
                </tr>

                {/* Active Policies Count */}
                <tr className="hover:bg-white/5">
                  <td className="py-2.5 px-3 font-medium text-white">Policies Enacted</td>
                  <td className="py-2.5 px-3">{snapshotA.activePolicies.length} Active</td>
                  <td className="py-2.5 px-3">{snapshotB.activePolicies.length} Active</td>
                  <td className="py-2.5 px-3 text-right">
                    {snapshotB.activePolicies.length - snapshotA.activePolicies.length >= 0 ? "+" : ""}
                    {snapshotB.activePolicies.length - snapshotA.activePolicies.length} Policies
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

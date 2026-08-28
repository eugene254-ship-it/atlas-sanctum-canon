import React, { useState } from "react";
import {
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Plus,
  Filter,
  DollarSign,
  Radio,
  Sliders,
  Send,
  X,
  Sparkles
} from "lucide-react";
import { AtlasMission, NavigationSpace } from "../../types";
import { ACTIVE_MISSIONS } from "../../data/seedData";

interface MissionControlViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [missions, setMissions] = useState<AtlasMission[]>(ACTIVE_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<AtlasMission>(ACTIVE_MISSIONS[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [newMissionForm, setNewMissionForm] = useState({
    codeName: "MSN-04",
    title: "",
    objective: "",
    leadGuild: "Hydrology Guild",
    location: "Nairobi Basin, Kenya",
    targetUSD: 250000,
    communityBeneficiaries: 15000,
  });

  const [newMilestoneText, setNewMilestoneText] = useState("");
  const [newDilemmaText, setNewDilemmaText] = useState("");
  const [newResolutionText, setNewResolutionText] = useState("");

  const toggleMilestone = (missionId: string, milestoneId: string) => {
    setMissions(
      missions.map((m) => {
        if (m.id !== missionId) return m;
        return {
          ...m,
          milestones: m.milestones.map((ms) => {
            if (ms.id !== milestoneId) return ms;
            const nextStatus = ms.status === "completed" ? "in-progress" : "completed";
            return { ...ms, status: nextStatus };
          }),
        };
      })
    );

    // Also update selectedMission
    if (selectedMission.id === missionId) {
      setSelectedMission((prev) => ({
        ...prev,
        milestones: prev.milestones.map((ms) => {
          if (ms.id !== milestoneId) return ms;
          const nextStatus = ms.status === "completed" ? "in-progress" : "completed";
          return { ...ms, status: nextStatus };
        }),
      }));
    }
  };

  const handleAddMilestone = () => {
    if (!newMilestoneText.trim()) return;
    const newMs = {
      id: `ms-${Date.now()}`,
      title: newMilestoneText.trim(),
      status: "in-progress" as const,
      responsibleAgent: "Systems Modeling Agent",
      targetDate: "Q4 2026",
    };

    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== selectedMission.id) return m;
        return { ...m, milestones: [...m.milestones, newMs] };
      })
    );

    setSelectedMission((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMs],
    }));

    setNewMilestoneText("");
  };

  const handleAddEthicalLog = () => {
    if (!newDilemmaText.trim() || !newResolutionText.trim()) return;
    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      dilemma: newDilemmaText.trim(),
      resolution: newResolutionText.trim(),
      decidedBy: "Human Stewardship Guild & Council",
    };

    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== selectedMission.id) return m;
        return { ...m, ethicalDecisionLog: [newLog, ...m.ethicalDecisionLog] };
      })
    );

    setSelectedMission((prev) => ({
      ...prev,
      ethicalDecisionLog: [newLog, ...prev.ethicalDecisionLog],
    }));

    setNewDilemmaText("");
    setNewResolutionText("");
  };

  const handleDeployNewMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMissionForm.title.trim()) return;

    const newMsn: AtlasMission = {
      id: `mission-${Date.now()}`,
      codeName: newMissionForm.codeName || `MSN-${missions.length + 1}`,
      title: newMissionForm.title,
      objective: newMissionForm.objective || "Regenerative civilizational intervention.",
      leadGuild: newMissionForm.leadGuild,
      location: newMissionForm.location,
      status: "active",
      healthScore: 92,
      capitalTargetUSD: Number(newMissionForm.targetUSD) || 150000,
      capitalMobilizedUSD: 25000,
      communityBeneficiaries: Number(newMissionForm.communityBeneficiaries) || 5000,
      milestones: [
        {
          id: `ms-init-${Date.now()}`,
          title: "Community Elders Consent & Baseline Sensor Deployment",
          status: "in-progress",
          responsibleAgent: "Governance & Ethics Agent",
          targetDate: "Q3 2026",
        },
        {
          id: `ms-init-2-${Date.now()}`,
          title: "First Tranche Capital Disbursement & Equipment Procured",
          status: "in-progress",
          responsibleAgent: "Capital Intelligence Agent",
          targetDate: "Q4 2026",
        },
      ],
      activeRisks: [
        {
          id: `risk-${Date.now()}`,
          title: "Local Currency Volatility vs. Imported Solar Pumps",
          severity: "medium",
          mitigation: "Hedge via dual-tranche green bond with local SACCO cooperative guarantee.",
        },
      ],
      ethicalDecisionLog: [
        {
          id: `eth-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          dilemma: "Land tenure disputes between informal settlements and regional water basin authority.",
          resolution: "Drafted perpetual Community Land Trust with 100% youth stewardship rights.",
          decidedBy: "Regional Elders Council & Atlas Legal Agent",
        },
      ],
    };

    setMissions([newMsn, ...missions]);
    setSelectedMission(newMsn);
    setShowDeployModal(false);
    setNewMissionForm({
      codeName: `MSN-0${missions.length + 2}`,
      title: "",
      objective: "",
      leadGuild: "Hydrology Guild",
      location: "Nairobi Basin, Kenya",
      targetUSD: 250000,
      communityBeneficiaries: 15000,
    });
  };

  const filteredMissions = missions.filter((m) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "hydrology") return m.leadGuild.toLowerCase().includes("hydrology") || m.title.toLowerCase().includes("water") || m.title.toLowerCase().includes("sponge");
    if (activeFilter === "energy") return m.leadGuild.toLowerCase().includes("energy") || m.title.toLowerCase().includes("geothermal") || m.title.toLowerCase().includes("solar");
    if (activeFilter === "agriculture") return m.leadGuild.toLowerCase().includes("agri") || m.title.toLowerCase().includes("agro") || m.title.toLowerCase().includes("biochar");
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>REAL-WORLD DEPLOYMENT & FIELD GOVERNANCE</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Atlas Mission Control
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Live operational dashboard tracking deployed regenerative interventions, milestone progress, community safety protocols, and blended capital deployment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-deploy-new-mission"
            onClick={() => setShowDeployModal(true)}
            className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-[0.15em] transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>DEPLOY NEW MISSION</span>
          </button>

          <div className="px-4 py-2 bg-[#080808] border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>ACTIVE: {missions.length} DEPLOYED</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 bg-[#0a0a0a] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "ALL DEPLOYMENTS" },
            { id: "hydrology", label: "HYDROLOGY & WATERSHEDS" },
            { id: "energy", label: "CLEAN ENERGY & THERMAL" },
            { id: "agriculture", label: "AGROFORESTRY & SOILS" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all ${
                activeFilter === f.id
                  ? "bg-[#c5a059] text-[#080808] font-bold"
                  : "bg-[#121212] hover:bg-[#181818] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-white/40 flex items-center space-x-2">
          <Activity className="w-3 h-3 text-[#c5a059]" />
          <span>Real-time Field Telemetry Frequency: 15s</span>
        </div>
      </div>

      {/* 3-Column Mission Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMissions.map((msn) => {
          const isSelected = selectedMission.id === msn.id;
          const completedCount = msn.milestones.filter((m) => m.status === "completed").length;
          const progressPct = Math.round((completedCount / msn.milestones.length) * 100);

          return (
            <div
              key={msn.id}
              onClick={() => setSelectedMission(msn)}
              className={`p-6 border cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                  : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-700/50">
                    {msn.codeName}
                  </span>
                  <span className="text-white/40">Health: <strong className="text-emerald-400">{msn.healthScore}%</strong></span>
                </div>

                <h3 className="font-serif font-normal text-lg text-white leading-snug">
                  {msn.title}
                </h3>

                <p className="text-xs text-white/50 line-clamp-2 font-sans">
                  {msn.objective}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/40 text-[10px] uppercase">
                  <span>Milestones ({completedCount}/{msn.milestones.length})</span>
                  <span className="text-[#c5a059] font-bold">{progressPct}%</span>
                </div>
                <div className="w-full bg-[#080808] h-1.5">
                  <div className="bg-[#c5a059] h-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/40">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    <span>{msn.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-white/40" />
                    <span>{msn.communityBeneficiaries.toLocaleString()} pop</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mission Deep Inspector: Milestones, Live Risks, and Ethical Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Milestones & Execution Tasks (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                <span>OPERATION [{selectedMission.codeName}]</span>
                <span className="text-[#c5a059] font-mono">{selectedMission.leadGuild}</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {selectedMission.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {selectedMission.objective}
              </p>
            </div>

            {/* Milestones Execution List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                <span>Field Execution Milestones</span>
                <span>Click checkbox to toggle status</span>
              </div>

              <div className="space-y-2">
                {selectedMission.milestones.map((ms) => {
                  const isDone = ms.status === "completed";
                  return (
                    <div
                      key={ms.id}
                      className={`p-4 border transition-all flex items-center justify-between gap-3 ${
                        isDone
                          ? "bg-[#080808] border-emerald-800/40 text-white/80"
                          : "bg-[#080808] border-white/10 text-white/60"
                      }`}
                    >
                      <div className="flex items-start space-x-3 min-w-0">
                        <button
                          onClick={() => toggleMilestone(selectedMission.id, ms.id)}
                          className={`mt-0.5 w-4 h-4 flex items-center justify-center border transition-colors shrink-0 ${
                            isDone
                              ? "bg-[#c5a059] border-[#c5a059] text-[#080808]"
                              : "border-white/20 hover:border-[#c5a059] bg-[#0c0c0c]"
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div className="min-w-0">
                          <div className={`text-xs font-serif ${isDone ? "line-through text-white/40" : "text-white"}`}>
                            {ms.title}
                          </div>
                          <div className="text-[10px] text-white/40 font-mono flex items-center space-x-2 mt-0.5">
                            <span>Owner: {ms.responsibleAgent}</span>
                            <span>•</span>
                            <span>Target: {ms.targetDate}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 border uppercase shrink-0 ${
                          isDone
                            ? "bg-[#0a1610] text-emerald-300 border-emerald-800"
                            : "bg-[#181308] text-[#c5a059] border-[#c5a059]/40"
                        }`}
                      >
                        {ms.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Add New Milestone Input */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newMilestoneText}
                  onChange={(e) => setNewMilestoneText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddMilestone()}
                  placeholder="Add target milestone (e.g. 'Deploy solar sensor node #08')..."
                  className="flex-1 px-3 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
                />
                <button
                  onClick={handleAddMilestone}
                  className="px-3 py-2 bg-[#181308] border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-xs font-mono font-bold transition-all shrink-0"
                >
                  ADD MILESTONE
                </button>
              </div>
            </div>

            {/* Capital Progress Summary */}
            <div className="p-5 bg-[#080808] border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-white/40 text-[10px] uppercase">
                <span>Capital Mobilized:</span>
                <span className="text-white font-bold">
                  ${selectedMission.capitalMobilizedUSD.toLocaleString()} / ${selectedMission.capitalTargetUSD.toLocaleString()} USD
                </span>
              </div>
              <div className="w-full bg-[#121212] h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-[#c5a059] h-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (selectedMission.capitalMobilizedUSD / selectedMission.capitalTargetUSD) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-white/40 pt-1">
                <span>Beneficiaries: {selectedMission.communityBeneficiaries.toLocaleString()} residents</span>
                <span>ROI: 100% Social & Ecological Dividend</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Risk Monitor & Human Decision Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Field Risks */}
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>LIVE FIELD RISK MONITOR</span>
            </div>

            <div className="space-y-3">
              {selectedMission.activeRisks.map((risk) => (
                <div key={risk.id} className="p-4 bg-[#080808] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                    <span className="font-bold text-white">{risk.title}</span>
                    <span
                      className={`px-2 py-0.2 border text-[9px] ${
                        risk.severity === "high"
                          ? "bg-[#180d0d] text-rose-300 border-rose-800"
                          : "bg-[#181308] text-[#c5a059] border-[#c5a059]/40"
                      }`}
                    >
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans">
                    <strong className="text-white/80">Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ethical Decision Log */}
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ETHICAL & HUMAN CONSCIENCE LOG</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {selectedMission.ethicalDecisionLog.map((log) => (
                <div key={log.id} className="p-4 bg-[#080808] border border-white/10 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-wider">
                    <span>{log.date}</span>
                    <span className="text-[#c5a059] font-semibold">{log.decidedBy}</span>
                  </div>
                  <div className="font-normal text-white font-serif">
                    {log.dilemma}
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed font-sans">
                    <strong className="text-[#c5a059]">Resolution:</strong> {log.resolution}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Conscience Log Entry */}
            <div className="p-3 bg-[#080808] border border-white/10 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-white/40">Record Governance Conscience Decision</span>
              <input
                type="text"
                value={newDilemmaText}
                onChange={(e) => setNewDilemmaText(e.target.value)}
                placeholder="Ethical dilemma or community trade-off..."
                className="w-full px-2.5 py-1.5 bg-[#050505] border border-white/10 text-xs text-white placeholder-white/30 outline-none font-sans"
              />
              <input
                type="text"
                value={newResolutionText}
                onChange={(e) => setNewResolutionText(e.target.value)}
                placeholder="Consensus resolution & elder approval..."
                className="w-full px-2.5 py-1.5 bg-[#050505] border border-white/10 text-xs text-white placeholder-white/30 outline-none font-sans"
              />
              <button
                onClick={handleAddEthicalLog}
                className="w-full py-1.5 bg-[#181308] border border-[#c5a059]/40 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-[10px] font-mono font-bold transition-all"
              >
                RECORD CONSCIENCE DECISION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Mission Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0c0c0c] border border-[#c5a059] shadow-2xl p-6 sm:p-8 space-y-6 text-[#f2f2f2]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-serif text-xl text-white">Deploy Real-World Regenerative Mission</h3>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDeployNewMission} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Mission Code</label>
                  <input
                    type="text"
                    value={newMissionForm.codeName}
                    onChange={(e) => setNewMissionForm({ ...newMissionForm, codeName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Lead Guild</label>
                  <select
                    value={newMissionForm.leadGuild}
                    onChange={(e) => setNewMissionForm({ ...newMissionForm, leadGuild: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white font-mono"
                  >
                    <option>Hydrology Guild</option>
                    <option>Clean Energy & Thermal Guild</option>
                    <option>Agroforestry & Soil Guild</option>
                    <option>Community Governance Guild</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Mission Title</label>
                <input
                  type="text"
                  value={newMissionForm.title}
                  onChange={(e) => setNewMissionForm({ ...newMissionForm, title: e.target.value })}
                  placeholder="e.g. Rift Valley Geothermal Cold Storage Hub"
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Core Objective</label>
                <textarea
                  value={newMissionForm.objective}
                  onChange={(e) => setNewMissionForm({ ...newMissionForm, objective: e.target.value })}
                  placeholder="Define measurable ecological and social outcomes..."
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white h-20 resize-none font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Location</label>
                  <input
                    type="text"
                    value={newMissionForm.location}
                    onChange={(e) => setNewMissionForm({ ...newMissionForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Target Capital ($ USD)</label>
                  <input
                    type="number"
                    value={newMissionForm.targetUSD}
                    onChange={(e) => setNewMissionForm({ ...newMissionForm, targetUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeployModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold font-mono text-xs tracking-wider"
                >
                  AUTHORIZE & DEPLOY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

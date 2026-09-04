import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from "recharts";
import {
  Activity,
  Cpu,
  Flame,
  ShieldCheck,
  Zap,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Wifi,
  Radio,
  Sliders,
  Palette
} from "lucide-react";
import { useSystemState } from "../context/SystemContext";

interface MetricDataPoint {
  time: string;
  p50Latency: number;
  p95Latency: number;
  swarmHealth: number;
  throughput: number;
}

interface AgentTelemetryNode {
  id: string;
  name: string;
  role: string;
  health: number;
  latencyMs: number;
  status: "ONLINE" | "DELIBERATING" | "DEGRADED";
  load: number;
  tokenThroughput: number;
}

const INITIAL_NODES: AgentTelemetryNode[] = [
  {
    id: "agent-1",
    name: "Causal Loop Architect",
    role: "System Dynamics & Stock-Flow Modeling",
    health: 99.8,
    latencyMs: 112,
    status: "ONLINE",
    load: 42,
    tokenThroughput: 340,
  },
  {
    id: "agent-2",
    name: "Blended Capital Structurer",
    role: "7-Capitals & Non-Extractive Finance",
    health: 99.2,
    latencyMs: 138,
    status: "ONLINE",
    load: 56,
    tokenThroughput: 280,
  },
  {
    id: "agent-3",
    name: "Customary Governance Steward",
    role: "Polycentric Commons & Ostrom Rules",
    health: 100.0,
    latencyMs: 94,
    status: "ONLINE",
    load: 31,
    tokenThroughput: 210,
  },
  {
    id: "agent-4",
    name: "Socratic Inquisitor",
    role: "Premise Falsification & Rigor Engine",
    health: 98.4,
    latencyMs: 165,
    status: "DELIBERATING",
    load: 78,
    tokenThroughput: 490,
  },
  {
    id: "agent-5",
    name: "Ecological Hydrologist",
    role: "Infiltration Telemetry & Bio-Sensors",
    health: 99.6,
    latencyMs: 120,
    status: "ONLINE",
    load: 38,
    tokenThroughput: 245,
  },
  {
    id: "agent-6",
    name: "Reality Synthesizer",
    role: "Cross-Disciplinary Swarm Convergence",
    health: 99.7,
    latencyMs: 142,
    status: "ONLINE",
    load: 64,
    tokenThroughput: 410,
  },
];

const INITIAL_TIME_SERIES: MetricDataPoint[] = [
  { time: "T-30s", p50Latency: 118, p95Latency: 182, swarmHealth: 99.5, throughput: 1720 },
  { time: "T-25s", p50Latency: 124, p95Latency: 196, swarmHealth: 99.1, throughput: 1840 },
  { time: "T-20s", p50Latency: 112, p95Latency: 175, swarmHealth: 99.8, throughput: 1690 },
  { time: "T-15s", p50Latency: 135, p95Latency: 210, swarmHealth: 98.6, throughput: 1980 },
  { time: "T-10s", p50Latency: 128, p95Latency: 190, swarmHealth: 99.4, throughput: 1760 },
  { time: "T-5s",  p50Latency: 122, p95Latency: 184, swarmHealth: 99.7, throughput: 1810 },
  { time: "Now",   p50Latency: 129, p95Latency: 195, swarmHealth: 99.4, throughput: 1875 },
];

export const SwarmDiagnosticsPanel: React.FC = () => {
  const {
    chartTheme,
    toggleChartTheme,
    setIsSettingsOpen,
    isAnomalyDetectionActive,
    toggleAnomalyDetection,
    triggerSimulatedAnomaly,
  } = useSystemState();
  const [timeSeries, setTimeSeries] = useState<MetricDataPoint[]>(INITIAL_TIME_SERIES);
  const [agents, setAgents] = useState<AgentTelemetryNode[]>(INITIAL_NODES);
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [isSpikeMode, setIsSpikeMode] = useState(false);
  const [metricView, setMetricView] = useState<"latency" | "health" | "all">("all");
  const [pingSuccess, setPingSuccess] = useState(false);

  // Real-time metric ticker
  useEffect(() => {
    if (!isLivePolling) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      // Jitter metrics realistically
      const spikeFactor = isSpikeMode ? 1.8 : 1.0;
      const newP50 = Math.round((115 + Math.random() * 25) * spikeFactor);
      const newP95 = Math.round((175 + Math.random() * 40) * spikeFactor);
      const newHealth = parseFloat(
        (isSpikeMode ? 96.2 + Math.random() * 2 : 99.0 + Math.random() * 0.9).toFixed(1)
      );
      const newThroughput = Math.round(1600 + Math.random() * 350);

      setTimeSeries((prev) => {
        const next = [
          ...prev.slice(1),
          {
            time: timeStr,
            p50Latency: newP50,
            p95Latency: newP95,
            swarmHealth: newHealth,
            throughput: newThroughput,
          },
        ];
        return next;
      });

      // Update per-agent telemetry fluctuations
      setAgents((prev) =>
        prev.map((agent) => {
          const deltaLatency = Math.round((Math.random() - 0.5) * 12);
          const currentLatency = Math.max(70, Math.min(300, agent.latencyMs + deltaLatency));
          const currentHealth = parseFloat(
            Math.min(100, Math.max(95, agent.health + (Math.random() - 0.5) * 0.4)).toFixed(1)
          );
          const currentLoad = Math.min(95, Math.max(20, Math.round(agent.load + (Math.random() - 0.5) * 8)));
          return {
            ...agent,
            latencyMs: currentLatency,
            health: currentHealth,
            load: currentLoad,
          };
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, [isLivePolling, isSpikeMode]);

  const handlePingSwarm = () => {
    setPingSuccess(true);
    // Temporarily reduce latency
    setTimeSeries((prev) => [
      ...prev.slice(1),
      {
        time: "Ping",
        p50Latency: 84,
        p95Latency: 135,
        swarmHealth: 100.0,
        throughput: 2150,
      },
    ]);
    setTimeout(() => setPingSuccess(false), 2000);
  };

  const currentLatest = timeSeries[timeSeries.length - 1] || INITIAL_TIME_SERIES[INITIAL_TIME_SERIES.length - 1];
  const avgAgentHealth = (
    agents.reduce((acc, curr) => acc + curr.health, 0) / agents.length
  ).toFixed(1);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050505] overflow-y-auto p-4 space-y-4 font-sans text-white">
      {/* Top Diagnostics KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
        <div className="p-3 bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 text-[10px] font-mono uppercase">
            <span>SWARM INTEGRITY</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="my-1.5 flex items-baseline space-x-1.5">
            <span className="text-xl font-bold font-mono text-emerald-400">{avgAgentHealth}%</span>
            <span className="text-[10px] text-emerald-400/70 font-mono">NOMINAL</span>
          </div>
          <span className="text-[9px] text-white/40">6/6 agents synchronized</span>
        </div>

        <div className="p-3 bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 text-[10px] font-mono uppercase">
            <span>P50 LATENCY</span>
            <Zap className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="my-1.5 flex items-baseline space-x-1.5">
            <span className="text-xl font-bold font-mono text-sky-400">{currentLatest.p50Latency}ms</span>
            <span className="text-[10px] text-sky-400/70 font-mono">RTT</span>
          </div>
          <span className="text-[9px] text-white/40">Within 150ms budget</span>
        </div>

        <div className="p-3 bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 text-[10px] font-mono uppercase">
            <span>P95 TAIL LATENCY</span>
            <Activity className="w-3.5 h-3.5 text-[#c5a059]" />
          </div>
          <div className="my-1.5 flex items-baseline space-x-1.5">
            <span className="text-xl font-bold font-mono text-[#c5a059]">{currentLatest.p95Latency}ms</span>
            <span className="text-[10px] text-[#c5a059]/70 font-mono">TAIL</span>
          </div>
          <span className="text-[9px] text-white/40">Max tolerable: 350ms</span>
        </div>

        <div className="p-3 bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 text-[10px] font-mono uppercase">
            <span>SWARM THROUGHPUT</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="my-1.5 flex items-baseline space-x-1.5">
            <span className="text-xl font-bold font-mono text-amber-400">{currentLatest.throughput}</span>
            <span className="text-[10px] text-amber-400/70 font-mono">TOK/S</span>
          </div>
          <span className="text-[9px] text-white/40">Multi-agent parallel flow</span>
        </div>

        <div className="p-3 bg-[#0c0c0c] border border-white/10 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] font-mono uppercase">
            <span>CONSENSUS CONVERGENCE</span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="my-1.5 flex items-baseline space-x-1.5">
            <span className="text-xl font-bold font-mono text-purple-400">98.9%</span>
            <span className="text-[10px] text-purple-400/70 font-mono">CONVERGED</span>
          </div>
          <span className="text-[9px] text-white/40">0 deadlocks detected</span>
        </div>
      </div>

      {/* Interactive Recharts Line Chart Container */}
      <div className="p-4 bg-[#0a0a0a] border border-white/10 flex flex-col space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#c5a059]" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              REAL-TIME LATENCY & SWARM HEALTH TELEMETRY
            </h4>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
              RECHARTS STREAM ACTIVE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#121212] p-0.5 border border-white/10 text-[10px] font-mono">
              <button
                onClick={() => setMetricView("all")}
                className={`px-2 py-0.5 ${
                  metricView === "all" ? "bg-[#c5a059] text-[#080808] font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setMetricView("latency")}
                className={`px-2 py-0.5 ${
                  metricView === "latency" ? "bg-[#c5a059] text-[#080808] font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                LATENCY ONLY
              </button>
              <button
                onClick={() => setMetricView("health")}
                className={`px-2 py-0.5 ${
                  metricView === "health" ? "bg-[#c5a059] text-[#080808] font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                HEALTH ONLY
              </button>
            </div>

            {/* Anomaly Detection Toggle */}
            <button
              id="btn-anomaly-detection-toggle"
              onClick={toggleAnomalyDetection}
              className={`px-2 py-1 text-[10px] font-mono uppercase border transition-all flex items-center space-x-1.5 ${
                isAnomalyDetectionActive
                  ? "bg-amber-950/60 border-amber-500/80 text-amber-300 font-bold"
                  : "bg-[#121212] border-white/10 text-white/40 hover:text-white"
              }`}
              title="Toggle continuous Anomaly Detection Watchdog (alerts on agent latency spikes and jitter)"
            >
              <AlertTriangle
                className={`w-3 h-3 ${isAnomalyDetectionActive ? "text-amber-400 animate-pulse" : "text-white/30"}`}
              />
              <span>ANOMALY DETECTION: {isAnomalyDetectionActive ? "ON" : "OFF"}</span>
            </button>

            {/* Data Visualization Theme Toggle */}
            <button
              id="btn-chart-theme-toggle"
              onClick={toggleChartTheme}
              className={`px-2 py-1 text-[10px] font-mono uppercase border transition-all flex items-center space-x-1.5 ${
                chartTheme === "high-contrast"
                  ? "bg-[#1f190e] border-[#c5a059] text-[#c5a059] font-bold"
                  : "bg-[#121212] border-white/20 text-white/70 hover:text-white"
              }`}
              title={`Active Chart Style: ${chartTheme.toUpperCase()}. Click to switch or open Settings.`}
            >
              <Palette className="w-3 h-3 text-[#c5a059]" />
              <span>THEME: {chartTheme === "high-contrast" ? "HIGH-CONTRAST" : "MINIMALIST"}</span>
            </button>

            {/* Benchmark Ping Button */}
            <button
              id="btn-ping-swarm-telemetry"
              onClick={handlePingSwarm}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase border transition-all flex items-center space-x-1.5 ${
                pingSuccess
                  ? "bg-emerald-500 text-black font-bold border-emerald-400"
                  : "bg-[#141414] hover:bg-[#1f1f1f] text-[#c5a059] border-[#c5a059]/40"
              }`}
            >
              <Wifi className="w-3 h-3" />
              <span>{pingSuccess ? "PING RECEIVED: 84ms" : "PING SWARM"}</span>
            </button>

            {/* Spike Simulation Toggle */}
            <button
              id="btn-simulate-telemetry-spike"
              onClick={() => {
                const next = !isSpikeMode;
                setIsSpikeMode(next);
                if (next && isAnomalyDetectionActive) {
                  triggerSimulatedAnomaly({
                    agentId: "AG-04",
                    agentName: "Socratic Inquisitor",
                    latencyMs: 385,
                    thresholdMs: 180,
                    message: "High latency spike detected on AG-04 Socratic Inquisitor: 385ms RTT (threshold: 180ms). Irregular swarm jitter observed.",
                  });
                }
              }}
              className={`px-2 py-1 text-[10px] font-mono uppercase border transition-all ${
                isSpikeMode
                  ? "bg-rose-950/60 text-rose-300 border-rose-700 font-bold"
                  : "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border-white/10"
              }`}
              title="Simulate network jitter and latency spike"
            >
              {isSpikeMode ? "NORMALIZING..." : "SIMULATE SPIKE"}
            </button>

            <button
              onClick={() => setIsLivePolling(!isLivePolling)}
              className="p-1 text-white/40 hover:text-white hover:bg-white/10 border border-white/10"
              title={isLivePolling ? "Pause Real-Time Polling" : "Resume Real-Time Polling"}
            >
              <RefreshCw className={`w-3 h-3 ${isLivePolling ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray={chartTheme === "high-contrast" ? "3 3" : "1 4"}
                stroke={chartTheme === "high-contrast" ? "#333333" : "#181818"}
              />
              <XAxis
                dataKey="time"
                stroke={chartTheme === "high-contrast" ? "#888888" : "#444444"}
                tick={{
                  fill: chartTheme === "high-contrast" ? "#aaaaaa" : "#666666",
                  fontSize: 10,
                  fontFamily: "monospace"
                }}
              />
              <YAxis
                yAxisId="latency"
                orientation="left"
                stroke={chartTheme === "high-contrast" ? "#888888" : "#444444"}
                tick={{
                  fill: chartTheme === "high-contrast" ? "#aaaaaa" : "#666666",
                  fontSize: 10,
                  fontFamily: "monospace"
                }}
                domain={[50, 320]}
                unit="ms"
              />
              {metricView !== "latency" && (
                <YAxis
                  yAxisId="health"
                  orientation="right"
                  stroke={chartTheme === "high-contrast" ? "#ffd700" : "#c5a059"}
                  tick={{
                    fill: chartTheme === "high-contrast" ? "#ffd700" : "#c5a059",
                    fontSize: 10,
                    fontFamily: "monospace"
                  }}
                  domain={[90, 100]}
                  unit="%"
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme === "high-contrast" ? "#000000" : "#0c0c0c",
                  borderColor: chartTheme === "high-contrast" ? "#ffd700" : "rgba(197, 160, 89, 0.3)",
                  borderWidth: chartTheme === "high-contrast" ? "1.5px" : "1px",
                  borderRadius: "2px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#ffffff",
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "6px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              />
              {(metricView === "all" || metricView === "latency") && (
                <Line
                  yAxisId="latency"
                  type="monotone"
                  dataKey="p50Latency"
                  name="P50 Latency (ms)"
                  stroke={chartTheme === "high-contrast" ? "#00f0ff" : "#c5a059"}
                  strokeWidth={chartTheme === "high-contrast" ? 2.5 : 1.3}
                  dot={chartTheme === "high-contrast" ? { r: 3.5, fill: "#00f0ff" } : false}
                  activeDot={{ r: chartTheme === "high-contrast" ? 6 : 4 }}
                  isAnimationActive={false}
                />
              )}
              {(metricView === "all" || metricView === "latency") && (
                <Line
                  yAxisId="latency"
                  type="monotone"
                  dataKey="p95Latency"
                  name="P95 Tail Latency (ms)"
                  stroke={chartTheme === "high-contrast" ? "#fb7185" : "#71717a"}
                  strokeWidth={chartTheme === "high-contrast" ? 2 : 1}
                  strokeDasharray={chartTheme === "high-contrast" ? "4 2" : "3 3"}
                  dot={chartTheme === "high-contrast" ? { r: 2.5, fill: "#fb7185" } : false}
                  activeDot={{ r: chartTheme === "high-contrast" ? 5 : 3 }}
                  isAnimationActive={false}
                />
              )}
              {(metricView === "all" || metricView === "latency") && isAnomalyDetectionActive && (
                <ReferenceLine
                  yAxisId="latency"
                  y={220}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: "ANOMALY SPIKE THRESHOLD (220ms)",
                    fill: "#f59e0b",
                    fontSize: 9,
                    position: "insideTopRight",
                  }}
                />
              )}
              {(metricView === "all" || metricView === "health") && (
                <Line
                  yAxisId="health"
                  type="monotone"
                  dataKey="swarmHealth"
                  name="Swarm Health Index (%)"
                  stroke={chartTheme === "high-contrast" ? "#00ff88" : "#e4e4e7"}
                  strokeWidth={chartTheme === "high-contrast" ? 2.5 : 1.3}
                  dot={chartTheme === "high-contrast" ? { r: 3.5, fill: "#00ff88" } : false}
                  activeDot={{ r: chartTheme === "high-contrast" ? 6 : 4 }}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Swarm Agent Health Matrix */}
      <div className="p-3 bg-[#0a0a0a] border border-white/10 flex flex-col space-y-2">
        <div className="flex items-center justify-between text-xs pb-1 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              AGENT SWARM PARTICIPANT HEALTH & WORKLOAD MATRIX
            </span>
          </div>
          <span className="text-[9px] font-mono text-white/40">
            AUTO-REBALANCED · 0 LATENCY ANOMALIES
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead>
              <tr className="text-white/40 border-b border-white/5 text-[9px] uppercase tracking-wider">
                <th className="py-1.5 px-2">Agent Name</th>
                <th className="py-1.5 px-2">Cognitive Role</th>
                <th className="py-1.5 px-2 text-center">Status</th>
                <th className="py-1.5 px-2 text-right">Health</th>
                <th className="py-1.5 px-2 text-right">Latency (RTT)</th>
                <th className="py-1.5 px-2 text-right">Compute Load</th>
                <th className="py-1.5 px-2 text-right">Tokens / Sec</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {agents.map((agent) => (
                <tr key={agent.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-1.5 px-2 font-medium text-white flex items-center space-x-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        agent.health >= 99 ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    ></span>
                    <span>{agent.name}</span>
                  </td>
                  <td className="py-1.5 px-2 text-white/50 text-[10px]">{agent.role}</td>
                  <td className="py-1.5 px-2 text-center">
                    <span
                      className={`px-1.5 py-0.2 text-[8px] uppercase tracking-wider border font-bold ${
                        agent.status === "ONLINE"
                          ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                          : agent.status === "DELIBERATING"
                          ? "bg-purple-950/60 text-purple-300 border-purple-800"
                          : "bg-rose-950/60 text-rose-300 border-rose-800"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-right font-bold text-emerald-400">
                    {agent.health.toFixed(1)}%
                  </td>
                  <td className="py-1.5 px-2 text-right">
                    <span
                      className={`font-bold ${
                        agent.latencyMs < 130
                          ? "text-sky-400"
                          : agent.latencyMs < 180
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {agent.latencyMs}ms
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      <div className="w-12 h-1.5 bg-white/10 rounded-xs overflow-hidden">
                        <div
                          className={`h-full ${
                            agent.load < 60 ? "bg-sky-400" : agent.load < 80 ? "bg-amber-400" : "bg-rose-500"
                          }`}
                          style={{ width: `${agent.load}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-white/50 w-7">{agent.load}%</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-2 text-right text-white/60">
                    {agent.tokenThroughput} t/s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

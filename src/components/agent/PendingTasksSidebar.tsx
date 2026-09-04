import React, { useState, useEffect } from "react";
import {
  ListTodo,
  Cpu,
  Clock,
  RotateCw,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowRight,
  Zap,
  Sparkles,
  X
} from "lucide-react";

export interface SwarmPendingTask {
  id: string;
  agentCode: string;
  agentName: string;
  taskTitle: string;
  progressPct: number;
  status: "processing" | "queued" | "validating";
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  etaSeconds: number;
  assignedNode: string;
  category: "hydrology" | "capital" | "governance" | "synthesis" | "sensor";
}

const INITIAL_PENDING_TASKS: SwarmPendingTask[] = [
  {
    id: "TSK-9041",
    agentCode: "AG-07",
    agentName: "Simulation Agent",
    taskTitle: "Runoff Bio-Attenuation Simulation (Nairobi Basin)",
    progressPct: 74,
    status: "processing",
    priority: "CRITICAL",
    etaSeconds: 12,
    assignedNode: "Compute-Node #04",
    category: "hydrology",
  },
  {
    id: "TSK-9042",
    agentCode: "AG-06",
    agentName: "Capital Intelligence Agent",
    taskTitle: "7-Capitals Blended Term Sheet Verification ($350k USD)",
    progressPct: 48,
    status: "processing",
    priority: "HIGH",
    etaSeconds: 34,
    assignedNode: "Compute-Node #02",
    category: "capital",
  },
  {
    id: "TSK-9043",
    agentCode: "AG-08",
    agentName: "Governance Agent",
    taskTitle: "Elder Council Customary Water Rights Audit",
    progressPct: 91,
    status: "validating",
    priority: "HIGH",
    etaSeconds: 6,
    assignedNode: "Compute-Node #07",
    category: "governance",
  },
  {
    id: "TSK-9044",
    agentCode: "AG-01",
    agentName: "Research Agent",
    taskTitle: "Volcanic Basalt Infiltration Constant Calibration",
    progressPct: 22,
    status: "queued",
    priority: "NORMAL",
    etaSeconds: 58,
    assignedNode: "Compute-Node #01",
    category: "sensor",
  },
  {
    id: "TSK-9045",
    agentCode: "AG-02",
    agentName: "Systems Modeling Agent",
    taskTitle: "Multi-Scale Meadows Leverage Point Sensitivity Scan",
    progressPct: 15,
    status: "queued",
    priority: "NORMAL",
    etaSeconds: 85,
    assignedNode: "Compute-Node #03",
    category: "synthesis",
  },
];

interface PendingTasksSidebarProps {
  onSelectTaskToDeliberate?: (taskTitle: string, agentCode: string) => void;
  onClose?: () => void;
}

export const PendingTasksSidebar: React.FC<PendingTasksSidebarProps> = ({
  onSelectTaskToDeliberate,
  onClose,
}) => {
  const [tasks, setTasks] = useState<SwarmPendingTask[]>(INITIAL_PENDING_TASKS);
  const [filter, setFilter] = useState<"ALL" | "processing" | "queued" | "validating">("ALL");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAgent, setNewTaskAgent] = useState("AG-01");
  const [newTaskPriority, setNewTaskPriority] = useState<"CRITICAL" | "HIGH" | "NORMAL">("HIGH");

  // Simulated live progress ticker for active operations
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.status === "processing") {
            const nextProgress = t.progressPct + (Math.floor(Math.random() * 3) + 1);
            if (nextProgress >= 98) {
              return {
                ...t,
                progressPct: 100,
                status: "validating",
                etaSeconds: 4,
              };
            }
            return {
              ...t,
              progressPct: nextProgress,
              etaSeconds: Math.max(1, t.etaSeconds - 1),
            };
          } else if (t.status === "validating") {
            if (t.etaSeconds <= 1) {
              // Task completed, cycle or restart with fresh queued
              return {
                ...t,
                progressPct: 100,
                etaSeconds: 0,
              };
            }
            return {
              ...t,
              etaSeconds: Math.max(0, t.etaSeconds - 1),
            };
          } else if (t.status === "queued" && Math.random() > 0.7) {
            return {
              ...t,
              status: "processing",
              progressPct: 5,
            };
          }
          return t;
        })
      );
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "ALL") return true;
    return t.status === filter;
  });

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const agentNames: Record<string, string> = {
      "AG-01": "Research Agent",
      "AG-02": "Systems Modeling Agent",
      "AG-03": "Deep Questioning Agent",
      "AG-04": "Opportunity Scout",
      "AG-05": "Innovation Engineer",
      "AG-06": "Capital Intelligence Agent",
      "AG-07": "Simulation Agent",
      "AG-08": "Governance Agent",
      "AG-09": "Field Translation Agent",
      "AG-10": "Synthesizer Agent",
    };

    const newTask: SwarmPendingTask = {
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      agentCode: newTaskAgent,
      agentName: agentNames[newTaskAgent] || "Autonomous Agent",
      taskTitle: newTaskTitle.trim(),
      progressPct: 0,
      status: "queued",
      priority: newTaskPriority,
      etaSeconds: 45,
      assignedNode: `Compute-Node #${Math.floor(Math.random() * 8) + 1}`,
      category: "synthesis",
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  const handleForceComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, progressPct: 100, status: "validating", etaSeconds: 0 }
          : t
      )
    );
  };

  const handlePrioritize = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, priority: "CRITICAL", status: "processing" }
          : t
      )
    );
  };

  const processingCount = tasks.filter((t) => t.status === "processing").length;
  const queuedCount = tasks.filter((t) => t.status === "queued").length;
  const validatingCount = tasks.filter((t) => t.status === "validating").length;

  return (
    <div
      id="pending-tasks-sidebar"
      className="bg-[#0a0a0a] border border-white/10 flex flex-col h-full space-y-4 p-5 font-mono animate-fadeIn"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <ListTodo className="w-4 h-4 text-[#c5a059]" />
          <div>
            <h3 className="font-serif font-medium text-sm text-white tracking-wide">
              Pending Swarm Tasks
            </h3>
            <div className="text-[9px] text-white/40 tracking-wider">
              {tasks.length} QUEUED & ACTIVE OPERATIONS
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="p-1.5 bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 text-[#c5a059] text-xs transition-all"
            title="Queue New Swarm Operation"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-white/40 hover:text-white text-xs transition-all"
              title="Close Sidebar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Swarm Capacity Meter */}
      <div className="p-3 bg-[#0d0d0d] border border-white/5 space-y-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/60">SWARM THROUGHPUT:</span>
          <span className="text-emerald-400 font-bold">88.4 OPS/SEC</span>
        </div>
        <div className="w-full bg-white/5 h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#c5a059] to-emerald-400 h-full transition-all duration-500"
            style={{ width: "76%" }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[9px] text-white/40">
          <span>LATENCY: 142ms</span>
          <span>NODES: 8/8 ACTIVE</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 text-[9px]">
        {[
          { id: "ALL", label: `ALL (${tasks.length})` },
          { id: "processing", label: `PROCESSING (${processingCount})` },
          { id: "queued", label: `QUEUED (${queuedCount})` },
          { id: "validating", label: `VALIDATING (${validatingCount})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-2 py-1 border transition-all text-center whitespace-nowrap ${
              filter === f.id
                ? "bg-[#161616] border-[#c5a059] text-[#c5a059] font-bold"
                : "border-white/10 text-white/40 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* New Task Inline Form */}
      {isAddingTask && (
        <form
          onSubmit={handleAddNewTask}
          className="p-3 bg-[#111111] border border-[#c5a059]/60 space-y-2 text-xs animate-fadeIn"
        >
          <div className="text-[10px] text-[#c5a059] uppercase tracking-wider font-bold">
            Queue Swarm Operation
          </div>
          <input
            type="text"
            required
            placeholder="Operation objective (e.g. 'Audit microgrid voltage telemetry')..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-2 py-1.5 bg-[#080808] border border-white/10 text-white text-[11px] focus:outline-none focus:border-[#c5a059]"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={newTaskAgent}
              onChange={(e) => setNewTaskAgent(e.target.value)}
              className="bg-[#080808] border border-white/10 text-white text-[10px] px-2 py-1"
            >
              <option value="AG-01">AG-01 Research</option>
              <option value="AG-02">AG-02 Systems</option>
              <option value="AG-06">AG-06 Capital</option>
              <option value="AG-07">AG-07 Simulation</option>
              <option value="AG-08">AG-08 Governance</option>
              <option value="AG-10">AG-10 Synthesis</option>
            </select>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as any)}
              className="bg-[#080808] border border-white/10 text-white text-[10px] px-2 py-1"
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="NORMAL">NORMAL</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="px-2 py-1 text-white/50 hover:text-white text-[10px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#c5a059] text-black font-bold text-[10px] uppercase"
            >
              Dispatch to Swarm
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[500px] scrollbar-thin">
        {filteredTasks.length === 0 ? (
          <div className="p-6 text-center text-white/40 text-xs italic">
            No queued operations in this category.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isProcessing = task.status === "processing";
            const isValidating = task.status === "validating";

            return (
              <div
                key={task.id}
                className="p-3 bg-[#0d0d0d] hover:bg-[#121212] border border-white/10 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-[9px]">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#c5a059] font-bold">{task.id}</span>
                    <span className="text-white/40">[{task.agentCode}]</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                        task.priority === "CRITICAL"
                          ? "bg-rose-950 text-rose-300 border border-rose-800"
                          : task.priority === "HIGH"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-white/5 text-white/50 border border-white/10"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-[8px] uppercase tracking-wider font-semibold ${
                        isProcessing
                          ? "text-sky-400"
                          : isValidating
                          ? "text-emerald-400"
                          : "text-white/40"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-white/90 font-sans leading-snug line-clamp-2">
                  {task.taskTitle}
                </div>

                {/* Progress Bar & ETA */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] text-white/50">
                    <span>
                      {task.assignedNode}
                    </span>
                    <span>
                      {isValidating
                        ? "Verifying consensus..."
                        : `${task.progressPct}% (ETA ${task.etaSeconds}s)`}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isValidating
                          ? "bg-emerald-400"
                          : isProcessing
                          ? "bg-[#c5a059]"
                          : "bg-white/20"
                      }`}
                      style={{ width: `${task.progressPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Actions on Hover / Focus */}
                <div className="pt-1 flex items-center justify-between border-t border-white/5 text-[9px]">
                  <span className="text-white/30 truncate max-w-[120px]">
                    {task.agentName}
                  </span>
                  <div className="flex items-center space-x-2">
                    {onSelectTaskToDeliberate && (
                      <button
                        onClick={() =>
                          onSelectTaskToDeliberate(task.taskTitle, task.agentCode)
                        }
                        className="text-[#c5a059] hover:underline flex items-center space-x-0.5"
                        title="Inject into Swarm Deliberation Room"
                      >
                        <span>Deliberate</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                    {task.status === "queued" && (
                      <button
                        onClick={() => handlePrioritize(task.id)}
                        className="text-white/40 hover:text-white"
                        title="Prioritize to Critical"
                      >
                        Prioritize
                      </button>
                    )}
                    {task.status !== "validating" && (
                      <button
                        onClick={() => handleForceComplete(task.id)}
                        className="text-white/40 hover:text-emerald-400"
                        title="Force Validate"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

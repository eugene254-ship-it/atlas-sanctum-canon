import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import { PartnershipTarget, SevenCapitalType } from "../types";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Layers,
  Sparkles,
  Info,
  Filter,
  CheckCircle2,
  TrendingUp,
  Award,
  Flame,
  Zap,
  RefreshCw,
  Pin,
  PinOff,
  Play,
  Pause,
  Activity,
  Boxes,
  Compass,
  Radio,
  History,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HelpCircle
} from "lucide-react";

export interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: "core" | "objective" | "partner" | "capital" | "cluster";
  category?: string;
  cluster?: "Frontier Tech" | "Global Development" | "African Infrastructure";
  priority?: "High" | "Medium" | "Low";
  readiness?: number;
  color?: string;
  radius?: number;
  partnerData?: PartnershipTarget;
  isPinned?: boolean;
  onboardingYear?: number;
  isPendingReview?: boolean;
  isChronologicallyActive?: boolean;
}

export interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  relationship: string;
  nature: "compute" | "capital" | "policy" | "field" | "payments" | "governance";
  strength: number; // 1 to 5
  lastUpdatedScenario?: string;
  isPulsing?: boolean;
  isPending?: boolean;
}

export type StrategicClusterType = "ALL" | "Frontier Tech" | "Global Development" | "African Infrastructure";

interface PartnershipNetworkGraphProps {
  targets: PartnershipTarget[];
  selectedPartnerId?: string;
  onSelectPartner?: (partner: PartnershipTarget) => void;
  impactHeatmapEnabled?: boolean;
  onToggleHeatmap?: () => void;
  filterTriggerKey?: string;
  selectedCluster?: StrategicClusterType;
  onSelectCluster?: (cluster: StrategicClusterType) => void;
}

export interface TimelineMilestone {
  year: number;
  title: string;
  subtitle: string;
  description: string;
  keyAnchors: string[];
  activePartnersCount?: number;
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2022,
    title: "Genesis & Anchor Institutions",
    subtitle: "Multilateral & Planetary Foundation",
    description: "Codification of 7-Capitals charter, onboarding Google Cloud, UNDP, and African Development Bank.",
    keyAnchors: ["Google Cloud", "UNDP", "African Development Bank"],
    activePartnersCount: 3,
  },
  {
    year: 2023,
    title: "Planetary Compute & Sovereign Debt",
    subtitle: "Cloud Ingress & Concessional Tranches",
    description: "Integration of AWS planetary data archives, Microsoft Azure government stacks, and World Bank debt facilities.",
    keyAnchors: ["Microsoft", "AWS", "World Bank"],
    activePartnersCount: 6,
  },
  {
    year: 2024,
    title: "Frontier Socratic AI & Financial Inclusion",
    subtitle: "Multi-Agent Deliberation & Grassroots Rails",
    description: "OpenAI multi-agent reasoning, Gates Foundation agroforestry pilots, and Mastercard Community Pass payments.",
    keyAnchors: ["OpenAI", "Gates Foundation", "Mastercard"],
    activePartnersCount: 9,
  },
  {
    year: 2025,
    title: "Living Labs & Regenerative Scaling",
    subtitle: "Planetary Sponge Cities & Full Capital Mesh",
    description: "Rockefeller Foundation resilience grids, 50,000 edge IoT soil checkpoints, and cross-capital syndication.",
    keyAnchors: ["Rockefeller Foundation", "All 10 Core Anchors"],
    activePartnersCount: 10,
  },
  {
    year: 2026,
    title: "Sovereign Agent Swarms & Autonomous Discovery",
    subtitle: "Present Frontier & Emerging Horizons",
    description: "Autonomous topology discovery scan, Constitutional AI safety harnesses, and continental trade corridors.",
    keyAnchors: ["Full Mesh", "Discovered Candidates (Pending Review)"],
    activePartnersCount: 13,
  },
];

const CORE_OBJECTIVES = [
  {
    id: "obj-bio-digital",
    label: "Bio-Digital Infrastructure",
    description: "Geospatial telemetry, sub-meter satellite feeds, and real-time environmental digital twins.",
    color: "#38bdf8",
  },
  {
    id: "obj-sovereign-ai",
    label: "Sovereign AI & Socratic Reasoning",
    description: "Frontier multi-agent swarm deliberation, chain-of-thought verification, and policy deconstruction.",
    color: "#a855f7",
  },
  {
    id: "obj-7cap-finance",
    label: "7-Capitals Concessional Finance",
    description: "Multi-billion blended finance stacks, sovereign green bonds, and multi-capital ledgers.",
    color: "#34d399",
  },
  {
    id: "obj-grassroots-rails",
    label: "Grassroots & Decentralized Rails",
    description: "Last-mile micro-payments, community pass identity, and youth maintenance guild credits.",
    color: "#fbbf24",
  },
  {
    id: "obj-living-labs",
    label: "Living Labs & Field Pilots",
    description: "Decentralized sponge bioswales, agricultural cold chains, and empirical RCT falsification.",
    color: "#f43f5e",
  },
];

const SEVEN_CAPITALS: { type: SevenCapitalType; label: string; color: string }[] = [
  { type: "Natural", label: "Natural Capital", color: "#10b981" },
  { type: "Human", label: "Human Capital", color: "#f59e0b" },
  { type: "Social", label: "Social Capital", color: "#ec4899" },
  { type: "Intellectual", label: "Intellectual Capital", color: "#8b5cf6" },
  { type: "Financial", label: "Financial Capital", color: "#06b6d4" },
  { type: "Physical", label: "Physical Capital", color: "#64748b" },
  { type: "Institutional", label: "Institutional Capital", color: "#3b82f6" },
];

const SCENARIO_SIMULATION_EVENTS = [
  {
    id: "sc-01",
    name: "Great Green Wall Concessional Debt Restructure",
    cluster: "African Infrastructure",
    description: "Syndicating $5B blended facility across AfDB & World Bank ledgers.",
    targetPartnerIds: ["partner-06", "partner-07"],
    nature: "capital",
    deltaWeight: 2,
  },
  {
    id: "sc-02",
    name: "Sub-Meter Hydrological Earth Engine Spike",
    cluster: "Frontier Tech",
    description: "Google Cloud & AWS ingest 500TB raw multispectral flood telemetry.",
    targetPartnerIds: ["partner-01", "partner-04"],
    nature: "compute",
    deltaWeight: 2.5,
  },
  {
    id: "sc-03",
    name: "Pan-African Socratic Multi-Agent Synthesis",
    cluster: "Frontier Tech",
    description: "OpenAI & Microsoft co-compile 10-Agent zero-bias civilizational audit.",
    targetPartnerIds: ["partner-02", "partner-03"],
    nature: "compute",
    deltaWeight: 2,
  },
  {
    id: "sc-04",
    name: "Living Labs Agroforestry RCT Falsification",
    cluster: "Global Development",
    description: "Gates Foundation & Rockefeller validate 500k hectare soil biochar yield.",
    targetPartnerIds: ["partner-08", "partner-09"],
    nature: "field",
    deltaWeight: 2,
  },
  {
    id: "sc-05",
    name: "Community Pass Micro-Dividend Settlement Wave",
    cluster: "African Infrastructure",
    description: "Mastercard rails process 1.2M instant carbon stewardship micropayments.",
    targetPartnerIds: ["partner-10", "partner-05"],
    nature: "payments",
    deltaWeight: 2,
  },
];

export const PartnershipNetworkGraph: React.FC<PartnershipNetworkGraphProps> = ({
  targets,
  selectedPartnerId,
  onSelectPartner,
  impactHeatmapEnabled = false,
  onToggleHeatmap,
  filterTriggerKey = "default",
  selectedCluster = "ALL",
  onSelectCluster,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<d3.Simulation<NetworkNode, NetworkLink> | null>(null);

  const [activeCluster, setActiveCluster] = useState<StrategicClusterType>(selectedCluster);
  const [viewMode, setViewMode] = useState<"full" | "objectives" | "capitals">("full");
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [localHeatmap, setLocalHeatmap] = useState<boolean>(impactHeatmapEnabled);
  const [simulationIteration, setSimulationIteration] = useState(0);

  // Node Pinning State
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);

  // Chronological View State & Timeline Simulation
  const [isChronologicalView, setIsChronologicalView] = useState<boolean>(false);
  const [chronologicalYear, setChronologicalYear] = useState<number>(2026);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);

  // Auto-Update Scenario Link Simulation
  const [isAutoUpdatingLinks, setIsAutoUpdatingLinks] = useState<boolean>(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [activeScenarioPulse, setActiveScenarioPulse] = useState<string | null>(null);
  const [dynamicLinkModifiers, setDynamicLinkModifiers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (selectedCluster !== activeCluster) {
      setActiveCluster(selectedCluster);
    }
  }, [selectedCluster]);

  useEffect(() => {
    setLocalHeatmap(impactHeatmapEnabled);
  }, [impactHeatmapEnabled]);

  // Chronological Evolution Playback Loop
  useEffect(() => {
    if (!isPlayingTimeline || !isChronologicalView) return;

    const interval = setInterval(() => {
      setChronologicalYear((prev) => {
        if (prev >= 2026) {
          return 2022;
        }
        return prev + 1;
      });

      // Re-heat physics gently on year step
      if (simulationRef.current) {
        simulationRef.current.alpha(0.2).restart();
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isPlayingTimeline, isChronologicalView]);

  const handleClusterChange = (cluster: StrategicClusterType) => {
    setActiveCluster(cluster);
    if (onSelectCluster) {
      onSelectCluster(cluster);
    }
  };

  const handleToggleHeatmapInternal = () => {
    if (onToggleHeatmap) {
      onToggleHeatmap();
    } else {
      setLocalHeatmap(!localHeatmap);
    }
  };

  const isHeatmapActive = onToggleHeatmap ? impactHeatmapEnabled : localHeatmap;

  // Auto-update Link Weights interval
  useEffect(() => {
    if (!isAutoUpdatingLinks) return;

    const interval = setInterval(() => {
      const nextIdx = (currentScenarioIndex + 1) % SCENARIO_SIMULATION_EVENTS.length;
      const scenario = SCENARIO_SIMULATION_EVENTS[nextIdx];
      setCurrentScenarioIndex(nextIdx);
      setActiveScenarioPulse(scenario.name);

      // Mutate edge modifiers
      const newModifiers: Record<string, number> = {};
      scenario.targetPartnerIds.forEach((pid) => {
        newModifiers[pid] = Math.random() * 2 + 1;
      });
      setDynamicLinkModifiers(newModifiers);

      // Re-heat simulation smoothly
      if (simulationRef.current) {
        simulationRef.current.alpha(0.25).restart();
      }

      setTimeout(() => {
        setActiveScenarioPulse(null);
      }, 2800);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoUpdatingLinks, currentScenarioIndex]);

  // Helper to map partner to strategic cluster
  const getClusterForPartner = (p: PartnershipTarget): "Frontier Tech" | "Global Development" | "African Infrastructure" => {
    if (p.strategicCluster) return p.strategicCluster;
    if (p.category === "Frontier AI & Cloud") return "Frontier Tech";
    if (p.category === "Multilateral & Development Finance" && p.organization.includes("African")) return "African Infrastructure";
    if (p.category === "Digital & Economic Infrastructure") return "African Infrastructure";
    return "Global Development";
  };

  // Helper to get historical onboarding year for partner
  const getPartnerOnboardingYear = (p: PartnershipTarget): number => {
    if (p.onboardingYear) return p.onboardingYear;
    if (p.id === "partner-01" || p.id === "partner-05" || p.id === "partner-07") return 2022;
    if (p.id === "partner-03" || p.id === "partner-04" || p.id === "partner-06") return 2023;
    if (p.id === "partner-02" || p.id === "partner-08" || p.id === "partner-10") return 2024;
    if (p.id === "partner-09") return 2025;
    return 2026;
  };

  // Build Graph Nodes & Links with Cluster, Chronological Year, and Pinning support
  const generateGraphData = useCallback(() => {
    const nodes: NetworkNode[] = [];
    const links: NetworkLink[] = [];

    // 1. Central Core Node (Always active from 2022)
    nodes.push({
      id: "atlas-core",
      label: "Atlas Sanctum Core",
      type: "core",
      color: "#c5a059",
      priority: "High",
      radius: 28,
      isPinned: pinnedNodeId === "atlas-core",
      onboardingYear: 2022,
      isChronologicallyActive: true,
    });

    // 2. Objective Nodes
    if (viewMode === "full" || viewMode === "objectives") {
      CORE_OBJECTIVES.forEach((obj) => {
        nodes.push({
          id: obj.id,
          label: obj.label,
          type: "objective",
          color: obj.color,
          priority: "High",
          radius: 18,
          isPinned: pinnedNodeId === obj.id,
          onboardingYear: 2022,
          isChronologicallyActive: true,
        });

        links.push({
          source: "atlas-core",
          target: obj.id,
          relationship: "Core Strategic Directive",
          nature: "governance",
          strength: 5,
        });
      });
    }

    // 3. 7-Capitals Nodes
    if (viewMode === "full" || viewMode === "capitals") {
      SEVEN_CAPITALS.forEach((cap) => {
        nodes.push({
          id: `cap-${cap.type.toLowerCase()}`,
          label: cap.label,
          type: "capital",
          color: cap.color,
          priority: "High",
          radius: 16,
          isPinned: pinnedNodeId === `cap-${cap.type.toLowerCase()}`,
          onboardingYear: 2022,
          isChronologicallyActive: true,
        });

        links.push({
          source: "atlas-core",
          target: `cap-${cap.type.toLowerCase()}`,
          relationship: "Accounting & Multi-Capital Steward",
          nature: "governance",
          strength: 4,
        });
      });
    }

    // 4. Partner Nodes
    targets.forEach((p) => {
      const cluster = getClusterForPartner(p);
      if (activeCluster !== "ALL" && cluster !== activeCluster) {
        return;
      }

      const onboardingYear = getPartnerOnboardingYear(p);
      const isChronologicallyActive = !isChronologicalView || onboardingYear <= chronologicalYear;
      const isPendingReview = p.reviewStatus === "Pending Review";

      const priority = p.strategicPriority || (p.readinessScore >= 92 ? "High" : p.readinessScore >= 88 ? "Medium" : "Low");
      const partnerColor =
        isPendingReview
          ? "#f59e0b"
          : cluster === "Frontier Tech"
          ? "#38bdf8"
          : cluster === "African Infrastructure"
          ? "#ec4899"
          : "#34d399";

      nodes.push({
        id: p.id,
        label: p.organization,
        type: "partner",
        category: p.category,
        cluster: cluster,
        priority: priority,
        readiness: p.readinessScore,
        color: partnerColor,
        radius: 20 + (p.readinessScore - 80) * 0.4,
        partnerData: p,
        isPinned: pinnedNodeId === p.id,
        onboardingYear: onboardingYear,
        isPendingReview: isPendingReview,
        isChronologicallyActive: isChronologicallyActive,
      });

      const modifier = dynamicLinkModifiers[p.id] || 0;
      
      // Calculate historical strength in Chronological Mode
      let computedStrength = Math.min(5, Math.round(p.readinessScore / 20) + modifier);
      if (isChronologicalView) {
        if (!isChronologicallyActive) {
          computedStrength = 1;
        } else {
          // Link strength matures over historical tenure
          const tenureYears = chronologicalYear - onboardingYear;
          computedStrength = Math.min(5, Math.max(2, 2 + tenureYears));
        }
      }

      // Link to Core
      links.push({
        source: "atlas-core",
        target: p.id,
        relationship: isPendingReview
          ? `Prospective Alliance (Discovery Pending)`
          : `Bilateral Alliance (${p.category})`,
        nature: p.category.includes("AI") ? "compute" : p.category.includes("Finance") ? "capital" : "policy",
        strength: computedStrength,
        isPulsing: modifier > 0 || isPendingReview,
        isPending: isPendingReview,
      });

      // Link to Objectives
      if (viewMode === "full" || viewMode === "objectives") {
        if (p.id === "partner-01" || p.id === "partner-04" || p.id === "partner-disc-03") {
          links.push({
            source: p.id,
            target: "obj-bio-digital",
            relationship: "Planetary Earth Engine & Elastic Compute",
            nature: "compute",
            strength: Math.min(5, computedStrength + modifier),
            isPulsing: modifier > 0 || isPendingReview,
            isPending: isPendingReview,
          });
        }
        if (p.id === "partner-01" || p.id === "partner-02" || p.id === "partner-03" || p.id === "partner-disc-01") {
          links.push({
            source: p.id,
            target: "obj-sovereign-ai",
            relationship: "Frontier Multimodal & Socratic Reasoning",
            nature: "compute",
            strength: Math.min(5, computedStrength + 1 + modifier),
            isPulsing: modifier > 0 || isPendingReview,
            isPending: isPendingReview,
          });
        }
        if (p.id === "partner-06" || p.id === "partner-07" || p.id === "partner-09" || p.id === "partner-disc-04") {
          links.push({
            source: p.id,
            target: "obj-7cap-finance",
            relationship: "Blended Concessional Tranche Syndication",
            nature: "capital",
            strength: Math.min(5, computedStrength + modifier),
            isPulsing: modifier > 0 || isPendingReview,
            isPending: isPendingReview,
          });
        }
        if (p.id === "partner-10" || p.id === "partner-07" || p.id === "partner-disc-02") {
          links.push({
            source: p.id,
            target: "obj-grassroots-rails",
            relationship: "Digital Payments & Inclusive Ingress Rails",
            nature: "payments",
            strength: Math.min(5, computedStrength + modifier),
            isPulsing: modifier > 0 || isPendingReview,
            isPending: isPendingReview,
          });
        }
        if (p.id === "partner-05" || p.id === "partner-08" || p.id === "partner-09" || p.id === "partner-disc-02") {
          links.push({
            source: p.id,
            target: "obj-living-labs",
            relationship: "Field Prototyping & Grassroots Living Labs",
            nature: "field",
            strength: Math.min(5, computedStrength + 1 + modifier),
            isPulsing: modifier > 0 || isPendingReview,
            isPending: isPendingReview,
          });
        }
      }

      // Link to 7 Capitals
      if (viewMode === "full" || viewMode === "capitals") {
        if (cluster === "Frontier Tech") {
          links.push({
            source: p.id,
            target: "cap-intellectual",
            relationship: "Neural Compute & AI Models",
            nature: "compute",
            strength: Math.min(5, computedStrength),
            isPending: isPendingReview,
          });
          links.push({
            source: p.id,
            target: "cap-physical",
            relationship: "Edge Data Centers & Sensor Clusters",
            nature: "field",
            strength: Math.min(5, Math.max(1, computedStrength - 1)),
            isPending: isPendingReview,
          });
        } else if (cluster === "African Infrastructure") {
          links.push({
            source: p.id,
            target: "cap-institutional",
            relationship: "54-State Sovereign Ingress & Currency Settlement",
            nature: "policy",
            strength: Math.min(5, computedStrength),
            isPending: isPendingReview,
          });
          links.push({
            source: p.id,
            target: "cap-social",
            relationship: "Community Pass & Youth Guilds",
            nature: "payments",
            strength: Math.min(5, computedStrength),
            isPending: isPendingReview,
          });
        } else {
          links.push({
            source: p.id,
            target: "cap-financial",
            relationship: "Concessional Tranches & Sovereign De-Risking",
            nature: "capital",
            strength: Math.min(5, computedStrength),
            isPending: isPendingReview,
          });
          links.push({
            source: p.id,
            target: "cap-natural",
            relationship: "Landscape Restorations & Water Basins",
            nature: "field",
            strength: Math.min(5, computedStrength),
            isPending: isPendingReview,
          });
        }
      }
    });

    return { nodes, links };
  }, [
    targets,
    activeCluster,
    viewMode,
    pinnedNodeId,
    dynamicLinkModifiers,
    isChronologicalView,
    chronologicalYear,
  ]);

  // Handle Pin / Unpin Node
  const handleTogglePinNode = (nodeId: string) => {
    if (pinnedNodeId === nodeId) {
      setPinnedNodeId(null);
    } else {
      setPinnedNodeId(nodeId);
    }
  };

  // D3 Rendering & Simulation
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = isFullscreen ? window.innerHeight - 120 : 540;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const { nodes, links } = generateGraphData();

    // If a node is pinned, fix its coordinates to the visual center
    nodes.forEach((n) => {
      if (n.id === pinnedNodeId) {
        n.fx = width / 2;
        n.fy = height / 2;
      } else {
        n.fx = null;
        n.fy = null;
      }
    });

    // Defs for filters
    const defs = svg.append("defs");

    // Standard Glow filter
    const filter = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Heatmap High Priority Radiant Filter
    const heatFilterHigh = defs.append("filter").attr("id", "heat-high").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
    heatFilterHigh.append("feGaussianBlur").attr("stdDeviation", "11").attr("result", "blur1");
    heatFilterHigh.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur2");
    const heatMergeHigh = heatFilterHigh.append("feMerge");
    heatMergeHigh.append("feMergeNode").attr("in", "blur1");
    heatMergeHigh.append("feMergeNode").attr("in", "blur2");
    heatMergeHigh.append("feMergeNode").attr("in", "SourceGraphic");

    // Heatmap Medium Radiant Filter
    const heatFilterMed = defs.append("filter").attr("id", "heat-med").attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    heatFilterMed.append("feGaussianBlur").attr("stdDeviation", "6").attr("result", "blurMed");
    const heatMergeMed = heatFilterMed.append("feMerge");
    heatMergeMed.append("feMergeNode").attr("in", "blurMed");
    heatMergeMed.append("feMergeNode").attr("in", "SourceGraphic");

    // Radial Gradients for Heatmap Auras
    const gradHigh = defs.append("radialGradient").attr("id", "grad-heat-high");
    gradHigh.append("stop").attr("offset", "0%").attr("stop-color", "#10b981").attr("stop-opacity", "0.8");
    gradHigh.append("stop").attr("offset", "60%").attr("stop-color", "#c5a059").attr("stop-opacity", "0.35");
    gradHigh.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    const gradMed = defs.append("radialGradient").attr("id", "grad-heat-med");
    gradMed.append("stop").attr("offset", "0%").attr("stop-color", "#f59e0b").attr("stop-opacity", "0.7");
    gradMed.append("stop").attr("offset", "65%").attr("stop-color", "#d97706").attr("stop-opacity", "0.25");
    gradMed.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    const gradLow = defs.append("radialGradient").attr("id", "grad-heat-low");
    gradLow.append("stop").attr("offset", "0%").attr("stop-color", "#38bdf8").attr("stop-opacity", "0.55");
    gradLow.append("stop").attr("offset", "70%").attr("stop-color", "#0284c7").attr("stop-opacity", "0.15");
    gradLow.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    // Container group with zoom/pan
    const g = svg.append("g").attr("class", "graph-container");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 3.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial Zoom Setup
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2));

    // Force simulation
    const simulation = d3
      .forceSimulation<NetworkNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<NetworkNode, NetworkLink>(links)
          .id((d: NetworkNode) => d.id)
          .distance((d: NetworkLink) => (d.nature === "governance" ? 115 : pinnedNodeId ? 160 : 145))
          .strength((d: NetworkLink) => (d.strength / 5) * (pinnedNodeId ? 0.9 : 0.7))
      )
      .force("charge", d3.forceManyBody().strength(pinnedNodeId ? -580 : -460))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(pinnedNodeId ? 0.3 : 1))
      .force("collision", d3.forceCollide<NetworkNode>().radius((d: NetworkNode) => (d.radius || 20) + (pinnedNodeId ? 25 : 20)));

    simulationRef.current = simulation;

    // Draw Pinned Node Radial Orbit Rings
    if (pinnedNodeId) {
      const pinnedGroup = g.append("g").attr("class", "pinned-orbits");
      [140, 240, 340].forEach((r, idx) => {
        pinnedGroup
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("r", r)
          .attr("fill", "transparent")
          .attr("stroke", "#c5a059")
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 0.15 - idx * 0.03)
          .attr("stroke-dasharray", "4 4");
      });
    }

    // Draw Links
    const linkGroup = g.append("g").attr("class", "links");

    const link = linkGroup
      .selectAll<SVGLineElement, NetworkLink>("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: NetworkLink) => {
        if (d.isPulsing) return "#10b981";
        if (isHeatmapActive) {
          if (d.nature === "capital") return "#10b981";
          if (d.nature === "compute") return "#38bdf8";
          return "#c5a059";
        }
        if (d.nature === "compute") return "#38bdf8";
        if (d.nature === "capital") return "#34d399";
        if (d.nature === "payments") return "#fbbf24";
        if (d.nature === "field") return "#f43f5e";
        if (d.nature === "policy") return "#818cf8";
        return "#c5a059";
      })
      .attr("stroke-opacity", (d: NetworkLink) => {
        const sourceId = typeof d.source === "string" ? d.source : (d.source as NetworkNode).id;
        const targetId = typeof d.target === "string" ? d.target : (d.target as NetworkNode).id;
        if (pinnedNodeId && (sourceId === pinnedNodeId || targetId === pinnedNodeId)) {
          return 0.95;
        }
        if (selectedPartnerId && (sourceId === selectedPartnerId || targetId === selectedPartnerId)) {
          return 0.95;
        }
        if (d.isPulsing) return 0.9;
        return isHeatmapActive ? 0.38 : 0.28;
      })
      .attr("stroke-width", (d: NetworkLink) => {
        const sourceId = typeof d.source === "string" ? d.source : (d.source as NetworkNode).id;
        const targetId = typeof d.target === "string" ? d.target : (d.target as NetworkNode).id;
        if (pinnedNodeId && (sourceId === pinnedNodeId || targetId === pinnedNodeId)) {
          return 3.5;
        }
        if (selectedPartnerId && (sourceId === selectedPartnerId || targetId === selectedPartnerId)) {
          return 3.5;
        }
        if (d.isPulsing) return 4;
        return Math.max(1, d.strength * 0.75);
      })
      .attr("stroke-dasharray", (d: NetworkLink) => (d.nature === "payments" || d.nature === "field" ? "4 3" : "none"));

    // Draw Nodes
    const nodeGroup = g.append("g").attr("class", "nodes");

    const node = nodeGroup
      .selectAll<SVGGElement, NetworkNode>("g")
      .data(nodes, (d: NetworkNode) => d.id)
      .join("g")
      .attr("class", "node-element")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, NetworkNode>()
          .on("start", (event, d: NetworkNode) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: NetworkNode) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: NetworkNode) => {
            if (!event.active) simulation.alphaTarget(0);
            if (d.id !== pinnedNodeId) {
              d.fx = null;
              d.fy = null;
            }
          })
      );

    // 1. Heatmap Ambient Glow Aura (if enabled)
    if (isHeatmapActive) {
      node
        .append("circle")
        .attr("class", "heat-aura")
        .attr("r", 0)
        .attr("fill", (d: any) => {
          const n = d as NetworkNode;
          if (n.priority === "High" || n.type === "core") return "url(#grad-heat-high)";
          if (n.priority === "Medium") return "url(#grad-heat-med)";
          return "url(#grad-heat-low)";
        })
        .attr("filter", (d: any) => {
          const n = d as NetworkNode;
          return n.priority === "High" ? "url(#heat-high)" : "url(#heat-med)";
        })
        .transition()
        .duration(800)
        .delay((_, i) => i * 30)
        .ease(d3.easeCubicOut)
        .attr("r", (d: any) => {
          const n = d as NetworkNode;
          const baseR = n.radius || 20;
          if (n.priority === "High" || n.type === "core") return baseR * 2.6;
          if (n.priority === "Medium") return baseR * 1.85;
          return baseR * 1.35;
        });
    }

    // 2. Node outer rings / halos for selected / pinned / core / pending review
    node
      .append("circle")
      .attr("class", "outer-halo")
      .attr("r", 0)
      .attr("fill", "transparent")
      .attr("stroke", (d: any) => {
        const n = d as NetworkNode;
        if (n.isPendingReview) return "#f59e0b";
        if (n.id === pinnedNodeId) return "#c5a059";
        if (isHeatmapActive && n.priority === "High") return "#10b981";
        return n.color || "#c5a059";
      })
      .attr("stroke-width", (d: any) => {
        const n = d as NetworkNode;
        if (n.isPendingReview) return 2.5;
        return n.id === pinnedNodeId ? 3.5 : n.id === selectedPartnerId ? 2.5 : n.type === "core" ? 2 : 1;
      })
      .attr("stroke-opacity", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return 0.12;
        if (n.isPendingReview) return 0.9;
        return n.id === pinnedNodeId ? 1 : n.id === selectedPartnerId ? 0.95 : 0.45;
      })
      .attr("stroke-dasharray", (d: any) => {
        const n = d as NetworkNode;
        if (n.isPendingReview) return "3 2";
        if (n.isChronologicallyActive === false) return "2 4";
        return n.id === pinnedNodeId ? "2 2" : n.type === "objective" ? "3 3" : "none";
      })
      .transition()
      .duration(700)
      .delay((_, i) => i * 25)
      .ease(d3.easeElasticOut.period(0.65))
      .attr("r", (d: any) => {
        const n = d as NetworkNode;
        return (n.radius || 20) + (n.id === pinnedNodeId ? 8 : n.id === selectedPartnerId || n.type === "core" ? 6 : n.isPendingReview ? 5 : 2);
      });

    // 3. Node body circles (with Growing Transition & Chronological Dimming)
    node
      .append("circle")
      .attr("class", "node-body")
      .attr("r", 0)
      .attr("fill", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return "#070707";
        if (n.isPendingReview) return "#1c1404";
        if (n.id === pinnedNodeId) return "#221c10";
        if (n.type === "core") return "#1a160d";
        if (n.type === "objective") return "#0f172a";
        if (n.type === "capital") return "#061814";
        return "#121212";
      })
      .attr("stroke", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return "#333333";
        if (n.isPendingReview) return "#f59e0b";
        if (n.id === pinnedNodeId) return "#c5a059";
        if (isHeatmapActive) {
          if (n.priority === "High") return "#10b981";
          if (n.priority === "Medium") return "#f59e0b";
          return "#38bdf8";
        }
        return n.color || "#ffffff";
      })
      .attr("stroke-width", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return 0.8;
        return n.id === pinnedNodeId ? 3.5 : n.id === selectedPartnerId ? 3 : n.isPendingReview ? 2.5 : 1.5;
      })
      .attr("opacity", (d: any) => {
        const n = d as NetworkNode;
        return n.isChronologicallyActive === false ? 0.22 : 1;
      })
      .attr("filter", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return null;
        return n.id === pinnedNodeId || n.id === selectedPartnerId || n.type === "core" || n.isPendingReview || isHeatmapActive ? "url(#glow)" : null;
      })
      .transition()
      .duration(850)
      .delay((_, i) => i * 30)
      .ease(d3.easeElasticOut.period(0.6))
      .attr("r", (d: any) => {
        const n = d as NetworkNode;
        return n.radius || 20;
      });

    // 4. Pin indicator badge or Priority badge dots
    node
      .append("circle")
      .attr("cx", (d: any) => {
        const n = d as NetworkNode;
        return (n.radius || 20) * 0.7;
      })
      .attr("cy", (d: any) => {
        const n = d as NetworkNode;
        return -(n.radius || 20) * 0.7;
      })
      .attr("r", 0)
      .attr("fill", (d: any) => {
        const n = d as NetworkNode;
        if (n.isPendingReview) return "#f59e0b";
        return n.id === pinnedNodeId ? "#c5a059" : n.priority === "High" ? "#10b981" : n.priority === "Medium" ? "#f59e0b" : "#38bdf8";
      })
      .attr("stroke", "#080808")
      .attr("stroke-width", 1.5)
      .attr("opacity", (d: any) => {
        const n = d as NetworkNode;
        return n.isChronologicallyActive === false ? 0.2 : 1;
      })
      .transition()
      .duration(600)
      .delay((_, i) => 250 + i * 25)
      .ease(d3.easeBackOut)
      .attr("r", (d: any) => {
        const n = d as NetworkNode;
        return n.id === pinnedNodeId ? 5.5 : 4.5;
      });

    // 5. Node glyphs / short text in center
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-family", "ui-monospace, monospace")
      .attr("font-size", (d: any) => {
        const n = d as NetworkNode;
        return n.type === "core" ? "11px" : n.type === "partner" ? "9px" : "8px";
      })
      .attr("font-weight", "bold")
      .attr("fill", (d: any) => {
        const n = d as NetworkNode;
        if (n.isChronologicallyActive === false) return "#666666";
        if (n.isPendingReview) return "#fbbf24";
        if (n.id === pinnedNodeId) return "#c5a059";
        if (isHeatmapActive && n.priority === "High") return "#34d399";
        return n.color || "#ffffff";
      })
      .attr("opacity", 0)
      .text((d: any) => {
        const n = d as NetworkNode;
        if (n.isPendingReview) return "NEW";
        if (n.id === pinnedNodeId) return "PIN";
        if (n.type === "core") return "ATLAS";
        if (n.type === "partner" && n.partnerData) return n.partnerData.carouselPosition;
        if (n.type === "objective") return "OBJ";
        if (n.type === "capital") return "7CAP";
        return "";
      })
      .transition()
      .duration(500)
      .delay((_, i) => 200 + i * 20)
      .attr("opacity", (d: any) => {
        const n = d as NetworkNode;
        return n.isChronologicallyActive === false ? 0.3 : 1;
      });

    // 6. Node full labels underneath
    if (showLabels) {
      node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", (d: any) => {
          const n = d as NetworkNode;
          return (n.radius || 20) + 14;
        })
        .attr("font-family", "Georgia, serif")
        .attr("font-size", (d: any) => {
          const n = d as NetworkNode;
          return n.type === "core" ? "12px" : "10px";
        })
        .attr("font-weight", (d: any) => {
          const n = d as NetworkNode;
          return n.id === selectedPartnerId || n.id === pinnedNodeId ? "bold" : "normal";
        })
        .attr("fill", (d: any) => {
          const n = d as NetworkNode;
          if (n.isChronologicallyActive === false) return "#555555";
          if (n.isPendingReview) return "#f59e0b";
          return n.id === pinnedNodeId ? "#c5a059" : n.id === selectedPartnerId ? "#ffffff" : "#cccccc";
        })
        .attr("fill-opacity", 0)
        .text((d: any) => {
          const n = d as NetworkNode;
          return n.label + (n.isPendingReview ? " (Discovery)" : "");
        })
        .transition()
        .duration(600)
        .delay((_, i) => 300 + i * 20)
        .attr("fill-opacity", (d: any) => {
          const n = d as NetworkNode;
          return n.isChronologicallyActive === false ? 0.3 : 0.9;
        });
    }

    // Node Interaction Events
    node
      .on("mouseenter", (event, d: NetworkNode) => {
        setHoveredNode(d);
        d3.select(event.currentTarget).select("circle.node-body").attr("stroke-width", 3.5);
      })
      .on("mouseleave", (event, d: NetworkNode) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .select("circle.node-body")
          .attr("stroke-width", d.id === pinnedNodeId ? 3.5 : d.id === selectedPartnerId ? 3 : 1.5);
      })
      .on("click", (event, d: NetworkNode) => {
        // Toggle pin on node click or select partner
        handleTogglePinNode(d.id);
        if (d.partnerData && onSelectPartner) {
          onSelectPartner(d.partnerData);
        }
      });

    // Simulation Tick Update
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (typeof d.source === "object" ? (d.source as NetworkNode).x || 0 : 0))
        .attr("y1", (d: any) => (typeof d.source === "object" ? (d.source as NetworkNode).y || 0 : 0))
        .attr("x2", (d: any) => (typeof d.target === "object" ? (d.target as NetworkNode).x || 0 : 0))
        .attr("y2", (d: any) => (typeof d.target === "object" ? (d.target as NetworkNode).y || 0 : 0));

      node.attr("transform", (d: any) => `translate(${(d as NetworkNode).x || 0},${(d as NetworkNode).y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [
    generateGraphData,
    selectedPartnerId,
    pinnedNodeId,
    showLabels,
    isFullscreen,
    isHeatmapActive,
    simulationIteration,
    filterTriggerKey,
  ]);

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = containerRef.current?.clientWidth || 900;
    const height = isFullscreen ? window.innerHeight - 120 : 540;
    const zoom = d3.zoom<SVGSVGElement, unknown>();
    svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2));
  };

  const handleRefreshPhysics = () => {
    setSimulationIteration((prev) => prev + 1);
  };

  const STRATEGIC_CLUSTERS: { id: StrategicClusterType; label: string; count: number; color: string }[] = [
    { id: "ALL", label: "All Clusters", count: targets.length, color: "text-white" },
    { id: "Frontier Tech", label: "Frontier Tech", count: 4, color: "text-sky-400" },
    { id: "Global Development", label: "Global Development", count: 4, color: "text-emerald-400" },
    { id: "African Infrastructure", label: "African Infrastructure", count: 2, color: "text-rose-400" },
  ];

  return (
    <motion.div
      key={`graph-motion-${filterTriggerKey}-${simulationIteration}-${activeCluster}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      ref={containerRef}
      className={`p-6 bg-[#090909] border border-white/15 space-y-4 relative overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-4 z-50 overflow-y-auto bg-[#070707]" : ""
      }`}
    >
      {/* Top Header & Graph Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>D3.JS SYSTEMIC RELATIONSHIP & OBJECTIVES NETWORK</span>
            {isHeatmapActive && (
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold flex items-center space-x-1 animate-pulse">
                <Flame className="w-3 h-3 text-emerald-400" />
                <span>HEATMAP ACTIVE</span>
              </span>
            )}
            {pinnedNodeId && (
              <span className="px-2 py-0.5 bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/60 font-bold flex items-center space-x-1">
                <Pin className="w-3 h-3 text-[#c5a059]" />
                <span>PINNED: {pinnedNodeId.toUpperCase()}</span>
              </span>
            )}
            {isAutoUpdatingLinks && (
              <span className="px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-600 font-bold flex items-center space-x-1 animate-pulse">
                <Radio className="w-3 h-3 text-sky-400" />
                <span>SCENARIO ENGINE LINK SYNC</span>
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-white font-light">
            Interactive Institutional & 7-Capitals Graph Topology
          </h3>
          <p className="text-xs text-white/50 font-sans">
            Mapping neural compute, concessional finance tranches, and field living labs. Click any node to pin it in the center and rearrange orbital relationships.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Topology Mode Switcher */}
          <div className="flex items-center bg-[#121212] p-1 border border-white/10">
            <button
              onClick={() => setViewMode("full")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "full" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Full Mesh
            </button>
            <button
              onClick={() => setViewMode("objectives")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "objectives" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Objectives Focus
            </button>
            <button
              onClick={() => setViewMode("capitals")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "capitals" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              7-Capitals Focus
            </button>
          </div>

          {/* Chronological View Toggle */}
          <button
            id="btn-toggle-chronological-view"
            onClick={() => setIsChronologicalView(!isChronologicalView)}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              isChronologicalView
                ? "bg-amber-950/90 border-[#c5a059] text-[#c5a059] font-bold shadow-lg shadow-amber-950/50"
                : "bg-[#101010] hover:bg-[#181818] border-white/10 text-white/60 hover:text-white"
            }`}
            title="Toggle historical evolution timeline of partnership ecosystem"
          >
            <Clock className={`w-3.5 h-3.5 ${isChronologicalView ? "text-[#c5a059] animate-spin" : "text-white/40"}`} />
            <span>Timeline: {isChronologicalView ? "ACTIVE" : "ALL TIME"}</span>
          </button>

          {/* Auto-Update Scenario Links Toggle */}
          <button
            id="btn-auto-update-links"
            onClick={() => setIsAutoUpdatingLinks(!isAutoUpdatingLinks)}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              isAutoUpdatingLinks
                ? "bg-sky-950/90 border-sky-500 text-sky-300 font-bold shadow-lg shadow-sky-950/50"
                : "bg-[#101010] hover:bg-[#181818] border-white/10 text-white/60 hover:text-white"
            }`}
            title="Periodically adjust edge weights from simulated Scenario Engine events"
          >
            {isAutoUpdatingLinks ? (
              <Pause className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white/40" />
            )}
            <span>Auto-Update Links: {isAutoUpdatingLinks ? "ON" : "OFF"}</span>
          </button>

          {/* Toggle Impact Heatmap Button */}
          <button
            id="btn-toggle-impact-heatmap"
            onClick={handleToggleHeatmapInternal}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              isHeatmapActive
                ? "bg-gradient-to-r from-emerald-950 to-amber-950 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-950/50"
                : "bg-[#101010] hover:bg-[#181818] border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isHeatmapActive ? "text-emerald-400 animate-pulse" : "text-white/40"}`} />
            <span>Heatmap: {isHeatmapActive ? "ON" : "OFF"}</span>
          </button>

          {/* Pin/Unpin Node Control */}
          {pinnedNodeId && (
            <button
              onClick={() => setPinnedNodeId(null)}
              className="px-2.5 py-1.5 bg-[#1a150b] border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-wider font-bold flex items-center space-x-1"
              title="Unlock pinned node and restore free simulation"
            >
              <PinOff className="w-3.5 h-3.5" />
              <span>Unpin Center</span>
            </button>
          )}

          {/* Label Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all ${
              showLabels ? "bg-[#181818] border-[#c5a059]/60 text-[#c5a059] font-bold" : "bg-[#101010] border-white/10 text-white/40"
            }`}
          >
            Labels: {showLabels ? "ON" : "OFF"}
          </button>

          {/* Refresh Physics & Growth Animation */}
          <button
            onClick={handleRefreshPhysics}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title="Refresh Force Layout & Emergence Animation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={handleResetZoom}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title="Reset Zoom & Pan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Strategic Clusters Explorer Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] p-2.5 border border-white/10">
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-white/60">
          <Boxes className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Strategic Clusters Exploration:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {STRATEGIC_CLUSTERS.map((cl) => {
            const isSelected = activeCluster === cl.id;
            return (
              <button
                key={cl.id}
                onClick={() => handleClusterChange(cl.id)}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#181818] border-[#c5a059] text-[#c5a059] font-bold shadow-sm"
                    : "bg-[#121212] border-white/5 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cl.label}</span>
                <span className="text-[9px] px-1 bg-black/60 border border-white/10 text-white/40 font-bold">
                  {cl.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chronological Evolution Timeline Bar (when Timeline view is active) */}
      <AnimatePresence>
        {isChronologicalView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-gradient-to-r from-[#141008] via-[#0f0e0b] to-[#141008] border border-[#c5a059]/40 space-y-2.5 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 text-xs font-mono">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <span className="text-white font-bold tracking-wider">CHRONOLOGICAL ECOSYSTEM EVOLUTION:</span>
                <span className="px-2 py-0.5 bg-[#c5a059] text-black font-extrabold text-xs tracking-widest rounded-sm">
                  {chronologicalYear}
                </span>
                <span className="text-white/50 text-[11px]">
                  {TIMELINE_MILESTONES.find((m) => m.year === chronologicalYear)?.title || "Ecosystem Maturity"}
                </span>
              </div>

              {/* Play / Step controls */}
              <div className="flex items-center space-x-2">
                <button
                  id="btn-timeline-play"
                  onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border flex items-center space-x-1.5 transition-all ${
                    isPlayingTimeline
                      ? "bg-[#c5a059] text-black font-bold border-[#c5a059]"
                      : "bg-[#181818] hover:bg-[#222222] border-white/20 text-white"
                  }`}
                >
                  {isPlayingTimeline ? <Pause className="w-3 h-3 text-black" /> : <Play className="w-3 h-3 text-[#c5a059]" />}
                  <span>{isPlayingTimeline ? "PAUSE EVOLUTION" : "AUTOPLAY TIMELINE"}</span>
                </button>
              </div>
            </div>

            {/* Timeline Year Selectors & Scrubber */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono">
              {TIMELINE_MILESTONES.map((m) => {
                const isCurrent = chronologicalYear === m.year;
                const isPast = chronologicalYear >= m.year;
                return (
                  <button
                    key={m.year}
                    onClick={() => {
                      setChronologicalYear(m.year);
                      if (simulationRef.current) simulationRef.current.alpha(0.2).restart();
                    }}
                    className={`p-2 text-left border transition-all ${
                      isCurrent
                        ? "bg-[#241c0e] border-[#c5a059] text-white shadow-md ring-1 ring-[#c5a059]"
                        : isPast
                        ? "bg-[#101010] border-white/15 text-white/80 hover:border-white/30"
                        : "bg-[#080808] border-white/5 text-white/30 hover:text-white/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`font-bold ${isCurrent ? "text-[#c5a059]" : ""}`}>{m.year}</span>
                      <span className="text-[8px] text-white/40">{m.activePartnersCount} Partners</span>
                    </div>
                    <div className="text-[9px] text-white/60 truncate mt-0.5">{m.title}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario Engine Dynamic Event Ticker (when Auto-Update is active) */}
      <AnimatePresence>
        {isAutoUpdatingLinks && activeScenarioPulse && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-2.5 bg-sky-950/60 border border-sky-500/80 text-sky-200 text-xs font-mono flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-sky-400 animate-spin" />
              <span className="font-bold text-white">Scenario Engine Pulse:</span>
              <span className="text-sky-300">{activeScenarioPulse}</span>
            </div>
            <span className="text-[10px] text-sky-400/80 uppercase tracking-widest animate-pulse">
              Re-weighting active network edges
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graph Visual Canvas */}
      <div className="relative border border-white/10 bg-[#040404] overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full select-none"
          style={{ height: isFullscreen ? "calc(100vh - 240px)" : "500px" }}
        />

        {/* Hovered Node Tooltip Card Overlay */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 p-3.5 bg-[#0c0c0ce6] border border-[#c5a059]/60 backdrop-blur-md max-w-xs shadow-2xl text-xs space-y-1.5 pointer-events-none animate-fadeIn">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
              <span className="text-[#c5a059] font-bold">{hoveredNode.type.toUpperCase()}</span>
              {hoveredNode.priority && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                    hoveredNode.priority === "High"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                      : hoveredNode.priority === "Medium"
                      ? "bg-amber-950 text-amber-300 border border-amber-700"
                      : "bg-sky-950 text-sky-300 border border-sky-700"
                  }`}
                >
                  {hoveredNode.priority} Priority
                </span>
              )}
            </div>
            <p className="font-serif text-sm text-white font-medium">{hoveredNode.label}</p>
            {hoveredNode.cluster && (
              <p className="text-[10px] text-[#c5a059] font-mono">
                Cluster: {hoveredNode.cluster}
              </p>
            )}
            {hoveredNode.partnerData && (
              <p className="text-[11px] text-white/70 font-sans line-clamp-2">
                {hoveredNode.partnerData.strategicRole}
              </p>
            )}
            {hoveredNode.readiness && (
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-white/60">
                <span>Alignment Readiness:</span>
                <span className="text-emerald-400 font-bold">{hoveredNode.readiness}%</span>
              </div>
            )}
            <div className="text-[9px] text-[#c5a059] font-mono italic">
              {hoveredNode.id === pinnedNodeId ? "Click to unpin node from center" : "Click to pin in center & reorganize orbits"}
            </div>
          </div>
        )}

        {/* Floating Quick Legend */}
        <div className="absolute top-3 right-3 p-3 bg-[#080808]/90 border border-white/10 backdrop-blur-sm text-[10px] font-mono space-y-1.5 hidden md:block pointer-events-none">
          <div className="text-white/40 uppercase tracking-wider text-[9px] font-bold">
            {isHeatmapActive ? "Impact Heatmap Intensity" : "Topology Legend"}
          </div>

          {isHeatmapActive ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse"></span>
                <span className="text-emerald-300 font-bold">High Priority (Radial Aura x2.6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-amber-300 font-bold">Medium Priority (Halo x1.85)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="text-sky-300 font-bold">Low Priority (Base Ring x1.35)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]"></span>
                <span className="text-white/80">Atlas Core</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
                <span className="text-white/80">Frontier Tech Cluster</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></span>
                <span className="text-white/80">Global Development Cluster</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]"></span>
                <span className="text-white/80">African Infrastructure</span>
              </div>
            </>
          )}

          {pinnedNodeId && (
            <div className="pt-1.5 border-t border-white/10 text-[#c5a059] flex items-center space-x-1.5">
              <Pin className="w-3 h-3" />
              <span>Center Orbit Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Sub-Legend & Interaction Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono text-white/60">
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <Pin className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Node Pinning: Click to center & orbit relationships</span>
        </div>
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>Scenario Engine: Live auto-updating edge weights</span>
        </div>
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <Boxes className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strategic Clusters: Focused sector isolate views</span>
        </div>
      </div>
    </motion.div>
  );
};

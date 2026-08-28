import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PartnershipTarget, NavigationSpace } from "../../types";
import { useSystemState } from "../../context/SystemContext";
import { PartnershipNetworkGraph, StrategicClusterType } from "../PartnershipNetworkGraph";
import { PartnershipDeepAnalysisModal } from "../PartnershipDeepAnalysisModal";
import {
  Globe,
  Cloud,
  Cpu,
  ShieldCheck,
  Building2,
  TrendingUp,
  HeartHandshake,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Compass,
  FileText,
  Sliders,
  DollarSign,
  Activity,
  Award,
  Send,
  BarChart3,
  Network,
  Search,
  Filter,
  Check,
  Download,
  Flame,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Boxes,
  PieChart,
  Target,
  Zap,
  Users,
  TreePine,
  ShieldAlert,
  PanelRightClose,
  PanelRightOpen,
  Pin
} from "lucide-react";

export const PARTNERSHIP_TARGETS: PartnershipTarget[] = [
  {
    id: "partner-01",
    carouselPosition: "01",
    organization: "Google Cloud",
    strategicRole: "AI, cloud infrastructure, geospatial intelligence, agentic systems",
    strategicPriority: "High",
    strategicCluster: "Frontier Tech",
    category: "Frontier AI & Cloud",
    pillarAlignment: [2, 5, 10, 16],
    focusAreas: [
      "Gemini Multimodal Reasoning API",
      "Earth Engine Planetary Geospatial Ingestion",
      "Vertex AI Agentic Orchestration",
      "Africa Digital Infrastructure Nodes"
    ],
    capabilitiesOffered: [
      "Sub-meter multispectral satellite feeds for East African river basins",
      "Sovereign LLM fine-tuning pipelines grounded in indigenous agricultural knowledge",
      "Scalable Cloud Run & Spanner infrastructure for planetary-scale real-time simulation"
    ],
    strategicRationale:
      "Google Cloud provides the underlying high-concurrency neural compute, Earth Engine spatial raster analytics, and generative agent capabilities required to turn real-time physical telemetry into actionable systemic foresight.",
    jointInitiatives: [
      {
        name: "Pan-African Basin Geospatial Digital Twin",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Real-time flood and aquifer recharge simulation across 14 major river systems",
        status: "Active Pilot"
      },
      {
        name: "Sovereign Socratic Inquiry Engine",
        horizon: "Horizon 3: Transformational",
        targetOutcome: "Grounding 10-Agent Swarm deliberations in peer-reviewed scientific telemetry",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "120M residents protected via preemptive hydrological & agro-ecological forecasting by 2030.",
    keyStakeholders: ["Google DeepMind Research", "Google for Startups Africa", "Google Earth Engine Team"],
    readinessScore: 96,
    badgeColor: "text-sky-400 bg-sky-950/40 border-sky-800"
  },
  {
    id: "partner-02",
    carouselPosition: "02",
    organization: "OpenAI",
    strategicRole: "Frontier models, agents, reasoning, AI deployment",
    strategicPriority: "High",
    strategicCluster: "Frontier Tech",
    category: "Frontier AI & Cloud",
    pillarAlignment: [1, 7, 12, 18],
    focusAreas: [
      "Chain-of-Thought Civilizational Reasoning",
      "Autonomous Multi-Agent Policy Deliberation",
      "Socratic Premise Deconstruction",
      "Safe Synthetic Scenario Generation"
    ],
    capabilitiesOffered: [
      "Frontier reasoning models capable of deconstructing complex socio-technical dependencies",
      "Multi-agent debate protocols to prevent policy hallucination and ideological bias",
      "Structured JSON schema compilation for rapid living lab test generation"
    ],
    strategicRationale:
      "OpenAI's frontier reasoning models allow Atlas Sanctum to automate rigorous first-principles deconstruction of multi-trillion dollar civilizational challenges before committing physical capital.",
    jointInitiatives: [
      {
        name: "Polycentric Socratic Policy Deconstructor",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Automated unmasking of hidden extractive assumptions in urban development masterplans",
        status: "Blueprint Ready"
      },
      {
        name: "10-Agent Autonomous Deliberation Engine",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Synthesizing cross-guild consensus across ecology, engineering, ethics, and finance",
        status: "Active Pilot"
      }
    ],
    measurableImpactTarget: "10,000 high-leverage development blueprints analyzed with zero moral blindspots.",
    keyStakeholders: ["OpenAI for Impact", "Frontier Alignment Team", "Developer Ecosystem Group"],
    readinessScore: 92,
    badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
  },
  {
    id: "partner-03",
    carouselPosition: "03",
    organization: "Microsoft",
    strategicRole: "Cloud, enterprise AI, government and institutional transformation",
    strategicPriority: "Medium",
    strategicCluster: "Frontier Tech",
    category: "Frontier AI & Cloud",
    pillarAlignment: [3, 8, 14, 19],
    focusAreas: [
      "Azure Planetary Computer Integration",
      "National DPI Modernization",
      "Government Institutional Workflows",
      "AI for Good Continental Research"
    ],
    capabilitiesOffered: [
      "Enterprise-grade sovereign cloud compliance for municipal and regional ministries",
      "Azure IoT Hub edge computing clusters deployed at community watershed checkpoints",
      "Deep institutional relationships across 34 African government ministries"
    ],
    strategicRationale:
      "Microsoft bridges the gap between frontier agentic systems and institutional government adoption, enabling municipal authorities to institutionalize regenerative operating practices seamlessly.",
    jointInitiatives: [
      {
        name: "Municipal Regenerative Governance Suite",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Directly linking municipal budgeting decisions to 7-Capitals impact ledgers",
        status: "Exploring"
      },
      {
        name: "AI for Environmental Resilience Africa",
        horizon: "Horizon 3: Transformational",
        targetOutcome: "Deploying 50,000 edge IoT soil sensors across critical water towers",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "40 metropolitan authorities operating on real-time regenerative accounting frameworks.",
    keyStakeholders: ["Microsoft Africa Development Center (ADC)", "AI for Good Lab", "Azure Government Solutions"],
    readinessScore: 88,
    badgeColor: "text-blue-400 bg-blue-950/40 border-blue-800"
  },
  {
    id: "partner-04",
    carouselPosition: "04",
    organization: "AWS",
    strategicRole: "Compute, data lakes, public sector programs, space technology",
    strategicPriority: "Medium",
    strategicCluster: "Frontier Tech",
    category: "Frontier AI & Cloud",
    pillarAlignment: [2, 9, 13, 20],
    focusAreas: [
      "AWS Open Data Planetary Archives",
      "Ground Station Satellite Telemetry Ingestion",
      "High-Performance Climate Physics Modeling",
      "Public Sector Sovereign Resilience Clouds"
    ],
    capabilitiesOffered: [
      "Petabyte-scale public open-data archives for atmospheric and hydrological models",
      "Low-latency AWS Ground Station direct downlinks for orbital earth observation satellites",
      "Elastic compute credits for university and municipal research consortia"
    ],
    strategicRationale:
      "AWS provides high-throughput scientific simulation pipelines, satellite ground station access, and open environmental data infrastructure required for continental-scale modeling.",
    jointInitiatives: [
      {
        name: "African Climate Simulation Grid",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "High-resolution 100-year predictive climate resilience modeling for 54 nations",
        status: "Blueprint Ready"
      },
      {
        name: "Ground Station Earth Observation Node",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Direct real-time downlink of Sentinel & Landsat telemetry to local research hubs",
        status: "Active Pilot"
      }
    ],
    measurableImpactTarget: "500 petabytes of open environmental telemetry accessible to local scientists at zero latency.",
    keyStakeholders: ["AWS Public Sector Africa", "AWS Open Data Team", "Amazon Earth Observation Group"],
    readinessScore: 87,
    badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800"
  },
  {
    id: "partner-05",
    carouselPosition: "05",
    organization: "UNDP",
    strategicRole: "Global development network, SDG alignment, policy frameworks, grassroots implementation",
    strategicPriority: "High",
    strategicCluster: "Global Development",
    category: "Multilateral & Development Finance",
    pillarAlignment: [1, 6, 11, 17],
    focusAreas: [
      "Polycentric SDG Localization",
      "Grassroots Accelerator Labs Ingress",
      "National Regeneration Policy Charters",
      "Youth Ecological Guild Certification"
    ],
    capabilitiesOffered: [
      "Physical operational presence and trusted diplomatic ingress in 170+ countries and territories",
      "Network of 91 UNDP Accelerator Labs testing grassroots innovations in real-time",
      "Standardized multi-capital development metrics and SDG localization toolkits"
    ],
    strategicRationale:
      "UNDP provides unmatched multilateral legitimacy, sovereign country office networks, and policy translation channels to codify regenerative systems into formal national development plans.",
    jointInitiatives: [
      {
        name: "7-Capitals National Policy Translation Toolkit",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Formally embedding multi-capital ledgers into national planning commissions across 12 countries",
        status: "Active Pilot"
      },
      {
        name: "Grassroots Living Labs Accelerator Network",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Linking 50 community agroforestry pilots to sovereign climate finance facilities",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "Institutionalizing 7-Capitals accounting across 20 African finance ministries by 2028.",
    keyStakeholders: ["UNDP Africa Bureau", "UNDP Accelerator Labs Network", "SDG Integration Team"],
    readinessScore: 94,
    badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
  },
  {
    id: "partner-06",
    carouselPosition: "06",
    organization: "World Bank",
    strategicRole: "Development finance, systemic resilience, institutional capacity building",
    strategicPriority: "High",
    strategicCluster: "Global Development",
    category: "Multilateral & Development Finance",
    pillarAlignment: [3, 7, 10, 15],
    focusAreas: [
      "Concessional Blended Finance Tranches",
      "Sovereign Green Bond Issuance Frameworks",
      "IDA Multi-Billion Infrastructure Facilities",
      "Systemic Climate Resilience De-risking"
    ],
    capabilitiesOffered: [
      "Tranche syndication capacity capable of mobilizing tens of billions in private & public capital",
      "International Development Association (IDA) zero-interest and grant-matching facilities",
      "Global standard-setting power for sovereign debt restructuring and ecological bond covenants"
    ],
    strategicRationale:
      "The World Bank possesses the multi-billion sovereign balance sheet required to finance multi-generational regenerative infrastructure, providing concessional de-risking for private co-investment.",
    jointInitiatives: [
      {
        name: "Pan-African Sovereign Ecological Bond Facility",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "$5B blended finance stack linked to verified real-time watershed health indicators",
        status: "Blueprint Ready"
      },
      {
        name: "IDA Concessional Blended Debt Facility",
        horizon: "Horizon 3: Transformational",
        targetOutcome: "Decarbonizing and regenerating 20 municipal water grids",
        status: "Exploring"
      }
    ],
    measurableImpactTarget: "$10B in private institutional capital mobilized for regenerative infrastructure by 2030.",
    keyStakeholders: ["World Bank Climate Change Group", "Treasury Green Bond Team", "Africa Regional Vice Presidency"],
    readinessScore: 91,
    badgeColor: "text-blue-400 bg-blue-950/40 border-blue-800"
  },
  {
    id: "partner-07",
    carouselPosition: "07",
    organization: "African Development Bank",
    strategicRole: "Continental mandate, blended finance, sovereign relationships, regional integration",
    strategicPriority: "High",
    strategicCluster: "African Infrastructure",
    category: "Multilateral & Development Finance",
    pillarAlignment: [4, 8, 12, 16],
    focusAreas: [
      "High 5s Strategic Priorities Integration",
      "Great Green Wall Concessional Financing",
      "African Carbon Market & Natural Asset Valuation",
      "Cross-Border Renewable Energy Corridors"
    ],
    capabilitiesOffered: [
      "Direct sovereign mandate and trust across all 54 African heads of state and finance ministers",
      "Leadership in Great Green Wall financing and continent-wide agro-industrial processing zones",
      "African Financial Alliance for Climate Change (AFAC) coordination"
    ],
    strategicRationale:
      "AfDB represents the authentic institutional core of African development sovereignty, anchoring Atlas Sanctum's models in authentic Pan-African governance and economic priorities.",
    jointInitiatives: [
      {
        name: "Great Green Wall Ecological Telemetry & Finance Stack",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Deploying bio-digital verification across 2,000 km of Sahelian restoration corridors",
        status: "Active Pilot"
      },
      {
        name: "African Natural Capital Sovereign Balance Sheet Project",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Codifying $1.5T in uncounted ecological capital into sovereign borrowing metrics",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "Rehabilitating 100M hectares of degraded land while creating 10M rural green jobs.",
    keyStakeholders: ["AfDB Climate Change & Green Growth Dept", "African Natural Resources Centre (ANRC)", "President's Special Cabinet"],
    readinessScore: 97,
    badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
  },
  {
    id: "partner-08",
    carouselPosition: "08",
    organization: "Gates Foundation",
    strategicRole: "Health, agriculture, AI-for-impact, evidence and scaling",
    strategicPriority: "High",
    strategicCluster: "Global Development",
    category: "Philanthropic Foundations",
    pillarAlignment: [1, 5, 10, 16],
    focusAreas: [
      "Smallholder Farmer Climate Adaptation",
      "AI-Assisted Agronomic Diagnostic Models",
      "Evidence-Based Falsification Metrics",
      "Nutritional Bio-Fortification & Soil Health"
    ],
    capabilitiesOffered: [
      "World-class agricultural R&D networks and CGIAR research institute linkages",
      "Deep expertise in randomized controlled trials and empirical field validation",
      "Catalytic grant funding to test radical high-uncertainty hypotheses"
    ],
    strategicRationale:
      "The Gates Foundation's rigorous emphasis on empirical falsification and agricultural productivity ensures Atlas Sanctum's food sovereignty models deliver tangible, life-saving yields for smallholder farming families.",
    jointInitiatives: [
      {
        name: "AI Agronomic Advisory for 10M Smallholders",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Hyper-local regenerative cropping advisories via voice and SMS in vernacular dialects",
        status: "Active Pilot"
      },
      {
        name: "Rift Valley Volcanic Soil Health Restoration",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Biochar and mycorrhizal inoculation protocol scaling across 500,000 hectares",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "Doubling agricultural yields for 25M smallholder families while cutting synthetic fertilizer dependency by 50%.",
    keyStakeholders: ["Agricultural Development Team", "Global Health Discovery & Translational Sciences", "Africa Executive Leadership"],
    readinessScore: 95,
    badgeColor: "text-amber-300 bg-amber-950/40 border-amber-700"
  },
  {
    id: "partner-09",
    carouselPosition: "09",
    organization: "Rockefeller Foundation",
    strategicRole: "Climate, food systems, resilience, innovation and impact capital",
    strategicPriority: "Medium",
    strategicCluster: "Global Development",
    category: "Philanthropic Foundations",
    pillarAlignment: [2, 6, 12, 17],
    focusAreas: [
      "Planetary Health & Regenerative Food Systems",
      "Urban Climate Resilience & Sponge Cities",
      "Catalytic Blended Finance Facilities",
      "Energy Transition Accelerators"
    ],
    capabilitiesOffered: [
      "Decades of pioneering leadership in urban resilience and systemic climate adaptation",
      "Deep network of global impact investors, family offices, and catalytic foundations",
      "Champion of non-extractive, multi-capital economic transition frameworks"
    ],
    strategicRationale:
      "The Rockefeller Foundation pioneered systemic urban resilience frameworks and provides the ideal catalytic bridge between philosophical first principles and blended capital syndication.",
    jointInitiatives: [
      {
        name: "African Sponge Cities Innovation Challenge",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Financing 10 living lab bioswale corridors in rapid-growth metropolitan zones",
        status: "Active Pilot"
      },
      {
        name: "Planetary Health Blended Equity Stack",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "$500M catalytic impact equity fund targeting soil biodiversity and clean water access",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "Building climate-resilient livelihoods for 30M vulnerable urban and rural residents.",
    keyStakeholders: ["Rockefeller Africa Regional Office (Nairobi)", "Food & Climate Initiative", "Innovative Finance Team"],
    readinessScore: 93,
    badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800"
  },
  {
    id: "partner-10",
    carouselPosition: "10",
    organization: "Mastercard",
    strategicRole: "Digital payments, financial inclusion, SME and economic infrastructure",
    strategicPriority: "Medium",
    strategicCluster: "African Infrastructure",
    category: "Digital & Economic Infrastructure",
    pillarAlignment: [4, 9, 15, 18],
    focusAreas: [
      "Community Inclusive Digital Payments",
      "SME & Local Guild Working Capital",
      "Mastercard Foundation Scholars & Youth Employment",
      "Micro-Insurance & Climate Payout Rails"
    ],
    capabilitiesOffered: [
      "Global payment rail connectivity enabling instant, low-cost micro-transactions in remote communities",
      "Community Pass interoperable digital identity and agricultural transaction records",
      "Deep commitment to dignified and fulfilling work for 30M African youth by 2030"
    ],
    strategicRationale:
      "Mastercard provides the friction-free digital financial infrastructure required to distribute payments, verify carbon stewardship micro-dividends, and empower grassroots maintenance guilds.",
    jointInitiatives: [
      {
        name: "Ecological Stewardship Micro-Dividend Rails",
        horizon: "Horizon 1: Current State",
        targetOutcome: "Automated instant mobile money compensation for verified watershed restoration work",
        status: "Active Pilot"
      },
      {
        name: "Youth Maintenance Guild Credit Facility",
        horizon: "Horizon 2: Near-Term",
        targetOutcome: "Providing working capital loans for 5,000 community ecological maintenance cooperatives",
        status: "Blueprint Ready"
      }
    ],
    measurableImpactTarget: "15M micro-entrepreneurs and youth maintenance workers integrated into verifiable regenerative value chains.",
    keyStakeholders: ["Mastercard Community Pass Team", "Mastercard Foundation", "Financial Inclusion Innovation Lab"],
    readinessScore: 90,
    badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800"
  }
];

const STRATEGIC_CATEGORIES = [
  { id: "Frontier AI & Cloud", label: "Frontier AI & Cloud", count: 4, color: "text-sky-400", border: "border-sky-800", bg: "bg-sky-950/40" },
  { id: "Multilateral & Development Finance", label: "Multilateral & Development Finance", count: 3, color: "text-emerald-400", border: "border-emerald-800", bg: "bg-emerald-950/40" },
  { id: "Philanthropic Foundations", label: "Philanthropic Foundations", count: 2, color: "text-amber-400", border: "border-amber-800", bg: "bg-amber-950/40" },
  { id: "Digital & Economic Infrastructure", label: "Digital & Economic Infrastructure", count: 1, color: "text-rose-400", border: "border-rose-800", bg: "bg-rose-950/40" },
];

const STRATEGIC_CLUSTERS: { id: StrategicClusterType; label: string; count: number; color: string; desc: string }[] = [
  { id: "ALL", label: "All Strategic Clusters", count: 10, color: "text-[#c5a059]", desc: "Full pan-African and global regenerative coalition." },
  { id: "Frontier Tech", label: "Frontier Tech", count: 4, color: "text-sky-400", desc: "Google Cloud, OpenAI, Microsoft, AWS compute & AI." },
  { id: "Global Development", label: "Global Development", count: 4, color: "text-emerald-400", desc: "UNDP, World Bank, Gates & Rockefeller finance & health." },
  { id: "African Infrastructure", label: "African Infrastructure", count: 2, color: "text-rose-400", desc: "AfDB & Mastercard sovereign rails and financial inclusion." },
];

interface PartnershipSanctumViewProps {
  onNavigate?: (space: NavigationSpace) => void;
  africaMode?: boolean;
}

export const PartnershipSanctumView: React.FC<PartnershipSanctumViewProps> = ({
  onNavigate,
  africaMode = true,
}) => {
  const { navigateTo, addEvent } = useSystemState();

  // Multi-Filter Sidebar State
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isSummarySidebarOpen, setIsSummarySidebarOpen] = useState(true);

  const [selectedCluster, setSelectedCluster] = useState<StrategicClusterType>("ALL");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Frontier AI & Cloud",
    "Multilateral & Development Finance",
    "Philanthropic Foundations",
    "Digital & Economic Infrastructure"
  ]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["High", "Medium", "Low"]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minReadiness, setMinReadiness] = useState<number>(80);

  // Active View & Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState<PartnershipTarget>(PARTNERSHIP_TARGETS[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeViewSection, setActiveViewSection] = useState<"carousel" | "network" | "matrix">("carousel");

  // Impact Heatmap State
  const [impactHeatmapEnabled, setImpactHeatmapEnabled] = useState<boolean>(false);

  // Deep Analysis Modal State
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisPartner, setAnalysisPartner] = useState<PartnershipTarget | null>(null);

  // System Sync & Export State
  const [syncedPartnerIds, setSyncedPartnerIds] = useState<Set<string>>(new Set());
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Derived Filtered Targets
  const filteredTargets = useMemo(() => {
    return PARTNERSHIP_TARGETS.filter((target) => {
      // 0. Strategic Cluster Filter
      if (selectedCluster !== "ALL") {
        const targetCluster = target.strategicCluster || (target.category === "Frontier AI & Cloud" ? "Frontier Tech" : target.category === "Digital & Economic Infrastructure" ? "African Infrastructure" : "Global Development");
        if (targetCluster !== selectedCluster) {
          return false;
        }
      }
      // 1. Industry Focus Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(target.category)) {
        return false;
      }
      // 2. Priority Filter
      const priority = target.strategicPriority || (target.readinessScore >= 92 ? "High" : target.readinessScore >= 88 ? "Medium" : "Low");
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(priority)) {
        return false;
      }
      // 3. Minimum Readiness Score
      if (target.readinessScore < minReadiness) {
        return false;
      }
      // 4. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesOrg = target.organization.toLowerCase().includes(q);
        const matchesRole = target.strategicRole.toLowerCase().includes(q);
        const matchesCategory = target.category.toLowerCase().includes(q);
        const matchesFocus = target.focusAreas.some((fa) => fa.toLowerCase().includes(q));
        const matchesCap = target.capabilitiesOffered.some((c) => c.toLowerCase().includes(q));
        if (!matchesOrg && !matchesRole && !matchesCategory && !matchesFocus && !matchesCap) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCluster, selectedCategories, selectedPriorities, minReadiness, searchQuery]);

  // Aggregate Impact Calculations across filtered organizations
  const aggregateMetrics = useMemo(() => {
    const total = filteredTargets.length;
    if (total === 0) {
      return {
        avgReadiness: 0,
        aggregateImpactScore: 0,
        blendedCapitalEst: "$0B",
        popImpactEst: "0M",
        extractiveRiskMitigation: 0,
        clusterBreakdown: { "Frontier Tech": 0, "Global Development": 0, "African Infrastructure": 0 },
        sevenCapitalsMean: {
          Natural: 0,
          Human: 0,
          Social: 0,
          Intellectual: 0,
          Financial: 0,
          Physical: 0,
          Institutional: 0,
        },
      };
    }

    const sumReadiness = filteredTargets.reduce((acc, t) => acc + t.readinessScore, 0);
    const avgReadiness = (sumReadiness / total).toFixed(1);

    // Calculated systemic reach index
    const aggregateImpactScore = (
      Math.min(99.8, 80 + total * 1.6 + Number(avgReadiness) * 0.04)
    ).toFixed(1);

    // Blended Capital Mobilization Projection based on partner presence
    const hasAfDB = filteredTargets.some((t) => t.id === "partner-07");
    const hasWB = filteredTargets.some((t) => t.id === "partner-06");
    const hasGates = filteredTargets.some((t) => t.id === "partner-08");
    const hasRock = filteredTargets.some((t) => t.id === "partner-09");
    const hasMastercard = filteredTargets.some((t) => t.id === "partner-10");

    let capitalB = 0;
    if (hasAfDB) capitalB += 8.5;
    if (hasWB) capitalB += 10.0;
    if (hasGates) capitalB += 3.2;
    if (hasRock) capitalB += 2.0;
    if (hasMastercard) capitalB += 2.1;
    // Base tech compute & in-kind
    capitalB += filteredTargets.filter((t) => t.category === "Frontier AI & Cloud").length * 1.5;

    // Population reach calculation
    let popM = 0;
    if (filteredTargets.some((t) => t.id === "partner-01")) popM += 120;
    if (filteredTargets.some((t) => t.id === "partner-08")) popM += 25;
    if (filteredTargets.some((t) => t.id === "partner-09")) popM += 30;
    if (filteredTargets.some((t) => t.id === "partner-10")) popM += 15;
    if (hasAfDB) popM += 10;
    if (popM === 0) popM = total * 12;

    // Cluster count
    const clusterBreakdown = {
      "Frontier Tech": filteredTargets.filter((t) => t.strategicCluster === "Frontier Tech").length,
      "Global Development": filteredTargets.filter((t) => t.strategicCluster === "Global Development").length,
      "African Infrastructure": filteredTargets.filter((t) => t.strategicCluster === "African Infrastructure").length,
    };

    // 7 Capitals Mean Index
    const sevenCapitalsMean = {
      Natural: Math.min(100, 75 + clusterBreakdown["Global Development"] * 5),
      Human: Math.min(100, 80 + clusterBreakdown["Global Development"] * 4),
      Social: Math.min(100, 78 + clusterBreakdown["African Infrastructure"] * 8),
      Intellectual: Math.min(100, 82 + clusterBreakdown["Frontier Tech"] * 4.5),
      Financial: Math.min(100, 76 + clusterBreakdown["Global Development"] * 5),
      Physical: Math.min(100, 72 + clusterBreakdown["African Infrastructure"] * 9),
      Institutional: Math.min(100, 84 + (hasAfDB ? 8 : 0) + (hasWB ? 6 : 0)),
    };

    return {
      avgReadiness,
      aggregateImpactScore,
      blendedCapitalEst: `$${capitalB.toFixed(1)}B`,
      popImpactEst: `${popM}M+`,
      extractiveRiskMitigation: (98.4 - (10 - total) * 0.4).toFixed(1),
      clusterBreakdown,
      sevenCapitalsMean,
    };
  }, [filteredTargets]);

  // Unique filter trigger key for Framer Motion animation emergence in D3 graph
  const filterTriggerKey = useMemo(() => {
    return `${selectedCluster}_${selectedCategories.sort().join("-")}_${selectedPriorities.join("-")}_${minReadiness}_${searchQuery}_${impactHeatmapEnabled}`;
  }, [selectedCluster, selectedCategories, selectedPriorities, minReadiness, searchQuery, impactHeatmapEnabled]);

  // Keep carousel and selected partner aligned with filtered targets
  useEffect(() => {
    if (filteredTargets.length > 0) {
      if (currentIndex >= filteredTargets.length) {
        setCurrentIndex(0);
        setSelectedPartner(filteredTargets[0]);
      } else {
        setSelectedPartner(filteredTargets[currentIndex]);
      }
    }
  }, [filteredTargets, currentIndex]);

  // Carousel Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || filteredTargets.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTargets.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTargets.length]);

  const handleNext = () => {
    if (filteredTargets.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredTargets.length);
  };

  const handlePrev = () => {
    if (filteredTargets.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredTargets.length) % filteredTargets.length);
  };

  // Category Toggle Handler
  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== catId);
      } else {
        return [...prev, catId];
      }
    });
    setCurrentIndex(0);
  };

  // Priority Toggle Handler
  const togglePriority = (p: string) => {
    setSelectedPriorities((prev) => {
      if (prev.includes(p)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== p);
      } else {
        return [...prev, p];
      }
    });
    setCurrentIndex(0);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCluster("ALL");
    setSelectedCategories([
      "Frontier AI & Cloud",
      "Multilateral & Development Finance",
      "Philanthropic Foundations",
      "Digital & Economic Infrastructure"
    ]);
    setSelectedPriorities(["High", "Medium", "Low"]);
    setMinReadiness(80);
    setSearchQuery("");
    setCurrentIndex(0);
  };

  // Deep Analysis Trigger
  const handleTriggerDeepAnalysis = (target: PartnershipTarget) => {
    setAnalysisPartner(target);
    setIsAnalysisModalOpen(true);
    addEvent({
      severity: "INFO",
      subsystem: "PARTNERSHIPS",
      title: `7-Capitals Deep Analysis: ${target.organization}`,
      message: `Simulating multi-capital yield curves and moral audits for ${target.organization}. Priority: ${target.strategicPriority || "High"}. Cluster: ${target.strategicCluster || "Frontier Tech"}.`,
      actionTargetSpace: "partnerships",
    });
  };

  // System Sync Trigger
  const handleSyncToSystem = (target?: PartnershipTarget) => {
    const targetsToSync = target ? [target] : filteredTargets;
    const newSynced = new Set(syncedPartnerIds);
    targetsToSync.forEach((t) => newSynced.add(t.id));
    setSyncedPartnerIds(newSynced);

    const message = target
      ? `"${target.organization}" synced to Mission Control Active Portfolio!`
      : `${targetsToSync.length} Strategic Alliances synced to Mission Control!`;

    setSyncToastMessage(message);

    addEvent({
      severity: "SUCCESS",
      subsystem: "MISSION-CONTROL",
      title: "Strategic Portfolio Synchronized",
      message: target
        ? `Allocated ${target.organization} to active sovereign tracking and resource allocation pipelines.`
        : `Synchronized ${targetsToSync.length} strategic partner targets into active execution portfolio.`,
      actionTargetSpace: "mission-control",
      actionLabel: "View in Mission Control",
    });

    setTimeout(() => {
      setSyncToastMessage(null);
    }, 4500);
  };

  // CSV Export Action
  const handleExportDataCSV = () => {
    const targetsToExport = filteredTargets.length > 0 ? filteredTargets : PARTNERSHIP_TARGETS;

    const headers = [
      "Carousel Position",
      "Organization",
      "Strategic Priority",
      "Strategic Cluster",
      "Industry Category",
      "Readiness Score (%)",
      "Strategic Role",
      "Core Focus Areas",
      "Capabilities Brought",
      "Strategic Civilizational Rationale",
      "Measurable Impact Target",
      "Joint Initiatives",
      "Key Stakeholders",
      "Synced to Mission Control"
    ];

    const escapeCSV = (val: string | number | undefined | null) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = targetsToExport.map((t) => {
      const initiativesStr = t.jointInitiatives
        .map((j) => `[${j.name} (${j.horizon}, ${j.status}): ${j.targetOutcome}]`)
        .join(" | ");

      return [
        escapeCSV(t.carouselPosition),
        escapeCSV(t.organization),
        escapeCSV(t.strategicPriority || "High"),
        escapeCSV(t.strategicCluster || "Frontier Tech"),
        escapeCSV(t.category),
        escapeCSV(t.readinessScore),
        escapeCSV(t.strategicRole),
        escapeCSV(t.focusAreas.join(" | ")),
        escapeCSV(t.capabilitiesOffered.join(" | ")),
        escapeCSV(t.strategicRationale),
        escapeCSV(t.measurableImpactTarget),
        escapeCSV(initiativesStr),
        escapeCSV(t.keyStakeholders.join(" | ")),
        escapeCSV(syncedPartnerIds.has(t.id) ? "Yes" : "No")
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `Atlas-Sanctum-Partnership-Strategic-Index-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSyncToastMessage(`Exported ${targetsToExport.length} strategic partners to CSV file!`);
    setTimeout(() => setSyncToastMessage(null), 4000);

    addEvent({
      severity: "SUCCESS",
      subsystem: "PARTNERSHIPS",
      title: "Data Export Generated",
      message: `Exported ${targetsToExport.length} partner targets and 7-Capitals alignment dossiers to CSV.`,
      actionTargetSpace: "partnerships",
    });
  };

  const getPriorityBadgeClass = (priority?: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-600 shadow-sm shadow-emerald-950/50";
      case "Medium":
        return "bg-amber-950/80 text-amber-300 border-amber-600 shadow-sm shadow-amber-950/50";
      case "Low":
        return "bg-sky-950/80 text-sky-300 border-sky-600 shadow-sm shadow-sky-950/50";
      default:
        return "bg-emerald-950/80 text-emerald-300 border-emerald-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Floating Sync / Export Toast Notification */}
      {syncToastMessage && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="px-5 py-3 bg-[#0d0d0d]/95 border border-[#c5a059] text-white font-mono text-xs shadow-2xl backdrop-blur-md flex items-center space-x-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-medium text-white">{syncToastMessage}</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate("mission-control");
                else navigateTo("mission-control");
              }}
              className="px-2.5 py-0.5 bg-[#c5a059] text-black font-bold text-[10px] uppercase hover:bg-[#b08d48] transition-all ml-2"
            >
              Open Mission Control
            </button>
          </div>
        </div>
      )}

      {/* Top Hero Section: Major Partnership Banner */}
      <div className="relative p-8 sm:p-10 bg-[#0c0c0c] border border-[#c5a059]/40 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c5a059]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-tr from-sky-500/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

        <div className="relative z-10 space-y-5 max-w-5xl">
          {/* Eyebrow & Status Flag */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em]">
            <span className="px-3 py-1 bg-[#141414] text-[#c5a059] border border-[#c5a059]/50 font-bold flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>ATLAS SANCTUM — MAJOR PARTNERSHIPS SANCTUM</span>
            </span>
            <span className="text-white/40">
              STRATEGIC ALLIANCES MATRIX • 10 FIRST-WAVE TARGETS
            </span>
            {impactHeatmapEnabled && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-950 to-amber-950 text-emerald-300 border border-emerald-600 font-bold flex items-center space-x-1 animate-pulse">
                <Flame className="w-3 h-3 text-emerald-400" />
                <span>IMPACT HEATMAP OVERLAY ACTIVE</span>
              </span>
            )}
          </div>

          {/* User-Requested Official Headline */}
          <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            Building the Intelligence Infrastructure for a Regenerative Civilization
          </h1>

          {/* User-Requested Official Subheadline */}
          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed font-normal">
            Atlas Sanctum brings together frontier technology, African institutions, global development capital, scientific knowledge, and real-world builders to turn important questions into measurable outcomes.
          </p>

          {/* Key Metric Highlights & Quick Actions */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="px-3.5 py-2 bg-[#080808] border border-white/10 flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-white/50">Target Ecosystem:</span>
                <span className="text-white font-bold">Pan-African & Global</span>
              </div>
              <div className="px-3.5 py-2 bg-[#080808] border border-white/10 flex items-center space-x-2">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white/50">Catalytic Capital:</span>
                <span className="text-emerald-400 font-bold">{aggregateMetrics.blendedCapitalEst} Active</span>
              </div>
              <div className="px-3.5 py-2 bg-[#080808] border border-white/10 flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-white/50">Standard:</span>
                <span className="text-sky-400 font-bold">Polycentric 7-Capitals</span>
              </div>
            </div>

            {/* Top Header Actions: Toggle Heatmap & Export Data & Sync All */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px]">
              {/* Toggle Summary Sidebar Button */}
              <button
                id="btn-toggle-summary-sidebar"
                onClick={() => setIsSummarySidebarOpen(!isSummarySidebarOpen)}
                className={`px-3 py-2 border uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-all ${
                  isSummarySidebarOpen
                    ? "bg-[#181818] border-[#c5a059] text-[#c5a059]"
                    : "bg-[#121212] hover:bg-[#1a1a1a] border-white/15 text-white/70 hover:text-white"
                }`}
                title="Toggle Aggregate Impact Score Summary Sidebar"
              >
                {isSummarySidebarOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
                <span>Impact Summary</span>
              </button>

              {/* Toggle Impact Heatmap Button */}
              <button
                id="btn-hero-toggle-heatmap"
                onClick={() => setImpactHeatmapEnabled(!impactHeatmapEnabled)}
                className={`px-3 py-2 border uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-all shadow-md ${
                  impactHeatmapEnabled
                    ? "bg-gradient-to-r from-emerald-950 via-black to-amber-950 border-emerald-500 text-emerald-300"
                    : "bg-[#121212] hover:bg-[#1c1c1c] border-white/15 text-white/70 hover:text-white"
                }`}
                title="Toggle Strategic Priority Heatmap Intensity Overlay"
              >
                <Flame className={`w-3.5 h-3.5 ${impactHeatmapEnabled ? "text-emerald-400 animate-bounce" : "text-amber-400"}`} />
                <span>Heatmap: {impactHeatmapEnabled ? "ON" : "OFF"}</span>
              </button>

              {/* Export Data Action (CSV) */}
              <button
                id="btn-export-data-csv"
                onClick={handleExportDataCSV}
                className="px-3.5 py-2 bg-[#121212] hover:bg-[#1a1a1a] border border-[#c5a059]/60 hover:border-[#c5a059] text-[#c5a059] uppercase tracking-[0.15em] font-bold flex items-center space-x-1.5 shadow-md transition-all"
                title="Export currently filtered organization list to CSV report"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              {/* Global Sync to System Button */}
              <button
                id="btn-sync-all-partnerships"
                onClick={() => handleSyncToSystem()}
                className="px-3.5 py-2 bg-[#141414] hover:bg-[#202020] border border-white/20 hover:border-white/40 text-white font-mono uppercase tracking-[0.15em] font-bold flex items-center space-x-1.5 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Sync to Mission Control ({filteredTargets.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Clusters Explorer Switcher Banner */}
      <div className="p-4 bg-[#090909] border border-white/15 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#141414] border border-[#c5a059]/50 text-[#c5a059]">
            <Boxes className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-bold">
              Strategic Clusters Explorer
            </div>
            <div className="text-xs text-white/60 font-sans">
              Group organizations by sector focus for specialized exploration across the D3 ecosystem graph and portfolio.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {STRATEGIC_CLUSTERS.map((cl) => {
            const isSelected = selectedCluster === cl.id;
            return (
              <button
                key={cl.id}
                onClick={() => setSelectedCluster(cl.id)}
                className={`px-3 py-1.5 border uppercase tracking-wider text-[10px] transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#181818] border-[#c5a059] text-[#c5a059] font-bold shadow-md"
                    : "bg-[#101010] border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cl.label}</span>
                <span className="px-1.5 py-0.2 bg-black/60 border border-white/10 text-[9px] text-white/40 font-bold">
                  {cl.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Navigation Tabs & Filter Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        {/* Section View Tabs */}
        <div className="flex items-center bg-[#101010] p-1 border border-white/10">
          <button
            onClick={() => setActiveViewSection("carousel")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeViewSection === "carousel"
                ? "bg-[#c5a059] text-black font-bold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Spotlight Carousel</span>
          </button>

          <button
            onClick={() => setActiveViewSection("network")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeViewSection === "network"
                ? "bg-[#c5a059] text-black font-bold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>D3 Relationship Graph</span>
          </button>

          <button
            onClick={() => setActiveViewSection("matrix")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeViewSection === "matrix"
                ? "bg-[#c5a059] text-black font-bold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Comparative Matrix</span>
          </button>
        </div>

        {/* Right Controls: Filter Sidebar Toggle & Status Counter */}
        <div className="flex items-center space-x-3">
          <div className="text-xs font-mono text-white/50 hidden sm:block">
            Showing <strong className="text-[#c5a059]">{filteredTargets.length}</strong> of 10 Organizations
          </div>

          <button
            id="btn-toggle-filter-sidebar"
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className={`px-3.5 py-2 border text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
              isFilterSidebarOpen
                ? "bg-[#181818] border-[#c5a059] text-[#c5a059] font-bold"
                : "bg-[#101010] border-white/15 text-white/70 hover:text-white hover:border-white/30"
            }`}
            title="Toggle Strategic Industry Focus Sidebar"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{isFilterSidebarOpen ? "Hide Filters" : "Filter Sidebar"}</span>
            <span className="w-4 h-4 rounded-full bg-[#c5a059]/20 text-[#c5a059] text-[10px] flex items-center justify-center font-bold">
              {selectedCategories.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout with Responsive Filter Sidebar & Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT FILTER SIDEBAR (3 cols when open) */}
        <AnimatePresence mode="wait">
          {isFilterSidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-3 space-y-5 bg-[#090909] border border-white/15 p-5 shadow-xl sticky top-6"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#c5a059] font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Strategic Filter Panel</span>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-[#c5a059] flex items-center space-x-1"
                  title="Reset all filters to default"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Strategic Clusters Quick Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block font-bold">
                  Strategic Cluster
                </label>
                <div className="grid grid-cols-1 gap-1">
                  {STRATEGIC_CLUSTERS.map((cl) => {
                    const isSelected = selectedCluster === cl.id;
                    return (
                      <button
                        key={cl.id}
                        onClick={() => setSelectedCluster(cl.id)}
                        className={`text-left p-2 text-xs font-mono transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-[#141414] border-[#c5a059] text-[#c5a059] font-bold"
                            : "bg-[#0c0c0c] border-white/5 text-white/50 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{cl.label}</span>
                        <span className="text-[9px] px-1 bg-black/60 border border-white/10 text-white/40 font-bold">
                          {cl.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Box */}
              <div className="space-y-1.5 border-t border-white/10 pt-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                  Search Organizations & Focus
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Google, UNDP, Compute..."
                    className="w-full bg-[#121212] border border-white/10 text-white text-xs pl-8 pr-7 py-2 focus:outline-none focus:border-[#c5a059]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Strategic Industry Focus Categories */}
              <div className="space-y-2.5 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block font-bold">
                    Industry Focus
                  </label>
                  <span className="text-[10px] font-mono text-[#c5a059]">
                    {selectedCategories.length}/{STRATEGIC_CATEGORIES.length} Active
                  </span>
                </div>

                <div className="space-y-1.5">
                  {STRATEGIC_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-full text-left p-2.5 text-xs font-mono transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-[#141414] border-[#c5a059]/60 text-white font-medium shadow-sm"
                            : "bg-[#0c0c0c] border-white/5 text-white/40 hover:text-white/70 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              isSelected ? "bg-[#c5a059] border-[#c5a059] text-black" : "border-white/30 bg-black/40"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 bg-black/60 border border-white/10 text-white/50 font-bold ml-1">
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Strategic Priority Filter */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 block font-bold">
                  Strategic Priority Tag
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["High", "Medium", "Low"] as const).map((p) => {
                    const isSelected = selectedPriorities.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePriority(p)}
                        className={`py-1.5 text-center text-[10px] font-mono uppercase font-bold border transition-all ${
                          isSelected
                            ? p === "High"
                              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500"
                              : p === "Medium"
                              ? "bg-amber-950/90 text-amber-300 border-amber-500"
                              : "bg-sky-950/90 text-sky-300 border-sky-500"
                            : "bg-[#0e0e0e] text-white/30 border-white/5 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Readiness Threshold */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="uppercase tracking-wider text-white/50 font-bold">Min Alignment Score</span>
                  <span className="text-emerald-400 font-bold">{minReadiness}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="96"
                  step="1"
                  value={minReadiness}
                  onChange={(e) => setMinReadiness(Number(e.target.value))}
                  className="w-full accent-[#c5a059] bg-[#141414] h-1.5 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-white/30">
                  <span>80% (Base)</span>
                  <span>90% (High)</span>
                  <span>96% (Elite)</span>
                </div>
              </div>

              {/* Workspace Declutter Summary */}
              <div className="p-3 bg-[#050505] border border-white/10 text-[11px] font-mono text-white/60 space-y-1">
                <div className="text-white/40 uppercase text-[9px]">Workspace State</div>
                <div>{filteredTargets.length} of 10 targets displayed</div>
                <div className="text-emerald-400 text-[10px] font-bold">
                  {filteredTargets.length === 10 ? "Full 10-Target Roster Active" : "Workspace Decluttered"}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* MAIN WORKSPACE CONTENT AREA (Spans dynamic columns) */}
        <div
          className={`${
            isFilterSidebarOpen && isSummarySidebarOpen
              ? "lg:col-span-6"
              : isFilterSidebarOpen || isSummarySidebarOpen
              ? "lg:col-span-9"
              : "lg:col-span-12"
          } space-y-6`}
        >
          {filteredTargets.length === 0 ? (
            <div className="p-12 bg-[#0c0c0c] border border-white/10 text-center space-y-4">
              <Filter className="w-8 h-8 text-white/20 mx-auto" />
              <h3 className="font-serif text-xl text-white font-light">No Organizations Match Active Filters</h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Try enabling additional strategic clusters, industry categories, adjusting the priority tags, or clearing the search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#c5a059] text-black text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#b08d48] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* VIEW SECTION 1: Carousel Spotlight */}
              {activeViewSection === "carousel" && selectedPartner && (
                <div className="space-y-6">
                  {/* Carousel Sub-bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/5 pb-2">
                    <div className="flex items-center space-x-2">
                      <span>Target {currentIndex + 1} of {filteredTargets.length}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[#c5a059] font-bold">{selectedPartner.organization}</span>
                      {selectedPartner.strategicCluster && (
                        <span className="px-2 py-0.5 bg-[#161616] text-white/60 border border-white/10 text-[9px]">
                          {selectedPartner.strategicCluster}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`px-2.5 py-1 border text-[10px] uppercase tracking-wider transition-all ${
                          isAutoPlaying
                            ? "bg-emerald-950 text-emerald-300 border-emerald-700 font-bold"
                            : "bg-[#111111] text-white/40 border-white/10 hover:text-white"
                        }`}
                      >
                        {isAutoPlaying ? "AUTO-CYCLING ON" : "AUTO-CYCLE"}
                      </button>
                      <button
                        onClick={handlePrev}
                        className="p-1.5 bg-[#111111] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white transition-all"
                        title="Previous Partner"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-1.5 bg-[#111111] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#c5a059] text-white/70 hover:text-white transition-all"
                        title="Next Partner"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Featured Carousel Spotlight Card */}
                  <div className="space-y-6">
                    <motion.div
                      key={selectedPartner.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <div className={`p-6 sm:p-8 bg-[#0c0c0c] border space-y-6 relative overflow-hidden shadow-xl ${
                        impactHeatmapEnabled && selectedPartner.strategicPriority === "High"
                          ? "border-emerald-500/50 shadow-emerald-950/30"
                          : "border-white/15"
                      }`}>
                        <div className="absolute top-0 right-0 font-serif text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
                          {selectedPartner.carouselPosition}
                        </div>

                        {/* Partner Card Header */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="px-2.5 py-0.5 bg-[#161616] text-[#c5a059] border border-[#c5a059]/40 font-bold">
                                POS {selectedPartner.carouselPosition} • {selectedPartner.category.toUpperCase()}
                              </span>
                              {selectedPartner.strategicCluster && (
                                <span className="px-2 py-0.5 bg-[#1a1a1a] text-sky-300 border border-sky-800/60 font-bold">
                                  {selectedPartner.strategicCluster}
                                </span>
                              )}
                              <span className={`px-2 py-0.5 border font-bold ${getPriorityBadgeClass(selectedPartner.strategicPriority)}`}>
                                {selectedPartner.strategicPriority || "High"} Priority
                              </span>
                            </div>

                            <span className="text-emerald-400 font-bold flex items-center space-x-1">
                              <Award className="w-3 h-3" />
                              <span>ALIGNMENT: {selectedPartner.readinessScore}/100</span>
                            </span>
                          </div>

                          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
                            {selectedPartner.organization}
                          </h2>

                          <div className="p-3 bg-[#111111] border-l-2 border-[#c5a059] text-xs font-sans text-white/80 leading-relaxed font-medium">
                            <strong>Strategic Role:</strong> {selectedPartner.strategicRole}
                          </div>
                        </div>

                        {/* Strategic First-Principles Rationale */}
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em]">
                            Strategic Civilizational Rationale
                          </h4>
                          <p className="text-xs text-white/70 font-sans leading-relaxed">
                            {selectedPartner.strategicRationale}
                          </p>
                        </div>

                        {/* Capabilities & Focus Areas Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {/* Core Focus Domains */}
                          <div className="p-4 bg-[#080808] border border-white/10 space-y-2">
                            <h5 className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider flex items-center space-x-1.5">
                              <Sliders className="w-3 h-3" />
                              <span>Focus Domains</span>
                            </h5>
                            <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                              {selectedPartner.focusAreas.map((fa, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <span className="text-[#c5a059] font-mono">›</span>
                                  <span>{fa}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Capabilities Offered */}
                          <div className="p-4 bg-[#080808] border border-white/10 space-y-2">
                            <h5 className="text-[10px] font-mono text-sky-400 uppercase tracking-wider flex items-center space-x-1.5">
                              <Cloud className="w-3 h-3" />
                              <span>Capabilities Brought</span>
                            </h5>
                            <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                              {selectedPartner.capabilitiesOffered.map((cap, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Joint Initiatives & Directives */}
                        <div className="p-4 bg-[#080808] border border-white/10 space-y-3">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <h5 className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider flex items-center space-x-1.5">
                              <Sparkles className="w-3 h-3 text-[#c5a059]" />
                              <span>Joint Initiatives & Flagships</span>
                            </h5>
                            <span className="text-[9px] font-mono text-white/40 uppercase">
                              {selectedPartner.jointInitiatives.length} Active
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedPartner.jointInitiatives.map((init, idx) => (
                              <div key={idx} className="p-3 bg-[#0d0d0d] border border-white/5 space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                  <span className="text-white font-bold">{init.name}</span>
                                  <span className="px-1.5 py-0.2 bg-[#161616] text-[#c5a059] border border-[#c5a059]/40 text-[8px]">
                                    {init.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-white/70 font-sans line-clamp-2">
                                  {init.targetOutcome}
                                </p>
                                <div className="text-[9px] font-mono text-sky-400/80">
                                  Horizon: {init.horizon}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Measurable Target & Action Row */}
                        <div className="p-4 bg-[#121212] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1 max-w-md">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                              Measurable 2030 Impact Target
                            </div>
                            <div className="text-xs font-sans text-emerald-400 font-medium leading-tight">
                              {selectedPartner.measurableImpactTarget}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            {/* Deep Analysis Modal Trigger */}
                            <button
                              id="btn-deep-analysis-card"
                              onClick={() => handleTriggerDeepAnalysis(selectedPartner)}
                              className="px-3.5 py-2 bg-[#181818] hover:bg-[#c5a059] text-white hover:text-black border border-white/20 font-mono text-[10px] uppercase tracking-wider font-bold transition-all flex items-center space-x-1.5"
                            >
                              <Activity className="w-3.5 h-3.5" />
                              <span>Deep Analysis</span>
                            </button>

                            {/* Sync to System Trigger */}
                            <button
                              id="btn-sync-single-partner"
                              onClick={() => handleSyncToSystem(selectedPartner)}
                              className={`px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider font-bold border transition-all flex items-center space-x-1.5 ${
                                syncedPartnerIds.has(selectedPartner.id)
                                  ? "bg-emerald-950 border-emerald-600 text-emerald-300"
                                  : "bg-[#181818] hover:bg-sky-600 text-white border-white/20"
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{syncedPartnerIds.has(selectedPartner.id) ? "Synced" : "Sync"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Carousel Thumbnails Strip */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                      Active Coalition Targets ({filteredTargets.length})
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {filteredTargets.map((target, idx) => {
                        const isSelected = target.id === selectedPartner.id;
                        const isSynced = syncedPartnerIds.has(target.id);
                        return (
                          <button
                            key={target.id}
                            onClick={() => {
                              setCurrentIndex(idx);
                              setSelectedPartner(target);
                            }}
                            className={`p-3 text-left border transition-all font-mono space-y-1 ${
                              isSelected
                                ? "bg-[#181818] border-[#c5a059] shadow-lg text-white"
                                : "bg-[#090909] border-white/10 hover:border-white/30 text-white/50 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-[#c5a059] font-bold">{target.carouselPosition}</span>
                              {isSynced && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                            </div>
                            <div className="text-xs font-serif text-white truncate font-medium">
                              {target.organization}
                            </div>
                            <div className="text-[9px] text-white/40 truncate">
                              {target.readinessScore}% Alignment
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW SECTION 2: D3 Network Graph */}
              {activeViewSection === "network" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <PartnershipNetworkGraph
                    targets={filteredTargets}
                    selectedPartnerId={selectedPartner?.id}
                    onSelectPartner={(partner) => {
                      setSelectedPartner(partner);
                      const idx = filteredTargets.findIndex((p) => p.id === partner.id);
                      if (idx >= 0) setCurrentIndex(idx);
                    }}
                    impactHeatmapEnabled={impactHeatmapEnabled}
                    onToggleHeatmap={() => setImpactHeatmapEnabled(!impactHeatmapEnabled)}
                    filterTriggerKey={filterTriggerKey}
                    selectedCluster={selectedCluster}
                    onSelectCluster={(cl) => setSelectedCluster(cl)}
                  />
                </motion.div>
              )}

              {/* VIEW SECTION 3: Full Comparative Matrix Table */}
              {(activeViewSection === "matrix" || activeViewSection === "carousel") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-white font-light flex items-center space-x-2">
                        <span>Comparative Strategic Alliances Matrix</span>
                        <span className="text-xs font-mono text-[#c5a059] px-2 py-0.5 bg-black border border-white/10">
                          {filteredTargets.length} Filtered Targets
                        </span>
                      </h3>
                      <p className="text-xs text-white/50 font-sans">
                        Comprehensive institutional, technical, and 7-Capitals mapping of the core regenerative coalition.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-[10px]">
                      <button
                        onClick={handleExportDataCSV}
                        className="px-3.5 py-2 bg-[#141414] hover:bg-[#1f1f1f] border border-[#c5a059]/60 hover:border-[#c5a059] text-[#c5a059] uppercase tracking-[0.15em] flex items-center space-x-1.5 transition-all font-bold"
                        title="Download comparative matrix as CSV"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={() => handleSyncToSystem()}
                        className="px-3.5 py-2 bg-[#121212] hover:bg-[#1c1c1c] border border-white/15 text-white/80 hover:text-white uppercase tracking-[0.15em] flex items-center space-x-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-400" />
                        <span>Sync All to Mission Control</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#080808] border-b border-white/10 text-[10px] uppercase tracking-wider text-white/50">
                        <tr>
                          <th className="py-3 px-4">Pos</th>
                          <th className="py-3 px-4">Organization</th>
                          <th className="py-3 px-4">Cluster</th>
                          <th className="py-3 px-4">Priority Tag</th>
                          <th className="py-3 px-4">Industry Focus</th>
                          <th className="py-3 px-4">Alignment</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        {filteredTargets.map((p) => {
                          const isSynced = syncedPartnerIds.has(p.id);
                          return (
                            <tr
                              key={p.id}
                              onClick={() => {
                                setSelectedPartner(p);
                                setActiveViewSection("carousel");
                              }}
                              className={`hover:bg-[#121212] transition-colors cursor-pointer ${
                                impactHeatmapEnabled && p.strategicPriority === "High" ? "bg-emerald-950/10" : ""
                              }`}
                            >
                              <td className="py-3 px-4 text-[#c5a059] font-bold">{p.carouselPosition}</td>
                              <td className="py-3 px-4 font-serif text-sm text-white font-medium">
                                <div className="flex items-center space-x-2">
                                  <span>{p.organization}</span>
                                  {isSynced && (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" title="Synced to Mission Control" />
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 bg-[#141414] border border-white/10 text-[9px] text-[#c5a059] font-bold">
                                  {p.strategicCluster || "Frontier Tech"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 border text-[9px] font-bold ${getPriorityBadgeClass(p.strategicPriority)}`}>
                                  {p.strategicPriority || "High"} Priority
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 bg-[#141414] border border-white/10 text-[9px] text-white/60">
                                  {p.category}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#c5a059]"
                                      style={{ width: `${p.readinessScore}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-white/50">{p.readinessScore}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleTriggerDeepAnalysis(p)}
                                    className="px-2.5 py-1 bg-[#161616] hover:bg-[#c5a059] text-white/70 hover:text-black border border-white/10 text-[9px] uppercase tracking-wider font-bold transition-all"
                                    title="Simulate 7-Capitals Deep Analysis"
                                  >
                                    Analysis
                                  </button>
                                  <button
                                    onClick={() => handleSyncToSystem(p)}
                                    className={`px-2.5 py-1 border text-[9px] uppercase tracking-wider font-bold transition-all ${
                                      isSynced
                                        ? "bg-emerald-950 border-emerald-600 text-emerald-300"
                                        : "bg-[#161616] hover:bg-sky-600 text-white/70 hover:text-white border-white/10"
                                    }`}
                                    title="Sync Target to Mission Control Active Portfolio"
                                  >
                                    {isSynced ? "Synced" : "Sync"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* RIGHT SUMMARY SIDEBAR: AGGREGATE IMPACT SCORE & SYSTEMIC REACH (3 cols when open) */}
        <AnimatePresence mode="wait">
          {isSummarySidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-3 space-y-5 bg-[#090909] border border-white/15 p-5 shadow-xl sticky top-6"
            >
              {/* Summary Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#c5a059] font-bold">
                  <Target className="w-4 h-4" />
                  <span>Aggregate Impact Reach</span>
                </div>
                <button
                  onClick={() => setIsSummarySidebarOpen(false)}
                  className="text-white/40 hover:text-white p-1"
                  title="Collapse summary sidebar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Aggregate Impact Score Hero Dial */}
              <div className="p-4 bg-gradient-to-br from-[#14120b] to-[#0a0a0a] border border-[#c5a059]/40 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#c5a059]">
                  <span className="font-bold">Systemic Reach Index</span>
                  <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-4xl font-light text-white">
                    {aggregateMetrics.aggregateImpactScore}
                  </span>
                  <span className="text-xs font-mono text-[#c5a059]">/ 100</span>
                </div>

                <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-[#c5a059] via-emerald-400 to-sky-400 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${aggregateMetrics.aggregateImpactScore}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="text-[10px] font-mono text-white/50 pt-1 flex justify-between">
                  <span>Filtered Reach: {filteredTargets.length}/10</span>
                  <span className="text-emerald-400 font-bold">{aggregateMetrics.avgReadiness}% Avg Align</span>
                </div>
              </div>

              {/* Core Systemic Metrics Grid */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/50 font-bold">
                  Top-Level Civilizational Yields
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-[#0d0d0d] border border-white/10 space-y-1">
                    <div className="text-[9px] font-mono text-white/40 uppercase">Catalytic Blended</div>
                    <div className="font-serif text-lg text-emerald-400 font-light">
                      {aggregateMetrics.blendedCapitalEst}
                    </div>
                  </div>

                  <div className="p-3 bg-[#0d0d0d] border border-white/10 space-y-1">
                    <div className="text-[9px] font-mono text-white/40 uppercase">Citizens Protected</div>
                    <div className="font-serif text-lg text-sky-400 font-light">
                      {aggregateMetrics.popImpactEst}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0d0d0d] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase text-white/40">
                    <span>Extractive Risk Mitigation</span>
                    <span className="text-emerald-400 font-bold">{aggregateMetrics.extractiveRiskMitigation}%</span>
                  </div>
                  <div className="w-full bg-[#181818] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full"
                      style={{ width: `${aggregateMetrics.extractiveRiskMitigation}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Cluster Breakdown */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50 font-bold">
                  <span>Cluster Representation</span>
                  <span className="text-[#c5a059]">{filteredTargets.length} Total</span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-[#0c0c0c] border border-white/5">
                    <span className="text-sky-400">Frontier Tech</span>
                    <span className="font-bold text-white">{aggregateMetrics.clusterBreakdown["Frontier Tech"]} / 4</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0c0c0c] border border-white/5">
                    <span className="text-emerald-400">Global Development</span>
                    <span className="font-bold text-white">{aggregateMetrics.clusterBreakdown["Global Development"]} / 4</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0c0c0c] border border-white/5">
                    <span className="text-rose-400">African Infrastructure</span>
                    <span className="font-bold text-white">{aggregateMetrics.clusterBreakdown["African Infrastructure"]} / 2</span>
                  </div>
                </div>
              </div>

              {/* 7-Capitals Balance Index Bars */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50 font-bold">
                  <span>7-Capitals Balance Index</span>
                  <span className="text-emerald-400">Socratic</span>
                </div>

                <div className="space-y-1.5 text-[10px] font-mono">
                  {Object.entries(aggregateMetrics.sevenCapitalsMean).map(([cap, val]) => {
                    const numVal = Number(val);
                    return (
                      <div key={cap} className="space-y-0.5">
                        <div className="flex justify-between text-white/60">
                          <span>{cap}</span>
                          <span className="font-bold text-white">{numVal.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-[#181818] h-1 rounded-full overflow-hidden">
                          <div
                            className="bg-[#c5a059] h-full"
                            style={{ width: `${numVal}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions in Sidebar */}
              <div className="pt-2 flex flex-col gap-2 font-mono text-[10px]">
                <button
                  onClick={() => handleSyncToSystem()}
                  className="w-full py-2 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#b08d48] transition-all flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Sync Filtered Portfolio</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Simulated Deep Analysis 7-Capitals Modal */}
      <PartnershipDeepAnalysisModal
        partner={analysisPartner}
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onSyncToSystem={(partner) => {
          handleSyncToSystem(partner);
        }}
        isSynced={analysisPartner ? syncedPartnerIds.has(analysisPartner.id) : false}
      />
    </motion.div>
  );
};

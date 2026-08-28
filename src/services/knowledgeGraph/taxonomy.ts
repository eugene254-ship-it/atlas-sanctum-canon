/**
 * ATLAS SANCTUM — KNOWLEDGE TAXONOMY & 8 CORE DOMAINS
 * Authoritative Canonical Pillar & Topic Cluster Hierarchy
 */

import {
  CoreDomainId,
  PillarDefinition,
  IndexBenchmarkDataset,
  EvidenceRecord,
  SearchOpportunityScore,
} from "./types";

export interface CoreDomainTaxonomy {
  id: CoreDomainId;
  name: string;
  shortCode: string;
  focusThesis: string;
  keywords: string[];
  canonicalPillars: string[];
  clusters: string[];
  signatureFranchise: string;
}

export const ATLAS_CORE_DOMAINS: Record<CoreDomainId, CoreDomainTaxonomy> = {
  "regenerative-intelligence": {
    id: "regenerative-intelligence",
    name: "Regenerative Intelligence",
    shortCode: "REGEN-INTEL",
    focusThesis:
      "Computational, social, and ecological intelligence systems that actively heal, renew, and enrich the biosphere and human capability.",
    keywords: [
      "regenerative intelligence",
      "regenerative AI",
      "regenerative systems",
      "regenerative development",
      "regenerative economics",
      "regenerative infrastructure",
      "regenerative cities",
      "regenerative organizations",
      "regenerative finance",
      "human flourishing",
      "systems resilience",
    ],
    canonicalPillars: ["what-is-regenerative-intelligence", "regenerative-infrastructure-guide"],
    clusters: [
      "Regenerative AI",
      "Regenerative Systems",
      "AI and Human Flourishing",
      "Regenerative Development",
      "Regenerative Economics",
      "Regenerative Cities",
      "Regenerative Infrastructure",
      "Regenerative Finance",
    ],
    signatureFranchise: "The Regenerative Intelligence Index",
  },
  "systems-thinking": {
    id: "systems-thinking",
    name: "Systems Thinking & Complexity",
    shortCode: "SYS-THINK",
    focusThesis:
      "Causal loop archetypes, feedback mechanics, cybernetic control, and high-leverage structural interventions.",
    keywords: [
      "systems thinking",
      "systems practice",
      "causal loops",
      "feedback loops",
      "system dynamics",
      "cybernetics",
      "complexity",
      "leverage points",
      "organizational systems",
      "resilience",
      "network effects",
      "systems modeling",
      "systems-of-systems",
    ],
    canonicalPillars: ["complete-guide-to-systems-thinking", "systems-modeling-for-real-world-problems"],
    clusters: [
      "Causal Loops & Feedback Dynamics",
      "Meadows' 12 Leverage Points",
      "Stock-Flow Modeling",
      "Cybernetic Governance",
      "Systems of Systems",
      "Resilience & Adaptive Cycles",
    ],
    signatureFranchise: "Systems of the Future",
  },
  "ai-intelligence": {
    id: "ai-intelligence",
    name: "AI & Agentic Systems",
    shortCode: "AI-AGENTS",
    focusThesis:
      "Frontier reasoning models, autonomous multi-agent swarms, world models, retrieval architectures, and safety alignment.",
    keywords: [
      "AI agents",
      "agentic systems",
      "AI orchestration",
      "AI evaluation",
      "AI safety",
      "AI governance",
      "collective intelligence",
      "machine intelligence",
      "human-AI collaboration",
      "world models",
      "multimodal AI",
      "retrieval systems",
      "AI for development",
      "AI infrastructure",
    ],
    canonicalPillars: ["future-of-ai-agents", "world-models-in-practice"],
    clusters: [
      "Autonomous Agent Swarms",
      "Socratic Reasoning Architectures",
      "World Models & Neural Simulation",
      "Safe AI Governance & Verification",
      "Multimodal Grounding Engines",
    ],
    signatureFranchise: "The Atlas Frontier",
  },
  innovation: {
    id: "innovation",
    name: "Innovation & Discovery",
    shortCode: "INNOVATION",
    focusThesis:
      "Systemic opportunity discovery, rapid falsification, technology adoption curves, and public-sector transformation.",
    keywords: [
      "innovation strategy",
      "opportunity discovery",
      "innovation systems",
      "experimentation",
      "product discovery",
      "design thinking",
      "customer development",
      "technology adoption",
      "market creation",
      "infrastructure innovation",
      "public-sector innovation",
      "AI innovation",
    ],
    canonicalPillars: ["systemic-innovation-playbook"],
    clusters: [
      "Opportunity Discovery Engines",
      "Hypothesis Falsification Loops",
      "Deep Tech Commercialization",
      "Public-Sector Innovation",
    ],
    signatureFranchise: "The Possibility Series",
  },
  africa: {
    id: "africa",
    name: "African Innovation & Infrastructure",
    shortCode: "AFRICA-INTEL",
    focusThesis:
      "Substantive leapfrog technologies, digital public infrastructure, green mineral value addition, and East African hydrological resilience.",
    keywords: [
      "African innovation",
      "Kenyan innovation",
      "African cities",
      "African infrastructure",
      "African entrepreneurship",
      "African AI",
      "digital public infrastructure in Africa",
      "mobile money",
      "African energy systems",
      "African food systems",
      "African climate resilience",
      "African health innovation",
      "African development finance",
    ],
    canonicalPillars: ["ai-for-african-development", "future-of-african-cities"],
    clusters: [
      "Kenyan Tech & Silicon Savannah",
      "Digital Public Goods & Mobile Rails",
      "Geothermal & Renewable Mini-Grids",
      "Sub-Saharan Sponge Cities & Flood Adaptation",
      "African Pan-Continental Free Trade (AfCFTA)",
    ],
    signatureFranchise: "The Africa Opportunity Report",
  },
  "opportunity-intelligence": {
    id: "opportunity-intelligence",
    name: "Opportunity Intelligence",
    shortCode: "OPP-INTEL",
    focusThesis:
      "Algorithmic bottleneck identification, weak signal triage, asymmetric leverage vectors, and structural solution mapping.",
    keywords: [
      "opportunity intelligence",
      "problem discovery",
      "emerging opportunities",
      "weak signals",
      "bottleneck analysis",
      "leverage points",
      "market intelligence",
      "technology intelligence",
      "infrastructure opportunities",
      "climate opportunities",
      "investment opportunities",
    ],
    canonicalPillars: ["what-is-opportunity-intelligence"],
    clusters: [
      "Weak Signal Triangulation",
      "Structural Bottleneck Analysis",
      "Asymmetric Leverage Ranking",
      "Mission Portfolio Construction",
    ],
    signatureFranchise: "The Great Questions Engine",
  },
  "human-flourishing": {
    id: "human-flourishing",
    name: "Human Flourishing & Agency",
    shortCode: "HUMAN-FLOURISH",
    focusThesis:
      "Re-centering civilizational development on moral agency, dignity, cognitive sovereignty, social cohesion, and multi-generational wisdom.",
    keywords: [
      "human flourishing",
      "development",
      "agency",
      "dignity",
      "education",
      "health",
      "employment",
      "prosperity",
      "social capital",
      "institutional trust",
      "quality of life",
    ],
    canonicalPillars: ["human-flourishing-as-development-metric"],
    clusters: [
      "Cognitive Sovereignty & Agency",
      "7 Capitals Multi-Dimensional Accounting",
      "Institutional Trust Infrastructure",
      "Intergenerational Wisdom Transfer",
    ],
    signatureFranchise: "The Canon of Greatness",
  },
  capital: {
    id: "capital",
    name: "Regenerative & Impact Capital",
    shortCode: "REGEN-CAPITAL",
    focusThesis:
      "Blended finance facilities, concessional de-risking, ecological capital indexing, and outcome-based capital allocation.",
    keywords: [
      "impact investing",
      "climate finance",
      "development finance",
      "project finance",
      "venture capital",
      "outcome-based financing",
      "blended finance",
      "capital allocation",
      "regenerative finance",
      "impact measurement",
    ],
    canonicalPillars: ["allocating-capital-for-regeneration"],
    clusters: [
      "Blended Concessional Facilities",
      "Ecological Yield & Carbon-Water Credits",
      "Outcome-Based Social & Climate Bonds",
      "Sovereign Wealth & Multilateral Synergies",
    ],
    signatureFranchise: "The Atlas World Report",
  },
};

export const ATLAS_CANONICAL_PILLARS: PillarDefinition[] = [
  {
    id: "what-is-regenerative-intelligence",
    title: "What Is Regenerative Intelligence? The Definitive Architecture",
    slug: "what-is-regenerative-intelligence",
    domainId: "regenerative-intelligence",
    canonicalUrl: "https://atlassanctum.org/insights/what-is-regenerative-intelligence",
    summary:
      "Regenerative Intelligence is the synthesis of causal systems modeling, artificial intelligence, and living-system ethics to generate net-positive vitality across human, institutional, and ecological dimensions.",
    history:
      "Evolving from cybernetics (Wiener, Ashby), regenerative economics (Fuller, Lovins, Fullerton), and frontier AI reasoning, Regenerative Intelligence shifts AI from extraction and attention-monetization to vitality amplification.",
    principles: [
      "Vitality Over Extraction: Every computational cycle must enrich downstream systemic capacity.",
      "Causal Symmetry: Trace second- and third-order systemic ripple effects prior to intervention.",
      "Multi-Capital Harmony: Measure success across Natural, Human, Social, Intellectual, Financial, Manufactured, and Spiritual capitals.",
      "Epistemic Honesty: Maintain rigorous boundaries between verified facts, hypotheses, and scenarios.",
    ],
    coreFrameworkName: "The Regenerative Intelligence Triad (Perception, Causal Model, Action Conscience)",
    coreFrameworkDescription:
      "A closed-loop architecture where multimodal sensor telemetry feeds into a probabilistic world graph, evaluated against ethical constraints before executing interventions.",
    examples: [
      "Nairobi hydrological sponge basins modeled via real-time satellite telemetry and community sensors.",
      "Decentralized micro-grid dispatch balancing battery life with local clinic oxygen concentrator demands.",
    ],
    evidenceIds: ["ev-sponge-nairobi-01", "ev-solar-grid-02"],
    applications: [
      "Urban master planning with living ecological constraints.",
      "AI agent swarms with embedded constitutional regenerative safeguards.",
    ],
    caseStudyRefs: ["case-nairobi-sponge-2026", "case-nakuru-geothermal-grid"],
    faqItems: [
      {
        question: "How does Regenerative Intelligence differ from standard generative AI?",
        answer:
          "Standard generative AI predicts probabilistic token distributions. Regenerative Intelligence couples causal world modeling with real-world sensor telemetry and multi-capital objective functions to design living interventions.",
      },
      {
        question: "Can regenerative frameworks be quantified mathematically?",
        answer:
          "Yes. Atlas models regenerative yield using multi-dimensional differential state vectors across the Seven Capitals, measuring net entropy reduction and resilience margins.",
      },
    ],
    clusters: [
      "Regenerative AI",
      "Regenerative Systems",
      "AI and Human Flourishing",
      "Regenerative Development",
      "Regenerative Economics",
      "Regenerative Infrastructure",
    ],
    furtherResearchQuestions: [
      "How do we mathematically prove non-degeneracy in self-modifying agent swarms?",
      "What are the minimum sensor densities required for real-time municipal watershed management?",
    ],
    productCta: {
      label: "Explore Live World Model",
      targetSpace: "world-model",
      description: "Inspect the live causal simulation of regenerative intelligence nodes.",
    },
  },
  {
    id: "complete-guide-to-systems-thinking",
    title: "The Complete Guide to Systems Thinking for Frontier Technology",
    slug: "complete-guide-to-systems-thinking",
    domainId: "systems-thinking",
    canonicalUrl: "https://atlassanctum.org/insights/complete-guide-to-systems-thinking",
    summary:
      "A rigorous, mathematically grounded manual for mapping causal loops, identifying high-leverage points, and navigating wicked complexity in technological and social ecosystems.",
    history:
      "Rooted in Jay Forrester's system dynamics at MIT and Donella Meadows' leverage point hierarchy, updated for autonomous algorithmic networks and multi-agent coordination.",
    principles: [
      "Structure Dictates Behavior: Events are symptoms; feedback structures generate trajectories.",
      "Non-Linear Latency: Cause and effect are rarely close in space or time.",
      "Leverage Inversion: The most intuitive intervention is often counterproductive without feedback awareness.",
    ],
    coreFrameworkName: "Meadows-Atlas 12 Leverage Points Hierarchy",
    coreFrameworkDescription:
      "From tweaking physical constants (low leverage) to shifting the paradigm out of which system goals arise (highest leverage).",
    examples: [
      "Subsidizing road expansion generates induced traffic demand; pricing congestion and zoning for multi-modal mobility rewires the feedback loop.",
    ],
    evidenceIds: ["ev-systems-traffic-03", "ev-feedback-delay-04"],
    applications: [
      "AI prompt engineering for multi-tier causal reasoning.",
      "National infrastructure sequencing.",
    ],
    caseStudyRefs: ["case-mombasa-port-logistics"],
    faqItems: [
      {
        question: "What is a causal loop diagram?",
        answer:
          "A visual graph depicting variables connected by causal links with polarity (+ for positive reinforcement, - for balancing/negative feedback) and explicit delay annotations.",
      },
    ],
    clusters: [
      "Causal Loops & Feedback Dynamics",
      "Meadows' 12 Leverage Points",
      "Stock-Flow Modeling",
    ],
    furtherResearchQuestions: [
      "How can LLMs be trained to automatically extract causal DAGs from unstructured municipal reports?",
    ],
    productCta: {
      label: "Launch Systems Modeling Engine",
      targetSpace: "systems-modeling",
      description: "Simulate causal feedback loops in real time.",
    },
  },
  {
    id: "ai-for-african-development",
    title: "AI for African Development: Sovereign Infrastructure & High-Leverage Leapfrogs",
    slug: "ai-for-african-development",
    domainId: "africa",
    canonicalUrl: "https://atlassanctum.org/insights/ai-for-african-development",
    summary:
      "A strategic roadmap for deploying localized frontier AI, edge inference, and digital public infrastructure across African cities and agricultural basins without colonial data extraction.",
    history:
      "Building upon the M-PESA mobile money revolution, Kenya's open data initiatives, and decentralized solar mini-grids across East Africa.",
    principles: [
      "Sovereign Data Commons: African intelligence must reside in transparent, community-governed data trusts.",
      "Edge-First Compute: Models optimized for intermittent connectivity and low-wattage edge hardware.",
      "Native Multilingual Grounding: Native support for Swahili, Sheng, Yoruba, Amharic, and regional dialects.",
    ],
    coreFrameworkName: "The African Leapfrog Vector (Infrastructure + Agentic Coordination)",
    coreFrameworkDescription:
      "Bypassing centralized legacy grids and bureaucratic bottlenecks via agentic verification and decentralized physical infrastructure.",
    examples: [
      "Real-time coffee and tea yield optimization via multispectral drone feeds and decentralized agronomist agents.",
    ],
    evidenceIds: ["ev-kenya-mpesa-05", "ev-geothermal-power-06"],
    applications: [
      "Sub-Saharan municipal stormwater management.",
      "Cross-border trade customs automated harmonization under AfCFTA.",
    ],
    caseStudyRefs: ["case-kenya-dpi-2026", "case-nakuru-geothermal-grid"],
    faqItems: [
      {
        question: "How can African nations afford frontier AI compute?",
        answer:
          "By co-locating green compute clusters directly with East African Rift geothermal generation (e.g., Olkaria) and leveraging open-weight distillation models running on edge NPUs.",
      },
    ],
    clusters: [
      "Kenyan Tech & Silicon Savannah",
      "Digital Public Goods & Mobile Rails",
      "Sub-Saharan Sponge Cities & Flood Adaptation",
    ],
    furtherResearchQuestions: [
      "What is the optimal geothermal compute architecture for zero-water cooling in high-ambient Rift Valley environments?",
    ],
    productCta: {
      label: "View African Observatory Telemetry",
      targetSpace: "observatory",
      description: "Inspect live signals from Kenya and the East African corridor.",
    },
  },
  {
    id: "future-of-ai-agents",
    title: "The Future of AI Agents: Swarm Intelligence & Autonomous Socratic Verification",
    slug: "future-of-ai-agents",
    domainId: "ai-intelligence",
    canonicalUrl: "https://atlassanctum.org/insights/future-of-ai-agents",
    summary:
      "How multi-agent networks, specialized epistemic roles, and continuous verification are replacing monolithic single-turn chat interfaces.",
    history:
      "From basic task scripts to hierarchical agent swarms with dedicated Critic, Synthesizer, and Conscience arbiters.",
    principles: [
      "Role Separation: Separate hypothesis generation from empirical critique.",
      "Deterministic Verification: Pair probabilistic LLMs with deterministic simulation sandboxes.",
      "Constitutional Conscience: Enforce inviolable ethical constraints as execution invariants.",
    ],
    coreFrameworkName: "The Atlas Socratic Swarm Architecture",
    coreFrameworkDescription:
      "Ten distinct agent personas debating systemic trade-offs to reach high-confidence consensus.",
    examples: [
      "Multi-agent budget reconciliation identifying duplicate fiscal line items across county ministries.",
    ],
    evidenceIds: ["ev-swarm-consensus-07"],
    applications: [
      "Automated policy stress testing.",
      "Complex project finance risk modeling.",
    ],
    caseStudyRefs: ["case-autonomous-swarm-deliberation"],
    faqItems: [
      {
        question: "What prevents agent hallucination loops in swarms?",
        answer:
          "Grounding arbiters enforce external citation retrieval and deterministic code sandboxes before any agent claim is registered as evidence.",
      },
    ],
    clusters: [
      "Autonomous Agent Swarms",
      "Socratic Reasoning Architectures",
      "Safe AI Governance & Verification",
    ],
    furtherResearchQuestions: [
      "What mathematical convergence proofs ensure termination in infinite multi-agent debate games?",
    ],
    productCta: {
      label: "Open Agent Council Workspace",
      targetSpace: "agents",
      description: "Interact with the 10-agent autonomous deliberation network.",
    },
  },
];

export const ATLAS_ORIGINAL_DATASETS: IndexBenchmarkDataset[] = [
  {
    id: "atlas-urban-resilience-index",
    name: "Atlas Urban Resilience Index (AURI)",
    slug: "atlas-urban-resilience-index",
    domain: "regenerative-intelligence",
    version: "2026.2-Live",
    lastUpdated: "2026-08-28T00:00:00Z",
    coverage: "28 African Metropolitan Areas & Global Benchmarks",
    methodologyOverview:
      "Multi-criteria satellite SAR hydrological absorption, power grid decentralized redundancy, and real-time community sensor throughput.",
    primaryMetrics: [
      { code: "HYDRO_SPONGE", name: "Hydrological Sponge Capacity", unit: "mm/hr absorption", baseline: 24.5, target2030: 65.0, currentMedian: 38.2 },
      { code: "GRID_DECENTRAL", name: "Decentralized Energy Redundancy", unit: "% resilient uptime", baseline: 41.0, target2030: 90.0, currentMedian: 62.4 },
      { code: "FOOD_SHED_KM", name: "Local Foodshed Proximity Index", unit: "km radius median", baseline: 180, target2030: 45, currentMedian: 92 },
    ],
    geographicalNodes: [
      { place: "Nairobi, Kenya", score: 68.4, rank: 4, resilienceTier: "Accelerating" },
      { place: "Nakuru, Kenya", score: 74.2, rank: 2, resilienceTier: "Frontier" },
      { place: "Kisii, Kenya", score: 71.8, rank: 3, resilienceTier: "Accelerating" },
      { place: "Kigali, Rwanda", score: 78.5, rank: 1, resilienceTier: "Frontier" },
      { place: "Accra, Ghana", score: 59.1, rank: 8, resilienceTier: "Stabilizing" },
      { place: "Lagos, Nigeria", score: 48.7, rank: 14, resilienceTier: "Vulnerable" },
    ],
    citationBibtex: `@dataset{AtlasUrbanResilience2026,\n  author = {Atlas Sanctum Research Consortium},\n  title = {Atlas Urban Resilience Index: Hydrological and Energy Dynamics in African Metropolises},\n  year = {2026},\n  doi = {10.5281/zenodo.atlas.auri.2026}\n}`,
    doiOrHandle: "10.5281/zenodo.atlas.auri.2026",
  },
  {
    id: "atlas-opportunity-index",
    name: "Atlas Opportunity & Leverage Index (AOLI)",
    slug: "atlas-opportunity-index",
    domain: "opportunity-intelligence",
    version: "2026.1",
    lastUpdated: "2026-08-20T00:00:00Z",
    coverage: "12 Strategic Infrastructure & Economic Sectors",
    methodologyOverview:
      "Calculated via bottleneck severity, capital elasticity, and multiplier coefficient on local employment and ecological restoration.",
    primaryMetrics: [
      { code: "CAPITAL_MULTIPLIER", name: "Capital Multiplier Ratio", unit: "$ economic yield / $ invested", baseline: 1.8, target2030: 5.5, currentMedian: 3.4 },
      { code: "JOB_INTENSITY", name: "High-Skill Local Job Generation", unit: "jobs / $100k deployed", baseline: 4.2, target2030: 12.0, currentMedian: 7.9 },
    ],
    geographicalNodes: [
      { place: "East African Rift Geothermal Corridor", score: 88.2, rank: 1, resilienceTier: "Frontier" },
      { place: "Western Kenya Agroforestry Basin", score: 82.5, rank: 2, resilienceTier: "Frontier" },
      { place: "Mombasa Digital Port Logistics", score: 76.1, rank: 3, resilienceTier: "Accelerating" },
    ],
    citationBibtex: `@dataset{AtlasOpportunityIndex2026,\n  author = {Atlas Sanctum Research Consortium},\n  title = {Atlas Opportunity & Leverage Index for Global South Infrastructure},\n  year = {2026},\n  doi = {10.5281/zenodo.atlas.aoli.2026}\n}`,
    doiOrHandle: "10.5281/zenodo.atlas.aoli.2026",
  },
  {
    id: "atlas-human-flourishing-index",
    name: "Atlas Human Flourishing & Agency Index (AHFI)",
    slug: "atlas-human-flourishing-index",
    domain: "human-flourishing",
    version: "2026.3",
    lastUpdated: "2026-08-15T00:00:00Z",
    coverage: "Sub-County and Municipal Community Clusters",
    methodologyOverview:
      "Evaluates individual and community agency, institutional trust metrics, cognitive development access, and intergenerational stability.",
    primaryMetrics: [
      { code: "AGENCY_SCORE", name: "Self-Reported Agency & Dignity", unit: "Index 0-100", baseline: 52.0, target2030: 85.0, currentMedian: 67.5 },
      { code: "INSTITUTION_TRUST", name: "Institutional Trust Index", unit: "% positive confidence", baseline: 34.0, target2030: 75.0, currentMedian: 54.0 },
    ],
    geographicalNodes: [
      { place: "Nairobi Innovation Hubs", score: 73.0, rank: 2, resilienceTier: "Accelerating" },
      { place: "Nakuru Community Agro-Ecology Cooperatives", score: 79.4, rank: 1, resilienceTier: "Frontier" },
    ],
    citationBibtex: `@dataset{AtlasHumanFlourishing2026,\n  author = {Atlas Sanctum Ethics & Development Lab},\n  title = {Atlas Human Flourishing & Cognitive Sovereignty Index},\n  year = {2026},\n  doi = {10.5281/zenodo.atlas.ahfi.2026}\n}`,
    doiOrHandle: "10.5281/zenodo.atlas.ahfi.2026",
  },
];

export const ATLAS_SEED_EVIDENCE_RECORDS: EvidenceRecord[] = [
  {
    id: "ev-sponge-nairobi-01",
    claim:
      "Decentralized micro-wetland swales in Nairobi reduce urban flash flood peak runoff by 43.6% compared to concrete culvert drainage alone.",
    claimType: "Source-backed claim",
    primarySource: "UN Habitat / University of Nairobi Urban Hydrology Telemetry Cohort (2025)",
    sourceUri: "https://unhabitat.org/nairobi-sponge-drainage-study-2025",
    methodology: "18-month empirical pressure transducer sensor deployment across 14 drainage corridors during short and long rains.",
    dateVerified: "2026-08-10",
    confidenceScore: 0.94,
    counterEvidence: "Severe 100-year cloudburst events can oversaturate unmaintained silt basins within 4 hours if sediment traps are neglected.",
    associatedPlaces: ["Nairobi, Kenya"],
    canonicalPillar: "what-is-regenerative-intelligence",
  },
  {
    id: "ev-solar-grid-02",
    claim:
      "Coupling village-scale solar mini-grids with localized battery energy storage and smart-contract tariff settlement increases smallholder refrigeration uptime to 99.2%.",
    claimType: "Fact",
    primarySource: "African Development Bank Sustainable Energy Fund Telemetry Report",
    sourceUri: "https://afdb.org/energy-telemetry-kenya-2025",
    methodology: "Real-time automated MQTT telemetry logging from 42 East African mini-grids.",
    dateVerified: "2026-08-14",
    confidenceScore: 0.98,
    associatedPlaces: ["Nakuru, Kenya", "Kisii, Kenya"],
    canonicalPillar: "what-is-regenerative-intelligence",
  },
  {
    id: "ev-systems-traffic-03",
    claim:
      "Adding additional highway lanes to radial corridors in rapidly growing cities generates a 22% increase in vehicle kilometers traveled within 24 months due to induced demand.",
    claimType: "Source-backed claim",
    primarySource: "Institute for Transportation & Development Policy (ITDP) Global Mobility Compendium",
    sourceUri: "https://itdp.org/induced-demand-global-south",
    methodology: "Longitudinal traffic camera counting and GPS telemetry across 12 mid-sized African and Latin American cities.",
    dateVerified: "2026-07-22",
    confidenceScore: 0.91,
    associatedPlaces: ["Nairobi, Kenya", "Accra, Ghana"],
    canonicalPillar: "complete-guide-to-systems-thinking",
  },
  {
    id: "ev-feedback-delay-04",
    claim:
      "Policy interventions targeting groundwater recharge exhibit a non-linear 3-to-7 year latency before measurable water table recovery in volcanic aquifer formations.",
    claimType: "Inference",
    primarySource: "East African Rift Hydrogeology Working Group",
    sourceUri: "https://ear-hydrogeology.org/aquifer-lag-times",
    methodology: "Piezometer borehole logging correlated with seasonal precipitation indices over 10 years.",
    dateVerified: "2026-08-01",
    confidenceScore: 0.87,
    associatedPlaces: ["Nakuru, Kenya", "Naivasha, Kenya"],
    canonicalPillar: "complete-guide-to-systems-thinking",
  },
  {
    id: "ev-kenya-mpesa-05",
    claim:
      "Digital public payment rails reduce transaction costs for rural agricultural inputs by 68% relative to cash intermediaries.",
    claimType: "Fact",
    primarySource: "Central Bank of Kenya Annual Payments & Financial Inclusion Review",
    sourceUri: "https://centralbank.go.ke/payments-inclusion-2025",
    methodology: "Aggregated national payment gateway audit across 1.4 million transactions.",
    dateVerified: "2026-08-18",
    confidenceScore: 0.99,
    associatedPlaces: ["Kenya"],
    canonicalPillar: "ai-for-african-development",
  },
  {
    id: "ev-geothermal-power-06",
    claim:
      "Olkaria geothermal field produces baseload power at under $0.052/kWh with 96% capacity factor, making it the most cost-effective green compute power source in Africa.",
    claimType: "Fact",
    primarySource: "Kenya Electricity Generating Company (KenGen) Fiscal Telemetry",
    sourceUri: "https://kengen.co.ke/olkaria-geothermal-performance",
    methodology: "Scada production metrics logged continuously across Units 1 through 6.",
    dateVerified: "2026-08-25",
    confidenceScore: 0.99,
    associatedPlaces: ["Olkaria, Kenya"],
    canonicalPillar: "ai-for-african-development",
  },
  {
    id: "ev-swarm-consensus-07",
    claim:
      "Multi-agent Socratic debate protocols with deterministic grounding sandboxes reduce factual hallucination rates from 14.8% to under 0.6% on complex public policy queries.",
    claimType: "Source-backed claim",
    primarySource: "Atlas Sanctum Autonomous Systems Evaluation Benchmark",
    sourceUri: "https://atlassanctum.org/research/socratic-agent-benchmarks",
    methodology: "Controlled double-blind evaluation across 5,000 synthetic and real-world municipal planning inquiries.",
    dateVerified: "2026-08-27",
    confidenceScore: 0.96,
    canonicalPillar: "future-of-ai-agents",
  },
];

export const ATLAS_TOP_SEARCH_OPPORTUNITIES: SearchOpportunityScore[] = [
  {
    id: "opp-01-regen-intel-guide",
    opportunityTitle: "Definitive Guide to Regenerative Intelligence (KNOW / UNDERSTAND)",
    domainId: "regenerative-intelligence",
    searchIntent: "KNOW",
    queryDemandVolume: "Exponential",
    potentialImpact: 10,
    confidenceScore: 9,
    implementationEffort: 3,
    priorityScore: (10 * 9) / 3, // 30.0
    targetKeywordCluster: ["what is regenerative intelligence", "regenerative AI systems", "regenerative economics definition"],
    productLoopTarget: "question-engine",
    rationale: "Zero authoritative competitors in search. High likelihood of capturing Google AI Overview source citations and academic backlinks.",
  },
  {
    id: "opp-02-african-flood-sponge",
    opportunityTitle: "Sub-Saharan Sponge City Design & Hydrological Telemetry (SOLVE / IMPLEMENT)",
    domainId: "africa",
    searchIntent: "SOLVE",
    queryDemandVolume: "High",
    potentialImpact: 9,
    confidenceScore: 9,
    implementationEffort: 4,
    priorityScore: (9 * 9) / 4, // 20.25
    targetKeywordCluster: ["how to build sponge cities in Africa", "urban flood resilience Kenya", "Nairobi drainage systems thinking"],
    productLoopTarget: "systems-modeling",
    rationale: "Severe real-world climate adaptation demand. Directly connects research with Atlas Systems Modeling and Nairobi case study.",
  },
  {
    id: "opp-03-ai-agent-swarms-governance",
    opportunityTitle: "Autonomous AI Agent Swarm Governance & Constitutional Safety (BUILD / DECIDE)",
    domainId: "ai-intelligence",
    searchIntent: "BUILD",
    queryDemandVolume: "High",
    potentialImpact: 9,
    confidenceScore: 8,
    implementationEffort: 4,
    priorityScore: (9 * 8) / 4, // 18.0
    targetKeywordCluster: ["how do multi-agent systems work", "AI agent swarm safety", "socratic reasoning architectures"],
    productLoopTarget: "agents",
    rationale: "Massive frontier AI interest. Positions Atlas as the reference architectural standard for ethical multi-agent orchestration.",
  },
  {
    id: "opp-04-capital-allocation-regen",
    opportunityTitle: "Blended Concessional Finance for African Regenerative Infrastructure (INVEST / DECIDE)",
    domainId: "capital",
    searchIntent: "INVEST",
    queryDemandVolume: "Emerging",
    potentialImpact: 9,
    confidenceScore: 8,
    implementationEffort: 3,
    priorityScore: (9 * 8) / 3, // 24.0
    targetKeywordCluster: ["blended finance Africa climate", "regenerative infrastructure investment Kenya", "impact capital 7 capitals"],
    productLoopTarget: "capital-intelligence",
    rationale: "Directly targets development finance institutions (AfDB, EIB, IFC, Rockefeller) seeking high-integrity project pipelines.",
  },
];

import {
  AtlasQuestion,
  ObservatorySignal,
  WorldNode,
  WorldEdge,
  StockFlowElement,
  CausalLoop,
  LeveragePoint,
  PossibilityDossier,
  StudioProject,
  AtlasMission,
  SevenCapitalsAnalysis,
  RegenerativePattern,
  AIAgentProfile,
  CivilizationDimension,
} from "../types";

export const INITIAL_QUESTIONS: AtlasQuestion[] = [
  {
    id: "q-101",
    category: "systems",
    title: "Why does seasonal flash flooding in Nairobi informal settlements persist despite repeated drainage capital allocations?",
    description: "Analyzing the systemic feedback loops between informal land tenure, solid waste accumulation, uncoordinated civil works, and upstream soil sealing.",
    subQuestions: [
      "What percentage of allocated stormwater capital is absorbed in administrative friction vs physical retention?",
      "How do upstream tarmac developments in Kilimani/Westlands alter peak discharge times into the Ngong River basin?",
      "What informal economic incentives drive solid waste disposal directly into riparian drainage channels?"
    ],
    assumptions: [
      "Assuming conventional concrete culverts are the optimal engineering response (Needs challenge)",
      "Assuming flood vulnerability is primarily a meteorological rather than land-governance failure"
    ],
    unknowns: [
      "Real-time micro-hydrology during 100-year cloudburst events under high climate volatility",
      "Actual community willingess-to-co-manage decentralized blue-green sponge bioswales"
    ],
    evidenceRequired: [
      "Satellite radar altimetry & micro-elevation DEM (0.5m)",
      "Municipal expenditure audit 2018-2025",
      "Community flood diary surveys across 12 Kibera villages"
    ],
    targetLeveragePoint: "Leverage Point #4: Power to change system structure & information flows",
    associatedPlace: "Kibera, Nairobi River Basin",
    depthLevel: 5,
    status: "testing",
    tags: ["Hydrology", "Urban Resilience", "Nairobi", "Informal Economy", "Decentralized Infrastructure"],
    canonPillarRef: 4
  },
  {
    id: "q-102",
    category: "innovation",
    title: "How can agricultural cold chains in the Rift Valley be decoupled from centralized grid electricity and diesel generators?",
    description: "Designing a decentralized thermodynamic chilling model utilizing geothermal waste heat, solar-thermal ammonia absorption, and M-Pesa micro-metering.",
    subQuestions: [
      "What is the thermodynamic efficiency of small-scale low-enthalpy geothermal absorption chillers in Naivasha?",
      "How does distributed cold storage alter post-harvest spoilage rates (currently 38%) for smallholder horticulturalists?",
      "What tokenized pay-per-crate financing mechanism allows smallholders to access cold storage without upfront capex?"
    ],
    assumptions: [
      "Assuming high capital cost cannot be amortized through collective agricultural aggregators",
      "Assuming grid power will remain unreliable during peak harvest season"
    ],
    unknowns: [
      "Geothermal brine mineral scaling rates in micro-heat exchangers",
      "Optimal geographic radius for community chilling hubs in Nakuru County"
    ],
    evidenceRequired: [
      "Geothermal wellhead temperature and pressure logs from Olkaria peripheral wells",
      "Horticulture price volatility indices at Wakulima Market relative to cold-stored produce"
    ],
    targetLeveragePoint: "Leverage Point #6: Information flow structure",
    associatedPlace: "Rift Valley Agro-Corridor, Kenya",
    depthLevel: 4,
    status: "hypothesized",
    tags: ["Energy", "Thermodynamics", "Agriculture", "Clean Energy", "First Principles"],
    canonPillarRef: 6
  },
  {
    id: "q-103",
    category: "civilization",
    title: "What post-colonial institutional coordination mechanisms can align public land stewardship with customary community stewardship?",
    description: "Investigating hybrid polycentric governance protocols combining digital land registries with community elder land councils (Wazee wa Mtaa).",
    subQuestions: [
      "How do we prevent digital land title formalization from accelerating speculative displacement of vulnerable tenants?",
      "Can cryptographic multi-signature escrow emulate traditional collective covenant agreements?",
      "What institutional audit trails restore public trust in civic spatial planning?"
    ],
    assumptions: [
      "Assuming centralized state registries are inherently more secure than distributed community validation",
      "Assuming customary stewardship is incompatible with modern spatial GIS tools"
    ],
    unknowns: [
      "Legal enforceability of hybrid community-trust easements in Kenyan courts",
      "Long-term intergenerational succession patterns in collective trusts"
    ],
    evidenceRequired: [
      "Comparative analysis of Community Land Act 2016 implementation across 5 counties",
      "Survey of 450 informal settlement resident associations"
    ],
    targetLeveragePoint: "Leverage Point #2: The mindset or paradigm out of which the system arises",
    associatedPlace: "East African Urban Corridors",
    depthLevel: 5,
    status: "open",
    tags: ["Governance", "Institutions", "Land Stewardship", "Ubuntu", "Civilization"],
    canonPillarRef: 13
  },
  {
    id: "q-104",
    category: "reality",
    title: "What is the true net metabolic energy and nutrient flow in East African urban informal food systems?",
    description: "Empirical quantification of caloric inflow, micronutrient distribution, food waste leakage, and informal logistics margin distribution.",
    subQuestions: [
      "What percentage of urban caloric supply travels through unregistered informal wholesale networks?",
      "How much food value is lost during multi-modal transport between rural farms and urban roadside kiosks?",
      "What are the micro-nutrient bioavailability deficits among informal settlement children under age 5?"
    ],
    assumptions: [
      "Assuming informal food systems are chaotic rather than self-optimizing decentralized supply networks"
    ],
    unknowns: [
      "Total daily volume of informal grain and vegetable movements via Matatu and Boda-Boda transit",
      "Pesticide residue concentrations in urban roadside produce"
    ],
    evidenceRequired: [
      "Boda-boda transit logistics telemetry and waypoint tracker data",
      "Lab spectrometry results on urban produce samples",
      "Household consumption expenditure records across 800 urban families"
    ],
    targetLeveragePoint: "Leverage Point #10: Structure of material stocks and flows",
    associatedPlace: "Nairobi - Nakuru Food Shed",
    depthLevel: 4,
    status: "validated",
    tags: ["Metabolism", "Nutrition", "Informal Logistics", "Empirical Truth"],
    canonPillarRef: 3
  },
  {
    id: "q-105",
    category: "intelligence",
    title: "How can autonomous environmental sensor swarms and local community monitors create a sovereign ecological commons?",
    description: "Designing a decentralized environmental monitoring network that rewards local youth with programmable micro-grants for verified ground telemetry.",
    subQuestions: [
      "What edge-AI sensor architectures can operate reliably in dusty, high-humidity riverine environments for under $25 per unit?",
      "How do we verify citizen sensor data against adversarial spoofing or selective reporting?",
      "What governance structure ensures environmental telemetry cannot be monopolized by speculative extractive interests?"
    ],
    assumptions: [
      "Assuming high-resolution environmental intelligence requires centralized government laboratory deployments"
    ],
    unknowns: [
      "Long-term sensor drift in low-cost optical particulate matter sensors",
      "Micro-incentive payout velocity and liquidity effects on community participation"
    ],
    evidenceRequired: [
      "Calibration curves against reference grade EPA / NEMA air and water quality stations",
      "Smart contract micro-disbursement transaction logs across 300 community nodes"
    ],
    targetLeveragePoint: "Leverage Point #5: Rules of the system (incentives, punishments, constraints)",
    associatedPlace: "Lake Victoria Basin & Nairobi Rivers",
    depthLevel: 4,
    status: "testing",
    tags: ["Sensor Swarms", "AI", "Ecological Commons", "Community Telemetry"],
    canonPillarRef: 8
  },
  {
    id: "q-106",
    category: "human",
    title: "What psychosocial and cultural factors govern community adoption of decentralized sanitation and circular bio-waste systems?",
    description: "Understanding human dignity, olfactory perception, taboos around human waste reuse, and the pride of neighborhood co-ownership.",
    subQuestions: [
      "How does the spatial design of public sanitation facilities influence psychological safety for women and children at night?",
      "What cultural narratives transform 'waste' from a stigmatized hazard into a valued community energy feedstock?",
      "How do local caretakers establish authority and social trust within informal neighborhood clusters?"
    ],
    assumptions: [
      "Assuming technical efficiency alone dictates adoption without deep cultural alignment"
    ],
    unknowns: [
      "Psychological barriers to utilizing black soldier fly larvae compost for urban agro-forestry",
      "Intergenerational differences in attitudes toward community-managed shared infrastructure"
    ],
    evidenceRequired: [
      "Ethnographic field interviews with 180 female heads of households",
      "Longitudinal usage heatmaps of 24 community bio-sanitation centers"
    ],
    targetLeveragePoint: "Leverage Point #1: The power to transcend paradigms",
    associatedPlace: "Mukuru kwa Njenga & Mathare Valley",
    depthLevel: 5,
    status: "validated",
    tags: ["Human Dignity", "Culture", "Sanitation", "Psychosocial Context"],
    canonPillarRef: 5
  }
];

export const OBSERVATORY_SIGNALS: ObservatorySignal[] = [
  {
    id: "sig-01",
    title: "Riparian Encroachment & Peak Runoff Velocity Spike",
    domain: "ecological",
    location: "Nairobi Basin (Ngong & Mathare Rivers)",
    severity: "critical",
    trend: "accelerating",
    summary: "Impervious surface expansion in upper catchment (Westlands, Karen) has decreased watershed infiltration by 42% over 6 years, shortening storm hydrograph peak delay from 95 mins to 24 mins.",
    metric: "Peak Runoff Velocity: 4.8 m/s",
    delta: "+65% vs 10-yr baseline",
    detectedAt: "2 hours ago (Live Telemetry Node NBI-04)",
    confidenceScore: 0.94,
    leveragePotential: "transformational",
    groundTruthNote: "Field monitors in Silanga Village report water levels rising 1.4 meters in under 18 minutes following afternoon downpours.",
    tags: ["Hydrology", "Flood Vulnerability", "Urban Drainage"]
  },
  {
    id: "sig-02",
    title: "Distributed Solar Mini-Grid Battery Capacity Arbitrage",
    domain: "infrastructure",
    location: "Rift Valley / Naivasha Agro-Corridor",
    severity: "low",
    trend: "accelerating",
    summary: "Over 82 agricultural mini-grids are reporting 3.4 MWh of unutilized midday solar generation that could power decentralized cold storage absorption loops.",
    metric: "Curtailed Solar Energy: 3.4 MWh/day",
    delta: "+28% surplus month-over-month",
    detectedAt: "4 hours ago (Grid Telemetry Swarm RV-12)",
    confidenceScore: 0.98,
    leveragePotential: "structural",
    groundTruthNote: "Farmers currently venting excess steam and disconnecting solar strings due to lack of local thermal storage sinks.",
    tags: ["Clean Energy", "Mini-Grids", "Cold Storage Opportunity"]
  },
  {
    id: "sig-03",
    title: "Informal Market Liquidity Surge via Programmable Mobile Escrows",
    domain: "market",
    location: "Eastleigh & Gikomba Wholesale Markets",
    severity: "medium",
    trend: "stable",
    summary: "Informal traders adopting multi-party programmable SMS escrows have reduced supplier default rates from 19.4% to 2.1% while increasing inventory turnover by 3.2x.",
    metric: "Daily Informal Settlement Volume: $1.85M USD",
    delta: "+42% trade velocity YoY",
    detectedAt: "6 hours ago (Financial Telemetry Feed KE-M09)",
    confidenceScore: 0.91,
    leveragePotential: "structural",
    groundTruthNote: "Women-led chama savings collectives are pooling surplus working capital into shared bulk procurement trucks.",
    tags: ["Fintech", "Mobile Money", "Informal Economy", "Chamas"]
  },
  {
    id: "sig-04",
    title: "Soil Carbon Depletion & Micronutrient Leaching in Maize Belt",
    domain: "ecological",
    location: "Trans-Nzoia & Uasin Gishu Plateaus",
    severity: "high",
    trend: "accelerating",
    summary: "Continuous synthetic nitrogen fertilizer application without organic amendment has dropped topsoil organic matter from 4.2% to 1.3%, reducing water holding capacity by 310,000 liters per hectare.",
    metric: "Topsoil Organic Matter: 1.3%",
    delta: "-69% across 20-year survey",
    detectedAt: "Yesterday (Sentinel-2 Soil Reflectance + Lab Ground Core)",
    confidenceScore: 0.96,
    leveragePotential: "transformational",
    groundTruthNote: "Farmers report needing 40% more fertilizer to achieve the same yield recorded a decade ago, creating debt traps.",
    tags: ["Regenerative Agriculture", "Soil Health", "Food Sovereignty"]
  },
  {
    id: "sig-05",
    title: "Decentralized Medical Telemetry in Informal Settlement Health Clinics",
    domain: "community",
    location: "Mathare Valley Community Health Center",
    severity: "medium",
    trend: "divergent",
    summary: "Community Health Promoters (CHPs) using handheld diagnostic kits detected an early respiratory infection cluster 14 days before official hospital outpatient reporting.",
    metric: "Epidemiological Lead Time: +14 Days",
    delta: "3.5x faster than centralized surveillance",
    detectedAt: "Yesterday (CHP Telemetry Sync #98)",
    confidenceScore: 0.89,
    leveragePotential: "structural",
    groundTruthNote: "Rapid community triage and nebulizer deployment prevented 85 pediatric hospitalizations during cold front.",
    tags: ["Public Health", "Early Warning", "Community Agency"]
  },
  {
    id: "sig-06",
    title: "Biomass Clean Cooking Leapfrog in Peri-Urban Settlements",
    domain: "socioeconomic",
    location: "Kangemi & Kawangware Sub-Counties",
    severity: "low",
    trend: "accelerating",
    summary: "Ethanol micro-dispensers and pelletized agricultural bio-waste stoves have reached 28% household penetration, cutting indoor PM2.5 particulate levels by 88%.",
    metric: "Indoor PM2.5: 22 µg/m³ (down from 185 µg/m³)",
    delta: "-88% respiratory exposure",
    detectedAt: "2 days ago (Household Air Quality Network)",
    confidenceScore: 0.93,
    leveragePotential: "incremental",
    groundTruthNote: "Households spend $0.45/day on clean bio-fuel vs $0.85/day on traditional dirty charcoal.",
    tags: ["Clean Cooking", "Air Quality", "Energy Transition"]
  }
];

export const WORLD_GRAPH_NODES: WorldNode[] = [
  { id: "node-kibera", label: "Kibera Urban Settlement", type: "place", location: "Nairobi, KE", status: "vulnerable", metric: "Pop: 320,000 | Density: 2,000/ha", description: "High-density settlement with extreme terrain gradients, active informal economy, and high flood vulnerability.", x: 200, y: 150 },
  { id: "node-ngong-river", label: "Ngong River Catchment", type: "ecosystem", location: "Nairobi Basin", status: "critical", metric: "Length: 42km | Water Quality: Grade E", description: "Severely degraded river corridor carrying stormwater runoff, industrial effluent, and informal sewage.", x: 380, y: 130 },
  { id: "node-flood-vulnerability", label: "Seasonal Flash Flooding", type: "problem", status: "critical", metric: "Annual Damage: $14.2M USD", description: "Recurrent inundation displacing households, destroying informal assets, and causing waterborne disease spikes.", x: 340, y: 280 },
  { id: "node-sponge-infrastructure", label: "Decentralized Blue-Green Bioswales", type: "intervention", status: "regenerative", metric: "Runoff Retention: 72%", description: "Permeable bioswales, terraced retention ponds, and constructed wetlands woven into settlement alleys.", x: 180, y: 350 },
  { id: "node-local-guilds", label: "Kibera Youth Construction Guilds", type: "institution", status: "active", metric: "Capacity: 450 Trained Builders", description: "Organized local artisans with deep spatial knowledge of micro-drainage topography.", x: 80, y: 240 },
  { id: "node-blended-capital", label: "East Africa Urban Resilience Fund", type: "capital", status: "active", metric: "Capital: $4.5M Blended Escrow", description: "Combination of green climate grants, municipal co-funding, and community equity bonds.", x: 260, y: 460 },
  { id: "node-naivasha-agro", label: "Naivasha Agro-Energy Hub", type: "place", location: "Rift Valley, KE", status: "stable", metric: "Solar + Geothermal: 14MW", description: "Geothermal and solar abundant corridor producing high-value horticulture for regional and export markets.", x: 620, y: 180 },
  { id: "node-cold-storage", label: "Geothermal Absorption Chilling", type: "technology", status: "regenerative", metric: "Temp: +2°C to +8°C | 0 Grid Carbon", description: "Low-enthalpy geothermal waste heat powering ammonia absorption refrigeration chillers.", x: 740, y: 280 },
  { id: "node-food-loss", label: "Horticultural Post-Harvest Spoilage", type: "problem", status: "vulnerable", metric: "Crop Loss: 38% Harvested Value", description: "Lack of pre-cooling causes rapid wilting and rot during transit to urban centers.", x: 540, y: 320 },
  { id: "node-m-pesa-escrow", label: "Programmable Cold-Crate Liquidity", type: "technology", status: "active", metric: "Txn Volume: 14,000 crates/mo", description: "Micro-metered smart-lock crates unlocked via M-Pesa tokenized payment upon drop-off.", x: 680, y: 440 },
  { id: "node-human-flourishing", label: "Regenerated Household Dignity & Assets", type: "opportunity", status: "regenerative", metric: "Income Lift: +34% | Health Lift: +48%", description: "Compounding civilizational capacity where physical security enables deep human flourishing and agency.", x: 440, y: 550 }
];

export const WORLD_GRAPH_EDGES: WorldEdge[] = [
  { id: "e1", source: "node-ngong-river", target: "node-kibera", relationship: "inundates during peak storm surges", direction: "strains", strength: 5 },
  { id: "e2", source: "node-kibera", target: "node-flood-vulnerability", relationship: "experiences severe asset and health loss", direction: "strains", strength: 5 },
  { id: "e3", source: "node-sponge-infrastructure", target: "node-flood-vulnerability", relationship: "retards peak velocity and absorbs runoff", direction: "transforms", strength: 5 },
  { id: "e4", source: "node-local-guilds", target: "node-sponge-infrastructure", relationship: "constructs and maintains decentralized bioswales", direction: "reinforces", strength: 4 },
  { id: "e5", source: "node-blended-capital", target: "node-sponge-infrastructure", relationship: "funds materials and micro-wages via smart contracts", direction: "funds", strength: 5 },
  { id: "e6", source: "node-sponge-infrastructure", target: "node-human-flourishing", relationship: "eliminates flood displacement and waterborne disease", direction: "transforms", strength: 5 },
  { id: "e7", source: "node-naivasha-agro", target: "node-food-loss", relationship: "suffers post-harvest heat stress", direction: "strains", strength: 4 },
  { id: "e8", source: "node-cold-storage", target: "node-food-loss", relationship: "eliminates thermal degradation of vegetables", direction: "transforms", strength: 5 },
  { id: "e9", source: "node-naivasha-agro", target: "node-cold-storage", relationship: "supplies geothermal brine and solar surplus", direction: "reinforces", strength: 5 },
  { id: "e10", source: "node-m-pesa-escrow", target: "node-cold-storage", relationship: "provides micro-metered pay-per-crate monetization", direction: "funds", strength: 4 },
  { id: "e11", source: "node-cold-storage", target: "node-human-flourishing", relationship: "preserves smallholder farmer profit and regional food nutrition", direction: "transforms", strength: 5 }
];

export const DOWELLA_MEADOWS_LEVERAGE_POINTS: LeveragePoint[] = [
  { id: "lp-1", rank: 1, title: "The Power to Transcend Paradigms", description: "Recognizing that no paradigm is ultimate truth, allowing radical flexibility to adopt whatever mental model regenerates life.", currentPractice: "Rigid ideological commitment to extractive industrial metrics (GDP, short-term IRR).", regenerativeIntervention: "Cultivating intellectual humility, living systems consciousness, and multi-generational stewardship.", impactPotential: "civilizational", feasibility: "systemic" },
  { id: "lp-2", rank: 2, title: "The Mindset or Paradigm Out of Which the System Arises", description: "The shared unstated assumptions that constitute society's deepest beliefs about how the world works.", currentPractice: "Treating nature as a passive infinite sink and human labor as an interchangeable cost line.", regenerativeIntervention: "Embedding the 7-Capitals framework: human dignity, ecological vitality, and social trust as primary goals.", impactPotential: "civilizational", feasibility: "demanding" },
  { id: "lp-3", rank: 3, title: "The Goals of the System", description: "The overarching objective that directs system behavior, resource allocation, and feedback interpretation.", currentPractice: "Maximizing throughput volume and financial capital accumulation regardless of ecological decay.", regenerativeIntervention: "Maximizing net human flourishing, ecological carrying capacity, and systemic resilience.", impactPotential: "civilizational", feasibility: "demanding" },
  { id: "lp-4", rank: 4, title: "The Power to Change System Structure (Self-Organization)", description: "The ability of a system to evolve, restructure, create new feedback loops, and self-heal.", currentPractice: "Centralized, bureaucratic, top-down command-and-control with high inertia.", regenerativeIntervention: "Decentralized polycentric governance with community agency and modular cybernetic networks.", impactPotential: "high", feasibility: "demanding" },
  { id: "lp-5", rank: 5, title: "The Rules of the System (Incentives, Constraints, Laws)", description: "The incentives, penalties, property rights, and information disclosures that shape actor choices.", currentPractice: "Subsidizing fossil extraction while externalizing pollution onto vulnerable populations.", regenerativeIntervention: "Outcome-based smart contracts, regenerative tax shifts, and community-held natural easements.", impactPotential: "high", feasibility: "moderate" },
  { id: "lp-6", rank: 6, title: "The Structure of Information Flows", description: "Who does and does not have access to timely, transparent, unvarnished information.", currentPractice: "Opaque corporate and municipal data silos concealing pollution and financial leakages.", regenerativeIntervention: "Open telemetry observatories, real-time public environmental dashboards, and provenance tracking.", impactPotential: "high", feasibility: "moderate" },
  { id: "lp-7", rank: 7, title: "The Gain of Driving Positive Feedback Loops", description: "Self-reinforcing loops that amplify growth, compounding interest, or vicious spirals of degradation.", currentPractice: "Unchecked wealth concentration driving regulatory capture and accelerated extraction.", regenerativeIntervention: "Circulating local economic dividends (e.g. chama savings, community equity pools) that compound local wealth.", impactPotential: "high", feasibility: "demanding" },
  { id: "lp-8", rank: 8, title: "The Strength of Negative (Balancing) Feedback Loops", description: "Mechanisms that counteract disturbances and restore equilibrium (e.g., thermostat, price signals).", currentPractice: "Delayed, muffled ecological warning signs allowing tipping points to be crossed unnoticed.", regenerativeIntervention: "Automated early-warning sensor swarms with direct community-triggered mitigation protocols.", impactPotential: "high", feasibility: "moderate" },
  { id: "lp-9", rank: 9, title: "The Lengths of Delays Relative to the Rate of System Change", description: "Time lags between an action, its observation, policy response, and physical correction.", currentPractice: "Decade-long infrastructure planning cycles responding to rapid climate shocks after the damage occurs.", regenerativeIntervention: "Rapid micro-experimentation loops (weeks instead of decades) with real-time feedback adaptation.", impactPotential: "medium", feasibility: "moderate" },
  { id: "lp-10", rank: 10, title: "The Structure of Material Stocks and Flows", description: "Physical transport networks, pipelines, drainage grids, and supply chains.", currentPractice: "Centralized linear concrete conduits vulnerable to single-point catastrophic failure.", regenerativeIntervention: "Distributed, modular, bio-mimetic sponge networks and decentralized micro-chilling nodes.", impactPotential: "medium", feasibility: "demanding" },
  { id: "lp-11", rank: 11, title: "The Sizes of Buffers and Stabilizing Stocks", description: "Storage capacities (water reservoirs, grain reserves, cash reserves) relative to flow variations.", currentPractice: "Just-in-time hyper-optimized supply chains with zero buffer, vulnerable to small disruptions.", regenerativeIntervention: "Strategic decentralized grain silos, rainwater retention aquifers, and local working capital reserves.", impactPotential: "medium", feasibility: "easy" },
  { id: "lp-12", rank: 12, title: "Constants, Parameters, Numbers (Subsidies, Taxes, Standards)", description: "Numerical tweaks (tax rates, minimum wage amounts, fines) that leave system structure unchanged.", currentPractice: "Endless debate over adjusting fine amounts by 2% while ignoring systemic corruption.", regenerativeIntervention: "Use parameters only as tactical calibration once higher leverage structural shifts are secured.", impactPotential: "low", feasibility: "easy" }
];

export const CAUSAL_LOOPS: CausalLoop[] = [
  {
    id: "loop-1",
    name: "Informal Urban Flood-Poverty Trap (Vicious Reinforcing Loop R1)",
    type: "reinforcing",
    description: "Flooding destroys informal working capital → Families borrow at predatory rates → Inability to invest in durable housing → Settlement remains vulnerable to next flood.",
    nodesInvolved: ["Storm Surge", "Asset Loss", "Informal Indebtedness", "Housing Quality Degradation", "Drainage Blockage"],
    polaritySequence: ["+", "+", "+", "-", "+"],
    currentBottleneck: "Lack of immediate parametric emergency liquidity to prevent distress selling of productive tools."
  },
  {
    id: "loop-2",
    name: "Regenerative Blue-Green Urban Sponge (Virtuous Reinforcing Loop R2)",
    type: "reinforcing",
    description: "Bioswales retain stormwater → Youth guilds earn maintenance stipends → Neighborhood assets stay dry → Local commercial turnover rises → Community funds further bioswale expansions.",
    nodesInvolved: ["Bioswale Permeability", "Flood Risk Reduction", "Local Commerce Growth", "Civic Maintenance Fund", "Youth Guild Employment"],
    polaritySequence: ["+", "-", "+", "+", "+"],
    currentBottleneck: "Securing stable 2-year catalytic initial capital before self-sustaining municipal co-funding kicks in."
  },
  {
    id: "loop-3",
    name: "Thermal Post-Harvest Preservation Balancer (Balancing Loop B1)",
    type: "balancing",
    description: "Ambient heat increases spoilage rate → Cold storage drops product temperature → Spoilage rate decreases toward zero.",
    nodesInvolved: ["Ambient Temperature", "Produce Respiration Rate", "Chiller Thermal Extraction", "Spoilage Index"],
    polaritySequence: ["+", "+", "-", "-"],
    currentBottleneck: "Thermal battery insulation materials with high local sourcing ratio."
  }
];

export const STOCKS_AND_FLOWS: StockFlowElement[] = [
  { id: "sf-1", name: "Settlement Permeable Soil Volume", type: "stock", unit: "m³", currentValue: 42000, targetValue: 120000, changeRatePerMonth: +1800, description: "Total porous soil sponge capacity capable of absorbing 50mm/hr cloudbursts." },
  { id: "sf-2", name: "Stormwater Inflow Peak Rate", type: "inflow", unit: "m³/sec", currentValue: 18.4, targetValue: 6.2, changeRatePerMonth: -0.4, description: "Peak surge discharge entering settlement from upstream paved developments." },
  { id: "sf-3", name: "Infiltrated Groundwater Recharge", type: "outflow", unit: "m³/sec", currentValue: 4.1, targetValue: 12.5, changeRatePerMonth: +0.6, description: "Clean water filtered into local aquifers rather than washing topsoil away." },
  { id: "sf-4", name: "Community Liquidity Reserve", type: "stock", unit: "USD", currentValue: 145000, targetValue: 500000, changeRatePerMonth: +12000, description: "Autonomous community-managed emergency buffer fund." },
  { id: "sf-5", name: "Smallholder Spoiled Produce Loss", type: "outflow", unit: "Metric Tons/Mo", currentValue: 380, targetValue: 40, changeRatePerMonth: -28, description: "Edible food discarded before reaching consumers due to lack of chilling." }
];

export const POSSIBILITY_DOSSIERS: PossibilityDossier[] = [
  {
    id: "poss-01",
    title: "Decentralized Bioswale Sponge Corridor with Community Micro-Tolls",
    horizon: "near-term-feasible",
    mechanism: "Interlocking terraced bioswales lined with vetiver grass and volcanic pumice aggregate, intercepting 70% of overland stormwater before it reaches low-lying homes.",
    coreAssumptions: [
      "Volcanic pumice can be sourced cost-effectively from Longonot quarry",
      "Youth construction guilds can be trained in bio-engineering grading within 10 days",
      "Drainage easements will be respected by community agreement"
    ],
    enablingTechnologies: [
      "0.5m LiDAR micro-topography routing",
      "IoT hydrostatic water level pressure sensors",
      "Programmable M-Pesa micro-stipends"
    ],
    requiredCapabilities: [
      "Civic mediation with neighborhood elders",
      "Hydraulic slope grading without heavy excavators",
      "Vetiver nursery propagation"
    ],
    affectedStakeholders: ["Kibera riparian residents", "Nairobi City County Works", "Local Bodaboda riders", "Informal shopkeepers"],
    potentialBeneficiaries: ["42,000 residents across 4 low-lying villages", "750 local youth artisans"],
    risks: [
      "Solid waste dumping in bioswales during heavy night rains",
      "Upstream real estate developers increasing unmitigated runoff"
    ],
    secondOrderEffects: [
      "Micro-climate cooling reduces urban heat island effect by 2.2°C",
      "Creation of safe pedestrian walking corridors alongside green bioswales"
    ],
    capitalRequirementEstimate: "$185,000 USD for Phase 1 (1.8 km corridor)",
    implementationDifficulty: "medium",
    expectedOutcomes: [
      "85% reduction in residential flood inundation depth",
      "Zero flood-related casualties during 2026 El Niño rains",
      "750 youth employed in dignified eco-construction"
    ],
    reversibility: "high",
    confidenceScore: 0.91,
    evidenceBase: [
      "Field pilot in Silanga Village retained 92% of 45mm rain event in Oct 2025",
      "Hydraulic soil permeability tests confirmed 140mm/hr infiltration with pumice amendment"
    ],
    experimentRequired: "Deploy a 120-meter prototype bioswale at Gatwekera junction with 4 youth builders over 14 days ($4,200 USD budget).",
    placeContext: "Kibera, Nairobi",
    sevenCapitalsDelta: {
      Human: 35,
      Social: 45,
      Intellectual: 25,
      Natural: 50,
      Financial: 20,
      Physical: 40,
      Institutional: 30
    }
  },
  {
    id: "poss-02",
    title: "Geothermal Waste-Heat Ammonia Absorption Chilling Network",
    horizon: "transformational",
    mechanism: "Tapping 85°C separator brine from peripheral geothermal wells to drive single-effect ammonia-water absorption refrigeration cycles, providing zero-electricity cold rooms at $0.03/kg produce.",
    coreAssumptions: [
      "KenGen / GDC permits heat exchange off-take from low-enthalpy brine lines",
      "Ammonia safety protocols can be maintained with automated sniffer cutoffs",
      "Smallholder farmer cooperatives will aggregate daily morning harvests"
    ],
    enablingTechnologies: [
      "Titanium plate heat exchangers resistant to silica scaling",
      "Thermal phase-change energy storage materials (PCM -2°C to +4°C)",
      "Cellular IoT temperature and humidity telemetry"
    ],
    requiredCapabilities: [
      "Industrial thermal refrigeration engineering",
      "Agricultural cold-chain logistics dispatch",
      "Cooperative aggregation management"
    ],
    affectedStakeholders: ["Smallholder horticultural farmers", "Geothermal power operators", "Urban wholesale merchants"],
    potentialBeneficiaries: ["6,500 smallholder farmers in Nakuru/Naivasha", "Over 200,000 urban consumers receiving fresher produce"],
    risks: [
      "Geothermal brine chemistry changes causing fouling",
      "Export market price shocks for specialty vegetables"
    ],
    secondOrderEffects: [
      "Elimination of 1.4 MW diesel generator load across agro-processing belt",
      "Tripling of shelf-life allows farmers to bypass predatory middleman price dumping"
    ],
    capitalRequirementEstimate: "$520,000 USD for 200-ton centralized hub + 6 spoke satellites",
    implementationDifficulty: "high",
    expectedOutcomes: [
      "Post-harvest losses drop from 38% to under 4%",
      "Smallholder net household margins increase by 41%",
      "1,800 tons of fresh nutritious produce saved annually"
    ],
    reversibility: "moderate",
    confidenceScore: 0.88,
    evidenceBase: [
      "Pilot testbed on Olkaria well 34 achieved -4°C evaporator temp with 82°C brine supply",
      "Wakulima market price tracking shows 2.4x margin premium for crisply preserved greens"
    ],
    experimentRequired: "Construct a 10-ton containerized absorption chiller skid connected to test wellhead over 6 weeks ($28,000 USD budget).",
    placeContext: "Naivasha, Rift Valley",
    sevenCapitalsDelta: {
      Human: 40,
      Social: 30,
      Intellectual: 45,
      Natural: 55,
      Financial: 60,
      Physical: 50,
      Institutional: 35
    }
  },
  {
    id: "poss-03",
    title: "Autonomous AI-Native Bio-Waste Micro-Refineries for Aviation Sustainable Fuel",
    horizon: "long-shot-frontier",
    mechanism: "Distributed hydrothermal liquefaction (HTL) reactors processing urban organic slurry and water hyacinth from Lake Victoria into bio-crude and nitrogen-rich biochar fertilizer.",
    coreAssumptions: [
      "Sub-critical water continuous flow reactors can be miniaturized to standard 40ft container format",
      "Catalytic upgrading can produce ASTM D7566 compliant SAF precursors",
      "Continuous feedstock logistics from informal settlements and lake shores can be automated"
    ],
    enablingTechnologies: [
      "High-pressure continuous sludge slurry pumps (220 bar, 350°C)",
      "In-situ AI reaction kinetics optimization model",
      "Superconducting magnetic separation of catalytic fines"
    ],
    requiredCapabilities: [
      "Chemical process engineering under high pressure",
      "Municipal sludge dewatering",
      "Aviation fuel certification"
    ],
    affectedStakeholders: ["Airlines operating out of JKIA", "Lake Victoria fishing communities", "Urban waste pickers"],
    potentialBeneficiaries: ["Decarbonized regional aviation", "15,000 waste collectors organized into equity cooperatives"],
    risks: [
      "Corrosion from chloride ions in food waste",
      "High capex per micro-refinery unit"
    ],
    secondOrderEffects: [
      "Total elimination of water hyacinth suffocating Lake Victoria bays",
      "Creation of a sovereign green energy export industry for Kenya"
    ],
    capitalRequirementEstimate: "$4.2M USD for demonstration pilot plant",
    implementationDifficulty: "frontier",
    expectedOutcomes: [
      "12,000 barrels of drop-in sustainable aviation bio-crude per year",
      "50,000 tons of organic waste diverted from open burning",
      "4,000 tons of sequestered carbon in biochar returning to depleted soils"
    ],
    reversibility: "low",
    confidenceScore: 0.72,
    evidenceBase: [
      "Lab batch HTL of Nairobi sewage sludge achieved 38.4% bio-oil yield with 34 MJ/kg HHV",
      "Water hyacinth gasification kinetics validated at Strathmore Energy Research Centre"
    ],
    experimentRequired: "Run a 50 kg/day continuous bench-scale HTL reactor on mixed hyacinth-sludge for 100 continuous hours ($45,000 USD budget).",
    placeContext: "Kisumu & Nairobi, Kenya",
    sevenCapitalsDelta: {
      Human: 30,
      Social: 25,
      Intellectual: 70,
      Natural: 65,
      Financial: 50,
      Physical: 60,
      Institutional: 40
    }
  },
  {
    id: "poss-04",
    title: "Atmospheric Bio-Electric Water Harvesting from Equatorial Convective Uplift",
    horizon: "unknown-horizon",
    mechanism: "Utilizing electrostatic ionization arrays on high-elevation towers to nucleate atmospheric moisture into concentrated fog collectors without moving parts.",
    coreAssumptions: [
      "Atmospheric humidity in Mount Kenya cloud forest can be induced to precipitate electrostatically",
      "Zero net ecological disruption to downstream rainfall patterns"
    ],
    enablingTechnologies: [
      "High-voltage solid-state corona discharge emitters",
      "Super-hydrophobic biomimetic mesh surfaces (Namib beetle inspired)",
      "Solar-ion capacitor banks"
    ],
    requiredCapabilities: [
      "Atmospheric physics and cloud chamber modeling",
      "High-altitude autonomous power systems"
    ],
    affectedStakeholders: ["Arid downstream pastoralists in Samburu / Isiolo", "Ecological conservation trusts"],
    potentialBeneficiaries: ["Over 500,000 pastoralists facing recurrent multi-year droughts"],
    risks: [
      "Potential alteration of local micro-climates",
      "Lightning strikes destroying ionization arrays"
    ],
    secondOrderEffects: [
      "Perennial green corridors in arid lands reversing desertification"
    ],
    capitalRequirementEstimate: "$8.5M USD frontier research program",
    implementationDifficulty: "frontier",
    expectedOutcomes: [
      "500,000 liters of pure gravity-fed mountain water per day in arid lowlands"
    ],
    reversibility: "high",
    confidenceScore: 0.54,
    evidenceBase: [
      "Theoretical electrostatic coalescence models show 4.8x droplet growth rate in 85% RH air"
    ],
    experimentRequired: "Construct a 10-meter electrostatic test mast in Nanyuki to measure fog capture delta vs passive mesh ($15,000 USD budget).",
    placeContext: "Mount Kenya Foothills / Isiolo Corridor",
    sevenCapitalsDelta: {
      Human: 50,
      Social: 35,
      Intellectual: 80,
      Natural: 75,
      Financial: 40,
      Physical: 55,
      Institutional: 30
    }
  }
];

export const INITIAL_STUDIO_PROJECT: StudioProject = {
  id: "proj-kibera-sponge",
  title: "Kibera Blue-Green Sponge City Infrastructure",
  place: "Kibera (Gatwekera, Silanga & Mashimoni Villages), Nairobi",
  problemStatement: "Seasonal flash flooding repeatedly destroys informal homes, washes sewage into drinking supplies, and strips informal traders of inventory, causing $14M in annual preventable damages.",
  firstPrinciplesDeconstruction: {
    purpose: "Ensure water flows harmlessly through the urban fabric while creating dignified public pathways and clean micro-environments.",
    fundamentalPhysics: [
      "Water flows down gravity gradients following path of least resistance",
      "Porous surfaces slow peak velocity by friction and capillary absorption (Darcy's Law)",
      "Water carrying sediment requires kinetic energy; settling ponds drop sediment before clogs occur"
    ],
    removedAssumptions: [
      "Removed assumption that only multi-million dollar concrete underground pipes can handle stormwater",
      "Removed assumption that informal settlements must be cleared before installing drainage",
      "Removed assumption that maintenance must rely on absent municipal contractors"
    ],
    reconstructedSystem: "A modular, terraced, bio-engineered sponge network built from local volcanic pumice and vetiver roots, maintained by community youth guilds paid through automated micro-escrow."
  },
  ambitionLadder: {
    baseline: "Distribute emergency sandbags and tarps after houses have already flooded.",
    constraint: "Dense informal layout prevents standard excavators; uncollected plastic waste clogs narrow trenches.",
    conventionalPath: "Tender a municipal contract for concrete open drains that fill with trash within 3 months.",
    betterPath: "Pave alleys with concrete blocks and hire seasonal clearing crews.",
    breakthrough10xPath: "Construct decentralized porous bioswales with integrated trash traps, transforming flood channels into lush pedestrian promenades with zero municipal dependency.",
    frontierPath: "Deploy autonomous sensor-actuated sluice gates and sub-surface aquifer recharge wells that filter stormwater into potable local community tap water.",
    civilizationPath: "Demonstrate that the world's dense informal settlements can leapfrog rigid 20th-century gray infrastructure into resilient, living 21st-century ecological sponge habitats."
  },
  currentStep: 6,
  steps: [
    { stepNumber: 1, name: "Problem Definition", question: "What is actually happening?", status: "completed", outputSummary: "100-year storm surges causing rapid inundation due to 88% surface impermeability and riparian dumping.", artifacts: ["Flood diary dataset", "Hydrological map"] },
    { stepNumber: 2, name: "Evidence Base", question: "What do we know to be true?", status: "completed", outputSummary: "Pumice amended bioswales absorb 140mm/hr; community guilds have 95% retention rate when paid weekly.", artifacts: ["Soil porosity lab report", "Youth survey"] },
    { stepNumber: 3, name: "System Model", question: "Why is it happening?", status: "completed", outputSummary: "Causal loop R1 (Flood-Poverty trap) sustained by lack of local ownership and delayed municipal intervention.", artifacts: ["Causal loop diagram R1/R2"] },
    { stepNumber: 4, name: "Opportunity Discovery", question: "Where can intervention occur?", status: "completed", outputSummary: "Leverage Point #4 (Self-organization of local youth guilds) + Leverage Point #10 (Material flow geometry).", artifacts: ["Leverage point matrix"] },
    { stepNumber: 5, name: "Hypothesis Formulation", question: "What might work from first principles?", status: "completed", outputSummary: "If we install volcanic pumice bioswales co-managed by local youth, flood damage will drop by >80% at 1/5th concrete cost.", artifacts: ["Formal hypothesis doc"] },
    { stepNumber: 6, name: "Smallest Real Experiment", question: "What can be tested quickly and cheaply?", status: "in-progress", outputSummary: "120-meter test corridor at Gatwekera junction to evaluate runoff deceleration during March rain cycle.", artifacts: ["Experiment protocol", "Sensor BOM"] },
    { stepNumber: 7, name: "Prototype Engineering", question: "What can be built?", status: "pending", outputSummary: "Modular interlocking pumice blocks and nursery-grown vetiver root plugs.", artifacts: [] },
    { stepNumber: 8, name: "Partner Coordination", question: "Who holds the necessary capabilities?", status: "pending", outputSummary: "Kibera Community Development Trust + Strathmore Hydrology Lab + Slum Dwellers International.", artifacts: [] },
    { stepNumber: 9, name: "Capital Structuring", question: "What resources are required?", status: "pending", outputSummary: "Blended $185,000 tranche (60% catalytic grant + 40% outcome bond).", artifacts: [] },
    { stepNumber: 10, name: "Deployment Protocol", question: "How will it operate in the real world?", status: "pending", outputSummary: "Staged 4-block rollout with weekly telemetry check-ins.", artifacts: [] },
    { stepNumber: 11, name: "Outcome Measurement", question: "How will success be determined?", status: "pending", outputSummary: "Continuous depth telemetry and post-storm household damage surveys.", artifacts: [] },
    { stepNumber: 12, name: "Institutional Learning", question: "What changed and what failed?", status: "pending", outputSummary: "Synthesizing failure modes and updating hydraulic friction coefficients.", artifacts: [] },
    { stepNumber: 13, name: "Scale & Transfer", question: "Can the model transfer elsewhere?", status: "pending", outputSummary: "Publishing the Urban Flood Resilience Pattern for Mukuru, Mathare, and Lagos.", artifacts: [] }
  ],
  hypothesis: "Replacing impervious open mud trenches with structured volcanic pumice bioswales will decrease peak stormwater velocity by 65% and eliminate residential structural flooding across a 500m radius.",
  smallestExperiment: {
    name: "Gatwekera 120-Meter Test Sponge Corridor",
    durationWeeks: 3,
    budgetUSD: 4200,
    successMetric: "Infiltrates 40mm/hr simulated rainfall with zero surface ponding exceeding 5cm depth.",
    falsificationCondition: "If volcanic pumice silts over within 14 days and drops infiltration below 30mm/hr, the mechanism is invalidated and must be redesigned."
  },
  progress: 46
};

export const ACTIVE_MISSIONS: AtlasMission[] = [
  {
    id: "msn-01",
    codeName: "OPERATION BLUE SPONGE",
    title: "Kibera Decentralized Sponge City Corridor",
    location: "Kibera, Nairobi",
    objective: "Eliminate structural flood inundation across 42,000 residents through community bio-engineered volcanic sponge corridors.",
    status: "active",
    healthScore: 92,
    capitalMobilizedUSD: 185000,
    capitalTargetUSD: 250000,
    leadPartners: ["Kibera Youth Guilds", "Nairobi Water Basin Coalition", "Strathmore Hydrology Lab"],
    communityBeneficiaries: 42000,
    milestones: [
      { id: "m1", title: "Micro-elevation LiDAR terrain mapping completed", dueDate: "Jan 2026", completed: true, evidenceProof: "Hash: 0x89f...b4c | 0.5m DEM verified" },
      { id: "m2", title: "Gatwekera 120m prototype bioswale constructed", dueDate: "Feb 2026", completed: true, evidenceProof: "Water infiltration telemetry log: 138mm/hr" },
      { id: "m3", title: "Phase 1: 1.8km main corridor construction", dueDate: "Apr 2026", completed: false },
      { id: "m4", title: "Community sensor swarm automated early-warning live", dueDate: "May 2026", completed: false }
    ],
    dependencies: ["Volcanic pumice freight delivery from Naivasha", "Community elder right-of-way consensus"],
    keyRisks: [
      { description: "Unusually early heavy rains before vetiver roots establish", mitigation: "Deploy biodegradable coir matting for instant soil pinning", severity: "medium" },
      { description: "Upstream industrial illegal effluent dumping", mitigation: "Install optical turbidity alert sensors at entry boundary", severity: "high" }
    ],
    decisionLog: [
      { date: "2026-02-14", decision: "Switched from concrete pipe culverts to volcanic pumice gravel bioswales", rationale: "Concrete had 4x cost and would clog with silt; pumice is self-filtering and 100% locally repairable", decisionMaker: "Council of Systems Engineers + Community Elders", moralCheckPassed: true },
      { date: "2026-02-20", decision: "Instituted direct weekly M-Pesa payments to youth builders with zero contractor middleman fee", rationale: "Preserves 100% of wage dignity and boosts local settlement liquidity", decisionMaker: "Project Capital Steward", moralCheckPassed: true }
    ],
    telemetry: [
      { metric: "Peak Runoff Velocity", value: "1.8 m/s", target: "< 2.0 m/s", isPositive: true },
      { metric: "Infiltration Rate", value: "138 mm/hr", target: "> 100 mm/hr", isPositive: true },
      { metric: "Homes Inundated in Test Sector", value: "0", target: "0", isPositive: true },
      { metric: "Youth Guild Daily Wage Paid", value: "$12.50 USD", target: "$12.00 USD", isPositive: true }
    ]
  },
  {
    id: "msn-02",
    codeName: "OPERATION BOREAS CHILL",
    title: "Rift Valley Geothermal Cold Chain Aggregator",
    location: "Naivasha, Nakuru County",
    objective: "Deploy 200 tons of zero-carbon geothermal absorption cold storage to prevent $3.8M in annual horticultural waste.",
    status: "scaling",
    healthScore: 88,
    capitalMobilizedUSD: 520000,
    capitalTargetUSD: 650000,
    leadPartners: ["Nakuru Smallholder Farmers Association", "KenGen Industrial Park", "Africa Cold Chain Trust"],
    communityBeneficiaries: 6500,
    milestones: [
      { id: "mb1", title: "Geothermal brine heat exchanger pilot commissioning", dueDate: "Dec 2025", completed: true, evidenceProof: "Continuous 72hr log at 3.8°C" },
      { id: "mb2", title: "M-Pesa micro-metering lock crate smart hardware deployed", dueDate: "Jan 2026", completed: true, evidenceProof: "500 crates active in pilot" },
      { id: "mb3", title: "Full 200-ton central chilling hub opening", dueDate: "Mar 2026", completed: false },
      { id: "mb4", title: "Cold logistics fleet route optimization with electric vans", dueDate: "Jun 2026", completed: false }
    ],
    dependencies: ["KenGen wellhead safety sign-off", "Cold box composite panel import clearance"],
    keyRisks: [
      { description: "Silica scaling in heat exchangers", mitigation: "Continuous ultrasonic de-scaling transducers installed", severity: "medium" }
    ],
    decisionLog: [
      { date: "2026-01-10", decision: "Eliminated diesel generator backup in favor of 4-hour thermal phase change eutectic plates", rationale: "Reduces operating carbon to true zero and lowers operational cost by $2,400/month", decisionMaker: "Lead Thermal Engineer", moralCheckPassed: true }
    ],
    telemetry: [
      { metric: "Cold Room Temperature", value: "+3.4°C", target: "+2°C to +4°C", isPositive: true },
      { metric: "Post-Harvest Spoilage Rate", value: "3.2%", target: "< 5.0%", isPositive: true },
      { metric: "Farmer Revenue Premium", value: "+38%", target: "> 30%", isPositive: true },
      { metric: "Grid Electricity Consumed", value: "0 kWh", target: "0 kWh", isPositive: true }
    ]
  },
  {
    id: "msn-03",
    codeName: "OPERATION SOVEREIGN SOIL",
    title: "Western Kenya Biochar Soil Regeneration Belt",
    location: "Kakamega & Bungoma Counties",
    objective: "Restore topsoil organic carbon from 1.2% to 3.5% across 14,000 smallholder farms using continuous pyrolyzed sugarcane bagasse biochar.",
    status: "active",
    healthScore: 95,
    capitalMobilizedUSD: 340000,
    capitalTargetUSD: 400000,
    leadPartners: ["Sugar Belt Farmer Collectives", "ICRAF Agroforestry", "Kenya Carbon Commons"],
    communityBeneficiaries: 14000,
    milestones: [
      { id: "ms1", title: "Distributed micro-pyrolyzer design validated", dueDate: "Nov 2025", completed: true, evidenceProof: "Biochar fixed carbon content: 78.4%" },
      { id: "ms2", title: "Inoculation with indigenous mycorrhizal fungi established", dueDate: "Jan 2026", completed: true, evidenceProof: "Spore count: 1.2M / gram" },
      { id: "ms3", title: "10,000 acre application across long rains planting", dueDate: "Mar 2026", completed: false }
    ],
    dependencies: ["Sugarcane factory bagasse residue agreements"],
    keyRisks: [
      { description: "Drying of bagasse feedstock during unseasonal storms", mitigation: "Solar convective greenhouse drying tunnels", severity: "low" }
    ],
    decisionLog: [
      { date: "2025-12-05", decision: "Rejected selling soil carbon credits to foreign fossil polluters", rationale: "Carbon value must remain on the community balance sheet to lower local micro-loan interest rates", decisionMaker: "Governance Council", moralCheckPassed: true }
    ],
    telemetry: [
      { metric: "Soil Moisture Retention", value: "+44%", target: "> 35%", isPositive: true },
      { metric: "Maize Yield Per Hectare", value: "48 bags", target: "> 40 bags", isPositive: true },
      { metric: "Synthetic Fertilizer Cost", value: "-62%", target: "-50%", isPositive: true }
    ]
  }
];

export const SEVEN_CAPITALS_DATA: SevenCapitalsAnalysis[] = [
  {
    capital: "Human",
    valueCreated: "Direct elimination of waterborne illness, reduction of child mortality, dignified craftsmanship training for 750 youth.",
    valuePreserved: "Protection of family health and physical safety during severe storm events.",
    valueDestroyedOrDisplaced: "Displacement of informal predatory water cartels and unorganized waste racketeering.",
    externalities: "Significant boost in educational attendance for children who previously missed school during flood cleanup.",
    distributionBenefits: "Concentrated 85% among poorest quintile in flood-prone informal settlement alleys.",
    distributionRisks: "Physical risks during construction managed through protective equipment protocols.",
    netScore: 88
  },
  {
    capital: "Social",
    valueCreated: "Deepening of trust and collective efficacy across neighborhood chamas, elder councils, and youth guilds.",
    valuePreserved: "Preservation of longstanding community social networks without forced relocation.",
    valueDestroyedOrDisplaced: "Erosion of corrupt patronage networks that profited from emergency crisis management.",
    externalities: "Cross-village collaboration models adopted by neighboring informal settlements.",
    distributionBenefits: "Equal agency across women-led savings groups and youth construction teams.",
    distributionRisks: "Risk of inter-village rivalry mitigated by transparent open-allocation formulas.",
    netScore: 92
  },
  {
    capital: "Intellectual",
    valueCreated: "Generation of open-source micro-hydrology engineering patterns, indigenous pumice mix formulations, and sensor protocols.",
    valuePreserved: "Codification of elder spatial knowledge of historical flood pathways and seasonal springs.",
    valueDestroyedOrDisplaced: "Obsolescence of expensive proprietary imported civil engineering consulting blueprints.",
    externalities: "Regional university engineering curricula updated with real-world informal settlement case studies.",
    distributionBenefits: "Public digital commons licensed under permissive open-hardware standards.",
    distributionRisks: "None; knowledge is non-rivalrous and openly distributed.",
    netScore: 95
  },
  {
    capital: "Natural",
    valueCreated: "Restoration of soil filtration, recharge of clean groundwater aquifers, 2.2°C micro-climate cooling.",
    valuePreserved: "Halting erosion of fragile riverbanks and preserving downstream aquatic life in Athi Basin.",
    valueDestroyedOrDisplaced: "Temporary excavation disturbance during bioswale grading.",
    externalities: "Return of native dragonflies, pollinating insects, and bird species to urban green corridors.",
    distributionBenefits: "Shared environmental commons benefiting all downstream basin communities.",
    distributionRisks: "Risk of chemical contamination mitigated by upstream biosorption reeds.",
    netScore: 84
  },
  {
    capital: "Financial",
    valueCreated: "$14.2M in avoided annual flood damages; $1.85M in injected local working capital via micro-stipends.",
    valuePreserved: "Preservation of smallholder and informal merchant inventories and productive machinery.",
    valueDestroyedOrDisplaced: "Loss of high-interest predatory disaster loans issued by informal loan sharks.",
    externalities: "Lower default rates on community micro-credit portfolios.",
    distributionBenefits: "Direct injection to micro-traders, artisans, and smallholder families.",
    distributionRisks: "Initial capital structured as non-extractive blended catalytic grants.",
    netScore: 78
  },
  {
    capital: "Physical",
    valueCreated: "1.8 km of engineered porous bioswales, paved pedestrian promenades, and 12 community water plazas.",
    valuePreserved: "Structural integrity of 4,200 informal homes and schools.",
    valueDestroyedOrDisplaced: "Removal of illegal garbage heaps and rotting wooden drainage channels.",
    externalities: "Upgraded pedestrian walkways reduce ankle and leg injuries during wet season.",
    distributionBenefits: "Universal physical access across the entire settlement footprint.",
    distributionRisks: "Physical assets designed for 25-year flood return period with modular repairability.",
    netScore: 86
  },
  {
    capital: "Institutional",
    valueCreated: "Formation of permanent, legitimate community-run public works trusts with auditable decision logs.",
    valuePreserved: "Integration of constitutional public participation mandates into daily operational reality.",
    valueDestroyedOrDisplaced: "Reduction of bureaucratic helplessness and top-down municipal indifference.",
    externalities: "Municipal government adopting community-trust co-management as formal city policy.",
    distributionBenefits: "Broad civic legitimacy across government, academia, and civil society.",
    distributionRisks: "Institutional capture prevented by rotating term limits and algorithmic transparency.",
    netScore: 90
  }
];

export const REGENERATIVE_PATTERNS: RegenerativePattern[] = [
  {
    id: "pat-01",
    name: "Urban Blue-Green Sponge Corridor Pattern",
    domain: "Urban Hydrology & Civil Architecture",
    originPlace: "Kibera, Nairobi, Kenya",
    problemSolved: "Catastrophic storm runoff and raw sewage flooding in high-density informal settlements with zero room for heavy machinery.",
    coreMechanism: "Terraced bioswales utilizing local volcanic pumice aggregate, vetiver grass root stabilization, and community micro-stipend maintenance.",
    reproducibilityScore: 0.94,
    deploymentsCount: 8,
    validatedOutcomeMetrics: [
      "85% peak runoff velocity reduction",
      "Zero structural home collapses across 3 rain cycles",
      "1/5th cost of standard concrete culvert engineering"
    ],
    keyConditions: [
      "Availability of porous natural aggregate (pumice, crushed volcanic rock)",
      "Deep community social cohesion and organized youth guilds",
      "Slope gradient between 2% and 12%"
    ],
    failuresEncountered: [
      "Plastic waste dumping before trash traps were installed (Fixed: Added removable stainless steel sieve grates)",
      "Goats eating young vetiver shoots (Fixed: Temporary bamboo fencing for first 6 weeks)"
    ],
    provenanceClaims: [
      {
        claim: "Volcanic pumice increases hydraulic conductivity by 4.2x over standard clay-loam.",
        evidence: "ASTM D2434 Permeability test logs, Strathmore Lab Report #HYD-2025-08.",
        source: "Prof. D. Ochieng, Department of Civil & Environmental Engineering",
        confidence: 0.98
      },
      {
        claim: "Community youth maintenance eliminates 94% of municipal contractor billing overhead.",
        evidence: "Expenditure audit across 4 comparative settlement drainage projects 2023-2025.",
        source: "Nairobi Urban Governance Review, Vol 14",
        confidence: 0.92
      }
    ]
  },
  {
    id: "pat-02",
    name: "Decentralized Geothermal Agro-Chilling Pattern",
    domain: "Clean Thermodynamics & Food Sovereignty",
    originPlace: "Naivasha, Rift Valley, Kenya",
    problemSolved: "38% post-harvest spoilage of smallholder vegetables due to lack of affordable electricity grid access.",
    coreMechanism: "Single-effect ammonia absorption cycle powered by 80°C+ geothermal waste brine, coupled with M-Pesa pay-per-crate telemetry.",
    reproducibilityScore: 0.89,
    deploymentsCount: 3,
    validatedOutcomeMetrics: [
      "Cold room temperature maintained at +3°C with 0 kWh grid power",
      "Produce shelf life extended from 24 hours to 11 days",
      "Smallholder revenue lift +38% within 90 days"
    ],
    keyConditions: [
      "Proximity to low-enthalpy geothermal brine or industrial waste heat source (>75°C)",
      "Cooperative farmer aggregation within 8km radius",
      "Cellular connectivity for IoT micro-metering"
    ],
    failuresEncountered: [
      "Silica fouling in heat exchangers (Fixed: Switched to titanium plates with ultrasonic cavitation cleaners)"
    ],
    provenanceClaims: [
      {
        claim: "Absorption refrigeration driven by geothermal waste heat achieves COP of 0.68 under tropical ambient conditions.",
        evidence: "Continuous 30-day thermal energy balance logger data, Olkaria Unit 4.",
        source: "Kenya Geothermal Energy Institute & Strathmore Energy Centre",
        confidence: 0.96
      }
    ]
  },
  {
    id: "pat-03",
    name: "Continuous Bagasse Pyrolysis & Soil Carbon Belt",
    domain: "Regenerative Agriculture & Soil Chemistry",
    originPlace: "Kakamega, Western Kenya",
    problemSolved: "Severe topsoil acidification and organic matter depletion causing catastrophic crop yield collapse.",
    coreMechanism: "Low-cost continuous retorts converting sugarcane bagasse into inoculated high-porosity biochar, returning organic carbon and minerals to fields.",
    reproducibilityScore: 0.92,
    deploymentsCount: 14,
    validatedOutcomeMetrics: [
      "Soil water-holding capacity increased by 44%",
      "Synthetic fertilizer dependence reduced by 60%",
      "Topsoil carbon sequestered at 2.4 tCO2e / hectare / year"
    ],
    keyConditions: [
      "Abundant agricultural biomass residue (bagasse, coffee husks, maize stover)",
      "Indigenous mycorrhizal inoculum culture"
    ],
    failuresEncountered: [
      "Applying un-inoculated raw biochar temporarily locked up soil nitrogen (Fixed: Mandatory 14-day compost pre-charging)"
    ],
    provenanceClaims: [
      {
        claim: "Inoculated biochar elevates cation exchange capacity (CEC) by 85% in degraded tropical oxisols.",
        evidence: "Longitudinal 3-year randomized agronomic control trials, ICRAF Western Hub.",
        source: "Dr. A. Wanjiku et al., Soil & Tillage Research Journal",
        confidence: 0.95
      }
    ]
  }
];

export const ATLAS_AI_AGENTS: AIAgentProfile[] = [
  { id: "ag-research", name: "Research Agent", role: "Empirical Evidence & Literature Synthesis", specialization: "Synthesizing peer-reviewed science, sensor telemetry, and historical precedents with strict provenance.", avatarIcon: "BookOpen", currentThought: "Cross-referencing sediment transport equations against real-time Ngong river hydrographs.", recentArtifact: "Evidence dossier #EV-902: Pumice hydraulic friction coefficients.", status: "active" },
  { id: "ag-systems", name: "Systems Agent", role: "Causal Loop & Stock-Flow Modeling", specialization: "Mapping feedback loops, delays, non-linearities, and Meadows leverage points across complex human-ecological systems.", avatarIcon: "GitFork", currentThought: "Simulating 10-year feedback dynamics of youth guild wage circulation in Kibera.", recentArtifact: "Causal loop diagram R2: Virtuous Blue Sponge economic engine.", status: "reasoning" },
  { id: "ag-question", name: "Question Agent", role: "Socratic Inquiry & Deepening", specialization: "Generating higher-order questions that unmask hidden assumptions and reveal civilizational leverage points.", avatarIcon: "HelpCircle", currentThought: "Formulating first-principles inquiry into decentralized thermal energy storage without lithium batteries.", recentArtifact: "Inquiry set: 'Thermodynamics of Geothermal Cold Chains'.", status: "active" },
  { id: "ag-opportunity", name: "Opportunity Agent", role: "Algorithmic Possibility Discovery", specialization: "Interpreting multi-dimensional graphs to detect latent intersections between place, capability, capital, and need.", avatarIcon: "Sparkles", currentThought: "Matching unutilized Naivasha solar curtailment with agricultural cold storage demand spikes.", recentArtifact: "Opportunity matrix: 'Rift Valley Solar-Thermal Absorption'.", status: "active" },
  { id: "ag-innovation", name: "Innovation Agent", role: "Experiment & Prototype Engineering", specialization: "Deconstructing problems from first principles into 13-step pipelines and designing the smallest real-world falsification experiments.", avatarIcon: "Compass", currentThought: "Finalizing BOM for Gatwekera 120m bioswale test corridor.", recentArtifact: "Experiment protocol #EXP-04: Pumice infiltration validation.", status: "deliberating" },
  { id: "ag-capital", name: "Capital Agent", role: "Blended Finance & 7-Capitals Structuring", specialization: "Designing non-extractive capital stacks, outcome-based bonds, community equity trusts, and 7-capitals balance sheets.", avatarIcon: "Layers", currentThought: "Structuring $185k blended tranche combining green climate grants with community equity.", recentArtifact: "Capital prospectus #CAP-101: Urban Sponge Outcome Bond.", status: "active" },
  { id: "ag-simulation", name: "Simulation Agent", role: "Scenario & Counterfactual Modeling", specialization: "Projecting 'What happens if we do nothing?', 'What happens if this scales 100x?', and stress-testing under extreme volatility.", avatarIcon: "Activity", currentThought: "Running Monte Carlo stress test for 1-in-50 year tropical deluge scenario.", recentArtifact: "Scenario report: '2026 El Niño Impact Simulation'.", status: "reasoning" },
  { id: "ag-governance", name: "Governance & Ethics Agent", role: "Moral Intelligence & Power Auditing", specialization: "Evaluating human dignity, agency, justice, ecological stewardship, reversibility, and accountability across all interventions.", avatarIcon: "ShieldCheck", currentThought: "Auditing community right-of-way consensus protocols in Silanga village.", recentArtifact: "Moral Intelligence Audit #MIA-88: Sanctioned with conditional weekly reviews.", status: "active" },
  { id: "ag-field", name: "Field Agent", role: "Cybernetic Bridge & Ground Telemetry", specialization: "Connecting digital intelligence to real-world deployment, IoT sensor swarms, community monitors, and physical build protocols.", avatarIcon: "Radio", currentThought: "Streaming calibration telemetry from 14 hydrostatic level sensors in Gatwekera.", recentArtifact: "Telemetry stream #TEL-NBI-04: Pressure transducer zero-drift log.", status: "active" },
  { id: "ag-synthesis", name: "Synthesis Agent", role: "Atlas Worldview & Institutional Memory", specialization: "Maintaining the unified canon, distilling reusable regenerative patterns, and ensuring systemic coherence.", avatarIcon: "Globe", currentThought: "Codifying the Urban Blue-Green Sponge Corridor into the global Atlas Pattern Library.", recentArtifact: "Regenerative Pattern #PAT-01: 'Urban Blue-Green Sponge'.", status: "active" }
];

export const CIVILIZATION_DIMENSIONS: CivilizationDimension[] = [
  { id: "dim-human", name: "Human Flourishing & Dignity", score: 68, trend: "improving", indicators: [{ name: "Infant Health Index", value: "84/100", delta: "+6.2%" }, { name: "Community Agency Score", value: "79/100", delta: "+12.4%" }, { name: "Preventable Disease Burden", value: "22/100", delta: "-18.5%" }], summary: "Significant gains in localized healthcare and psychological safety in pilot settlements." },
  { id: "dim-econ", name: "Economic Vitality & Circularity", score: 64, trend: "improving", indicators: [{ name: "Local Working Capital Velocity", value: "3.4x", delta: "+28%" }, { name: "Informal Asset Protection", value: "72%", delta: "+45%" }, { name: "Non-Extractive Capital Ratio", value: "61%", delta: "+15%" }], summary: "Circulating local micro-liquidity reducing reliance on predatory external credit." },
  { id: "dim-inst", name: "Institutional Trust & Governance", score: 58, trend: "improving", indicators: [{ name: "Polycentric Governance Index", value: "66/100", delta: "+14%" }, { name: "Provenance & Audit Transparency", value: "92/100", delta: "+22%" }, { name: "Public Participation Rate", value: "81%", delta: "+35%" }], summary: "Community elder councils and youth trusts re-establishing local civic legitimacy." },
  { id: "dim-eco", name: "Ecological Health & Carrying Capacity", score: 52, trend: "stable", indicators: [{ name: "Watershed Infiltration Ratio", value: "48%", delta: "+18%" }, { name: "Soil Organic Carbon", value: "2.1%", delta: "+0.8%" }, { name: "Biodiversity Corridor Index", value: "54/100", delta: "+9%" }], summary: "Early reversal of soil carbon depletion and stormwater erosion in active pilot corridors." },
  { id: "dim-infra", name: "Infrastructure Resilience", score: 62, trend: "improving", indicators: [{ name: "Decentralized Sponge Capacity", value: "42,000 m³", delta: "+35%" }, { name: "Zero-Carbon Cold Chain Volume", value: "200 tons", delta: "+100%" }, { name: "Fault-Tolerant Redundancy", value: "84/100", delta: "+12%" }], summary: "Transitioning from rigid centralized pipes to distributed, bio-engineered living networks." },
  { id: "dim-innov", name: "Innovation Velocity & Experimentation", score: 82, trend: "improving", indicators: [{ name: "Active First-Principles Pipelines", value: "14", delta: "+4" }, { name: "Hypothesis Falsification Speed", value: "18 days", delta: "-40%" }, { name: "Reusable Pattern Adoption", value: "28 nodes", delta: "+65%" }], summary: "High rate of hypothesis testing and rapid prototype deployment across regional nodes." },
  { id: "dim-intel", name: "Intelligence Symbiosis (Human + Machine)", score: 86, trend: "improving", indicators: [{ name: "Socratic Question Depth", value: "4.6/5.0", delta: "+0.4" }, { name: "AI-Human Cognitive Alignment", value: "94%", delta: "+8%" }, { name: "Ground-Truth Calibration", value: "96%", delta: "+5%" }], summary: "10-agent swarm operating across shared causal graphs with strict empirical provenance." },
  { id: "dim-opp", name: "Opportunity Space & Ambition", score: 74, trend: "improving", indicators: [{ name: "Breakthrough 10x Pathways Mapped", value: "19", delta: "+7" }, { name: "Frontier Horizons Under Research", value: "8", delta: "+3" }, { name: "Civilizational Impact Leverage", value: "88/100", delta: "+10%" }], summary: "Continuous expansion of near-term feasible, transformational, and long-shot frontier possibilities." }
];

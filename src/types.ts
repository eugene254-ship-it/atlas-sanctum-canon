/**
 * ATLAS SANCTUM — Type Definitions
 * Regenerative Intelligence Operating System
 */

export type NavigationSpace =
  | "home"
  | "partnerships"
  | "question-engine"
  | "observatory"
  | "world-model"
  | "systems-modeling"
  | "possibility-space"
  | "studio"
  | "mission-control"
  | "capital-intelligence"
  | "civilization-dashboard"
  | "scenario-engine"
  | "agents"
  | "patterns-memory"
  | "sdk-api";

export type EventSeverity = "INFO" | "WARN" | "CRITICAL" | "SUCCESS";

export interface SystemEventNotification {
  id: string;
  timestamp: string;
  severity: EventSeverity;
  subsystem: string;
  title: string;
  message: string;
  actionTargetSpace?: NavigationSpace;
  actionLabel?: string;
  resolved?: boolean;
  metadata?: Record<string, any>;
}

export interface UserMacro {
  id: string;
  title: string;
  description: string;
  category: "Workflow" | "Focus" | "Diagnostics" | "Intelligence";
  hotkey?: string;
  iconName?: string;
  steps: string[];
}

export interface PartnershipTarget {
  id: string;
  carouselPosition: string; // e.g. "01", "02"
  organization: string;
  strategicRole: string;
  strategicPriority?: "High" | "Medium" | "Low";
  strategicCluster?: "Frontier Tech" | "Global Development" | "African Infrastructure";
  category: "Frontier AI & Cloud" | "Multilateral & Development Finance" | "Philanthropic Foundations" | "Digital & Economic Infrastructure";
  pillarAlignment: number[]; // Canon Pillar IDs
  focusAreas: string[];
  capabilitiesOffered: string[];
  strategicRationale: string;
  jointInitiatives: {
    name: string;
    horizon: string;
    targetOutcome: string;
    status: "Exploring" | "Blueprint Ready" | "Active Pilot" | "Scaling";
  }[];
  measurableImpactTarget: string;
  keyStakeholders: string[];
  readinessScore: number; // 0-100
  badgeColor?: string;
  sevenCapitalsScores?: Record<SevenCapitalType, number>;
  sevenCapitalsReportCard?: Record<
    SevenCapitalType,
    {
      score: number;
      valueCreated: string;
      valuePreserved: string;
      riskOrDisplacement: string;
      leverageMechanism: string;
    }
  >;
  multiYearRoadmap?: {
    phase: string;
    timeline: string;
    milestone: string;
    deliverables: string[];
  }[];
  isSyncedToMissionControl?: boolean;
}

export interface CanonPillar {
  id: number;
  name: string;
  sequenceOrder: number;
  aphorism: string;
  firstPrinciples: string[];
  systemicImplication: string;
  category: "Foundations" | "Dynamics" | "Structures" | "Pragmatics" | "Mastery";
}

export type QuestionCategory =
  | "reality"
  | "systems"
  | "human"
  | "innovation"
  | "intelligence"
  | "civilization";

export interface AtlasQuestion {
  id: string;
  category: QuestionCategory;
  title: string;
  description: string;
  subQuestions: string[];
  assumptions: string[];
  unknowns: string[];
  evidenceRequired: string[];
  targetLeveragePoint?: string;
  associatedPlace?: string;
  depthLevel: number; // 1-5
  status: "open" | "hypothesized" | "testing" | "validated";
  tags: string[];
  canonPillarRef: number;
}

export interface ObservatorySignal {
  id: string;
  title: string;
  domain: "socioeconomic" | "ecological" | "infrastructure" | "climate" | "policy" | "community" | "market";
  location: string;
  severity: "low" | "medium" | "high" | "critical";
  trend: "accelerating" | "stable" | "decelerating" | "divergent";
  summary: string;
  metric: string;
  delta: string;
  detectedAt: string;
  confidenceScore: number;
  leveragePotential: "incremental" | "structural" | "transformational";
  groundTruthNote?: string;
  tags: string[];
}

export interface WorldNode {
  id: string;
  label: string;
  type: "place" | "ecosystem" | "infrastructure" | "institution" | "problem" | "opportunity" | "capital" | "intervention" | "technology";
  location?: string;
  status: "critical" | "vulnerable" | "active" | "regenerative" | "stable";
  metric?: string;
  capacity?: number;
  description: string;
  x?: number;
  y?: number;
}

export interface WorldEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  direction: "reinforces" | "depletes" | "strains" | "funds" | "transforms" | "monitors";
  strength: number; // 1-5
}

export interface StockFlowElement {
  id: string;
  name: string;
  type: "stock" | "inflow" | "outflow" | "converter" | "feedback";
  unit: string;
  currentValue: number;
  targetValue: number;
  changeRatePerMonth: number;
  description: string;
}

export interface CausalLoop {
  id: string;
  name: string;
  type: "reinforcing" | "balancing";
  description: string;
  nodesInvolved: string[];
  polaritySequence: string[];
  currentBottleneck: string;
}

export interface LeveragePoint {
  id: string;
  rank: number; // 1-12 based on Donella Meadows
  title: string;
  description: string;
  currentPractice: string;
  regenerativeIntervention: string;
  impactPotential: "low" | "medium" | "high" | "civilizational";
  feasibility: "easy" | "moderate" | "demanding" | "systemic";
}

export type PossibilityHorizon =
  | "current-state"
  | "near-term-feasible"
  | "transformational"
  | "long-shot-frontier"
  | "unknown-horizon";

export interface PossibilityDossier {
  id: string;
  title: string;
  horizon: PossibilityHorizon;
  mechanism: string;
  coreAssumptions: string[];
  enablingTechnologies: string[];
  requiredCapabilities: string[];
  affectedStakeholders: string[];
  potentialBeneficiaries: string[];
  risks: string[];
  secondOrderEffects: string[];
  capitalRequirementEstimate: string;
  implementationDifficulty: "low" | "medium" | "high" | "frontier";
  expectedOutcomes: string[];
  reversibility: "high" | "moderate" | "low" | "irreversible";
  confidenceScore: number;
  evidenceBase: string[];
  experimentRequired: string; // The smallest real-world intervention to prove it
  placeContext: string;
  sevenCapitalsDelta: Record<SevenCapitalType, number>; // -100 to +100
}

export interface StudioPipelineStep {
  stepNumber: number;
  name: string;
  question: string;
  status: "completed" | "in-progress" | "pending";
  outputSummary: string;
  artifacts: string[];
}

export interface StudioProject {
  id: string;
  title: string;
  place: string;
  problemStatement: string;
  firstPrinciplesDeconstruction: {
    purpose: string;
    fundamentalPhysics: string[];
    removedAssumptions: string[];
    reconstructedSystem: string;
  };
  ambitionLadder: {
    baseline: string;
    constraint: string;
    conventionalPath: string;
    betterPath: string;
    breakthrough10xPath: string;
    frontierPath: string;
    civilizationPath: string;
  };
  currentStep: number;
  steps: StudioPipelineStep[];
  hypothesis: string;
  smallestExperiment: {
    name: string;
    durationWeeks: number;
    budgetUSD: number;
    successMetric: string;
    falsificationCondition: string;
  };
  progress: number;
}

export interface AtlasMission {
  id: string;
  codeName?: string;
  title: string;
  location: string;
  objective?: string;
  description?: string;
  domain?: string;
  leadGuild?: string;
  status: "initiating" | "active" | "scaling" | "completed" | "paused" | string;
  healthScore: number; // 0-100
  capitalMobilizedUSD: number;
  capitalTargetUSD: number;
  leadPartners?: string[];
  communityBeneficiaries: number;
  milestones: {
    id: string;
    title: string;
    dueDate?: string;
    targetDate?: string;
    completed?: boolean;
    status?: string;
    responsibleAgent?: string;
    evidenceProof?: string;
  }[];
  dependencies?: string[];
  keyRisks?: {
    description: string;
    mitigation: string;
    severity: "low" | "medium" | "high";
  }[];
  activeRisks?: {
    id?: string;
    title?: string;
    description?: string;
    mitigation: string;
    severity: "low" | "medium" | "high" | string;
  }[];
  decisionLog?: {
    date: string;
    decision: string;
    rationale: string;
    decisionMaker: string;
    moralCheckPassed: boolean;
  }[];
  ethicalDecisionLog?: {
    id?: string;
    date: string;
    decision?: string;
    dilemma?: string;
    resolution?: string;
    decidedBy?: string;
    rationale?: string;
    decisionMaker?: string;
    moralCheckPassed?: boolean;
    verdict?: string;
    approvedBy?: string;
  }[];
  telemetry?: {
    metric: string;
    value: string;
    target: string;
    isPositive: boolean;
  }[];
}

export type SevenCapitalType =
  | "Human"
  | "Social"
  | "Intellectual"
  | "Natural"
  | "Financial"
  | "Physical"
  | "Institutional";

export interface SevenCapitalsAnalysis {
  capital: SevenCapitalType;
  valueCreated: string;
  valuePreserved: string;
  valueDestroyedOrDisplaced: string;
  externalities: string;
  distributionBenefits: string;
  distributionRisks: string;
  netScore: number; // -100 to +100
}

export interface MoralIntelligenceCheck {
  purpose: string;
  humanDignity: { status: "pass" | "caution" | "fail"; notes: string };
  justiceAndDistribution: { status: "pass" | "caution" | "fail"; notes: string };
  ecologicalStewardship: { status: "pass" | "caution" | "fail"; notes: string };
  humanAgency: { status: "pass" | "caution" | "fail"; notes: string };
  accountability: { status: "pass" | "caution" | "fail"; notes: string };
  reversibility: { status: "pass" | "caution" | "fail"; notes: string };
  scale100xDynamics: { status: "pass" | "caution" | "fail"; notes: string };
  overallMoralVerdict: "sanctioned" | "conditional" | "withheld";
}

export interface RegenerativePattern {
  id: string;
  name: string;
  domain?: string;
  category?: string;
  originPlace?: string;
  provenancePlaces?: string[];
  problemSolved?: string;
  problemContext?: string;
  coreMechanism?: string;
  patternSolution?: string;
  reproducibilityScore: number;
  deploymentsCount?: number;
  validatedOutcomeMetrics?: string[];
  measuredOutcomes?: string[];
  keyConditions?: string[];
  failuresEncountered?: string[];
  replicationRecipe?: string;
  provenanceClaims?: {
    claim: string;
    evidence: string;
    source: string;
    confidence: number;
    counterevidence?: string;
  }[];
}

export interface AIAgentProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatarIcon: string;
  currentThought: string;
  recentArtifact: string;
  status: "active" | "reasoning" | "deliberating" | "idle";
}

export interface CivilizationDimension {
  id: string;
  name: string;
  score: number; // 0-100
  trend: "improving" | "stable" | "declining";
  indicators: { name: string; value: string; delta: string }[];
  summary: string;
}

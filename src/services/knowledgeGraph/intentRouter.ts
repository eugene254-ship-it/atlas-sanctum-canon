/**
 * ATLAS SANCTUM — SEARCH INTENT ROUTER & QUERY-TO-PRODUCT LOOP
 * Assigns Intent, Classifies Queries, and Maps Search into Product & Research Loops
 */

import { SearchIntentType, CoreDomainId } from "./types";
import { knowledgeGraph } from "./graphEngine";

export interface IntentResolutionResult {
  rawQuery: string;
  detectedIntent: SearchIntentType;
  primaryDomain: CoreDomainId;
  matchedNodeId?: string;
  matchedNodeLabel?: string;
  canonicalUrl: string;
  directAnswerSnippet: string;
  productLoopTargetSpace: string;
  productLoopActionLabel: string;
  suggestedFollowUpQuestions: string[];
  confidenceScore: number;
}

export class SearchIntentRouter {
  /**
   * Classify user query or search query into 1 of 11 intent archetypes
   */
  public classifyIntent(query: string): SearchIntentType {
    const q = query.toLowerCase().trim();

    if (q.startsWith("what is") || q.startsWith("define") || q.startsWith("meaning of")) {
      return "KNOW";
    }
    if (q.startsWith("how does") || q.startsWith("how do") || q.includes("explain how") || q.includes("work?")) {
      return "UNDERSTAND";
    }
    if (q.includes("vs") || q.includes("versus") || q.includes("difference between") || q.includes("compared to")) {
      return "COMPARE";
    }
    if (q.includes("cause") || q.includes("why does") || q.includes("study") || q.includes("evidence") || q.includes("data")) {
      return "RESEARCH";
    }
    if (q.startsWith("how can") || q.includes("improve") || q.includes("fix") || q.includes("mitigate") || q.includes("solve")) {
      return "SOLVE";
    }
    if (q.startsWith("how to build") || q.startsWith("how do you build") || q.includes("architecture") || q.includes("code") || q.includes("develop")) {
      return "BUILD";
    }
    if (q.includes("which") || q.includes("prioritize") || q.includes("should we") || q.includes("trade-off") || q.includes("select")) {
      return "DECIDE";
    }
    if (q.includes("opportunities in") || q.includes("emerging") || q.includes("trends") || q.includes("frontier") || q.includes("discover")) {
      return "DISCOVER";
    }
    if (q.includes("invest") || q.includes("capital") || q.includes("finance") || q.includes("funding") || q.includes("roi") || q.includes("blended")) {
      return "INVEST";
    }
    if (q.includes("deploy") || q.includes("implement") || q.includes("rollout") || q.includes("governance framework") || q.includes("responsibly")) {
      return "IMPLEMENT";
    }
    if (q.includes("atlas") || q.includes("sanctum") || q.includes("login") || q.includes("home") || q.includes("platform")) {
      return "NAVIGATE";
    }

    // Default heuristics
    return "UNDERSTAND";
  }

  /**
   * Classify domain from query keywords
   */
  public detectDomain(query: string): CoreDomainId {
    const q = query.toLowerCase();

    if (q.includes("kenya") || q.includes("africa") || q.includes("nairobi") || q.includes("nakuru") || q.includes("sub-saharan")) {
      return "africa";
    }
    if (q.includes("agent") || q.includes("swarm") || q.includes("llm") || q.includes("neural") || q.includes("ai")) {
      return "ai-intelligence";
    }
    if (q.includes("system") || q.includes("causal") || q.includes("feedback") || q.includes("leverage point") || q.includes("cybernetic")) {
      return "systems-thinking";
    }
    if (q.includes("capital") || q.includes("invest") || q.includes("finance") || q.includes("blended") || q.includes("bond")) {
      return "capital";
    }
    if (q.includes("flourish") || q.includes("agency") || q.includes("seven capitals") || q.includes("dignity") || q.includes("moral")) {
      return "human-flourishing";
    }
    if (q.includes("opportunity") || q.includes("bottleneck") || q.includes("leverage") || q.includes("asymmetric")) {
      return "opportunity-intelligence";
    }
    if (q.includes("innovation") || q.includes("experiment") || q.includes("falsification") || q.includes("discovery")) {
      return "innovation";
    }
    return "regenerative-intelligence";
  }

  /**
   * Full Intent & Knowledge Resolution
   */
  public resolveQuery(query: string): IntentResolutionResult {
    const intent = this.classifyIntent(query);
    const domain = this.detectDomain(query);
    const candidateNodes = knowledgeGraph.searchKnowledgeGraph(query);
    const bestNode = candidateNodes.length > 0 ? candidateNodes[0] : knowledgeGraph.getAllNodes()[0];

    // Determine product loop target based on intent & node
    let targetSpace = bestNode.productLoopTargetSpace || "question-engine";
    let actionLabel = bestNode.productLoopActionLabel || "Explore Knowledge in Atlas Engine";

    if (intent === "INVEST") {
      targetSpace = "capital-intelligence";
      actionLabel = "Model Capital Allocation & Blended Finance";
    } else if (intent === "BUILD" || intent === "SOLVE") {
      targetSpace = "systems-modeling";
      actionLabel = "Simulate Causal Interventions & Feedback Loops";
    } else if (intent === "RESEARCH" || intent === "KNOW") {
      targetSpace = "question-engine";
      actionLabel = "Run Deep Epistemic Socratic Audit";
    } else if (intent === "DISCOVER" && domain === "africa") {
      targetSpace = "observatory";
      actionLabel = "Inspect Live African Telemetry & Signals";
    }

    const followUps = [
      `What second-order feedback loops emerge when scaling ${bestNode.label}?`,
      `How does ${bestNode.label} impact the Seven Capitals balance sheet?`,
      `What are the empirical case study outcomes for ${bestNode.label}?`,
    ];

    return {
      rawQuery: query,
      detectedIntent: intent,
      primaryDomain: domain,
      matchedNodeId: bestNode.id,
      matchedNodeLabel: bestNode.label,
      canonicalUrl: bestNode.canonicalUrl,
      directAnswerSnippet: bestNode.directAnswerSummary,
      productLoopTargetSpace: targetSpace,
      productLoopActionLabel: actionLabel,
      suggestedFollowUpQuestions: followUps,
      confidenceScore: candidateNodes.length > 0 ? 0.94 : 0.72,
    };
  }
}

export const intentRouter = new SearchIntentRouter();

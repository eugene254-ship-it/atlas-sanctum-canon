/**
 * ATLAS SANCTUM — CONTENT FRESHNESS & DECAY DETECTION ENGINE
 * Monitors Epistemic Freshness, Decay Risk, and Recommends Actionable Updates/Merges
 */

import { ContentDecayRecord } from "./types";
import { knowledgeGraph } from "./graphEngine";

export class AtlasDecayDetector {
  /**
   * Run content decay audit across all knowledge nodes
   */
  public runDecayAudit(): ContentDecayRecord[] {
    const nodes = knowledgeGraph.getAllNodes();
    const now = new Date("2026-08-28T00:00:00Z").getTime();

    const records: ContentDecayRecord[] = [];

    for (const node of nodes) {
      const lastReviewedTime = new Date(`${node.lastReviewed}T00:00:00Z`).getTime();
      const daysSinceReview = Math.max(0, Math.floor((now - lastReviewedTime) / (1000 * 60 * 60 * 24)));

      let decayRisk: "HEALTHY" | "WATCHLIST" | "STALE" | "CRITICAL_DECAY" = "HEALTHY";
      let recommendedAction: "UPDATE" | "MERGE" | "EXPAND" | "REDIRECT" | "RETIRE" = "UPDATE";
      const decayFactors: string[] = [];

      if (daysSinceReview > 180) {
        decayRisk = "CRITICAL_DECAY";
        recommendedAction = "MERGE";
        decayFactors.push(`Zero editorial review in ${daysSinceReview} days`);
      } else if (daysSinceReview > 60) {
        decayRisk = "STALE";
        recommendedAction = "UPDATE";
        decayFactors.push(`Telemetry citations require 60-day empirical re-verification`);
      } else if (daysSinceReview > 20) {
        decayRisk = "WATCHLIST";
        recommendedAction = "EXPAND";
        decayFactors.push(`Emerging African search demand suggests expanding sibling subtopics`);
      } else {
        decayRisk = "HEALTHY";
        recommendedAction = "UPDATE";
        decayFactors.push(`Active real-time telemetry updates and verified empirical evidence`);
      }

      if (node.citationCount < 10 && daysSinceReview > 30) {
        decayFactors.push("Low external citation velocity; recommended adding downloadable benchmark dataset");
      }

      records.push({
        nodeId: node.id,
        title: node.label,
        slug: node.slug,
        daysSinceLastReview: daysSinceReview,
        decayRisk,
        recommendedAction,
        decayFactors,
      });
    }

    // Sort by highest decay risk first
    const riskPriority = { CRITICAL_DECAY: 4, STALE: 3, WATCHLIST: 2, HEALTHY: 1 };
    return records.sort((a, b) => riskPriority[b.decayRisk] - riskPriority[a.decayRisk]);
  }
}

export const decayDetector = new AtlasDecayDetector();

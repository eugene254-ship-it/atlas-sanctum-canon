/**
 * ATLAS SANCTUM — SCHEMA.ORG JSON-LD GENERATOR
 * Generates verified, rich structured data for Articles, TechArticles, Datasets, Organizations, and FAQs.
 */

import { KnowledgeNode, IndexBenchmarkDataset, PillarDefinition } from "./types";

export class AtlasSchemaGenerator {
  private readonly baseUrl = "https://atlassanctum.org";
  private readonly orgName = "Atlas Sanctum";
  private readonly orgLogo = "https://atlassanctum.org/logo.png";

  /**
   * Generates Root Organization Schema.org JSON-LD
   */
  public generateOrganizationSchema(): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: this.orgName,
      url: this.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: this.orgLogo,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://twitter.com/AtlasSanctum",
        "https://www.linkedin.com/company/atlas-sanctum",
        "https://github.com/atlas-sanctum",
      ],
      description:
        "Atlas Sanctum is a decentralized research and intelligence operating system for regenerative systems, AI governance, and human flourishing.",
      foundingLocation: {
        "@type": "Place",
        name: "Nairobi, Kenya",
      },
      knowsAbout: [
        "Regenerative Intelligence",
        "Systems Thinking",
        "AI Agents",
        "African Innovation",
        "Civilization Design",
        "Opportunity Intelligence",
        "Seven Capitals Accounting",
      ],
    };
  }

  /**
   * Generates WebSite with SearchAction Schema
   */
  public generateWebSiteSchema(): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: this.orgName,
      url: this.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  /**
   * Generates Article or TechArticle Schema for a Knowledge Node
   */
  public generateArticleSchema(node: KnowledgeNode): Record<string, any> {
    const isTech = node.schemaType === "TechArticle";
    return {
      "@context": "https://schema.org",
      "@type": isTech ? "TechArticle" : "Article",
      headline: node.label,
      description: node.summary,
      url: node.canonicalUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": node.canonicalUrl,
      },
      author: {
        "@type": "Organization",
        name: "Atlas Sanctum Research Consortium",
        url: this.baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: this.orgName,
        logo: {
          "@type": "ImageObject",
          url: this.orgLogo,
        },
      },
      datePublished: `${node.lastVerified}T00:00:00Z`,
      dateModified: `${node.lastReviewed}T00:00:00Z`,
      keywords: node.tags.join(", "),
      inLanguage: "en-US",
      about: {
        "@type": "Thing",
        name: node.label,
        description: node.description,
      },
    };
  }

  /**
   * Generates Schema.org Dataset Markup
   */
  public generateDatasetSchema(dataset: IndexBenchmarkDataset): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: dataset.name,
      description: dataset.methodologyOverview,
      url: `${this.baseUrl}/datasets/${dataset.slug}`,
      identifier: dataset.doiOrHandle,
      version: dataset.version,
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: {
        "@type": "Organization",
        name: "Atlas Sanctum Research Lab",
        url: this.baseUrl,
      },
      keywords: [dataset.domain, "Benchmarking", "Telemetry", "Open Data", "Africa", "Resilience"],
      temporalCoverage: "2024/2030",
      spatialCoverage: dataset.coverage,
      variableMeasured: dataset.primaryMetrics.map((m) => m.name),
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "text/csv",
          contentUrl: `${this.baseUrl}/api/datasets/${dataset.slug}.csv`,
        },
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${this.baseUrl}/api/datasets/${dataset.slug}.json`,
        },
      ],
    };
  }

  /**
   * Generates FAQPage Schema for Pillars
   */
  public generateFaqPageSchema(pillar: PillarDefinition): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pillar.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  /**
   * Generates BreadcrumbList Schema
   */
  public generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${this.baseUrl}${item.url}`,
      })),
    };
  }
}

export const schemaGenerator = new AtlasSchemaGenerator();

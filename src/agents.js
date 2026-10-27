export const AGENTS = Object.freeze({
  creative: { description: "Draft product image concepts" },
  video: { description: "Draft social video storyboards" },
  brand: { description: "Review VELA name, palette and tone" },
  quality: { description: "Flag unverified claims, licensing and image issues" },
  publishing: { description: "Prepare human-review publishing checklists only" }
});
export const CONFIG = Object.freeze({
  enabled: false,
  provider: "open-higgsfield-ai",
  providerEnabled: false,
  allowNetwork: false,
  allowPaidCalls: false,
  allowPublishing: false,
  allowShopifyWrites: false
});
export function prepareDraft(agent, input) {
  if (!(agent in AGENTS)) throw new Error("Unknown agent");
  if (typeof input !== "string" || input.length > 5000) throw new Error("Invalid input");
  return { agent, status: "draft_only", input, description: AGENTS[agent].description,
    requiresHumanApproval: true, generatedMedia: false };
}
export async function callProvider() {
  throw new Error("Provider disabled: no network or paid calls permitted");
}
export async function publish() {
  throw new Error("Publishing disabled");
}

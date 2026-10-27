import test from "node:test";
import assert from "node:assert/strict";
import { AGENTS, CONFIG, prepareDraft, callProvider, publish } from "../src/agents.js";
test("five agents present", () => assert.equal(Object.keys(AGENTS).length, 5));
test("all external operations disabled", () => {
  for (const [key, value] of Object.entries(CONFIG)) if (key === "enabled" || key.startsWith("allow") || key === "providerEnabled") assert.equal(value, false);
});
test("draft is local and requires review", () => {
  const draft = prepareDraft("creative", "VELA neutral studio scene");
  assert.equal(draft.status, "draft_only");
  assert.equal(draft.requiresHumanApproval, true);
});
test("provider and publishing blocked", async () => {
  await assert.rejects(callProvider(), /disabled/);
  await assert.rejects(publish(), /disabled/);
});

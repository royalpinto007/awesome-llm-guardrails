#!/usr/bin/env node
// Single source of truth (data/tools.json) -> README catalog.
// Refreshes star counts when GITHUB_TOKEN is set (used by the weekly Action).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const tools = JSON.parse(readFileSync(join(ROOT, "data/tools.json"), "utf8"));
const starsPath = join(ROOT, "data/stars.json");
let stars = existsSync(starsPath) ? JSON.parse(readFileSync(starsPath, "utf8")) : { _updated: null };

const token = process.env.GITHUB_TOKEN;
if (token) {
  for (const t of tools) {
    if (!t.repo) continue;
    try {
      const r = await fetch(`https://api.github.com/repos/${t.repo}`, {
        headers: { Authorization: `Bearer ${token}`, "User-Agent": "awesome-llm-guardrails" },
      });
      if (r.ok) { const j = await r.json(); stars[t.repo] = j.stargazers_count; }
    } catch { /* keep cached */ }
  }
  stars._updated = new Date().toISOString().slice(0, 10);
  writeFileSync(starsPath, JSON.stringify(stars, null, 2) + "\n");
  console.log(`refreshed stars for ${tools.filter(t => t.repo).length} repos @ ${stars._updated}`);
}

const starOf = (t) => (t.repo && stars[t.repo] != null ? stars[t.repo] : null);
const kfmt = (n) => (n == null ? "" : n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : "" + n);
const star = (t) => { const s = starOf(t); return s == null ? "" : ` \`★ ${kfmt(s)}\``; };
const CATS = {
  framework: "Guardrail Frameworks",
  injection: "Prompt-Injection & Jailbreak Defense",
  structured: "Structured & Constrained Output",
  privacy: "PII & Privacy",
  content: "Toxicity & Content Safety",
  redteam: "Red-Teaming & Vulnerability Scanning",
  supply: "Model & Supply-Chain Security",
};

let lists = "";
for (const [cat, title] of Object.entries(CATS)) {
  const items = tools.filter((t) => t.category === cat).sort((a, b) => (starOf(b) || 0) - (starOf(a) || 0));
  if (!items.length) continue;
  lists += `\n### ${title}\n\n`;
  for (const t of items) lists += `- [${t.name}](${t.url})${star(t)} — ${t.desc}\n`;
}

const updated = stars._updated ? ` Star counts updated **${stars._updated}**.` : "";
const generated = `**${tools.length} open-source guardrail tools**, auto-refreshed weekly.${updated}\n${lists}`;

const readmePath = join(ROOT, "README.md");
let readme = readFileSync(readmePath, "utf8");
readme = readme.replace(/<!-- LIST:START -->[\s\S]*<!-- LIST:END -->/, `<!-- LIST:START -->\n${generated}\n<!-- LIST:END -->`);
writeFileSync(readmePath, readme);
console.log(`generated README for ${tools.length} tools`);

# Awesome LLM Guardrails [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

> A curated, **auto-updating** list of open-source **guardrails** for LLM applications — the tools that stop your model from leaking data, getting jailbroken, emitting toxic or malformed output, or being manipulated by a prompt injection.

An LLM will confidently do the wrong thing: follow an instruction hidden in a document, paste a customer's PII into a summary, return JSON your parser chokes on, or comply with "ignore your instructions." **Guardrails** are the checks you put *around* the model — on the input, the output, or the generation itself — so a bad case is caught instead of shipped. This list collects the open-source tools that do it.

---

## Start Here: The Four Places a Guardrail Goes

Most guardrail confusion disappears once you know *where* in the pipeline each tool sits.

1. **Input guardrails** — screen what goes *into* the model. Prompt-injection and jailbreak detection, PII stripping before the prompt is assembled, topic/allow-list checks. Stops the attack before it lands.
2. **Output guardrails** — screen what comes *out*. Toxicity/content filters, PII redaction, hallucination/groundedness checks, "did it refuse when it should have." Stops the bad response before the user sees it.
3. **Generation-time guardrails** — constrain *how* the model generates. Grammar/JSON-schema/regex-constrained decoding so invalid output is impossible by construction (not filtered after the fact).
4. **Offline red-teaming** — attack your own system *before* production. Vulnerability scanners and adversarial test suites that find the jailbreak first, so you can add a rail for it.

**The rule:** input + output rails are runtime defenses (they cost latency, and an attacker only needs one gap); generation-time constraints are guarantees (invalid states can't occur); red-teaming is how you discover which rails you actually need. Most serious systems use all four.

---

<!-- LIST:START -->
**18 open-source guardrail tools**, auto-refreshed weekly. Star counts updated **2026-07-29**.

### Guardrail Frameworks

- [Guardrails AI](https://github.com/guardrails-ai/guardrails) `★ 7.2k` — Add input/output validators and structured guarantees to LLMs, with a hub of reusable validators.
- [NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) `★ 6.8k` — Programmable rails for LLM conversational systems, defined in a dedicated modeling language (by NVIDIA).
- [LLM Guard](https://github.com/protectai/llm-guard) `★ 3.2k` — A security toolkit for LLM interactions: scanners for PII, toxicity, prompt injection, and more, on both input and output.
- [LangKit](https://github.com/whylabs/langkit) `★ 994` — An open-source toolkit for monitoring LLMs — extract safety and quality signals from prompts and responses (by WhyLabs).

### Prompt-Injection & Jailbreak Defense

- [Llama Guard / PurpleLlama](https://github.com/meta-llama/PurpleLlama) `★ 4.3k` — Meta's suite for LLM safety: Llama Guard (input/output classification), Prompt Guard (injection detection), and CyberSecEval benchmarks.
- [Rebuff](https://github.com/protectai/rebuff) `★ 1.5k` — A self-hardening prompt-injection detector that layers heuristics, an LLM check, a vector DB of known attacks, and canary tokens.
- [Vigil](https://github.com/deadbits/vigil-llm) `★ 492` — Detect prompt injections, jailbreaks, and other risky inputs before they reach your model.
- [Injection Arena](https://github.com/royalpinto007/injection-arena) `★ 0` — A self-hostable capture-the-flag game for learning prompt-injection defenses against a stack of guardrails.

### Structured & Constrained Output

- [Guidance](https://github.com/guidance-ai/guidance) `★ 21.7k` — A guidance language for constraining generation — interleave control flow, regex, and grammars so the model can only produce valid output.
- [Outlines](https://github.com/dottxt-ai/outlines) `★ 15.4k` — Structured generation: force outputs to match a JSON schema, regex, or grammar, guaranteeing shape.
- [Instructor](https://github.com/jxnl/instructor) `★ 13.7k` — Structured outputs for LLMs via Pydantic — validate and retry until the response matches your model.
- [Jsonformer](https://github.com/1rgs/jsonformer) `★ 4.9k` — A bulletproof way to generate structured JSON: only the content tokens are sampled, the structure is fixed.

### PII & Privacy

- [Presidio](https://github.com/microsoft/presidio) `★ 10.3k` — Detect, redact, mask, and anonymize PII in text and images — the standard for privacy guardrails (by Microsoft).

### Toxicity & Content Safety

- [Detoxify](https://github.com/unitaryai/detoxify) `★ 1.3k` — Trained models to score toxicity, threats, and hate in text — a lightweight content-safety filter.

### Red-Teaming & Vulnerability Scanning

- [garak](https://github.com/NVIDIA/garak) `★ 8.6k` — The LLM vulnerability scanner — probe a model for jailbreaks, injections, data leakage, and toxicity before you ship (by NVIDIA).
- [Giskard](https://github.com/Giskard-AI/giskard) `★ 5.7k` — Open-source scanning for LLM agents that surfaces safety and quality vulnerabilities automatically.
- [DeepTeam](https://github.com/confident-ai/deepteam) `★ 2.3k` — A framework to red-team LLMs and AI agents against 40+ vulnerabilities and attack methods.

### Model & Supply-Chain Security

- [ModelScan](https://github.com/protectai/modelscan) `★ 752` — Scan model files for serialization attacks — the supply-chain guardrail for weights you download.

<!-- LIST:END -->

---

## Contributing

Contributions are very welcome. Edit [`data/tools.json`](data/tools.json) and open a PR (the README is generated from it — don't edit the list by hand). Please:

- One object per tool: `name`, `url`, `category`, a one-honest-sentence `desc`, and `repo` (`owner/name`) so stars auto-populate.
- Categories: `framework`, `injection`, `structured`, `privacy`, `content`, `redteam`, `supply`.
- Open-source only, no dead links, no pure marketing. Prefer things you've actually used.

New to open source? Adding one good entry here is a perfectly good first PR.

> Star counts refresh automatically every week via GitHub Actions.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.

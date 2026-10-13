// Helpers for the arXiv-derived publication list (src/data/publications.json).
import all from "../data/publications.json";
import scholar from "../data/scholar.json";
import { overrides } from "../data/overrides";

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  journal: string;
  doi: string;
  cites?: number; // OpenAlex citation count
  review?: boolean; // review article, never shown among the selected publications
}

// A curated reference: an arXiv id, with optional fixes for messy arXiv metadata.
export interface PaperRef {
  id: string;
  title?: string;
  journal?: string;
  doi?: string;
}

export const papers = (all as Paper[]).map((p) => ({ ...p, ...overrides[p.id] }));
const byId = new Map(papers.map((p) => [p.id, p]));

// Selected publications: the n research papers most cited on Google Scholar, in Scholar's order
// (src/data/scholar.json, refreshed by scripts/fetch_scholar.py). Reviews are excluded, and so is
// anything without an arXiv match, such as books.
export function selectedPapers(n = 10): Paper[] {
  return (scholar as { review: boolean; arxiv: string }[])
    .filter((w) => !w.review && byId.has(w.arxiv))
    .slice(0, n)
    .map((w) => byId.get(w.arxiv)!);
}

// "B. Andrei Bernevig" -> "B. A. Bernevig", "Zhi-Da Song" -> "Z.-D. Song"
export function shortName(full: string): string {
  const parts = full.replace(/\s+-\s*/g, "-").replace(/\s+/g, " ").trim().split(" ");
  if (parts.length < 2) return full;
  const last = parts.pop()!;
  if (last === "Bernevig") return "B. A. Bernevig"; // arXiv spells it several ways
  const initials = parts.map((p) =>
    p.split("-").filter(Boolean).map((q) => (q.endsWith(".") ? q : q[0] + ".")).join("-")
  );
  return [...initials, last].join(" ");
}

export function authorLine(authors: string[], max = 12): string {
  const names = authors.map(shortName);
  return names.length > max ? names.slice(0, max - 2).join(", ") + ", et al." : names.join(", ");
}

// Render the simple LaTeX found in arXiv titles ($_2$, $k\cdot p$, \alpha) as HTML.
const SYMBOLS: Record<string, string> = {
  cdot: "·", times: "×", pm: "±", sim: "~", approx: "≈", leq: "≤", geq: "≥", le: "≤", ge: "≥",
  to: "→", rightarrow: "→", infty: "∞", hbar: "ħ", sqrt: "√", partial: "∂", nabla: "∇", circ: "°",
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", varepsilon: "ε", zeta: "ζ", eta: "η",
  theta: "θ", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", rho: "ρ", sigma: "σ",
  tau: "τ", phi: "φ", varphi: "φ", chi: "χ", psi: "ψ", omega: "ω", Gamma: "Γ", Delta: "Δ",
  Theta: "Θ", Lambda: "Λ", Pi: "Π", Sigma: "Σ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
};

export function titleHtml(title: string): string {
  const esc = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const math = (m: string) =>
    m
      .replace(/\\(?:mathrm|text|mathbf|mathcal|rm|bf)\s*\{([^}]*)\}/g, "$1")
      .replace(/\\([A-Za-z]+)\s?/g, (s, name) => SYMBOLS[name] ?? name)
      .replace(/([_^])\{([^}]*)\}/g, (_, op, x) => (op === "_" ? `<sub>${x}</sub>` : `<sup>${x}</sup>`))
      .replace(/([_^])([^\s{<])/g, (_, op, x) => (op === "_" ? `<sub>${x}</sub>` : `<sup>${x}</sup>`))
      .replace(/[{}]/g, "");
  return esc.replace(/\$([^$]+)\$/g, (_, m) => math(m)).replace(/\\(["'`^~])/g, "");
}

// Turn a curated reference into a full entry, falling back to arXiv metadata.
export function resolve(ref: PaperRef): Paper & { url: string } {
  const p = byId.get(ref.id);
  if (!p) throw new Error(`arXiv id ${ref.id} is not in publications.json`);
  const doi = ref.doi ?? p.doi;
  return {
    ...p,
    title: ref.title ?? p.title,
    journal: ref.journal ?? p.journal,
    doi,
    url: doi ? `https://doi.org/${doi}` : `https://arxiv.org/abs/${p.id}`,
  };
}

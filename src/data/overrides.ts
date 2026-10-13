// Fixes for papers whose arXiv metadata differs from the published version (title or journal line).
// Applied to every list on the site. Keyed by arXiv id.

export const overrides: Record<string, { title?: string; journal?: string }> = {
  "cond-mat/0611399": { journal: "Science 314, 1757 (2006)" },
  "0707.3637": { title: "Model fractional quantum Hall states and Jack polynomials" },
  "1410.0682": { journal: "Science 346, 602 (2014)" },
  "1507.01603": { journal: "Nature 527, 495 (2015)" },
  "1603.03093": { journal: "Science 353, aaf5037 (2016)" },
  "1703.02050": { journal: "Nature 547, 298 (2017)" },
  "1611.07987": { journal: "Science 357, 61 (2017)" },
  "1708.03636": { journal: "Science Advances 4, eaat0346 (2018)" },
  "1807.10271": { title: "A complete catalogue of high-quality topological materials", journal: "Nature 566, 480 (2019)" },
  "2003.00012": { journal: "Nature 586, 702 (2020)" },
  "2009.11301": { title: "Twisted bilayer graphene I. Matrix elements, approximations, perturbation theory, and a k·p two-band model" },
  "2106.05287": { journal: "Nature 603, 824 (2022)" },
  "2105.09954": { journal: "Science 376, eabg9094 (2022)" },
  "2111.05865": { title: "Magic-angle twisted bilayer graphene as a topological heavy fermion problem" },
  "2411.08950": { journal: "Science 393, 1317 (2026)" },
  "2312.10659": { journal: "Nature Reviews Materials (2024)" },
};

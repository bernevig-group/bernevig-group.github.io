// Selected publications, oldest first. Each entry is an arXiv id; title/journal overrides
// fix cases where the arXiv metadata differs from the published version.
import type { PaperRef } from "../lib/papers";

export const selected: PaperRef[] = [
  { id: "cond-mat/0504147" },
  { id: "cond-mat/0611399", journal: "Science 314, 1757 (2006)" },
  { id: "0707.3637", title: "Model fractional quantum Hall states and Jack polynomials" },
  { id: "1105.4867" },
  { id: "1410.0682", journal: "Science 346, 602 (2014)" },
  { id: "1501.00060" },
  { id: "1507.01603", journal: "Nature 527, 495 (2015)" },
  { id: "1603.03093", journal: "Science 353, aaf5037 (2016)" },
  { id: "1703.02050", journal: "Nature 547, 298 (2017)" },
  { id: "1611.07987", journal: "Science 357, 61 (2017)" },
  { id: "1708.03636", journal: "Science Advances 4, eaat0346 (2018)" },
  { id: "1807.10271", title: "A complete catalogue of high-quality topological materials", journal: "Nature 566, 480 (2019)" },
  { id: "2003.00012", journal: "Nature 586, 702 (2020)" },
  { id: "2009.11301", title: "Twisted bilayer graphene I. Matrix elements, approximations, perturbation theory, and a k·p two-band model" },
  { id: "2106.05287", journal: "Nature 603, 824 (2022)" },
  { id: "2105.09954", journal: "Science 376, eabg9094 (2022)" },
  { id: "2111.05865", title: "Magic-angle twisted bilayer graphene as a topological heavy fermion problem" },
  { id: "2211.11776" },
  { id: "2411.08950", journal: "Science 393, 1317 (2026)" },
];

// Research areas shown on the home page and the research page.
// Figures are computed by scripts/make_figures.py. Papers are arXiv ids (see src/lib/papers.ts).
import type { PaperRef } from "../lib/papers";

export interface Area {
  id: string;
  title: string;
  figure: string;
  caption: string;
  text: string[];
  papers: PaperRef[];
  papersNote?: string; // shown instead of the paper list when there are no papers yet
}

export const areas: Area[] = [
  {
    id: "moire",
    title: "Moiré materials",
    figure: "figures/moire.png",
    caption: "Moiré pattern formed by two triangular lattices twisted by 4°.",
    text: [
      "Two sheets of graphene stacked with a small twist form a moiré pattern whose period is many nanometers. Near the magic angle of about 1.1° the electronic bands become nearly flat, and interactions between electrons produce correlated insulators, superconductivity and magnetism.",
      "We derived the single-particle and interacting Hamiltonians of twisted bilayer and trilayer graphene and showed that magic-angle graphene maps onto a topological heavy-fermion problem. We also study fractional Chern insulators in twisted transition-metal dichalcogenides and in rhombohedral graphene, and we built a database of two-dimensional materials that can be twisted into new moiré systems.",
    ],
    papers: [
      { id: "2009.11301", title: "Twisted bilayer graphene I. Matrix elements, approximations, perturbation theory, and a k·p two-band model" },
      { id: "2102.06201" },
      { id: "2111.05865", title: "Magic-angle twisted bilayer graphene as a topological heavy fermion problem" },
      { id: "2411.09741", journal: "Science 393, eadu1550 (2026)" },
    ],
  },
  {
    id: "flat-bands",
    title: "Flat bands and kagome materials",
    figure: "figures/kagome.png",
    caption:
      "The kagome lattice and its nearest-neighbor bands. Destructive interference between hopping paths gives an exactly flat band (orange).",
    text: [
      "In a flat band the kinetic energy of the electrons is quenched, so interactions decide the ground state. Lattices such as the kagome lattice host flat bands because hopping paths interfere destructively.",
      "We compiled a catalogue of flat-band materials among known crystals and study which correlated and topological phases these bands support.",
    ],
    papers: [
      { id: "2106.05287", journal: "Nature 603, 824 (2022)" },
      { id: "2008.08231" },
    ],
  },
  {
    id: "geometry",
    title: "Quantum geometry and superconductivity",
    figure: "figures/berry_curvature.png",
    caption:
      "Berry curvature of a Chern band in the Haldane model. It is concentrated near the corners of the Brillouin zone (black hexagon).",
    text: [
      "Bloch wavefunctions carry a geometry, measured by the Berry curvature and the quantum metric. This geometry controls responses that the band energies alone do not determine.",
      "We showed that band topology sets a lower bound on the superfluid weight of a flat-band superconductor, with twisted bilayer graphene as the main example. We also study pairing and electron-phonon coupling in flat-band systems.",
    ],
    papers: [
      { id: "1906.02213" },
      { id: "2008.02288" },
      { id: "2110.14663" },
    ],
  },
  {
    id: "many-body",
    title: "Many-body physics and quantum scars",
    figure: "figures/scars.png",
    caption:
      "Overlap of the eigenstates of the PXP chain (L = 16) with the Néel state. Orange points mark the towers of scarred states.",
    text: [
      "Generic interacting quantum systems thermalize, and their highly excited eigenstates look random. We found exact excited states with low entanglement in the AKLT spin chain. States of this kind are now called quantum many-body scars. They do not thermalize and produce long-lived oscillations.",
      "The group also works on the fractional quantum Hall effect, where we related model wavefunctions to Jack polynomials, and on fractional Chern insulators in lattice models.",
    ],
    papers: [
      { id: "1708.05021" },
      { id: "0707.3637", title: "Model fractional quantum Hall states and Jack polynomials" },
      { id: "1105.4867" },
    ],
  },
  {
    id: "topology",
    title: "Topological phases of matter",
    figure: "figures/edge_states.png",
    caption:
      "Bands of a Kane–Mele ribbon. Edge states (orange and blue, on opposite edges) cross the bulk gap.",
    text: [
      "A topological insulator has an insulating interior and conducting states on its surface that cannot be removed without closing the bulk gap. The group predicted the quantum spin Hall effect in HgTe quantum wells, which was observed in experiment the following year. Later work introduced type-II Weyl semimetals, unconventional fermions in crystals and higher-order topological insulators.",
      "Topological quantum chemistry connects the band topology of a crystal to the orbitals of its atoms and the symmetry of its lattice. With collaborators in Donostia and Bilbao we applied the theory to tens of thousands of known compounds. The results are public in the group's materials databases.",
    ],
    papers: [
      { id: "cond-mat/0611399", journal: "Science 314, 1757 (2006)" },
      { id: "1703.02050", journal: "Nature 547, 298 (2017)" },
      { id: "1807.10271", title: "A complete catalogue of high-quality topological materials", journal: "Nature 566, 480 (2019)" },
      { id: "2105.09954", journal: "Science 376, eabg9094 (2022)" },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine learning for materials",
    figure: "figures/crystal_graph.png",
    caption: "A layered crystal drawn as a graph of atoms and bonds, the input format for graph neural networks.",
    text: [
      "We train machine-learning models on first-principles calculations and experimental databases to predict properties of crystals. Some models predict electronic and phonon densities of states and the electron-phonon coupling, and together they estimate a superconducting transition temperature from the crystal structure alone. Others classify magnetic order and predict Curie and Néel temperatures, recognize compounds that form with chemical disorder, or estimate melting points to guide synthesis. We also build generative models that propose new crystal structures. The goal is to narrow the search for new quantum materials before costly calculations or synthesis.",
    ],
    papers: [],
    papersNote: "Publications coming soon.",
  },
];

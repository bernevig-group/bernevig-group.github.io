// Talks and lecture series on YouTube. `v` is the video id (youtu.be/<id>).
// Titles and venues come from the video pages; years are the year of the event when stated.

export interface Talk {
  title: string;
  venue?: string;
  year?: string;
  v: string;
}

export interface Series {
  title: string;
  venue: string;
  year?: string;
  parts: { label: string; v: string }[];
}

export const talks: { heading: string; items: Talk[] }[] = [
  {
    heading: "Recent talks",
    items: [
      { title: "Rhombohedral graphene and the Berry trashcan", venue: "KITP, Santa Barbara", year: "2026", v: "yPtiZE87eiI" },
      { title: "Progress report on superconductivity", venue: "Simons Collaboration on New Frontiers in Superconductivity", year: "2025", v: "IPPA7ZmiUVY" },
      { title: "Exact solutions in superconductivity", venue: "Isaac Newton Institute, Cambridge", year: "2025", v: "zZ8QY-YzLV4" },
      { title: "The rise of moiré systems", venue: "IPhT Colloquium, Saclay", year: "2025", v: "gM6JgQQL3Xw" },
      { title: "DMFT and Hubbard-I approximations on the heavy fermion model for twisted bilayer systems", venue: "Condensed Matter Physics in the City", year: "2025", v: "xPNaO0GBtNM" },
      { title: "Talk at Allan Fest and Quantum Flatlands, a conference honoring Allan MacDonald", venue: "UT Austin", year: "2025", v: "KXyRg4obCQ8" },
      { title: "Fractional Chern insulators and heavy fermions in twisted moiré samples", venue: "SPICE workshop Hybrid Correlated States, Mainz", year: "2024", v: "LPaHxYhgaPo" },
      { title: "Superconducting mechanism and order parameter in TBG from the heavy fermion model", venue: "KITP, Santa Barbara", year: "2024", v: "UxVqWi9VW3Y" },
      { title: "The topological heavy fermion principle for interacting flat bands in TBG and beyond", venue: "KITP, Santa Barbara", year: "2023", v: "neW0ICZivqU" },
      { title: "Heavy fermion paradigm of topological flat band systems", venue: "Quasi-1D Topological Quantum Materials workshop", year: "2023", v: "lXKjz5e-LAo" },
    ],
  },
  {
    heading: "Earlier talks",
    items: [
      { title: "An exact map between TBG (and multilayers) and topological heavy fermions", venue: "IBS Center for Theoretical Physics of Complex Systems", year: "2022", v: "jY1VpAyfzZ0" },
      { title: "An exact map between TBG (and multilayers) and topological heavy fermions", venue: "Condensed Matter Theory Center", year: "2022", v: "EFlF2H7prus" },
      { title: "Mapping TBG into a topological heavy fermion", venue: "Condensed Matter Physics in the City", year: "2022", v: "duW52tOTMtg" },
      { title: "Strong coupling exact solutions of flat band models", venue: "Condensed Matter Physics in the City", year: "2022", v: "GCXmj0vAgvE" },
      { title: "Exact eigenstates in non-integrable systems: a violation of the ETH", venue: "IHES, Bures-sur-Yvette", year: "2021", v: "GmyU5HBLHTg" },
      { title: "Moiré samples: the twisted bilayer graphene scenario", venue: "SPICE-SPIN+X Seminar", year: "2021", v: "JnJhw8Kbbl4" },
      { title: "Exact eigenstates in non-integrable systems: a violation of ETH", venue: "Quantum Matter Seminars", year: "2020", v: "mExQwmkF3Ro" },
      { title: "Single-particle and many-body phase diagram of twisted bilayer graphene", venue: "ICFO–MIT Frontiers of Light", year: "2020", v: "_QfwvCKUxYY" },
      { title: "Talk at the Aspen Winter Conference", venue: "Quantum Matter: Computation Meets Experiments", year: "2020", v: "JocS6aE_Bq4" },
      { title: "Topological insulators from beginning to today", venue: "Shoucheng Zhang Memorial Workshop, Stanford", year: "2019", v: "4VlC-n1Xe94" },
      { title: "Topological quantum chemistry", venue: "Center for Integrated Quantum Materials", year: "2019", v: "UtZrWcH44Mc" },
      { title: "Topological quantum chemistry", venue: "Stanford Applied Physics/Physics Colloquium", year: "2018", v: "rCjyFCMhu_E" },
      { title: "Topological quantum chemistry", venue: "ICAS–UNSAM, Argentina", year: "2017", v: "5X87qM_KjTU" },
      { title: "Topological quantum chemistry", venue: "SPICE workshop Spin Dynamics in Dirac Systems, Mainz", year: "2017", v: "xA7Joez2z40" },
      { title: "Different fermions in condensed matter", venue: "SPICE Young Research Leaders, Mainz", year: "2016", v: "PA30FVGi9LE" },
      { title: "Talk at Nordita", venue: "Nordita, Stockholm", year: "2009", v: "HyOnIjwVRqM" },
    ],
  },
  {
    heading: "Interviews and prizes",
    items: [
      { title: "“Nobody expected it to exist”: on developments in condensed matter physics", venue: "Breakthrough Prize", year: "2017", v: "U0KlMu3kbB8" },
      { title: "Toquin TEC, chapter 6, with Lili Arrachea", venue: "TEC, Argentine television", year: "2018", v: "q3RvGgMwlpw" },
      { title: "Topological states of matter", venue: "Sackler Prize lecture, Tel Aviv University", year: "2014", v: "zHwqubFQrFY" },
    ],
  },
];

export const series: Series[] = [
  {
    title: "Fractional Chern insulators in rhombohedral graphene; the Berry trashcan model",
    venue: "Theory Winter School, National MagLab",
    year: "2026",
    parts: [
      { label: "Fractional Chern insulators in rhombohedral graphene", v: "ka9Z9NbbYiQ" },
      { label: "Berry trashcan model, repulsive and attractive interactions", v: "GlqxNMw9hbs" },
    ],
  },
  {
    title: "Lectures at the Topological Matter School",
    venue: "Topological Matter School, Donostia",
    parts: [{ label: "Lecture 1", v: "nIzsRQkVt7g" }, { label: "Lecture 2", v: "vRk6pIyuxJU" }],
  },
  {
    title: "Pentalayer graphene",
    venue: "Topological Matter School, Donostia",
    parts: [{ label: "Part I", v: "yGznHRGw3A8" }, { label: "Part II", v: "tC1yXwVY1jY" }],
  },
  {
    title: "Moiré fractional Chern insulators; topological heavy fermions",
    venue: "Princeton Summer School on Condensed Matter Physics",
    year: "2024",
    parts: [
      { label: "Moiré fractional Chern insulators", v: "qnrOZELW-Jw" },
      { label: "Mapping of interacting flat bands with concentrated Berry curvature to a topological heavy fermion problem", v: "QJQ3km0-c4g" },
    ],
  },
  {
    title: "Quantum geometry in flat bands and dispersive systems",
    venue: "Topological Matter School, Donostia",
    year: "2023",
    parts: [{ label: "Part I", v: "lqLkIc3UMBk" }, { label: "Part II", v: "k4SzwMhW_3E" }],
  },
  {
    title: "Flat band construction and topology; projected interacting Hamiltonians",
    venue: "Princeton Summer School on Condensed Matter Physics",
    year: "2022",
    parts: [
      { label: "Flat band construction and topology", v: "FMLH7vaLPnA" },
      { label: "Projected interacting Hamiltonians and collective modes", v: "8m_jN2QenYM" },
    ],
  },
  {
    title: "Topological flat bands",
    venue: "Topological Matter School, Donostia",
    parts: [{ label: "Lecture", v: "lSCgiQCNIJM" }],
  },
  {
    title: "Flat band principles in moiré and stoichiometric compounds",
    venue: "Topological Matter School, Donostia",
    year: "2021",
    parts: [{ label: "Part 1", v: "v6sVQu-Pn2A" }, { label: "Part 2", v: "uGcsP8gxYB8" }, { label: "Part 3", v: "KvamEViR5Qg" }],
  },
  { title: "Topological quantum chemistry", venue: "Theory Winter School, National MagLab", year: "2019", parts: [{ label: "Topological quantum chemistry: theory", v: "F09buSYXdiQ" }, { label: "Topological quantum chemistry: materials", v: "aC-EAHAy3xM" }] },
  {
    title: "Elementary band representations, topology and twisted bilayer graphene",
    venue: "Topological Matter School, Donostia",
    year: "2018",
    parts: [
      { label: "Elementary band representations in 1D", v: "7-QmDFFM4ZY" },
      { label: "Elementary representations and topology in 2D", v: "tCt1G2h2_ag" },
      { label: "Elementary band representations and twisted bilayer graphene (III)", v: "dyxBPcnrpxs" },
    ],
  },
  {
    title: "Topological quantum chemistry",
    venue: "Topological Matter School, Donostia",
    year: "2017",
    parts: [{ label: "Part I", v: "sOVNZt9IthU" }, { label: "Part II", v: "FKLUFl7NkuQ" }, { label: "Part III", v: "9iHL62_Lq9g" }],
  },
  {
    title: "Weyl semimetals and topological superconductors",
    venue: "Topological Matter School, Donostia",
    year: "2016",
    parts: [
      { label: "Weyl semimetals I", v: "j0zgWHLL1z4" },
      { label: "Weyl semimetals II", v: "Snx5-3jqvF0" },
      { label: "Weyl semimetals III", v: "NTgO6TLKHFM" },
      { label: "Weyl semimetals IV", v: "9ICj3UawM3Y" },
      { label: "Topological superconductors I", v: "-DnxKdcUQXM" },
      { label: "Topological superconductors II", v: "-KkUbUsRy3Y" },
    ],
  },
  {
    title: "Topological superconductors, category theory and anyon condensation",
    venue: "Prospects in Theoretical Physics, Institute for Advanced Study",
    year: "2015",
    parts: [
      { label: "Topological superconductors, Majoranas and interactions", v: "nywYAwKp2ac" },
      { label: "Category theory and the Kitaev 16-fold way", v: "2853U4Xh4rg" },
      { label: "Anyon condensation", v: "4_IBK2rcjBI" },
    ],
  },
  {
    title: "Majorana fermions",
    venue: "Summer School on Emergent Phenomena in Quantum Materials, Cornell",
    year: "2015",
    parts: [{ label: "Part 1", v: "zK7h0R5ayi0" }, { label: "Part 2", v: "SCK6gOI-U6Q" }],
  },
];

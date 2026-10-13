// People page. To add someone, copy a line and edit it. Every field except `name` is optional and
// only shows up once filled in. A complete entry looks like:
//
//   { name: "Jane Doe", affiliation: "Princeton and DIPC", tagline: "Moiré materials, superconductivity",
//     photo: "people/jane-doe.jpg", scholar: "https://scholar.google.com/citations?user=...",
//     linkedin: "https://www.linkedin.com/in/...", website: "https://..." },
//
// Photos go in public/people/ (square crop works best); without one the card shows initials.

export interface Member {
  name: string;
  affiliation?: string; // "Princeton", "DIPC" or "Princeton and DIPC"
  tagline?: string; // research interests, one short line
  photo?: string;
  scholar?: string; // Google Scholar profile
  linkedin?: string;
  website?: string; // personal website
  role?: string; // used for collaborators (their institution)
  note?: string;
}

export const pi = {
  name: "B. Andrei Bernevig",
  title: "Professor of Physics, Princeton University. Ikerbasque Professor, Donostia International Physics Center.",
  photo: "", // e.g. "people/bernevig.jpg"
  bio: [
    "B. Andrei Bernevig is a professor of physics at Princeton University and holds an Ikerbasque professorship at the Donostia International Physics Center in San Sebastián, Spain. He received his PhD from Stanford University and was a postdoctoral fellow at the Princeton Center for Theoretical Physics.",
    "His awards include the Sackler Prize (2014), the New Horizons in Physics Prize (2016), a Guggenheim Fellowship (2017), the James C. McGroddy Prize for New Materials (2019) and the EPS Europhysics Prize (2023).",
  ],
};

// Current members, grouped by the heading they appear under (alphabetical by surname).
// Photos to be collected from each member.
export const members: Record<string, Member[]> = {
  "Postdoctoral researchers": [
    { name: "Eli Gerber" },
    { name: "Yi Jiang", affiliation: "Princeton and DIPC", tagline: "Flat-band materials, electron-phonon superconductivity, quantum geometry",
      website: "https://phy.princeton.edu/people/yi-jiang" },
    { name: "Heqiu Li", affiliation: "DIPC", tagline: "Fractional Chern insulators, moiré materials, exact diagonalization",
      website: "https://dipc.ehu.eus/en/dipc/people/post-doctoral-researchers/heqiu-li" },
    { name: "Ming-Rui Li", affiliation: "Princeton", tagline: "Moiré flat bands, unconventional superconductivity" },
    { name: "Shuo Liu", affiliation: "Princeton", tagline: "Quantum many-body dynamics, quantum circuits, Hubbard models",
      website: "https://phy.princeton.edu/people/shuo-liu" },
    { name: "Juan Felipe Mendez", affiliation: "Princeton", tagline: "Correlated moiré materials, fractional Chern insulators, quantum geometry",
      scholar: "https://scholar.google.com/citations?user=u138FgQAAAAJ",
      linkedin: "https://www.linkedin.com/in/juan-felipe-m%C3%A9ndez-valderrama-299817134/",
      website: "https://pccm.princeton.edu/people/juan-felipe-mendez-valderrama" },
    { name: "Hanqi Pi", affiliation: "DIPC", tagline: "Moiré materials, first-principles calculations, topological flat bands",
      scholar: "https://scholar.google.com/citations?user=Udl5W14AAAAJ",
      website: "https://dipc.ehu.eus/en/dipc/people/post-doctoral-researchers/hanqi-pi" },
    { name: "Yuelin Shao", affiliation: "DIPC", tagline: "Excitonic insulators, moiré graphene, nonlinear transport",
      scholar: "https://scholar.google.com/citations?user=ZKORHmcAAAAJ",
      website: "https://dipc.ehu.eus/en/dipc/people/post-doctoral-researchers/yuelin-shao" },
    { name: "Hao Shi", affiliation: "DIPC" },
    { name: "Yijie Wang", tagline: "Twisted bilayer graphene, heavy fermions, Kondo physics, superconductivity" },
    { name: "Ruihan Zhang" },
  ],
  "Graduate students": [
    { name: "Zenan Dai", affiliation: "Princeton", tagline: "Quantum geometry, phonons, quantum Monte Carlo methods" },
    { name: "Abhishek Karna", affiliation: "Princeton", website: "https://karna-abhishek.github.io" },
    { name: "Levi Rauchwerger", affiliation: "Princeton", tagline: "Graph neural networks, machine learning theory",
      scholar: "https://scholar.google.com/citations?user=yxCJK3sAAAAJ",
      linkedin: "https://www.linkedin.com/in/levi-rauchwerger/" },
  ],
  "Undergraduate researchers": [
    { name: "Awwab A. Azam", affiliation: "University of Florida", tagline: "Quantum geometry, ideal bands, machine learning methods" },
  ],
};

export const collaborators: Member[] = [
  { name: "Handong Chen", role: "Princeton University" },
  { name: "Nicolas Regnault", role: "École Normale Supérieure, Paris", note: "Long-term collaborator on numerical methods for many-body systems." },
];

export interface Alum {
  name: string;
  role: string;
  years: string;
  later: string;
}

export const alumni: Alum[] = [
  // Listed as current members on the old site (circa 2021). Later positions checked online 2026-10-13
  // (MIT Pappalardo page, Hertford College Oxford profile, PKU profile, Imperial, OpenAlex).
  { name: "Jonah Herzog-Arbeitman", role: "Graduate student", years: "2021–2026", later: "MIT (Pappalardo Fellow)" },
  { name: "Dumitru Călugăru", role: "Graduate student", years: "2019–2024", later: "University of Oxford (Leverhulme–Peierls Fellow)" },
  { name: "Aaron Chew", role: "Postdoc", years: "", later: "" },
  { name: "Yuanfeng Xu", role: "Postdoc", years: "", later: "Zhejiang University" },
  { name: "Fang Xie", role: "Graduate student", years: "", later: "Rice University" },
  { name: "Frank Schindler", role: "PCTS fellow", years: "", later: "Imperial College London (faculty)" },
  { name: "Zhida Song", role: "Postdoc", years: "2018–2021", later: "Peking University (faculty)" },
  { name: "Benjamin Wieder", role: "Postdoc", years: "2017–2020", later: "MIT" },
  { name: "Sanjay Moudgalya", role: "Graduate student", years: "2017–2020", later: "Caltech" },
  { name: "Biao Lian", role: "PCTS fellow", years: "2017–2020", later: "Princeton University (faculty)" },
  { name: "Huan He", role: "Graduate student", years: "2016–2020", later: "Finance" },
  { name: "Yunqin Zheng", role: "Graduate student", years: "2016–2020", later: "University of Tokyo" },
  { name: "Jennifer Cano", role: "PCTS fellow", years: "2015–2018", later: "Stony Brook University (faculty)" },
  { name: "Barry Bradlyn", role: "PCTS fellow", years: "2015–2018", later: "University of Illinois Urbana-Champaign (faculty)" },
  { name: "Zhijun Wang", role: "Postdoc", years: "2015–2017", later: "Institute of Physics, Beijing (faculty)" },
  { name: "Jian Li", role: "Postdoc", years: "2013–2015", later: "Westlake University (faculty)" },
  { name: "Aris Alexandradinata", role: "Graduate student", years: "2010–2015", later: "Yale University" },
  { name: "Chen Fang", role: "Postdoc", years: "2012–2014", later: "Institute of Physics, Beijing (faculty)" },
  { name: "Yangle Wu", role: "Graduate student", years: "", later: "Finance" },
  { name: "Benoit Estienne", role: "Postdoc", years: "2011–2012", later: "Sorbonne Université, Paris (faculty)" },
  { name: "Maria Hermanns", role: "Postdoc", years: "2010–2012", later: "Stockholm University (faculty)" },
  { name: "Ronny Thomale", role: "Postdoc", years: "2009–2011", later: "University of Würzburg (faculty)" },
];

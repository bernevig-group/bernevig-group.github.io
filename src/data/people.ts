// People page. To add someone, copy a line and edit it. Only `name`, `group` and `role` are required;
// every other field shows up once filled in. A complete entry looks like:
//
//   { name: "Jane Doe", group: "Princeton", role: "Postdoc", since: "2024-09",
//     tagline: "Moiré materials, superconductivity", photo: "people/jane-doe.jpg",
//     scholar: "https://scholar.google.com/citations?user=...", linkedin: "https://www.linkedin.com/in/...",
//     website: "https://..." },
//
// The page lists members in three sections (Princeton, DIPC, other institutions), each sorted by the
// date they joined (`since`, "YYYY-MM"); people without a date follow, alphabetically.
// Photos go in public/people/ (square crop works best); without one the card shows initials.

export type Group = "Princeton" | "DIPC" | "Other";

export interface Member {
  name: string;
  group: Group;
  role: "Postdoc" | "Graduate student" | "Undergraduate researcher" | "Visiting researcher";
  since?: string; // month joined, "YYYY-MM"
  affiliation?: string; // shown when it adds to the section, e.g. "Princeton and DIPC" or another university
  tagline?: string; // research interests, one short line
  photo?: string;
  scholar?: string; // Google Scholar profile
  linkedin?: string;
  website?: string; // personal website
}

export const sections: { group: Group; heading: string }[] = [
  { group: "Princeton", heading: "Princeton University" },
  { group: "DIPC", heading: "Donostia International Physics Center" },
  { group: "Other", heading: "Other institutions" },
];

export const pi = {
  name: "B. Andrei Bernevig",
  title: "Professor of Physics, Princeton University. Ikerbasque Professor, Donostia International Physics Center.",
  photo: "people/bernevig.jpg", // from DIPC's 2023 Europhysics Prize news item
  bio: [
    "B. Andrei Bernevig is a professor of physics at Princeton University and holds an Ikerbasque professorship at the Donostia International Physics Center in San Sebastián, Spain. He received his PhD from Stanford University and was a postdoctoral fellow at the Princeton Center for Theoretical Physics.",
    "His awards include the Sackler Prize (2014), the New Horizons in Physics Prize (2016), a Guggenheim Fellowship (2017), the James C. McGroddy Prize for New Materials (2019) and the EPS Europhysics Prize (2023).",
  ],
};

// Current members. Locations and start dates for people marked "Other" without an affiliation are
// still to be confirmed through the member form.
export const members: Member[] = [
  // Princeton
  { name: "Ming-Rui Li", group: "Princeton", role: "Postdoc", since: "2026-09", // form
    scholar: "https://scholar.google.com/citations?user=gnHfGTQAAAAJ" },
  { name: "Shuo Liu", group: "Princeton", role: "Postdoc", since: "2025-09", // form
    tagline: "Quantum dynamics, quantum information and computation, strongly correlated systems, AI for physics" },
  { name: "Yi-Jie Wang", group: "Princeton", role: "Postdoc", since: "2026-09", // form
    scholar: "https://scholar.google.com/citations?user=nHTAtJkAAAAJ" },
  { name: "Juan Felipe Mendez", group: "Princeton", role: "Postdoc",
    tagline: "Correlated moiré materials, fractional Chern insulators, quantum geometry",
    scholar: "https://scholar.google.com/citations?user=u138FgQAAAAJ",
    linkedin: "https://www.linkedin.com/in/juan-felipe-m%C3%A9ndez-valderrama-299817134/",
    website: "https://pccm.princeton.edu/people/juan-felipe-mendez-valderrama" },
  { name: "Zenan Dai", group: "Princeton", role: "Graduate student", since: "2025-09" }, // form
  { name: "Abhishek Karna", group: "Princeton", role: "Graduate student", photo: "people/abhishek-karna.jpg",
    scholar: "https://scholar.google.com/citations?user=fF3vhcEAAAAJ",
    linkedin: "https://www.linkedin.com/in/abhishekkarna/", website: "https://karna-abhishek.github.io" },
  { name: "Levi Rauchwerger", group: "Princeton", role: "Graduate student", tagline: "Graph neural networks, machine learning theory",
    scholar: "https://scholar.google.com/citations?user=yxCJK3sAAAAJ",
    linkedin: "https://www.linkedin.com/in/levi-rauchwerger/" },

  // DIPC
  { name: "Yi Jiang", group: "DIPC", role: "Postdoc", since: "2023-07", // form
    tagline: "Flat-band materials, superconductivity, and machine learning",
    scholar: "https://scholar.google.com/citations?user=IwnEyZ8AAAAJ" },
  { name: "Heqiu Li", group: "DIPC", role: "Postdoc", since: "2024-09" }, // form
  { name: "Hanqi Pi", group: "DIPC", role: "Postdoc", since: "2024-07", // form
    tagline: "Moiré materials, machine learning, first-principles calculations",
    scholar: "https://scholar.google.com/citations?user=Udl5W14AAAAJ" },
  { name: "Yuelin Shao", group: "DIPC", role: "Postdoc", since: "2025-09" }, // form

  // Other institutions, or location not yet confirmed
  { name: "Awwab A. Azam", group: "Other", role: "Undergraduate researcher", affiliation: "University of Florida", since: "2026-04", // form
    scholar: "https://scholar.google.com/citations?user=Ryyb8UYAAAAJ",
    linkedin: "https://www.linkedin.com/in/awwab-ali-azam", website: "https://kaddu341.github.io/" },
  { name: "Eli Gerber", group: "Other", role: "Postdoc", affiliation: "Aalto University", since: "2026-10", // form
    scholar: "https://scholar.google.com/citations?user=cKqjWtEAAAAJ" },
  { name: "Hao Shi", group: "Other", role: "Postdoc", affiliation: "LMU Munich", since: "2026-01" }, // form
  { name: "Ruihan Zhang", group: "Other", role: "Postdoc" },
];

// Sort key: join date first (undated last), then surname.
const surname = (name: string) => name.trim().split(/\s+/).pop()!.toLowerCase();
export function membersOf(group: Group): Member[] {
  return members
    .filter((m) => m.group === group)
    .sort((a, b) => (a.since ?? "9999").localeCompare(b.since ?? "9999") || surname(a.name).localeCompare(surname(b.name)));
}

export interface Collaborator {
  name: string;
  institution?: string;
  note?: string;
}

export const collaborators: Collaborator[] = [
  { name: "Handong Chen", institution: "Princeton University", note: "Collaborator on machine learning for materials science." },
  { name: "Oskar Vafek", institution: "Florida State University and National High Magnetic Field Laboratory", note: "Long-term collaborator on twisted bilayer graphene and moiré materials." },
  { name: "Nicolas Regnault", institution: "École Normale Supérieure, Paris", note: "Long-term collaborator on numerical methods for many-body systems." },
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

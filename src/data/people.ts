// People page. To add someone, copy a line and edit it. Photos go in public/people/
// (e.g. photo: "people/jane-doe.jpg"); entries without a photo show the name only.

export interface Member {
  name: string;
  role: string;
  note?: string;
  url?: string;
  photo?: string;
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

// Current members, grouped by the heading they appear under.
export const members: Record<string, Member[]> = {
  "Postdoctoral researchers": [],
  "Graduate students": [],
  "Undergraduate researchers": [],
};

export const collaborators: Member[] = [
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
  { name: "Jonah Herzog-Arbeitman", role: "Graduate student", years: "–2026", later: "MIT (Pappalardo Fellow)" },
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

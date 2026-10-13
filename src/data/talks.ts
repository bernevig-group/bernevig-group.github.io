// Talks and lecture series on YouTube. `v` is the video id (youtu.be/<id>).

export interface Talk {
  title: string;
  year?: string;
  v: string;
}

export interface Series {
  title: string;
  venue: string;
  year: string;
  parts: { label: string; v: string }[];
}

export const talks: { heading: string; items: Talk[] }[] = [
  {
    heading: "Research talks",
    items: [
      { title: "Twisted moiré materials", year: "2020", v: "JnJhw8Kbbl4" },
      { title: "Twisted moiré materials", year: "2020", v: "_QfwvCKUxYY" },
      { title: "Topological quantum chemistry", year: "2020", v: "JocS6aE_Bq4" },
      { title: "Topological quantum chemistry", year: "2019", v: "UtZrWcH44Mc" },
      { title: "Many-body scars", year: "2020", v: "mExQwmkF3Ro" },
      { title: "Many-body scars", year: "2019", v: "4VlC-n1Xe94" },
      { title: "Fractional quantum Hall effect", year: "2009", v: "HyOnIjwVRqM" },
    ],
  },
  {
    heading: "Interviews and prize lectures",
    items: [
      { title: "Breakthrough Prize interview", v: "U0KlMu3kbB8" },
      { title: "2014 Sackler Prize in the Physical Sciences", year: "2014", v: "zHwqubFQrFY" },
      { title: "Interview on Argentine television, Buenos Aires", v: "q3RvGgMwlpw" },
    ],
  },
];

export const series: Series[] = [
  {
    title: "Topological semimetals and topological insulators, leading up to topological quantum chemistry",
    venue: "Donostia",
    year: "2018",
    parts: [{ label: "Part 1", v: "7-QmDFFM4ZY" }, { label: "Part 3", v: "dyxBPcnrpxs" }],
  },
  {
    title: "Topological semimetals and topological insulators, leading up to topological quantum chemistry",
    venue: "Donostia",
    year: "2017",
    parts: [{ label: "Part 1", v: "sOVNZt9IthU" }, { label: "Part 2", v: "FKLUFl7NkuQ" }, { label: "Part 3", v: "9iHL62_Lq9g" }],
  },
  {
    title: "Topological semimetals and topological insulators, leading up to topological quantum chemistry",
    venue: "Donostia",
    year: "2016",
    parts: [{ label: "Part 1", v: "j0zgWHLL1z4" }, { label: "Part 2", v: "-KkUbUsRy3Y" }, { label: "Part 3", v: "NTgO6TLKHFM" }, { label: "Part 4", v: "9ICj3UawM3Y" }],
  },
  { title: "Topological quantum chemistry", venue: "University of Florida", year: "2019", parts: [{ label: "Lecture", v: "F09buSYXdiQ" }] },
  {
    title: "Topological superconductors, category theory and anyon condensation",
    venue: "Institute for Advanced Study",
    year: "2015",
    parts: [{ label: "Part 1", v: "nywYAwKp2ac" }, { label: "Part 2", v: "2853U4Xh4rg" }, { label: "Part 3", v: "4_IBK2rcjBI" }],
  },
  { title: "Majorana fermions", venue: "Cornell University", year: "2015", parts: [{ label: "Part 1", v: "zK7h0R5ayi0" }, { label: "Part 2", v: "SCK6gOI-U6Q" }] },
];

"""Pull every arXiv paper with Bernevig as an author into src/data/publications.json.

Each paper also gets an OpenAlex citation count ("cites"), used only to pick the
selected papers of each year. The GitHub Action runs this weekly before building,
so the list never goes stale. If arXiv is unreachable the committed JSON is kept.

Usage: python scripts/fetch_publications.py
"""
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "publications.json"
API = "https://export.arxiv.org/api/query?"
NS = {"a": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
PAGE = 200


def text(node, path):
    el = node.find(path, NS)
    return " ".join(el.text.split()) if el is not None and el.text else ""


def fetch_all():
    papers, start = [], 0
    while True:
        query = urllib.parse.urlencode({
            "search_query": "au:Bernevig", "sortBy": "submittedDate",
            "sortOrder": "descending", "start": start, "max_results": PAGE})
        req = urllib.request.Request(API + query, headers={"User-Agent": "bernevig-group-site"})
        with urllib.request.urlopen(req, timeout=60) as r:
            root = ET.fromstring(r.read())
        entries = root.findall("a:entry", NS)
        for e in entries:
            authors = [text(a, "a:name") for a in e.findall("a:author", NS)]
            if not any(a.split()[-1] == "Bernevig" for a in authors):
                continue  # au: matching is fuzzy; keep only true co-authorships
            arxiv_id = text(e, "a:id").rsplit("/abs/", 1)[-1]
            papers.append({
                "id": arxiv_id.split("v")[0] if "v" in arxiv_id else arxiv_id,
                "title": text(e, "a:title"),
                "authors": authors,
                "date": text(e, "a:published")[:10],
                "journal": text(e, "arxiv:journal_ref"),
                "doi": text(e, "arxiv:doi"),
            })
        if len(entries) < PAGE:
            return papers
        start += PAGE
        time.sleep(3)  # arXiv asks for a pause between calls


OPENALEX_AUTHOR = "A5024948946"  # B. Andrei Bernevig


def norm(title):
    return re.sub(r"[^a-z0-9]", "", title.lower())


def citation_counts():
    """Citation counts from OpenAlex, keyed by DOI, arXiv id and normalized title."""
    by_key, cursor = {}, "*"
    while cursor:
        q = urllib.parse.urlencode({"filter": f"author.id:{OPENALEX_AUTHOR}", "per-page": 200, "cursor": cursor,
                                    "select": "doi,title,cited_by_count,locations"})
        req = urllib.request.Request("https://api.openalex.org/works?" + q,
                                     headers={"User-Agent": "bernevig-group-site (mailto:bernevig@princeton.edu)"})
        with urllib.request.urlopen(req, timeout=60) as r:
            page = json.load(r)
        for w in page["results"]:
            n = w.get("cited_by_count") or 0
            keys = [norm(w.get("title") or "")]
            if w.get("doi"):
                keys.append(w["doi"].lower().removeprefix("https://doi.org/"))
            for loc in w.get("locations") or []:
                m = re.search(r"arxiv\.org/abs/([^v\s]+)", (loc.get("landing_page_url") or ""))
                if m:
                    keys.append(m.group(1))
            for k in keys:
                if k:
                    by_key[k] = max(by_key.get(k, 0), n)
        cursor = page["meta"].get("next_cursor")
    return by_key


def add_citations(papers):
    try:
        counts = citation_counts()
    except Exception as exc:
        print(f"OpenAlex fetch failed ({exc}); reusing old citation counts")
        old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else []
        counts = {p["id"]: p.get("cites", 0) for p in old}
    for p in papers:
        p["cites"] = max(counts.get(p["id"], 0), counts.get(p["doi"].lower(), 0) if p["doi"] else 0,
                         counts.get(norm(p["title"]), 0))


def main():
    try:
        papers = fetch_all()
    except Exception as exc:
        print(f"arXiv fetch failed ({exc}); keeping the existing {OUT.name}")
        return 0
    if len(papers) < 50:
        print(f"only {len(papers)} papers returned, which looks wrong; not overwriting")
        return 0
    add_citations(papers)
    print(f"citation counts found for {sum(1 for p in papers if p['cites'])} of {len(papers)} papers")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(papers, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {len(papers)} papers to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

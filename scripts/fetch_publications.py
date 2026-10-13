"""Pull every arXiv paper with Bernevig as an author into src/data/publications.json.

The GitHub Action runs this weekly before building, so the publication list never
goes stale. If arXiv is unreachable the committed JSON is left untouched.

Usage: python scripts/fetch_publications.py
"""
import json
import pathlib
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


def main():
    try:
        papers = fetch_all()
    except Exception as exc:
        print(f"arXiv fetch failed ({exc}); keeping the existing {OUT.name}")
        return 0
    if len(papers) < 50:
        print(f"only {len(papers)} papers returned, which looks wrong; not overwriting")
        return 0
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(papers, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {len(papers)} papers to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

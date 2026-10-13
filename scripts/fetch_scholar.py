"""Save Google Scholar citation counts for B. A. Bernevig's papers to src/data/scholar.json.

The selected publications are ranked with these counts. Google Scholar has no API and blocks
automated traffic from cloud servers, so run this by hand now and then (it is not part of the
weekly GitHub Action) and commit the result.

Usage: python scripts/fetch_scholar.py
"""
import difflib
import html
import json
import pathlib
import re
import sys
import time
import urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from fetch_publications import REVIEW_TITLE, REVIEW_VENUE, norm  # noqa: E402

USER = "tT6u7M8AAAAJ"
DATA = pathlib.Path(__file__).resolve().parent.parent / "src" / "data"
OUT = DATA / "scholar.json"
HDR = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                     "Chrome/128.0 Safari/537.36", "Accept-Language": "en-US,en;q=0.9"}
ROW = re.compile(r'<tr class="gsc_a_tr">(.*?)</tr>', re.S)


def clean(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def parse(page):
    rows = []
    for r in ROW.findall(page):
        title = re.search(r'class="gsc_a_at"[^>]*>(.*?)</a>', r, re.S)
        grays = re.findall(r'<div class="gs_gray">(.*?)</div>', r, re.S)
        cites = re.search(r'class="gsc_a_ac gs_ibl"[^>]*>(\d*)</a>', r)
        year = re.search(r'class="gsc_a_h gsc_a_hc gs_ibl">(\d*)<', r)
        if title:
            rows.append({"title": clean(title.group(1)),
                         "venue": clean(grays[1]) if len(grays) > 1 else "",
                         "cites": int(cites.group(1)) if cites and cites.group(1) else 0,
                         "year": int(year.group(1)) if year and year.group(1) else 0})
    return rows


def main():
    works = []
    for start in range(0, 1000, 100):
        url = f"https://scholar.google.com/citations?user={USER}&hl=en&cstart={start}&pagesize=100"
        with urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=60) as r:
            page = r.read().decode("utf-8", "replace")
        rows = parse(page)
        if not rows:
            if "gsc_a_tr" not in page and start == 0:
                print("Google Scholar returned no table (probably a CAPTCHA); nothing written")
                return 1
            break
        works += rows
        time.sleep(4)
    link_to_arxiv(works)
    OUT.write_text(json.dumps(works, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {len(works)} Scholar entries to {OUT}")
    return 0


def link_to_arxiv(works):
    """Attach the matching arXiv id (exact or near-exact title) and a review flag to each Scholar entry."""
    papers = json.loads((DATA / "publications.json").read_text(encoding="utf-8"))
    overrides = dict(re.findall(r'"([^"]+)": \{ title: "([^"]+)"', (DATA / "overrides.ts").read_text(encoding="utf-8")))
    titles = {}
    for p in papers:
        titles[norm(p["title"])] = p
        if p["id"] in overrides:
            titles[norm(overrides[p["id"]])] = p
    keys = list(titles)
    for w in works:
        k = norm(w["title"])
        p = titles.get(k)
        if not p:
            close = difflib.get_close_matches(k, keys, n=1, cutoff=0.9)
            p = titles[close[0]] if close else None
        w["arxiv"] = p["id"] if p else ""
        w["review"] = bool(REVIEW_VENUE.search(w["venue"]) or REVIEW_TITLE.search(w["title"])
                           or (p and p.get("review")))
    recent = [w for w in works if w["year"] >= time.localtime().tm_year - 5 and not w["review"]][:15]
    for w in recent:
        if not w["arxiv"]:
            print(f"  no arXiv match (skipped on the site): {w['cites']} {w['title'][:70]}")


if __name__ == "__main__":
    sys.exit(main())

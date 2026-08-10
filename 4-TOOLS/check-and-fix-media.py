#!/usr/bin/env python
"""
Great Bay Sno-Rollers -- media checker / fixer
=============================================

Run this ANY TIME you move, rename, or add photos. It will:

  1. Report every image link in the site that points at a file that no longer exists.
  2. Re-point those links automatically if it can find the file somewhere else
     under 3-MEDIA/1-Photos (matched by filename).
  3. Create any missing thumbnails, and delete orphaned ones.
  4. Warn about loose files sitting directly in 1-Photos/ instead of a folder.

Usage, from the website folder:

    python 4-TOOLS/check-and-fix-media.py          # report only, changes nothing
    python 4-TOOLS/check-and-fix-media.py --fix    # actually fix things

Folder rules it assumes:
    3-MEDIA/1-Photos/Logos/     logos, favicons, QR codes, brand assets
    3-MEDIA/1-Photos/Hero/      homepage hero rotation photos
    3-MEDIA/1-Photos/Gallery/   photo gallery
    3-MEDIA/1-Photos/Merch/     club clothing
    3-MEDIA/1-Photos/Groomers/  equipment
    3-MEDIA/1-Photos/<YYYY_MonDD-Event>/   dated post photos
    ...and every one of those has a thumbs/ subfolder, made automatically.
"""
import collections
import glob
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
PHOTOS = os.path.join("3-MEDIA", "1-Photos")

THUMB_EDGE = 700
THUMB_QUALITY = 78

# When a filename exists in more than one folder, prefer these.
PREFERRED = [
    (re.compile(r"(LOGO|favicon|apple-touch|Venmo|palette)", re.I), "/Logos/"),
    (re.compile(r"^Dec7_Pic"), "/2025_Dec7-Bridge Repair/"),
    (re.compile(r"^Dec6_Pic"), "/Groomers/"),
    (re.compile(r"Billy_Vandervalk"), "/Merch/"),
]

REF_PATTERNS = [
    r'(?:src|href|data-src|data-full)="(3-MEDIA/[^"]+)"',
    r"url\('(3-MEDIA/[^']+)'\)",
    r'content="https://greatbaysnorollers\.com/(3-MEDIA/[^"]+)"',
]


def index_disk():
    found = collections.defaultdict(list)
    for root, _dirs, files in os.walk(PHOTOS):
        for f in files:
            found[f].append(os.path.join(root, f).replace(os.sep, "/"))
    return found


def resolve(ref, disk):
    base = os.path.basename(ref)
    want_thumb = "/thumbs/" in ref
    cands = [c for c in disk.get(base, []) if ("/thumbs/" in c) == want_thumb]
    if not cands:
        return None
    for rx, folder in PREFERRED:
        if rx.search(base):
            for c in cands:
                if folder in c:
                    return c
    for c in cands:
        if "/Gallery/" in c:
            return c
    return cands[0]


def sync_thumbs(fix):
    try:
        from PIL import Image, ImageOps
    except ImportError:
        print("  (Pillow not installed - skipping thumbnail sync)")
        return 0, 0
    created = removed = 0
    for root, _dirs, files in os.walk(PHOTOS):
        if os.path.basename(root) == "thumbs":
            continue
        imgs = [f for f in files if f.lower().endswith((".jpg", ".jpeg", ".png"))]
        if not imgs:
            continue
        tdir = os.path.join(root, "thumbs")
        for f in imgs:
            dst = os.path.join(tdir, f)
            if os.path.exists(dst):
                continue
            created += 1
            print(f"  MISSING THUMB  {os.path.join(root, f)}")
            if fix:
                os.makedirs(tdir, exist_ok=True)
                im = ImageOps.exif_transpose(Image.open(os.path.join(root, f)))
                if f.lower().endswith(".png"):
                    im.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.LANCZOS)
                    im.save(dst, optimize=True)
                else:
                    im = im.convert("RGB")
                    im.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.LANCZOS)
                    im.save(dst, "JPEG", quality=THUMB_QUALITY, optimize=True, progressive=True)
        if os.path.isdir(tdir):
            for t in os.listdir(tdir):
                if t not in imgs:
                    removed += 1
                    print(f"  ORPHAN THUMB   {os.path.join(tdir, t)}")
                    if fix:
                        os.remove(os.path.join(tdir, t))
    return created, removed


def main():
    fix = "--fix" in sys.argv
    os.chdir(SITE)
    print(f"Great Bay Sno-Rollers media check  ({'FIX' if fix else 'REPORT ONLY'})")
    print(f"site: {SITE}\n")

    loose = [f for f in os.listdir(PHOTOS) if os.path.isfile(os.path.join(PHOTOS, f))]
    if loose:
        print("LOOSE FILES in 1-Photos/ (move these into a folder):")
        for f in loose:
            print(f"  {f}")
        print()

    print("Thumbnails:")
    created, removed = sync_thumbs(fix)
    if not created and not removed:
        print("  all in sync")
    print()

    disk = index_disk()
    print("Broken image links:")
    broken = unresolved = repaired = 0
    for page in sorted(glob.glob("*.html")):
        s = open(page, encoding="utf-8").read()
        orig = s
        refs = set()
        for pat in REF_PATTERNS:
            refs.update(re.findall(pat, s))
        for ref in sorted(refs):
            if os.path.exists(ref.replace("/", os.sep)):
                continue
            broken += 1
            new = resolve(ref, disk)
            if new:
                print(f"  {page}: {ref}\n      -> {new}")
                s = s.replace(ref, new)
                repaired += 1
            else:
                print(f"  {page}: {ref}\n      -> NO MATCH FOUND, fix this one by hand")
                unresolved += 1
        if fix and s != orig:
            open(page, "w", encoding="utf-8", newline="").write(s)

    if not broken:
        print("  none - every image link resolves")
    print()
    print(f"Summary: {broken} broken link(s), {repaired} fixable, {unresolved} need manual attention.")
    if broken and not fix:
        print("Re-run with --fix to apply the repairs above.")
    return 1 if unresolved else 0


if __name__ == "__main__":
    sys.exit(main())

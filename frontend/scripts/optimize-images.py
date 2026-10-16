"""Create WebP copies of heavy PNG/JPG images referenced in src/ and point the code at them.

Originals are kept. Run from the frontend folder:  python scripts/optimize-images.py
"""
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SOURCES = [p for ext in ("*.js", "*.jsx", "*.css") for p in (ROOT / "src").rglob(ext)]

MIN_BYTES = 120 * 1024
SKIP = re.compile(r"(favicon|apple-touch-icon|og-image|^/logo)", re.I)
REF = re.compile(r"""(?<=['"(])(/[^'"()\n]+?\.(?:png|jpe?g|webp))(?=[?'")])""", re.I)


def max_width(rel: str) -> int:
    if "logo" in rel.lower():
        return 480
    if "/pages/" in rel or "hero" in rel or "slide" in rel:
        return 1600
    if "/hm-" in rel:
        return 800
    return 1200


def original_of(rel: str) -> Path | None:
    path = PUBLIC / rel.lstrip("/")
    if path.suffix.lower() != ".webp":
        return path if path.exists() else None
    for ext in (".png", ".jpg", ".jpeg"):
        if path.with_suffix(ext).exists():
            return path.with_suffix(ext)
    return None


def convert(rel: str) -> str | None:
    src = original_of(rel)
    if src is None or src.stat().st_size < MIN_BYTES or SKIP.search(rel):
        return None
    dst = src.with_suffix(".webp")
    img = Image.open(src)
    img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
    limit = max_width(rel)
    if img.width > limit:
        img = img.resize((limit, round(img.height * limit / img.width)), Image.LANCZOS)
    img.save(dst, "WEBP", quality=78, method=6)
    print(f"{src.stat().st_size // 1024:>6} KB -> {dst.stat().st_size // 1024:>4} KB  {rel}")
    return rel[: rel.rfind(".")] + ".webp"


def main():
    refs = {m for f in SOURCES for m in REF.findall(f.read_text(encoding="utf-8"))}
    mapping = {r: w for r in sorted(refs) if (w := convert(r))}
    for f in SOURCES:
        text = f.read_text(encoding="utf-8")
        new = REF.sub(lambda m: mapping.get(m.group(1), m.group(1)), text)
        if new != text:
            f.write_text(new, encoding="utf-8")
            print(f"updated {f.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

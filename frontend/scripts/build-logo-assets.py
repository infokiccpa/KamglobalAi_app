"""Generate transparent logo + favicon assets from public/images/home page/kam-logo.png.

Run from the frontend folder:  python scripts/build-logo-assets.py
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "home page" / "kam-logo.png"
OUT = ROOT / "public"


def unmix_white(img: Image.Image) -> Image.Image:
    """Convert a logo on a white background to RGBA, keeping anti-aliased edges."""
    rgb = np.asarray(img.convert("RGB")).astype(np.float32) / 255.0
    alpha = 1.0 - rgb.min(axis=2)
    alpha = np.clip((alpha - 0.06) / 0.94, 0.0, 1.0)  # drop paper noise and faint shadow
    safe = np.maximum(alpha, 1e-4)[..., None]
    color = np.clip((rgb - (1.0 - safe)) / safe, 0.0, 1.0)
    out = np.dstack([color, alpha]) * 255.0
    return Image.fromarray(out.round().astype(np.uint8), "RGBA")


def isolate_orange(img: Image.Image, original: Image.Image) -> Image.Image:
    """Keep the orange "K" stroke (opaque, so it reads on light and dark tabs) and drop "am"."""
    arr = np.asarray(img).copy()
    src = np.asarray(original.convert("RGB"))
    r, b = arr[..., 0].astype(int), arr[..., 2].astype(int)
    orange = (r - b > 40) & (arr[..., 3] > 0)
    solid = ndimage.binary_fill_holes(ndimage.binary_closing(orange & (arr[..., 3] > 90), iterations=3))
    soft = ndimage.binary_dilation(solid, iterations=1) & orange
    arr[..., :3] = np.where(solid[..., None], src, arr[..., :3])
    arr[..., 3] = np.where(solid, 255, np.where(soft, arr[..., 3], 0))
    return Image.fromarray(arr, "RGBA")


def trim(img: Image.Image, pad: int = 0) -> Image.Image:
    a = np.asarray(img)[..., 3]
    ys, xs = np.where(a > 24)
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0),
           min(xs.max() + pad + 1, img.width), min(ys.max() + pad + 1, img.height))
    return img.crop(box)


def fit_height(img: Image.Image, h: int) -> Image.Image:
    return img.resize((round(img.width * h / img.height), h), Image.LANCZOS)


def square(img: Image.Image, size: int, inset: float = 0.08, bg=None) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    inner = round(size * (1 - 2 * inset))
    scale = inner / max(img.width, img.height)
    piece = img.resize((max(1, round(img.width * scale)), max(1, round(img.height * scale))), Image.LANCZOS)
    canvas.alpha_composite(piece, ((size - piece.width) // 2, (size - piece.height) // 2))
    return canvas


def main():
    src = Image.open(SRC)
    w, h = src.size
    full = unmix_white(src)

    # Full lockup (Kam + "Global for Digital AI / Media Solutions Pvt. Ltd.")
    lockup = trim(full, pad=6)
    fit_height(lockup, 480).save(OUT / "logo-full.png", optimize=True)

    # Wordmark: the "Kam" swoosh only (upper ~60% of the artwork)
    word = trim(full.crop((0, 0, w, int(h * 0.60))), pad=4)
    fit_height(word, 104).save(OUT / "logo.png", optimize=True)
    fit_height(word, 120).save(OUT / "logo-mark.png", optimize=True)

    # Icon: orange "K" swoosh only (left of the blue "am")
    k_box = (0, 0, int(w * 0.55), int(h * 0.60))
    k_only = isolate_orange(full.crop(k_box), src.crop(k_box))
    k_only = trim(k_only, pad=2)
    square(k_only, 512, inset=0.06).save(OUT / "favicon.png", optimize=True)
    square(k_only, 32, inset=0.02).save(OUT / "favicon-32x32.png", optimize=True)
    square(k_only, 16, inset=0.0).save(OUT / "favicon-16x16.png", optimize=True)
    square(k_only, 256, inset=0.02).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    # iOS ignores transparency, so give the touch icon a solid cream tile
    square(k_only, 180, inset=0.14, bg=(253, 252, 249, 255)).save(OUT / "apple-touch-icon.png", optimize=True)

    # Social share image (1200x630) with the full lockup on cream
    og = Image.new("RGBA", (1200, 630), (253, 252, 249, 255))
    piece = fit_height(lockup, 470)
    og.alpha_composite(piece, ((1200 - piece.width) // 2, (630 - piece.height) // 2))
    og.convert("RGB").save(OUT / "og-image.jpg", quality=90)

    for name in ["logo.png", "logo-mark.png", "logo-full.png", "favicon.png",
                 "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png", "og-image.jpg"]:
        im = Image.open(OUT / name)
        print(f"{name}: {im.size}")


if __name__ == "__main__":
    main()

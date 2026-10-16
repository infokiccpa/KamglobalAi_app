"""Prepare wide real team photos for the About page team cards.

Each photo keeps its full width (nobody cropped out) and is lightly enhanced. The office ceiling is
extended upwards so the photo fills the top of the arch card; the card's navy base (with the KAM
watermark) sits below it. Originals live in public/images/about/real/ and are kept.
Run from the frontend folder:  python scripts/build-team-photos.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "about" / "real"
OUT = ROOT / "public" / "images" / "about"

W, H = 864, 720

# (source file, output file, crop box as fractions: left, top, right, bottom)
PHOTOS = [
    ("it-team.jpg", "team-engineering-real.webp", (0.0, 0.1, 0.9, 1.0)),
    ("ai-media-team.jpg", "team-ai-media-real.webp", (0.0, 0.12, 0.96, 1.0)),
]


def enhance(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Brightness(img).enhance(0.97)
    img = ImageEnhance.Contrast(img).enhance(1.1)
    img = ImageEnhance.Color(img).enhance(1.12)
    return img.filter(ImageFilter.UnsharpMask(radius=1.4, percent=70, threshold=2))


def top_fade(w: int, h: int, fade: int) -> Image.Image:
    mask = Image.new("L", (w, h), 255)
    draw = ImageDraw.Draw(mask)
    for y in range(fade):
        draw.line([(0, y), (w, y)], fill=round(255 * (y / fade) ** 1.2))
    return mask


def build(src: str, out: str, box: tuple[float, float, float, float]) -> None:
    photo = Image.open(SRC / src).convert("RGB")
    w, h = photo.size
    photo = photo.crop((round(w * box[0]), round(h * box[1]), round(w * box[2]), round(h * box[3])))
    photo = enhance(photo)

    fg_h = round(photo.height * W / photo.width)
    fg = photo.resize((W, fg_h), Image.LANCZOS)
    top = H - fg_h

    canvas = Image.new("RGB", (W, H))
    strip = fg.crop((0, 0, W, round(fg_h * 0.12)))
    canvas.paste(strip.resize((W, top + 60), Image.BICUBIC).filter(ImageFilter.GaussianBlur(14)), (0, 0))
    canvas.paste(fg, (0, top), top_fade(W, fg_h, 60))

    canvas.save(OUT / out, "WEBP", quality=88, method=6)
    print(f"{out}: {W}x{H}, photo {W}x{fg_h} at y={top}")


if __name__ == "__main__":
    for args in PHOTOS:
        build(*args)

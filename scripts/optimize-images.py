"""Optional: regenerate responsive assets after replacing the original panel photos.
Run: python -m pip install Pillow && python scripts/optimize-images.py
The normal npm build uses the included assets and does not need Python.
"""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public' / 'media'
SOURCES = {
    'plc-hero': 'plcpanel.png',
    'vfd-hero': 'vfdpanel.png',
    'plc-panels': 'Plc.jpeg',
    'vfd-control-panels': 'Vfd.jpeg',
    'mcc-assemblies': 'Mcc.jpeg',
    'bms-control-panels': 'Bms.jpeg',
    'safety-esd-panel': 'Safety.jpeg',
    'other-control-panels': 'Others.jpeg',
    'logo': 'logo.png',
}

def save_hashed(image, stem, width, format_name, extension):
    height = round(image.height * width / image.width)
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    temporary = MEDIA / f'{stem}-{width}.{extension}'
    if format_name == 'JPEG':
        resized.convert('RGB').save(temporary, format_name, quality=84, optimize=True, progressive=True)
    else:
        resized.save(temporary, format_name, quality=82, method=6)
    digest = hashlib.sha256(temporary.read_bytes()).hexdigest()[:10]
    target = MEDIA / f'{stem}-{width}.{digest}.{extension}'
    temporary.replace(target)
    return {'src': f'/media/{target.name}', 'width': width, 'height': height, 'bytes': target.stat().st_size}

def main():
    MEDIA.mkdir(exist_ok=True)
    manifest = {}
    for stem, filename in SOURCES.items():
        image = ImageOps.exif_transpose(Image.open(ROOT / 'public' / filename))
        widths = [360, 720] if stem == 'logo' else [400, 800, min(1122, image.width)]
        variants = [save_hashed(image, stem, width, 'WEBP', 'webp') for width in sorted(set(widths))]
        fallback = '/logo.png' if stem == 'logo' else save_hashed(image, stem, min(800, image.width), 'JPEG', 'jpg')['src']
        manifest[stem] = {
            'src': variants[-1]['src'], 'fallbackSrc': fallback,
            'srcSet': ', '.join(f"{item['src']} {item['width']}w" for item in variants),
            'width': image.width, 'height': image.height, 'variants': variants,
        }
    (ROOT / 'src' / 'data' / 'images.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print('Updated responsive WebP assets, JPEG fallbacks and src/data/images.json.')

if __name__ == '__main__':
    main()

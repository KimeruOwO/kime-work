import sys
import re

with open('play_btn_and_more_btn_pink.txt', 'r', encoding='utf-8') as f:
    svg_pink = f.read().strip()
with open('play_btn_and_more_btn_white.txt', 'r', encoding='utf-8') as f:
    svg_white = f.read().strip()

# Prepare mobile SVGs (remove width and height)
svg_pink_mobile = re.sub(r'width="707" height="278"\s*', '', svg_pink, count=1)
svg_white_mobile = re.sub(r'width="707" height="277"\s*', '', svg_white, count=1)

# Read home.astro
astro_file = 'src/pages/[...lang]/home.astro'
with open(astro_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Desktop SVG pink
content = re.sub(
    r'<svg width="499" height="277".*?</svg>',
    svg_pink,
    content,
    count=1,
    flags=re.DOTALL
)

# Replace Desktop SVG white
content = re.sub(
    r'<svg width="499" height="277".*?</svg>',
    svg_white,
    content,
    count=1,
    flags=re.DOTALL
)

# Replace Mobile SVG pink
content = re.sub(
    r'<svg viewBox="0 0 499 277".*?</svg>',
    svg_pink_mobile,
    content,
    count=1,
    flags=re.DOTALL
)

# Replace Mobile SVG white
content = re.sub(
    r'<svg viewBox="0 0 499 277".*?</svg>',
    svg_white_mobile,
    content,
    count=1,
    flags=re.DOTALL
)

# Change desktop video area aspect ratio
content = re.sub(r'height:\s*50%;', 'aspect-ratio: 16 / 9;', content, count=1)

# Change mobile thumb box aspect ratio
content = re.sub(
    r'\.fs-pop-thumb-box\s*\{\s*width:\s*76px;\s*height:\s*76px;',
    '.fs-pop-thumb-box {\n      width: 120px;\n      aspect-ratio: 16 / 9;',
    content
)

with open(astro_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done updating home.astro')

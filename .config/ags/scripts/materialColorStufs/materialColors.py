#!/bin/python3
import argparse
import json
from material_color_utilities_python import *
from pathlib import Path
import subprocess

def extract_theme(img_path=None, color_str=None):
    if img_path:
        img = Image.open(img_path)
        img.thumbnail((64, 64), Image.LANCZOS)
        return themeFromImage(img)
    elif color_str:
        return themeFromSourceColor(argbFromHex(color_str))
    else:
        default_img_path = subprocess.check_output("swww query | awk -F 'image: ' '{print $2}'", shell=True).decode("utf-8").strip()
        img = Image.open(Path(default_img_path))
        img.thumbnail((64, 64), Image.LANCZOS)
        return themeFromImage(img)

def create_color_dict(color_scheme):
    color_variables = {key: hexFromArgb(getattr(color_scheme, f'get_{key}')()) for key in [
        'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer',
        'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
        'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
        'error', 'onError', 'errorContainer', 'onErrorContainer',
        'background', 'onBackground', 'surface', 'onSurface',
        'surfaceVariant', 'onSurfaceVariant', 'outline', 'shadow',
        'inverseSurface', 'inverseOnSurface', 'inversePrimary'
    ]}
    return color_variables

def main():
    parser = argparse.ArgumentParser(description='Generate color theme from image or color.')
    parser.add_argument('--path', '-p', help='Path to the image file')
    parser.add_argument('--color', '-c', help='Color in hex format')
    parser.add_argument('-l', action='store_true', help='Light mode')

    args = parser.parse_args()


    new_theme = extract_theme(img_path=args.path, color_str=args.color)
    color_scheme = new_theme['schemes']['light' if args.l else 'dark']
    color_variables = create_color_dict(color_scheme)

    output_dict = {
        'lightmode': args.l,
        'colors': color_variables
    }

    json_output = json.dumps(output_dict, indent=2)
    print(json_output)

if __name__ == "__main__":
    main()

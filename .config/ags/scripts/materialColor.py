#!/bin/python3

import sys
from material_color_utilities_python import *

img = Image.open(sys.argv[1])
basewidth = 64
wpercent = (basewidth/float(img.size[0]))
hsize = int((float(img.size[1])*float(wpercent)))
img = img.resize((basewidth,hsize),Image.Resampling.LANCZOS)

colors = themeFromImage(img)['schemes']['dark']
primary = hexFromArgb(getattr(colors, f'get_primary')())
onPrimary = hexFromArgb(getattr(colors, f'get_onPrimary')())

print(primary, onPrimary)

// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

#define PIXELSIZE 0.002

void main() {
  vec2 pixelatedTexCoord = vec2(floor(v_texcoord.x / PIXELSIZE) * PIXELSIZE, floor(v_texcoord.y / PIXELSIZE) * PIXELSIZE);

  vec4 color = texture2D(tex, pixelatedTexCoord);

  gl_FragColor = color;
}


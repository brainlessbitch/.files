// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

void main() {
  vec4 color = texture2D(tex, v_texcoord);

  color.rgb = 1.0 - color.rgb;

  gl_FragColor = color;
}

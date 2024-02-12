// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

const vec3 chromaKeyColor = vec3(0, 1.0, 0);

void main() {
  vec4 color = texture2D(tex, v_texcoord);

  float threshold = 0.0;

  //if (distance(color.rgb, chromaKeyColor) < threshold) {
  if (color.rgb == chromaKeyColor) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  } else {
    gl_FragColor = color;
  }
}

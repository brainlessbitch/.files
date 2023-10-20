// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

#define STRENGTH 0.1

void main() {
    vec4 color = texture2D(tex, v_texcoord);

    vec2 offset = vec2(0.0, 0.0);
    for (float i = 1.0; i <= 10.0; i += 1.0)
    {
        offset += texture2D(tex, v_texcoord - i * STRENGTH).rgb;
    }

    color.rgb = (color.rgb + offset) / 11.0;

    gl_FragColor = color;
}

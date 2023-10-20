// vim: set ft=glsl:

precision highp float;
varying vec2 v_texcoord;
uniform sampler2D tex;
uniform float time;

float noise(vec2 co) {
    return texture2D(tex, co).r;
}

void main() {
    vec2 uv = v_texcoord;

    float offset = 0.1 * sin(time);

    vec2 distortedUV = uv + vec2(noise(uv * 10.0 + offset), noise(uv * 10.0 - offset)) * 0.02;

    vec3 colorShift = vec3(noise(uv + offset), noise(uv - offset), noise(uv * offset));

    vec4 color = texture2D(tex, distortedUV);

    color.rgb += colorShift * 0.2;

    gl_FragColor = color;
}

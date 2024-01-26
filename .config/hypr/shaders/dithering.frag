// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

const mat4 ditherMatrix = mat4(
    0.0, 8.0, 2.0, 10.0,
    12.0, 4.0, 14.0, 6.0,
    3.0, 11.0, 1.0, 9.0,
    15.0, 7.0, 13.0, 5.0
);

float indexValue() {
    int x = int(mod(gl_FragCoord.x, 4.0));
    int y = int(mod(gl_FragCoord.y, 4.0));
    return ditherMatrix[y][x] / 16.0;
}

float dither(float color) {
    float closestColor = (color < 0.5) ? 0.0 : 1.0;
    float secondClosestColor = 1.0 - closestColor;
    float d = indexValue();
    float distance = abs(closestColor - color);
    return (distance < d) ? closestColor : secondClosestColor;
}

void main() {
    vec4 color = texture2D(tex, v_texcoord);
    gl_FragColor = vec4(vec3(dither(color.r)), 1.0);
}


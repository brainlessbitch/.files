// vim: set ft=glsl:

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;
uniform float thresholdFactor;

void main() {
    float thresholdFactor = 1.0;

    const mat4 bayerMatrix = mat4(
        0.0, 8.0, 2.0, 10.0,
        12.0, 4.0, 14.0, 6.0,
        3.0, 11.0, 1.0, 9.0,
        15.0, 7.0, 13.0, 5.0
    ) / 16.0;

    vec4 pixel = texture2D(tex, v_texcoord);

    float grayscale = 0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b;

    float xCoord = fract(v_texcoord.x * 4.0);
    float yCoord = fract(v_texcoord.y * 4.0);

    float threshold = bayerMatrix[int(yCoord * 4.0)][int(xCoord * 4.0)] * 255.0 * thresholdFactor;

    float dithered = (grayscale > threshold) ? 1.0 : 0.0;

    gl_FragColor = vec4(dithered, dithered, dithered, 1.0);
}

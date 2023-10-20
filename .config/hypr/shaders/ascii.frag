// vim: set ft=glsl:

precision float;
varying vec2 v_texcoord;
uniform sampler2D tex;

void main()
{
    vec4 color = texture2D(tex, v_texcoord);

    char asciiChars[] = " .:-=+*%@#";

    float grayscale = (color.r + color.g + color.b) / 3.0;

    int index = int(grayscale * float(strlen(asciiChars)));
    index = max(0, min(strlen(asciiChars) - 1, index));
    char asciiChar = asciiChars[index];

    gl_FragColor = vec4(vec3(1.0), 1.0) * vec4(asciiChar, 1.0);
}

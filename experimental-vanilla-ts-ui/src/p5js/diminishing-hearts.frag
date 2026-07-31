#version 300 es
precision mediump float;

out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;

vec3 colorA = vec3(1.0, 0.0, 0.0);
vec3 colorB = vec3(0.0, 0.0, 1.0);

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.2, 0.2);
  vec3 b = vec3(0.5, 0.3, 0.3);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.0, 0.1, 0.2);
  return a + b * cos(6.28318 * (c * t + d));
}

float heart(vec2 p) {
  p.y -= 0.25;
  float a = atan(p.x, p.y) / 3.14159;
  float r = length(p);
  float h = abs(a);
  float d = (13.0 * h - 22.0 * h * h + 10.0 * h * h * h) / (6.0 - 5.0 * h);
  return r - d * 0.5;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 2.0; i++) {
    vec3 color = palette(heart(uv) + uTime * 0.4);

    uv = fract(uv * 2.0);
    uv -= 0.5;

    float d = heart(uv) + uTime;

    d = sin(d * 3.14 * 2.0);
    d = abs(d);
    d = 0.2 / d;

    finalColor += color * d;
  }

  fragColor = vec4(finalColor, 1.0);
}

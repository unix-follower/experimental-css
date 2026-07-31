#version 300 es
precision mediump float;

out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;

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

  uv = fract(uv * 2.0);
  uv -= 0.5;

  float d = heart(uv);

  d = sin(d * 3.14 * 4.0);
  d = abs(d);
  d = 0.1 / d;

  fragColor = vec4(d, d, d, 1.0);
}

#version 300 es
precision mediump float;

in vec2 vPos;
out vec4 fragColor;
uniform float uTime;

void main() {
  float pulse = sin(uTime);
  float x = vPos.x + pulse;
  float y = vPos.y + pulse;

  fragColor = vec4(x, y, 1.0, 1.0);
}

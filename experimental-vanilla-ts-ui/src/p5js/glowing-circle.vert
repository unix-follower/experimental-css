#version 300 es

in vec3 aPosition;
out vec2 vPos;

void main() {
  vPos = aPosition.xy;

  vec4 position = vec4(aPosition, 1.0);
  position.xy = position.xy * 2.0 - 1.0;

  gl_Position = position;
}

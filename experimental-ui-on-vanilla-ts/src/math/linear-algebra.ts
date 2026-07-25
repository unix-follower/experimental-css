export interface Vector2 {
  x: number
  y: number
}

export function dotProduct(x1: number, y1: number, x2: number, y2: number) {
  return x1 * x2 + y1 * y2
}

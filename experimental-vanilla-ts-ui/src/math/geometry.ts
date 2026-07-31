export function euclideanDistance(x1: number, y1: number, x2: number, y2: number) {
  const xDistance = x2 - x1
  const yDistance = y2 - y1
  return Math.hypot(xDistance, yDistance)
}

export interface CircleParams {
  x: number
  y: number
  radius: number
  color: string
}

export class Circle {
  x: number
  y: number
  radius: number
  color: string

  constructor({ x, y, radius, color }: CircleParams) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
  }
}

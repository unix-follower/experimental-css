import type { Vector2 } from "@/math/linear-algebra"
import { randomIntFromRange, randomColor } from "./utils"

class Particle {
  mousePosition: Vector2
  x: number
  y: number
  radius: number
  velocity: number
  color: string
  radians: number
  distanceFromCenter: number
  lastMouse: Vector2

  constructor(mousePosition: Vector2, x: number, y: number, radius: number, color: string) {
    this.mousePosition = mousePosition
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.05
    this.distanceFromCenter = randomIntFromRange(50, 120)
    this.lastMouse = { x: x, y: y }
  }

  draw(ctx: CanvasRenderingContext2D, lastPoint: Vector2) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.radius
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    const lastPoint = { x: this.x, y: this.y }
    // Move points over time
    this.radians += this.velocity

    // Drag effect
    this.lastMouse.x += (this.mousePosition.x - this.lastMouse.x) * 0.05
    this.lastMouse.y += (this.mousePosition.y - this.lastMouse.y) * 0.05

    // Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter

    this.draw(ctx, lastPoint)
  }
}

function createParticles(canvas: HTMLCanvasElement, mousePosition: Vector2, colors: string[]) {
  const particles = []

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1
    particles.push(
      new Particle(mousePosition, canvas.width / 2, canvas.height / 2, radius, randomColor(colors)),
    )
  }
  return particles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const mousePosition = {
    x: innerWidth / 2,
    y: innerHeight / 2 - 80,
  }

  addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })

  const colors = ["#00bdff", "#4d39ce", "#088eff"]

  let particles = createParticles(canvas, mousePosition, colors)

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    particles = createParticles(canvas, mousePosition, colors)
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update(ctx)
    })
  }

  animate()
}

main()

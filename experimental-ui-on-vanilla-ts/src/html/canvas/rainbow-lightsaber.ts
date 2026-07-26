import { gsap } from "gsap"
import { type Vector2 } from "@/math/linear-algebra"

class Particle {
  x: number
  y: number
  radius: number
  color: string
  distFromCenter: number

  constructor(x: number, y: number, radius: number, color: string, distFromCenter: number) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.distFromCenter = distFromCenter
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D, center: Vector2, angle: number) {
    this.draw(ctx)
    this.x = center.x + Math.cos(angle) * this.distFromCenter
    this.y = center.y + Math.sin(angle) * this.distFromCenter
  }
}

function createParticles(canvas: HTMLCanvasElement) {
  const particles = []

  const hueIncrement = 360 / 500
  for (let i = 0; i < 500; i++) {
    const x = canvas.width / 2
    const y = canvas.height / 2
    const distFromCenter = i

    particles.push(new Particle(x, y, 5, `hsl(${hueIncrement * i}, 50%, 50%)`, distFromCenter))
  }

  return particles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  const mousePosition = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  }

  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }

  let mouseAngle = 0

  addEventListener("mousemove", (event) => {
    gsap.killTweensOf(mousePosition)
    gsap.to(mousePosition, {
      x: event.clientX - canvas.width / 2,
      y: event.clientY - canvas.height / 2,
      duration: 1.2,
    })

    mouseAngle = Math.atan2(mousePosition.y, mousePosition.x)
  })

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    createParticles(canvas)
  })

  const particles = createParticles(canvas)

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update(ctx, center, mouseAngle)
    })
  }

  animate()
}

main()

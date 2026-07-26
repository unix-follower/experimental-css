import { type Vector2 } from "@/math/linear-algebra"

const gravity = 0.03
const friction = 0.99

class Particle {
  x: number
  y: number
  velocity: Vector2
  radius: number
  color: string
  opacity: number

  constructor(x: number, y: number, radius: number, color: string, velocity: Vector2) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    }
    this.opacity = 1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.velocity.y += gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.opacity -= 0.003
  }
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

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
  })

  addEventListener("click", (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY

    const particleCount = 500
    const power = 12
    const radians = (Math.PI * 2) / particleCount

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(mousePosition.x, mousePosition.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
          x: Math.cos(radians * i) * (Math.random() * power),
          y: Math.sin(radians * i) * (Math.random() * power),
        }),
      )
    }
  })

  const particles: Particle[] = []

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
      if (particle.opacity > 0) {
        particle.update(ctx)
      } else {
        particles.splice(i, 1)
      }
    })
  }

  animate()
}

main()

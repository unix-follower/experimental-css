import { type Vector2 } from "@/math/linear-algebra"

class Particle {
  x: number
  y: number
  radius: number
  color: string
  velocity: Vector2
  ttl: number

  constructor(x: number, y: number, radius: number, color: string, velocity: Vector2) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.ttl = 1000
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl--
  }
}

function generateRing(mousePosition: Vector2, particles: Particle[]) {
  let hueRadians = 0

  function run() {
    setTimeout(run, 200, mousePosition, particles)
    const hue = Math.sin(hueRadians)

    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      // full circle = pi * 2 radians
      const radian = (Math.PI * 2) / particleCount
      const x = mousePosition.x
      const y = mousePosition.y
      particles.push(
        new Particle(x, y, 5, `hsl(${Math.abs(hue * 360)}, 50%, 50%)`, {
          x: Math.cos(radian * i) * 3,
          y: Math.sin(radian * i) * 3,
        }),
      )
    }

    hueRadians += 0.01
  }

  run()
}

function createParticles() {
  return [] as Particle[]
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

  addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })

  let particles = createParticles()
  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    particles = createParticles()
  })

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
      if (particle.ttl < 0) {
        particles.splice(i, 1)
      } else {
        particle.update(ctx)
      }
    })
  }

  animate()
  generateRing(mousePosition, particles)
}

main()

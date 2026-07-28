import { Circle, euclideanDistance } from "@/math/geometry"

class Particle extends Circle {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillText(Math.round(this.x) + ", " + Math.round(this.y), this.x + 15, this.y + 15)
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
  }
}

function init(ctx: CanvasRenderingContext2D) {
  const particles: Particle[] = []
  const radius = 100

  for (let i = 0; i < 8; i++) {
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight

    if (particles.length >= 1) {
      for (const element of particles) {
        if (euclideanDistance(x, y, element.x, element.y) - radius * 2 < 0) {
          x = Math.random() * innerWidth
          y = Math.random() * innerHeight
        }
      }

      ctx.beginPath()
      ctx.moveTo(particles[i - 1].x, particles[i - 1].y)
      ctx.lineTo(x, y)
      ctx.strokeStyle = "black"
      ctx.stroke()
    }

    particles.push(new Particle({ x, y, radius, color: "#2844ee" }))
    setTimeout(() => {
      particles[i].update(ctx)
    }, i * 500)
  }
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init(ctx)
  })

  addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    init(ctx)
  })

  init(ctx)
}

main()

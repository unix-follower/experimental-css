import { euclideanDistance } from "@/math/geometry"
import { dotProduct, type Vector2 } from "@/math/linear-algebra"
import { randomIntFromRange, randomColor } from "./utils"

interface RGB {
  r: number
  g: number
  b: number
}

function rotateVelocities(velocity: Vector2, theta: number): Vector2 {
  const rotatedVelocity = {
    x: velocity.x * Math.cos(theta) - velocity.y * Math.sin(theta),
    y: velocity.x * Math.sin(theta) + velocity.y * Math.cos(theta),
  }
  return rotatedVelocity
}

class Particle {
  mousePosition: Vector2
  x: number
  y: number
  velocity: Vector2
  radius: number
  mass: number
  opacity: number
  r: number
  g: number
  b: number

  constructor(mousePosition: Vector2, x: number, y: number, radius: number, rgb: RGB) {
    this.mousePosition = mousePosition
    this.x = x
    this.y = y
    this.velocity = {
      x: (Math.random() - 0.5) * 3,
      y: (Math.random() - 0.5) * 3,
    }
    this.radius = radius
    this.mass = 1
    this.opacity = 0
    this.r = rgb.r
    this.g = rgb.g
    this.b = rgb.b
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`
    ctx.stroke()
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity}`
    ctx.fill()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D, particles: Particle[]) {
    this.draw(ctx)

    for (const particle of particles) {
      const otherParticle = particle
      if (this.x === otherParticle.x) continue

      if (
        euclideanDistance(this.x, this.y, otherParticle.x, otherParticle.y) - this.radius * 2 <
        0
      ) {
        const relativeVelocity = {
          x: this.velocity.x - otherParticle.velocity.x,
          y: this.velocity.y - otherParticle.velocity.y,
        }

        if (
          dotProduct(
            relativeVelocity.x,
            relativeVelocity.y,
            otherParticle.x - this.x,
            otherParticle.y - this.y,
          ) >= 0
        ) {
          handleParticleCollision(this, otherParticle)
        }
      }
    }

    if (
      euclideanDistance(this.x, this.y, this.mousePosition.x, this.mousePosition.y) -
        this.radius * 2 <
        100 &&
      this.opacity <= 0.2
    ) {
      this.opacity += 0.01
    } else if (this.opacity > 0) {
      this.opacity -= 0.01
    }

    const { canvas } = ctx
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0)
      this.velocity.x = -this.velocity.x

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0)
      this.velocity.y = -this.velocity.y

    this.x += this.velocity.x
    this.y += this.velocity.y

    function handleParticleCollision(particle: Particle, otherParticle: Particle) {
      const { mass } = particle
      const { mass: otherMass } = otherParticle
      const theta = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

      const rotatedVelocity = rotateVelocities(particle.velocity, theta)
      const otherRotatedVelocity = rotateVelocities(otherParticle.velocity, theta)

      const swapVelocity = {
        x:
          (rotatedVelocity.x * (mass - otherMass)) / (mass + otherMass) +
          (otherRotatedVelocity.x * 2 * otherMass) / (mass + otherMass),
        y: rotatedVelocity.y,
      }
      const otherSwapVelocity = {
        x:
          (otherRotatedVelocity.x * (mass - otherMass)) / (mass + otherMass) +
          (rotatedVelocity.x * 2 * otherMass) / (mass + otherMass),
        y: otherRotatedVelocity.y,
      }

      const rotateSwapRotateVector = rotateVelocities(swapVelocity, -theta)
      const otherRotateSwapRotateVector = rotateVelocities(otherSwapVelocity, -theta)

      particle.velocity.x = rotateSwapRotateVector.x
      particle.velocity.y = rotateSwapRotateVector.y
      otherParticle.velocity.x = otherRotateSwapRotateVector.x
      otherParticle.velocity.y = otherRotateSwapRotateVector.y
    }
  }
}

function createParticles(mousePosition: Vector2, colors: RGB[]) {
  const particles: Particle[] = []
  const radius = 15

  for (let i = 0; i < 130; i++) {
    let x = randomIntFromRange(radius, innerWidth - radius)
    let y = randomIntFromRange(radius, innerHeight - radius)

    if (particles.length >= 1) {
      for (let j = 0; j < particles.length; j++) {
        if (euclideanDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, innerWidth - radius)
          y = randomIntFromRange(radius, innerHeight - radius)

          j = -1
        }
      }
    }

    particles.push(new Particle(mousePosition, x, y, radius, randomColor(colors)))
  }

  return particles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const mousePosition = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  }

  const colors = [
    { r: 51, g: 99, b: 252 },
    { r: 77, g: 57, b: 206 },
  ]

  addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })

  let particles = createParticles(mousePosition, colors)

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    particles = createParticles(mousePosition, colors)
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const particle of particles) {
      particle.update(ctx, particles)
    }
  }

  animate()
}

main()

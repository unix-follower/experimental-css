class Particle {
  x: number
  y: number
  radius: number
  color: string

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.shadowColor = this.color
    ctx.shadowBlur = 15
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
  }
}

function createParticles(canvas: HTMLCanvasElement, colors: string[]) {
  const particles = []

  for (let i = 0; i < 1500; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 2000

    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = 2 * Math.random()

    const color = colors[Math.floor(Math.random() * colors.length)]
    particles.push(new Particle(x, y, radius, color))
  }
  return particles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"]

  let mouseDown = false
  addEventListener("mousedown", () => {
    mouseDown = true
  })

  addEventListener("mouseup", () => {
    mouseDown = false
  })

  let particles = createParticles(canvas, colors)
  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    particles = createParticles(canvas, colors)
  })

  let radians = 0
  let alpha = 1

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians)
    particles.forEach((particle) => {
      particle.update(ctx)
    })
    ctx.restore()

    radians += 0.003

    if (mouseDown && alpha >= 0.03) {
      alpha -= 0.01
    } else if (!mouseDown && alpha < 1) {
      alpha += 0.01
    }
  }

  animate()
}

main()

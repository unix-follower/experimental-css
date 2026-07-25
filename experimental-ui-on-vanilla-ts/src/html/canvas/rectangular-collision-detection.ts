interface Vector2 {
  x: number
  y: number
}

interface RectangleParams {
  x: number
  y: number
  width?: number
  height?: number
  color: string
}

class Rectangle {
  x: number
  y: number
  width: number
  height: number
  color: string

  constructor({ x, y, color, width = 100, height = 100 }: RectangleParams) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.lineWidth = 2
    ctx.strokeRect(this.x, this.y, this.width, this.height)
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
  }
}

function createRectangles(center: Vector2) {
  const rectangle1 = new Rectangle({
    x: center.x - 150,
    y: center.y - 50,
    color: "red",
  })

  const rectangle2 = new Rectangle({
    x: center.x + 50,
    y: center.y - 50,
    color: "blue",
  })

  return [rectangle1, rectangle2]
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const mousePosition = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  }

  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }

  addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    createRectangles(center)
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  const rectangles = createRectangles(center)

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const [box1, box2] = rectangles

    if (
      box1.x + box1.width >= box2.x && // box1 right collides with box2 left
      box2.x + box2.width >= box1.x && // box2 right collides with box1 left
      box1.y + box1.height >= box2.y && // box1 bottom collides with box2 top
      box2.y + box2.height >= box1.y // box1 top collides with box2 bottom
    ) {
      console.info("Colliding")
    }
    box1.x = mousePosition.x
    box1.y = mousePosition.y
    for (const box of rectangles) {
      box.update(ctx)
    }
  }

  animate()
}

main()

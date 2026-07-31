import { euclideanDistance, Circle } from "@/math/geometry"

function createCircles() {
  return [
    new Circle({ x: 300, y: 300, radius: 100, color: "black" }),
    new Circle({ x: 10, y: 10, radius: 30, color: "red" }),
  ]
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const mouse = {
    x: 10,
    y: 10,
  }

  addEventListener("mousemove", (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  })

  let circles = createCircles()

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    circles = createCircles()
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const [circle1, circle2] = circles
    circle1.update(ctx)

    circle2.x = mouse.x
    circle2.y = mouse.y
    circle2.update(ctx)

    const euclideanCircleDistance = euclideanDistance(circle1.x, circle1.y, circle2.x, circle2.y)
    if (euclideanCircleDistance <= circle1.radius + circle2.radius) {
      console.info(`Collision detected. Distance=${euclideanCircleDistance}`)
      circle1.color = "red"
    } else {
      circle1.color = "black"
    }
  }

  animate()
}

main()

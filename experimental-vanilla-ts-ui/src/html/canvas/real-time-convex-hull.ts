import { Circle, type CircleParams } from "@/math/geometry"

class Point extends Circle {
  dx: number
  dy: number
  ringRadius: number

  constructor({ x, y, radius, color }: CircleParams) {
    super({ x, y, radius, color })
    this.dx = (Math.random() - 0.5) * 7
    this.dy = (Math.random() - 0.5) * 7
    this.ringRadius = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw point
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()

    // Draw ring around point
    ctx.beginPath()
    ctx.arc(this.x, this.y, Math.abs(this.ringRadius), 0, Math.PI * 2, false)
    ctx.strokeStyle = "white"
    ctx.stroke()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    const { canvas } = ctx
    // Bounce off left and right of window
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    // Bounce off top and bottom of window
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy
    this.draw(ctx)
  }
}

/**
 * This function will determine whether or not three points create a counterclockwise or clockwise turn.
 *
 * Possible results:
 * If return value is > 0, p0 -> p1 -> p2 is counterclockwise
 * If return value is < 0, p0 -> p1 -> p2 is clockwise
 * If return value is = 0, p0 -> p1 -> p2 is collinear
 *
 * @return Int Determinant
 */

function isCounterClockwise(p0: Point, p1: Point, p2: Point) {
  return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y)
}

function initializePoints(canvas: HTMLCanvasElement) {
  const points: Point[] = []
  const radius = 3
  for (let i = 0; i < 30; i++) {
    points.push(
      new Point({
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        radius,
        color: "#6ea3f1",
      }),
    )
  }
  return points
}

function createConvexHullPoints(points: Point[]) {
  // Sort points by greatest y value to least y value
  points.sort((a, b) => b.y - a.y)

  // Remove first value from sorted array so we get the
  // highest y coordinate as our start point
  const startPoint = points.shift()!

  // Sort the rest of the coordinates in order of smallest
  // to largest angle relative to the start point
  points.sort((a, b) => {
    const tanA = Math.atan2(a.y - startPoint.y, a.x - startPoint.x)
    const tanB = Math.atan2(b.y - startPoint.y, b.x - startPoint.x)
    return tanB - tanA
  })

  // Add original start point back to its position in front of array
  points.unshift(startPoint)

  // Create an array to store any points that exist on the convex hull
  const convexHullPoints: Point[] = []

  // First two of the sorted points will always be on the convex hull
  convexHullPoints.push(points[0], points[1])

  // Loop through the rest of the points to see if they exist on the convex hull
  for (let i = 2; i < points.length; i++) {
    while (isCounterClockwise(convexHullPoints.at(-2)!, convexHullPoints.at(-1)!, points[i]) > 0) {
      convexHullPoints.pop()
    }

    convexHullPoints.push(points[i])
  }

  convexHullPoints.push(points[0])
  return convexHullPoints
}

function connectConvexHullPoints(ctx: CanvasRenderingContext2D, convexHullPoints: Point[]) {
  for (let i = 0; i < convexHullPoints.length; i++) {
    // Slowly increase ring radius for smooth transition
    const desiredRingRadius = convexHullPoints[i].radius + 5
    convexHullPoints[i].ringRadius += (desiredRingRadius - convexHullPoints[i].ringRadius) * 0.15

    if (i + 1 >= convexHullPoints.length) continue

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(convexHullPoints[i].x, convexHullPoints[i].y)
    ctx.lineTo(convexHullPoints[i + 1].x, convexHullPoints[i + 1].y)
    ctx.strokeStyle = "#6ea3f1"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    convexHullPoints[i].color = "white"
  }
}

function labelPoints(ctx: CanvasRenderingContext2D, points: Point[], index: number) {
  // This creates the lines from point 0 to point n in order of their angle relative
  // to the starting point. Good for visualizing how the points are sorted
  ctx.fillText(index.toString(), points[index].x + 10, points[index].y)
  ctx.beginPath()
  ctx.moveTo(points[index].x, points[index].y)
  ctx.lineTo(points[index + 1].x, points[index + 1].y)
  ctx.strokeStyle = "white"
  ctx.stroke()
  ctx.closePath()
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  let points = initializePoints(canvas)
  const mousePosition = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  }

  addEventListener("mousemove", function (event) {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })

  addEventListener("resize", function () {
    canvas.width = innerWidth
    canvas.height = innerHeight
    points = initializePoints(canvas)
  })

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const convexHullPoints = createConvexHullPoints(points)

    // Now that we have a filtered set of points on the convex
    // hull, we can draw lines that connect them
    connectConvexHullPoints(ctx, convexHullPoints)

    // Animate and create all points
    for (let i = 0; i < points.length; i++) {
      points[i].update(ctx)

      // If point is not in the convex hull array, change color and decrease ring size
      if (!convexHullPoints.includes(points[i])) {
        points[i].color = "#6ea3f1"

        if (points[i].ringRadius > 0) {
          points[i].ringRadius -= 0.25
        }
      }

      if (i + 1 >= points.length) continue

      labelPoints(ctx, points, i)
    }
  }

  animate()
}

main()

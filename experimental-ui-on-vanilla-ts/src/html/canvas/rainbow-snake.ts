const PERLIN_YWRAPB = 4 // Y-wrap bits → number of bits to shift for the Y-axis wrap in the flattened 1D lattice index
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB // the resulting wrap value/mask for Y (computed by shifting 1 left by YWRAPB bits)
const PERLIN_ZWRAPB = 8 // Z-wrap bits → same idea, for the Z axis
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB // the resulting wrap value/mask for Z
const PERLIN_SIZE = 4095

const PERLIN_OCTAVES = 4 // default to medium smooth
const PERLIN_AMPLITUDE_FALLOFF = 0.5 // 50% reduction/octave

const scaled_cosine = (i: number) => 0.5 * (1.0 - Math.cos(i * Math.PI))

/**
 * @return {Number}     Perlin noise value (between 0 and 1) at specified
 *                      coordinates
 */
function perlinNoise(
  x: number,
  y = 0,
  z = 0,
  permutationTable: number[] | null = null,
): [number, number[]] {
  if (permutationTable == null) {
    permutationTable = new Array(PERLIN_SIZE + 1)
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      permutationTable[i] = Math.random()
    }
  }

  if (x < 0) {
    x = -x
  }
  if (y < 0) {
    y = -y
  }
  if (z < 0) {
    z = -z
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z)
  let xf = x - xi
  let yf = y - yi
  let zf = z - zi
  let rxf, ryf

  let r = 0
  let amplitude = 0.5

  let n1, n2, n3

  for (let o = 0; o < PERLIN_OCTAVES; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)

    rxf = scaled_cosine(xf)
    ryf = scaled_cosine(yf)

    n1 = permutationTable[of & PERLIN_SIZE]
    n1 += rxf * (permutationTable[(of + 1) & PERLIN_SIZE] - n1)
    n2 = permutationTable[(of + PERLIN_YWRAP) & PERLIN_SIZE]
    n2 += rxf * (permutationTable[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
    n1 += ryf * (n2 - n1)

    of += PERLIN_ZWRAP
    n2 = permutationTable[of & PERLIN_SIZE]
    n2 += rxf * (permutationTable[(of + 1) & PERLIN_SIZE] - n2)
    n3 = permutationTable[(of + PERLIN_YWRAP) & PERLIN_SIZE]
    n3 += rxf * (permutationTable[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
    n2 += ryf * (n3 - n2)

    n1 += scaled_cosine(zf) * (n2 - n1)

    r += n1 * amplitude
    amplitude *= PERLIN_AMPLITUDE_FALLOFF
    xi <<= 1
    xf *= 2
    yi <<= 1
    yf *= 2
    zi <<= 1
    zf *= 2

    if (xf >= 1.0) {
      xi++
      xf--
    }
    if (yf >= 1.0) {
      yi++
      yf--
    }
    if (zf >= 1.0) {
      zi++
      zf--
    }
  }
  return [r, permutationTable]
}

class Circle {
  x: number
  y: number
  radius: number
  color: string
  offset: number

  constructor(x: number, y: number, radius: number, color: string, offset: number) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.offset = offset
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    // @ts-expect-error: Property 'alpha' does not exist on type 'CanvasRenderingContext2D'.
    ctx.alpha = 0.01
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
  }
}

function createCircles() {
  const circles: Circle[] = []
  for (let i = 0; i < 500; i++) {
    circles.push(new Circle(20, 20, 10, `hsl(${255 * (i / 500)}, 50%, 50%)`, Math.random() * 2))
  }
  return circles
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

  let circles = createCircles()
  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    circles = createCircles()
  })

  let time1 = 0
  let time2 = 0
  let permutationTable: number[] | null = null

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    circles.forEach((circle) => {
      const [noiseValue, noiseLattice] = perlinNoise(time1 + circle.offset, 0, 0, permutationTable)
      permutationTable = noiseLattice
      circle.x = noiseValue * innerWidth
      const [noiseValueY, randomLattice] = perlinNoise(
        time2 + circle.offset,
        0,
        0,
        permutationTable,
      )
      permutationTable = randomLattice
      circle.y = noiseValueY * innerHeight
      circle.update(ctx)
    })

    time1 += 0.003
    time2 += 0.005
  }

  circles = createCircles()
  animate()
}

main()

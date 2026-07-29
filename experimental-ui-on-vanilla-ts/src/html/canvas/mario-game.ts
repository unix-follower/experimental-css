import { type Vector2 } from "@/math/linear-algebra"
import platform from "@/assets/html/canvas/mario-game/platform.png"
import hills from "@/assets/html/canvas/mario-game/hills.png"
import background from "@/assets/html/canvas/mario-game/background.png"
import platformSmallTall from "@/assets/html/canvas/mario-game/platformSmallTall.png"
import spriteRunLeft from "@/assets/html/canvas/mario-game/spriteRunLeft.png"
import spriteRunRight from "@/assets/html/canvas/mario-game/spriteRunRight.png"
import spriteStandLeft from "@/assets/html/canvas/mario-game/spriteStandLeft.png"
import spriteStandRight from "@/assets/html/canvas/mario-game/spriteStandRight.png"

interface PlayerParams {
  x: number
  y: number
  width: number
  height: number
  velocity: Vector2
  speed: number
  image: HTMLImageElement
}

const gravity = 9.8

class Player {
  position: Vector2
  width: number
  height: number
  velocity: Vector2
  speed: number
  grounded: boolean = false
  image: HTMLImageElement
  sprites: {
    stand: {
      right: HTMLImageElement
      left: HTMLImageElement
      cropWidth: number
      width: number
    }
    run: {
      right: HTMLImageElement
      left: HTMLImageElement
      cropWidth: number
      width: number
    }
  }
  currentSprite: HTMLImageElement
  frames: number
  currentCropWidth: number

  constructor({ x, y, width, height, velocity, speed, image }: PlayerParams) {
    this.position = { x, y }
    this.width = width
    this.height = height
    this.velocity = velocity
    this.speed = speed
    this.image = image
    this.frames = 0
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875,
      },
    }
    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 177
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    )
  }

  update(ctx: CanvasRenderingContext2D) {
    this.frames++
    if (
      (this.frames > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)) ||
      (this.frames > 59 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left))
    ) {
      this.frames = 0
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    const { canvas } = ctx
    if (!this.grounded) {
      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.position.y += gravity
      } else {
        this.velocity.y = 0
      }
    }

    this.draw(ctx)
  }
}

interface PlatformParams {
  x: number
  y: number
  width?: number
  height?: number
  image: HTMLImageElement
}

class GenericObject {
  position: Vector2
  width: number
  height: number
  image: HTMLImageElement

  constructor({ x, y, image }: PlatformParams) {
    this.position = { x, y }
    this.width = image.width ?? 200
    this.height = image.height ?? 20
    this.image = image
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }
}

class Platform extends GenericObject {}

function createImage(imageSrc: string) {
  const image = new Image()
  image.src = imageSrc
  return image
}

function init(ctx: CanvasRenderingContext2D) {
  const platformImage = createImage(platform)
  const platformSmallTallImage = createImage(platformSmallTall)

  const player = new Player({
    x: 100,
    y: 100,
    width: 60,
    height: 60,
    velocity: { x: 0, y: 0 },
    speed: 10,
    image: createImage(spriteStandRight),
  })
  const {canvas} = ctx
  const platformLandingPosition = canvas.height - platformImage.height * 0.9
  const platforms = [
    new Platform({
      x: platformImage.width * 4 + 300 - 2 - platformSmallTallImage.width,
      y: canvas.height - platformSmallTallImage.height * 0.9,
      image: platformSmallTallImage,
    }),
    new Platform({ x: -1, y: platformLandingPosition, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: platformLandingPosition, image: platformImage }), // y: 470,
    new Platform({ x: platformImage.width * 2 + 100, y: platformLandingPosition, image: platformImage }),
    new Platform({ x: platformImage.width * 3 + 300, y: platformLandingPosition, image: platformImage }),
    new Platform({ x: platformImage.width * 4 + 300 - 2, y: platformLandingPosition, image: platformImage }),
    new Platform({ x: platformImage.width * 5 + 600 - 2, y: platformLandingPosition, image: platformImage }),
  ]

  const genericObjects = [
    new GenericObject({ x: -1, y: -1, image: createImage(background) }),
    new GenericObject({ x: -1, y: -1, image: createImage(hills) }),
  ]
  return { player, platforms, genericObjects }
}

interface Keys {
  right: {
    pressed: boolean
  }
  left: {
    pressed: boolean
  }
}

function switchSprite(keys: Keys, lastKey: string | null, player: Player) {
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  }
}

function scrollRight(player: Player, platforms: Platform[], genericObjects: GenericObject[]) {
  platforms.forEach((platform) => {
    platform.position.x -= player.speed
  })
  genericObjects.forEach((genericObject) => {
    genericObject.position.x -= player.speed * 0.66
  })
}

function scrollLeft(player: Player, platforms: Platform[], genericObjects: GenericObject[]) {
  platforms.forEach((platform) => {
    platform.position.x += player.speed
  })
  genericObjects.forEach((genericObject) => {
    genericObject.position.x += player.speed * 0.66
  })
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  let { player, platforms, genericObjects } = init(ctx)

  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  }

  let lastKey: string | null = null

  addEventListener("keydown", (event) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        console.info("Go left")
        keys.left.pressed = true
        lastKey = "left"
        break
      case "s":
      case "ArrowDown":
        console.info("Go down")
        break
      case "d":
      case "ArrowRight":
        console.info("Go right")
        keys.right.pressed = true
        lastKey = "right"
        break
      case "w":
      case "ArrowUp":
        console.info("Go up")
        player.velocity.y -= 25
        break
    }
  })

  addEventListener("keyup", (event) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        console.info("Go left")
        keys.left.pressed = false
        break
      case "s":
      case "ArrowDown":
        console.info("Go down")
        break
      case "d":
      case "ArrowRight":
        console.info("Go right")
        keys.right.pressed = false
        break
      case "w":
      case "ArrowUp":
        console.info("Go up")
        player.velocity.y = 0
        break
    }
  })

  let scrollOffset = 0

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => genericObject.draw(ctx))

    platforms.forEach((platform) => platform.draw(ctx))

    if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = player.speed
    } else if (
      (keys.left.pressed && player.position.x > 100) ||
      (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
      player.velocity.x = -player.speed
    } else {
      player.velocity.x = 0

      if (keys.right.pressed) {
        scrollOffset += 5
        scrollRight(player, platforms, genericObjects)
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5
        scrollLeft(player, platforms, genericObjects)
      }
    }

    player.grounded = false

    // platform collision detection
    platforms.forEach((platform) => {
      const withinX =
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width

      const isFallingOntoTop = withinX &&
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y

      const isRestingOnTop = withinX &&
        Math.abs(player.position.y + player.height - platform.position.y) < 1

      if (isFallingOntoTop || isRestingOnTop) {
        player.position.y = platform.position.y - player.height
        player.grounded = true
      }
    })

    switchSprite(keys, lastKey, player)

    const platformImage = platforms.at(-1)!.image
    if (scrollOffset > platformImage.width * 5 + 300 - 2) {
      console.info("You win!")
    }

    player.update(ctx)

    if (player.position.y > canvas.height) {
      console.info("You lose!")
      const initResult = init(ctx)
      player = initResult.player
      platforms = initResult.platforms
      genericObjects = initResult.genericObjects
    }
  }

  animate()
}

main()

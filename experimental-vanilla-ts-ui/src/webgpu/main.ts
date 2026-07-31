/// <reference types="@webgpu/types" />
import { ARR_1ST_IDX } from "@/common/constants"
import { setupObserver } from "@/misc/webgpu/webgpu-utils"
import { type ObjInfo } from "@/misc/webgpu/webgpu-model"

const rand = (min?: number, max?: number) => {
  if (min === undefined) {
    min = 0
    max = 1
  } else if (max === undefined) {
    max = min
    min = 0
  }
  return min + Math.random() * (max - min)
}

function createCircleVerticesWithIndices({
  radius = 1,
  numSubdivisions = 24,
  innerRadius = 0,
  startAngle = 0,
  endAngle = Math.PI * 2,
} = {}) {
  const numVertices = (numSubdivisions + 1) * 2
  const vertexData = new Float32Array(numVertices * (2 + 1))
  const colorData = new Uint8Array(vertexData.buffer)

  let offset = 0
  let colorOffset = 8
  const addVertex = (x: number, y: number, r: number, g: number, b: number) => {
    vertexData[offset++] = x
    vertexData[offset++] = y
    offset += 1 // skip the color
    colorData[colorOffset++] = r * 255
    colorData[colorOffset++] = g * 255
    colorData[colorOffset++] = b * 255
    colorOffset += 9 // skip extra byte and the position
  }

  const innerColor: [number, number, number] = [1, 1, 1]
  const outerColor: [number, number, number] = [0.1, 0.1, 0.1]

  // 2 vertices per subdivision
  //
  // 1  3  5  7  9 ...
  //
  // 0  2  4  6  8 ...
  for (let i = 0; i <= numSubdivisions; ++i) {
    const angle = startAngle + (i * (endAngle - startAngle)) / numSubdivisions

    const c1 = Math.cos(angle)
    const s1 = Math.sin(angle)

    addVertex(c1 * radius, s1 * radius, ...outerColor)
    addVertex(c1 * innerRadius, s1 * innerRadius, ...innerColor)
  }

  const indexData = new Uint32Array(numSubdivisions * 6)
  let ndx = 0

  // 1st tri  2nd tri  3rd tri  4th tri
  // 0 1 2    2 1 3    2 3 4    4 3 5
  //
  // 0--2        2     2--4        4  .....
  // | /        /|     | /        /|
  // |/        / |     |/        / |
  // 1        1--3     3        3--5  .....
  for (let i = 0; i < numSubdivisions; ++i) {
    const ndxOffset = i * 2

    // first triangle
    indexData[ndx++] = ndxOffset
    indexData[ndx++] = ndxOffset + 1
    indexData[ndx++] = ndxOffset + 2

    // second triangle
    indexData[ndx++] = ndxOffset + 2
    indexData[ndx++] = ndxOffset + 1
    indexData[ndx++] = ndxOffset + 3
  }

  return {
    vertexData,
    indexData,
    numVertices: indexData.length,
  }
}

export async function drawHighContrastCircles(webGpuCtx: GPUCanvasContext, device: GPUDevice) {
  const { canvas } = webGpuCtx
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat()
  webGpuCtx.configure({
    device,
    format: presentationFormat,
  })

  const module = device.createShaderModule({
    code: /* wgsl */ `
      struct Vertex {
        @location(0) position: vec2f,
        @location(1) color: vec4f,
        @location(2) offset: vec2f,
        @location(3) scale: vec2f,
        @location(4) perVertexColor: vec3f,
      };

      struct VSOutput {
        @builtin(position) position: vec4f,
        @location(0) color: vec4f,
      };

      @vertex fn vs(
        vert: Vertex,
      ) -> VSOutput {
        var vsOut: VSOutput;
        vsOut.position = vec4f(
            vert.position * vert.scale + vert.offset, 0.0, 1.0);
        vsOut.color = vert.color * vec4f(vert.perVertexColor, 1);
        return vsOut;
      }

      @fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
        return vsOut.color;
      }
    `,
  })

  const pipeline = device.createRenderPipeline({
    label: "per vertex color",
    layout: "auto",
    vertex: {
      module,
      buffers: [
        {
          arrayStride: 2 * 4 + 4, // 2 floats, 4 bytes each + 4 bytes
          attributes: [
            { shaderLocation: 0, offset: 0, format: "float32x2" }, // position
            { shaderLocation: 4, offset: 8, format: "unorm8x4" }, // perVertexColor
          ],
        },
        {
          arrayStride: 4 + 2 * 4, // 4 bytes + 2 floats, 4 bytes each
          stepMode: "instance",
          attributes: [
            { shaderLocation: 1, offset: 0, format: "unorm8x4" }, // color
            { shaderLocation: 2, offset: 4, format: "float32x2" }, // offset
          ],
        },
        {
          arrayStride: 2 * 4, // 2 floats, 4 bytes each
          stepMode: "instance",
          attributes: [
            { shaderLocation: 3, offset: 0, format: "float32x2" }, // scale
          ],
        },
      ],
    },
    fragment: {
      module,
      targets: [{ format: presentationFormat }],
    },
  })

  const kNumObjects = 100
  const objectInfos: ObjInfo[] = []

  const staticUnitSize =
    4 + // color is 4 bytes
    2 * 4 // offset is 2 32bit floats (4bytes each)
  const changingUnitSize = 2 * 4 // scale is 2 32bit floats (4bytes each)
  const staticVertexBufferSize = staticUnitSize * kNumObjects
  const changingVertexBufferSize = changingUnitSize * kNumObjects

  const staticVertexBuffer = device.createBuffer({
    label: "static vertex for objects",
    size: staticVertexBufferSize,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })

  const changingVertexBuffer = device.createBuffer({
    label: "changing storage for objects",
    size: changingVertexBufferSize,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })

  const kColorOffset = 0
  const kOffsetOffset = 1

  const kScaleOffset = 0

  {
    const staticVertexValuesU8 = new Uint8Array(staticVertexBufferSize)
    const staticVertexValuesF32 = new Float32Array(staticVertexValuesU8.buffer)
    for (let i = 0; i < kNumObjects; i++) {
      const staticOffsetU8 = i * staticUnitSize
      const staticOffsetF32 = staticOffsetU8 / 4

      staticVertexValuesU8.set(
        [rand() * 255, rand() * 255, rand() * 255, 255],
        staticOffsetU8 + kColorOffset,
      )
      staticVertexValuesF32.set([rand(-0.9, 0.9), rand(-0.9, 0.9)], staticOffsetF32 + kOffsetOffset)

      objectInfos.push({
        scale: rand(0.2, 0.5),
      })
    }
    device.queue.writeBuffer(staticVertexBuffer, 0, staticVertexValuesF32)
  }

  const vertexValues = new Float32Array(changingVertexBufferSize / 4)

  const { vertexData, indexData, numVertices } = createCircleVerticesWithIndices({
    radius: 0.5,
    innerRadius: 0.25,
  })
  const vertexBuffer = device.createBuffer({
    label: "vertex buffer",
    size: vertexData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(vertexBuffer, 0, vertexData)
  const indexBuffer = device.createBuffer({
    label: "index buffer",
    size: indexData.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(indexBuffer, 0, indexData)

  const renderPassDescriptor = {
    label: "our basic canvas renderPass",
    colorAttachments: [
      {
        clearValue: [0.3, 0.3, 0.3, 1],
        loadOp: "clear",
        storeOp: "store",
      },
    ] as unknown as GPURenderPassColorAttachment[],
  }

  function render() {
    renderPassDescriptor.colorAttachments[ARR_1ST_IDX].view = webGpuCtx
      .getCurrentTexture()
      .createView()

    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass(renderPassDescriptor)
    pass.setPipeline(pipeline)
    pass.setVertexBuffer(0, vertexBuffer)
    pass.setVertexBuffer(1, staticVertexBuffer)
    pass.setVertexBuffer(2, changingVertexBuffer)
    pass.setIndexBuffer(indexBuffer, "uint32")

    const aspect = canvas.width / canvas.height

    objectInfos.forEach(({ scale }, ndx) => {
      const offset = ndx * (changingUnitSize / 4)
      vertexValues.set([scale / aspect, scale], offset + kScaleOffset)
    })
    device.queue.writeBuffer(changingVertexBuffer, 0, vertexValues)

    pass.drawIndexed(numVertices, kNumObjects)

    pass.end()

    const commandBuffer = encoder.finish()
    device.queue.submit([commandBuffer])
  }

  setupObserver(device, canvas, render)
}

function initDimentions(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  console.info(canvas)
}

async function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement
  initDimentions(canvas)

  const webGpuCtx = canvas.getContext("webgpu")!
  const adapter = await navigator.gpu?.requestAdapter()
  const device = await adapter?.requestDevice()
  console.info(
    `adapter=${adapter?.info.architecture} ${adapter?.info.description} ${adapter?.info.vendor}`,
  )
  if (!device) {
    throw new Error("The browser does not support WebGPU device")
  }

  drawHighContrastCircles(webGpuCtx, device)
}

await main()

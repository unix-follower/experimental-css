import { ARR_1ST_IDX } from "@/common/constants"

export function setupObserver(
  device: GPUDevice,
  canvas: HTMLCanvasElement | OffscreenCanvas,
  render: () => void,
) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const canvas = entry.target as HTMLCanvasElement
      const width = entry.contentBoxSize[ARR_1ST_IDX].inlineSize
      const height = entry.contentBoxSize[ARR_1ST_IDX].blockSize
      canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D))
      canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D))
      // re-render
      render()
    }
  })
  observer.observe(canvas as Element)
}

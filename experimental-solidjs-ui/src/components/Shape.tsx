import { For, createSignal } from "solid-js"
import {
  Square,
  Rectangle,
  Circle,
  Oval,
  TriangleUp,
  TriangleDown,
  TriangleLeft,
  TriangleRight,
  TriangleTopLeft,
  TriangleTopRight,
  TriangleBottomLeft,
  TriangleBottomRight,
  CurvedArrow,
  Trapezoid,
  Parallelogram,
  StarSix,
  StarFive,
  Pentagon,
  Hexagon,
  Octagon,
  Heart,
  InfinityShape,
  Diamond,
  DiamondShield,
  DiamondNarrow,
  CutDiamond,
  Egg,
  Pacman,
  TalkBubble,
  Rss,
  Burst12,
  Burst8,
  YinYang,
  BadgeRibbon,
  SpaceInvader,
  Tv,
  Chevron,
  MagnifyingGlass,
  FacebookIcon,
  Moon,
  Flag,
  Cone,
  Cross,
  Base,
  Pointer,
  Lock,
  CurvedCornerBottomLeft,
  CurvedCornerBottomRight,
  CurvedCornerTopLeft,
  CurvedCornerTopRight,
} from "./shapes"

const shapeMap = {
  Square,
  Rectangle,
  Circle,
  Oval,
  TriangleUp,
  TriangleDown,
  TriangleLeft,
  TriangleRight,
  TriangleTopLeft,
  TriangleTopRight,
  TriangleBottomLeft,
  TriangleBottomRight,
  CurvedArrow,
  Trapezoid,
  Parallelogram,
  StarSix,
  StarFive,
  Pentagon,
  Hexagon,
  Octagon,
  Heart,
  InfinityShape,
  Diamond,
  DiamondShield,
  DiamondNarrow,
  CutDiamond,
  Egg,
  Pacman,
  TalkBubble,
  Rss,
  Burst12,
  Burst8,
  YinYang,
  BadgeRibbon,
  SpaceInvader,
  Tv,
  Chevron,
  MagnifyingGlass,
  FacebookIcon,
  Moon,
  Flag,
  Cone,
  Cross,
  Base,
  Pointer,
  Lock,
  CurvedCornerBottomLeft,
  CurvedCornerBottomRight,
  CurvedCornerTopLeft,
  CurvedCornerTopRight,
} as const

const shapeOptions = Object.keys(shapeMap)

export default function Shape() {
  const [selectedShapes, setSelectedShapes] = createSignal<string[]>([])

  function handleShapeChange(event: Event & { currentTarget: HTMLSelectElement }) {
    const nextSelection = Array.from(event.currentTarget.selectedOptions, (option) => option.value)
    setSelectedShapes(nextSelection)
  }

  return (
    <div>
      <label for="selectShape">Choose shapes:</label>
      <select id="selectShape" multiple size={4} onChange={handleShapeChange}>
        <For each={shapeOptions}>
          {(shapeName) => <option value={shapeName}>{shapeName}</option>}
        </For>
      </select>
      <For each={selectedShapes()}>
        {(shapeName) => {
          const Shape = shapeMap[shapeName as keyof typeof shapeMap]
          return <Shape />
        }}
      </For>
    </div>
  )
}

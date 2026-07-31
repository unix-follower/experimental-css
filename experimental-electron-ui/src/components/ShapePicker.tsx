import { type ReactElement, useState } from "react"
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

const shapeMap = new Map<string, () => ReactElement>([
  ["Square", Square],
  ["Rectangle", Rectangle],
  ["Circle", Circle],
  ["Oval", Oval],
  ["TriangleUp", TriangleUp],
  ["TriangleDown", TriangleDown],
  ["TriangleLeft", TriangleLeft],
  ["TriangleRight", TriangleRight],
  ["TriangleTopLeft", TriangleTopLeft],
  ["TriangleTopRight", TriangleTopRight],
  ["TriangleBottomLeft", TriangleBottomLeft],
  ["TriangleBottomRight", TriangleBottomRight],
  ["CurvedArrow", CurvedArrow],
  ["Trapezoid", Trapezoid],
  ["Parallelogram", Parallelogram],
  ["StarSix", StarSix],
  ["StarFive", StarFive],
  ["Pentagon", Pentagon],
  ["Hexagon", Hexagon],
  ["Octagon", Octagon],
  ["Heart", Heart],
  ["InfinityShape", InfinityShape],
  ["Diamond", Diamond],
  ["DiamondShield", DiamondShield],
  ["DiamondNarrow", DiamondNarrow],
  ["CutDiamond", CutDiamond],
  ["Egg", Egg],
  ["Pacman", Pacman],
  ["TalkBubble", TalkBubble],
  ["Rss", Rss],
  ["Burst12", Burst12],
  ["Burst8", Burst8],
  ["YinYang", YinYang],
  ["BadgeRibbon", BadgeRibbon],
  ["SpaceInvader", SpaceInvader],
  ["Tv", Tv],
  ["Chevron", Chevron],
  ["MagnifyingGlass", MagnifyingGlass],
  ["FacebookIcon", FacebookIcon],
  ["Moon", Moon],
  ["Flag", Flag],
  ["Cone", Cone],
  ["Cross", Cross],
  ["Base", Base],
  ["Pointer", Pointer],
  ["Lock", Lock],
  ["CurvedCornerBottomLeft", CurvedCornerBottomLeft],
  ["CurvedCornerBottomRight", CurvedCornerBottomRight],
  ["CurvedCornerTopLeft", CurvedCornerTopLeft],
  ["CurvedCornerTopRight", CurvedCornerTopRight],
])

export default function ShapePicker() {
  const [shapeCreators, setShapeCreators] = useState<(() => ReactElement)[]>([])

  function handleShapeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value)
    const creators: (() => ReactElement)[] = []
    for (const option of selectedOptions) {
      const creator = shapeMap.get(option)
      if (creator) {
        creators.push(creator)
      }
    }
    setShapeCreators(creators)
  }

  return (
    <div>
      <label htmlFor="selectShape">Choose shapes:</label>
      <select id="selectShape" multiple size={4} onChange={handleShapeChange}>
        <option value="Square">Square</option>
        <option value="Rectangle">Rectangle</option>
        <option value="Circle">Circle</option>
        <option value="Oval">Oval</option>
        <option value="TriangleUp">TriangleUp</option>
        <option value="TriangleDown">TriangleDown</option>
        <option value="TriangleLeft">TriangleLeft</option>
        <option value="TriangleRight">TriangleRight</option>
        <option value="TriangleTopLeft">TriangleTopLeft</option>
        <option value="TriangleTopRight">TriangleTopRight</option>
        <option value="TriangleBottomLeft">TriangleBottomLeft</option>
        <option value="TriangleBottomRight">TriangleBottomRight</option>
        <option value="CurvedArrow">CurvedArrow</option>
        <option value="Trapezoid">Trapezoid</option>
        <option value="Parallelogram">Parallelogram</option>
        <option value="StarSix">StarSix</option>
        <option value="StarFive">StarFive</option>
        <option value="Pentagon">Pentagon</option>
        <option value="Hexagon">Hexagon</option>
        <option value="Octagon">Octagon</option>
        <option value="Heart">Heart</option>
        <option value="InfinityShape">InfinityShape</option>
        <option value="Diamond">Diamond</option>
        <option value="DiamondShield">DiamondShield</option>
        <option value="DiamondNarrow">DiamondNarrow</option>
        <option value="CutDiamond">CutDiamond</option>
        <option value="Egg">Egg</option>
        <option value="Pacman">Pacman</option>
        <option value="TalkBubble">TalkBubble</option>
        <option value="Rss">Rss</option>
        <option value="Burst12">Burst12</option>
        <option value="Burst8">Burst8</option>
        <option value="YinYang">YinYang</option>
        <option value="BadgeRibbon">BadgeRibbon</option>
        <option value="SpaceInvader">SpaceInvader</option>
        <option value="Tv">Tv</option>
        <option value="Chevron">Chevron</option>
        <option value="MagnifyingGlass">MagnifyingGlass</option>
        <option value="FacebookIcon">FacebookIcon</option>
        <option value="Moon">Moon</option>
        <option value="Flag">Flag</option>
        <option value="Cone">Cone</option>
        <option value="Cross">Cross</option>
        <option value="Base">Base</option>
        <option value="Pointer">Pointer</option>
        <option value="Lock">Lock</option>
        <option value="CurvedCornerBottomLeft">CurvedCornerBottomLeft</option>
        <option value="CurvedCornerBottomRight">CurvedCornerBottomRight</option>
        <option value="CurvedCornerTopLeft">CurvedCornerTopLeft</option>
        <option value="CurvedCornerTopRight">CurvedCornerTopRight</option>
      </select>
      {shapeCreators.map((creator) => creator())}
    </div>
  )
}

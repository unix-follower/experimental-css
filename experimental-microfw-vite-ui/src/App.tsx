import { type ReactElement, useState } from "react"
import reactLogo from "@/assets/react.svg"
import viteLogo from "@/assets/vite.svg"
import heroImg from "@/assets/hero.png"
import "@/App.css"
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
} from "./components/shapes"

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

function App() {
  const [count, setCount] = useState(0)
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
    <>
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
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

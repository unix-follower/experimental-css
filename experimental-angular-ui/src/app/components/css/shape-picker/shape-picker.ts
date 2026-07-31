import { Component, signal } from "@angular/core"
import { Shape as ShapeComponent } from "@/app/components/shape/shape"

interface Shape {
  label: string
  id: string
}

@Component({
  selector: "app-shape-picker",
  standalone: true,
  imports: [ShapeComponent],
  templateUrl: "./shape-picker.html",
})
export class ShapePicker {
  readonly shapes: readonly Shape[] = [
    { label: "Square", id: "square" },
    { label: "Rectangle", id: "rectangle" },
    { label: "Circle", id: "circle" },
    { label: "Oval", id: "oval" },
    { label: "TriangleUp", id: "triangle-up" },
    { label: "TriangleDown", id: "triangle-down" },
    { label: "TriangleLeft", id: "triangle-left" },
    { label: "TriangleRight", id: "triangle-right" },
    { label: "TriangleTopLeft", id: "triangle-top-left" },
    { label: "TriangleTopRight", id: "triangle-top-right" },
    { label: "TriangleBottomLeft", id: "triangle-bottom-left" },
    { label: "TriangleBottomRight", id: "triangle-bottom-right" },
    { label: "CurvedArrow", id: "curved-arrow" },
    { label: "Trapezoid", id: "trapezoid" },
    { label: "Parallelogram", id: "parallelogram" },
    { label: "StarSix", id: "star-six" },
    { label: "StarFive", id: "star-five" },
    { label: "Pentagon", id: "pentagon" },
    { label: "Hexagon", id: "hexagon" },
    { label: "Octagon", id: "octagon" },
    { label: "Heart", id: "heart" },
    { label: "InfinityShape", id: "infinity" },
    { label: "Diamond", id: "diamond" },
    { label: "DiamondShield", id: "diamond-shield" },
    { label: "DiamondNarrow", id: "diamond-narrow" },
    { label: "CutDiamond", id: "cut-diamond" },
    { label: "Egg", id: "egg" },
    { label: "Pacman", id: "pacman" },
    { label: "TalkBubble", id: "talk-bubble" },
    { label: "Rss", id: "rss" },
    { label: "Burst12", id: "burst-12" },
    { label: "Burst8", id: "burst-8" },
    { label: "YinYang", id: "yin-yang" },
    { label: "BadgeRibbon", id: "badge-ribbon" },
    { label: "SpaceInvader", id: "space-invader" },
    { label: "Tv", id: "tv" },
    { label: "Chevron", id: "chevron" },
    { label: "MagnifyingGlass", id: "magnifying-glass" },
    { label: "FacebookIcon", id: "facebook-icon" },
    { label: "Moon", id: "moon" },
    { label: "Flag", id: "flag" },
    { label: "Cone", id: "cone" },
    { label: "Cross", id: "cross" },
    { label: "Base", id: "base" },
    { label: "Pointer", id: "pointer" },
    { label: "Lock", id: "lock" },
    { label: "CurvedCornerBottomLeft", id: "curved-corner-bottom-left" },
    { label: "CurvedCornerBottomRight", id: "curved-corner-bottom-right" },
    { label: "CurvedCornerTopLeft", id: "curved-corner-top-left" },
    { label: "CurvedCornerTopRight", id: "curved-corner-top-right" },
  ]

  readonly selectedShapes = signal<Shape[]>([])

  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement

    this.selectedShapes.set(
      Array.from(select.selectedOptions).map((option) =>
        this.shapes.find((shape) => shape.label === option.value)!,
      ),
    )
  }
}

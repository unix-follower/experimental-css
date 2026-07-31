<script setup lang="ts">
import { ref, type Component } from "vue"
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

const shapeMap = new Map<string, Component>([
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

const shapeNames = Array.from(shapeMap.keys())

const shapeComponents = ref<Component[]>([])

function handleShapeChange(event: Event) {
  const select = event.target as HTMLSelectElement
  const selectedOptions = Array.from(select.selectedOptions).map((option) => option.value)
  const components: Component[] = []
  for (const option of selectedOptions) {
    const component = shapeMap.get(option)
    if (component) {
      components.push(component)
    }
  }
  shapeComponents.value = components
}
</script>

<template>
  <div>
    <label for="selectShape">Choose shapes:</label>
    <select id="selectShape" multiple size="4" @change="handleShapeChange">
      <option v-for="name in shapeNames" :key="name" :value="name">{{ name }}</option>
    </select>
    <component :is="comp" v-for="(comp, index) in shapeComponents" :key="index" />
  </div>
</template>

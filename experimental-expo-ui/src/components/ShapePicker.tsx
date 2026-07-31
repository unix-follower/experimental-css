import { type ReactElement, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
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

const shapesList = Array.from(shapeMap.keys())

export default function ShapePicker() {
  const [selectedShapes, setSelectedShapes] = useState<string[]>([])

  const toggleShape = (shapeName: string) => {
    setSelectedShapes((prev) =>
      prev.includes(shapeName) ? prev.filter((s) => s !== shapeName) : [...prev, shapeName],
    )
  }

  const selectedCreators = selectedShapes
    .map((name) => shapeMap.get(name))
    .filter((creator): creator is () => ReactElement => !!creator)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose shapes:</Text>

      <ScrollView style={styles.list}>
        {shapesList.map((shapeName) => (
          <TouchableOpacity
            key={shapeName}
            style={[styles.option, selectedShapes.includes(shapeName) && styles.selectedOption]}
            onPress={() => toggleShape(shapeName)}
          >
            <Text style={selectedShapes.includes(shapeName) ? styles.selectedText : styles.text}>
              {shapeName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.preview}>
        {selectedCreators.map((creator, index) => (
          <View key={index}>{creator()}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  list: { maxHeight: 200, marginBottom: 16 },
  option: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  selectedOption: { backgroundColor: "#e0f0ff" },
  text: { fontSize: 16 },
  selectedText: { fontSize: 16, fontWeight: "bold", color: "#007aff" },
  preview: { marginTop: 16 },
})

import { View, StyleSheet } from "react-native"

export function Square() {
  return <View style={styles.square} />
}

export function Rectangle() {
  return <View style={styles.rectangle} />
}

export function Circle() {
  return <View style={styles.circle} />
}

export function Oval() {
  return <View style={styles.oval} />
}

export function TriangleUp() {
  return <View style={styles.triangleUp} />
}

export function TriangleDown() {
  return <View style={styles.triangleDown} />
}

export function TriangleLeft() {
  return <View style={styles.triangleLeft} />
}

export function TriangleRight() {
  return <View style={styles.triangleRight} />
}

export function TriangleTopLeft() {
  return <View style={styles.triangleTopLeft} />
}

export function TriangleTopRight() {
  return <View style={styles.triangleTopRight} />
}

export function TriangleBottomLeft() {
  return <View style={styles.triangleBottomLeft} />
}

export function TriangleBottomRight() {
  return <View style={styles.triangleBottomRight} />
}

export function CurvedArrow() {
  return <View style={styles.curvedArrow} />
}

export function Trapezoid() {
  return <View style={styles.trapezoid} />
}

export function Parallelogram() {
  return <View style={styles.parallelogram} />
}

export function StarSix() {
  return (
    <View style={styles.starSixContainer}>
      <View style={styles.starSix} />
      <View style={styles.starSixAfter} />
    </View>
  )
}

export function StarFive() {
  return <View style={styles.starFive} /> // Simplified
}

export function Pentagon() {
  return <View style={styles.pentagon} />
}

export function Hexagon() {
  return (
    <View style={styles.hexagonContainer}>
      <View style={styles.hexagon} />
    </View>
  )
}

export function Octagon() {
  return <View style={styles.octagon} />
}

export function Heart() {
  return (
    <View style={styles.heart}>
      <View style={styles.heartLeft} />
      <View style={styles.heartRight} />
    </View>
  )
}

export function InfinityShape() {
  return (
    <View style={styles.infinity}>
      <View style={[styles.loop, styles.leftLoop]} />
      <View style={[styles.loop, styles.rightLoop]} />
    </View>
  )
}

export function Diamond() {
  return <View style={styles.diamond} />
}

export function DiamondShield() {
  return <View style={styles.diamondShield} />
}

export function DiamondNarrow() {
  return <View style={styles.diamondNarrow} />
}

export function CutDiamond() {
  return <View style={styles.cutDiamond} />
}

export function Egg() {
  return <View style={styles.egg} />
}

export function Pacman() {
  return <View style={styles.pacman} />
}

export function TalkBubble() {
  return <View style={styles.talkBubble} />
}

export function Rss() {
  return <View style={styles.rss} />
}

export function Burst12() {
  return <View style={styles.burst12} />
}

export function Burst8() {
  return <View style={styles.burst8} />
}

export function YinYang() {
  return <View style={styles.yinYang} />
}

export function BadgeRibbon() {
  return <View style={styles.badgeRibbon} />
}

export function SpaceInvader() {
  return <View style={styles.spaceInvader} />
}

export function Tv() {
  return <View style={styles.tv} />
}

export function Chevron() {
  return <View style={styles.chevron} />
}

export function MagnifyingGlass() {
  return <View style={styles.magnifyingGlass} />
}

export function FacebookIcon() {
  return <View style={styles.facebookIcon} />
}

export function Moon() {
  return <View style={styles.moon} />
}

export function Flag() {
  return <View style={styles.flag} />
}

export function Cone() {
  return <View style={styles.cone} />
}

export function Cross() {
  return <View style={styles.cross} />
}

export function Base() {
  return <View style={styles.base} />
}

export function Pointer() {
  return <View style={styles.pointer} />
}

export function Lock() {
  return <View style={styles.lock} />
}

export function CurvedCornerBottomLeft() {
  return <View style={styles.curvedCornerBottomLeft} />
}

export function CurvedCornerBottomRight() {
  return <View style={styles.curvedCornerBottomRight} />
}

export function CurvedCornerTopLeft() {
  return <View style={styles.curvedCornerTopLeft} />
}

export function CurvedCornerTopRight() {
  return <View style={styles.curvedCornerTopRight} />
}

const styles = StyleSheet.create({
  square: { width: 100, height: 100, backgroundColor: "red" },
  rectangle: { width: 200, height: 100, backgroundColor: "red" },
  circle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "red" },
  oval: { width: 200, height: 100, borderRadius: 50, backgroundColor: "red" },

  triangleUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
  },
  triangleDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
  },
  triangleLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderBottomWidth: 50,
    borderRightWidth: 100,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "red",
  },
  triangleRight: {
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderBottomWidth: 50,
    borderLeftWidth: 100,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "red",
  },

  triangleTopLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderRightWidth: 100,
    borderTopColor: "red",
    borderRightColor: "transparent",
  },
  triangleTopRight: {
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderLeftWidth: 100,
    borderTopColor: "red",
    borderLeftColor: "transparent",
  },
  triangleBottomLeft: {
    width: 0,
    height: 0,
    borderBottomWidth: 100,
    borderRightWidth: 100,
    borderBottomColor: "red",
    borderRightColor: "transparent",
  },
  triangleBottomRight: {
    width: 0,
    height: 0,
    borderBottomWidth: 100,
    borderLeftWidth: 100,
    borderBottomColor: "red",
    borderLeftColor: "transparent",
  },

  curvedArrow: {
    position: "relative",
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderTopColor: "transparent",
    borderRightWidth: 9,
    borderRightColor: "red",
    transform: [{ rotate: "10deg" }],
  },

  curvedArrowAfter: {
    position: "absolute",
    borderWidth: 0,
    borderStyle: "solid",
    borderTopWidth: 3,
    borderTopColor: "red",
    borderRadius: 20,
    top: -12,
    left: -9,
    width: 12,
    height: 12,
    transform: [{ rotate: "45deg" }],
  },

  trapezoid: {
    width: 100,
    height: 0,
    borderBottomWidth: 100,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomColor: "red",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  parallelogram: {
    width: 150,
    height: 100,
    backgroundColor: "red",
    transform: [{ skewX: "20deg" }],
  },

  starSix: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
  },
  starSixAfter: {
    position: "absolute",
    top: 30,
    left: -50,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
  },

  starFive: {
    width: 0,
    height: 0,
    borderRightWidth: 100,
    borderBottomWidth: 70,
    borderLeftWidth: 100,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "red",
    transform: [{ rotate: "35deg" }],
  },
  starFiveBefore: {
    borderBottomWidth: 80,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomColor: "red",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
    height: 0,
    width: 0,
    top: -45,
    left: -65,
    display: "block",
    transform: [{ rotate: "-35deg" }],
  },

  starFiveAfter: {
    position: "absolute",
    display: "block",
    color: "red",
    top: 3,
    left: -105,
    width: 0,
    height: 0,
    borderRightWidth: 100,
    borderRightColor: "transparent",
    borderBottomWidth: 70,
    borderBottomColor: "red",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    transform: [{ rotate: "-70deg" }],
  },

  pentagon: {
    width: 90,
    height: 85,
    borderTopWidth: 50,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopColor: "red",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "relative",
  },
  pentagonBefore: {
    content: "",
    position: "absolute",
    height: 0,
    width: 0,
    top: -85,
    left: -18,
    borderWidth: 35,
    borderStyle: "solid",
    borderColor: "red",
  },

  hexagon: { width: 100, height: 58, backgroundColor: "red", position: "relative" },
  hexagonBefore: {
    content: "",
    position: "absolute",
    top: -28.8675,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 28.8675,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
  },
  hexagonAfter: {
    content: "",
    position: "absolute",
    bottom: -28.8675,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 28.8675,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
  },

  octagon: { width: 100, height: 100, backgroundColor: "red", position: "relative" },
  octagonBefore: {
    content: "",
    width: 100,
    height: 0,
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomWidth: 29,
    borderBottomColor: "red",
    borderLeftWidth: 29,
    borderLeftColor: "#eee",
    borderRightWidth: 29,
    borderRightColor: "#eee",
  },
  octagonAfter: {
    content: "",
    width: 100,
    height: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopWidth: 29,
    borderTopColor: "red",
    borderLeftWidth: 29,
    borderLeftColor: "#eee",
    borderRightWidth: 29,
    borderRightColor: "#eee",
  },

  heart: { width: 100, height: 90, position: "relative" },
  heartLeft: {
    position: "absolute",
    left: 50,
    top: 0,
    width: 50,
    height: 80,
    backgroundColor: "red",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    transform: [{ rotate: "-45deg" }],
  },
  heartRight: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 50,
    height: 80,
    backgroundColor: "red",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 0,
    transform: [{ rotate: "45deg" }],
  },

  infinity: {
    position: "relative",
    width: 220,
    height: 100,
    alignSelf: "center",
  },
  loop: {
    position: "absolute",
    width: 80,
    height: 80,
    borderWidth: 18,
    borderColor: "red",
    borderRadius: 50,
  },
  leftLoop: {
    left: 10,
    top: 10,
    borderRightWidth: 0, // open on the right side
    transform: [{ rotate: "-10deg" }],
  },
  rightLoop: {
    right: 10,
    top: 10,
    borderLeftWidth: 0, // open on the left side
    transform: [{ rotate: "10deg" }],
  },

  diamond: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    position: "relative",
    top: -50,
  },
  diamondAfter: {
    position: "absolute",
    left: -50,
    top: 50,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
  },
  diamondShield: {
    width: 0,
    height: 0,
    border: 50,
    borderColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "red",
    position: "relative",
    top: -50,
  },
  diamondShieldAfter: {
    position: "absolute",
    left: -50,
    top: 20,
    width: 0,
    height: 0,
    border: 50,
    borderColor: "transparent",
    borderTopWidth: 70,
    borderTopColor: "red",
  },
  diamondNarrow: {
    width: 0,
    height: 0,
    border: 50,
    borderColor: "transparent",
    borderBottomWidth: 70,
    borderBottomColor: "red",
    position: "relative",
    top: -50,
  },
  diamondNarrowAfter: {
    position: "absolute",
    left: -50,
    top: 70,
    width: 0,
    height: 0,
    border: 50,
    borderColor: "transparent",
    borderTopWidth: 70,
    borderTopColor: "red",
  },
  cutDiamond: {
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 25,
    height: 0,
    width: 50,
    boxSizing: "content-box",
    position: "relative",
    margin: 20,
  },
  cutDiamondAfter: {
    position: "absolute",
    top: 25,
    left: -25,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 70,
    borderTopWidth: 70,
    borderRightWidth: 50,
    borderBottomWidth: 0,
    borderLeftWidth: 50,
  },

  egg: { width: 126, height: 180, backgroundColor: "red", borderRadius: 63 },
  pacman: {
    width: 0,
    height: 0,
    borderRightWidth: 60,
    borderTopWidth: 60,
    borderLeftWidth: 60,
    borderBottomWidth: 60,
    borderRightColor: "transparent",
    borderTopColor: "red",
    borderLeftColor: "red",
    borderBottomColor: "red",
    borderRadius: 60,
  },

  talkBubble: {
    width: 120,
    height: 80,
    backgroundColor: "red",
    borderRadius: 10,
    position: "relative",
  },
  talkBubbleBefore: {
    content: "",
    position: "absolute",
    right: "100%",
    top: 26,
    width: 0,
    height: 0,
    borderTopWidth: 13,
    borderTopColor: "transparent",
    borderRightWidth: 26,
    borderRightColor: "red",
    borderBottomWidth: 13,
    borderBottomColor: "transparent",
  },

  rss: {
    width: 20 * 16,
    height: 20 * 16,
    borderRadius: 3 * 16,
    backgroundColor: "#ff0000",
    fontSize: 14,
  },
  rssBefore: {
    content: "",
    zIndex: 1,
    display: "block",
    height: 5 * 16,
    width: 5 * 16,
    backgroundColor: "#fff",
    borderRadius: 50 * 16,
    position: "relative",
    top: 11.5 * 16,
    left: 3.5 * 16,
  },
  rssAfter: {
    content: "",
    display: "block",
    backgroundColor: "#ff0000",
    width: 13 * 16,
    height: 13 * 16,
    top: -2 * 16,
    left: 3.8 * 16,
    borderRadius: 2.5 * 16,
    position: "relative",
    boxShadow: "-2em 2em 0 0 #fff inset, -4em 4em 0 0 #ff0000 inset, -6em 6em 0 0 #fff inset",
  },

  burst12: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    position: "relative",
    textAlign: "center",
  },
  burst12Before: {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    height: 80,
    width: 80,
    backgroundColor: "red",
    transform: [{ rotate: "30deg" }],
  },
  burst12After: {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    height: 80,
    width: 80,
    backgroundColor: "red",
    transform: [{ rotate: "60deg" }],
  },

  burst8: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    position: "relative",
    textAlign: "center",
    transform: [{ rotate: "20deg" }],
  },
  burst8Before: {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    height: 80,
    width: 80,
    backgroundColor: "red",
    transform: [{ rotate: "135deg" }],
  },

  yinYang: {
    width: 96,
    boxSizing: "content-box",
    height: 48,
    backgroundColor: "#eee",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 100,
    position: "relative",
  },
  yinYangBefore: {
    content: "",
    position: "absolute",
    top: "50%",
    left: 0,
    backgroundColor: "#eee",
    border: "18px solid red",
    borderRadius: 100,
    width: 12,
    height: 12,
    boxSizing: "content-box",
  },
  yinYangAfter: {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "red",
    border: "18px solid #eee",
    borderRadius: 100,
    width: 12,
    height: 12,
    boxSizing: "content-box",
  },

  badgeRibbon: {
    position: "relative",
    backgroundColor: "red",
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  badgeRibbonBefore: {
    content: "",
    position: "absolute",
    borderBottomWidth: 70,
    borderBottomColor: "red",
    borderLeftWidth: 40,
    borderLeftColor: "transparent",
    borderRightWidth: 40,
    borderRightColor: "transparent",
    top: 70,
    left: -10,
    transform: [{ rotate: "-140deg" }],
  },
  badgeRibbonAfter: {
    content: "",
    position: "absolute",
    borderBottomWidth: 70,
    borderBottomColor: "red",
    borderLeftWidth: 40,
    borderLeftColor: "transparent",
    borderRightWidth: 40,
    borderRightColor: "transparent",
    top: 70,
    left: "auto",
    right: -10,
    transform: [{ rotate: "140deg" }],
  },

  spaceInvader: {
    boxShadow:
      "0 0 0 1em red, " +
      "0 1em 0 1em red, " +
      "-2.5em 1.5em 0 0.5em red, " +
      "2.5em 1.5em 0 0.5em red, " +
      "-3em -3em 0 0 red, " +
      "3em -3em 0 0 red, " +
      "-2em -2em 0 0 red, " +
      "2em -2em 0 0 red, " +
      "-3em -1em 0 0 red, " +
      "-2em -1em 0 0 red, " +
      "2em -1em 0 0 red, " +
      "3em -1em 0 0 red, " +
      "-4em 0 0 0 red, " +
      "-3em 0 0 0 red, " +
      "3em 0 0 0 red, " +
      "4em 0 0 0 red, " +
      "-5em 1em 0 0 red, " +
      "-4em 1em 0 0 red, " +
      "4em 1em 0 0 red, " +
      "5em 1em 0 0 red, " +
      "-5em 2em 0 0 red, " +
      "5em 2em 0 0 red, " +
      "-5em 3em 0 0 red, " +
      "-3em 3em 0 0 red, " +
      "3em 3em 0 0 red, " +
      "5em 3em 0 0 red, " +
      "-2em 4em 0 0 red, " +
      "-1em 4em 0 0 red, " +
      "1em 4em 0 0 red, " +
      "2em 4em 0 0 red",
    backgroundColor: "red",
    width: 1,
    height: 1,
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 65,
    marginLeft: 70,
    marginRight: 70,
  },

  tv: {
    position: "relative",
    width: 200,
    height: 150,
    margin: 20,
    backgroundColor: "red",
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    textIndent: "0.1em",
  },
  tvBefore: {
    content: "",
    position: "absolute",
    top: "10%",
    bottom: "10%",
    right: "-5%",
    left: "-5%",
    backgroundColor: "inherit",
    borderRadius: "10%",
  },

  chevron: {
    position: "relative",
    textAlign: "center",
    padding: 12,
    marginBottom: 6,
    height: 60,
    width: 200,
  },
  chevronBefore: {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "51%",
    backgroundColor: "red",
    transform: [{ skewX: "0deg" }, { skewY: "6deg" }],
  },
  chevronAfter: {
    content: "",
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "50%",
    backgroundColor: "red",
    transform: [{ skewX: "0deg" }, { skewY: "-6deg" }],
  },

  magnifyingGlass: {
    fontSize: 10,
    display: "inline-block",
    width: 0.4,
    boxSizing: "content-box",
    height: 0.4,
    borderWidth: 0.1,
    borderColor: "red",
    borderStyle: "solid",
    position: "relative",
    borderRadius: 0.35,
  },
  magnifyingGlassBefore: {
    content: "",
    display: "inline-block",
    position: "absolute",
    right: -0.25,
    bottom: -0.1,
    borderWidth: 0,
    backgroundColor: "red",
    width: 0.35,
    height: 0.08,
    transform: [{ rotate: "45deg" }],
  },

  facebookIcon: {
    backgroundColor: "red",
    textIndent: "-999em",
    width: 100,
    height: 110,
    boxSizing: "content-box",
    borderRadius: 5,
    position: "relative",
    overflow: "hidden",
    borderWidth: 15,
    borderColor: "red",
    borderStyle: "solid",
    borderBottomWidth: 0,
  },
  facebookIconBefore: {
    content: '"/20"',
    position: "absolute",
    backgroundColor: "red",
    width: 40,
    height: 90,
    bottom: -30,
    right: -37,
    borderWidth: 20,
    borderColor: "#eee",
    borderStyle: "solid",
    borderRadius: 25,
    boxSizing: "content-box",
  },
  facebookIconAfter: {
    content: '"/20"',
    position: "absolute",
    width: 55,
    top: 50,
    height: 20,
    backgroundColor: "#eee",
    right: 5,
    boxSizing: "content-box",
  },

  moon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
    shadowColor: "red",
    shadowOffset: { width: 15, height: 15 },
    shadowRadius: 0,
  },

  flag: {
    width: 110,
    height: 56,
    boxSizing: "content-box",
    paddingTop: 15,
    position: "relative",
    backgroundColor: "red",
    color: "white",
    fontSize: 11,
    letterSpacing: 0.2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  flagAfter: {
    content: "",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderBottomWidth: 13,
    borderBottomColor: "#eee",
    borderLeftWidth: 55,
    borderLeftColor: "transparent",
    borderRightWidth: 55,
    borderRightColor: "transparent",
  },

  cone: {
    width: 0,
    height: 0,
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderTopWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
    borderRadius: 50,
  },

  cross: { width: 20, height: 100, backgroundColor: "red", position: "relative" },
  crossAfter: {
    position: "absolute",
    top: 40,
    left: -40,
    width: 100,
    height: 20,
    backgroundColor: "red",
  },

  base: {
    backgroundColor: "red",
    display: "inline-block",
    height: 55,
    marginLeft: 20,
    marginTop: 55,
    position: "relative",
    width: 100,
  },
  baseBefore: {
    borderBottomWidth: 35,
    borderBottomColor: "red",
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    content: "",
    height: 0,
    left: 0,
    position: "absolute",
    top: -35,
    width: 0,
  },

  pointer: {
    width: 200,
    height: 40,
    position: "relative",
    backgroundColor: "red",
  },
  pointerAfter: {
    content: "",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: "white",
    borderTopWidth: 20,
    borderTopColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "transparent",
  },
  pointerBefore: {
    content: "",
    position: "absolute",
    right: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: "red",
    borderTopWidth: 20,
    borderTopColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "transparent",
  },

  lock: {
    fontSize: 8,
    position: "relative",
    width: 18,
    height: 13,
    borderRadius: 2,
    top: 10,
    boxSizing: "border-box",
    border: 3.5,
    borderRightWidth: 7.5,
    borderLeftWidth: 7.5,
    margin: 0,
  },
  lockBefore: {
    content: "",
    boxSizing: "border-box",
    position: "absolute",
    border: 2.5,
    borderColor: "red",
    width: 14,
    height: 12,
    left: "50%",
    marginLeft: -7,
    top: -12,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  lockAfter: {
    content: "",
    boxSizing: "border-box",
    position: "absolute",
    border: "1em solid red",
    width: "5em",
    height: "8em",
    borderRadius: "2.5em",
    left: "50%",
    top: "-1em",
    marginLeft: "-2.5em",
  },

  curvedCornerBottomLeft: {
    width: 100,
    height: 100,
    overflow: "hidden",
    position: "relative",
  },
  curvedCornerBottomRight: {
    width: 100,
    height: 100,
    overflow: "hidden",
    position: "relative",
  },
  curvedCornerTopLeft: {
    width: 100,
    height: 100,
    overflow: "hidden",
    position: "relative",
  },
  curvedCornerTopRight: {
    width: 100,
    height: 100,
    overflow: "hidden",
    position: "relative",
  },

  curvedCornerBottomLeftBefore: {
    content: "",
    display: "block",
    width: "200%",
    height: "200%",
    position: "absolute",
    borderRadius: "50%",
    bottom: 0,
    left: 0,
    boxShadow: "-50px 50px 0 0 red",
  },
  curvedCornerBottomRightBefore: {
    content: "",
    display: "block",
    width: "200%",
    height: "200%",
    position: "absolute",
    borderRadius: "50%",
    bottom: 0,
    right: 0,
    boxShadow: "50px 50px 0 0 red",
  },
  curvedCornerTopLeftBefore: {
    content: "",
    display: "block",
    width: "200%",
    height: "200%",
    position: "absolute",
    borderRadius: "50%",
    top: 0,
    left: 0,
    boxShadow: "-50px -50px 0 0 red",
  },
  curvedCornerTopRightBefore: {
    content: "",
    display: "block",
    width: "200%",
    height: "200%",
    position: "absolute",
    borderRadius: "50%",
    top: 0,
    right: 0,
    boxShadow: "50px -50px 0 0 red",
  },
})

import { createAnimations } from "@tamagui/animations-react-native"
import { shorthands } from "@tamagui/shorthands"

import { createGenericFont } from "@tamagui/config"
import { color, radius, size, space, themes, zIndex } from "@tamagui/themes"

import { createTamagui, createTokens } from "tamagui"

const bodyFont = createGenericFont(
  "Inter_600SemiBold",
  {
    weight: {
      1: "400",
      7: "600",
    },
    size: {
      1: 11,
      2: 12,
      3: 13,
      4: 14,
      5: 16,
      6: 18,
      7: 20,
      8: 22,
      9: 30,
      10: 42,
      11: 52,
      12: 62,
      13: 72,
      14: 92,
      15: 114,
      16: 124,
    },
  },
  {
    sizeLineHeight: (x) => x * 1.5,
  },
)

const tokens = createTokens({
  color: {
    ...color,
    primary: "#017ACB",
    primaryBg: "#D1E1CB",
    accent: "#531253",
    accentBg: "#F7DEFF",
    background: "#E8D8C7",
    juicyGreen: "#004643",
  },
  radius,
  zIndex,
  space,
  size,

  // testing
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
})

const animations = createAnimations({
  fast: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: "timing",
    damping: 20,
    stiffness: 60,
  },
  "100ms": {
    type: "timing",
    duration: 100,
  },
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
  quick: {
    duration: 10,
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
})

export default createTamagui({
  themes,

  tokens,

  shorthands,

  animations,

  fonts: {
    body: bodyFont,
    heading: bodyFont,
  },
})

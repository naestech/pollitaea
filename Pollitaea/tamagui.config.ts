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

export default createTamagui({
  themes,

  tokens,

  shorthands,

  fonts: {
    body: bodyFont,
    heading: bodyFont,
  },
})

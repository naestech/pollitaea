import { shorthands } from "@tamagui/shorthands"

import { createGenericFont } from "@tamagui/config"
import { themes, tokens } from "@tamagui/themes"

import { createTamagui } from "tamagui"

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

export const TamaguiConfig = createTamagui({
  themes,

  tokens,

  shorthands,

  fonts: {
    body: bodyFont,
    heading: bodyFont,
  },
})

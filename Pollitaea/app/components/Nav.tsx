import { Home, Newspaper, User2, Vote } from "@tamagui/lucide-icons"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"
import { Separator, Tabs, getTokens } from "tamagui"

export interface NavProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navProps: AppStackScreenProps<"Home" | "Welcome">
}

/**
 * Describe your component here
 */
export const Nav = observer(function Nav(props: NavProps) {
  const { style } = props
  const isIos = Platform.OS === "ios"
  const tokens = getTokens()

  return (
    <Tabs
      value={props.navProps.route.name}
      separator={<Separator vertical />}
      backgroundColor="green"
      orientation="horizontal"
      flexDirection="column"
      marginHorizontal="auto"
      width="103%"
      marginLeft={-5}
      alignContent="center"
      borderRadius={0}
      position="absolute"
      bottom={isIos ? "0%" : "5.2%"}
    >
      <Tabs.List aria-label="Select screen" height="10%">
        <Tabs.Tab flex={1} value="Home">
          <Home />
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="Ballot">
          <Vote />
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="News">
          <Newspaper />
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="Profile">
          <User2 />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
})

import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Home, LogOut, Newspaper, User2, Vote } from "@tamagui/lucide-icons"
import { useStores } from "app/models"
import { AppStackParamList } from "app/navigators"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"
import { Button, Separator, Tabs, XStack } from "tamagui"

export type NavList =
  | NativeStackNavigationProp<AppStackParamList, "Welcome", undefined>
  | NativeStackNavigationProp<AppStackParamList, "Home", undefined>
  | NativeStackNavigationProp<AppStackParamList, "Profile", undefined>
/**
 * @description Passes page info to navbar, keeps propper button highlighted, etc,
 * Errors out if page doesn't exist yet
 */
export interface NavProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Navigation object, useful for intelisense and providing the propper propertiies to each page
   * @todo Add page property object for when pages need it
   */
  navigation: NavList
  route: RouteProp<AppStackParamList, "Home" | "Welcome" | "Profile">
  children?: React.ReactNode
}

/**
 * state: Readonly<{
    key: string;
    index: number;
    routeNames: string[];
    history?: unknown[];
    routes: NavigationRoute<ParamListBase, string>[];
    type: string;
    stale: false;
}>
 */

/**
 * @description Navbar for navigating across the app
 * @param
 */
export const Nav = observer(function Nav({ children, navigation, route }: NavProps) {
  const isIos = Platform.OS === "ios"
  const store = useStores()

  return (
    <>
      <XStack
        display="flex"
        backgroundColor="whitesmoke"
        alignContent="space-around"
        flexDirection="row-reverse"
        elevationAndroid={2}
        height="10%"
      >
        <Button
          marginHorizontal="$5"
          marginTop="$6"
          icon={LogOut}
          onPressOut={() => store.user.logout(navigation)}
        />
      </XStack>
      {children || undefined}
      <Tabs
        defaultValue="Home"
        value={route.name}
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
          <Tabs.Tab
            flex={1}
            value="Home"
            onPress={() => (route.name !== "Home" ? navigation.replace("Home") : undefined)}
          >
            <Home />
          </Tabs.Tab>
          <Tabs.Tab
            flex={1}
            value="Ballot"
            // onPress={() =>
            //   route.name !== "Ballot" ? navigation.replace("Ballot") : undefined
            // }
          >
            <Vote />
          </Tabs.Tab>
          <Tabs.Tab
            flex={1}
            value="News"
            // onPress={() =>
            //   route.name !== "News" ? navigation.replace("News") : undefined
            // }
          >
            <Newspaper />
          </Tabs.Tab>
          <Tabs.Tab
            flex={1}
            value="Profile"
            onPress={() => (route.name !== "Profile" ? navigation.replace("Profile") : undefined)}
          >
            <User2 />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  )
})

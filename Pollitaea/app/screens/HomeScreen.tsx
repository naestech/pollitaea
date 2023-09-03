import { Home, Newspaper, User2, Vote } from "@tamagui/lucide-icons"
import { Nav, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Platform } from "react-native"
import { Separator, Tabs, View, YStack, getTokens } from "tamagui"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer((props: HomeScreenProps) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={containerStyle} height="100%">
      <YStack>
        <Text text="Home" />
      </YStack>
      <Nav navProps={props} />
    </View>
  )
})

import { Nav, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, YStack } from "tamagui"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={containerStyle} height="100%">
      <Nav navigation={navigation} route={route}>
        <YStack>
          <Text text="Home" />
        </YStack>
      </Nav>
    </View>
  )
})

import { Nav, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { YStack } from "tamagui"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  return (
    <Nav navigation={navigation} route={route}>
      <YStack style={containerStyle}>
        <Text text="Home" />
      </YStack>
    </Nav>
  )
})

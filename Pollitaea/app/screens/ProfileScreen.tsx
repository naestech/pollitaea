import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Text, View, YStack } from "tamagui"
// import { useStores } from "app/models"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  return (
    <View style={containerStyle} height="100%">
      <YStack>
        <Text textAlign="center">Profile</Text>
      </YStack>
    </View>
  )
})

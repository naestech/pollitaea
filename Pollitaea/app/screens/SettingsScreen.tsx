/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Avatar, Separator, Switch, XStack, YStack } from "tamagui"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(({ navigation, route }) => {
  // Pull in one of our MST stores
  const store = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Nav navigation={navigation} route={route}>
      <YStack
        separator={<Separator opacity={0.5} marginHorizontal="$-3" />}
        space
        paddingHorizontal="$3"
        marginVertical="$3"
      >
        <Text style={{ textAlignVertical: "center" }} size="lg">
          Profile:
        </Text>
        <XStack justifyContent="space-between">
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Change Profile Picture
          </Text>
          {store.user.avatar_url ? (
            <Avatar borderColor="aliceblue" size="$3" borderRadius="$5" marginHorizontal="$3">
              <Avatar.Image src={store.user.avatar_url} />
              <Avatar.Fallback borderColor="aqua" />
            </Avatar>
          ) : undefined}
        </XStack>
        <Text style={{ textAlignVertical: "center" }} size="sm">
          Change Username & Email
        </Text>
        <Text style={{ textAlignVertical: "center" }} size="sm">
          Change Bio & Website
        </Text>
        <Text style={{ textAlignVertical: "center" }} size="lg">
          Settings:
        </Text>
        <XStack justifyContent="space-between">
          <Text
            style={{ textAlignVertical: "center", textDecorationLine: "line-through" }}
            size="sm"
          >
            Dark Mode
          </Text>
          <Switch alignSelf="center" size="$3" disabled checked={false} />
        </XStack>
        <Text style={{ textAlignVertical: "center" }} size="sm">
          Apply for a Professional Account
        </Text>
        <Text size="sm" onPressOut={() => store.user.logout(navigation)}>
          Logout
        </Text>
        <Text size="sm" style={{ color: "maroon" }}>
          Deactivate Account
        </Text>
      </YStack>
    </Nav>
  )
})

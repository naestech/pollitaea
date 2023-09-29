/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { handleProfileUpdate } from "app/services/settingsHelper"
import { createToast } from "app/utils/common"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Avatar, Separator, Switch, XStack, YStack } from "tamagui"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(({ navigation, route }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const toast = useToastController()
  const hasAvatar = store.user?.avatar_url !== ""


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
        <XStack
          justifyContent="space-between"
          onPress={async () => {
            await handleProfileUpdate(toast, hasAvatar, store)
          }}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Change Profile Picture
          </Text>
          {store.user?.avatar_url ? (
            <Avatar borderColor="aliceblue" size="$4" borderRadius="$5" marginHorizontal="$3">
              <Avatar.Image src={store.user.avatar_url} />
              <Avatar.Fallback borderColor="aqua" />
            </Avatar>
          ) : undefined}
        </XStack>
        <XStack
          justifyContent="space-between"
          onPress={() => createToast(toast, "Change creds")}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Change Username & Email
          </Text>
        </XStack>
        <XStack
          justifyContent="space-between"
          onPress={() => createToast(toast, "Change profile info")}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Change Bio & Website
          </Text>
        </XStack>
        <XStack>
          <Text style={{ textAlignVertical: "center" }} size="lg">
            Settings:
          </Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text
            style={{ textAlignVertical: "center", textDecorationLine: "line-through" }}
            size="sm"
          >
            Dark Mode
          </Text>
          <Switch alignSelf="center" size="$3" disabled checked={false} />
        </XStack>
        <XStack
          justifyContent="space-between"
          onPress={() => createToast(toast, "Apply for pro-account")}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Apply for a Professional Account
          </Text>
        </XStack>
        <XStack
          justifyContent="space-between"
          onPressOut={() => {
            store.user.logout()
            navigation.navigate("Welcome")
          }}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text size="sm">Logout</Text>
        </XStack>
        <XStack
          justifyContent="space-between"
          onPress={() => createToast(toast, "Deactivate Account")}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text size="sm" style={{ color: "maroon" }}>
            Deactivate Account
          </Text>
        </XStack>
      </YStack>
    </Nav>
  )
})

// ((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))

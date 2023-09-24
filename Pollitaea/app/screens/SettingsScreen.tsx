/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import * as ImagePicker from "expo-image-picker"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Avatar, Separator, Switch, XStack, YStack } from "tamagui"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(({ navigation, route }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const toast = useToastController()
  const hasAvatar = store.user?.avatar_url != null

  useEffect(() => {
    if (!hasAvatar) {
      // Refresh avatar if this is fresh off signup/login
      supabase
        .from("profiles")
        .select("*")
        .eq("id", store.user.id)
        .single()
        .then(({ data, error }) => {
          if (error) console.error(error)
          if (data) {
            supabase.auth.getUser().then(({ data: { user } }) => {
              store.user.hydrateProfile(data, user)
            })
          }
        })
    }
  }, [])

  const handleFileSelect = async () => {
    createToast(toast, "Change profile pic :)")
    await ImagePicker.getMediaLibraryPermissionsAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 5,
    })
      .then((img) => {
        console.log("Successfully picked image")

        if (!img.canceled) {
          if (
            !(
              // img.assets[0].uri.toLowerCase().includes(".png") ||
              (
                img.assets[0].uri.toLowerCase().includes(".jpeg") ||
                img.assets[0].uri.toLowerCase().includes(".jpg")
              )
            )
          ) {
            createToast(toast, "Only jpg and png files allowed")
            return
          }
          if (hasAvatar) {
            supabase.storage
              .from("avatars")
              .update(store.user.id+ "/avatar", img.assets[0].base64, { upsert: true })
              .then(({ data: { path }, error: { message } }) => {
                if (message) {
                  createToast(toast, "Error - " + message)
                } else {
                  createToast(toast, "Successful save, now update db")
                  supabase
                    .from("profiles")
                    .update({
                      avatar_url: supabase.storage.from("avatars").getPublicUrl(path).data
                        .publicUrl,
                    })
                    .eq("id", store.user.id)
                }
              })
              .catch((err) => {
                createToast(toast, err.message)
                console.log("storage error")
                console.log(err)
              })
          } else {
            const imageUri = img.assets[0].uri.split(".")
            supabase.storage.from("avatars").upload(
              "/" + store.user.id + "/avatar/" + imageUri[0],
              // imageUri[imageUri.length - 1],
              img.assets[0].base64,
              { upsert: true },
            )
          }
        }
      })
      .catch((err) => {
        console.log("Error picking image")
        console.log(err)
      })
  }

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
          onPress={handleFileSelect}
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
          onPress={() => createToast(toast, "Attempt Logout")}
          onPressOut={() => store.user.logout(navigation)}
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

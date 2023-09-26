/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { Buffer } from "buffer"
import {
  MediaTypeOptions,
  UIImagePickerPreferredAssetRepresentationMode,
  getMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Avatar, Separator, Switch, XStack, YStack } from "tamagui"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(({ navigation, route }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const toast = useToastController()
  const hasAvatar = store.user?.avatar_url !== ""

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
    await getMediaLibraryPermissionsAsync()

    launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.4,
      aspect: [1, 1],
      allowsEditing: true,
      preferredAssetRepresentationMode: UIImagePickerPreferredAssetRepresentationMode.Automatic,
      base64: true,
    })
      .then(async (img) => {
        console.log("Successfully picked image")
        if (!img.canceled) {
          const selectedImage = img.assets[0]
          const isPng = selectedImage.uri.toLowerCase().includes(".png")
          if (
            !(
              selectedImage.uri.toLowerCase().includes(".png") ||
              selectedImage.uri.toLowerCase().includes(".jpeg") ||
              selectedImage.uri.toLowerCase().includes(".jpg")
            )
          ) {
            createToast(toast, "Only jpg and png files allowed")
            return
          }
          const fileData = Uint8Array.from(Buffer.from(selectedImage.base64, "base64"))

          if (hasAvatar) {
            console.debug("Updating present avi")
            supabase.storage
              .from("avatars")
              .update(`/${store.user.id}/avatar.${isPng ? "png" : "jpg"}`, fileData, {
                upsert: true,
                contentType: `image/${isPng ? "png" : "jpg"}`,
                cacheControl: "500",
              })
              .then(({ data, error }) => {
                console.log(data, error)

                if (error?.message) {
                  createToast(toast, "Error - " + error?.message)
                } else {
                  console.debug("Good Upload")

                  createToast(
                    toast,
                    "Successful save, image url - " +
                      supabase.storage.from("avatars").getPublicUrl(data.path),
                  )
                  supabase
                    .from("profiles")
                    .update({
                      avatar_url: supabase.storage.from("avatars").getPublicUrl(data.path).data
                        .publicUrl,
                    })
                    .eq("id", store.user.id)
                    .then((res) => console.log(res))
                }
              })
              .catch((err) => {
                createToast(toast, err.message)
                console.log("storage update error")
                console.log(err)
              })
          } else {
            console.debug("Creating new avi")
            supabase.storage
              .from("avatars")
              .upload(`/${store.user.id}/avatar.${isPng ? "png" : "jpg"}`, fileData, {
                upsert: true,
                contentType: `image/${isPng ? "png" : "jpg"}`,
                cacheControl: "500",
              })
              .then(({ data, error }) => {
                if (error?.message !== null) {
                  createToast(toast, "Error - " + error?.message)
                } else {
                  console.debug("Good Upload")
                  createToast(
                    toast,
                    "Successful save, image url - " +
                      supabase.storage.from("avatars").getPublicUrl(data?.path),
                  )
                  supabase
                    .from("profiles")
                    .update({
                      avatar_url: supabase.storage.from("avatars").getPublicUrl(data?.path).data
                        .publicUrl,
                    })
                    .eq("id", store.user.id)
                    .then((res) => console.log(res))
                }
              })
              .catch((err) => {
                createToast(toast, err.message)
                console.log("storage insert error")
                console.log(err)
              })
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

//((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))

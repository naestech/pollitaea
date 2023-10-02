/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { api } from "app/services/api"
import { handleProfilePicUpdate } from "app/services/settingsHelper"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import {
  Avatar,
  Button,
  Input,
  Label,
  Separator,
  Sheet,
  Switch,
  TextArea,
  XStack,
  YStack,
  getTokens,
} from "tamagui"
import { emailVal, usernamePattern } from "./WelcomeScreen"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(({ navigation, route }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const tokens = getTokens()
  const toast = useToastController()
  const [editOption, setEditOption] = useState<undefined | "User" | "Tag">(undefined)
  const [username, setUsername] = useState(store.user.username)
  const [validUsername, setValidUsername] = useState(true)
  const [email, setEmail] = useState(store.user.email)
  const [validEmail, setValidEmail] = useState(true)
  const [tag, setTag] = useState(store.user.tag)
  const [website, setWebsite] = useState(store.user.external_url)

  const hasAvatar = store.user?.avatar_url !== ""
  const urlVal =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi

  const handleProfileUpdate = (editRequest: "User" | "Tag") => {
    console.debug(editRequest)

    if (editOption === "Tag") {
      if (website?.length === 0 || urlVal.test(website)) {
        // Update db
        supabase
          .from("profiles")
          .update({ tag, external_url: website }, { count: "planned" })
          .eq("id", store.user.id)
          .select()
          .single()
          .then(({ data, error }) => {
            if (data) {
              console.debug("Updated Profile")
              console.debug(data)
              store.user.hydrateProfile(data)
            } else {
              console.debug("Error during profile update")
              console.debug(error)
              createToast(toast, "Error during profile update")
            }
          })
      } else {
        createToast(toast, "Website needs to be empty or valid url")
      }
    } else {
      if (emailVal.test(email)) setValidEmail(false)
      if (username === "" || usernamePattern.test(username)) setValidEmail(false)

      api.apisauce
        .put(
          "/api/auth",
          editRequest === "User"
            ? {
                method: editRequest,
                username,
                email,
              }
            : { method: editRequest, tag, website },
        )
        .then()
        .catch()
    }
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
          onPressOut={async () => {
            await handleProfilePicUpdate(toast, hasAvatar, store)
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
            <Avatar size="$4" borderRadius="$5" marginHorizontal="$3">
              <Avatar.Image src={store.user.avatar_url} />
              <Avatar.Fallback borderColor="aqua" />
            </Avatar>
          ) : undefined}
        </XStack>
        <XStack
          justifyContent="space-between"
          onPressOut={() => {
            createToast(toast, "Change creds")
            setEditOption("User")
          }}
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
          onPressOut={() => setEditOption("Tag")}
          animation="quick"
          pressStyle={{
            opacity: 0.3,
            // borderColor: "black",
            elevation: "$2",
          }}
        >
          <Text style={{ textAlignVertical: "center" }} size="sm">
            Change Tagline & Website
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
          onPressOut={() => createToast(toast, "Apply for pro-account")}
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
          onPressOut={() => createToast(toast, "Deactivate Account")}
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
      <Sheet
        modal={true}
        open={editOption !== undefined}
        dismissOnOverlayPress
        dismissOnSnapToBottom
        moveOnKeyboardChange
        unmountChildrenWhenHidden
        onOpenChange={(e) => {
          if (e === false) {
            setEditOption(undefined)
            setTag(undefined)
            setWebsite(undefined)
            setUsername(undefined)
            setValidUsername(true)
            setEmail(undefined)
            setValidEmail(true)
          }
        }}
        snapPoints={[50]}
        animation="quick"
      >
        <Sheet.Overlay animation="quick" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame
          // @ts-ignore
          backgroundColor={tokens.color.background}
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          {editOption === "User" ? (
            <YStack space width="70%" alignItems="center">
              <Input
                borderRadius={5}
                width="90%"
                color="$accent"
                placeholder={validUsername ? store.user.username : "Enter a valid email"}
                backgroundColor="$accentBg"
                paddingHorizontal="$4"
                value={username}
                defaultValue={store.user.username}
                aria-label="username"
                inputMode="text"
                importantForAutofill="auto"
                onChangeText={(e) => {
                  setValidUsername(true)
                  setUsername(e)
                }}
              />
              <Input
                borderRadius={5}
                width="90%"
                color="$accent"
                placeholder={validEmail ? store.user.email : "Enter a valid email"}
                backgroundColor="$accentBg"
                paddingHorizontal="$4"
                value={email}
                defaultValue={store.user.email}
                aria-label="email"
                inputMode="email"
                importantForAutofill="auto"
                onChangeText={(e) => {
                  setValidEmail(true)
                  setEmail(e)
                }}
              />
            </YStack>
          ) : (
            <YStack space="$1" width="100%" alignItems="center">
              <Label color="$juicyGreen" htmlFor="tagline">
                Tagline
              </Label>
              <TextArea
                borderRadius={5}
                width="75%"
                numberOfLines={2}
                maxLength={25}
                color="$accent"
                placeholder={store.user.tag?.length === 0 ? store.user.tag : "Lorem ipsum"}
                backgroundColor="$accentBg"
                paddingHorizontal="$4"
                value={tag}
                defaultValue={store.user.tag}
                aria-label="tagline"
                id="tagline"
                inputMode="text"
                importantForAutofill="auto"
                onChangeText={(e) => setTag(e)}
              />
              <Label color="$juicyGreen" htmlFor="personal-website">
                External Url
              </Label>
              <Input
                borderRadius={5}
                width="75%"
                color="$accent"
                placeholder={
                  store.user.external_url?.length < 3 ? store.user.external_url : "lorem.ipsum.com"
                }
                backgroundColor="$accentBg"
                paddingHorizontal="$4"
                value={website}
                defaultValue={store.user.external_url}
                aria-label="personal-website"
                id="personal-website"
                inputMode="url"
                importantForAutofill="auto"
                onChangeText={setWebsite}
              />
            </YStack>
          )}
          <Button size="$4" width="50%" onPressOut={() => handleProfileUpdate(editOption)}>
            Submit
          </Button>
        </Sheet.Frame>
      </Sheet>
    </Nav>
  )
})

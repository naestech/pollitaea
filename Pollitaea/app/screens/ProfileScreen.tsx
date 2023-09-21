/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Nav, Text } from "app/components"
import { Profile } from "app/config/schema"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Button, Image, YStack } from "tamagui"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const [profile, setProfile] = useState<Profile | undefined>()
  const toast = useToastController()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  useEffect(() => {
    if (route.params?.userId) {
      // User is passed via search
      supabase
        .from("profiles")
        .select("*")
        .eq("id", route.params.userId)
        .single()
        .then(({ data, error }) => {
          console.log(data, error)
          if (data) {
            setProfile(data)
          } else {
            createToast(toast, error.message)
          }
        })
    } else {
      // Has db user info, not just auth data
      supabase
        .from("profiles")
        .select("*")
        .eq("id", store.user.id)
        .single()
        .then(({ data, error }) => {
          console.log(data, error)
          if (data) {
            setProfile(data)
            supabase.auth.getUser().then(({ data: { user } }) => {
              store.user.hydrateProfile(data, user)
            })
          }
        })
    }
  }, [])

  return (
    <Nav navigation={navigation} route={route}>
      <YStack style={containerStyle} marginVertical="$1" space="$3">
        <Image
          alignSelf="center"
          borderRadius="$5"
          source={{
            uri: profile?.avatar_url,
            height: 150,
            width: 150,
          }}
        />
        <YStack>
          <Text style={{ textAlign: "center", fontWeight: "bold" }} size="md">
            {profile?.full_name}
          </Text>
          <Text style={{ textAlign: "center", opacity: 0.6 }} size="sm">
            @{profile?.username}
          </Text>
          <Text style={{ textAlign: "center" }} size="sm">
            {profile?.tag}
          </Text>
          <Text style={{ textAlign: "center", marginLeft: -4 }} size="sm">
            📍{profile?.location}
          </Text>
          <Text style={{ textAlign: "center" }} size="sm">
            {profile?.role === "GOV" ? profile.location : undefined}
          </Text>
          <Text style={{ textAlign: "center" }} size="sm">
            {profile?.external_url}
          </Text>
        </YStack>
        <Button
          width="25%"
          backgroundColor="$juicyGreen"
          alignSelf="center"
          borderRadius="$8"
          onPress={() => createToast(toast, "Followed")}
        >
          Follow
        </Button>
      </YStack>
    </Nav>
  )
})

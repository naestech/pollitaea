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
    if (route.params?.userId && route.params?.userId !== store.user.id) {
      // User is passed via search
      supabase
        .from("profiles")
        .select("*")
        .eq("id", route.params.userId)
        .single()
        .then(({ data, error }) => {
          if (data) {
            setProfile(data)
          } else {
            createToast(toast, error.message)
          }
        })
    } else {
      // @ts-ignore
      setProfile(store.user)
    }
  }, [])

  return (
    <Nav navigation={navigation} route={route}>
      <YStack style={containerStyle} marginVertical="$5" space="$3">
        <Image
          alignSelf="center"
          borderRadius="$5"
          borderColor={profile?.avatar_url ? undefined : "black"}
          borderWidth={profile?.avatar_url ? undefined : 2}
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
          disabled={profile?.id === store.user.id}
          backgroundColor={profile?.id === store.user.id ? undefined : "$juicyGreen"}
          alignSelf="center"
          borderRadius="$8"
          onPress={() => createToast(toast, "Followed")}
        >
          {profile?.id === store.user.id ? "Edit Profile" : "Follow"}
        </Button>
      </YStack>
    </Nav>
  )
})

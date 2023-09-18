import { Nav, Text } from "app/components"
import { Profile } from "app/config/schema"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { supabase } from "app/utils/supabaseClient"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, YStack } from "tamagui"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  const store = useStores()
  const [profile, setProfile] = useState<Profile>()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])

  useEffect(() => {
    // if (!store.user.profilePic)
    supabase
      .from("profiles")
      .select("*")
      .eq("id", store.user.id)
      .single()
      .then(({ data, error }) => {
        console.log(data, error)
        if (data) {
          setProfile(data)
          store.user.setProfilePic(data.avatar_url)
        }
      })
  }, [])

  return (
    <Nav navigation={navigation} route={route}>
      <YStack style={containerStyle} marginVertical="$1" space="$3">
        <Image
          alignSelf="center"
          source={{
            uri: profile?.avatar_url,
            height: 150,
            width: 150,
          }}
        />
        <YStack>
          <Text text="Profile" />
        </YStack>
      </YStack>
    </Nav>
  )
})

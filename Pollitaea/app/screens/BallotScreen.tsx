import { Nav, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Separator, Image, XStack, YStack } from "tamagui"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface BallotScreenProps extends AppStackScreenProps<"Ballot"> {}

export const BallotScreen: FC<BallotScreenProps> = observer(function BallotScreen({
  navigation,
  route,
}) {
  // Pull in one of our MST stores
  const { address, user } = useStores()

  const [election, setElection] = useState({ election_date: "" })

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Nav navigation={navigation} route={route}>
      <XStack justifyContent="space-evenly">
        <Image
          borderRadius="$5"
          borderColor={user?.avatar_url ? "black" : undefined}
          borderWidth={user?.avatar_url ? 2 : undefined}
          source={{
            uri: user?.avatar_url,
            height: 150,
            width: 150,
          }}
        />
        <YStack style={{ textJustify: "inter-word" }}>
          <Text size="xl">Hello {user.username}</Text>
          <Text size="xl">Your next election date is {user.username}</Text>
        </YStack>
      </XStack>
      <Separator />
      {address?.street ? (
        <Text text="Address Present" />
      ) : (
        <Text text="Enter your address to search for Voter or Representative information" />
      )}
    </Nav>
  )
})

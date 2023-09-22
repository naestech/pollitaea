/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { FlashList } from "@shopify/flash-list"
import { Search, Verified } from "@tamagui/lucide-icons"
import { useToastController } from "@tamagui/toast"
import { Nav } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Avatar, H4, Input, Separator, Text, View, XStack, YStack, useDebounce } from "tamagui"

interface SearchScreenProps extends AppStackScreenProps<"Search"> {}
interface SupabaseResult {
  id: string
  avatar_url: string
  full_name: string
  username: string
  role: "STOCK" | "GOV" | "PREMIUM" | "ADMIN"
}

export const SearchScreen: FC<SearchScreenProps> = observer(({ route, navigation }) => {
  // Pull in one of our MST stores
  // const store = useStores()
  const containerStyle = useSafeAreaInsetsStyle(["top", "left", "right"])
  const toast = useToastController()

  const [count, setCount] = useState(0)
  const [results, setResults] = useState<SupabaseResult[]>([
    {
      id: "",
      avatar_url: "",
      full_name: "",
      username: "",
      role: "STOCK",
    },
  ])

  const handleSearch = (query: string): void => {
    console.log(query)
    supabase
      .from("profiles")
      .select("id, avatar_url, full_name, username, role")
      .textSearch("user_description", query) // Added a computed column that holds username and full name together
      .limit(7)
      .then(({ count, data, error, statusText }) => {
        if (error) {
          createToast(toast, "There was an issue during the search")
          console.error(statusText)
          console.error(error.message)
        } else {
          console.log(data)
          setResults(data)
          setCount(count)
          console.log("results")
          console.log(results)
        }
      })
  }

  return (
    <Nav navigation={navigation} route={route}>
      <YStack style={containerStyle} alignItems="center">
        <XStack space>
          <View style={{ alignSelf: "center" }}>
            <Search size="$2" color="$accent" />
          </View>
          <Input
            size="$3"
            width="75%"
            placeholder="Jane Doe"
            color="$accent"
            borderRadius="$7"
            backgroundColor="#E8D8C7"
            onChangeText={useDebounce((e) => handleSearch(e), 400)}
          />
        </XStack>
      </YStack>
      <Separator marginVertical="$5" />
      <FlashList
        ListHeaderComponent={
          <H4 color="gray" marginVertical="$1" marginHorizontal="$-3">
            People:
          </H4>
        }
        contentContainerStyle={{ paddingHorizontal: 25 }}
        estimatedItemSize={76}
        renderItem={({ item }) => (
          <QueryResult
            key={item.id}
            avatar_url={item.avatar_url}
            full_name={item.full_name}
            id={item.id}
            role={item.role}
            username={item.username}
          />
        )}
        data={results}
      />
    </Nav>
  )
})

const QueryResult = (item: SupabaseResult) => {
  const [pressed, setPressed] = useState(false)
  return (
    <XStack
      key={item.id}
      space
      animation="100ms"
      borderRadius="$7"
      borderStyle="solid"
      borderWidth={0}
      borderColor="black"
      pressStyle={{
        borderWidth: 1.2,
        borderColor: "black",
      }}
      onPressIn={() => {
        setPressed(!pressed)
        console.log(`State Change - pressed(${pressed})`)
      }}
    >
      <Avatar
        borderColor="aliceblue"
        size="$6"
        borderRadius="$5"
        marginHorizontal="$3"
        marginVertical="$2"
      >
        <Avatar.Image src={item.avatar_url} />
        <Avatar.Fallback borderColor="aqua" />
      </Avatar>
      {item.role === "GOV" ? (
        <YStack justifyContent="center" marginVertical="auto">
          <Text color="black">{item.full_name}</Text>
          <XStack space="$2">
            <Text color="gray" opacity={0.8}>
              @{item.username}
            </Text>
            <Verified size="$1" color="blue" />
          </XStack>
        </YStack>
      ) : (
        <YStack>
          <YStack justifyContent="center" marginVertical="auto">
            <Text color="black">{item.full_name}</Text>
            <XStack space="$2">
              <Text color="gray" opacity={0.8}>
                @{item.username}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      )}
    </XStack>
  )
}

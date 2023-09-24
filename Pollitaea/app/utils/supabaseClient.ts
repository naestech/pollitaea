import { createClient } from "@supabase/supabase-js"
import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { Database } from "app/config/schema"

const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL

// These are only transpiled after being used for some reason
console.trace({
  supabaseAnonKey,
  supabaseUrl,
})

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

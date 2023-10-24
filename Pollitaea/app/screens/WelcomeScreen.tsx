/* eslint-disable react-native/no-inline-styles */
import { useToastController } from "@tamagui/toast"
import { Text } from "app/components"
import { fetchUser, useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { APIError, SignUpResponse, api } from "app/services/api"
import { createToast, fetchSecret } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { Platform } from "expo-modules-core"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView } from "react-native"
import {
  Anchor,
  Button,
  Form,
  Image,
  Input,
  ScrollView,
  Separator,
  Spinner,
  XStack,
  YStack,
} from "tamagui"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")

export type WelcomeScreenProps = AppStackScreenProps<"Welcome">

// Email validation regex
export const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const numberPattern = /^[0-9]+$/
export const usernamePattern = /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>/?`~]+$/ // /^[a-zA-Z0-9_]+$/

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const [status, setStatus] = useState<"off" | "submitting">("off")

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [phone, setPhone] = useState("")
  const [validPhone, setValidPhone] = useState(true)
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(true)

  const [isLogin, setIsLogin] = useState(true)
  const store = useStores()
  const toast = useToastController()

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        if (res.data) {
          createToast(toast, "Welcome back")
          navigation.replace("Home")
        } else {
          console.log("new user")
        }
      })
      .catch()
  }, [])

  const handleAuth = async () => {
    setStatus("submitting")

    setValidEmail(true)
    setValidPassword(true)
    setValidPhone(true)
    setValidUsername(true)
    setValidPasswordConfirm(true)

    if (emailVal.test(email)) setValidEmail(false)
    if (password.length < 8) setValidPassword(false)
    if (!phone && numberPattern.test(phone)) setValidPhone(false)
    if (!usernamePattern.test(username) || username.length == null || username.length < 5)
      setValidUsername(false)
    if (password.match(passwordConfirm)) setValidPasswordConfirm(false)

    if (!isLogin) {
      if (!(validEmail && validPassword && validPhone && validUsername && validPasswordConfirm)) {
        setStatus("off")
        createToast(toast, "Invalid Inputs")
      } else {
        await api.apisauce
          .post<SignUpResponse, APIError>("/api/auth", {
            secret: await fetchSecret(),
            email,
            password,
            phone,
            username,
            fName,
            lName,
          })
          .then(() => {
            // Progress to next page
            supabase.auth
              .resend({ email, type: "signup" })
              .then(() => createToast(toast, "Welcome to Pollitteia, confirm your email though."))
              .catch(() =>
                createToast(toast, "Issue sending your confirmation email, please contact support"),
              )
              .finally(() => navigation.replace("Welcome"))
          })
          .catch((err) => {
            createToast(toast, err.message)
            setStatus("off")
            setEmail("")
            setPassword("")
            setPasswordConfirm("")
            setPhone("")
            setUsername("")
          })
      }
    } else if (isLogin) {
      if (!(validEmail && validPassword)) {
        createToast(toast, "Invalid login")
      } else {
        await supabase.auth
          .signInWithPassword({ email, password })
          .then(async (res) => {
            if (res.data.user && res.data.user.confirmed_at == null) {
              createToast(toast, "Please confirm your email :)")
              supabase.auth.signOut().finally()
            } else if (res.error) {
              createToast(toast, res.error.message)
            } else {
              console.log("User ID" + res.data.user.id)
              const userResult = await fetchUser(res.data.user.id)
              console.log(userResult)
              store.user.login(toast, res.data.user, userResult)
              navigation.replace("Home")
            }
          })
          .catch((err) => {
            console.log(err.message)
            createToast(toast, err.message)
            setStatus("off")
          })
      }
    } else {
      createToast(toast, "Error in auth flow, maybe try again later")
    }
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
    setStatus("off")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <YStack
          style={$containerInsets}
          marginTop="$5"
          paddingHorizontal="$5"
          justifyContent="space-between"
          space="$5"
        >
          <Image
            source={welcomeLogo}
            paddingHorizontal="$4"
            alt="Transparent logo"
            alignSelf="center"
          />
          <Separator alignSelf="stretch" />
          <Form
            alignItems="center"
            marginTop="auto"
            space="$5"
            borderWidth={0}
            padding="$8"
            onSubmit={handleAuth}
          >
            {/* Sign up form fields */}
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder="Erykah"
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={fName}
              aria-label="first-name"
              textContentType="givenName"
              inputMode="text"
              importantForAutofill="auto"
              display={isLogin ? "none" : undefined}
              onChangeText={setFName}
            />
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder="Badu"
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={lName}
              aria-label="last-name"
              textContentType="familyName"
              inputMode="text"
              importantForAutofill="auto"
              display={isLogin ? "none" : undefined}
              onChangeText={setLName}
            />
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder={validUsername ? "Username" : "Enter a valid email"}
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={username}
              aria-label="username"
              inputMode="text"
              importantForAutofill="auto"
              display={isLogin ? "none" : undefined}
              onChangeText={(e) => {
                setValidUsername(true)
                setUsername(e)
              }}
            />
            {/* Login form fields */}
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder={validEmail ? "Email" : "Enter a valid email"}
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={email}
              aria-label="email"
              textContentType="emailAddress"
              inputMode="email"
              importantForAutofill="auto"
              onChangeText={(e) => {
                setValidEmail(true)
                setEmail(e)
              }}
            />
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder={validPassword ? "Password" : "Enter a valid password"}
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={password}
              aria-label="password"
              textContentType="password"
              secureTextEntry
              inputMode="text"
              importantForAutofill="auto"
              onChangeText={(e) => {
                setValidPassword(true)
                setPassword(e)
              }}
            />
            <Input
              borderRadius={5}
              width="90%"
              color="$accent"
              placeholder="Password confirmation"
              backgroundColor="$accentBg"
              paddingHorizontal="$4"
              value={passwordConfirm}
              aria-label="password"
              textContentType="password"
              secureTextEntry
              inputMode="text"
              importantForAutofill="auto"
              display={isLogin ? "none" : undefined}
              onChangeText={(e) => {
                setValidPasswordConfirm(true)
                setPasswordConfirm(e)
              }}
            />
            <Form.Trigger asChild="except-style" disabled={status === "submitting"}>
              <Button size="$5" icon={status === "submitting" ? () => <Spinner /> : undefined}>
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </Form.Trigger>
          </Form>
          <XStack justifyContent="center">
            <Text
              size="md"
              text={isLogin ? "Don't have an account? " : "Already have an account? "}
            />
            <Anchor
              marginVertical="auto"
              color="darkolivegreen"
              textDecorationLine="none"
              textDecorationColor="black"
              onPressOut={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Anchor>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
})

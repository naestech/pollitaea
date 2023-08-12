import { Screen, Text } from "app/components"
import { AppStackScreenProps, navigate } from "app/navigators"
import { useToastController } from "@tamagui/toast"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Anchor, Button, Form, Image, Input, Separator, Spinner, View, XStack } from "tamagui"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { api } from "app/services/api"
import { SignUpResponse, APIError } from "app/types/auth"
import { supabase } from "app/utils/supabaseClient"
import { createToast } from "app/utils/common"

const welcomeLogo = require("../../assets/images/logo.png")

type WelcomeScreenProps = AppStackScreenProps<"Welcome">

// Email validation regex
export const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numberPattern = /^[0-9]+$/
const usernamePattern = /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>/?`~]+$/ // /^[a-zA-Z0-9_]+$/

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const toast = useToastController()
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const [status, setStatus] = useState<"off" | "submitting" | "submitted" | "success" | "errored">(
    "off",
  )
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
  const [gender, setGender] = useState<
    "male" | "female" | "nonbinary" | "other" | "Prefer not to say"
  >("other")

  const [isLogin, setIsLogin] = useState(true)

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
      } else {
        await api.apisauce
          .post<SignUpResponse, APIError>("/api/auth", {
            // secret: await fetchSecret(),
            email,
            password,
            phone,
            username,
          })
          .then(() => {
            // Progress to next page
            supabase.auth
              .resend({ email, type: "signup" })
              .then(() => createToast(toast, "Welcome to TwoTone, confirm your email though."))
              .catch(() =>
                createToast(toast, "Issue sending your confirmation email, please contact support"),
              )
              .finally(() => navigate({ key: "Welcome", name: "Welcome" }))
          })
          .catch((err) => {
            createToast(toast, err.message)
            setStatus("off")
            setEmail("")
            setPassword("")
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
          .then((res) => {
            if (res.data.user && res.data.user.confirmed_at == null) {
              createToast(toast, "Please confirm your email :)")
              supabase.auth.signOut().finally()
            } else if (res.error) {
              createToast(toast, res.error.message)
            } else {
              createToast(toast, "Welcome")
              // store.user.login(res.data.user)
              // navigate({ key: "Home", name: "Home" })
            }
            // set store
            // route to home screen
          })
          .catch(() => {
            createToast(toast, "Error connecting to server, maybe try again later")
            supabase.auth.signOut().finally()
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
    <Screen style={$containerInsets} preset="scroll">
      <View marginTop="$5" paddingHorizontal="$5" justifyContent="space-between" space="$5">
        <Image source={welcomeLogo} marginHorizontal="auto" alt="Transparent logo" />
        <Separator alignSelf="stretch" />
        <Form
          alignItems="center"
          marginTop="auto"
          space="$5"
          borderWidth={0}
          padding="$8"
          onSubmit={handleAuth}
        >
          {/*Sign up form fields*/}
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder="Erykah"
            backgroundColor="$accentBg"
            marginHorizontal="auto"
            value={fName}
            aria-label="first-name"
            textContentType="givenName"
            importantForAutofill="auto"
            display={isLogin ? "none" : undefined}
            onChangeText={(e) => {
              setFName(e)
            }}
          />
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder="Badu"
            backgroundColor="$accentBg"
            marginHorizontal="auto"
            value={lName}
            aria-label="last-name"
            textContentType="familyName"
            importantForAutofill="auto"
            display={isLogin ? "none" : undefined}
            onChangeText={(e) => {
              setLName(e)
            }}
          />
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validUsername ? "Username" : "Longer username"}
            backgroundColor="$accentBg"
            marginHorizontal="auto"
            value={username}
            aria-label="username"
            importantForAutofill="auto"
            display={isLogin ? "none" : undefined}
            onChangeText={(e) => {
              setValidUsername(true)
              setUsername(e)
            }}
          />

          {/*Login form fields*/}
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validEmail ? "Email" : "Enter a valid email"}
            backgroundColor="$accentBg"
            marginHorizontal="auto"
            value={email}
            aria-label="email"
            textContentType="emailAddress"
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
            marginHorizontal="auto"
            value={password}
            aria-label="password"
            textContentType="password"
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
            marginHorizontal="auto"
            value={passwordConfirm}
            aria-label="password"
            textContentType="password"
            importantForAutofill="auto"
            display={isLogin ? "none" : undefined}
            onChangeText={(e) => {
              setValidPasswordConfirm(true)
              setPasswordConfirm(e)
            }}
          />
          <Form.Trigger
            asChild="except-style"
            disabled={status === "submitting" || status === "success"}
          >
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
      </View>
    </Screen>
  )
})

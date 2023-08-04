import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import {
  Anchor,
  Button,
  Form,
  Image,
  Input,
  Separator,
  Spinner,
  Text,
  View,
  getTokens,
} from "tamagui"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

// Email validation regex
export const emailVal = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/
export const numberPattern = /^[0-9]+$/

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const tokens = getTokens()
  const [status, setStatus] = useState<"off" | "submitting" | "submitted" | "success" | "errored">(
    "off",
  )
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(true)
  const [validpassword, setValidPassword] = useState(true)
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

  const handleAuth = () => {
    setStatus("submitting")
    if (username.length < 4) setValidUsername(false)
    if (emailVal.test(email) || email.length == 0) setValidEmail(false)
    if (password.length < 6) setValidPassword(false)
    if (!phone && numberPattern.test(phone)) setValidPhone(false)
    if (password != passwordConfirm) setValidPasswordConfirm(false)

    if (
      !isLogin &&
      validEmail &&
      validUsername &&
      validpassword &&
      validPhone &&
      validPasswordConfirm
    ) {
      console.log('setStatus("success")')
      // run updates
      // Progress to next page
    } else if (isLogin) {
      if (validEmail && validpassword) {
        console.log('setStatus("errored")')
        console.log('setStatus("bad login creds")')
      }
      console.log('setStatus("success")')
      // run updates
      // Progress to next page
    } else {
      console.log('setStatus("errored")')
      console.log("Error in auth flow")
    }
    setPassword("")
    setStatus("submitted")
  }

  return (
    <Screen style={$containerInsets} preset="scroll">
      <View marginTop="$5" paddingHorizontal="$5" justifyContent="space-between" space="$5">
        <Image source={welcomeLogo} marginHorizontal="auto" alt="Transparent logo" />
        <Separator alignSelf="stretch" />
        <Form
          alignItems="center"
          justifyContent="space-around"
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
            placeholder={validpassword ? "Password" : "Enter a valid password"}
            backgroundColor="$accentBg"
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
          <Form.Trigger asChild disabled={status === "submitting" || status === "success"}>
            <Button size="$5" icon={status === "submitting" ? () => <Spinner /> : undefined}>
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Form.Trigger>
        </Form>
        <>
          <Text color="black" textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Anchor
              textAlign="center"
              color="darkolivegreen"
              textDecorationLine="underline"
              textDecorationColor="black"
              onPressOut={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Anchor>
          </Text>
        </>
      </View>
    </Screen>
  )
})

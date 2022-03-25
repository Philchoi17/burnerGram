import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'

import { useAppSelector } from '@/Hooks'
import { AuthNavProps } from '@/Navigators/NavParams'
import { AuthRoutes } from '../SCREENS'
import { AuthContainer } from '@/Containers'
import { Text, Button, Icon, Alert } from '@/Components'
import { Input, Form, Submit } from '@/Components/Forms'
import {
  GoogleLoginButton,
  KakaoLoginButton,
} from '@/Components/SocialLoginButtons'
import { validationSchema } from './validation'
import Logger from '@/Utils/Logger'

const { useEffect, useState } = React
export default function Login({}): React.ReactElement {
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [signInAlert, setSignInAlert] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string>('')

  const firebase: ExtendedFirebaseInstance = useFirebase()
  const { login } = firebase
  const { profile } = useAppSelector((state) => state.firebase)

  const { navigate } = useNavigation<AuthNavProps>()

  const navigateToSignup = () => navigate(AuthRoutes.SIGNUP_SCREEN)

  const signIn = async (loginCreds: { email: string; password: string }) => {
    setSigningIn(true)
    try {
      await login(loginCreds)
    } catch (error) {
      Logger.debug('signIn: error =', error)
      setLoginError(String(error))
      setSignInAlert(true)
      setTimeout(() => setSignInAlert(false), 1000)
      return setSigningIn(false)
    }
  }

  useEffect(() => {
    if (!profile.isEmpty) {
      // TODO: Or handle creation here for social login !
      Logger.debug('profile not empty but no profile =', profile)
    }
    return () => {
      // cleanup
    }
  }, [profile])

  return (
    <>
      <Alert
        visible={signInAlert}
        alertTitle={'Unable To Login'}
        alertMsg={loginError}
      />
      <AuthContainer>
        <Div flex={1} justifyContent="center" p="md">
          <Form
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={signIn}>
            <Input
              loading={signingIn}
              suffix={<Icon name="email-outline" size="4xl" />}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              val="email"
              label="Email"
            />
            <Input
              loading={signingIn}
              suffix={<Icon name="lock-outline" size="4xl" />}
              autoCapitalize="none"
              autoCorrect={false}
              label="Password"
              textContentType="password"
              val="password"
              secureTextEntry
            />
            <Div row>
              <Submit title={'Login'} />
              <Button ml="md" onPress={navigateToSignup}>
                {'Signup'}
              </Button>
            </Div>
          </Form>
          <GoogleLoginButton />
          <KakaoLoginButton />
        </Div>
      </AuthContainer>
    </>
  )
}

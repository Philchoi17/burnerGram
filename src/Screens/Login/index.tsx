import * as React from 'react'
import { Div, Text, Input, Button } from 'react-native-magnus'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'

import { AuthNavProps } from '@/Navigators/NavParams'
import { AuthRoutes } from '../SCREENS'

export default function Login({}) {
  const firebase: ExtendedFirebaseInstance = useFirebase()
  const { login } = firebase

  const { navigate } = useNavigation<AuthNavProps>()

  return (
    <Div flex={1} justifyContent="center">
      <Text>Login Screen</Text>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <Div row justifyContent="space-around" alignItems="flex-start">
        <Button
          onPress={() => {
            console.log('do something')
          }}>
          <Text
            onPress={async () => {
              const login = await firebase.login({
                email: 'philchoi@icloud.com',
                password: '123456',
              })
              console.log('login', login.user)
            }}>
            Login
          </Text>
        </Button>
        <Button
          onPress={() => {
            navigate(AuthRoutes.SIGNUP_SCREEN)
          }}>
          <Text>Signup</Text>
        </Button>
      </Div>
    </Div>
  )
}

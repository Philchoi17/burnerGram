import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginScreen, SignupScreen } from '@/Screens'
import { AuthRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={LoginScreen} name={AuthRoutes.LOGIN_SCREEN} />
      <Screen component={SignupScreen} name={AuthRoutes.SIGNUP_SCREEN} />
    </Navigator>
  )
}

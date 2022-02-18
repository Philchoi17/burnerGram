import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginScreen } from '@/Screens'
import { AuthRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator>
      <Screen component={LoginScreen} name={AuthRoutes.LOGIN_SCREEN} />
    </Navigator>
  )
}

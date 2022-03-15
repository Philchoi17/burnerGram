import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ChatroomsScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function ChatStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={AppRoutes.CHATROOMS_SCREEN} component={ChatroomsScreen} />
    </Navigator>
  )
}

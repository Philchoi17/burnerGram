import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ProfileScreen, EditProfileScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={ProfileScreen} name={AppRoutes.PROFILE_SCREEN} />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen
          component={EditProfileScreen}
          name={AppRoutes.EDIT_PROFILE_SCREEN}
        />
      </Group>
    </Navigator>
  )
}

import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FeedScreen, UploadScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={FeedScreen} name={AppRoutes.FEED_SCREEN} />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen component={UploadScreen} name={AppRoutes.UPLOAD_SCREEN} />
      </Group>
    </Navigator>
  )
}
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  FeedScreen,
  UploadScreen,
  CommentPostScreen,
  BellAlertScreen,
} from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={FeedScreen} name={AppRoutes.FEED_SCREEN} />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen component={UploadScreen} name={AppRoutes.UPLOAD_SCREEN} />
        <Screen
          component={CommentPostScreen}
          name={AppRoutes.COMMENT_POST_SCREEN}
        />
      </Group>
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen
          component={BellAlertScreen}
          name={AppRoutes.BELL_ALERT_SCREEN}
        />
      </Group>
    </Navigator>
  )
}

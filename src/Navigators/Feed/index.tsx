import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  FeedScreen,
  UploadScreen,
  CommentPostScreen,
  BellAlertScreen,
  OtherUsersProfileScreen,
} from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={FeedScreen} name={AppRoutes.FEED_SCREEN} />
      <Screen
        component={OtherUsersProfileScreen}
        name={AppRoutes.OTHER_USERS_PROFILE_SCREEN}
      />
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
          name={AppRoutes.BELL_ALERTS_SCREEN}
        />
      </Group>
    </Navigator>
  )
}

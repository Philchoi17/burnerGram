import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AppRoutes } from '@/Screens/SCREENS'
import { FeedScreen, ProfileScreen } from '@/Screens'
import { Icon } from '@/Components'

const { Navigator, Screen, Group } = createBottomTabNavigator()

const tabOptions = (
  tabBarIcon: ({ focused }: { focused: boolean }) => JSX.Element,
) => ({
  lazy: true,
  tabBarIcon,
})

export default function HomeTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Screen
        component={FeedScreen}
        name={AppRoutes.FEED_SCREEN}
        options={tabOptions(({ focused }) => (
          <Icon name={focused ? 'home' : 'home-outline'} size="6xl" />
        ))}
      />
      <Screen
        component={ProfileScreen}
        name={AppRoutes.PROFILE_SCREEN}
        options={tabOptions(({ focused }) => (
          <Icon
            name={focused ? 'account-settings' : 'account-settings-outline'}
            size="6xl"
          />
        ))}
      />
    </Navigator>
  )
}

import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AppRoutes } from '@/Screens/SCREENS'
import { AppStacks } from '../STACKS'
import { FeedScreen, ProfileScreen, PracticeScreen } from '@/Screens'
import FeedStack from '../Feed'
import ProfileStack from '../Profile'

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
        component={FeedStack}
        name={AppStacks.FEED_STACK}
        options={tabOptions(({ focused }) => (
          <Icon name={focused ? 'home' : 'home-outline'} size="6xl" />
        ))}
      />
      <Screen
        component={ProfileStack}
        name={AppStacks.PROFILE_STACK}
        options={tabOptions(({ focused }) => (
          <Icon
            name={focused ? 'account-settings' : 'account-settings-outline'}
            size="6xl"
          />
        ))}
      />
      {/* PRACTICE */}
      <Screen
        component={PracticeScreen}
        name={'Practice'}
        options={tabOptions(({ focused }) => (
          <Icon name={focused ? 'play-box' : 'play-box-outline'} size="6xl" />
        ))}
      />
      {/* <Group>
      </Group> */}
    </Navigator>
  )
}

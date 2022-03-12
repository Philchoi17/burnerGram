import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  ProfileScreen,
  ProfileEditScreen,
  ProfileFeedScreen,
  PurchaseCreditsScreen,
} from '@/Screens'

import MarketPlaceStack from '../Market'

import { AppStacks } from '../STACKS'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={ProfileScreen} name={AppRoutes.PROFILE_SCREEN} />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen
          component={ProfileEditScreen}
          name={AppRoutes.PROFILE_EDIT_SCREEN}
        />
        <Screen
          component={ProfileFeedScreen}
          name={AppRoutes.PROFILE_FEED_SCREEN}
        />
        <Screen component={MarketPlaceStack} name={AppStacks.MARKET_STACK} />
      </Group>
      <Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Screen
          component={PurchaseCreditsScreen}
          name={AppRoutes.PURCHASE_CREDITS_SCREEN}
        />
      </Group>
    </Navigator>
  )
}

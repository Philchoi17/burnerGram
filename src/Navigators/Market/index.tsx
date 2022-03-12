import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MarketPlaceScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function Market() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name={AppRoutes.MARKET_PLACE_SCREEN}
        component={MarketPlaceScreen}
      />
    </Navigator>
  )
}

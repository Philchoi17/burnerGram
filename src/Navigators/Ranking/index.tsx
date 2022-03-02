import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RankingScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function RankingStack({}) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen component={RankingScreen} name={AppRoutes.RANKING_SCREEN} />
    </Navigator>
  )
}

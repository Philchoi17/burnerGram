import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AuthRoutes, AppRoutes } from '@/Screens/SCREENS'

export type AuthStackParams = {
  [AuthRoutes.LOGIN_SCREEN]: undefined
  [AuthRoutes.SIGNUP_SCREEN]: undefined
}

export type AuthNavProps = NativeStackNavigationProp<
  AuthStackParams,
  AuthRoutes
>

export type AppStackParams = {
  [AppRoutes.FEED_SCREEN]: undefined
  [AppRoutes.PROFILE_SCREEN]: undefined
}

export type AppNavProps = NativeStackNavigationProp<AppStackParams, AppRoutes>

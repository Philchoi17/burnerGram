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
  [AppRoutes.PROFILE_EDIT_SCREEN]: undefined
  [AppRoutes.UPLOAD_SCREEN]: undefined
  [AppRoutes.COMMENT_POST_SCREEN]: {
    feedPost: any
  }
  [AppRoutes.PROFILE_FEED_SCREEN]: {
    posts: any[]
  }
  [AppRoutes.PURCHASE_CREDITS_SCREEN]: undefined
  [AppRoutes.BELL_ALERTS_SCREEN]: undefined
  [AppRoutes.RANKING_SCREEN]: undefined
}

export type AppNavProps = NativeStackNavigationProp<AppStackParams, AppRoutes>

export type RootRouteProps<RouteName extends keyof AppStackParams> = RouteProp<
  AppStackParams,
  RouteName
>

import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AuthRoutes, AppRoutes } from '@/Screens/SCREENS'
import { AppStacks } from './STACKS'

export type AuthStackParams = {
  [AuthRoutes.LOGIN_SCREEN]: undefined
  [AuthRoutes.SIGNUP_SCREEN]: undefined
}

export type AuthNavProps = NativeStackNavigationProp<
  AuthStackParams,
  AuthRoutes
>

export type AppStackParams = {
  [AppStacks.AUTH_STACK]: undefined
  [AppStacks.FEED_STACK]: undefined
  [AppStacks.PROFILE_STACK]: undefined
  [AppStacks.RANKING_STACK]: undefined
  [AppStacks.MARKET_STACK]: undefined
  [AppRoutes.FEED_SCREEN]: undefined
  [AppRoutes.PROFILE_SCREEN]: undefined
  [AppRoutes.PROFILE_EDIT_SCREEN]: undefined
  [AppRoutes.UPLOAD_SCREEN]: undefined
  [AppRoutes.COMMENT_POST_SCREEN]: {
    feedPost: any
  }
  // need to add route params to this screen and wondering if should be in feed or profile stack
  [AppRoutes.OTHER_USERS_PROFILE_SCREEN]: { userId: string }
  [AppRoutes.PROFILE_FEED_SCREEN]: {
    posts: any[] | undefined | null
  }
  [AppRoutes.PURCHASE_CREDITS_SCREEN]: undefined
  [AppRoutes.BELL_ALERTS_SCREEN]: undefined
  // ranking screens
  [AppRoutes.RANKING_SCREEN]: undefined
  [AppRoutes.MARKET_PLACE_SCREEN]: undefined
}

export type AppNavProps = NativeStackNavigationProp<AppStackParams, AppRoutes>

export type RootRouteProps<RouteName extends keyof AppStackParams> = RouteProp<
  AppStackParams,
  RouteName
>

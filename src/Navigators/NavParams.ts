import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AuthRoutes } from '@/Screens/SCREENS'

export type AuthStackParams = {
  [AuthRoutes.LOGIN_SCREEN]: undefined
  [AuthRoutes.SIGNUP_SCREEN]: undefined
}

export type AuthNavProps = NativeStackNavigationProp<
  AuthStackParams,
  AuthRoutes
>

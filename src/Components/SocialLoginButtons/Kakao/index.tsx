import * as React from 'react'
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  KakaoProfileNoneAgreement,
} from '@react-native-seoul/kakao-login'
import auth from '@react-native-firebase/auth'

import Logger from '@/Utils/Logger'
import { Button, Text } from '@/Components'

interface Props {}

export default function KakaoLoginButton({}: Props) {
  const kakaoLogin = async () => {
    try {
      const token: KakaoOAuthToken = await login()
      Logger.debug('kakaoLogin: token =', token)
      const kakaoProfile: KakaoProfile | KakaoProfileNoneAgreement =
        await getKakaoProfile()
      Logger.debug('kakaoLogin: kakaoProfile =', kakaoProfile)
      // const kakaoLogout = await logout()
      // const kakaoUnlink = await unlink()
      // Logger.debug('kakaoLogout =', kakaoLogout)
      // Logger.debug('kakaoUnlink =', kakaoUnlink)
      // Logger.debug('kakaoLogin: kakaoProfile =', kakaoProfile)
    } catch (error) {
      Logger.error('KakaoLoginButton: error =>', error)
    }
  }

  return (
    <Button onPress={kakaoLogin}>
      <Text>Kakao Login</Text>
    </Button>
  )
}

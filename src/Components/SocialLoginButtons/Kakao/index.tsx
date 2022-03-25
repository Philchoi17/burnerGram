import * as React from 'react'
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  loginWithKakaoAccount,
  login,
  unlink,
  KakaoProfileNoneAgreement,
  logout,
} from '@react-native-seoul/kakao-login'
import auth from '@react-native-firebase/auth'

import Logger from '@/Utils/Logger'
import { Button, Text } from '@/Components'
import { createCustomToken } from '@/Services'

interface Props {}
// WIP: need to work on custom token
export default function KakaoLoginButton({}: Props) {
  const kakaoLogin = async () => {
    try {
      const token: KakaoOAuthToken = await loginWithKakaoAccount()
      const kakaoProfile: KakaoProfile | KakaoProfileNoneAgreement | any =
        await getKakaoProfile()
      Logger.debug('kakaoProfile =', kakaoProfile)
      Logger.debug('token =', token)
      const customToken = await createCustomToken(String(kakaoProfile.id), {
        provider: 'KAKAO',
        providerId: 'KAKAO',
        providerData: 'KAKAO',
        email: kakaoProfile?.email,
      })
      Logger.debug('customToken =', customToken)

      const createUser = await auth().signInWithCustomToken(customToken)
      Logger.debug('createUser =', createUser)
      Logger.debug('createUser.user =', createUser.user.providerData)
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

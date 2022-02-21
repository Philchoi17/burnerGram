import * as React from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/core'
// firebase auth
import auth from '@react-native-firebase/auth'

import configure from './configure.json'
import Logger from '@/Utils/Logger'

GoogleSignin.configure(configure)

export default function ({}) {
  const handleGoogleSignin = async () => {
    // Get the users ID token
    const userCredential = await GoogleSignin.signIn()
    // Log.debug('userCredential =', userCredential)
    const {
      idToken,
      user: { email, photo },
    } = userCredential
    // await navigation.navigate(screens.SIGNUP)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    Logger.debug('googleCredential =', googleCredential)
    // setExtraInfoVisible(true)
    // // Sign-in the user with the credential
    try {
      await auth().signInWithCredential(googleCredential)
    } catch (error) {
      Logger.debug('error =', error)
    }
  }
  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleGoogleSignin}
      // disabled={this.state.isSigninInProgress}
    />
  )
}

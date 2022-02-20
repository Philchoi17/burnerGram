import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import AuthStack from './Auth'
import HomeTabs from './Home'
import Logger from '@/Utils/Logger'
import { Loading } from '@/Components'

const { useEffect, useState } = React
export default function Navigator() {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useSelector((state: any) => state.firebase)

  const [initializing, setInitializing] = useState<boolean>(false)
  const [user, setUser] = useState<any>()

  const onAuthStateChanged = async (user: any) => {
    // Logger.debug('onAuthStateChanged: user.providerData =', user.providerData)
    setInitializing(true)
    setUser(user)
    try {
      if (user) {
        // const lastSeenAt = await firestore.FieldValue.serverTimeStamp()

        const lastSeenAt = new Date()
        await firebase.updateProfile({
          lastSeenAt,
          createdWithSocialLogin: user.providerData.some((userInfo: any) =>
            [
              'google.com',
              'apple.com',
              'facebook.com',
              'twitter.com',
              'github.com',
            ].includes(userInfo.providerId),
          ),
        })

        if (!profile.email && profile.createdWithSocialLogin) {
          // Logger.debug('UPDATED PROFILE HERE WITH CREDENTIALS')
          const now = new Date()
          await firebase.updateProfile({
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            nickname: '',
            createdAt: now,
            updatedAt: now,
          })
        }
      }
    } catch (error) {
      // Logger.debug('Navigator: onAuthStateChanged: error =', error)
    } finally {
      setInitializing(false)
    }
  }

  const navigatorUseEffectHandler = () => {
    Logger.debug(
      'navigator useEffect invoked: profile =',
      profile,
      // firestore.FieldValue.serverTimestamp(),
      // firebase.firestore.FieldValue().serverTimeStamp(),
    )
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return () => unsubscribe()
  }

  useEffect(navigatorUseEffectHandler, [])
  return initializing ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {profile.email ? <HomeTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}

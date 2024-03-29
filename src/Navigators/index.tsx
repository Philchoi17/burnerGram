import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { useAppSelector } from '@/Hooks'
import AuthStack from './Auth'
import HomeTabs from './Home'
import Logger from '@/Utils/Logger'
import { Loading } from '@/Components'
import { COLLECTION_NAMES } from '@/Constants/FIRE_NAMES'

const { useEffect, useState } = React
export default function Navigator() {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useAppSelector((state) => state.firebase)
  const { set } = firestore

  const [initializing, setInitializing] = useState<boolean>(false)
  const [user, setUser] = useState<any>()

  const onAuthStateChanged = async (user: any) => {
    setInitializing(true)
    setUser(user)
    try {
      if (user) {
        const lastSeenAt = new Date()
        Logger.debug('USER*** =', user)
        // TODO: handle this better ( something is happening here where the rerender doesnt happen after social login)
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
        Logger.debug('profile** =', profile)
        if (!profile.email && profile.createdWithSocialLogin) {
          Logger.debug('UPDATED PROFILE HERE WITH CREDENTIALS')
          const now = new Date()
          const userPkg = {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            nickname: '',
            createdAt: now,
            updatedAt: now,
            bio: '',
            credits: 200,
          }
          await firebase.updateProfile(userPkg)
          Logger.debug('user =', user)
          const { uid } = user
          await set(`${COLLECTION_NAMES.PUBLIC_USERS}/${uid}`, {
            ...userPkg,
            uid,
          })
        }
      }
    } catch (error) {
      Logger.debug('Navigator: onAuthStateChanged: error =', error)
    } finally {
      setInitializing(false)
    }
  }

  const navigatorUseEffectHandler = () => {
    Logger.debug(
      'navigator useEffect invoked: profile =',
      profile,
      user,
      // firestore.FieldValue.serverTimestamp(),
      // firebase.firestore.FieldValue().serverTimeStamp(),
    )
    Logger.debug('USER =', user)
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

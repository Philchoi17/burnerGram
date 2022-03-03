import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useAppSelector } from '@/Hooks'
import { useRoute } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { ProfileCard } from '@/Components/Cards'
import { Image, Text, Button, Icon } from '@/Components'
import { getFirestoreRef } from '@/Utils/Misc'
import { COLLECTION_NAMES, DOC_KEYS } from '@/Constants/FIRE_NAMES'
import Logger from '@/Utils/Logger'

const { useState, useEffect } = React
export default function OtherUsersProfile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { params }: any = useRoute()
  const { userId } = params

  // const { }
  const { get } = firestore

  const getOtherUserProfile = async () => {
    try {
      const ref = getFirestoreRef(`${COLLECTION_NAMES.USERS}/${userId}`)
      const doc = await ref.get()
      const data = doc.data()
      Logger.debug('data =', data)
    } catch (error) {}
  }

  const getUsersPosts = async () => {
    try {
    } catch (error) {}
  }

  const otherUsersProfileUseEffectHandler = () => {
    Logger.debug('otherUsersProfileUseEffectHandler')
  }

  useEffect(otherUsersProfileUseEffectHandler, [])

  const { profile } = useAppSelector(({ firebase }) => firebase)

  return (
    <MainContainer
      headerProps={{
        heading: 'Other Users Profile',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          {/* <ProfileCard 
            profile={profile}
          /> */}
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

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

import { MainContainer } from '@/Containers'
import { Image, Text, Button, Icon } from '@/Components'

const { useState, useEffect } = React
export default function OtherUsersProfile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useAppSelector(({ firebase }) => firebase)

  return (
    <MainContainer
      headerProps={{
        heading: 'Other Users Profile',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>Other users profile</Text>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

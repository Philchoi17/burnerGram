import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'
import Logger from '@/Utils/Logger'

export default function Feed({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { logout } = firebase

  return (
    <MainContainer
      headerProps={{
        heading: 'Home',
        headerRest: {
          alignment: 'flex-start',
          prefix: null,
        },
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div>
          <Text>Home</Text>
          <Button onPress={logout} />
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

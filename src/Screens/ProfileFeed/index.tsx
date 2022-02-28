import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Text } from '@/Components'

interface Props {}

export default function ProfileFeed({}: Props): React.ReactElement {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  return (
    <MainContainer
      headerProps={{
        heading: 'Profile Feed',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>User Feed</Text>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

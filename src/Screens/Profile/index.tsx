import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import { MainContainer } from '@/Containers'
import { Text } from '@/Components'
import { ProfileCard } from '@/Components/Cards'
import Logger from '@/Utils/Logger'
import { AppRoutes } from '@/Screens/SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'

export default function Profile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useSelector(({ firebase }: any) => firebase)
  const { navigate } = useNavigation<AppNavProps>()

  const navigateToEditProfile = () => navigate(AppRoutes.EDIT_PROFILE_SCREEN)

  return (
    <MainContainer
      headerProps={{
        heading: 'Profile',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <ProfileCard
            photoURL={profile.photoURL}
            nickname={profile.nickname}
            navigateToEditProfile={navigateToEditProfile}
          />
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

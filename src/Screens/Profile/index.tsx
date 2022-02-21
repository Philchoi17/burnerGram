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

import { useAppSelector } from '@/Hooks'
import { MainContainer } from '@/Containers'
import { Text } from '@/Components'
import { ProfileCard } from '@/Components/Cards'
import { PhotoTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { AppRoutes } from '@/Screens/SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'
import { CollectionNames, DocKeys } from '@/Constants/FireNames'

const { useEffect, useState } = React
export default function Profile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { get } = firestore
  const { profile } = useAppSelector(({ firebase }) => firebase)
  const { navigate } = useNavigation<AppNavProps>()

  const navigateToEditProfile = () => navigate(AppRoutes.EDIT_PROFILE_SCREEN)

  // state variables
  const [posts, setPosts] = useState<any[]>([])

  const getUserPosts = async () => {
    try {
      const userPosts = await get({
        collection: CollectionNames.FEED_POSTS,
        where: [DocKeys.USER_ID, '==', profile.uid],
        orderBy: [DocKeys.UPDATED_AT, 'desc'],
      })
      Logger.debug('userPosts', userPosts)
      const gotPosts = await userPosts.docs.map((doc: any) => doc.data())
      setPosts(gotPosts)
    } catch (error) {
      Logger.error('getUserPosts: error = ', error)
    }
  }

  const profileUseEffectHandler = () => {
    getUserPosts()
    return () => {
      // cleanup
    }
  }

  useEffect(profileUseEffectHandler, [profile])

  const handlePostPress = () => {
    Logger.debug('handlePostPress')
  }

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
          <Div
            flexWrap="wrap"
            row
            flex={1}
            p="xs"
            alignItems="center"
            justifyContent="center">
            {posts &&
              posts.map((post, idx) => {
                return (
                  <PhotoTile
                    key={String(idx)}
                    source={post.downloadURL}
                    onPress={handlePostPress}
                  />
                )
              })}
          </Div>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

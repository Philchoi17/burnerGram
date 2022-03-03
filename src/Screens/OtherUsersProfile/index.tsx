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
import { useRoute, useNavigation } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { ProfileCard } from '@/Components/Cards'
import { Image, Text, Button, Icon } from '@/Components'
import { getFirestoreRef } from '@/Utils/Misc'
import { COLLECTION_NAMES, DOC_KEYS } from '@/Constants/FIRE_NAMES'
import Logger from '@/Utils/Logger'
import { profileType } from '@/Types'
import { PhotoTile } from '@/Components/Tiles'
import { AppRoutes } from '../SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'

const { useState, useEffect } = React
export default function OtherUsersProfile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { params }: any = useRoute()
  const { navigate } = useNavigation<AppNavProps>()
  const { userId } = params

  // state variables
  const [activity, setActivity] = useState<boolean>(false)
  const [otherUsersProfile, setOtherUsersProfile] = useState<
    profileType | null | undefined | any
  >(null)
  const [usersPosts, setUsersPosts] = useState<any[] | null | undefined>(null)

  const { get } = firestore

  const getOtherUserProfile = async () => {
    try {
      const ref = getFirestoreRef(`${COLLECTION_NAMES.USERS}/${userId}`)
      const doc = await ref.get()
      const data = doc.data()
      setOtherUsersProfile(data)
    } catch (error) {
      Logger.error('error =', error)
    }
  }

  const getUsersPosts = async () => {
    try {
      const getUsersPosts = await get({
        collection: COLLECTION_NAMES.FEED_POSTS,
        where: [[DOC_KEYS.USER_ID, '==', userId]],
        orderBy: [DOC_KEYS.UPDATED_AT, 'desc'],
      })
      const gotUsersPosts = await getUsersPosts.docs.map((doc: any) =>
        doc.data(),
      )
      setUsersPosts(gotUsersPosts)
    } catch (error) {
      Logger.error('error =', error)
    }
  }

  const otherUsersProfileUseEffectHandler = () => {
    Logger.debug('otherUsersProfileUseEffectHandler')
    getOtherUserProfile()
    getUsersPosts()
    return () => {
      // cleanup
    }
  }

  useEffect(otherUsersProfileUseEffectHandler, [])

  const { profile } = useAppSelector(({ firebase }) => firebase)

  // photoURL,
  // nickname,
  // bio,
  // navigateToEditProfile,
  // earnedPress,
  // creditsPress,
  // postCount,
  // credits,
  // earnedSupport,

  const handlePostPress = () => {
    Logger.debug('handlePostPress')
    navigate(AppRoutes.PROFILE_FEED_SCREEN, { posts: usersPosts })
  }

  return (
    <MainContainer
      headerProps={{
        heading: otherUsersProfile?.nickname,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <ProfileCard
            profile={otherUsersProfile}
            photoURL={otherUsersProfile?.photoURL}
            nickname={otherUsersProfile?.nickname}
            bio={otherUsersProfile?.bio}
            navigateToEditProfile={() => {}}
            earnedPress={() => {}}
            creditsPress={() => {}}
            postCount={usersPosts?.length ?? 0}
            credits={otherUsersProfile?.credits}
            earnedSupport={otherUsersProfile?.earnedSupport}
            otherUser
          />
          <Div
            mt="sm"
            // borderWidth={1}
            flexWrap="wrap"
            row
            flex={1}
            p="xs"
            alignItems="flex-start"
            justifyContent="flex-start">
            {usersPosts &&
              usersPosts.map((post, idx) => (
                <PhotoTile
                  key={String(idx)}
                  source={post.downloadURL}
                  onPress={handlePostPress}
                />
              ))}
          </Div>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

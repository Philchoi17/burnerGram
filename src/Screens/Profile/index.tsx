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
import { Button, Icon, Text, Alert } from '@/Components'
import { ProfileCard } from '@/Components/Cards'
import { PhotoTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { AppRoutes } from '@/Screens/SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'
import { CollectionNames, DocKeys } from '@/Constants/FireNames'
import { commentType } from '@/Types'

const { useEffect, useState } = React
export default function Profile({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { logout } = firebase
  const { get } = firestore
  const { profile } = useAppSelector(({ firebase }) => firebase)
  const { navigate } = useNavigation<AppNavProps>()

  const navigateToEditProfile = () => navigate(AppRoutes.PROFILE_EDIT_SCREEN)

  // state variables
  const [posts, setPosts] = useState<any[]>([])
  const [logoutAlert, setLogoutAlert] = useState<boolean>(false)
  const [buyCreditsAlert, setBuyCreditsAlert] = useState<boolean>(false)

  const toggleLogoutAlert = () => setLogoutAlert(!logoutAlert)
  const toggleBuyCreditsAlert = () => setBuyCreditsAlert(!buyCreditsAlert)

  const getUserPosts = async () => {
    try {
      const userPosts = await get({
        collection: CollectionNames.FEED_POSTS,
        where: [DocKeys.USER_ID, '==', profile.uid],
        orderBy: [DocKeys.UPDATED_AT, 'desc'],
      })
      // Logger.debug('userPosts', userPosts)
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
    navigate(AppRoutes.PROFILE_FEED_SCREEN)
  }

  const handleEarnedPress = () => {
    Logger.debug('handleEarnedPress')
  }

  const handleCreditsPressed = () => {
    setBuyCreditsAlert(true)
  }

  const navigateToPurchaseModal = () => {
    try {
      setBuyCreditsAlert(false)
      navigate(AppRoutes.PURCHASE_CREDITS_SCREEN)
    } catch (error) {
      Logger.error('navigateToPurchaseModal: error =', error)
      setBuyCreditsAlert(false)
    }
  }

  return (
    <>
      <Alert
        alertTitle="Logout"
        alertMsg="Are you sure you want to logout?"
        visible={logoutAlert}
        actionButtons
        confirmAction={logout}
        cancelAction={toggleLogoutAlert}
      />
      <Alert
        alertTitle="Buy Credits"
        alertMsg="Are you sure you want to buy credits?"
        visible={buyCreditsAlert}
        actionButtons
        confirmAction={navigateToPurchaseModal}
        cancelAction={toggleBuyCreditsAlert}
      />
      <MainContainer
        headerProps={{
          heading: 'Profile',
          headerRest: {
            suffix: (
              <Div row px="md">
                <Button bg="transparent" onPress={toggleLogoutAlert}>
                  <Icon name="logout" size="6xl" />
                </Button>
              </Div>
            ),
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Div p="md">
            <ProfileCard
              photoURL={profile.photoURL}
              nickname={profile.nickname}
              navigateToEditProfile={navigateToEditProfile}
              bio={profile.bio}
              earnedPress={handleEarnedPress}
              creditsPress={handleCreditsPressed}
              postCount={posts?.length || 0}
              credits={profile.credits}
            />
            <Div
              // borderWidth={1}
              flexWrap="wrap"
              row
              flex={1}
              p="xs"
              alignItems="flex-start"
              justifyContent="flex-start">
              {posts &&
                posts.map((post, idx) => (
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
    </>
  )
}

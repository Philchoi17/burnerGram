import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { useAppSelector } from '@/Hooks'
import { MainContainer } from '@/Containers'
import { Button, Icon, Text, Alert, RadioSelectors } from '@/Components'
import { ProfileCard } from '@/Components/Cards'
import { PhotoTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { AppNavProps } from '@/Navigators/NavParams'
import { COLLECTION_NAMES, DOC_KEYS } from '@/Constants/FIRE_NAMES'
import { commentType } from '@/Types'
import { AppRoutes } from '@/Screens/SCREENS'
import { AppStacks } from '@/Navigators/STACKS'

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
  const navigateToMarket = () => navigate(AppStacks.MARKET_STACK)

  // state variables
  const [posts, setPosts] = useState<any[]>([])
  const [logoutAlert, setLogoutAlert] = useState<boolean>(false)
  const [buyCreditsAlert, setBuyCreditsAlert] = useState<boolean>(false)

  const toggleLogoutAlert = () => setLogoutAlert(!logoutAlert)
  const toggleBuyCreditsAlert = () => setBuyCreditsAlert(!buyCreditsAlert)
  const [selected, setSelected] = useState<string>('My Photos')

  const getUserPosts = async () => {
    try {
      const userPosts = await get({
        collection: COLLECTION_NAMES.FEED_POSTS,
        where: [DOC_KEYS.USER_ID, '==', profile.uid],
        orderBy: [DOC_KEYS.UPDATED_AT, 'desc'],
      })
      // Logger.debug('userPosts', userPosts)
      const gotPosts = await userPosts.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id }
      })
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
    navigate(AppRoutes.PROFILE_FEED_SCREEN, { posts })
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
        <ScrollDiv showsVerticalScrollIndicator={false}>
          <Div p="md">
            <ProfileCard
              photoURL={profile.photoURL}
              nickname={profile.nickname}
              navigateToEditProfile={navigateToEditProfile}
              bio={profile.bio}
              earnedSupport={profile.earnedSupport || 0}
              earnedPress={navigateToMarket}
              creditsPress={handleCreditsPressed}
              postCount={posts?.length || 0}
              credits={profile.credits}
            />
            <RadioSelectors
              options={['My Photos', 'Wallet']}
              setSelected={setSelected}>
              {' '}
            </RadioSelectors>
            {selected === 'My Photos' ? (
              <Div
                flexWrap="wrap"
                row
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
            ) : (
              <Text> Wallet Contents </Text>
            )}
          </Div>
        </ScrollDiv>
      </MainContainer>
    </>
  )
}

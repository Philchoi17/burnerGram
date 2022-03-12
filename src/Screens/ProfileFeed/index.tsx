import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Text, Alert } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { FeedCard } from '@/Components/Cards'
import Logger from '@/Utils/Logger'
import { useAppSelector } from '@/Hooks'
import { AppStacks } from '@/Navigators/STACKS'
import { AppRoutes } from '../SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'
import { validationSchema } from './validation'
import { COLLECTION_NAMES } from '@/Constants/FIRE_NAMES'

interface Props {}

const { useEffect, useState } = React
export default function ProfileFeed({}: Props): React.ReactElement {
  const { params } = useRoute()
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { delete: docDelete, add } = firestore

  // state variables
  const [moreOptionsAlertVisible, setMoreOptionsAlertVisible] =
    useState<boolean>(false)
  const [marketSalePriceInput, setMarketSalePriceInput] =
    useState<boolean>(false)
  const [moreOptionsFeedPost, setMoreOptionsFeedPost] = useState<any>(null)

  const toggleMoreOptionsAlertVisible = () =>
    setMoreOptionsAlertVisible(!moreOptionsAlertVisible)

  const toggleMarketSalePriceInput = () =>
    setMarketSalePriceInput(!marketSalePriceInput)

  const { profile } = useAppSelector(({ firebase }) => firebase)
  const { navigate } = useNavigation<AppNavProps>()

  const { posts: feedPosts }: any = params

  const handleLike = (uid: any, feedPost: any) => {}
  const handleDislike = (uid: any, feedPost: any) => {}
  const handleComment = (feedPost: any) => {}
  const handleSupport = (profile: any, feedPostId: any) => {}

  const navigateToProfile = (userId: string) => {
    if (userId == profile.uid) return navigate(AppStacks.PROFILE_STACK)

    navigate(AppRoutes.OTHER_USERS_PROFILE_SCREEN, { userId })
  }

  const handleMoreOptions = async (feedPost: any) => {
    setMoreOptionsFeedPost(feedPost)
    toggleMoreOptionsAlertVisible()
  }

  const submitListItem = async (values: any) => {
    Logger.debug('submitListItem: values = ', values)
    Logger.debug('moreOptionsFeedPost =', moreOptionsFeedPost)
    Logger.debug('moreOptionsFeedPost.id =', moreOptionsFeedPost.id)
    const userDocDeletion = await docDelete(
      `${COLLECTION_NAMES.FEED_POSTS}/${moreOptionsFeedPost.id}`,
    )
    Logger.debug('userDocDeletion =', userDocDeletion)
    const addDocToMarketPlace = add(COLLECTION_NAMES.MARKET_PLACE, {
      ...moreOptionsFeedPost,
      price: Number(values.price),
    })
    Logger.debug('addDocToMarketPlace =', addDocToMarketPlace)
    toggleMoreOptionsAlertVisible()
    toggleMarketSalePriceInput()
    setMoreOptionsFeedPost(null)
  }

  const MarketSaleInputForm = () => {
    return (
      <Form
        onSubmit={submitListItem}
        validationSchema={validationSchema}
        initialValues={{
          price: 0,
        }}>
        <Input
          label="Market Price"
          val="price"
          placeholder="Market Sale Price"
          keyboardType="numeric"
          suffix={<Submit inputSuffix />}
        />
      </Form>
    )
  }

  // Logger.debug('posts =', posts)
  return (
    <>
      <Alert
        alertTitle="More Options"
        alertMsg="What would you like to do?"
        visible={moreOptionsAlertVisible}
        cancelAction={() => {
          toggleMoreOptionsAlertVisible()
          toggleMarketSalePriceInput()
          setMoreOptionsFeedPost(null)
        }}
        withInput
        actionButtons
        confirmAction={toggleMarketSalePriceInput}
        inputActions={
          marketSalePriceInput ? (
            <MarketSaleInputForm />
          ) : (
            <Text>LIST FOR SALE</Text>
          )
        }
      />
      <MainContainer
        headerProps={{
          heading: 'Profile Feed',
        }}>
        <ScrollDiv showsVerticalScrollIndicator={false}>
          <Div p="md">
            {feedPosts &&
              feedPosts.map((feedPost: any, idx: number) => {
                return (
                  <FeedCard
                    key={String(idx)}
                    downloadURL={feedPost.downloadURL}
                    postOwner={feedPost.postOwner}
                    description={feedPost.description}
                    updatedAt={feedPost.updatedAt}
                    handleLike={() => handleLike(profile.uid, feedPost)}
                    liked={feedPost.likedUsers.includes(profile.uid)}
                    handleDislike={() => handleDislike(profile.uid, feedPost)}
                    disliked={feedPost.dislikedUsers.includes(profile.uid)}
                    likedCount={feedPost.likedUsers?.length || 0}
                    dislikedCount={feedPost.dislikedUsers?.length || 0}
                    handleComment={() => handleComment(feedPost)}
                    commentCount={feedPost.commentCount}
                    handleSupport={() => handleSupport(profile, feedPost.id)}
                    moreOptions={() => handleMoreOptions(feedPost)}
                    supportCount={feedPost.supportCount}
                    profile={profile}
                    navigateToProfile={() => navigateToProfile(feedPost.userId)}
                  />
                )
              })}
          </Div>
        </ScrollDiv>
      </MainContainer>
    </>
  )
}

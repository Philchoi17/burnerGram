import * as React from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { Div, Host } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
} from 'react-redux-firebase'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import { useAppSelector } from '@/Hooks'
import { MainContainer } from '@/Containers'
import { Alert, Icon, FabOptions } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { FeedCard } from '@/Components/Cards'
import Logger from '@/Utils/Logger'

import { nicknameValidation, supportValidation } from './validation'

import { COLLECTION_NAMES, DOC_KEYS } from '@/Constants/FIRE_NAMES'
import { AppNavProps } from '@/Navigators/NavParams'
import { AppRoutes } from '../SCREENS'

const { useState, useEffect } = React
export default function Feed({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useAppSelector(({ firebase }) => firebase)
  const { navigate } = useNavigation<AppNavProps>()
  const isFocused = useIsFocused()

  const { logout, updateProfile, storage, auth } = firebase
  const { update, get } = firestore

  // state variables
  const [nicknameAlert, setNicknameAlert] = useState<boolean>(false)
  // const [uploading, setUploading] = useState<boolean>(false)
  const [activity, setActivity] = useState<boolean>(false)
  const [noCreditsAlert, setNoCreditsAlert] = useState<boolean>(false)
  const [supportAlert, setSupportAlert] = useState<boolean>(false)
  const [moreOptionsAlert, setMoreOptionsAlert] = useState<boolean>(false)

  const toggleNoCreditsAlert = () => setNoCreditsAlert(!noCreditsAlert)

  const InputActions = () => (
    <Form
      onSubmit={({ nickname }: { nickname: string }) => {
        try {
          Logger.debug('nickname =', nickname)
          updateProfile({ nickname })
          update(`${COLLECTION_NAMES.PUBLIC_USERS}/${profile.uid}`, {
            nickname,
          })
          setNicknameAlert(false)
        } catch (error) {
          Logger.debug('InputActions: onSubmit: error =', error)
        }
      }}
      validationSchema={nicknameValidation}
      initialValues={{
        nickname: '',
      }}>
      <Input
        label="Nickname"
        val="nickname"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="nickname"
        suffix={<Submit inputSuffix suffixName="send-outline" />}
      />
    </Form>
  )

  const checkNickNameHandler = () => {
    try {
      Logger.debug('checkNickNameHandler')
      Logger.debug('profile', profile)
      if (profile.nickname == '') {
        setNicknameAlert(true)
      }
    } catch (error) {
      Logger.error('checkNickNameHandler: error =', error)
    }
  }

  useEffect(checkNickNameHandler, [profile])

  useFirestoreConnect({
    collection: COLLECTION_NAMES.FEED_POSTS,
    orderBy: [DOC_KEYS.UPDATED_AT, 'desc'],
    limit: 10,
  })

  const getFeedPosts = async () => {
    try {
      await get({
        collection: COLLECTION_NAMES.FEED_POSTS,
        orderBy: [DOC_KEYS.UPDATED_AT, 'desc'],
        limit: 10,
      })
    } catch (error) {
      Logger.error('getFeedPosts: error =', error)
    }
  }
  // patch for when feed screen is focused
  useEffect(() => {
    Logger.debug('is Focused')
    getFeedPosts()
  }, [isFocused])

  const { feedPosts } = useAppSelector(({ firestore }) => {
    return firestore.ordered
  })

  const feedPostListener = () => {
    Logger.debug('feedPostListener: feedPosts =')
    // getFeedPosts()
    // get()

    return () => {
      // clean up
    }
  }

  useEffect(feedPostListener, [feedPosts])

  // TODO: define feedPost
  const handleLike = async (userId: string, feedPost: any) => {
    Logger.debug('handleLike: userId =', userId)
    Logger.debug('handleLike: feedPost =', feedPost)
    try {
      if (feedPost.likedUsers.includes(userId)) return
      await update(`${COLLECTION_NAMES.FEED_POSTS}/${feedPost.id}`, {
        likedUsers: [...(feedPost.likedUsers || []), userId],
        dislikedUsers: [...(feedPost.dislikedUsers || [])].filter(
          (id) => id != userId,
        ),
      })
    } catch (error) {
      Logger.error('handleLike: error =', error)
    }
  }

  const handleDislike = async (userId: string, feedPost: any) => {
    try {
      if (feedPost.dislikedUsers.includes(userId)) return
      await update(`${COLLECTION_NAMES.FEED_POSTS}/${feedPost.id}`, {
        dislikedUsers: [...(feedPost.dislikedUsers || []), userId],
        likedUsers: [...(feedPost.likedUsers || [])].filter(
          (id) => id != userId,
        ),
      })
    } catch (error) {
      Logger.error('handleDislike: error =', error)
    }
  }

  const handleComment = async (feedPost: any) => {
    try {
      Logger.debug('handleComment')
      navigate(AppRoutes.COMMENT_POST_SCREEN, { feedPost })
    } catch (error) {
      Logger.error('handleComment: error =', error)
    }
  }

  const handleSupport = async (profile: any, postId: string) => {
    try {
      Logger.debug('handleSupport')
      Logger.debug('profile', profile)
      Logger.debug('postId', postId)
      if (profile.credits < 1) {
        // if (true) {
        setNoCreditsAlert(true)
        setTimeout(() => setNoCreditsAlert(false), 1000)
        return
      }
      setSupportAlert(true)
      // await updateProfile({ credits: profile.credits - 1 })
      // await update(`${COLLECTION_NAMES.FEED_POSTS}/${postId}`, {})
    } catch (error) {
      Logger.error('handleSupport: error =', error)
    }
  }

  const supportSubmit = ({ credits }: { credits: number }) => {
    try {
      Logger.debug('supportSubmit')
      setSupportAlert(false)
    } catch (error) {
      Logger.error('supportSubmit: error =', error)
    }
  }

  const SupportInput = () => (
    <Form
      onSubmit={supportSubmit}
      validationSchema={supportValidation}
      initialValues={{
        credits: 0,
      }}>
      <Input
        keyboardType="numeric"
        label="Support"
        val="support"
        suffix={<Submit inputSuffix />}
      />
    </Form>
  )

  const handleMoreOptions = async () => {
    try {
      Logger.debug('handleMoreOptions')
      setMoreOptionsAlert(true)
    } catch (error) {
      Logger.error('handleMoreOptions: error =', error)
    }
  }

  const navigateBellAlertModal = () => {
    navigate(AppRoutes.BELL_ALERTS_SCREEN)
  }

  return (
    <Host>
      <Alert
        alertMsg="please enter a nickname"
        visible={nicknameAlert}
        withInput
        inputActions={<InputActions />}
      />
      <Alert
        alertTitle="balance Low"
        alertMsg="insufficent Credits"
        visible={noCreditsAlert}
      />
      <Alert
        alertTitle="Support"
        alertMsg="support amount"
        visible={supportAlert}
        withInput
        inputActions={<SupportInput />}
        actionButtons
        confirmAction={() => {}}
        cancelAction={() => setSupportAlert(false)}
      />
      <Alert
        alertTitle="More Options"
        alertMsg="more options"
        visible={moreOptionsAlert}
        actionButtons
        confirmAction={() => {}}
        cancelAction={() => setMoreOptionsAlert(false)}
      />
      <MainContainer
        headerProps={{
          heading: 'Home',
          headerRest: {
            alignment: 'flex-start',
            prefix: null,
            suffix: (
              <Div row mx="md">
                <TouchableOpacity onPress={navigateBellAlertModal}>
                  <Icon name="bell" size="6xl" px="md" />
                </TouchableOpacity>
              </Div>
            ),
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Div p="md">
            {activity ? (
              <ActivityIndicator size="large" />
            ) : (
              feedPosts &&
              // TODO - add loading indicator
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
                    moreOptions={handleMoreOptions}
                  />
                )
              })
            )}
          </Div>
        </ScrollView>
      </MainContainer>
      <FabOptions
        options={[
          {
            title: 'Upload',
            method: () => navigate(AppRoutes.UPLOAD_SCREEN),
            icon: 'plus',
          },
          {
            title: 'Cancel',
            method: () => Logger.debug('handle close'),
            icon: 'close',
          },
        ]}
      />
    </Host>
  )
}

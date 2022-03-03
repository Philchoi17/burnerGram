import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import { useRoute } from '@react-navigation/native'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
} from 'react-redux-firebase'
import dayjs from 'dayjs'

import { imageURI } from '@/Utils/Misc'
import { Text, Button, Icon, Image } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { MainContainer } from '@/Containers'
import Logger from '@/Utils/Logger'
import { validationSchema } from './validation'
import KeyboardAvoider from '@/Components/KeyboardAvoider'
import { COLLECTION_NAMES } from '@/Constants/FIRE_NAMES'
import { useAppSelector } from '@/Hooks'
import Comment from './Comment'

interface Props {}

const { useEffect, useState } = React
export default function CommentPost({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { add, set, get, update } = firestore

  const { profile } = useAppSelector(({ firebase }) => firebase)

  // state variables
  // TODO: handle better
  // const [comments, setComments] = useState<any[]>([])

  const { params }: any = useRoute()
  const {
    feedPost: { downloadURL, description, postOwner, id: postId },
  } = params

  // const getPostComments = async () => {
  //   try {
  //     const postComments = await get(
  //       `${COLLECTION_NAMES.POST_COMMENTS}/${postId}`,
  //     )
  //     const gotComments = await postComments.data()
  //     Logger.debug('postComments: gotComments =', gotComments)
  //     setComments(gotComments.comments)
  //   } catch (error) {
  //     Logger.error('getPostComments: error =', error)
  //   }
  // }

  // TODO: handle better
  const handleSubmit = async (values: any) => {
    Logger.debug('values =', values)
    try {
      const now = new Date()
      await update(`${COLLECTION_NAMES.POST_COMMENTS}/${postId}`, {
        comments: [
          ...postComments.comments,
          {
            comment: values.comment,
            commentOwner: profile.uid,
            commentOwnerName: profile.nickname,
            commentOwnerPhotoURL: profile.photoURL,
            createdAt: now,
            updatedAt: now,
          },
        ],
      })
      await update(`${COLLECTION_NAMES.FEED_POSTS}/${postId}`, {
        commentCount: postComments.comments.length + 1,
      })
    } catch (error) {
      Logger.error('handleSubmit: error =', error)
    }
  }

  useFirestoreConnect({
    collection: COLLECTION_NAMES.POST_COMMENTS,
    doc: postId,
  })

  const postComments = useAppSelector(
    ({ firestore: { data } }: any) =>
      data.postComments && data.postComments[postId],
  )

  const commentPostUseEffectHandler = () => {
    Logger.debug('CommentPost: commentPostUseEffectHandler: params =', params)
    Logger.debug('CommentPost: commentPostUseEffectHandler: profile =', profile)
    Logger.debug(
      'CommentPost: commentPostUseEffectHandler: postComments =',
      // postComments,
      // postId,
      postComments,
      postId,
    )
  }

  useEffect(commentPostUseEffectHandler, [postComments])

  return (
    <MainContainer
      headerProps={{
        heading: 'Comment Post',
      }}>
      <ScrollDiv showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Div row p="md" alignItems="center" justifyContent="space-between">
            <Div row alignItems="center">
              <Image
                source={imageURI(postOwner.photoURL)}
                h={44}
                w={44}
                rounded="circle"
              />
              <Text size="xl" ml="sm" color="gray600">
                {postOwner.nickname}
              </Text>
            </Div>
            <Button onPress={() => {}} bg="transparent">
              <Icon name="more" size="4xl" />
            </Button>
          </Div>
          <Image
            source={imageURI(downloadURL)}
            h={200}
            w={'100%'}
            rounded="xl"
          />
          <Text size="xl" color="gray600" mt="sm" ml="xs">
            {description}
          </Text>
          <Div>
            {postComments &&
              // TODO: handle comment type
              postComments.comments.map((comment: any, idx: number) => (
                <Comment key={String(idx)} comment={comment} />
              ))}
          </Div>
        </Div>
      </ScrollDiv>
      <Div bg="white" p="sm">
        <KeyboardAvoider offset={750}>
          <Form
            validationSchema={validationSchema}
            initialValues={{
              comment: '',
            }}
            onSubmit={handleSubmit}>
            <Input
              val="comment"
              suffix={<Submit inputSuffix title="Comment" />}
            />
          </Form>
        </KeyboardAvoider>
      </Div>
    </MainContainer>
  )
}

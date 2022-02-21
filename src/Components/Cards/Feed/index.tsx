import * as React from 'react'
import { Div, WINDOW_WIDTH as width } from 'react-native-magnus'
import { TouchableOpacity } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { Image, Text, Button, Icon } from '@/Components'
import IconButton from './IconButton'
import { imageURI } from '@/Utils/Misc'
import Logger from '@/Utils/Logger'
import dayjs from 'dayjs'

interface PostOwnerProps {
  photoURL: string
  nickname: string
}

interface Props {
  postOwner: PostOwnerProps
  // photoURL: string
  downloadURL: string
  description: string
  // TODO: make better
  updatedAt: FirebaseFirestoreTypes.Timestamp | any
  handleLike: () => void
  liked: boolean
  likedCount: number
  handleDislike: () => void
  disliked: boolean
  dislikedCount: number
  handleComment: () => void
}

const moreOptions = () => {
  Logger.debug('Cards: Feed: moreOptions')
}

const handleSupport = () => {
  Logger.debug('Cards: Feed: handleSupport')
}

const handleShare = () => {
  Logger.debug('Cards: Feed: handleShare')
}

/**
 * 
  star-outline
  star
  bookmark-remove-outline
  bookmark-remove
  comment-outline
  share-outline
  contactless-payment-circle-outline
  contactless-payment-circle
 */

export default function ({
  postOwner,
  downloadURL,
  description,
  updatedAt,
  handleLike,
  liked,
  likedCount,
  handleDislike,
  disliked,
  dislikedCount,
  handleComment,
}: Props) {
  // Logger.debug('Cards: Feed: render: updatedAt =', updatedAt)
  return (
    <Div p="md" rounded="md" my="md" borderWidth={0.3} borderColor="gray400">
      <Div row alignItems="center" justifyContent="space-between" mb="md">
        <Div row alignItems="center">
          <Image
            source={imageURI(postOwner.photoURL)}
            w={55}
            h={55}
            rounded="circle"
          />
          <Text ml="md" size="xl">
            {postOwner.nickname}
          </Text>
        </Div>
        <Div>
          <Button bg="transparent" onPress={moreOptions}>
            <Icon name="more" size="6xl" />
          </Button>
        </Div>
      </Div>
      <Image source={imageURI(downloadURL)} w="100%" h={300} rounded="md" />
      <Div row justifyContent="space-between">
        <IconButton
          onPress={handleLike}
          activeIcon="star"
          inactiveIcon="star-outline"
          enabled={liked}
          numberOf={likedCount}
        />
        <IconButton
          onPress={handleDislike}
          activeIcon="bookmark-remove"
          inactiveIcon="bookmark-remove-outline"
          enabled={disliked}
          numberOf={dislikedCount}
        />
        <IconButton
          onPress={handleComment}
          activeIcon="comment"
          inactiveIcon="comment-outline"
          enabled={false}
          numberOf={0}
        />
        <IconButton
          onPress={handleSupport}
          activeIcon="contactless-payment-circle"
          inactiveIcon="contactless-payment-circle-outline"
          enabled={false}
          numberOf={0}
        />
        <IconButton
          onPress={handleShare}
          activeIcon="share"
          inactiveIcon="share-outline"
          enabled={false}
          numberOf={0}
        />
      </Div>
      <Div row alignItems="center">
        <Text
          size="lg"
          onPress={() => Logger.debug('handle view whole description')}>
          <Text
            size="xl"
            weight="bold"
            onPress={() => Logger.debug('something')}>
            {postOwner.nickname}
          </Text>
          {/* TODO: Handle better */}
          {description.length > 75
            ? ' ' + description.substring(0, 72 - 3) + '...'
            : ' ' + description}
        </Text>
      </Div>
      <Div mt="sm">
        <Text
          size="lg"
          onPress={() => Logger.debug('handle view all comments')}
          color="gray600">
          {`View all${true ? '' : ' ' + String(1)} Comments`}
        </Text>
      </Div>
      <Button
        p="none"
        mt="sm"
        row
        alignItems="center"
        onPress={() => {
          Logger.debug('handle add comment')
        }}
        bg="transparent">
        <Image
          source={imageURI(postOwner.photoURL)}
          h={44}
          w={44}
          rounded="circle"
        />
        <Text ml="md" color="gray600">
          {'add a comment...'}
        </Text>
      </Button>
      <Div m="sm">
        <Text size="lg" color="gray500">
          {dayjs(updatedAt.toDate()).format('YYYY.MM.DD')}
        </Text>
      </Div>
    </Div>
  )
}

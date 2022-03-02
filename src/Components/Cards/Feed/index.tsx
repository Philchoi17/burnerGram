import * as React from 'react'
import { Div, WINDOW_WIDTH as width } from 'react-native-magnus'
import { TouchableOpacity } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { Image, Text, Button, Icon } from '@/Components'
import IconButton from './IconButton'
import DoubleTap from './DoubleTap'
import { imageURI } from '@/Utils/Misc'
import Logger from '@/Utils/Logger'
import dayjs from 'dayjs'
import Logos from '@/Assets/Logos'
import { profileType } from '@/Types'

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
  commentCount: number
  handleSupport: () => void
  moreOptions: () => void
  supportCount: number
  profile: profileType
}

// const moreOptions = () => {
//   Logger.debug('Cards: Feed: moreOptions')
// }

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
  commentCount,
  handleSupport,
  moreOptions,
  supportCount,
  profile,
}: Props) {
  // Logger.debug('Cards: Feed: render: postOwner =', postOwner)
  return (
    <Div p="lg" rounded="md" my="md" borderWidth={0.3} borderColor="gray400">
      <Div row alignItems="center" justifyContent="space-between" mb="md">
        <Div row alignItems="center">
          <Image
            source={
              postOwner?.photoURL ? imageURI(postOwner?.photoURL) : Logos.logo
            }
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
      <DoubleTap
        delay={200}
        onPress={() => {
          Logger.debug('onPress')
        }}
        doublePress={handleLike}>
        <Image source={imageURI(downloadURL)} w="100%" h={300} rounded="md" />
      </DoubleTap>
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
          numberOf={commentCount}
        />
        <IconButton
          onPress={handleSupport}
          activeIcon="contactless-payment-circle"
          inactiveIcon="contactless-payment-circle-outline"
          enabled={false}
          numberOf={supportCount}
        />
        {/* <IconButton
          onPress={handleShare}
          activeIcon="share"
          inactiveIcon="share-outline"
          enabled={false}
          numberOf={0}
        /> */}
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
        <Text size="lg" onPress={handleComment} color="gray600">
          {`View all${true ? '' : ' ' + String(1)} Comments`}
        </Text>
      </Div>
      <Button
        p="none"
        mt="sm"
        row
        alignItems="center"
        onPress={() => {
          Logger.debug('handle go to profile')
        }}
        bg="transparent">
        <Image
          source={profile.photoURL ? imageURI(profile.photoURL) : Logos.logo}
          h={44}
          w={44}
          rounded="circle"
        />
        <Text ml="md" color="gray600" onPress={handleComment}>
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

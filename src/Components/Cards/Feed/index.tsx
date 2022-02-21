import * as React from 'react'
import { Div, WINDOW_WIDTH as width } from 'react-native-magnus'
import { TouchableOpacity } from 'react-native'

import { Image, Text, Button, Icon } from '@/Components'
import { imageURI } from '@/Utils/Misc'
import Logger from '@/Utils/Logger'

interface PostOwnerProps {
  photoURL: string
  nickname: string
}

interface Props {
  postOwner: PostOwnerProps
  photoURL: string
}
// TODO: Props
const postOwner = {
  photoURL:
    'https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c',
  nickname: 'Nickname',
}
const photoURL =
  'https://images.pexels.com/photos/11210402/pexels-photo-11210402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

const postDescription =
  'some description longer longer longer longer longersome description longer longer longer longer longer'

const moreOptions = () => {
  Logger.debug('Cards: Feed: moreOptions')
}

const handleLike = () => {
  Logger.debug('Cards: Feed: handleLike')
}

const handleDislike = () => {
  Logger.debug('Cards: Feed: handleDislike')
}

const handleComment = () => {
  Logger.debug('Cards: Feed: handleComment')
}
const handleSupport = () => {
  Logger.debug('Cards: Feed: handleSupport')
}

const handleShare = () => {
  Logger.debug('Cards: Feed: handleShare')
}

export default function ({}) {
  return (
    <Div p="md" rounded="md" borderWidth={1} my="md">
      <Div row alignItems="center" justifyContent="space-between">
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
      <Image source={imageURI(photoURL)} w="100%" h={500} />
      <Div row justifyContent="space-between">
        <Button bg="transparent" onPress={handleLike}>
          <Icon name="heart" size="6xl" />
        </Button>
        <Button bg="transparent" onPress={handleDislike}>
          <Icon name="heart" size="6xl" />
        </Button>
        <Button bg="transparent" onPress={handleComment}>
          <Icon name="heart" size="6xl" />
        </Button>
        <Button bg="transparent" onPress={handleSupport}>
          <Icon name="heart" size="6xl" />
        </Button>
        <Button bg="transparent" onPress={handleShare}>
          <Icon name="heart" size="6xl" />
        </Button>
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
          {postDescription.length > 75
            ? ' ' + postDescription.substring(0, 72 - 3) + '...'
            : ' ' + postDescription}
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
        <Text color="gray600">{'add a comment...'}</Text>
      </Button>
    </Div>
  )
}

// {(hospital?.title1 ?? '').length > 10
// ? (hospital?.title1 ?? '').substring(0, 10 - 3) + '...'
// : hospital?.title1 ?? ''}

import * as React from 'react'
import { Div, WINDOW_WIDTH as width } from 'react-native-magnus'

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

const postDescription = 'some description'

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
      <Div>
        <Text>{postDescription}</Text>
      </Div>
    </Div>
  )
}

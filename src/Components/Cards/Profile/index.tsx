import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Image, Text, Button, IconButton } from '@/Components'

import { imageURI } from '@/Utils/Misc'
import { profileType } from '@/Types'

interface Props {
  // TODO: later
  profile?: profileType
  photoURL: string
  nickname: string
  bio?: string
  navigateToEditProfile: () => void
  earnedPress: () => void
  creditsPress: () => void
}

// const photoURL =
//   'https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c'

// const nickname = 'Nickname'

export default function ({
  // profile,
  photoURL,
  nickname,
  bio,
  navigateToEditProfile,
  earnedPress,
  creditsPress,
}: Props): React.ReactElement {
  return (
    <Div justifyContent="center" alignItems="flex-start" rounded="sm">
      <Div p="md" row>
        <Image h={77} w={77} rounded="circle" source={imageURI(photoURL)} />
        <Div row alignItems="center">
          <Div m="md" alignItems="center">
            <Text size="xl">12</Text>
            <Text size="lg">something</Text>
          </Div>
          <Div m="md" alignItems="center">
            <Text size="xl">12</Text>
            <Text size="lg">something</Text>
          </Div>
          <Div m="md" alignItems="center">
            <Text size="xl">12</Text>
            <Text size="lg">something</Text>
          </Div>
        </Div>
      </Div>
      <Div mx="md">
        <Text size="xl" mb="md">
          {nickname}
        </Text>
        <Text size="lg" mb="md" onPress={navigateToEditProfile}>
          {bio == '' ? 'Edit Bio' : bio}
        </Text>
      </Div>
      <Div row justifyContent="space-around" alignItems="stretch">
        <IconButton iconName="plus" label="earned" onPress={earnedPress} />
        <IconButton iconName="plus" label="credits" onPress={creditsPress} />
      </Div>
      <Button
        rounded="xl"
        borderColor="gray600"
        my="md"
        mx="xs"
        wide
        onPress={navigateToEditProfile}
        bg="transparent"
        borderWidth={0.3}>
        <Text size="xl" color="gray500" weight="bold">
          Edit
        </Text>
      </Button>
    </Div>
  )
}

import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Image, Text, Button } from '@/Components'

import { imageURI } from '@/Utils/Misc'
import { profileType } from '@/Types'

interface Props {
  // TODO: later
  profile?: profileType
  photoURL: string
  nickname: string
}

// const photoURL =
//   'https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c'

// const nickname = 'Nickname'

export default function ({
  // profile,
  photoURL,
  nickname,
}: Props): React.ReactElement {
  return (
    <Div
      justifyContent="center"
      alignItems="flex-start"
      rounded="sm"
      borderWidth={1}>
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
      <Div m="md">
        <Text size="xl" mb="md">
          {nickname}
        </Text>
        <Text size="lg" mb="md">
          something descriptions
        </Text>
      </Div>
      <Div row justifyContent="space-around" alignItems="stretch">
        <Button mx="md" flex={1} onPress={() => {}}>
          test
        </Button>
        <Button mx="md" flex={1} onPress={() => {}}>
          test
        </Button>
      </Div>
      <Button m="md" wide onPress={() => {}}>
        Edit
      </Button>
    </Div>
  )
}

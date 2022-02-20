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
      alignItems="center"
      rounded="sm"
      borderWidth={1}>
      <Image h={77} w={77} rounded="circle" source={imageURI(photoURL)} />
      <Div m="sm">
        <Text size="xl">{nickname}</Text>
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

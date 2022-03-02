import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Text, Image } from '@/Components'
import { imageURI } from '@/Utils/Misc'
import Logos from '@/Assets/Logos'

interface Props {
  name: string
  photoURL: string | null
  nickname: string
  earnedSupport: number | null
}

export default function ({
  name,
  photoURL,
  nickname,
  earnedSupport,
}: Props): JSX.Element {
  return (
    <Div
      rounded="md"
      m="sm"
      p="md"
      row
      borderWidth={1}
      alignItems="stretch"
      justifyContent="space-around">
      <Div>
        <Image
          source={photoURL ? imageURI(photoURL) : Logos.logo}
          h={44}
          w={44}
          rounded="circle"
        />
      </Div>
      <Div pl="lg" alignItems="center" justifyContent="center">
        {/* <Text weight="bold" size="xl">
          {name}
        </Text> */}
        <Text weight="bold" size="xl">
          {nickname}
        </Text>
      </Div>
      <Div row justifyContent="center" alignItems="center">
        <Text size="xl" weight="bold">
          {'Earned Amount:'}
        </Text>
        <Text size="xl" weight="bold">
          {earnedSupport || '0'}
        </Text>
      </Div>
    </Div>
  )
}

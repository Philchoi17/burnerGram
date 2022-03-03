import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Text, Image, Button } from '@/Components'
import { imageURI } from '@/Utils/Misc'
import Logos from '@/Assets/Logos'

interface Props {
  name: string
  photoURL: string | null
  nickname: string
  earnedSupport: number | null
  onPress: () => void
}

export default function ({
  name,
  photoURL,
  nickname,
  earnedSupport,
  onPress,
}: Props): JSX.Element {
  return (
    <Button
      h={110}
      bg="transparent"
      wide
      onPress={onPress}
      rounded="md"
      m="sm"
      p="md"
      pl="xl"
      row
      borderWidth={1}
      borderColor="gray300"
      alignItems="stretch"
      justifyContent="space-between">
      <Div
        // borderWidth={1}
        justifyContent="center">
        <Image
          source={photoURL ? imageURI(photoURL) : Logos.logo}
          h={66}
          w={66}
          rounded="circle"
          mb="sm"
        />
        <Text weight="bold" size="xl" center>
          {nickname}
        </Text>
      </Div>

      <Div justifyContent="center" alignItems="center">
        <Text size="xl" weight="bold">
          {'Earned Support'}
        </Text>
        <Div
          mt="sm"
          h={55}
          w={55}
          bg="blue900"
          rounded="circle"
          borderWidth={1}
          justifyContent="center"
          alignItems="center">
          <Text size="xl" weight="bold" color="light">
            {earnedSupport || '0'}
          </Text>
        </Div>
      </Div>
    </Button>
  )
}

import * as React from 'react'
import { Div } from 'react-native-magnus'
import { Text } from '@/Components'

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
    <Div p="md" row borderWidth={1}>
      <Text>{name}</Text>
      <Text>{photoURL || 'no photo'}</Text>
      <Text>{nickname}</Text>
      <Text>{earnedSupport || 'none'}</Text>
    </Div>
  )
}

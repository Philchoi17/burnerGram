import * as React from 'react'
import { Div, ButtonProps } from 'react-native-magnus'

import { Text, Image, Button } from '@/Components'

interface Props extends ButtonProps {
  profileImageURI?: string
  nickname: string
  recentMessage: string
  onPress: () => void
}

export default function Chat({
  profileImageURI,
  nickname,
  recentMessage,
  onPress,
}: Props): React.ReactElement {
  return (
    <Button
      row
      wide
      onPress={onPress}
      alignItems="center"
      bg="transparent"
      justifyContent="flex-start"
      borderWidth={0.5}>
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        h={44}
        w={44}
        rounded="circle"
      />

      <Div m="md">
        <Text p="sm" size="lg" weight="bold">
          {nickname}
        </Text>
        <Text size="md">
          {' '}
          {recentMessage.length > 35
            ? ' ' + recentMessage.substring(0, 32 - 3) + '...'
            : ' ' + recentMessage}
        </Text>
      </Div>
    </Button>
  )
}

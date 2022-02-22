import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Image, Text, Button, Icon } from '@/Components'

interface Props {
  onPress: () => void
  iconName: string
  bg?: string
  label?: string
}

export default function ({
  onPress,
  iconName,
  bg = 'transparent',
  label,
}: Props) {
  return (
    <Button
      borderColor="gray600"
      mx="xs"
      rounded="xl"
      borderWidth={0.3}
      flex={1}
      p="none"
      bg={bg}
      onPress={onPress}
      alignItems="center"
      justifyContent="center">
      <Div p="md">
        <Icon name={iconName} size="5xl" />
        {label && (
          <Text size="xl" color="gray600">
            {label}
          </Text>
        )}
      </Div>
    </Button>
  )
}

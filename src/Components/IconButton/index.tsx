import * as React from 'react'
import { Div } from 'react-native-magnus'

import { Image, Text, Button, Icon } from '@/Components'

interface Props {
  onPress: () => void
  iconName?: string
  bg?: string
  label?: string
  number?: number
}

export default function ({
  onPress,
  iconName,
  bg = 'transparent',
  label,
  number,
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
        {iconName ? (
          <Icon name={iconName} size="5xl" />
        ) : (
          <Text size="3xl" color="gray600" center weight="bold">
            {String(number)}
          </Text>
        )}

        {label && (
          <Text size="xl" color="gray600">
            {label}
          </Text>
        )}
      </Div>
    </Button>
  )
}

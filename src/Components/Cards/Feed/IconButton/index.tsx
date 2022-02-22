import * as React from 'react'

import { Button, Text, Icon } from '@/Components'

interface Props {
  onPress: () => void
  activeIcon: string
  inactiveIcon: string
  enabled: boolean
  numberOf: number
}

export default function ({
  onPress,
  activeIcon,
  inactiveIcon,
  enabled,
  numberOf,
}: Props) {
  return (
    <Button
      // borderWidth={1}
      bg="transparent"
      onPress={onPress}
      flexDir="column"
      alignItems="center"
      justifyContent="center">
      <Text size="xl" color="gray500">
        {String(numberOf)}
      </Text>
      <Icon name={enabled ? activeIcon : inactiveIcon} size="6xl" />
    </Button>
  )
}

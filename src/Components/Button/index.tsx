import * as React from 'react'
import { Button, ButtonProps } from 'react-native-magnus'

// import Text from '../Text'

interface Props extends ButtonProps {
  onPress: () => void
  children?: any
  wide?: boolean
}

export default function ({ onPress, children, wide = false, ...rest }: Props) {
  return (
    <Button block={wide} onPress={onPress} {...rest}>
      {children}
    </Button>
  )
}

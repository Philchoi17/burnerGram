import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextProps } from 'react-native-magnus'

interface Props extends TextProps {
  children: string
  weight?:
    | 'bold'
    | '400'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  size?: number | string
  center?: boolean
  rest?: TextProps
}

export default function ({
  children,
  weight = '400',
  size = 'md',
  center = false,

  ...rest
}: Props) {
  return (
    <Text
      textAlign={center ? 'center' : 'left'}
      fontSize={size}
      fontWeight={weight}
      // fontFamily={font[weight]}
      style={styles.text}
      {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
})

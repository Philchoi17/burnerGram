import * as React from 'react'
import { Div, Image, ImageProps } from 'react-native-magnus'

interface Props extends ImageProps {
  borderWidth?: number
  h: number | string
  w: number | string
  rounded?: string
  // src: string | number
  rest?: any
}

export default function ({
  borderWidth,
  h,
  w,
  rounded = 'none',
  ...rest
}: Props): React.ReactElement {
  return (
    <Div
      borderWidth={borderWidth}
      alignItems="center"
      justifyContent="center"
      h={h}
      w={w}>
      <Image
        p="xs"
        h={h}
        w={w}
        resizeMode="contain"
        rounded={rounded}
        {...rest}
      />
    </Div>
  )
}

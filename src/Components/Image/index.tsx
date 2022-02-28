import * as React from 'react'
import { Div, Image, ImageProps } from 'react-native-magnus'
import FastImage, { FastImageStaticProperties } from 'react-native-fast-image'
import Logger from '@/Utils/Logger'

interface Props extends ImageProps {
  borderWidth?: number
  h: number | string
  w: number | string
  rounded?: string
  // src: string | number
  source:
    | {
        uri: string
      }
    | any
  rest?: any
}

export default function ({
  borderWidth,
  h,
  w,
  rounded = 'none',
  source,
  resizeMode = 'cover',
  ...rest
}: Props): React.ReactElement {
  // Logger.debug('source =', source)
  // TODO: handle better
  return (
    <Div
      borderWidth={borderWidth}
      alignItems="center"
      justifyContent="center"
      h={h}
      w={w}>
      {typeof source == 'object' ? (
        <FastImage
          style={{
            height: h,
            width: w,
            borderRadius: rounded == 'circle' ? 50 : 5,
            padding: 10,
          }}
          source={{
            uri: source.uri,
            priority: FastImage.priority.normal,
          }}
        />
      ) : (
        <Image
          p="xs"
          h={h}
          w={w}
          source={source}
          resizeMode={resizeMode}
          rounded={rounded}
          {...rest}
        />
      )}
    </Div>
  )
}

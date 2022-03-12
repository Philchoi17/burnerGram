import * as React from 'react'
import { Div, DivProps } from 'react-native-magnus'

import { Button, Text, Icon, Image } from '@/Components'
import { imageURI } from '@/Utils/Misc'

interface Props extends DivProps {
  feedPost: any
  rest?: any
}

const { useState, useEffect } = React
export default function ({ feedPost, ...rest }: Props) {
  return (
    <Div
      {...rest}
      w={'45%'}
      borderWidth={1}
      m="sm"
      flex={1}
      alignItems="center"
      justifyContent="center">
      {/* <Text>{JSON.stringify(feedPost)}</Text> */}
      <Image source={imageURI(feedPost.downloadURL)} h={150} w={150} />
      <Button
        wide
        m="sm"
        onPress={() => {}}>{`Buy For ${feedPost.price}`}</Button>
      <Button wide m="sm" onPress={() => {}}>{`See Stats`}</Button>
    </Div>
  )
}

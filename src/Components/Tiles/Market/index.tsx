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
      p="sm"
      w={'45%'}
      borderWidth={0.3}
      borderColor="gray"
      rounded="xl"
      m="sm"
      alignItems="center"
      justifyContent="center"
      {...rest}>
      <Image source={imageURI(feedPost.downloadURL)} h={150} w={150} />
      <Button
        wide
        m="sm"
        onPress={() => {}}>{`Buy For ${feedPost.price}`}</Button>
      <Button wide m="sm" onPress={() => {}}>{`See Stats`}</Button>
    </Div>
  )
}

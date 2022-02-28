import * as React from 'react'
import { StyleSheet } from 'react-native'

import { Image, Button } from '@/Components'
import { imageURI } from '@/Utils/Misc'

interface Props {
  source: string
  onPress: () => void
}

export default function ({ source, onPress }: Props) {
  return (
    <Button w={'32%'} onPress={onPress} bg="transparent" m={1} p="none">
      <Image
        source={imageURI(source)}
        w={120}
        h={120}
        rounded="xl"
        resizeMode="cover"
      />
    </Button>
  )
}

const styles = StyleSheet.create({})

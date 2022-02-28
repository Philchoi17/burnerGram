import * as React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'

import { Image, Button } from '@/Components'
import { ImageSourcePropType } from 'react-native'
import { imageURI } from '@/Utils/Misc'

interface Props {
  source: string
  onPress: () => void
}

export default function ({ source, onPress }: Props) {
  return (
    <Button w={'31%'} onPress={onPress} bg="transparent" m="xs">
      <Image
        source={imageURI(source)}
        w={120}
        h={100}
        rounded="sm"
        resizeMode="cover"
      />
    </Button>
  )
}

const styles = StyleSheet.create({})

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
    <Button flex={1} onPress={onPress} bg="transparent">
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

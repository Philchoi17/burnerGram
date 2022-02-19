import * as React from 'react'
import { Div, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'

import { AuthNavProps } from '@/Navigators/NavParams'

export default function Signup() {
  const { navigate } = useNavigation<AuthNavProps>()

  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text>Signup</Text>
    </Div>
  )
}

import * as React from 'react'
import { Div, Input } from 'react-native-magnus'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'

import { AuthNavProps } from '@/Navigators/NavParams'
import { AuthRoutes } from '../SCREENS'
import { AuthContainer } from '@/Containers'
import { Text, Button } from '@/Components'

export default function Login({}): React.ReactElement {
  const firebase: ExtendedFirebaseInstance = useFirebase()
  const { login } = firebase

  const { navigate } = useNavigation<AuthNavProps>()

  return (
    <AuthContainer>
      <Div flex={1} alignItems="center" justifyContent="center">
        <Text>Hello World</Text>
      </Div>
    </AuthContainer>
  )
}

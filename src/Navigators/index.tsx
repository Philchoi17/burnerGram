import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './Auth'

export default function Navigator() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}

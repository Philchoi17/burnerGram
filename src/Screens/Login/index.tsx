import * as React from 'react'
import { Div, Text, Input, Button } from 'react-native-magnus'

export default function Login({}) {
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text>Login Screen</Text>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <Button
        onPress={() => {
          console.log('do something')
        }}>
        <Text>Login</Text>
      </Button>
    </Div>
  )
}

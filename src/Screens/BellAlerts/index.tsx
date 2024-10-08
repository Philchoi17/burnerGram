import * as React from 'react'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'

export default function BellAlert({}) {
  return (
    <MainContainer
      scrollable
      headerProps={{
        heading: 'Bell Alert',
      }}>
      <Div p="md">
        <Text>BELL ALERT</Text>
      </Div>
    </MainContainer>
  )
}

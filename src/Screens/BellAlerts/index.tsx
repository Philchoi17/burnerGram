import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'

export default function BellAlert({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Bell Alert',
      }}>
      <ScrollDiv showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>BELL ALERT</Text>
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'

export default function BellAlert({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Bell Alert',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>BELL ALERT</Text>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

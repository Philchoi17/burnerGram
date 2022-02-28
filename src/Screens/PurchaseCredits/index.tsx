import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Button, Text } from '@/Components'
import Logger from '@/Utils/Logger'

export default function PurchaseCredits({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Purchase Credits',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>PURCHASE_SCREEN</Text>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

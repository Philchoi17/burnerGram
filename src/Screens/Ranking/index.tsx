import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Button, Text } from '@/Components'
import { useAppSelector, useAppDispatch } from '@/Hooks'
import { COLLECTION_NAMES } from '@/Constants/FIRE_NAMES'

export default function Ranking({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Ranking',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>Ranking Screen</Text>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

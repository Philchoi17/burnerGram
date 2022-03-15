import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button, SearchBar } from '@/Components'
import Logger from '@/Utils/Logger'

export default function Chatrooms({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Chatrooms',
      }}>
      <ScrollDiv showsVerticalScrollIndicator={false}>
        <Div p="md">
          <SearchBar />
        </Div>
        <Div p="md">
          <Text>Chatrooms</Text>
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

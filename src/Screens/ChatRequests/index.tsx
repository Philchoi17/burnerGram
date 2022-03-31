import * as React from 'react'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button, Icon, Alert } from '@/Components'

const { useState, useEffect } = React
export default function ChatRequests() {
  return (
    <MainContainer
      scrollable
      headerProps={{
        heading: 'Chat Requests',
      }}>
      <Div>
        <Text>ChatRequests</Text>
      </Div>
    </MainContainer>
  )
}

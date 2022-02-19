import * as React from 'react'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text } from '@/Components'
import Logger from '@/Utils/Logger'

export default function Profile({}) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Profile',
      }}>
      <Div>
        <Text>Profile</Text>
      </Div>
    </MainContainer>
  )
}

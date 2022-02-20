import * as React from 'react'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text } from '@/Components'

interface Props {}

export default function EditProfile({}: Props): JSX.Element {
  return (
    <MainContainer
      headerProps={{
        heading: 'Edit Profile',
      }}>
      <Div p="md" justifyContent="center" alignItems="center" flex={1}>
        <Text>Edit Profie Screen</Text>
      </Div>
    </MainContainer>
  )
}

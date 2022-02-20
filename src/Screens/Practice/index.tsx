import * as React from 'react'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button, Alert, Icon, SearchBar } from '@/Components'
import { ProfileCard } from '@/Components/Cards'

export default function Practice({}) {
  return (
    <MainContainer>
      <Div p="md">
        <Text>Practice</Text>
        <SearchBar />
        <ProfileCard
          photoURL="https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c"
          nickname="Nickname"
        />
      </Div>
    </MainContainer>
  )
}

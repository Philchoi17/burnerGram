import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { Text, Button, SearchBar } from '@/Components'
import { ChatTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { AppRoutes } from '../SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'

export default function Chatrooms({}) {
  const { navigate } = useNavigation<AppNavProps>()

  const goToChatroom = () => navigate(AppRoutes.CHATROOM_SCREEN)

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
          <ChatTile
            nickname="nickname"
            recentMessage="recentMessage"
            onPress={goToChatroom}
            profileImageURI="https://picsum.photos/200/300"
          />
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

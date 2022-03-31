import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { Text, Button, SearchBar, IconButton, Icon } from '@/Components'
import { ChatTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { AppRoutes } from '../SCREENS'
import { AppNavProps } from '@/Navigators/NavParams'

export default function Chatrooms({}) {
  const { navigate } = useNavigation<AppNavProps>()

  const goToChatroom = () => navigate(AppRoutes.CHATROOM_SCREEN)
  const goToRequests = () => navigate(AppRoutes.CHAT_REQUESTS_SCREEN)

  return (
    <MainContainer
      scrollable
      headerProps={{
        heading: 'Chatrooms',
        suffix: (
          <Div row>
            <Button onPress={goToRequests} bg="transparent">
              <Icon name="plus" size="6xl" />
            </Button>
            <Button onPress={() => {}} bg="transparent">
              <Icon name="search" size="6xl" />
            </Button>
          </Div>
        ),
      }}>
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
    </MainContainer>
  )
}

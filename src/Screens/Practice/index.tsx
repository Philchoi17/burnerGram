import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import { Text, Button, Alert, Icon, SearchBar, IconButton } from '@/Components'
import { ProfileCard, FeedCard } from '@/Components/Cards'

export default function Practice({}) {
  return (
    <MainContainer>
      <ScrollView>
        <Div p="md">
          <Text>Practice</Text>
          <SearchBar />
          <ProfileCard
            photoURL="https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c"
            nickname="Nickname"
            navigateToEditProfile={() => {}}
            earnedPress={() => {}}
            creditsPress={() => {}}
            postCount={0}
          />
          {/* <FeedCard /> */}
          {/* <IconButton iconName="plus" onPress={() => {}} label="test" /> */}
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'

import { MainContainer } from '@/Containers'
import {
  Text,
  Button,
  Alert,
  Icon,
  SearchBar,
  IconButton,
  Accordian,
} from '@/Components'
import { ProfileCard, FeedCard } from '@/Components/Cards'
import Config from '@/Config'

export default function Practice({}) {
  return (
    <MainContainer>
      <ScrollDiv>
        <Div p="md">
          <Text>Practice</Text>
          <SearchBar />
          <Accordian
            heading="TESTER"
            bodyText="l;ajfdlja;ldfjal;jdfl;ajdlfajdljfa;jdf;ldajl"
          />
          {/* <ProfileCard
            photoURL="https://lh3.googleusercontent.com/a-/AOh14GiX5QPg40HGE5MUds5GdtJgj1lEEKQpWSLKHBkq=s96-c"
            nickname="Nickname"
            navigateToEditProfile={() => {}}
            earnedPress={() => {}}
            creditsPress={() => {}}
            postCount={0}
            credits={0}
            earnedSupport={0}
          /> */}
          {/* <FeedCard /> */}
          {/* <IconButton iconName="plus" onPress={() => {}} label="test" /> */}

          <Button
            onPress={() => {
              Config.log.debug('hello')
            }}>
            test
          </Button>
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

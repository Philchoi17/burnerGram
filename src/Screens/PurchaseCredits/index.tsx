import * as React from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Button, Text } from '@/Components'
import Logger from '@/Utils/Logger'

const { useState, useEffect } = React
export default function PurchaseCredits({}) {
  const buyCredit = (amt: number) => {
    Logger.debug('amt =', amt)
  }

  return (
    <MainContainer
      headerProps={{
        heading: 'Purchase Credits',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div
          p="md"
          justifyContent="center"
          alignItems="center"
          flex={1}
          borderWidth={1}>
          <Text>Amount of Credits</Text>
          <Button wide m="sm" my="xl" p="xl" onPress={() => buyCredit(100)}>
            100 Credits
          </Button>
          <Button wide m="sm" my="xl" p="xl" onPress={() => buyCredit(500)}>
            500 Credits
          </Button>
          <Button wide m="sm" my="xl" p="xl" onPress={() => buyCredit(1000)}>
            1000 Credits
          </Button>
          <Button wide m="sm" my="xl" p="xl" onPress={() => buyCredit(2000)}>
            2000 Credits
          </Button>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

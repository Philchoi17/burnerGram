import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { useAppSelector } from '@/Hooks'
import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'
import Logger from '@/Utils/Logger'

interface Props {}

const { useEffect, useState } = React
export default function MarketPlace({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const marketPlaceUseEffectHandler = () => {
    Logger.debug('MarketPlace::marketPlaceUseEffectHandler')
  }

  useEffect(marketPlaceUseEffectHandler, [])

  return (
    <MainContainer
      headerProps={{
        heading: 'Market Place',
        // headerProps: {

        // }
      }}>
      <ScrollDiv showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>MARKET PLACE</Text>
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

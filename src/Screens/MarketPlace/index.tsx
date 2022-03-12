import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { useAppSelector } from '@/Hooks'
import { MainContainer } from '@/Containers'
import { Text, Button } from '@/Components'
import { MarketTile } from '@/Components/Tiles'
import Logger from '@/Utils/Logger'
import { COLLECTION_NAMES, DOC_KEYS } from '@/Constants/FIRE_NAMES'

interface Props {}

const { useEffect, useState } = React
export default function MarketPlace({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { get, update, add, set } = firestore
  const { storage } = firebase

  // state variables
  const [marketItemsForSale, setMarketItemsForSale] = useState<any[]>([])

  const getMarketPlaceItems = async () => {
    try {
      const marketPlaceItems = await get({
        collection: COLLECTION_NAMES.MARKET_PLACE,
        orderBy: [DOC_KEYS.UPDATED_AT, 'desc'],
      })
      const gotMarketPlaceItems = await marketPlaceItems.docs.map((doc: any) =>
        doc.data(),
      )
      Logger.debug('gotMarketPlaceItems', gotMarketPlaceItems)
      setMarketItemsForSale(gotMarketPlaceItems)
    } catch (error) {
      Logger.error('MarketPlace::getMarketPlaceItems', error)
    }
  }

  const marketPlaceUseEffectHandler = () => {
    Logger.debug('MarketPlace::marketPlaceUseEffectHandler')
    getMarketPlaceItems()
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
        <Div p="md" flexWrap="wrap" flex={1} borderWidth={1} row>
          {marketItemsForSale &&
            marketItemsForSale.map((item: any, idx: number) => (
              <MarketTile key={String(idx)} feedPost={item} />
            ))}
        </Div>
      </ScrollDiv>
    </MainContainer>
  )
}

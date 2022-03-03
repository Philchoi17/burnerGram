import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Div, ScrollDiv } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { Button, Text, Alert } from '@/Components'
import Logger from '@/Utils/Logger'
import { useAppSelector } from '@/Hooks'

const { useState, useEffect } = React
export default function PurchaseCredits({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const navigation = useNavigation()

  // state variables
  const [buyCreditsAlert, setBuyCreditsAlert] = useState<boolean>(false)
  const [buyCreditsAmt, setBuyCreditsAmt] = useState<number>(0)

  const { profile } = useAppSelector(({ firebase }) => firebase)

  const { updateProfile } = firebase

  const buyCreditNotify = (amt: number) => {
    setBuyCreditsAlert(true)
    setBuyCreditsAmt(amt)
    // Logger.debug('amt =', amt)
    // updateProfile({
    //   credits: profile.credits + amt,
    // })
  }

  const confirmBuyCredit = async () => {
    try {
      await updateProfile({
        credits: profile.credits + buyCreditsAmt,
      })
      setBuyCreditsAlert(false)
      setBuyCreditsAmt(0)
      navigation.goBack()
    } catch (error) {
      Logger.error('confirmBuyCredit: error = ', error)
    }
  }

  return (
    <>
      <Alert
        alertTitle="Buy Credits"
        alertMsg={`Are you sure you want to buy ${buyCreditsAmt} credits?`}
        visible={buyCreditsAlert}
        actionButtons
        confirmAction={confirmBuyCredit}
        cancelAction={() => {
          setBuyCreditsAlert(false)
          setBuyCreditsAmt(0)
        }}
      />
      <MainContainer
        headerProps={{
          heading: 'Purchase Credits',
        }}>
        <ScrollDiv showsVerticalScrollIndicator={false}>
          <Div
            p="md"
            justifyContent="center"
            alignItems="center"
            flex={1}
            borderWidth={1}>
            <Text>Amount of Credits</Text>
            <Button
              wide
              m="sm"
              my="xl"
              p="xl"
              onPress={() => buyCreditNotify(100)}>
              100 Credits
            </Button>
            <Button
              wide
              m="sm"
              my="xl"
              p="xl"
              onPress={() => buyCreditNotify(500)}>
              500 Credits
            </Button>
            <Button
              wide
              m="sm"
              my="xl"
              p="xl"
              onPress={() => buyCreditNotify(1000)}>
              1000 Credits
            </Button>
            <Button
              wide
              m="sm"
              my="xl"
              p="xl"
              onPress={() => buyCreditNotify(2000)}>
              2000 Credits
            </Button>
          </Div>
        </ScrollDiv>
      </MainContainer>
    </>
  )
}

import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirebaseConnect,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Button, Text } from '@/Components'
import { RankingCard } from '@/Components/Cards'
import { useAppSelector, useAppDispatch } from '@/Hooks'
import { COLLECTION_NAMES } from '@/Constants/FIRE_NAMES'
import Logger from '@/Utils/Logger'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { profileType } from '@/Types'

const { useState, useEffect } = React
export default function Ranking({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { get } = firestore

  const { profile } = useAppSelector(({ firebase }) => firebase)

  // state variables
  const [usersToRank, setUsersToRank] = useState<any[]>([])

  const getUsers = async () => {
    const users = await get(COLLECTION_NAMES.USERS)
    Logger.debug('users =', users)
    const gotUsers = await users.docs.map(
      (doc: FirebaseFirestoreTypes.DocumentSnapshot) => doc.data(),
    )
    Logger.debug('gotUsers =', gotUsers)
    setUsersToRank(gotUsers)
  }

  const rankingsUseEffectHandler = () => {
    getUsers()
    Logger.debug('rankingsUseEffectHandler: profile =', profile)
  }

  useEffect(rankingsUseEffectHandler, [])

  return (
    <MainContainer
      headerProps={{
        heading: 'Ranking',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>Ranking Screen</Text>
          {usersToRank.map((user: profileType, idx: number) => {
            return (
              <RankingCard
                key={String(idx)}
                name={user.name}
                photoURL={user.photoURL || null}
                nickname={user.nickname}
                earnedSupport={user.earnedSupport || 0}
              />
            )
          })}
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

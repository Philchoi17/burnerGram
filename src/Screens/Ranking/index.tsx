import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div, Drawer, DrawerRef } from 'react-native-magnus'
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

const { useState, useEffect, createRef } = React
export default function Ranking({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const drawerRef = createRef<DrawerRef>()

  const openDrawer = () => {
    drawerRef.current?.open()
  }

  const { get } = firestore

  const { profile } = useAppSelector(({ firebase }) => firebase)

  // state variables
  const [usersToRank, setUsersToRank] = useState<any[]>([])
  const [usersOrPosts, setUsersOrPosts] = useState<'Users' | 'Posts'>('Posts')

  const getUsers = async () => {
    const users = await get(COLLECTION_NAMES.USERS)
    Logger.debug('users =', users)
    const gotUsers = await users.docs.map(
      (doc: FirebaseFirestoreTypes.DocumentSnapshot) => doc.data(),
    )
    Logger.debug('gotUsers =', gotUsers)
    // setUsersToRank(gotUsers)
    setUsersToRank(
      gotUsers.sort(
        (a: any, b: any) => Number(b.earnedSupport) - Number(a.earnedSupport),
      ),
    )
  }

  const rankingsUseEffectHandler = () => {
    getUsers()
    Logger.debug('rankingsUseEffectHandler: profile =', profile)
  }

  useEffect(rankingsUseEffectHandler, [])

  const toggleUsersOrPosts = () => {
    setUsersOrPosts(usersOrPosts == 'Users' ? 'Posts' : 'Users')
  }

  return (
    <>
      <Drawer ref={drawerRef}>
        <Text>Profile Stats</Text>
      </Drawer>
      <MainContainer
        headerProps={{
          heading: 'Ranking',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}>
          <Div row bg="light" p="md">
            <Button flex={1} m="sm" onPress={toggleUsersOrPosts}>
              <Text weight="bold" color="white" size="xl">
                {usersOrPosts}
              </Text>
            </Button>
            {/* <Button flex={1} m="sm" onPress={toggleUsersOrPosts}>
              Press
            </Button> */}
          </Div>
          <Div p="md">
            {usersOrPosts == 'Posts' ? (
              <>
                {usersToRank.map((user: profileType, idx: number) => {
                  if (!user.name) return null
                  return (
                    <RankingCard
                      onPress={openDrawer}
                      key={String(idx)}
                      name={user.name}
                      photoURL={user.photoURL || null}
                      nickname={user.nickname}
                      earnedSupport={user.earnedSupport || 0}
                    />
                  )
                })}
              </>
            ) : (
              <>
                <Text>handle post rankings</Text>
              </>
            )}
          </Div>
        </ScrollView>
      </MainContainer>
    </>
  )
}

import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import { MainContainer } from '@/Containers'
import { Text, Button, Alert } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import Logger from '@/Utils/Logger'
import { nicknameValidation } from './validation'

const { useState, useEffect } = React
export default function Feed({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useSelector(({ firebase }: any) => firebase)

  const { logout, updateProfile } = firebase

  const [nicknameAlert, setNicknameAlert] = useState<boolean>(false)

  const InputActions = () => (
    <Form
      onSubmit={({ nickname }: { nickname: string }) => {
        try {
          // createChatRoom(uid, acceptedUser, sendMsg, profile)
          Logger.debug('nickname =', nickname)
          updateProfile({ nickname })
          setNicknameAlert(false)
        } catch (error) {
          Logger.debug('InputActions: onSubmit: error =', error)
        }
      }}
      validationSchema={nicknameValidation}
      initialValues={{
        nickname: '',
      }}>
      <Input
        // loading={creatingChatroom}
        label="Nickname"
        val="nickname"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="nickname"
        suffix={<Submit inputSuffix suffixName="send-outline" />}
      />
    </Form>
  )

  const checkNickNameHandler = () => {
    try {
      Logger.debug('checkNickNameHandler')
      Logger.debug('profile', profile)
      if (profile.nickname == '') {
        setNicknameAlert(true)
      } else {
        setNicknameAlert(false)
      }
    } catch (error) {
      Logger.error('checkNickNameHandler: error =', error)
    }
  }

  useEffect(checkNickNameHandler, [profile])

  return (
    <>
      <Alert
        alertMsg="please enter a nickname"
        visible={nicknameAlert}
        withInput
        inputActions={<InputActions />}
      />
      <MainContainer
        headerProps={{
          heading: 'Home',
          headerRest: {
            alignment: 'flex-start',
            prefix: null,
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Div>
            <Text>Home</Text>
            <Button onPress={logout} />
          </Div>
        </ScrollView>
      </MainContainer>
    </>
  )
}

import * as React from 'react'
import { Div, Text } from 'react-native-magnus'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { Form, Input, Submit } from '@/Components/Forms'
import { AuthContainer } from '@/Containers'
import Logger from '@/Utils/Logger'
import { validationSchema } from './validation'
import { CollectionNames } from '@/Constants/FireNames'

interface Props {}

const { useEffect, useState } = React
export default function Signup({}: Props): React.ReactElement {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { set } = firestore
  const { auth, updateProfile } = firebase

  const signupUseEffectHandler = () => {
    Logger.debug('signupUseEffectHandler')
    return () => {
      // cleanup
    }
  }

  useEffect(signupUseEffectHandler, [])

  const signupUserHandler = async (userPkg: any) => {
    Logger.debug('signupUserHandler', userPkg)
    try {
      // 1. pick of email and password to create creds to createUser
      const { email, password } = userPkg
      // 2. createUser in firebase authentication
      delete userPkg.password
      delete userPkg.confirmPassword
      // userPkg.createdAt = await firestore.FieldValue.serverTimeStamp()
      const now = new Date()
      userPkg.createdAt = now
      userPkg.updatedAt = now
      userPkg.lastSeenAt = now
      userPkg.createdWithSocialLogin = false
      userPkg.photoURL = null
      userPkg.bio = ''
      await firebase.createUser({ email, password }, userPkg)
      // 3. set publicUser profile
      const { uid } = await auth().currentUser
      await set(`${CollectionNames.PUBLIC_USERS}/${uid}`, {
        ...userPkg,
        uid,
      })
      // 4. update profile in firestore
      await updateProfile(userPkg)
    } catch (error) {
      Logger.debug('signupUserHandler: error =', error)
    } finally {
      Logger.debug('finally finished')
    }
  }

  return (
    <AuthContainer
      headerProps={{
        heading: 'Signup',
      }}>
      <Div p="md">
        <Form
          initialValues={{
            name: '',
            nickname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={signupUserHandler}>
          <Input
            label="Name"
            val="name"
            autoCorrect={false}
            textContentType="givenName"
          />
          <Input
            label="Nickname"
            val="nickname"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="nickname"
          />
          <Input
            label="Email"
            val="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Input
            label="Password"
            val="password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            val="confirmPassword"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
          />
          <Div row>
            <Submit title={'Signup'} />
          </Div>
        </Form>
      </Div>
    </AuthContainer>
  )
}

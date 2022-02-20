import * as React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
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
import { Text, Button, Alert, Icon } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import Logger from '@/Utils/Logger'
import { nicknameValidation } from './validation'
import ActionSheetOpener from '@/Components/ActionSheetOpener'
import {
  imagePickerLaunchCamera,
  imagePickerLaunchLibrary,
} from '@/Utils/ImagePicker'
import { StoragePaths } from '@/Constants/FireNames'

const { useState, useEffect } = React
export default function Feed({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useSelector(({ firebase }: any) => firebase)

  const { logout, updateProfile, storage, auth } = firebase
  const { update } = firestore

  const [nicknameAlert, setNicknameAlert] = useState<boolean>(false)
  const [imagePickerType, setimagePickerType] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [activity, setActivity] = useState<boolean>(false)

  const InputActions = () => (
    <Form
      onSubmit={({ nickname }: { nickname: string }) => {
        try {
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
      }
    } catch (error) {
      Logger.error('checkNickNameHandler: error =', error)
    }
  }

  useEffect(checkNickNameHandler, [profile])

  const uploadToServer = async (image: string) => {
    setUploading(true)
    try {
      Logger.debug('uploadToServer: image =', image)
      // const path = StoragePaths.FEED_IMAGES
      // const { uid } = await auth().currentUser
      // const ref = `${path}/${uid}.jpg`
      // const task = await storage().ref(ref).putFile(image)
      // Logger.debug('task =', task)
      // const uploadSnapshot = await storage().ref(ref)
      // const photoURL = await uploadSnapshot.getDownloadURL()
      // await updateProfile({ photoURL })
      // await update(`publicUsers/${uid}`, { photoURL })
    } catch (error) {
      Logger.debug('uploadToServer: error =', error)
    } finally {
      setUploading(false)
    }
  }

  const openImagePicker = () => {
    Logger.debug('openImagePicker: openImagePicker =', imagePickerType)
    setActivity(true)
    try {
      switch (imagePickerType) {
        case 'Camera':
          setTimeout(() => imagePickerLaunchCamera(uploadToServer), 1000)
          break
        case 'Library':
          setTimeout(() => imagePickerLaunchLibrary(uploadToServer), 1000)
          break
        default:
          Logger.debug('is null')
          break
      }
    } catch (error) {
      Logger.debug('openImagePicker: error =', error)
    } finally {
      setimagePickerType(null)
      setActivity(false)
    }
  }

  // handling change of imagePickerType for uploading photo
  useEffect(openImagePicker, [imagePickerType])

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
            suffix: (
              <Div row mx="md">
                <ActionSheetOpener
                  dropdownTitle="Upload Media"
                  dropdownOptions={[
                    {
                      method: () => setimagePickerType('Camera'),
                      text: 'Camera',
                      prefix: (
                        <Icon
                          name="add-a-photo"
                          size="4xl"
                          mr="lg"
                          fontFamily="MaterialIcons"
                        />
                      ),
                    },
                    {
                      method: () => setimagePickerType('Library'),
                      text: 'Choose From Library',
                      prefix: (
                        <Icon
                          name="add-photo-alternate"
                          size="4xl"
                          mr="lg"
                          fontFamily="MaterialIcons"
                        />
                      ),
                    },
                  ]}>
                  <Icon name="plus" size="6xl" />
                </ActionSheetOpener>
              </Div>
            ),
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activity ? (
            <ActivityIndicator size="large" />
          ) : (
            <Div>
              <Text>Home</Text>
              <Button onPress={logout} />
            </Div>
          )}
        </ScrollView>
      </MainContainer>
    </>
  )
}

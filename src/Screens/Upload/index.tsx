import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Button, Icon, Text, ActionSheetOpener } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import Logger from '@/Utils/Logger'
import { generateUUID } from '@/Utils/Misc'
import { StoragePaths } from '@/Constants/FireNames'
import {
  imagePickerLaunchCamera,
  imagePickerLaunchLibrary,
} from '@/Utils/ImagePicker'
import { useAppSelector } from '@/Hooks'
import { validationSchema } from './validation'

interface Props {}

const { useEffect, useState } = React
export default function UploadScreen({}: Props): React.ReactElement {
  // firebase firestore instance
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { auth, storage } = firebase

  // state variables
  const [uploading, setUploading] = useState<boolean>(false)
  const [activity, setActivity] = useState<boolean>(false)
  const [imagePickerType, setImagePickerType] = useState<
    'Camera' | 'Library' | null
  >(null)
  // TODO: handle better
  const [uploadURI, setUploadURI] = useState<any>(null)

  const uploadToServer = async (image: string) => {
    setUploading(true)
    try {
      Logger.debug('uploadToServer: image =', image)
      const path = StoragePaths.FEED_IMAGES
      const { uid } = await auth().currentUser
      const uuid = generateUUID()
      const now = new Date()
      const ref = `${path}/${uid}_${uuid}_${now.toISOString()}.jpg`
      const task = await storage().ref(ref).putFile(image)
      Logger.debug('task =', task)
      const uploadSnapshot = await storage().ref(ref)
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
      setImagePickerType(null)
      setActivity(false)
    }
  }

  // handling change of imagePickerType for uploading photo
  useEffect(openImagePicker, [imagePickerType])

  // TODO: handle better
  const handleSubmit = async (values: any) => {
    Logger.debug('handleSubmit: values =', values)
  }

  return (
    <MainContainer
      headerProps={{
        heading: 'Upload',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <ActionSheetOpener
            dropdownTitle="Upload Media"
            dropdownOptions={[
              {
                method: () => setImagePickerType('Camera'),
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
                method: () => setImagePickerType('Library'),
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
            <Div
              mt="md"
              borderColor="gray400"
              alignSelf="center"
              borderWidth={1}
              rounded="circle"
              h={150}
              w={150}
              alignItems="center"
              justifyContent="center">
              <Icon name="plus" size={50} />
            </Div>
          </ActionSheetOpener>
          <Text>Upload</Text>
          <Form
            initialValues={{
              description: '',
              uploadURI,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <Input val="description" label="Description" />
            {/* <Input val="test" />
            <Input val="test" /> */}
          </Form>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

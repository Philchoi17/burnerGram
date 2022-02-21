import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useAppSelector } from '@/Hooks'

import { MainContainer } from '@/Containers'
import {
  Text,
  Button,
  Icon,
  Image,
  ActionSheetOpener,
  Progress,
} from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { imageURI } from '@/Utils/Misc'
import { validationSchema } from './validation'
import {
  imagePickerLaunchCamera,
  imagePickerLaunchLibrary,
} from '@/Utils/ImagePicker'
import { CollectionNames, StoragePaths } from '@/Constants/FireNames'
import Logger from '@/Utils/Logger'

interface Props {}

const { useEffect, useState } = React
export default function EditProfile({}: Props): JSX.Element {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useAppSelector((state) => state.firebase)
  const { logout, updateProfile, storage, auth } = firebase
  const { update } = firestore

  // state variables
  const [imagePickerType, setImagePickerType] = useState<
    'Camera' | 'Library' | null
  >(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [activity, setActivity] = useState<boolean>(false)
  const [transferred, setTransferred] = useState<number>(0)

  const uploadToServer = async (image: string) => {
    setUploading(true)
    try {
      Logger.debug('uploadToServer: image =', image)
      const path = StoragePaths.PROFILE_IMAGE
      const { uid } = await auth().currentUser
      const ref = `${path}/${uid}.jpg`
      const task = await storage().ref(ref).putFile(image)
      Logger.debug('task =', task)
      const uploadSnapshot = await storage().ref(ref)
      const photoURL = await uploadSnapshot.getDownloadURL()
      await updateProfile({ photoURL })
      await update(`${CollectionNames.PUBLIC_USERS}/${uid}`, { photoURL })
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

  useEffect(openImagePicker, [imagePickerType])

  return (
    <MainContainer
      headerProps={{
        heading: 'Edit Profile',
        headerRest: {
          suffix: (
            <Div row p="md">
              <Button onPress={() => {}}>Done</Button>
            </Div>
          ),
        },
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
            <Div alignItems="center" p="sm">
              {uploading ? (
                <Progress type="circle" progress={transferred} thickness={5} />
              ) : (
                <>
                  <Image
                    source={imageURI(profile.photoURL)}
                    h={100}
                    w={100}
                    rounded="circle"
                  />
                  <Text mt="sm" size="lg" weight="bold" color="blue400">
                    Change Profile Photo
                  </Text>
                </>
              )}
            </Div>
          </ActionSheetOpener>
          <Form
            initialValues={{
              name: profile.name,
              nickname: profile.nickname,
              bio: '',
            }}
            onSubmit={() => {}}
            validationSchema={validationSchema}>
            <Input label="Name" val="name" />
            <Input label="Nickname" val="nickname" />
            <Input label="Bio" val="bio" />
            {/* <Input label="Name" val="name" /> */}
            <Submit title="Done" />
          </Form>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

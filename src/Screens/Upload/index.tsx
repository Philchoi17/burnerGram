import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/native'

import { MainContainer } from '@/Containers'
import { Button, Icon, Text, ActionSheetOpener, Image } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import Logger from '@/Utils/Logger'
import { generateUUID } from '@/Utils/Misc'
import { COLLECTION_NAMES, STORAGE_PATHS } from '@/Constants/FIRE_NAMES'
import {
  imagePickerLaunchCamera,
  imagePickerLaunchLibrary,
} from '@/Utils/ImagePicker'
import { useAppSelector } from '@/Hooks'
import { validationSchema } from './validation'
import { imageURI } from '@/Utils/Misc'

interface Props {}

const { useEffect, useState } = React
export default function UploadScreen({}: Props): React.ReactElement {
  // firebase firestore instance
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { auth, storage } = firebase
  const { add, set } = firestore
  const { profile } = useAppSelector((state) => state.firebase)
  const { goBack } = useNavigation()

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
      const path = STORAGE_PATHS.FEED_IMAGES
      const { uid } = await auth().currentUser
      const uuid = generateUUID()
      const now = new Date()
      const ref = `${path}/${uid}_${uuid}_${now.toISOString()}.jpg`
      const task = await storage().ref(ref).putFile(image)
      Logger.debug('task =', task)
      const uploadSnapshot = await storage().ref(ref)
      const downloadURL = await uploadSnapshot.getDownloadURL()
      return downloadURL
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
        case 'Camera': {
          setTimeout(async () => {
            const uploadPath = await imagePickerLaunchCamera()
            Logger.debug('uploadPath =', uploadPath)
            setUploadURI(uploadPath)
          }, 1000)
          break
        }
        case 'Library': {
          setTimeout(async () => {
            const uploadPath = await imagePickerLaunchLibrary()
            Logger.debug('uploadPath =', uploadPath)
            setUploadURI(uploadPath)
          }, 1000)
          break
        }
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
    // TODO: handle firestore.FieldValue.serverTimestamp() instead of Date.now()
    // TODO: activity indicator for throttling upload
    const now = new Date()
    try {
      // // small patch for uploading photo
      // setUploadURI(null)
      const downloadURL = await uploadToServer(uploadURI)
      const { uid } = await auth().currentUser
      const post = await add(COLLECTION_NAMES.FEED_POSTS, {
        downloadURL,
        userId: uid,
        nickname: profile.nickname,
        postOwner: {
          nickname: profile.nickname,
          photoURL: profile?.photoURL || null,
        },
        description: values.description,
        createdAt: now,
        updatedAt: now,
        // likeCount: 0,
        commentCount: 0,
        // dislikeCount: 0,
        // shareCount: 0,
        supportCount: 0,
        likedUsers: [],
        dislikedUsers: [],
        sharedUsers: [],
        supportedUsers: [],
        commentedUsers: [],
      })
      Logger.debug('post =', post.id)

      await set(`${COLLECTION_NAMES.POST_COMMENTS}/${post.id}`, {
        comments: [],
        createdAt: now,
        updatedAt: now,
      })

      goBack()
      Logger.debug('downloadURL =', downloadURL)
    } catch (error) {
      Logger.error('handleSubmit: error =', error)
    }
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
            {uploadURI ? (
              <Image
                source={imageURI(uploadURI)}
                h={300}
                w={'100%'}
                rounded="lg"
              />
            ) : (
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
            )}
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
            <Submit
              title="Post"
              wide
              disabled={!uploadURI}
              loading={uploading}
            />
          </Form>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

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
import { Text, Button, Icon, Image, ActionSheetOpener } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { imageURI } from '@/Utils/Misc'
import { validationSchema } from './validation'

interface Props {}

export default function EditProfile({}: Props): JSX.Element {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useAppSelector((state) => state.firebase)

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
                method: () => {},
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
                method: () => {},
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
            <Div alignItems="center">
              <Image
                source={imageURI(profile.photoURL)}
                h={100}
                w={100}
                rounded="circle"
              />
              <Text mt="sm" size="lg" weight="bold" color="blue400">
                Change Profile Photo
              </Text>
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

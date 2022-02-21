import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import { useRoute } from '@react-navigation/native'

import { imageURI } from '@/Utils/Misc'
import { Text, Button, Icon, Image } from '@/Components'
import { Form, Input, Submit } from '@/Components/Forms'
import { MainContainer } from '@/Containers'
import Logger from '@/Utils/Logger'
import { validationSchema } from './validation'
import KeyboardAvoider from '@/Components/KeyboardAvoider'

interface Props {}

const { useEffect, useState } = React
export default function CommentPost({}: Props) {
  const { params }: any = useRoute()
  const {
    feedPost: { downloadURL, description, postOwner },
  } = params

  const commentPostUseEffectHandler = () => {
    Logger.debug('CommentPost: commentPostUseEffectHandler: params =', params)
  }

  useEffect(commentPostUseEffectHandler, [])

  return (
    <MainContainer
      headerProps={{
        heading: 'Comment Post',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Div row p="md" alignItems="center" justifyContent="space-between">
            <Div row alignItems="center">
              <Image
                source={imageURI(postOwner.photoURL)}
                h={44}
                w={44}
                rounded="circle"
              />
              <Text size="xl" ml="sm" color="gray600">
                {postOwner.nickname}
              </Text>
            </Div>
            <Button onPress={() => {}} bg="transparent">
              <Icon name="more" size="4xl" />
            </Button>
          </Div>
          <Image
            source={imageURI(downloadURL)}
            h={200}
            w={'100%'}
            rounded="xl"
          />
          <Text size="xl" color="gray600" mt="sm" ml="xs">
            {description}
          </Text>
          <Div>
            <KeyboardAvoider>
              <Form
                validationSchema={validationSchema}
                initialValues={{
                  comment: '',
                }}
                onSubmit={() => {}}>
                <Input val="comment" />
                <Submit title="Comment" />
              </Form>
            </KeyboardAvoider>
          </Div>
        </Div>
      </ScrollView>
    </MainContainer>
  )
}

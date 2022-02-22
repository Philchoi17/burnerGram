import * as React from 'react'
import { Div } from 'react-native-magnus'
import dayjs from 'dayjs'

import { Image, Text } from '@/Components'
import { imageURI } from '@/Utils/Misc'
import Logger from '@/Utils/Logger'
import { commentType } from '@/Types'

interface Props {
  comment: commentType
}

export default function ({ comment }: Props): JSX.Element {
  const replyHandler = () => {
    Logger.debug('Reply to comment')
  }
  return (
    <Div p="md" rounded="md" m="xs" borderWidth={0.3} borderColor="gray400">
      <Div row alignItems="flex-start">
        <Image
          source={imageURI(comment.commentOwnerPhotoURL)}
          h={33}
          w={33}
          rounded="circle"
        />
        <Text ml="sm" mt="xs">
          <Text weight="bold">{comment.commentOwnerName}</Text>
          <Text>{': ' + comment.comment}</Text>
        </Text>
      </Div>
      <Div mt="sm" row alignItems="center">
        <Text size="sm" color="gray500" ml="md">
          {dayjs(comment.updatedAt.toDate()).format('YYYY.MM.DD')}
        </Text>
        <Text ml="lg" color="gray600" onPress={replyHandler}>
          reply
        </Text>
      </Div>
    </Div>
  )
}

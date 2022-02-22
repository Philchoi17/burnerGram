import * as React from 'react'
import { Div } from 'react-native-magnus'
import dayjs from 'dayjs'

import { Image, Text } from '@/Components'
import { imageURI } from '@/Utils/Misc'

interface Props {
  comment: any
}

export default function ({ comment }: Props): JSX.Element {
  return (
    <Div p="md" rounded="md" m="xs" borderWidth={0.3} borderColor="gray400">
      <Div row alignItems="flex-start">
        <Image
          source={imageURI(comment.commentOwnerPhotoURL)}
          h={33}
          w={33}
          rounded="circle"
        />
        <Text ml="sm">
          <Text weight="bold">{comment.commentOwnerName}</Text>
          <Text>{' ' + comment.comment}</Text>
        </Text>
      </Div>
      <Div mt="sm">
        <Text size="sm" color="gray500" ml="md">
          {dayjs(comment.updatedAt.toDate()).format('YYYY.MM.DD')}
        </Text>
      </Div>
    </Div>
  )
}

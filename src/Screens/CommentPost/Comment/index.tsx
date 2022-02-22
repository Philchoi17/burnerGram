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
    <>
      <Div p="md" row borderWidth={1} rounded="md" m="xs">
        <Div row alignItems="flex-start">
          <Image
            source={imageURI(comment.commentOwnerPhotoURL)}
            h={44}
            w={44}
            rounded="circle"
          />
          <Text ml="sm">
            <Text weight="bold">{comment.commentOwnerName}</Text>
            <Text>{' ' + comment.comment}</Text>
          </Text>
        </Div>
      </Div>
      <Text size="sm" color="gray500" ml="md">
        {dayjs(comment.updatedAt.toDate()).format('YYYY.MM.DD')}
      </Text>
    </>
  )
}

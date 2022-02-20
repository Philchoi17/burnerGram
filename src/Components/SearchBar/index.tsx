import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { Div, Input } from 'react-native-magnus'

import { Icon } from '@/Components'

interface Props {
  placeholder?: string
}
// TODO: add more functionality
export default function ({ placeholder = 'search' }: Props) {
  return (
    <Div my="md">
      <Input
        placeholder={placeholder}
        p="md"
        focusBorderColor="blue700"
        suffix={
          <TouchableOpacity>
            <Icon
              name="search"
              color="gray400"
              fontFamily="MaterialIcons"
              size="5xl"
            />
          </TouchableOpacity>
        }
      />
    </Div>
  )
}

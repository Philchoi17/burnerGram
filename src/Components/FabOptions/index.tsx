import * as React from 'react'
import { Fab, Div } from 'react-native-magnus'

import { Button, Icon, Text } from '@/Components'

interface OptionProps {
  title: string
  icon: string
  method: () => void
}

interface Props {
  options: OptionProps[]
}

// TODO: Styling
export default function ({ options }: Props) {
  return (
    <Fab bg="blue600" h={50} w={50}>
      {options.map(({ title, method, icon }, idx) => (
        <Button
          key={String(idx)}
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          onPress={method}>
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">{title}</Text>
          </Div>
          <Icon
            name={icon}
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
      ))}
    </Fab>
  )
}

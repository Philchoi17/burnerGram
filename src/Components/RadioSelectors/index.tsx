import * as React from 'react'
import { Radio, RadioProps, Div } from 'react-native-magnus'

import Text from '../Text'

interface Props extends RadioProps {
  options: string[]
  rest?: any
}

const { Group } = Radio
export default function ({ options, ...rest }: Props) {
  return (
    <Group row flex={1} m="sm">
      {options.map((option: string, idx: number) => (
        <Radio key={idx} value={option} {...rest}>
          {({ checked }) => (
            <Div
              bg={checked ? 'blue600' : 'blue100'}
              px="xl"
              py="md"
              mr="md"
              rounded="circle">
              <Text color={checked ? 'white' : 'gray800'}>{option}</Text>
            </Div>
          )}
        </Radio>
      ))}
    </Group>
  )
}

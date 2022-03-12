import Logger from '@/Utils/Logger'
import * as React from 'react'
import { Radio, RadioProps, Div } from 'react-native-magnus'

import Text from '../Text'

interface Props extends RadioProps {
  options: string[]
  rest?: any
  setSelected: (selected: string) => void
}

const { Group } = Radio
export default function ({ options, setSelected, ...rest }: Props) {
  return (
    <Group row flex={1} m="sm" defaultValue={options[0]}>
      {options.map((option: string, idx: number) => (
        <Radio
          key={idx}
          value={option}
          {...rest}
          onPress={() => setSelected(option)}>
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

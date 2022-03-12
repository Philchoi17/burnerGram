import * as React from 'react'
import { Collapse, CollapseProps } from 'react-native-magnus'

import Icon from '../Icon'
import Text from '../Text'

interface Props extends CollapseProps {
  heading: string
  bodyText: string
  rest?: any
}

const { Header, Body } = Collapse
export default function ({ heading, bodyText, ...rest }: Props) {
  return (
    <Collapse {...rest}>
      <Header
        active
        color="gray900"
        fontSize="md"
        p="xl"
        px="none"
        prefix={<Icon name="plus" mr="md" color="gray400" />}>
        {heading}
      </Header>
      <Body pb="xl">
        <Text>{bodyText}</Text>
      </Body>
    </Collapse>
  )
}

import * as React from 'react'
import { Overlay, OverlayProps, Div } from 'react-native-magnus'

import { Text, Button } from '@/Components'

interface Props extends OverlayProps {
  visible: boolean
  alertMsg: string
  alertTitle?: string
  actionButtons?: boolean
  withInput?: boolean
  inputActions?: JSX.Element
  confirmAction?: () => void
  cancelAction?: () => void
}

export default function ({
  visible,
  alertMsg,
  alertTitle,
  actionButtons,
  confirmAction = () => {},
  cancelAction = () => {},
  withInput,
  inputActions,
}: Props) {
  return (
    <Overlay visible={visible} p="xl">
      {alertTitle && (
        <Text size="2xl" fontWeight="700" textAlign="center">
          {alertTitle}
        </Text>
      )}
      <Text p="lg" size="lg">
        {alertMsg}
      </Text>
      {withInput && inputActions}
      {actionButtons && (
        <Div p="md" row justifyContent="center">
          <Button mx="sm" onPress={confirmAction} w={100}>
            Confirm
          </Button>
          <Button mx="sm" onPress={cancelAction} w={100}>
            Cancel
          </Button>
        </Div>
      )}
    </Overlay>
  )
}

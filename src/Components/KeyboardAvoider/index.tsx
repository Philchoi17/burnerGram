import * as React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'

interface Props {
  offset?: number
  children: JSX.Element | any
}

export default function ({ children, offset = 100 }: Props) {
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={offset}>
      <Div bg="light">{children}</Div>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
})

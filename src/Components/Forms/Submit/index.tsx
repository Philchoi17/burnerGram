import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useFormikContext } from 'formik'

import { Button, Icon } from '@/Components'

interface Props {
  title?: string
  wide?: boolean
  inputSuffix?: boolean
  suffixName?: string
  loading?: boolean
  disabled?: boolean
  iconSize?: number | string
}

export default function ({
  title,
  wide = false,
  inputSuffix,
  suffixName,
  loading,
  disabled = false,
  iconSize = '3xl',
}: Props) {
  const { handleSubmit } = useFormikContext()
  if (inputSuffix) {
    return (
      <TouchableOpacity onPress={handleSubmit} disabled={disabled}>
        <Icon name={suffixName ? suffixName : 'plus'} size={iconSize} />
      </TouchableOpacity>
    )
  }
  return (
    <Button
      block={wide}
      onPress={handleSubmit}
      loading={loading}
      disabled={disabled}>
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({})

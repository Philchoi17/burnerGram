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
}

export default function ({
  title,
  wide = false,
  inputSuffix,
  suffixName,
  loading,
}: Props) {
  const { handleSubmit } = useFormikContext()
  if (inputSuffix) {
    return (
      <TouchableOpacity onPress={handleSubmit}>
        <Icon name={suffixName ? suffixName : 'add'} />
      </TouchableOpacity>
    )
  }
  return (
    <Button block={wide} onPress={handleSubmit} loading={loading}>
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({})

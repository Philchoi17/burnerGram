import * as React from 'react'

import { Text } from '@/Components'

interface Props {
  // make better later
  error: string | null | undefined | any
  visible: boolean | null | undefined | any
}

export default function ({ error, visible }: Props): JSX.Element | null {
  if (!visible || !error) return null
  return (
    <Text color="error" mb="xs">
      {error}
    </Text>
  )
}

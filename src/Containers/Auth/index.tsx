import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Header } from '@/Components'

interface HeaderProps {
  heading: string
  suffix?: React.ReactNode
}

interface Props {
  children: React.ReactNode
  headerProps?: HeaderProps
}

export default function AuthContainer({
  children,
  headerProps,
}: Props): React.ReactElement {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <Div bg="light" flex={1} pb={bottom} pt={top}>
      {headerProps && (
        <Header
          bottomLine
          suffix={headerProps.suffix ? headerProps.suffix : null}>
          {headerProps.heading}
        </Header>
      )}
      {children}
    </Div>
  )
}

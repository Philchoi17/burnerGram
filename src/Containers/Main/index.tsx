import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Header } from '@/Components'

interface HeaderProps {
  heading?: string
  suffix?: React.ReactNode
  headerRest?: any
}

interface Props {
  children: any
  headerProps?: HeaderProps
}

export default function MainContainer({
  children,
  headerProps,
}: Props): React.ReactElement {
  const { top, bottom } = useSafeAreaInsets()
  return (
    <Div bg="light" flex={1} pt={top} pb={bottom}>
      {headerProps && (
        <Header
          bottomLine
          suffix={headerProps.suffix ? headerProps.suffix : null}
          {...headerProps.headerRest}>
          {headerProps.heading}
        </Header>
      )}
      {children}
    </Div>
  )
}

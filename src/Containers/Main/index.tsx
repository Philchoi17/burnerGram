import * as React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
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
  scrollable?: boolean
}

export default function MainContainer({
  children,
  headerProps,
  scrollable = false,
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
      {scrollable ? (
        <ScrollDiv showsVerticalScrollIndicator={false}>{children}</ScrollDiv>
      ) : (
        <Div>{children}</Div>
      )}
    </Div>
  )
}

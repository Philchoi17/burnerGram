import * as React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'react-native-magnus'

import Theme from '@/Theme'

import Navigator from './Navigators'
import RRFProvider from './Store'

export default function ({}) {
  return (
    <RRFProvider>
      <ThemeProvider theme={Theme.default}>
        <StatusBar barStyle="dark-content" />
        <Navigator />
      </ThemeProvider>
    </RRFProvider>
  )
}

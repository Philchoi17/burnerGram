import * as React from 'react'
import { TouchableOpacity } from 'react-native'

interface Props {
  children: React.ReactNode
  delay: number
  onPress: () => void
  doublePress: () => void
}

export default function DoubleTap({
  children,
  delay,
  onPress,
  doublePress,
}: Props): React.ReactElement {
  let firstPress: boolean = true
  let lastTime = new Date().getTime()
  let timer: any = false

  const doubleTap = () => {
    let now = new Date().getTime()
    if (firstPress) {
      firstPress = false
      timer = setTimeout(() => {
        onPress()
        firstPress = true
        timer = false
      }, delay)
      lastTime = now
    } else {
      let delta = new Date().getTime() - lastTime < delay
      if (delta) {
        clearTimeout(timer)
        firstPress = true
        doublePress()
      }
    }
  }

  return <TouchableOpacity onPress={doubleTap}>{children}</TouchableOpacity>
}

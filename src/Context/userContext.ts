import * as React from 'react'

interface UserContextProps {
  lang: string
  switchLang: (lang: string) => void
  user: any
  setUser: (_user: any) => void
}

const { createContext } = React
export default createContext<UserContextProps>({
  lang: 'en',
  switchLang: () => {},
  user: null,
  setUser: () => {},
})

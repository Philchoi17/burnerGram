import * as React from 'react'

interface UserContextProps {
  lang: string
  switchLang: (lang: string) => void
}

const { createContext } = React
export default function UserContext({ lang, switchLang }: UserContextProps) {
  createContext({
    lang: '',
    switchLang: (_lang: string) => {},
  })
}

// export interface UserTypeContextType {
//   // userType: string
//   lang: string
//   setUserType: (userType: string) => void
//   switchLang: (lang: string) => void
// }

// export default function UserTypeContext React.Context<UserTypeContextType> =
//   React.createContext({
//     // userType: 'client',
//     lang: '',
//     setUserType: (_userType: string) => {},
//     switchLang: (_lang: string) => {},
//     // setLang: (_lang: string) => {},
//   })

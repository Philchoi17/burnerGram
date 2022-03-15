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

// export default function UserContext({
//   lang,
//   switchLang,
//   user,
//   setUser,
// }: UserContextProps) {
//   createContext({
//     lang: '',
//     switchLang: (_lang: string) => {},
//     user: null,
//     setUser: (_user: any) => {},
//   })
// }

// export interface UserTypeContextType {
//   // userType: string
//   lang: string
//   setUserType: (userType: string) => void
//   switchLang: (lang: string) => void
// }

// export default function UserTypeContext: React.Context<UserContextProps> =
//   React.createContext({
//     // userType: 'client',
//     lang: '',
//     setUserType: (_userType: string) => {},
//     switchLang: (_lang: string) => {},
//     // setLang: (_lang: string) => {},
//   })

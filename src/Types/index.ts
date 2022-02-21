import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type profileType = {
  bio?: string
  createdAt: FirebaseFirestoreTypes.Timestamp
  createdWithSocialLogin: boolean
  email: string
  lastSeenAt: FirebaseFirestoreTypes.Timestamp
  name: string
  nickname: string
  photoURL?: string | null
  updatedAt: FirebaseFirestoreTypes.Timestamp
}

// type used in usage examples
export type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked'
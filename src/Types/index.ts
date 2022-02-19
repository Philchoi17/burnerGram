import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type profileType = {
  createdAt: FirebaseFirestoreTypes.Timestamp
  createdWithSocialLogin: boolean
  email: string
  lastSeenAt: FirebaseFirestoreTypes.Timestamp
  name: string
  nickname: string
  photoURL?: string | null
  updatedAt: FirebaseFirestoreTypes.Timestamp
}

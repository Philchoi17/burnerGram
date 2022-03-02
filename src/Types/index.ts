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
  earnedSupport?: number
}

// type used in usage examples
export type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked'

export type commentType = {
  commentOwnerPhotoURL: string
  commentOwnerName: string
  comment: string
  commentOwner: string
  updatedAt: FirebaseFirestoreTypes.Timestamp
  createdAt: FirebaseFirestoreTypes.Timestamp
}

export type feedType = {}

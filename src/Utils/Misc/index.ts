import RNFS from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'
import Logger from '../Logger'

export function imageURI(uri: string): { uri: string } {
  return { uri }
}

export function generateUUID(): string {
  return String(uuid.v4())
}

export function getFirestoreRef(path: string) {
  return RNFS().doc(path)
}

// export function removeFromArray(array: any[], item: any) {
//   const index = array.indexOf(item)
//   if (index > -1) {
//     array.splice(index, 1)
//   }
//   return array
// }

import uuid from 'react-native-uuid'
import Logger from '../Logger'

export function imageURI(uri: string): { uri: string } {
  return { uri }
}

export function generateUUID(): string {
  return String(uuid.v4())
}

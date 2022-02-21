import {
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker'
import Logger from '@/Utils/Logger'
import { Platform } from 'react-native'

const options: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 200,
  maxHeight: 200,
}

function uploadURIFormatter(uri: string) {
  return Platform.OS == 'ios' ? uri.replace('file://', '') : uri
}

// TODO: change any for assets to Asset[]
export const imagePickerLaunchCamera = async (
  savingScheme: (image: string) => void,
) => {
  const response: ImagePickerResponse = await launchCamera(options)
  Logger.debug('imagePickerLaunchCamera: response =', response)
  try {
    const { assets }: any = response
    const uploadUri = uploadURIFormatter(assets[0].uri)
    savingScheme(uploadUri)
  } catch (error) {
    Logger.debug('imagePickerLaunchCamera: error =', error)
  }
}

export const imagePickerLaunchLibrary = async (
  savingScheme: (image: string) => void,
) => {
  const response: ImagePickerResponse = await launchImageLibrary(options)
  Logger.debug('imagePickerLaunchLibrary: response =', response)
  try {
    const { assets }: any = response
    const uploadUri = uploadURIFormatter(assets[0].uri)
    savingScheme(uploadUri)
  } catch (error) {
    Logger.debug('imagePickerLaunchLibrary: error =', error)
  }
}

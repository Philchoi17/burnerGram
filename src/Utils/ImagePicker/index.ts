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
  maxWidth: 1000,
  maxHeight: 1000,
}

function uploadURIFormatter(uri: string) {
  return Platform.OS == 'ios' ? uri.replace('file://', '') : uri
}

// TODO: change any for assets to Asset[]
export const imagePickerLaunchCamera = async (
  savingScheme: null | ((image: string) => void) = null,
) => {
  const response: ImagePickerResponse = await launchCamera(options)
  Logger.debug('imagePickerLaunchCamera: response =', response)
  try {
    const { assets }: any = response
    const uploadURI = uploadURIFormatter(assets[0].uri)
    if (savingScheme) return savingScheme(uploadURI)
    return uploadURI
  } catch (error) {
    Logger.debug('imagePickerLaunchCamera: error =', error)
  }
}

export const imagePickerLaunchLibrary = async (
  savingScheme: null | ((image: string) => void) = null,
) => {
  const response: ImagePickerResponse = await launchImageLibrary(options)
  Logger.debug('imagePickerLaunchLibrary: response =', response)
  try {
    const { assets }: any = response
    const uploadURI = uploadURIFormatter(assets[0].uri)
    if (savingScheme) return savingScheme(uploadURI)
    return uploadURI
  } catch (error) {
    Logger.debug('imagePickerLaunchLibrary: error =', error)
  }
}

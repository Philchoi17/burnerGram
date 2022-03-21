import Logger from '@/Utils/Logger'
import PhoneStorage from '@/Utils/PhoneStorage'
import StorageItemNames from '@/Utils/PhoneStorage/StorageItemNames'

class Config {
  Logger = {}

  PhoneStorage = PhoneStorage

  constructor() {
    this.Logger = Logger
    this.PhoneStorage = PhoneStorage
  }

  // init function when app is started
  async init() {}

  // function when app is resumed
  async resume() {}

  // function when app is paused
  async pause() {}

  // function when app is terminated
  async terminate() {}

  // function when app is launched
  async launch() {}

  async setFCMToken(token: string): Promise<void> {
    await this.PhoneStorage.set(StorageItemNames.FCM_TOKEN, token)
  }

  async getFCMToken(): Promise<string | null | undefined> {
    const token = await this.PhoneStorage.get(StorageItemNames.FCM_TOKEN)
    return token
  }

  log = Logger
}

export default new Config()

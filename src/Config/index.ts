import Logger from '@/Utils/Logger'
import PhoneStorage from '@/Utils/PhoneStorage'
import StorageItemNames from '@/Utils/PhoneStorage/StorageItemNames'
import appConfig from './appConfig.json'

interface IConfig {
  appConfig: any
  phoneStorage: typeof PhoneStorage
  logger: typeof Logger
  storageItemNames: typeof StorageItemNames
}

class Config {
  log = Logger

  storage = PhoneStorage

  // app config
  LANG = appConfig.LANG
  BASE_URL = appConfig.BASE_URL
  APP_MODE: 'DEV' | 'PROD' | 'STG' = 'PROD'
  // APP_VERSION = appConfig.APP_VERSION

  constructor() {
    this.log = Logger
    this.storage = PhoneStorage
    this.LANG = appConfig.LANG
    this.BASE_URL = appConfig.BASE_URL
    this.APP_MODE = 'PROD'
    // this.APP_VERSION = appConfig.APP_VERSION
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

  getBaseEp(appMode: 'PROD' | 'DEV' | 'STG' = this.APP_MODE): string {
    return this.BASE_URL[appMode]
  }

  async setFCMToken(token: string): Promise<void> {
    await this.storage.set(StorageItemNames.FCM_TOKEN, token)
  }

  async getFCMToken(): Promise<string | null | undefined> {
    const token = await this.storage.get(StorageItemNames.FCM_TOKEN)
    return token
  }
}

export default new Config()

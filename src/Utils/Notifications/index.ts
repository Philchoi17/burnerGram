import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'

import Logger from '../Logger'
import Config from '@/Config'

const { AuthorizationStatus } = messaging
class Notifications {
  constructor() {}

  public async requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL

      if (enabled) {
        Logger.debug('Authorization: status', authStatus)
      }
      Logger.debug('Authorization: enabled', authStatus)
      return authStatus
    } catch (error) {
      Logger.error(error)
    }
  }

  public async getFCMToken() {
    try {
      const hasToken = await Config.getFCMToken()
      if (hasToken) {
        Logger.debug('getFCMToken: token =', hasToken)
        return
      }
      const fcmToken = await messaging().getToken()
      Logger.debug('getFCMToken: fcmToken =', fcmToken)

      await Config.setFCMToken(fcmToken)
    } catch (error) {
      Logger.error('getFCMToken: error: =', error)
    }
  }

  public notificationListener() {
    messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        Logger.debug(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        )
      },
    )

    messaging()
      .getInitialNotification()
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (remoteMessage) {
          Logger.debug(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          )
        }
      })

    messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        Logger.debug('Message received on foreground state: ...', remoteMessage)
      },
    )
  }
}

export default new Notifications()

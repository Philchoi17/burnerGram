import Logger from '@/Utils/Logger'
import endpoints from './endpoints'

/**
 *
 * @param uid
 * @param userDetails
 */
export async function createCustomToken(uid: string, userDetails: any) {
  // endpoints.CUSTOM_TOKEN
  const { data: token } = await endpoints.CUSTOM_TOKEN(uid, userDetails)
  Logger.debug('createCustomToken', token)
  return token
}

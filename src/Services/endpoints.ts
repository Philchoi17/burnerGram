import axios from 'axios'
import Config from '@/Config'

let baseHeaders = {
  'Content-Type': 'application/json',
}

const EP = axios.create({
  baseURL: Config.getBaseEp(),
  timeout: 10000,
  headers: baseHeaders,
})

export default Object.freeze({
  // auth
  CUSTOM_TOKEN: (uid: string, userDetails: any) =>
    EP.post('/createCustomToken', {
      uid,
      userDetails,
    }),
})

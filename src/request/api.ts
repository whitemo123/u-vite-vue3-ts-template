import config from '@/config'
import Http from './http'

const api = new Http(config.base + config.prefix.http)
export default api

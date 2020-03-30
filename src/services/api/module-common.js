import { httpClient } from '../request'
import { URLConfig } from '../urls'

// 公共服务的接口地址
const basicConfig = {
  baseURL: URLConfig.publicApiHost
}

// 下载文件(除了公有类型的之外)
export const getFiles = fileParams => {
  const { fileNanme, params = {} } = fileParams
  return httpClient.get(
    `/files/${fileNanme}`,
    params,
    Object.assign({}, basicConfig, { responseType: 'blob' })
  )
}

// 省份
export const getProvinces = ({ countryCode = 86, code }) => {
  return httpClient.get('/provinces', { countryCode, code }, basicConfig)
}

// 市
export const getCities = ({ countryCode = 86, provinceCode, code }) => {
  return httpClient.get(
    '/cities',
    { countryCode, provinceCode, code },
    basicConfig
  )
}

// 县
export const getCounties = ({
  countryCode = 86,
  provinceCode,
  cityCode,
  code
}) => {
  return httpClient.get(
    '/counties',
    {
      countryCode,
      provinceCode,
      cityCode,
      code
    },
    basicConfig
  )
}

// 司法所
export const getJurisdictions = ({ pid = 0 }) => {
  return httpClient.get('/sys/jurisdiction/queryJurisdictionsByPid', { pid })
}

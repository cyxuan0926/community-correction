import { httpClient } from '../request'

// 下载文件(除了公有类型的之外)
export const getFiles = fileParams => {
  const { fileNanme, params = {} } = fileParams
  return httpClient.get(`/files/${fileNanme}`, params, { responseType: 'blob' })
}

// 省份
export const getProvinces = ({ countryCode = 86, code }) => {
  return httpClient.get('/provinces', { countryCode, code })
}

// 市
export const getCities = ({ countryCode = 86, provinceCode, code }) => {
  return httpClient.get('/cities', { countryCode, provinceCode, code })
}

// 县
export const getCounties = ({
  countryCode = 86,
  provinceCode,
  cityCode,
  code
}) => {
  return httpClient.get('/counties', {
    countryCode,
    provinceCode,
    cityCode,
    code
  })
}

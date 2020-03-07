import { httpClient } from '../request'

// 下载文件(除了公有类型的之外)
export const getFiles = fileParams => {
  const { fileNanme, params = {} } = fileParams
  return httpClient.get(`/files/${ fileNanme }`, params, { responseType: 'blob' })
}
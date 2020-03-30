import axios from 'axios'
import qs from 'qs'
import { requestConfig } from './config'
import { requestHandler } from './request-handler'
import { responseHandler } from './response-handler'

// 请求class
class HttpClient {
  instance = null

  constructor(config, requestHandler, responseHandler) {
    // axios 实例
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => (requestHandler ? requestHandler(config) : config),
      error => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => responseHandler(response),
      error => {
        const response = error.response || error
        return responseHandler(response)
      }
    )
  }

  // GET请求
  get(url = '', params = {}, config = {}) {
    return this.instance.get(url, Object.assign({ params }, config))
  }

  // post 请求(JSON)
  post(url = '', data = {}, config = {}) {
    return this.instance.post(url, data, config)
  }

  // post请求(表单)
  postForm(url = '', data = {}, config = {}) {
    return this.instance.post(
      url,
      qs.stringify(data),
      Object.assign({}, config, {
        header: { 'content-Type': 'application/x-www-form-urlencoded' }
      })
    )
  }

  // post请求(文件)
  postFile(url = '', fileParams = {}, config = {}) {
    const { files, type = 'PUBLIC' } = fileParams
    const data = new FormData()
    data.append('file', files)
    data.append('type', type)
    return this.instance.post(
      url,
      data,
      Object.assign({}, config, {
        header: { 'content-type': 'multipart/form-data' }
      })
    )
  }

  // DELETE请求(urlencoded)
  delete(url = '', params = {}, config = {}) {
    return this.instance.delete(url, Object.assign({ params }, config))
  }

  // PUT请求(urlencoded)
  put(url = '', params = {}, config = {}) {
    return this.instance.put(url, Object.assign({ params }, config))
  }
}

// httpClient 实例
export const httpClient = new HttpClient(
  requestConfig,
  requestHandler,
  responseHandler
)

import store from '@/store'

export async function requestHandler(config) {
  const { access_token, token_type } = store.state.account.token

  if (access_token) {
    config.headers.Authorization = `${token_type} ${access_token}`
  }

  return config
}

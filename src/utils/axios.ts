import axios from 'axios'

const internal = axios.create({
  baseURL: process.env.BASE_URL || 'https://metaco-api-bima.herokuapp.com/',
  withCredentials: false,
})

internal.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  }
  return config
})

export default internal

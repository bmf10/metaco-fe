import type { AxiosResponse } from 'axios'
import axios from 'utils/axios'
import type { StartActionPayload, SuccessActionPayload } from './types'

export type Response = AxiosResponse<SuccessActionPayload>

export const load = (params?: StartActionPayload): Promise<Response> => {
  return axios.get(`/tournament-result`, { params })
}

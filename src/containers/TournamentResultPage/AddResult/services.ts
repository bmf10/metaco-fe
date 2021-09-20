import type { AxiosResponse } from 'axios'
import axios from 'utils/axios'
import type { SubmitActionPayload } from './types'

export const submit = (
  payload: SubmitActionPayload
): Promise<AxiosResponse> => {
  return axios.post(`/tournament-result`, payload)
}

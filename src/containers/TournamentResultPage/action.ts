import { START_ACTION } from './constants'
import { StartAction, StartActionPayload } from './types'

export interface ReloadActionCreator {
  (payload?: StartActionPayload): StartAction
}

export const reloadResult: ReloadActionCreator = (payload) => ({
  type: START_ACTION,
  payload,
})

import {
  ERROR_ACTION,
  RESET_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'
import type { ReduxReducer, ReduxState } from './types'

export const defaultState: ReduxState = {
  loading: false,
  message: undefined,
  data: [],
  page: 1,
  total: 0,
}

export const reducer: ReduxReducer = (
  state = defaultState,
  action
): ReduxState => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      }
    case SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        total: action.payload.total,
      }
    case ERROR_ACTION:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case RESET_ACTION:
      return {
        ...state,
        message: undefined,
      }
    default:
      return state
  }
}

export default reducer

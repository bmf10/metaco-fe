import {
  ERROR_ACTION,
  RESET_ACTION,
  SUBMIT_ACTION,
  SUCCESS_ACTION,
} from './constants'
import type { FormState, FormReducer } from './types'

export const defaultState: FormState = {
  loading: false,
  message: undefined,
  success: false,
}

export const reducer: FormReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_ACTION:
      return {
        ...state,
        loading: true,
      }
    case SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        success: true,
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
        success: false,
      }
    default:
      return state
  }
}

export default reducer

import { useMemo } from 'react'
import type { ResetAction, SubmitAction, SubmitActionPayload } from './types'
import { useDispatch as useReduxDispatch } from 'react-redux'
import { RESET_ACTION, SUBMIT_ACTION } from './constants'

export interface Dispatch {
  readonly submit: (payload: SubmitActionPayload) => void
  readonly reset: () => void
}

export const useDispatch = (): Dispatch => {
  const dispatch = useReduxDispatch()
  return useMemo(
    () => ({
      submit: (payload) => {
        dispatch<SubmitAction>({
          payload,
          type: SUBMIT_ACTION,
        })
      },
      reset: () => {
        dispatch<ResetAction>({
          type: RESET_ACTION,
        })
      },
    }),
    [dispatch]
  )
}

export default useDispatch

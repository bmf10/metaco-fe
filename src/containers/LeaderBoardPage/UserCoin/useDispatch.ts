import { useMemo } from 'react'
import type {
  ResetAction,
  SearchAction,
  StartAction,
  StartActionPayload,
} from './types'
import { useDispatch as useReduxDispatch } from 'react-redux'
import { RESET_ACTION, SEARCH_ACTION, START_ACTION } from './constants'

export interface Dispatch {
  readonly load: (payload?: StartActionPayload) => void
  readonly reset: () => void
  readonly search: (search: string) => void
}

export const useDispatch = (): Dispatch => {
  const dispatch = useReduxDispatch()
  return useMemo(
    () => ({
      load: (payload) => {
        dispatch<StartAction>({
          payload,
          type: START_ACTION,
        })
      },
      reset: () => {
        dispatch<ResetAction>({
          type: RESET_ACTION,
        })
      },
      search: (search) => {
        dispatch<SearchAction>({
          type: SEARCH_ACTION,
          payload: { search },
        })
      },
    }),
    [dispatch]
  )
}

export default useDispatch

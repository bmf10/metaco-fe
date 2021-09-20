import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  SEARCH_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'

export interface Team {
  readonly id: number
  readonly name: string
  readonly logo: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly captainId: number
  readonly tournamentId: number
}

export interface StartActionPayload {
  readonly perPage?: number
  readonly page?: number
  readonly search?: string
}

export interface StartAction extends Action<typeof START_ACTION> {
  readonly payload?: StartActionPayload
}

export interface SuccessActionPayload {
  readonly perPage: number
  readonly page: number
  readonly data: ReadonlyArray<Team>
}

export interface SuccessAction extends Action<typeof SUCCESS_ACTION> {
  readonly payload: SuccessActionPayload
}

export interface ErrorActionPayload {
  readonly message: string
}

export interface ErrorAction extends Action<typeof ERROR_ACTION> {
  readonly payload: ErrorActionPayload
}

export type ResetAction = Action<typeof RESET_ACTION>

export interface SearchAction extends Action<typeof SEARCH_ACTION> {
  readonly payload: {
    readonly search: string
  }
}

export type ReduxAction =
  | StartAction
  | SuccessAction
  | ErrorAction
  | ResetAction
  | SearchAction

export interface ReduxState extends StartActionPayload {
  readonly loading: boolean
  readonly message?: string
  readonly data: ReadonlyArray<Team>
}

export interface ReduxRootState extends RootState {
  readonly team: ReduxState
}

export type ReduxReducer = Reducer<ReduxState, ReduxAction>

import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  SEARCH_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'

export interface Tournament {
  readonly id: number
  readonly title: string
  readonly startDate: Date
  readonly endDate: Date
  readonly teamCount: number
  readonly slot: number
  readonly createdAt: Date
  readonly updatedAt: Date
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
  readonly data: ReadonlyArray<Tournament>
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
  readonly data: ReadonlyArray<Tournament>
}

export interface ReduxRootState extends RootState {
  readonly tournament: ReduxState
}

export type ReduxReducer = Reducer<ReduxState, ReduxAction>

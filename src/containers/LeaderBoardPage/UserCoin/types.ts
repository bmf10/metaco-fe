import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'

export interface User {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly coin: number
  readonly picture: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface StartActionPayload {
  readonly perPage?: number
  readonly page?: number
  readonly search?: number
}

export interface StartAction extends Action<typeof START_ACTION> {
  readonly payload?: StartActionPayload
}

export interface SuccessActionPayload {
  readonly perPage: number
  readonly page: number
  readonly data: ReadonlyArray<User>
  readonly total: number
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

export type ReduxAction =
  | StartAction
  | SuccessAction
  | ErrorAction
  | ResetAction

export interface ReduxState extends StartActionPayload {
  readonly loading: boolean
  readonly message?: string
  readonly data: ReadonlyArray<User>
  readonly total: number
}

export interface ReduxRootState extends RootState {
  readonly userCoin: ReduxState
}

export type ReduxReducer = Reducer<ReduxState, ReduxAction>

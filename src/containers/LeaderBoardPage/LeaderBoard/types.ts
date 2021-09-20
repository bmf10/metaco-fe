import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'

export interface Team {
  readonly id: number
  readonly name: string
}

export interface LeaderBoard {
  readonly teamId: number
  readonly totalPoint: number
  readonly team: Team
}

export interface StartActionPayload {
  readonly perPage?: number
  readonly page?: number
  readonly teamId?: number
  readonly tournamentId?: number
  readonly sort?: 'ascend' | 'descend' | 'asc' | 'desc' | null
}

export interface StartAction extends Action<typeof START_ACTION> {
  readonly payload?: StartActionPayload
}

export interface SuccessActionPayload {
  readonly perPage: number
  readonly page: number
  readonly data: ReadonlyArray<LeaderBoard>
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
  readonly data: ReadonlyArray<LeaderBoard>
  readonly total: number
}

export interface ReduxRootState extends RootState {
  readonly leaderboard: ReduxState
}

export type ReduxReducer = Reducer<ReduxState, ReduxAction>

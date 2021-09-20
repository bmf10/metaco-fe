import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  SUBMIT_ACTION,
  SUCCESS_ACTION,
} from './constants'

export interface SubmitActionPayload {
  readonly position: number
  readonly teamId: number
  readonly tournamentId: number
}

export interface SubmitAction extends Action<typeof SUBMIT_ACTION> {
  readonly payload: SubmitActionPayload
}
export type SuccessAction = Action<typeof SUCCESS_ACTION>

export interface ErrorActionPayload {
  readonly message: string
}

export interface ErrorAction extends Action<typeof ERROR_ACTION> {
  readonly payload: ErrorActionPayload
}

export type ResetAction = Action<typeof RESET_ACTION>

export type FormAction =
  | SubmitAction
  | SuccessAction
  | ErrorAction
  | ResetAction

export interface FormState {
  readonly loading: boolean
  readonly message?: string
  readonly success: boolean
}

export interface FormRootState extends RootState {
  readonly addResult: FormState
}

export type FormReducer = Reducer<FormState, FormAction>

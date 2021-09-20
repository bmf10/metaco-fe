import { call, put, takeLatest, select } from '@redux-saga/core/effects'
import type { SagaIterator } from 'redux-saga'
import { ERROR_ACTION, START_ACTION, SUCCESS_ACTION } from './constants'
import { load, Response } from './services'
import type {
  ErrorAction,
  ReduxState,
  StartAction,
  StartActionPayload,
  SuccessAction,
} from './types'
import { selector } from './useSelector'

const mapPayload = (
  payload?: StartActionPayload
): StartActionPayload | undefined => {
  if (!payload) return
  return {
    ...payload,
    sort: payload.sort
      ? payload.sort === 'ascend'
        ? 'asc'
        : 'desc'
      : undefined,
  }
}

export function* loadSaga({ payload }: StartAction): SagaIterator {
  const state: ReduxState = yield select(selector)
  const newPayload = mapPayload({
    teamId: state.teamId,
    tournamentId: state.tournamentId,
    perPage: state.perPage,
    sort: state.sort,
    ...payload,
  })
  const { data }: Response = yield call(load, newPayload)
  if (data) {
    yield put<SuccessAction>({
      payload: { ...data },
      type: SUCCESS_ACTION,
    })
  } else {
    yield put<ErrorAction>({
      payload: { message: 'Something Wrong' },
      type: ERROR_ACTION,
    })
  }
}

export default function* saga(): SagaIterator {
  yield takeLatest(START_ACTION, loadSaga)
}

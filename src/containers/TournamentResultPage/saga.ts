import { call, put, takeLatest, select } from '@redux-saga/core/effects'
import type { SagaIterator } from 'redux-saga'
import { ERROR_ACTION, START_ACTION, SUCCESS_ACTION } from './constants'
import { load, Response } from './services'
import type {
  ErrorAction,
  ReduxState,
  StartAction,
  SuccessAction,
} from './types'
import { selector } from './useSelector'

export function* loadSaga({ payload }: StartAction): SagaIterator {
  const state: ReduxState = yield select(selector)
  const { data }: Response = yield call(load, {
    tournamentId: state.tournamentId,
    ...payload,
  })
  if (data) {
    yield put<SuccessAction>({
      payload: {
        data: data.data,
        total: data.total,
        page: data.page,
        perPage: data.perPage,
      },
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

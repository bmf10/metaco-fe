import { call, put, takeLatest, select } from '@redux-saga/core/effects'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { reloadResult } from '../action'
import { ReduxState } from '../types'
import { selector } from '../useSelector'
import { ERROR_ACTION, SUBMIT_ACTION, SUCCESS_ACTION } from './constants'
import { submit } from './services'
import type { ErrorAction, SubmitAction, SuccessAction } from './types'

export function* submitSaga({ payload }: SubmitAction): SagaIterator {
  const res: AxiosResponse = yield call(submit, payload)
  if (res.data) {
    yield put<SuccessAction>({
      type: SUCCESS_ACTION,
    })
    const result: ReduxState = yield select(selector)
    yield put(
      reloadResult({
        page: result.page,
        perPage: result.perPage,
        tournamentId: result.tournamentId,
      })
    )
  } else {
    yield put<ErrorAction>({
      payload: { message: 'Something Wrong' },
      type: ERROR_ACTION,
    })
  }
}

export default function* saga(): SagaIterator {
  yield takeLatest(SUBMIT_ACTION, submitSaga)
}

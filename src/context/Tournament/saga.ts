import { call, put, takeLatest, delay, all } from '@redux-saga/core/effects'
import type { SagaIterator } from 'redux-saga'
import {
  ERROR_ACTION,
  SEARCH_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constants'
import { load, Response } from './services'
import type {
  ErrorAction,
  SearchAction,
  StartAction,
  SuccessAction,
} from './types'

export function* loadSaga({ payload }: StartAction): SagaIterator {
  const { data }: Response = yield call(load, payload)
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

export function* search({ payload }: SearchAction): SagaIterator {
  yield delay(500)
  yield put<StartAction>({
    type: START_ACTION,
    payload: { page: 1, search: payload.search },
  })
}

export default function* saga(): SagaIterator {
  yield all([
    takeLatest(START_ACTION, loadSaga),
    takeLatest(SEARCH_ACTION, search),
  ])
}

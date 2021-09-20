import { call, put, takeLatest } from '@redux-saga/core/effects'
import type { SagaIterator } from 'redux-saga'
import { ERROR_ACTION, START_ACTION, SUCCESS_ACTION } from './constants'
import { load, Response } from './services'
import type {
  ErrorAction,
  StartAction,
  StartActionPayload,
  SuccessAction,
} from './types'

const mapPayload = (
  payload?: StartActionPayload
): StartActionPayload | undefined => {
  if (!payload) return
  return payload
}

export function* loadSaga({ payload }: StartAction): SagaIterator {
  const newPayload = mapPayload(payload)
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

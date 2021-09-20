import { useInjectReducer } from 'utils/injectReducer'
import useDispatch, { Dispatch } from './useDispatch'
import { FormState } from './types'
import { useSelector } from './useSelector'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'

export interface Redux {
  readonly dispatch: Dispatch
  readonly state: FormState
}

const useDeleteResult = (): Redux => {
  useInjectReducer({ key: 'deleteResult', reducer })
  useInjectSaga({ key: 'deleteResult', saga })
  const dispatch = useDispatch()
  const state = useSelector()

  return { dispatch, state }
}

export default useDeleteResult

import { useInjectReducer } from 'utils/injectReducer'
import useDispatch, { Dispatch } from './useDispatch'
import { ReduxState } from './types'
import { useSelector } from './useSelector'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'

export interface Redux {
  readonly dispatch: Dispatch
  readonly state: ReduxState
}

const useTournament = (): Redux => {
  useInjectReducer({ key: 'tournament', reducer })
  useInjectSaga({ key: 'tournament', saga })
  const dispatch = useDispatch()
  const state = useSelector()

  return { dispatch, state }
}

export default useTournament

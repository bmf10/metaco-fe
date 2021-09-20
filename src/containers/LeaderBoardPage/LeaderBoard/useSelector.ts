import { useSelector as useReduxSelector } from 'react-redux'
import { defaultState } from './reducer'
import type { ReduxRootState, ReduxState } from './types'

export const selector = ({
  leaderboard = defaultState,
}: ReduxRootState): ReduxState => leaderboard

export const useSelector = (): ReduxState =>
  useReduxSelector<ReduxRootState, ReduxState>(selector)

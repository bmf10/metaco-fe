import { useSelector as useReduxSelector } from 'react-redux'
import { defaultState } from './reducer'
import type { FormRootState, FormState } from './types'

export const selector = ({
  deleteResult = defaultState,
}: FormRootState): FormState => deleteResult

export const useSelector = (): FormState =>
  useReduxSelector<FormRootState, FormState>(selector)

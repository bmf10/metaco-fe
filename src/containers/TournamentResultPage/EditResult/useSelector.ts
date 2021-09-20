import { useSelector as useReduxSelector } from 'react-redux'
import { defaultState } from './reducer'
import type { FormRootState, FormState } from './types'

export const selector = ({
  editResult = defaultState,
}: FormRootState): FormState => editResult

export const useSelector = (): FormState =>
  useReduxSelector<FormRootState, FormState>(selector)

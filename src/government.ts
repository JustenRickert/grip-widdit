import {Reducer} from 'redux'

import {Government} from './types'
import {
  ADD_INCOME_HISTORY,
  ADD_TAXES_HISTORY,
  AddGovernmentIncomeHistoryAction,
  AddGovernmentTaxesHistoryAction
} from './actions'

export type GovernmentAction<I, T> =
  | AddGovernmentIncomeHistoryAction<I>
  | AddGovernmentTaxesHistoryAction<T>

const defaultState: Government = {
  income: {
    historical: []
  },
  taxes: {historical: []}
}

const toStateKey: Record<
  typeof ADD_TAXES_HISTORY | typeof ADD_INCOME_HISTORY,
  keyof Government
> = {
  [ADD_TAXES_HISTORY]: 'taxes',
  [ADD_INCOME_HISTORY]: 'income'
}

export const governmentReducer: Reducer<
  Government,
  GovernmentAction<any, any>
> = (state = defaultState, {type, payload}) => {
  if (
    [ADD_INCOME_HISTORY, ADD_TAXES_HISTORY].some(
      actionType => actionType === type
    )
  ) {
    const incomeOrTaxes = toStateKey[type]
    return {
      ...state,
      [incomeOrTaxes]: {
        historical: [...state[incomeOrTaxes].historical, payload]
      }
    }
  }
  return state
}

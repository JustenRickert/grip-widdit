import {Reducer} from 'redux'
import {range} from 'lodash'

import {arrayClampLeft, updateAt} from '../util'
import {Government, Tax} from '../types'
import {dimensions} from '../components/grid'
import {ADD_TAXES_HISTORY, AddGovernmentTaxesHistoryAction} from '../actions'

export type GovernmentAction = AddGovernmentTaxesHistoryAction

const stubArray = <T>() =>
  range(dimensions[0] * dimensions[1]).map(_ => [] as T[])

const defaultState: Government = {
  taxes: {historical: stubArray()}
}

const fixedSize100 = arrayClampLeft(100)
export const governmentReducer: Reducer<
  Government,
  GovernmentAction
> = function(state = defaultState, action) {
  switch (action.type) {
    case ADD_TAXES_HISTORY: {
      const {payload: {tax, tax: {squareIndex}}} = action
      const historical = updateAt(state.taxes.historical)(
        squareIndex,
        taxes => [...taxes, tax]
      )
      return {
        ...state,
        taxes: {
          ...state.taxes,
          historical
        }
      }
    }
  }
  return state
}

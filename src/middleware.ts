import {AnyAction, Middleware, Dispatch, DeepPartial} from 'redux'

import {GovernmentAction} from './reducers/government'
import {
  PLAYER_TAX_SQUARE,
  PlayerTaxSquareAction,
  addTaxesHistory,
  AddGovernmentTaxesHistoryAction
} from './actions'
import {StoreState} from './store'

export const governmentMiddleware: Middleware<
  AddGovernmentTaxesHistoryAction,
  StoreState,
  Dispatch<AnyAction>
> = ({dispatch}) => next => (action: PlayerTaxSquareAction) => {
  switch (action.type) {
    case PLAYER_TAX_SQUARE:
      const {payload: {square, tax}} = action
      dispatch(
        addTaxesHistory({
          squareIndex: square.index,
          percentage: tax.percentage,
          amount: tax.percentage * square.value,
          explanation: 'Player Tax Button'
        })
      )
      break
  }
  return next(action)
}

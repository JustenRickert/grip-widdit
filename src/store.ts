import {
  createStore,
  combineReducers,
  applyMiddleware,
  Dispatch,
  AnyAction
} from 'redux'

import {World, Government} from './types'
import {worldReducer, WorldAction} from './reducers/world'
import {governmentReducer, GovernmentAction} from './reducers/government'
import {governmentMiddleware} from './middleware'

export interface StoreState {
  world: World
  government: Government
}

type StoreAction = WorldAction | GovernmentAction

const reducer = combineReducers<StoreState>({
  world: worldReducer,
  government: governmentReducer
})

const store = createStore<StoreState, StoreAction, any, undefined>(
  reducer,
  undefined,
  applyMiddleware(governmentMiddleware)
)
export default store

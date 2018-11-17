import {createStore, combineReducers} from 'redux'

import {worldReducer, WorldAction} from './world'
import {World, Government} from './types'
import {governmentReducer, GovernmentAction} from './government'

export interface StoreState {
  world: World
  government: Government
}

type StoreAction = WorldAction | GovernmentAction

const reducer = combineReducers<StoreState>({
  world: worldReducer,
  government: governmentReducer
})

const store = createStore<StoreState, StoreAction, undefined, undefined>(
  reducer
)
export default store

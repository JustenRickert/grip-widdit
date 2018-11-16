import {createStore, combineReducers} from 'redux'

import {worldReducer, WorldAction} from './world'
import {World} from './types'

export interface StoreState {
  world: World
}

type StoreAction = WorldAction

const reducer = combineReducers<StoreState>({
  world: worldReducer
})

const store = createStore<StoreState, StoreAction, undefined, undefined>(
  reducer
)
export default store

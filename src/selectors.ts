import {StoreState} from './store'

export const selectPlayer = (state: StoreState) => state.world.player
export const selectSquares = (state: StoreState) => state.world.squares

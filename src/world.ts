import {Reducer, compose} from 'redux'
import {range} from 'lodash'

import {
  clamp,
  calculatePlayerVisitPresence,
  positionToIndex,
  positionSum,
  indexToPosition
} from './util'
import {dimensions} from './components/grid'
import {Square, Commodities, Player, World} from './types'
import {
  MovePlayerPositionAction,
  AddPlayerCommodityAction,
  PLAYER_MOVE_POSITION,
  PLAYER_ADD_COMMODITY,
  UpdateSquaresVisitTimeAction,
  SQUARES_UPDATE_VISIT_TIME
} from './actions'

export type WorldAction =
  | UpdateSquaresVisitTimeAction
  | MovePlayerPositionAction
  | AddPlayerCommodityAction

const playerReducer = (state: World, action: WorldAction): World['player'] => {
  switch (action.type) {
    case PLAYER_ADD_COMMODITY: {
      const {player, player: {commodities}} = state
      const {payload: {key, amount}} = action
      return {
        ...player,
        commodities: {...commodities, [key]: commodities[key] + amount}
      }
    }
    case PLAYER_MOVE_POSITION: {
      const {player} = state
      const {payload} = action
      return {
        ...state.player,
        position: payload.position
      }
    }
  }
  return state.player
}

const squaresReducer = (
  state: World,
  action: WorldAction
): World['squares'] => {
  switch (action.type) {
    case SQUARES_UPDATE_VISIT_TIME: {
      const {squares, player} = state
      const playerIndex = positionToIndex(player.position, dimensions)
      return squares
        .map((square, i) => ({
          ...square,
          value: square.value + (square.visitPresence || 0)
        }))
        .map(
          (square, i) =>
            i === playerIndex
              ? {...square, visitTime: square.visitTime + 1}
              : square
        )
    }
    case PLAYER_MOVE_POSITION: {
      const {player, squares} = state
      const {payload} = action
      const presenceUpdateMap = calculatePlayerVisitPresence({
        player: {
          position: payload.position,
          visitPresence: player.visitPresence
        },
        squares
      })
      return squares.map((square, i) => ({
        ...square,
        visitPresence: presenceUpdateMap.get(square) || null
      }))
    }
  }
  return state.squares
}

const defaultWorld: World = {
  player: {
    commodities: {capital: 0},
    position: {x: 0, y: 0},
    visitPresence: 1.1
  },
  squares: range(dimensions[0] * dimensions[1]).map(i => ({
    value: 0,
    visitTime: 0,
    position: indexToPosition(i, dimensions),
    visitPresence: null
  }))
}

export const worldReducer: Reducer<World, WorldAction> = (
  state = defaultWorld,
  action
) => ({
  player: playerReducer(state, action),
  squares: squaresReducer(state, action)
})

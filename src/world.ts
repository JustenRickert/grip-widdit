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

export type PlayerAction = MovePlayerPositionAction | AddPlayerCommodityAction
const clampHeight = clamp(0, dimensions[1] - 1)
const clampWidth = clamp(0, dimensions[0] - 1)
const clampPosition = (p: {x: number; y: number}) => ({
  x: clampWidth(p.x),
  y: clampHeight(p.y)
})
const playerReducer = (state: World, action: PlayerAction): World['player'] => {
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
        position: clampPosition(positionSum(payload.position, player.position))
      }
    }
  }
  return state.player
}

export type SquaresAction = UpdateSquaresVisitTimeAction
const squaresReducer = (
  state: World,
  action: SquaresAction
): World['squares'] => {
  switch (action.type) {
    case SQUARES_UPDATE_VISIT_TIME:
      const {squares, player} = state
      const presenceUpdateMap = calculatePlayerVisitPresence({player, squares})
      const playerIndex = positionToIndex(player.position, dimensions)
      return squares
        .map(
          (square, i) =>
            presenceUpdateMap.has(square)
              ? {
                  ...square,
                  value: square.value + presenceUpdateMap.get(square)!
                }
              : square
        )
        .map(
          (square, i) =>
            i === playerIndex
              ? {...square, visitTime: square.visitTime + 1}
              : square
        )
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
    position: indexToPosition(i, dimensions)
  }))
}

export type WorldAction = PlayerAction | SquaresAction
export const worldReducer: Reducer<World, WorldAction> = (
  state = defaultWorld,
  action
) => ({
  player: playerReducer(state, action as PlayerAction),
  squares: squaresReducer(state, action as SquaresAction)
})

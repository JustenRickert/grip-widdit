import {Reducer, compose} from 'redux'
import {range} from 'lodash'

import {
  clamp,
  calculatePlayerVisitPresence,
  positionToIndex,
  positionSum,
  indexToPosition
} from './util'
import {dimensions} from './grid'
import {Square, Commodities, Player, World} from './types'

const PLAYER_MOVE_POSITION = 'PLAYER_UPDATE_POSITION'
interface MovePlayerPositionAction {
  type: typeof PLAYER_MOVE_POSITION
  payload: {position: {x: number; y: number}}
}
export const playerPositonUpdate = (payload: {
  position: {x: number; y: number}
}): MovePlayerPositionAction => ({
  type: PLAYER_MOVE_POSITION,
  payload
})

const PLAYER_ADD_COMMODITY = 'PLAYER_ADD_COMMODITY'
interface AddPlayerCommodityAction {
  type: typeof PLAYER_ADD_COMMODITY
  payload: {key: keyof Commodities; amount: number}
}
export const addPlayerCommodity = (
  payload: AddPlayerCommodityAction['payload']
): AddPlayerCommodityAction => ({type: PLAYER_ADD_COMMODITY, payload})

const SQUARES_UPDATE_VISIT_TIME = 'SQUARES_UPDATE_VISIT_TIME'
interface UpdateSquaresVisitTimeAction {
  type: typeof SQUARES_UPDATE_VISIT_TIME
}
export const squaresUpdateVisitTime = (): UpdateSquaresVisitTimeAction => ({
  type: SQUARES_UPDATE_VISIT_TIME
})

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
      return squares.map(
        (square, i) =>
          presenceUpdateMap.has(square)
            ? {
                ...square,
                visitTime: square.visitTime + presenceUpdateMap.get(square)!
              }
            : square
      )
  }
  return state.squares
}

const defaultPosition = {x: 0, y: 0}
const defaultWorld: World = {
  player: {
    commodities: {capital: 0},
    position: defaultPosition,
    visitPresence: 1.1
  },
  squares: range(dimensions[0] * dimensions[1]).map(i => ({
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

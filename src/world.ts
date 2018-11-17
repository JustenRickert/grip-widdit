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
  PLAYER_TAX_SQUARE,
  PLAYER_MOVE_POSITION,
  PLAYER_ADD_COMMODITY,
  UpdateSquaresVisitTimeAction,
  SQUARES_UPDATE_VISIT_TIME,
  PlayerTaxSquareAction
} from './actions'

export type WorldAction =
  | AddPlayerCommodityAction
  | MovePlayerPositionAction
  | PlayerTaxSquareAction
  | UpdateSquaresVisitTimeAction

const reduceAddCommodity = (
  player: Player,
  payload: {key: keyof Player['commodities']; amount: number}
) => ({
  ...player,
  commodities: {
    ...player.commodities,
    [payload.key]: player.commodities[payload.key] + payload.amount
  }
})

const playerReducer = (state: World, action: WorldAction): World['player'] => {
  switch (action.type) {
    case PLAYER_TAX_SQUARE: {
      const {payload: {square, tax}} = action
      return reduceAddCommodity(state.player, {
        key: 'capital',
        amount: tax * square.value
      })
    }
    case PLAYER_ADD_COMMODITY:
      return reduceAddCommodity(state.player, action.payload)
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
    case PLAYER_TAX_SQUARE: {
      const {payload} = action
      return state.squares.map(
        (square: Square, i: number) =>
          positionToIndex(payload.square.position, dimensions) === i
            ? {
                ...square,
                value: (1 - payload.tax) * square.value
              }
            : square
      )
    }
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

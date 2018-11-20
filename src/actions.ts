import {Commodities, Tax, Square} from './types'
import {AnyAction} from '../node_modules/redux'

/**
 * WORLD
 */

export const PLAYER_MOVE_POSITION = 'PLAYER_MOVE_POSITION'
export interface MovePlayerPositionAction {
  type: typeof PLAYER_MOVE_POSITION
  payload: {position: {x: number; y: number}}
}
export const playerPositonUpdate = (payload: {
  position: {x: number; y: number}
}): MovePlayerPositionAction => ({
  type: PLAYER_MOVE_POSITION,
  payload
})

export const PLAYER_TAX_SQUARE = 'PLAYER_TAX_SQUARE'
export interface PlayerTaxSquareAction {
  type: typeof PLAYER_TAX_SQUARE
  payload: {square: Square; tax: {percentage: number}}
}
export const playerTaxSquare = (
  square: Square,
  tax: {percentage: number}
): PlayerTaxSquareAction => ({
  type: PLAYER_TAX_SQUARE,
  payload: {square, tax}
})

export const PLAYER_ADD_COMMODITY = 'PLAYER_ADD_COMMODITY'
export interface AddPlayerCommodityAction {
  type: typeof PLAYER_ADD_COMMODITY
  payload: {key: keyof Commodities; amount: number}
}
export const addPlayerCommodity = (
  payload: AddPlayerCommodityAction['payload']
): AddPlayerCommodityAction => ({type: PLAYER_ADD_COMMODITY, payload})

export const SQUARES_UPDATE_VISIT_TIME = 'SQUARES_UPDATE_VISIT_TIME'
export interface UpdateSquaresVisitTimeAction {
  type: typeof SQUARES_UPDATE_VISIT_TIME
}
export const squaresUpdateVisitTime = (): UpdateSquaresVisitTimeAction => ({
  type: SQUARES_UPDATE_VISIT_TIME
})

/**
 * GOVERNMENT
 */

export const ADD_TAXES_HISTORY = 'GOVERNMENT_ADD_TAXES_HISTORY'
export interface AddGovernmentTaxesHistoryAction extends AnyAction {
  type: typeof ADD_TAXES_HISTORY
  payload: {tax: Tax}
}
export const addTaxesHistory = function(
  tax: Tax
): AddGovernmentTaxesHistoryAction {
  return {
    type: ADD_TAXES_HISTORY,
    payload: {tax}
  }
}

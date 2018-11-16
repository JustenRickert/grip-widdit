import {Commodities} from './types'

export const PLAYER_MOVE_POSITION = 'PLAYER_UPDATE_POSITION'
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

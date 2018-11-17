import store from './store'
import {playerPositonUpdate} from './actions'

import {dimensions} from './components/grid'
import {clamp, positionSum} from './util'
const clampHeight = clamp(0, dimensions[1] - 1)
const clampWidth = clamp(0, dimensions[0] - 1)
const positionClamp = (p: {x: number; y: number}) => ({
  x: clampWidth(p.x),
  y: clampHeight(p.y)
})

const arrowKeyRelation = {
  ArrowUp: {position: {x: 0, y: -1}},
  ArrowLeft: {position: {x: -1, y: 0}},
  ArrowRight: {position: {x: 1, y: 0}},
  ArrowDown: {position: {x: 0, y: 1}}
}

const onArrowEvent = (e: KeyboardEvent) => {
  if (
    !['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].some(
      key => key === e.key
    )
  )
    return
  const {world: {player}} = store.getState()
  const movement =
    arrowKeyRelation[
      e.key as 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown'
    ]
  store.dispatch(
    playerPositonUpdate({
      position: positionClamp(positionSum(player.position, movement.position))
    })
  )
}

export const addArrowKeyListener = () => {
  removeEventListener('keydown', onArrowEvent)
  addEventListener('keydown', onArrowEvent)
}

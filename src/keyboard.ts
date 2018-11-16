import store from './store'
import {playerPositonUpdate} from './actions'

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
  store.dispatch(
    playerPositonUpdate(
      arrowKeyRelation[
        e.key as 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown'
      ]
    )
  )
}

export const addArrowKeyListener = () => {
  removeEventListener('keydown', onArrowEvent)
  addEventListener('keydown', onArrowEvent)
}

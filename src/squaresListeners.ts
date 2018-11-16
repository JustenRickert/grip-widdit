import {timer} from 'rxjs'

import store from './store'
import {squaresUpdateVisitTime} from './world'

const secondCounter = timer(0, 1000)

export const addSquaresListener = () =>
  secondCounter.subscribe(_ => store.dispatch(squaresUpdateVisitTime()))

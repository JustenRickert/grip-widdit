import {timer} from 'rxjs'

import store from './store'
import {squaresUpdateVisitTime} from './actions'

export const dispatchSquaresStream = function() {
  return timer(0, 1000).subscribe(_ => store.dispatch(squaresUpdateVisitTime()))
}

export const dispatchHappinessEventStream = function() {
  return timer(0, 25000).subscribe(_ => console.log('TODO'))
}

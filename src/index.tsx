import * as React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'

import Game from './components/game'

import store from './store'
import {addArrowKeyListener} from './keyboard'
import {addSquaresListener} from './squaresListeners'

render(
  <Provider store={store} children={<Game />} />,
  document.getElementById('app')
)

addArrowKeyListener()
addSquaresListener()

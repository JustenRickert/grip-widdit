import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import Grid from './Grid'
import Squares from './Squares'
import {StoreState} from '../store'
import {Player, Square} from '../types'
import {squaresUpdateVisitTime} from '../world'

interface Props {
  player: Player
  squares: Square[]
}

const mapState = (state: StoreState) => ({
  player: state.world.player,
  squares: state.world.squares
})

const Game = (props: Props) => {
  return (
    <div style={{display: 'flex'}}>
      <Grid />
      <Squares />
    </div>
  )
}

export default connect(mapState)(Game)

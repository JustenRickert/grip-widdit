import * as React from 'react'
import {connect} from 'react-redux'

import {dimensions} from './grid'
import {Square} from './types'
import {indexToPosition} from './util'
import {StoreState} from './store'

interface Props {
  squares: Square[]
}

const mapState = (state: StoreState) => ({
  squares: state.world.squares
})

const Position = ({position: {x, y}}: {position: {x: number; y: number}}) => (
  <div>
    (x: {x}, y: {y})
  </div>
)

const Squares = ({squares}: Props) => (
  <div style={{display: 'flex', width: '50%'}}>
    <ul>
      {squares.map((square, index) => (
        <li key={index}>
          <Position position={indexToPosition(index, dimensions)} />
          {square.visitTime.toFixed(2)}
        </li>
      ))}
    </ul>
  </div>
)

export default connect(mapState)(Squares)

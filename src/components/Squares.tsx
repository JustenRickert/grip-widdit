import * as React from 'react'
import {connect} from 'react-redux'

import {dimensions} from './grid'
import {UlSquareInfo, LiSquare} from './styles'

import {Square} from '../types'
import {indexToPosition} from '../util'
import {StoreState} from '../store'

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
    <UlSquareInfo columns={dimensions[0]}>
      {squares.map((square, index) => (
        <LiSquare key={index}>
          {Boolean(square.visitPresence) &&
            `presence: ${square.visitPresence!.toFixed(2)}`}
          <Position position={indexToPosition(index, dimensions)} />
          <div>time visited: {square.visitTime.toFixed(0)}</div>
          <div>value of: {square.value.toFixed(2)}</div>
        </LiSquare>
      ))}
    </UlSquareInfo>
  </div>
)

export default connect(mapState)(Squares)

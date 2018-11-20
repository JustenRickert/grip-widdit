import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import {playerTaxSquare} from '../actions'
import {Square} from '../types'

interface Props {
  square: Square
  onClick: (square: Square) => ReturnType<typeof playerTaxSquare>
}

const mapDispatch = (dispatch: Dispatch) => ({
  // A 15%(!) tax?!
  onClick: (square: Square) =>
    dispatch(playerTaxSquare(square, {percentage: 0.15}))
})

const TaxButton = (props: Props) => (
  <button onClick={() => props.onClick(props.square)} children="TAX" />
)

export default connect(undefined, mapDispatch)(TaxButton)

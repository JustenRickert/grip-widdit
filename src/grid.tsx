import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {range} from 'lodash'
import styled from 'styled-components'
import {World} from './types'

export const dimensions: [number, number] = [5, 5]

const squareLength = '6em'

export const PlayerIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${squareLength};
  height: ${squareLength};
`

const PlayerView = ({
  player: {position: {x, y}},
  rowSize,
  gridNode
}: {
  player: {position: {x: number; y: number}}
  rowSize: number
  gridNode: HTMLDivElement
}) => {
  const {top: topOffset, left: leftOffset} = gridNode.getBoundingClientRect()
  const {top, left} = gridNode.children[
    x + rowSize * y
  ].getBoundingClientRect() as ClientRect
  return (
    <PlayerIconWrapper
      style={{
        transform: `translate(${left - leftOffset}px, ${top - topOffset}px)`,
        transition: 'all 300ms'
      }}
      children={<div children="ME" />} // TODO: replace me with a cool icon of some kind! :)
    />
  )
}

interface StyledGridProps {
  columns: number
}

export const StyledGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  max-width: 12em;
  grid-template-columns: repeat(
    ${(props: StyledGridProps) => props.columns},
    1fr
  );
`

export const GridSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${squareLength};
  height: ${squareLength};
  box-sizing: border-box;
  border: 1px black solid;
  transition: all 2s;
`

interface Props {
  player: World['player']
}

const mapState = (state: {world: World}) => ({
  player: state.world.player
})

class Grid extends React.Component<Props> {
  gridRef = React.createRef<HTMLDivElement>()

  render() {
    const {player} = this.props
    return (
      <div style={{display: 'flex', width: '50%'}}>
        {this.gridRef.current && (
          <PlayerView
            player={player}
            rowSize={dimensions[0]}
            gridNode={this.gridRef.current}
          />
        )}
        <StyledGrid innerRef={this.gridRef} columns={dimensions[0]}>
          {range(dimensions[0] * dimensions[1]).map(i => (
            <GridSquare key={i} children="." />
          ))}
        </StyledGrid>
      </div>
    )
  }
}

export default connect(mapState)(Grid)

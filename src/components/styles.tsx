import styled from 'styled-components'

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

const squareLength = '6em'
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

export const PlayerIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${squareLength};
  height: ${squareLength};
`

export const UlSquareInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props: StyledGridProps) => props.columns},
    1fr
  );
  padding: 1em;
  width: 100%;
  flex-wrap: wrap;
`

export const LiSquare = styled.div`
  padding: 1em;
`

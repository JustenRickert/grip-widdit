import {clone, compact, toPairs, range, flatMap, uniqWith, Omit} from 'lodash'

import {Player, Square} from './types'
import {dimensions} from './components/grid'

type KeyTransform<O, K extends keyof O, R> = (
  o: O,
  f: (key: K) => R
) => Omit<O, K> & {K: R}

type ReplaceKeyWithType<O, K extends keyof O, R> = Omit<O, K> & {K: R}

const keyTransform = <O, K extends keyof O, R>(
  o: O,
  key: K,
  f: (x: O[K]) => R
): ReplaceKeyWithType<O, K, R> => {
  const newO: any = clone(o)
  newO[key] = f(o[key])
  return newO
}

type KeyTransformMap<O extends {}> = {[key: string]: (x: O[keyof O]) => any}

export const transform = <O, KM extends KeyTransformMap<O>, R>(
  o: O,
  transformMap: KM
): R =>
  toPairs(transformMap).reduce(
    (o, [key, f]) => keyTransform(o, key as keyof O, f),
    o as any
  )

export const positionSum = <S extends {x: number; y: number}>(...ss: S[]) =>
  ss.reduce(({x, y}, s) => ({x: x + s.x, y: y + s.y}), {x: 0, y: 0})

export const positionEqual = <P extends {x: number; y: number}>(
  ...ps: P[]
): boolean => {
  if (ps.length === 2) {
    const [p1, p2] = ps
    return p1.x === p2.x && p1.y === p2.y
  }
  const [p1, p2, ...rest] = ps
  return p1.x === p2.x && p1.y === p2.y && positionEqual(p2, ...rest)
}

export const clamp = (lower: number, upper: number) => (x: number) => {
  if (x < lower) return lower
  if (x > upper) return upper
  return x
}

export const indexToPosition = (
  index: number,
  dimensions: [number, number]
): {x: number; y: number} => {
  const [width, height] = dimensions
  return {
    x: index % width,
    y: Math.floor(index / width)
  }
}

export const positionToIndex = (
  position: {x: number; y: number},
  dimensions: [number, number]
): number => {
  const [width, height] = dimensions
  return width * position.y + position.x
}

const borderMovements = [
  {x: 0, y: -1},
  {x: 1, y: 0},
  {x: -1, y: 0},
  {x: 0, y: 1}
]

const uniqWithPosition = (ss: Square[]) => {
  const squares = new Map<{x: number; y: number}, Square>()
  ss.forEach(s => squares.set(s.position, s))
  return Array.from(squares.values())
}

const [maxX, maxY] = dimensions
const isInBounds = ({x, y}: {x: number; y: number}) =>
  x >= 0 && y >= 0 && x < maxX && y < maxY

const positionDistance = (
  p1: {x: number; y: number},
  p2: {x: number; y: number}
) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

export const distanceNSquares = (
  n: number,
  squares: Square[],
  position: {x: number; y: number}
): Square[] => {
  const distancesNSquares: Square[] = []
  range(dimensions[0] * dimensions[1]).map(i => {
    const testPosition = indexToPosition(i, dimensions)
    if (
      isInBounds(testPosition) &&
      positionDistance(testPosition, position) === n
    )
      distancesNSquares.push(squares[i])
  })
  return distancesNSquares
}

export const calculatePlayerVisitPresence = <
  P extends {visitPresence: number; position: {x: number; y: number}}
>({
  player,
  squares
}: {
  player: P
  squares: Square[]
}): Map<Square, number> => {
  const nDistancesSquares = [1, 2, 3].map<[number, Square[]]>(n => [
    n,
    distanceNSquares(n, squares, player.position)
  ])
  const presences = new Map<Square, number>()
  presences.set(
    squares[positionToIndex(player.position, dimensions)],
    2 * player.visitPresence
  )
  nDistancesSquares.forEach(([n, ss]) =>
    ss.forEach(
      s => !presences.has(s) && presences.set(s, player.visitPresence / n)
    )
  )
  return presences
}

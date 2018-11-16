export type Square = {visitTime: number; position: {x: number; y: number}}

export type Commodities = {
  capital: number
}

export type Player = {
  commodities: Commodities
  position: {x: number; y: number}
  visitPresence: number
}

export type World = {
  player: Player
  squares: Square[]
}

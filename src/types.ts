export type Square = {
  value: number
  visitTime: number
  position: {x: number; y: number}
  visitPresence: number | null
  index: number
}

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

export type Tax = {
  squareIndex: number
  percentage: number
  amount: number
  explanation: string
}

/**
 * In this representation of Modern Monetary Theory, there are two variables
 * to consider. The first is `taxes`, and the second is `income` (an ironic
 * name, given that it's not really the `government`'s `income`, but we'll see
 * as the explanation unfolds).
 *
 * Think of the `squares` as people. The idea is that people (`squares`) like
 * money, so we decide that it's the `government`'s job to supply `squares`
 * with money. It so happens periodically in the form of `income`, which the
 * `squares` then use, rapidly, and make the apparent amount of money in
 * circulation (and therefore the amount of money) higher. However, This leads
 * to inflation, so it's also the `government`'s job to counteract it. It does
 * this by taking money away from the people in the form of taxes. Keeping
 * both in balance is the whole point of the game!
 */
export type Government = {
  /**
   * First index is square index, second is history index
   */
  taxes: {historical: Tax[][]}
}

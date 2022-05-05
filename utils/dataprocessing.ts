import Game from '../interfaces/game'

export const searchList = (games: Game[], query: string) => {
  var result: Game[] = []
  games.forEach((g) => {
    if (g.name.toLowerCase().includes(query.toLowerCase())) {
      result.push(g)
    }
  })
  return result
}

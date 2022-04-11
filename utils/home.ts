import Game from '../interfaces/game'

export const getGreeting = (): string => {
  const h = new Date().getHours()

  if (h >= 5 && h < 12) {
    return 'Good morning,'
  } else if (h >= 12 && h < 18) {
    return 'Good afternoon,'
  } else {
    return 'Good evening,'
  }
}

export const pickRandomGame = (items: Game[]): Game => {
  return items[Math.floor(Math.random() * items.length)]
}

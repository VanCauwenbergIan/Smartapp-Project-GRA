import React, { useContext } from 'react'
import { GameCheckbox } from '../interfaces/gameCheckbox'

export interface GamesContextType {
  games: GameCheckbox[]
  setGames: Function
}

export const GamesContext = React.createContext<GamesContextType>({
  games: [],
  setGames: (g: GameCheckbox[]) => {},
})

export const useGames = () => useContext(GamesContext)

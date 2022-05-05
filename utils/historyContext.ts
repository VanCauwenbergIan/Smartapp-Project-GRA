import React, { useContext } from 'react'
import Game from '../interfaces/game'

export interface HistoryContextType {
  history: Game[]
  setHistory: Function
}

export const HistoryContext = React.createContext<HistoryContextType>({
  history: [],
  setHistory: function (his: Game[]) {},
})

export const useHistory = () => useContext(HistoryContext)

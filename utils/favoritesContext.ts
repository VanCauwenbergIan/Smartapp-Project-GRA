import React, { useContext } from 'react'
import Game from '../interfaces/game'

export interface FavoritesContextType {
  favorites: Game[] 
  setFavorites: Function
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: (fav: Game[]) => {},
})

export const useFavorites = () => useContext(FavoritesContext)

import React, { useContext } from 'react'
import { Checkbox } from '../interfaces/checkbox'

export interface GenresContextType {
  genres: Checkbox[]
  setGenres: Function
}

export const GenresContext = React.createContext<GenresContextType>({
  genres: [],
  setGenres: (g: Checkbox[]) => {},
})

export const useGenres = () => useContext(GenresContext)

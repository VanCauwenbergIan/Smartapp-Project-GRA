import { Image } from 'react-native'
import Artwork from './artwork'
import Company from './company'
import Name from './name'
import Rating from './rating'
import Release from './releaseDate'
import SecondaryGame from './secondaryGame'

export default interface Game {
  id: number
  age_ratings?: Rating[]
  aggregated_rating?: number
  aggregated_rating_count?: number
  artworks?: Artwork[]
  cover: Artwork
  first_release_date?: number
  release_dates?: Release[]
  game_modes?: Name[]
  genres?: Name[]
  involved_companies?: Company[]
  hypes?: number
  name: string
  platforms?: Name[]
  player_perspectives?: Name[]
  rating?: number
  rating_count?: number
  screenshots?: Artwork[]
  similar_games?: SecondaryGame[]
  slug?: string
  storyline?: string
  summary?: string
  themes?: Name[]
  total_rating?: number
  total_rating_count?: number
}

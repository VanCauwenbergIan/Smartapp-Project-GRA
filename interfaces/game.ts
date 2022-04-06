import { Image } from 'react-native'
import Artwork from './artwork'
import Company from './company'
import Name from './name'
import Rating from './rating'

export default interface Game {
  id: number
  age_rating: Rating[]
  aggregated_rating: number
  aggregated_rating_count: number
  artworks: Artwork[]
  cover: Artwork
  first_release_date: number
  game_modes: Name[]
  genres: Name[]
  involved_companies: Company[]
  hypes: number
  name: string
  platforms: Name[]
  player_perspectives: Name[]
  rating: number
  rating_count: number
  screenshots: Artwork[]
  similar_games: number[]
  slug: string
  storyline: string
  summary: string
  themes: Name[]
  total_rating: number
  total_rating_count: number
}

import axios from 'axios'
import { igdb_uri, igdb_token, igdb_clientid } from '../environement'
import Game from '../interfaces/game'
// token isn't that important, so I just keep it in a seperate file to keep it out of github
// I know it's not that secure, but it doesn't need to be in this case

// tried to do it with just a regular fetch, but I would keep getting network errors
// note to self: limited to 4 requests / second or you get a 429 status code
export const getPopularGames = () => {
  return axios({
    url: igdb_uri + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': igdb_clientid,
      Authorization: `Bearer ${igdb_token}`,
    },
    data: 'fields age_ratings.rating, aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, hypes, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games, slug, storyline, summary, themes.name, total_rating, total_rating_count; limit 500;where rating >= 70 & aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null; sort first_release_date desc; sort popularity desc;',
  })
}

// untested
const getSingleGame = (id: number) => {
  return axios({
    url: igdb_uri + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': igdb_clientid,
      Authorization: `Bearer ${igdb_token}`,
    },
    data: `fields age_ratings.rating, aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, hypes, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games, slug, storyline, summary, themes.name, total_rating, total_rating_count; where id = ${id};`,
  })
}

export const getDeveloper = (game: Game): string => {
  let r: string = ''
  game.involved_companies.forEach((i) => {
    if (i.developer) {
      r = i.company.name
    }
  })
  return r
}

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
    data: 'fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where rating >= 70 & aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null; sort first_release_date desc;',
  })
}

export const getAnticipatedGames = () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  return axios({
    url: igdb_uri + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': igdb_clientid,
      Authorization: `Bearer ${igdb_token}`,
    },
    data: `fields cover.image_id, first_release_date, release_dates.human, release_dates.date , name; limit 100;where first_release_date > ${currentTimestamp} & hypes != null; sort hypes desc;`,
  })
}

export const getNewReleases = () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  return axios({
    url: igdb_uri + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': igdb_clientid,
      Authorization: `Bearer ${igdb_token}`,
    },
    data: `fields cover.image_id, first_release_date, release_dates.human, release_dates.date , game_modes.name, name, platforms.name; limit 500; where first_release_date < ${currentTimestamp};  sort first_release_date desc;`,
  })
}

// untested
export const getSingleGame = (id: number) => {
  return axios({
    url: igdb_uri + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': igdb_clientid,
      Authorization: `Bearer ${igdb_token}`,
    },
    data: `fields age_ratings.rating, age_ratings.category , aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, release_dates.human, release_dates.date , game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games.name, similar_games.cover.image_id, slug, storyline, summary, themes.name, total_rating, total_rating_count; where id = ${id};`,
  })
}

export const getDeveloper = (game?: Game): string => {
  let r: string = ''

  if (game) {
    game.involved_companies?.forEach((i) => {
      if (i.developer) {
        r = i.company.name
      }
    })
  }

  return r
}

export const getPlatform = (game?: Game): string => {
  let r: string = ' '

  if (game && game.platforms) {
    const l = game.platforms.length
    let c = 0

    game.platforms.forEach((i) => {
      c++
      if (c == l) {
        r += i.name
      } else {
        r += `${i.name}, `
      }
    })
  }

  return r
}

export const getReleaseDate = (game?: Game): string => {
  let r: string = 'TBD'

  if (game && game.first_release_date && game.release_dates) {
    game.release_dates.forEach((i) => {
      if (game.first_release_date == i.date) {
        r = i.human
      }
    })
  }

  return r
}

const convertRating = [
  ['3+', '#6BBA7A'],
  ['7+', '#ACB75B'],
  ['12+', '#EEB53B'],
  ['16+', '#E87336'],
  ['18+', '#E23131'],
]

export const getAgeRating = (game?: Game): string[] => {
  let r: string[] = ['Awaiting a rating', '#404E5C']

  if (game && game.age_ratings) {
    game.age_ratings.forEach((i) => {
      if (i.category == 2) {
        r = convertRating[i.rating - 1]
      }
    })
  }

  return r
}

export const getThemes = (game?: Game): any[] => {
  let r: any[] = []

  if (game && game.genres) {
    r = game.genres

    if (game.themes) {
      r = game.genres.concat(game.themes)
    }
    if (game.player_perspectives) {
      r = r.concat(game.player_perspectives)
    }
  }

  return r
}

// old request before optimization
// fields age_ratings.rating, aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, hypes, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games.name similar_games.cover.image_id, slug, storyline, summary, themes.name, total_rating, total_rating_count; limit 500;where rating >= 70 & aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null; sort first_release_date desc;

import { querystring } from '@firebase/util'
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

export const convertSortingString = (
  sortingString: string,
  query: string | undefined,
  direction: boolean,
) => {
  let dir
  let data

  if (direction) {
    dir = 'asc'
  } else {
    dir = 'desc'
  }

  if (query) {
    data = `fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where name ~ *"${query}"* & total_rating_count >= 1 & total_rating != 0;`
  } else if (sortingString != 'Relevance') {
    data =
      'fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where total_rating_count >= 1 & total_rating != 0;'
  } else {
    data =
      'fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where rating >= 70 & aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null; sort total_rating desc;'
  }

  switch (sortingString) {
    default:
      return `${data}`
    case 'Title':
      return `${data} sort name ${dir};`
    // case 'Developer':
    //   // need to search how to actually sort by developer
    //   return `${data} sort involved_companies.company.name ${dir};`
    case 'Ratings':
      return `${data} sort total_rating ${dir};`
    case 'Release Dates':
      return `${data} sort first_release_date ${dir};`
  }
}

export const sortLocally = (list: Game[], query: string, order: boolean) => {
  switch (query) {
    default:
      return list
        .sort(
          (a, b) =>
            (a.total_rating ? a.total_rating : 0) -
            (b.total_rating ? b.total_rating : 0),
        )
        .reverse()
    case 'Title':
      var result = list.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      )
      if (order) {
        return result
      } else {
        return result.reverse()
      }
    case 'Ratings':
      var result = list.sort(
        (a, b) =>
          (a.total_rating ? a.total_rating : 0) -
          (b.total_rating ? b.total_rating : 0),
      )
      if (order) {
        return result
      } else {
        return result.reverse()
      }
    case 'Release Dates':
      var result = list.sort(
        (a, b) =>
          (a.first_release_date ? a.first_release_date : 0) -
          (b.first_release_date ? b.first_release_date : 0),
      )
      if (order) {
        return result
      } else {
        return result.reverse()
      }
  }
}

const arrayToString = (array: any[]) => {
  let result = '('
  let count = 0
  array.forEach((id) => {
    count++
    result += id
    if (count == array.length) {
      result += ')'
    } else {
      result += ','
    }
  })
  return result
}

export const platformAndGenresToQuery = (
  platformIds: number[],
  genreIds: number[],
  query?: string,
) => {
  const platforms = arrayToString(platformIds)
  const genres = arrayToString(genreIds)

  if (query) {
    return `fields age_ratings.rating, age_ratings.category , aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, release_dates.human, release_dates.date , game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games.name, similar_games.cover.image_id, slug, storyline, summary, themes.name, total_rating, total_rating_count; limit 500;where total_rating_count >= 1 & parent_game = null & version_parent = null & release_dates.platform = ${platforms} & genres = ${genres} & name ~ *"${query}"* ; sort first_release_date desc;`
  } else {
    return `fields age_ratings.rating, age_ratings.category , aggregated_rating, aggregated_rating_count, artworks.image_id, cover.image_id, first_release_date, release_dates.human, release_dates.date , game_modes.name, genres.name, involved_companies.developer, involved_companies.company.name, name, platforms.name, player_perspectives.name, rating, rating_count, screenshots.image_id,similar_games.name, similar_games.cover.image_id, slug, storyline, summary, themes.name, total_rating, total_rating_count; limit 500;where aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null & release_dates.platform = ${platforms} & genres = ${genres}; sort first_release_date desc;`
  }
}

export const findGameRecommendations = (
  platformIds: number[],
  games: Game[],
) => {
  const platforms = arrayToString(platformIds)
  var genreIds: number[] = []
  var themeIds: number[] = []
  var perspectiveIds: number[] = []
  var gameNames: string[] = []

  games.forEach((g) => {
    g.genres?.forEach((g) => {
      if (!genreIds.includes(g.id)) {
        genreIds.push(g.id)
      }
    })
    g.themes?.forEach((t) => {
      if (!themeIds.includes(t.id)) {
        themeIds.push(t.id)
      }
    })
    g.player_perspectives?.forEach((p) => {
      if (!perspectiveIds.includes(p.id)) {
        perspectiveIds.push(p.id)
      }
    })
    gameNames.push(`"${g.name}"`)
  })

  const genres = arrayToString(genreIds)
  const themes = arrayToString(themeIds)
  const perspectives = arrayToString(perspectiveIds)
  const filterOut = arrayToString(gameNames)

  return `fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating, first_release_date; limit 500;where aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null & release_dates.platform = ${platforms} & genres = ${genres} & themes = ${themes} & player_perspectives = ${perspectives} & name != ${filterOut}; sort total_rating desc;`
}

// ;`fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where name ~ *"${query}"* & total_rating_count >= 1;`

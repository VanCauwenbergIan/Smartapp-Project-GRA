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

// ;`fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where name ~ *"${query}"* & total_rating_count >= 1;`

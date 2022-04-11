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

//for testing

export const recentlyViewed_test: Game[] = [
  {
    id: 119133,
    name: 'Elden Ring',
    cover: { id: 212094, image_id: 'co4jni' },
  },
  {
    id: 17000,
    name: 'Stardew Valley',
    cover: { id: 14012, image_id: 'xrpmydnu9rpxvxfjkiu7' },
  },
  {
    id: 124954,
    name: 'Crusader Kings III',
    cover: { id: 114174, image_id: 'co2g3i' },
  },
  {
    id: 4843,
    name: 'Kingdom Come: Deliverance',
    cover: { id: 200538, image_id: 'co4aqi' },
  },
]
export const favorites_test: Game[] = [
  {
    id: 7334,
    cover: {
      id: 82054,
      image_id: 'co1rba',
    },
    name: 'Bloodborne',
    similar_games: [
      {
        id: 1887,
        cover: {
          id: 122974,
          image_id: 'co2mvy',
        },
        name: 'Dragon Age: Inquisition',
      },
      {
        id: 2155,
        cover: {
          id: 89684,
          image_id: 'co1x78',
        },
        name: 'Dark Souls',
      },
      {
        id: 2368,
        cover: {
          id: 112344,
          image_id: 'co2eoo',
        },
        name: 'Dark Souls II',
      },
      {
        id: 10760,
        cover: {
          id: 112131,
          image_id: 'co2eir',
        },
        name: 'Bloodstained: Ritual of the Night',
      },
      {
        id: 11133,
        cover: {
          id: 87279,
          image_id: 'co1vcf',
        },
        name: 'Dark Souls III',
      },
      {
        id: 14394,
        cover: {
          id: 70873,
          image_id: 'co1iop',
        },
        name: 'Battle Brothers',
      },
      {
        id: 18225,
        cover: {
          id: 74152,
          image_id: 'co1l7s',
        },
        name: 'The Sinking City',
      },
      {
        id: 28168,
        cover: {
          id: 81873,
          image_id: 'co1r69',
        },
        name: 'Code Vein',
      },
      {
        id: 36198,
        cover: {
          id: 117794,
          image_id: 'co2iw2',
        },
        name: 'Children of Morta',
      },
      {
        id: 55199,
        cover: {
          id: 81874,
          image_id: 'co1r6a',
        },
        name: 'Dragon: Marked for Death',
      },
    ],
  },
  {
    id: 37016,
    cover: {
      id: 71083,
      image_id: 'co1iuj',
    },
    name: 'Metro Exodus',
    similar_games: [
      {
        id: 13210,
        cover: {
          id: 71498,
          image_id: 'co1j62',
        },
        name: 'How to Survive 2',
      },
      {
        id: 17379,
        cover: {
          id: 182268,
          image_id: 'co3wn0',
        },
        name: 'Miscreated',
      },
      {
        id: 19561,
        cover: {
          id: 71279,
          image_id: 'co1izz',
        },
        name: 'Days Gone',
      },
      {
        id: 19564,
        cover: {
          id: 141511,
          image_id: 'co316v',
        },
        name: 'Death Stranding',
      },
      {
        id: 26192,
        cover: {
          id: 81672,
          image_id: 'co1r0o',
        },
        name: 'The Last of Us Part II',
      },
      {
        id: 28168,
        cover: {
          id: 81873,
          image_id: 'co1r69',
        },
        name: 'Code Vein',
      },
      {
        id: 55038,
        cover: {
          id: 82160,
          image_id: 'co1re8',
        },
        name: 'Immortal: Unchained',
      },
      {
        id: 102584,
        cover: {
          id: 141988,
          image_id: 'co31k4',
        },
        name: 'Dying Light 2: Stay Human',
      },
      {
        id: 105049,
        cover: {
          id: 75344,
          image_id: 'co1m4w',
        },
        name: 'Remnant: From the Ashes',
      },
      {
        id: 105269,
        cover: {
          id: 82218,
          image_id: 'co1rfu',
        },
        name: 'Gene Rain',
      },
    ],
  },
  {
    id: 25076,
    cover: {
      id: 80403,
      image_id: 'co1q1f',
    },
    name: 'Red Dead Redemption 2',
    similar_games: [
      {
        id: 17379,
        cover: {
          id: 182268,
          image_id: 'co3wn0',
        },
        name: 'Miscreated',
      },
      {
        id: 18225,
        cover: {
          id: 74152,
          image_id: 'co1l7s',
        },
        name: 'The Sinking City',
      },
      {
        id: 19564,
        cover: {
          id: 141511,
          image_id: 'co316v',
        },
        name: 'Death Stranding',
      },
      {
        id: 19565,
        cover: {
          id: 81907,
          image_id: 'co1r77',
        },
        name: "Marvel's Spider-Man",
      },
      {
        id: 26192,
        cover: {
          id: 81672,
          image_id: 'co1r0o',
        },
        name: 'The Last of Us Part II',
      },
      {
        id: 28168,
        cover: {
          id: 81873,
          image_id: 'co1r69',
        },
        name: 'Code Vein',
      },
      {
        id: 55038,
        cover: {
          id: 82160,
          image_id: 'co1re8',
        },
        name: 'Immortal: Unchained',
      },
      {
        id: 80916,
        cover: {
          id: 67256,
          image_id: 'fq2ekyx6ac8em4lpv3zj',
        },
        name: 'Omensight',
      },
      {
        id: 105049,
        cover: {
          id: 75344,
          image_id: 'co1m4w',
        },
        name: 'Remnant: From the Ashes',
      },
      {
        id: 113114,
        cover: {
          id: 111992,
          image_id: 'co2eew',
        },
        name: 'The Outer Worlds',
      },
    ],
  },
  {
    id: 1942,
    cover: {
      id: 89386,
      image_id: 'co1wyy',
    },
    name: 'The Witcher 3: Wild Hunt',
    similar_games: [
      {
        id: 80,
        cover: {
          id: 90429,
          image_id: 'co1xrx',
        },
        name: 'The Witcher',
      },
      {
        id: 121,
        cover: {
          id: 199481,
          image_id: 'co49x5',
        },
        name: 'Minecraft',
      },
      {
        id: 472,
        cover: {
          id: 85100,
          image_id: 'co1tnw',
        },
        name: 'The Elder Scrolls V: Skyrim',
      },
      {
        id: 533,
        cover: {
          id: 90811,
          image_id: 'co1y2j',
        },
        name: 'Dishonored',
      },
      {
        id: 1334,
        cover: {
          id: 82644,
          image_id: 'co1rro',
        },
        name: 'Brothers: A Tale of Two Sons',
      },
      {
        id: 1593,
        cover: {
          id: 82246,
          image_id: 'co1rgm',
        },
        name: 'Pillars of Eternity',
      },
      {
        id: 1887,
        cover: {
          id: 122974,
          image_id: 'co2mvy',
        },
        name: 'Dragon Age: Inquisition',
      },
      {
        id: 3025,
        cover: {
          id: 94225,
          image_id: 'co20pd',
        },
        name: 'Middle-earth: Shadow of Mordor',
      },
      {
        id: 9938,
        cover: {
          id: 82230,
          image_id: 'co1rg6',
        },
        name: 'Aarklash: Legacy',
      },
      {
        id: 11270,
        cover: {
          id: 82220,
          image_id: 'co1rfw',
        },
        name: 'The Cat Lady',
      },
    ],
  },
]

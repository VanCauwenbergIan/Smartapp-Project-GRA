import axios from 'axios'
import { IGDB_URI, IGDB_CLIENTID, IGDB_TOKEN } from '@env'
import Game from '../interfaces/game'

// tried to do it with just a regular fetch, but I would keep getting network errors
// note to self: limited to 4 requests / second or you get a 429 status code
export const getPopularGames = () => {
  return axios({
    url: IGDB_URI + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': IGDB_CLIENTID,
      Authorization: `Bearer ${IGDB_TOKEN}`,
    },
    data: 'fields aggregated_rating, cover.image_id, genres.name, involved_companies.developer, involved_companies.company.name, name, rating, total_rating; limit 500;where rating >= 70 & aggregated_rating_count >= 1 & aggregated_rating > 0 & total_rating_count >= 5 & parent_game = null & version_parent = null & hypes != null; sort first_release_date desc;',
  })
}

export const getAnticipatedGames = () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  return axios({
    url: IGDB_URI + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': IGDB_CLIENTID,
      Authorization: `Bearer ${IGDB_TOKEN}`,
    },
    data: `fields cover.image_id, first_release_date, release_dates.human, release_dates.date , name; limit 100;where first_release_date > ${currentTimestamp} & hypes != null; sort hypes desc;`,
  })
}

export const getNewReleases = () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  return axios({
    url: IGDB_URI + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': IGDB_CLIENTID,
      Authorization: `Bearer ${IGDB_TOKEN}`,
    },
    data: `fields cover.image_id, first_release_date, release_dates.human, release_dates.date , game_modes.name, name, platforms.name; limit 500; where first_release_date < ${currentTimestamp};  sort first_release_date desc;`,
  })
}

// untested
export const getSingleGame = (id: number) => {
  return axios({
    url: IGDB_URI + '/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': IGDB_CLIENTID,
      Authorization: `Bearer ${IGDB_TOKEN}`,
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
    involved_companies: [
      {
        id: 17332,
        company: {
          id: 45,
          name: 'Sony Computer Entertainment, Inc. (SCEI)',
        },
        developer: false,
      },
      {
        id: 17333,
        company: {
          id: 1012,
          name: 'FromSoftware',
        },
        developer: true,
      },
    ],
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
    involved_companies: [
      {
        id: 50685,
        company: {
          id: 314,
          name: '4A Games',
        },
        developer: true,
      },
      {
        id: 50686,
        company: {
          id: 423,
          name: 'Deep Silver',
        },
        developer: false,
      },
    ],
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
    involved_companies: [
      {
        id: 40855,
        company: {
          id: 139,
          name: 'Take-Two Interactive',
        },
        developer: false,
      },
      {
        id: 98112,
        company: {
          id: 29,
          name: 'Rockstar Games',
        },
        developer: true,
      },
    ],
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
    involved_companies: [
      {
        id: 17436,
        company: {
          id: 50,
          name: 'WB Games',
        },
        developer: false,
      },
      {
        id: 17768,
        company: {
          id: 248,
          name: 'Bandai Namco Entertainment',
        },
        developer: false,
      },
      {
        id: 17769,
        company: {
          id: 3119,
          name: 'cdp.pl',
        },
        developer: false,
      },
      {
        id: 17771,
        company: {
          id: 1217,
          name: 'Spike ChunSoft',
        },
        developer: false,
      },
      {
        id: 42142,
        company: {
          id: 908,
          name: 'CD Projekt RED',
        },
        developer: true,
      },
      {
        id: 64293,
        company: {
          id: 5696,
          name: 'D3T Limited',
        },
        developer: false,
      },
    ],
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
  {
    id: 18166,
    cover: {
      id: 116166,
      image_id: 'co2hmu',
    },
    involved_companies: [
      {
        id: 33413,
        company: {
          id: 743,
          name: 'Tripwire Interactive',
        },
        developer: true,
      },
      {
        id: 33414,
        company: {
          id: 9316,
          name: 'Antimatter Games',
        },
        developer: true,
      },
    ],
    name: 'Rising Storm 2: Vietnam',
    similar_games: [
      {
        id: 8422,
        cover: {
          id: 10722,
          image_id: 'vuxcu2rkrbokfnf14yse',
        },
        name: 'Breach & Clear',
      },
      {
        id: 17130,
        cover: {
          id: 82164,
          image_id: 'co1rec',
        },
        name: 'Unclaimed World',
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
        id: 18623,
        cover: {
          id: 67709,
          image_id: 'ng8iyawuctwzqz32jo5p',
        },
        name: 'Villagers',
      },
      {
        id: 25311,
        cover: {
          id: 68395,
          image_id: 'rmzcpsfvnizymkhvd0qg',
        },
        name: 'Star Control: Origins',
      },
      {
        id: 30229,
        cover: {
          id: 82240,
          image_id: 'co1rgg',
        },
        name: 'Bannermen',
      },
      {
        id: 36553,
        cover: {
          id: 82667,
          image_id: 'co1rsb',
        },
        name: 'Medieval Kingdom Wars',
      },
      {
        id: 78550,
        cover: {
          id: 82233,
          image_id: 'co1rg9',
        },
        name: 'Bad North',
      },
      {
        id: 79134,
        cover: {
          id: 82162,
          image_id: 'co1rea',
        },
        name: 'Ancient Cities',
      },
      {
        id: 106112,
        cover: {
          id: 128865,
          image_id: 'co2rfl',
        },
        name: 'Steel Division 2',
      },
    ],
  },
  {
    id: 28540,
    cover: {
      id: 82058,
      image_id: 'co1rbe',
    },
    involved_companies: [
      {
        id: 50707,
        company: {
          id: 104,
          name: 'Ubisoft Entertainment',
        },
        developer: false,
      },
      {
        id: 50747,
        company: {
          id: 38,
          name: 'Ubisoft Montreal',
        },
        developer: true,
      },
      {
        id: 63901,
        company: {
          id: 840,
          name: 'Ubisoft Sofia',
        },
        developer: false,
      },
      {
        id: 63902,
        company: {
          id: 822,
          name: 'Ubisoft Singapore',
        },
        developer: false,
      },
      {
        id: 63904,
        company: {
          id: 702,
          name: 'Ubisoft Montpellier',
        },
        developer: false,
      },
      {
        id: 63905,
        company: {
          id: 3928,
          name: 'Ubisoft Chengdu',
        },
        developer: false,
      },
      {
        id: 63906,
        company: {
          id: 2921,
          name: 'Ubisoft Kyiv',
        },
        developer: false,
      },
      {
        id: 63907,
        company: {
          id: 896,
          name: '(Archive) Ubisoft Quebec',
        },
        developer: false,
      },
      {
        id: 63908,
        company: {
          id: 398,
          name: 'Ubisoft Shanghai',
        },
        developer: false,
      },
      {
        id: 63909,
        company: {
          id: 15260,
          name: 'Ubisoft Philippines',
        },
        developer: false,
      },
      {
        id: 63940,
        company: {
          id: 697,
          name: 'Ubisoft Bucharest',
        },
        developer: false,
      },
    ],
    name: "Assassin's Creed: Origins",
    similar_games: [
      {
        id: 11156,
        cover: {
          id: 133030,
          image_id: 'co2una',
        },
        name: 'Horizon Zero Dawn',
      },
      {
        id: 11171,
        cover: {
          id: 73663,
          image_id: 'co1ku7',
        },
        name: "Tom Clancy's Ghost Recon: Wildlands",
      },
      {
        id: 18167,
        cover: {
          id: 81912,
          image_id: 'co1r7c',
        },
        name: 'Hello Neighbor',
      },
      {
        id: 25076,
        cover: {
          id: 80403,
          image_id: 'co1q1f',
        },
        name: 'Red Dead Redemption 2',
      },
      {
        id: 27316,
        cover: {
          id: 74261,
          image_id: 'co1lat',
        },
        name: 'A Plague Tale: Innocence',
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
        id: 28552,
        cover: {
          id: 94974,
          image_id: 'co21a6',
        },
        name: 'Far Cry 5',
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
        id: 36926,
        cover: {
          id: 82685,
          image_id: 'co1rst',
        },
        name: 'Monster Hunter: World',
      },
      {
        id: 54842,
        cover: {
          id: 82670,
          image_id: 'co1rse',
        },
        name: 'Biomutant',
      },
    ],
  },
  {
    id: 119133,
    cover: {
      id: 212094,
      image_id: 'co4jni',
    },
    involved_companies: [
      {
        id: 158585,
        company: {
          id: 248,
          name: 'Bandai Namco Entertainment',
        },
        developer: false,
      },
      {
        id: 158586,
        company: {
          id: 1012,
          name: 'FromSoftware',
        },
        developer: true,
      },
    ],
    name: 'Elden Ring',
    similar_games: [
      {
        id: 25636,
        cover: {
          id: 82102,
          image_id: 'co1rcm',
        },
        name: 'Nights of Azure 2: Bride of the New Moon',
      },
      {
        id: 54775,
        cover: {
          id: 75809,
          image_id: 'co1mht',
        },
        name: 'Shadows: Awakening',
      },
      {
        id: 57372,
        cover: {
          id: 76314,
          image_id: 'co1mvu',
        },
        name: 'SoulWorker',
      },
      {
        id: 81249,
        cover: {
          id: 91183,
          image_id: 'co1ycv',
        },
        name: 'The Elder Scrolls VI',
      },
      {
        id: 96217,
        cover: {
          id: 72919,
          image_id: 'co1k9j',
        },
        name: 'Eternity: The Last Unicorn',
      },
      {
        id: 103303,
        cover: {
          id: 91145,
          image_id: 'co1ybt',
        },
        name: 'The Elder Scrolls: Blades',
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
        id: 106987,
        cover: {
          id: 130983,
          image_id: 'co2t2f',
        },
        name: 'Torchlight III',
      },
      {
        id: 113109,
        cover: {
          id: 81944,
          image_id: 'co1r88',
        },
        name: 'Marvel Ultimate Alliance 3: The Black Order',
      },
      {
        id: 115280,
        cover: {
          id: 75082,
          image_id: 'co1lxm',
        },
        name: 'Oninaki',
      },
    ],
  },
  {
    id: 1904,
    cover: {
      id: 82078,
      image_id: 'co1rby',
    },
    involved_companies: [
      {
        id: 7094,
        company: {
          id: 517,
          name: 'Paradox Interactive',
        },
        developer: false,
      },
      {
        id: 35534,
        company: {
          id: 7466,
          name: 'Paradox Development Studio',
        },
        developer: true,
      },
    ],
    name: 'Europa Universalis IV',
    similar_games: [
      {
        id: 662,
        cover: {
          id: 99296,
          image_id: 'co24m8',
        },
        name: 'Anno 1404',
      },
      {
        id: 848,
        cover: {
          id: 107506,
          image_id: 'co2aya',
        },
        name: 'Rise of Nations',
      },
      {
        id: 2040,
        cover: {
          id: 127673,
          image_id: 'co2qih',
        },
        name: 'Knights of Honor',
      },
      {
        id: 2918,
        cover: {
          id: 76330,
          image_id: 'co1mwa',
        },
        name: 'Crusader Kings II',
      },
      {
        id: 10774,
        cover: {
          id: 184775,
          image_id: 'co3ykn',
        },
        name: 'Rise of Venice',
      },
      {
        id: 11037,
        cover: {
          id: 93025,
          image_id: 'co1zs1',
        },
        name: 'Victoria II',
      },
      {
        id: 20776,
        cover: {
          id: 89611,
          image_id: 'co1x57',
        },
        name: 'Imperium Romanum',
      },
      {
        id: 28325,
        cover: {
          id: 67711,
          image_id: 'bjczvgtluq7ff6jg2tmw',
        },
        name: 'Hearthlands',
      },
      {
        id: 36553,
        cover: {
          id: 82667,
          image_id: 'co1rsb',
        },
        name: 'Medieval Kingdom Wars',
      },
      {
        id: 55036,
        cover: {
          id: 81871,
          image_id: 'co1r67',
        },
        name: 'Anno 1800',
      },
    ],
  },
]

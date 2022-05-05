import { Image, Text, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import Game from '../../interfaces/game'
import {
  getDeveloper,
  getReleaseDate,
  getSingleGame,
  getThemes,
} from '../../utils/requests'
import TopBar from '../../components/TopBarDetails'
import ThemeTag from '../../components/ThemeTag'
import { FlatList } from 'react-native-gesture-handler'
import CardSmall from '../../components/CardSmall'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import AgeRating from '../../components/AgeRating'
import RatingChart from '../../components/RatingChart'
import ColumnList from '../../components/ColumnList'
import { useHistory } from '../../utils/historyContext'
import { database } from '../../utils/database'
import { auth } from '../../utils/firebase'

const renderGame = ({ item }: { item: Game }) => {
  return <CardSmall game={item} key={item.id} />
}

export default ({ route }: { route: any }) => {
  const [game, setGame] = useState<Game>()
  const { history, setHistory } = useHistory()

  const { id } = route.params

  let i = 0

  useEffect(() => {
    getSingleGame(id).then((r) => {
      setGame(r.data[0])
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser && game) {
      if (!checkIfInHistory(game)) {
        var array = history
        if (history.length >= 25) {
          array.splice(-1, 1)
        }
        array.unshift(game)
        setHistory(array)
        database(auth.currentUser.uid).setHistory(array)
      } else {
        var array = history
        let index = array.findIndex((item) => item.id == game.id)
        array.splice(index, 1)
        array.unshift(game)
        setHistory(array)
        database(auth.currentUser.uid).setHistory(array)
      }
    }
  }, [game])

  const checkIfInHistory = (game: Game) => {
    if (history.some((item) => item.id == game.id)) {
      return true
    } else {
      return false
    }
  }

  return (
    <View style={[CoreStyle.background_dark, UtilsStyle.full_size]}>
      {game ? <TopBar game={game} /> : null}
      <ScrollView>
        <View style={CoreStyle.screenshot_container}>
          {game ? (
            <Image
              style={[UtilsStyle.full_size, UtilsStyle.o_50]}
              source={{
                uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${
                  game.screenshots ? game.screenshots[0].image_id : 'nocover'
                }.png`,
              }}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={[CoreStyle.screenshot_container, UtilsStyle.p_2]}>
          <View
            style={[
              UtilsStyle.flex_row,
              UtilsStyle.space_between,
              UtilsStyle.ai_flex_end,
            ]}
          >
            <Text style={[TextStyle.sub_title, { width: '45%' }]}>
              {game?.name}
            </Text>
            {game ? (
              <View
                style={[
                  CoreStyle.charts_container,
                  UtilsStyle.flex_column,
                  UtilsStyle.space_between,
                ]}
              >
                <View style={[UtilsStyle.flex_row, UtilsStyle.center_content]}>
                  {game.rating && game.rating_count ? (
                    <RatingChart rating={game.rating} type="member" />
                  ) : (
                    <RatingChart type="member" />
                  )}
                  {game.aggregated_rating && game.aggregated_rating_count ? (
                    <RatingChart
                      rating={game.aggregated_rating}
                      type="critic"
                    />
                  ) : (
                    <RatingChart type="critic" />
                  )}
                </View>
                <View
                  style={
                    game.aggregated_rating_count && game.rating_count
                      ? [UtilsStyle.flex_row, UtilsStyle.space_evenly]
                      : [UtilsStyle.flex_row, UtilsStyle.jc_flex_end]
                  }
                >
                  {game.rating_count ? (
                    <Text
                      style={
                        game.aggregated_rating_count
                          ? [
                              TextStyle.card_m_main,
                              UtilsStyle.o_50,
                              UtilsStyle.mr_3,
                            ]
                          : [
                              TextStyle.card_m_main,
                              UtilsStyle.o_50,
                              { marginRight: 120 },
                            ]
                      }
                    >{`${game.rating_count} members`}</Text>
                  ) : null}
                  {game.aggregated_rating_count ? (
                    <Text
                      style={
                        game.rating_count
                          ? [TextStyle.card_m_main, UtilsStyle.o_50]
                          : [
                              TextStyle.card_m_main,
                              UtilsStyle.o_50,
                              UtilsStyle.mr_3,
                            ]
                      }
                    >{`${game.aggregated_rating_count} critics`}</Text>
                  ) : null}
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={CoreStyle.information_container}>
          <View style={CoreStyle.sub_container}>
            <Text
              style={[
                TextStyle.sub_title,
                UtilsStyle.mb_1,
                UtilsStyle.o_50,
                { width: '45%' },
              ]}
            >
              {getReleaseDate(game)}
            </Text>
            <Text
              style={[
                TextStyle.body,
                TextStyle.card_l_dev,
                UtilsStyle.mb_5,
                { width: '45%' },
              ]}
            >
              {getDeveloper(game)}
            </Text>
          </View>
          <View style={[CoreStyle.sub_container, CoreStyle.background_light]}>
            <View style={UtilsStyle.wrap_around}>
              {getThemes(game).map((t) => {
                i++
                // ids are not unique because three different properties are combined here
                return <ThemeTag theme={t.name} key={i} />
              })}
            </View>
            <Text
              style={[TextStyle.sub_title, UtilsStyle.mb_1, UtilsStyle.mt_2]}
            >
              About
            </Text>
            <Text style={[TextStyle.body, UtilsStyle.mb_4]}>
              {game?.summary}
            </Text>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_1]}>
              Platforms
            </Text>
            {game && game.platforms ? (
              <ColumnList list={game.platforms} />
            ) : null}
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_1]}>Modes</Text>
            {game && game.game_modes ? (
              <ColumnList list={game.game_modes} />
            ) : null}
            <AgeRating game={game} />
          </View>
          <View style={CoreStyle.sub_container}>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_3]}>
              Similar Games
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={UtilsStyle.mb_2}
              horizontal={true}
              data={game?.similar_games}
              renderItem={renderGame}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

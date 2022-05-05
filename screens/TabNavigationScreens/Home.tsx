import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getGreeting, pickRandomGame } from '../../utils/home'
import Game from '../../interfaces/game'
import CardSmall from '../../components/CardSmall'
import CardPictureView from '../../components/CardPictureview'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { firstCard as FirstCard } from '../../components/CardPictureview'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { app, auth } from '../../utils/firebase'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { favorites_test, recentlyViewed_test } from '../../utils/requests'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { database } from '../../utils/database'
import { useEffect, useState } from 'react'
import { useHistory } from '../../utils/historyContext'
import { useFavorites } from '../../utils/favoritesContext'

const renderGame = ({ item }: { item: Game }) => {
  return <CardSmall game={item} key={item.id} />
}

const renderGamePictureView = ({ item }: { item: Game }) => {
  return <CardPictureView game={item} key={item.id} />
}

export default () => {
  const [randomGame, setRandomGame] = useState<Game>()
  const [rerender, setRerender] = useState<boolean>(false)
  const { setFavorites, favorites } = useFavorites()
  const { setHistory, history } = useHistory()
  const { navigate } = useNavigation<BottomTabNavigationProp<ParamListBase>>()

  useEffect(() => {
    if (auth.currentUser) {
      database(auth.currentUser.uid)
        .getFavorites()
        .then((fav: Game[]) => {
          setFavorites(fav)
          setRandomGame(pickRandomGame(fav))
        })

      database(auth.currentUser.uid)
        .getHistory()
        .then((his: Game[]) => {
          setHistory(his)
        })
    }
  }, [])

  // prevent constant flickering and rerendring of the random game by linking it to the favorites listview contentsize
  const refresh = () => {
    setRerender(!rerender)
  }

  useEffect(() => {
    setRandomGame(pickRandomGame(favorites))
  }, [rerender])

  // if (auth.currentUser) {
  //   //   database(auth.currentUser.uid).setFavorites(favorites_test)
  //   database(auth.currentUser.uid).setHistory(recentlyViewed_test)
  // }

  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[TextStyle.sub_title, CoreStyle.color_accent]}>
          {getGreeting()}
        </Text>
        <Text style={[TextStyle.title, UtilsStyle.mb_3]}>
          {auth.currentUser?.displayName}
        </Text>
        <Text style={TextStyle.sub_title}>Recently viewed</Text>
        {history && history.length >= 1 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={[UtilsStyle.mb_3, UtilsStyle.mt_3]}
            horizontal={true}
            data={history}
            renderItem={renderGame}
          />
        ) : (
          <View style={[UtilsStyle.full_size, UtilsStyle.mt_1]}>
            <Text style={[TextStyle.body, UtilsStyle.mb_2]}>
              You haven't browsed any games yet...
            </Text>
            <TouchableOpacity onPress={() => navigate('Trending')}>
              <Text
                style={[
                  TextStyle.body,
                  CoreStyle.color_accent,
                  UtilsStyle.mb_3,
                ]}
              >
                Click here to get started!
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {randomGame && randomGame.similar_games ? (
          <View>
            <Text
              numberOfLines={1}
              style={[TextStyle.sub_title, UtilsStyle.mb_2]}
            >
              More like...{' '}
              <Text style={CoreStyle.color_accent}>{randomGame.name}</Text>
            </Text>
            <ScrollView
              horizontal={true}
              style={UtilsStyle.mb_2}
              showsHorizontalScrollIndicator={false}
            >
              <FirstCard game={randomGame} />
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={Math.ceil(randomGame.similar_games.length / 2)}
                data={randomGame.similar_games}
                renderItem={renderGamePictureView}
              />
            </ScrollView>
          </View>
        ) : null}
        <View style={[UtilsStyle.flex_row, UtilsStyle.space_between]}>
          <Text style={TextStyle.sub_title}>Favorites</Text>
          <TouchableOpacity onPress={() => navigate('Account')}>
            <Text style={[TextStyle.body, CoreStyle.color_accent]}>Manage</Text>
          </TouchableOpacity>
        </View>
        {favorites && favorites.length >= 1 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={[UtilsStyle.mb_2, UtilsStyle.mt_3]}
            horizontal={true}
            data={favorites}
            onContentSizeChange={() => refresh()}
            renderItem={renderGame}
          />
        ) : (
          <Text style={[TextStyle.body, UtilsStyle.mt_1]}>
            You don't have any favorites yet!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

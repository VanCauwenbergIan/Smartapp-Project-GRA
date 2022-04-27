import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getGreeting, pickRandomGame } from '../../utils/home'
import Game from '../../interfaces/game'
import CardSmall from '../../components/CardSmall'
import CardPictureView from '../../components/CardPictureview'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { firstCard as FirstCard } from '../../components/CardPictureview'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { recentlyViewed_test, favorites_test } from '../../utils/requests'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

const renderGame = ({ item }: { item: Game }) => {
  return <CardSmall game={item} key={item.id} />
}

const renderGamePictureView = ({ item }: { item: Game }) => {
  return <CardPictureView game={item} key={item.id} />
}

const randomGame = pickRandomGame(favorites_test)

export default () => {
  const { navigate } = useNavigation<BottomTabNavigationProp<ParamListBase>>()

  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <ScrollView>
        <Text style={[TextStyle.sub_title, CoreStyle.color_accent]}>
          {getGreeting()}
        </Text>
        <Text style={[TextStyle.title, UtilsStyle.mb_3]}>Obama_gaming</Text>
        <Text
          style={[TextStyle.sub_title, UtilsStyle.mb_3]}
        >
          Recently viewed
        </Text>
        <FlatList
          style={UtilsStyle.mb_3}
          horizontal={true}
          data={recentlyViewed_test}
          renderItem={renderGame}
        />
        <Text
          numberOfLines={1}
          style={[TextStyle.sub_title, UtilsStyle.mb_2]}
        >
          More like...{' '}
          <Text style={CoreStyle.color_accent}>{randomGame.name}</Text>
        </Text>
        {randomGame.similar_games ? (
          <ScrollView horizontal={true} style={UtilsStyle.mb_2}>
            <FirstCard game={randomGame} />
            <FlatList
              contentContainerStyle={{ alignSelf: 'flex-start' }}
              numColumns={Math.ceil(randomGame.similar_games.length / 2)}
              data={randomGame.similar_games}
              renderItem={renderGamePictureView}
            />
          </ScrollView>
        ) : null}
        <View style={[UtilsStyle.flex_row, UtilsStyle.space_between]}>
          <Text
            style={[TextStyle.sub_title, UtilsStyle.mb_3]}
          >
            Favorites
          </Text>
          <TouchableOpacity onPress={() => navigate('Account')}>
            <Text style={[TextStyle.body, CoreStyle.color_accent]}>Manage</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={UtilsStyle.mb_2}
          horizontal={true}
          data={favorites_test}
          renderItem={renderGame}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

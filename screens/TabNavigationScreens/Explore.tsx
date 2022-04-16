import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import Game from '../../interfaces/game'
import { getPopularGames } from '../../utils/requests'
import CardLarge from '../../components/card_large'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { theme_main } from '../../styles/colors'

const renderGame = ({ item }: { item: Game }) => {
  return <CardLarge game={item} key={item.id} />
}

export default () => {
  const [games, setGames] = useState<Game[]>()

  useEffect(() => {
    getPopularGames().then((r) => {
      setGames(r.data)
    })
  }, [])

  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <View style={CoreStyle.topbar_explore}>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.mb_3,
            UtilsStyle.center_content_v,
          ]}
        >
          <Text style={TextStyle.title}>Explore</Text>
          <MaterialIcons name="sort" color={theme_main.xx_light} size={32} />
        </View>
        <View
          style={[
            UtilsStyle.flex_row,
            CoreStyle.searchbar,
            UtilsStyle.mb_3,
            UtilsStyle.center_content_v,
          ]}
        >
          <MaterialIcons
            style={UtilsStyle.mr_2}
            name="search"
            color={theme_main.light}
            size={24}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme_main.light}
            style={TextStyle.body}
          />
        </View>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.mb_4,
            UtilsStyle.center_content_v,
          ]}
        >
          <Text style={[TextStyle.sub_title, UtilsStyle.text_bold]}>
            Let us help you!
          </Text>
          <TouchableOpacity>
            <Text style={[TextStyle.body, CoreStyle.color_accent]}>
              recommend me games
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={UtilsStyle.full_size}
        data={games}
        renderItem={renderGame}
      />
    </SafeAreaView>
  )
}

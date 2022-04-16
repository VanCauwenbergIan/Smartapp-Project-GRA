import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import Game from '../../interfaces/game'
import CardFavorite from '../../components/card_favorite'

import { favorites_test } from '../../utils/requests'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { theme_main } from '../../styles/colors'

const renderGame = ({ item }: { item: Game }) => {
  return <CardFavorite game={item} key={item.id} />
}

export default () => {
  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <View style={CoreStyle.topbar_account}>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.center_content_v,
            UtilsStyle.mb_1,
          ]}
        >
          <Text style={TextStyle.title}>Obama_gaming</Text>
          <MaterialIcons name="edit" color={theme_main.xx_light} size={32} />
        </View>
        <View style={[UtilsStyle.flex_row, UtilsStyle.ml_1, UtilsStyle.mb_3]}>
          <Text style={TextStyle.sub_title}>obama@whitehouse.gov</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={[
              TextStyle.sub_title,
              CoreStyle.color_accent,
              UtilsStyle.mb_4,
            ]}
          >
            Log out
          </Text>
        </TouchableOpacity>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.mb_3,
          ]}
        >
          <Text
            style={[TextStyle.sub_title, UtilsStyle.text_bold, UtilsStyle.mr_4]}
          >
            Favorites
          </Text>
          <View
            style={[UtilsStyle.flex_row, CoreStyle.searchbar, UtilsStyle.mb_3]}
          >
            <MaterialIcons
              style={UtilsStyle.mr_1}
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
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 120 }}
        data={favorites_test}
        renderItem={renderGame}
      />
    </SafeAreaView>
  )
}

import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'
import { getDeveloper, getPlatform, getReleaseDate } from '../utils/requests'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import { theme_main } from '../styles/colors'

export default ({ game }: { game: Game }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      style={[UtilsStyle.flex_row, ButtonsStyle.card_lv, UtilsStyle.mb_2]}
      onPress={() => navigate('Details', { id: game.id })}
    >
      <View style={{ width: 80 }}>
        <Image
          style={[
            UtilsStyle.full_size,
            { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
          ]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${
              game.cover ? game.cover.image_id : 'nocover'
            }.png`,
          }}
        />
        {/* some new releases don't have a cover yet */}
      </View>
      <View
        style={[
          UtilsStyle.p_1,
          UtilsStyle.flex_column,
          UtilsStyle.space_between,
          UtilsStyle.full_size,
        ]}
      >
        <View style={[UtilsStyle.flex_row, UtilsStyle.space_between]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[TextStyle.card_f_main, { maxWidth: '85%' }]}
          >
            {game.name}
          </Text>
          <Ionicons name="close" color={theme_main.light} size={24} />
        </View>
        <Text numberOfLines={1} style={[TextStyle.body, TextStyle.card_l_dev]}>
          {getDeveloper(game)}
        </Text>
      </View>
    </Pressable>
  )
}

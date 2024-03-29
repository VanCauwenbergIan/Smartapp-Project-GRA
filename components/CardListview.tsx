import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'
import { getPlatform, getReleaseDate } from '../utils/requests'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'

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
      <View style={[UtilsStyle.p_1, UtilsStyle.flex_column]}>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.mb_2,
            UtilsStyle.h_50,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[TextStyle.card_m_main, { width: '70%' }]}
          >
            {game.name}
          </Text>
          <Text style={TextStyle.card_m_sub}>{getReleaseDate(game)}</Text>
        </View>
        <Text
          numberOfLines={2}
          style={[TextStyle.card_m_main, , UtilsStyle.h_50]}
        >
          Platforms:
          <Text style={TextStyle.card_m_sub}>{getPlatform(game)}</Text>
        </Text>
      </View>
    </Pressable>
  )
}

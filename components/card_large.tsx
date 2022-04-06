import { Image, Pressable, Text, View } from 'react-native'
import { getColorRating } from '../utils/colorRating'
import Game from '../interfaces/game'
import { getDeveloper } from '../utils/requests'

import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'

export default ({ game }: { game: Game }) => {
  return (
    <Pressable
      style={[UtilsStyle.flex_row, ButtonsStyle.card_large, UtilsStyle.mb_3]}
    >
      <View style={UtilsStyle.w_50}>
        <Image
          style={[
            UtilsStyle.full_size,
            { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
          ]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`,
          }}
        />
      </View>
      <View style={[UtilsStyle.w_50, UtilsStyle.p_1]}>
        <Text numberOfLines={3} style={[TextStyle.card_l_main, UtilsStyle.mb_1]}>
          {game.name}
        </Text>
        <Text style={[TextStyle.card_l_sub, UtilsStyle.mb_2]}>
          {game.genres[0].name}
        </Text>
        <Text
          style={[
            TextStyle.title,
            UtilsStyle.text_bold,
            UtilsStyle.mb_2,
            { color: getColorRating(game.aggregated_rating) },
          ]}
        >
          {Math.round(game.aggregated_rating)}%
        </Text>
        <Text style={[TextStyle.card_l_sub, UtilsStyle.text_italic, UtilsStyle.text_bold]}>
          {getDeveloper(game)}
        </Text>
      </View>
    </Pressable>
  )
}

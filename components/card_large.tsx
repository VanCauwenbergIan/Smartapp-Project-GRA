import { Image, Pressable, Text, View } from 'react-native'
import { getColorRating } from '../utils/colorRating'
import Game from '../interfaces/game'
import { getDeveloper } from '../utils/requests'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import { theme_main } from '../styles/colors'

export default ({ game }: { game: Game }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      style={[UtilsStyle.flex_row, ButtonsStyle.card_large, UtilsStyle.mb_3]}
      onPress={() => navigate('Details', {id: game.id})}
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
        <Text
          numberOfLines={3}
          style={[TextStyle.card_l_main, UtilsStyle.mb_1]}
        >
          {game.name}
        </Text>
        <Text style={[TextStyle.card_l_sub, UtilsStyle.mb_2]}>
          {game.genres ? game.genres[0].name : ''}
        </Text>
        <Text
          style={[
            TextStyle.title,
            UtilsStyle.text_bold,
            UtilsStyle.mb_2,
            {
              color: game.aggregated_rating
                ? getColorRating(game.aggregated_rating)[1]
                : theme_main.light,
            },
          ]}
        >
          {game.aggregated_rating
            ? Math.round(game.aggregated_rating) + '%'
            : 'N/A'}
        </Text>
        <Text
          style={[
            TextStyle.card_l_sub,
            UtilsStyle.text_italic,
            UtilsStyle.text_bold,
          ]}
        >
          {getDeveloper(game)}
        </Text>
      </View>
    </Pressable>
  )
}

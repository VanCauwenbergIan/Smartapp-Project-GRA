import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import { getReleaseDate } from '../utils/requests'

export default ({ game }: { game: Game }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      style={[
        UtilsStyle.flex_column,
        ButtonsStyle.card_medium,
        UtilsStyle.mr_2,
      ]}
      onPress={() => navigate('Details', { id: game.id })}
    >
      <View style={UtilsStyle.h_85}>
        <Image
          style={[
            UtilsStyle.full_size,
            { borderTopLeftRadius: 5, borderTopRightRadius: 5 },
          ]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${
              game.cover ? game.cover.image_id : 'nocover'
            }.png`,
          }}
        />
      </View>
      <View
        style={[UtilsStyle.h_15, UtilsStyle.flex_row, UtilsStyle.space_between]}
      >
        <Text
          numberOfLines={2}
          style={[
            UtilsStyle.ml_1,
            UtilsStyle.text_align_v,
            TextStyle.card_m_main,
            { width: '50%' },
          ]}
        >
          {game.name}
        </Text>
        <Text
          style={[
            UtilsStyle.mr_1,
            UtilsStyle.text_align_v,
            TextStyle.card_m_sub,
          ]}
        >
          {getReleaseDate(game)}
        </Text>
      </View>
    </Pressable>
  )
}

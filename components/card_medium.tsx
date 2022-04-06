import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'

export default ({ game }: { game: Game }) => {
  return (
    <Pressable
      style={[
        UtilsStyle.flex_column,
        ButtonsStyle.card_medium,
        UtilsStyle.mr_2,
      ]}
    >
      <View style={UtilsStyle.h_85}>
        <Image
          style={[
            UtilsStyle.full_size,
            { borderTopLeftRadius: 5, borderTopRightRadius: 5 },
          ]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`,
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
          {game.release_dates[0].human}
        </Text>
      </View>
    </Pressable>
  )
}

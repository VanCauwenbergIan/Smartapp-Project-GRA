import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import ButtonsStyle from '../styles/buttons'
import UtilsStyle from '../styles/utils'
import TextStyle from '../styles/text'

export default ({ game }: { game: Game }) => {
  const { push } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      style={[ButtonsStyle.card_small, UtilsStyle.mr_2, UtilsStyle.flex_column]}
      onPress={() => push('Details', { id: game.id })}
    >
      <View style={{ height: 136 }}>
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
      <Text
        numberOfLines={2}
        style={[TextStyle.card_m_main, ButtonsStyle.cs_textbox]}
      >
        {game.name}
      </Text>
    </Pressable>
  )
}

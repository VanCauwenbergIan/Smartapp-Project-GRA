import {
  ParamListBase,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Image, Pressable, Text, View } from 'react-native'
import Game from '../interfaces/game'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'

export const firstCard = ({ game }: { game: Game }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      onPress={() => navigate('Details', { id: game.id })}
      style={[ButtonsStyle.card_pv_lg, UtilsStyle.mr_1]}
    >
      <Image
        style={[UtilsStyle.full_size, { borderRadius: 5 }]}
        source={{
          uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${
            game.cover ? game.cover.image_id : 'nocover'
          }.png`,
        }}
      />
    </Pressable>
  )
}

export default ({ game }: { game: Game }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable onPress={() => navigate('Details', { id: game.id })}>
      <View style={[ButtonsStyle.card_pv_sm, UtilsStyle.mr_1, UtilsStyle.mb_1]}>
        <Image
          style={[UtilsStyle.full_size, { borderRadius: 5 }]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${
              game.cover ? game.cover.image_id : 'nocover'
            }.png`,
          }}
        />
      </View>
      <View style={ButtonsStyle.card_pv_textbox}>
        <Text
          numberOfLines={1}
          style={[TextStyle.card_m_main, TextStyle.card_pv_main]}
        >
          {game.name}
        </Text>
      </View>
    </Pressable>
  )
}

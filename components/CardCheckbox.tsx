import { Image, Pressable, View, Text } from 'react-native'
import { GameCheckbox } from '../interfaces/gameCheckbox'
import { Ionicons } from '@expo/vector-icons'

import UtilsStyle from '../styles/utils'
import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import { theme_main } from '../styles/colors'
import { getDeveloper } from '../utils/requests'

export default ({ gameCheckbox }: { gameCheckbox: GameCheckbox }) => {
  return (
    <View style={[UtilsStyle.flex_row, ButtonsStyle.card_lv, UtilsStyle.mb_2]}>
      <View style={{ width: 80 }}>
        <Image
          style={[
            UtilsStyle.full_size,
            { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
          ]}
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_big/${
              gameCheckbox.object.cover
                ? gameCheckbox.object.cover.image_id
                : 'nocover'
            }.png`,
          }}
        />
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
            style={[TextStyle.card_f_main, { maxWidth: '75%' }]}
          >
            {gameCheckbox.object.name}
          </Text>
        </View>
        <Text numberOfLines={1} style={[TextStyle.body, TextStyle.card_l_dev]}>
          {getDeveloper(gameCheckbox.object)}
        </Text>
      </View>
      {gameCheckbox.checked ? (
        <View
          style={[
            {
              position: 'absolute',
              top: -10,
              right: -10,
            },
          ]}
        >
          <Ionicons
            name="md-checkmark-circle"
            size={32}
            color={theme_main.x_light}
            style={{
              borderRadius: 32,
              shadowColor: theme_main.xxx_dark,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          />
        </View>
      ) : null}
    </View>
  )
}

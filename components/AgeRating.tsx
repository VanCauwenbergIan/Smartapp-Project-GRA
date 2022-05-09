import { Text, View } from 'react-native'
import Game from '../interfaces/game'

import UtilsStyle from '../styles/utils'
import TextStyle from '../styles/text'
import { getAgeRating } from '../utils/requests'

export default ({ game }: { game?: Game }) => {
  return (
    <View style={[UtilsStyle.flex_row, UtilsStyle.mb_3]}>
      <Text
        style={[
          TextStyle.sub_title,
          UtilsStyle.text_align_v,
          UtilsStyle.mr_1,
        ]}
      >
        Age Rating:
      </Text>
      <View
        style={[
          { backgroundColor: getAgeRating(game)[1], borderRadius: 10 },
          UtilsStyle.p_1,
        ]}
      >
        <Text style={TextStyle.sub_title}>
          {getAgeRating(game)[0]}
        </Text>
      </View>
    </View>
  )
}

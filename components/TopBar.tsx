import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import CoreStyle from '../styles/core'
import UtilsStyle from '../styles/utils'
import { theme_accent, theme_main } from '../styles/colors'

export default ({ id }: { id: number }) => {
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()
  // id will be used to add the game to favorites once implemented

  return (
    <View
      style={[
        CoreStyle.top_bar,
        UtilsStyle.p_2,
        UtilsStyle.flex_row,
        UtilsStyle.space_between,
      ]}
    >
      <Ionicons
        name="chevron-back"
        color={theme_main.xx_light}
        size={32}
        onPress={() => goBack()}
      />
      <Ionicons name="heart-sharp" color={theme_accent.alpha} size={32} />
    </View>
  )
}

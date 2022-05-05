import { Text, TouchableOpacity } from 'react-native'

import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'
import CoreStyle from '../styles/core'

export default ({
  text,
  sorting,
  setSorting,
}: {
  text: string
  sorting: string
  setSorting: Function
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSorting(text)}
      style={[ButtonsStyle.button_sorting, UtilsStyle.jc_center]}
    >
      <Text
        style={[
          TextStyle.body,
          TextStyle.card_l_dev,
          text == sorting ? CoreStyle.color_accent : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

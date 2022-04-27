import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Image } from 'react-native-svg'

import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'

export default ({
  text,
  style = 'standard',
  action,
  Logo,
}: {
  text: string
  style?: string
  action: any
  Logo?: any
}) => {
  if (style == 'alternate') {
    return (
      <TouchableOpacity
        style={[
          ButtonsStyle.button_alternate,
          UtilsStyle.center_content,
          UtilsStyle.mb_3,
        ]}
        onPress={action}
      >
        {Logo ? <Logo /> : null}
        <Text style={[TextStyle.card_l_main, UtilsStyle.ml_1]}>{text}</Text>
      </TouchableOpacity>
    )
  } else if (style == 'square') {
    return (
      <TouchableOpacity
        style={[
          ButtonsStyle.button_square,
          UtilsStyle.center_content,
          UtilsStyle.mb_3,
        ]}
        onPress={action}
      >
        {Logo ? <Logo /> : null}
        <Text style={TextStyle.card_l_main}>{text}</Text>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        style={[
          ButtonsStyle.button_standard,
          UtilsStyle.center_content,
          UtilsStyle.mb_3,
        ]}
        onPress={action}
      >
        {Logo ? <Logo /> : null}
        <Text style={TextStyle.card_l_main}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

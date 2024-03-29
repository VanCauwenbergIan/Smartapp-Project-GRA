import { Pressable, Text } from 'react-native'

import ButtonsStyle from '../styles/buttons'
import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'

export default ({ theme }: { theme: string }) => {
  return (
    <Pressable
      style={[
        ButtonsStyle.theme_tag,
        UtilsStyle.p_1,
        UtilsStyle.mr_1,
        UtilsStyle.mb_1,
      ]}
    >
      <Text style={[TextStyle.card_m_main, TextStyle.theme]}>{theme}</Text>
    </Pressable>
  )
}

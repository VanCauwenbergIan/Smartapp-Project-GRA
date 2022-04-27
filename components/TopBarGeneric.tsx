import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme_main } from '../styles/colors'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default ({
  secAction = false,
  secDestination,
  secProps,
  secText,
  text,
}: {
  secAction?: boolean
  secDestination?: string
  secProps?: any
  secText?: string
  text: string
}) => {
  const { goBack, navigate } =
    useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <View style={{ width: '100%', height: 32 }}>
      <View style={[UtilsStyle.flex_row, UtilsStyle.space_between]}>
        <Ionicons
          name="chevron-back"
          color={theme_main.xx_light}
          size={32}
          onPress={() => goBack()}
        />
        <Text style={TextStyle.title_small}>{text}</Text>
        {secAction && secDestination ? (
          <TouchableOpacity onPress={() => navigate(secDestination, secProps)}>
            <Text style={TextStyle.secAction}>{secText}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>
    </View>
  )
}

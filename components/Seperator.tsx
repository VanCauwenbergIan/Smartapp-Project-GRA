import { Text, View } from 'react-native'
import UtilsStyle from '../styles/utils'

import { theme_main } from '../styles/colors'

export default ({ text }: { text: string }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.75 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: theme_main.light }} />
      <View>
        <Text
          style={[
            { textAlign: 'center', color: theme_main.light },
            UtilsStyle.p_1,
          ]}
        >
          Or
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: theme_main.light }} />
    </View>
  )
}

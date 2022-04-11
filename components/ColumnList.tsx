import { Text, View } from 'react-native'
import Name from '../interfaces/name'

import UtilsStyle from '../styles/utils'
import TextStyle from '../styles/text'

export default ({ list }: { list: Name[] }) => {
  return (
    <View style={[UtilsStyle.wrap_around, UtilsStyle.mb_3]}>
      {list.map((t) => {
        return (
          <Text
            style={[UtilsStyle.w_50, TextStyle.li]}
            key={t.id}
          >
            {t.name}
          </Text>
        )
      })}
    </View>
  )
}

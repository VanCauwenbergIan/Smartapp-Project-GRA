import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'

export default () => {
  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <Text style={TextStyle.title}>Account</Text>
    </SafeAreaView>
  )
}

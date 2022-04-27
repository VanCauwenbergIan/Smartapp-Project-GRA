import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TwitchLogo from '../../assets/logos/TwitchLogo'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import NavigationButton from '../../components/NavigationButton'
import ProgressIndicator from '../../components/ProgressIndicator'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <SafeAreaView style={[UtilsStyle.full_size, UtilsStyle.p_5]}>
      <View style={UtilsStyle.full_size}>
        <TwitchLogo style={UtilsStyle.p_2} />
      </View>
      <View>
        <Text style={TextStyle.title_large}>
          All games available in one place
        </Text>
        <View style={[UtilsStyle.mb_5, UtilsStyle.mt_4]}>
          <ProgressIndicator position={0} />
        </View>
        <NavigationButton text="Sign up" action={() => navigate('Signup')} />
        <NavigationButton
          text="Log in"
          style="alternate"
          action={() => navigate('Login')}
        />
        <Text style={[TextStyle.footer_note, UtilsStyle.mt_4]}>
          {'Powered by IGDB & twitch.tv'}
        </Text>
      </View>
    </SafeAreaView>
  )
}

import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import NavigationButton from '../../components/NavigationButton'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { theme_main } from '../../styles/colors'
import Seperator from '../../components/Seperator'
import GoogleLogo from '../../assets/logos/GoogleLogo'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import TwitchLogo from '../../assets/logos/TwitchLogoT'
import FaceBookLogo from '../../assets/logos/FaceBookLogo'

export default () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <SafeAreaView>
      <View style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Log in" />
        <View style={[UtilsStyle.full_size, UtilsStyle.mt_5, UtilsStyle.p_2]}>
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Email</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Password</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_2]}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity>
            <Text
              style={[
                TextStyle.sub_title,
                CoreStyle.color_accent,
                UtilsStyle.mb_3,
                UtilsStyle.p_1,
                UtilsStyle.underline,
              ]}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <NavigationButton
            text="Log in"
            action={() => navigate('Tab')}
            style="square"
          />
          <Seperator text="or" />
          <View style={UtilsStyle.mt_2}>
            <NavigationButton
              text="Google"
              action={() => navigate('Tab')}
              style="alternate"
              Logo={GoogleLogo}
            />
            <NavigationButton
              text="Twitch"
              action={() => navigate('Tab')}
              style="alternate"
              Logo={TwitchLogo}
            />
            <NavigationButton
              text="Facebook"
              action={() => navigate('Tab')}
              style="alternate"
              Logo={FaceBookLogo}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

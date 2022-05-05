import { useEffect, useState } from 'react'
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
import TwitchLogo from '../../assets/logos/TwitchLogoT'
import FaceBookLogo from '../../assets/logos/FaceBookLogo'
import { useAuth } from '../../utils/authContext'
import { auth } from '../../utils/firebase'
import {
  signInWithEmailAndPassword,
  UserCredential,
  getRedirectResult,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  AuthCredential,
} from 'firebase/auth'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'

WebBrowser.maybeCompleteAuthSession()

export default () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { setUser } = useAuth()
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '146801417023-dalr1tasar5gmhpl028bofiv4pad4o9g.apps.googleusercontent.com',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params

      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential).then((u: UserCredential) => {
        setUser(u)
        navigate('Tab')
      })
    }
  }, [response])

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  const login = () => {
    if (email && password) {
      signInWithEmailAndPassword(
        auth,
        email.replace(' ', ''),
        password.replace(' ', ''),
      )
        .then((u: UserCredential) => {
          setUser(u)
          navigate('Tab')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <SafeAreaView>
      <View style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Log in" />
        <View style={[UtilsStyle.full_size, UtilsStyle.mt_5, UtilsStyle.p_2]}>
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Email</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setEmail}
            keyboardType="email-address"
            value={email}
          />
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Password</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_2]}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
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
          <NavigationButton text="Log in" action={login} style="square" />
          <Seperator text="or" />
          <View style={UtilsStyle.mt_2}>
            <NavigationButton
              text="Google"
              action={() => {
                promptAsync()
              }}
              style="alternate"
              Logo={GoogleLogo}
            />
            <NavigationButton
              text="Twitch"
              action={login}
              style="alternate"
              Logo={TwitchLogo}
            />
            <NavigationButton
              text="Facebook"
              action={login}
              style="alternate"
              Logo={FaceBookLogo}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
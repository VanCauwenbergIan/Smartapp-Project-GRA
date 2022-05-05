import { useState } from 'react'
import { Button, KeyboardAvoidingView, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import NavigationButton from '../../components/NavigationButton'
import ProgressIndicator from '../../components/ProgressIndicator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuth } from '../../utils/authContext'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from 'firebase/auth'
import { app, auth } from '../../utils/firebase'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'

export default () => {
  const [displayName, setDisplayName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [passwordVerification, setPasswordverification] = useState<string>()
  const { setUser } = useAuth()

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  const signUp = (): void => {
    if (
      email &&
      password &&
      passwordVerification &&
      displayName &&
      password == passwordVerification
    ) {
      createUserWithEmailAndPassword(
        auth,
        email.replace(' ', ''),
        password.replace(' ', ''),
      )
        .then((user: UserCredential) => {
          setUser(user.user)
          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: displayName,
            }).then(() => {
              navigate('Tab')
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Sign up" />
        <View style={[UtilsStyle.full_size, UtilsStyle.mt_5, UtilsStyle.p_2]}>
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Username</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setDisplayName}
            value={displayName}
          />
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Email</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>Password</Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <Text style={[UtilsStyle.mb_1, TextStyle.sub_title]}>
            Confirm Password
          </Text>
          <TextInput
            style={[CoreStyle.inputfield, UtilsStyle.mb_3]}
            onChangeText={setPasswordverification}
            value={passwordVerification}
            secureTextEntry
          />
          <View style={[UtilsStyle.mb_3, UtilsStyle.mt_4, UtilsStyle.p_1]}>
            <ProgressIndicator position={1} />
          </View>
          <NavigationButton
            text="Create account"
            action={signUp}
            style="square"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

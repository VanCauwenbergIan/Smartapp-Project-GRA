import { useEffect, useState } from 'react'
import { BackHandler, Text, View } from 'react-native'
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
import { AuthErrors } from '../../interfaces/authError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_errors } from '../../styles/colors'

WebBrowser.maybeCompleteAuthSession()

export default () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [errors, setErrors] = useState<AuthErrors>({
    generic: {
      title: '',
      message: '',
    },
    fields: {
      email: {
        hasError: false,
        inlineErrorMessage: '',
      },
      password: {
        hasError: false,
        inlineErrorMessage: '',
      },
    },
  })
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '146801417023-dalr1tasar5gmhpl028bofiv4pad4o9g.apps.googleusercontent.com',
  })

  const { setUser } = useAuth()

  const discardErrorMessage = () => {
    setErrors((currentErrors: AuthErrors) => {
      currentErrors.generic = { title: '', message: '' }

      return { ...currentErrors }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params

      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential).then((u: UserCredential) => {
        setUser(u)
        pop()
        replace('Tab')
      })
    }
  }, [response])

  useEffect(() => {
    if (email) {
      setErrors((currentErrors: AuthErrors) => {
        currentErrors.fields.email.hasError = false
        currentErrors.fields.email.inlineErrorMessage = ''

        return { ...currentErrors }
      })
    }
  }, [email])

  useEffect(() => {
    if (password) {
      setErrors((currentErrors: AuthErrors) => {
        currentErrors.fields.password.hasError = false
        currentErrors.fields.password.inlineErrorMessage = ''

        return { ...currentErrors }
      })
    }
  }, [password])

  const { replace, pop } = useNavigation<StackNavigationProp<ParamListBase>>()

  const login = () => {
    if (
      email &&
      password &&
      !errors.fields.email.hasError &&
      !errors.fields.password.hasError
    ) {
      signInWithEmailAndPassword(
        auth,
        email.replace(' ', ''),
        password.replace(' ', ''),
      )
        .then((u: UserCredential) => {
          setUser(u)
          replace('Tab')
        })
        .catch((err) => {
          setErrors((currentErrors: AuthErrors) => {
            currentErrors.generic = {
              title: err.code,
              message: err.message,
            }

            return { ...currentErrors }
          })
        })
    } else {
      if (email == null || email == '') {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.email.hasError = true
          currentErrors.fields.email.inlineErrorMessage =
            'No email address was filled in.'

          return { ...currentErrors }
        })
        if (password == null || password == '') {
          setErrors((currentErrors: AuthErrors) => {
            currentErrors.fields.password.hasError = true
            currentErrors.fields.password.inlineErrorMessage =
              'Password was not filled in.'

            return { ...currentErrors }
          })
        }
      }
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Log in" />
        {errors.generic.title ? (
          <View
            style={[
              UtilsStyle.p_1,
              UtilsStyle.ml_2,
              UtilsStyle.mt_2,
              UtilsStyle.mr_2,
              {
                backgroundColor: theme_errors.error_light,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: theme_errors.error_dark,
              },
            ]}
          >
            <Text
              style={[
                TextStyle.body,
                TextStyle.card_pv_main,
                { color: theme_errors.error_dark },
              ]}
            >
              {errors.generic.title}
            </Text>
            <Text style={[TextStyle.body, { color: theme_errors.error_dark }]}>
              {errors.generic.message}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            UtilsStyle.full_size,
            UtilsStyle.p_2,
            errors.generic.title ? {} : UtilsStyle.mt_5,
          ]}
        >
          <Text
            style={[
              UtilsStyle.mb_1,
              TextStyle.sub_title,
              errors.fields.email.hasError ? { color: theme_errors.error } : {},
            ]}
          >
            Email
          </Text>
          <TextInput
            style={[
              CoreStyle.inputfield,
              errors.fields.email.hasError
                ? {
                    borderWidth: 2,
                    borderColor: theme_errors.error_dark,
                    marginBottom: 4,
                  }
                : UtilsStyle.mb_3,
            ]}
            onChangeText={setEmail}
            keyboardType="email-address"
            value={email}
          />
          {errors.fields.email.hasError && (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_1,
                { color: theme_errors.error_dark },
              ]}
            >
              {errors.fields.email.inlineErrorMessage}
            </Text>
          )}
          <Text
            style={[
              UtilsStyle.mb_1,
              TextStyle.sub_title,
              errors.fields.password.hasError
                ? { color: theme_errors.error }
                : {},
            ]}
          >
            Password
          </Text>
          <TextInput
            style={[
              CoreStyle.inputfield,
              errors.fields.password.hasError
                ? {
                    borderWidth: 2,
                    borderColor: theme_errors.error_dark,
                    marginBottom: 4,
                  }
                : UtilsStyle.mb_2,
            ]}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {errors.fields.password.hasError && (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_1,
                { color: theme_errors.error_dark },
              ]}
            >
              {errors.fields.password.inlineErrorMessage}
            </Text>
          )}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

import { useEffect, useState } from 'react'
import {
  BackHandler,
  Button,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native'
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
import { AuthErrors } from '../../interfaces/authError'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_errors } from '../../styles/colors'

export default () => {
  const [displayName, setDisplayName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [passwordVerification, setPasswordverification] = useState<string>()
  const [errors, setErrors] = useState<AuthErrors>({
    generic: {
      title: '',
      message: '',
    },
    fields: {
      displayname: {
        hasError: false,
        inlineErrorMessage: '',
      },
      email: {
        hasError: false,
        inlineErrorMessage: '',
      },
      password: {
        hasError: false,
        inlineErrorMessage: '',
      },
      confirmpassword: {
        hasError: false,
        inlineErrorMessage: '',
      },
    },
  })

  const discardErrorMessage = () => {
    setErrors((currentErrors: AuthErrors) => {
      currentErrors.generic = { title: '', message: '' }

      return { ...currentErrors }
    })
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (displayName && displayName.length < 2) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.displayname.hasError = true
          currentErrors.fields.displayname.inlineErrorMessage =
            'Not a valid username.'

          return { ...currentErrors }
        })
      } else if (displayName) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.displayname.hasError = false
          currentErrors.fields.displayname.inlineErrorMessage = ''

          return { ...currentErrors }
        })
      }
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [displayName])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (
        email &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/.test(email)
      ) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.email.hasError = true
          currentErrors.fields.email.inlineErrorMessage =
            'Not a valid emailaddress.'

          return { ...currentErrors }
        })
      } else if (email) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.email.hasError = false
          currentErrors.fields.email.inlineErrorMessage = ''

          return { ...currentErrors }
        })
      }
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [email])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (password && password.length < 6) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.password.hasError = true
          currentErrors.fields.password.inlineErrorMessage =
            'Password must have at least 6 characters.'

          return { ...currentErrors }
        })
      } else if (password) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.password.hasError = false
          currentErrors.fields.password.inlineErrorMessage = ''

          return { ...currentErrors }
        })
      }
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [password])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (passwordVerification && passwordVerification != password) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.confirmpassword.hasError = true
          currentErrors.fields.confirmpassword.inlineErrorMessage =
            "The two password fields don't match."

          return { ...currentErrors }
        })
      } else if (passwordVerification) {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.confirmpassword.hasError = false
          currentErrors.fields.confirmpassword.inlineErrorMessage = ''

          return { ...currentErrors }
        })
      }
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [passwordVerification])

  const { setUser } = useAuth()
  const { replace, pop } = useNavigation<StackNavigationProp<ParamListBase>>()

  const signUp = (): void => {
    if (
      email &&
      password &&
      passwordVerification &&
      displayName &&
      password == passwordVerification &&
      !errors.fields['displayname'].hasError &&
      !errors.fields['email'].hasError &&
      !errors.fields['password'].hasError &&
      !errors.fields['confirmpassword'].hasError
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
              pop()
              replace('Tab')
            })
          }
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
      if (displayName == null || displayName == '') {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.displayname.hasError = true
          currentErrors.fields.displayname.inlineErrorMessage =
            'No username was filled in.'

          return { ...currentErrors }
        })
      }
      if (email == null || email == '') {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.email.hasError = true
          currentErrors.fields.email.inlineErrorMessage =
            'No email address was filled in.'

          return { ...currentErrors }
        })
      }
      if (password == null || password == '') {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.password.hasError = true
          currentErrors.fields.password.inlineErrorMessage =
            'Password was not filled in.'

          return { ...currentErrors }
        })
      }
      if (passwordVerification == null || passwordVerification == '') {
        setErrors((currentErrors: AuthErrors) => {
          currentErrors.fields.confirmpassword.hasError = true
          currentErrors.fields.confirmpassword.inlineErrorMessage =
            'Please confirm your password.'

          return { ...currentErrors }
        })
      }
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Sign up" />
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
              errors.fields.displayname.hasError
                ? { color: theme_errors.error }
                : {},
            ]}
          >
            Username
          </Text>
          <TextInput
            style={[
              CoreStyle.inputfield,
              UtilsStyle.mb_3,
              errors.fields.displayname.hasError
                ? {
                    borderWidth: 2,
                    borderColor: theme_errors.error_dark,
                    marginBottom: 4,
                  }
                : UtilsStyle.mb_3,
            ]}
            onChangeText={setDisplayName}
            value={displayName}
          />
          {errors.fields.displayname.hasError && (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_1,
                { color: theme_errors.error_dark },
              ]}
            >
              {errors.fields.displayname.inlineErrorMessage}
            </Text>
          )}
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
            value={email}
            keyboardType="email-address"
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
                : UtilsStyle.mb_3,
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
          <Text
            style={[
              UtilsStyle.mb_1,
              TextStyle.sub_title,
              errors.fields.confirmpassword.hasError
                ? { color: theme_errors.error }
                : {},
            ]}
          >
            Confirm Password
          </Text>
          <TextInput
            style={[
              CoreStyle.inputfield,
              errors.fields.confirmpassword.hasError
                ? {
                    borderWidth: 2,
                    borderColor: theme_errors.error_dark,
                    marginBottom: 4,
                  }
                : UtilsStyle.mb_3,
            ]}
            onChangeText={setPasswordverification}
            value={passwordVerification}
            secureTextEntry
          />
          {errors.fields.confirmpassword.hasError && (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_1,
                { color: theme_errors.error_dark },
              ]}
            >
              {errors.fields.confirmpassword.inlineErrorMessage}
            </Text>
          )}
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

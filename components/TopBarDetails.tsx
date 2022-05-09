import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import CoreStyle from '../styles/core'
import UtilsStyle from '../styles/utils'
import { theme_accent, theme_main } from '../styles/colors'
import { useFavorites } from '../utils/favoritesContext'
import { useEffect, useState } from 'react'
import Game from '../interfaces/game'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { database } from '../utils/database'
import { auth } from '../utils/firebase'

export default ({ game }: { game: Game }) => {
  const [favorite, setFavorite] = useState<boolean>()
  const [pressed, setPressed] = useState<boolean>(false)

  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { setFavorites, favorites } = useFavorites()

  useEffect(() => {
    if (checkIfFavorite(game)) {
      setFavorite(true)
    } else {
      setFavorite(false)
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser) {
      if (favorite && pressed && !checkIfFavorite(game)) {
        var array = favorites
        array.push(game)
        setFavorites(array)

        database(auth.currentUser.uid).setFavorites(array)
      } else if (!favorite && pressed && checkIfFavorite(game)) {
        var array = favorites
        let index = array.findIndex((item) => item.id == game.id)
        array.splice(index, 1)
        setFavorites(array)

        database(auth.currentUser.uid).setFavorites(array)
      }
      setPressed(false)
    }
  }, [pressed])

  const toggleFavorite = () => {
    setFavorite(!favorite)
    setPressed(true)
  }

  const checkIfFavorite = (game: Game) => {
    if (favorites.some((item) => item.id == game.id)) {
      return true
    } else {
      return false
    }
  }

  return (
    <View
      style={[
        CoreStyle.top_bar,
        UtilsStyle.p_2,
        UtilsStyle.flex_row,
        UtilsStyle.space_between,
      ]}
    >
      <TouchableOpacity onPress={() => goBack()}>
        <Ionicons name="chevron-back" color={theme_main.xx_light} size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFavorite()}>
        <Ionicons
          name={favorite ? 'heart-sharp' : 'heart-outline'}
          color={favorite ? theme_accent.alpha : theme_main.light}
          size={32}
        />
      </TouchableOpacity>
    </View>
  )
}

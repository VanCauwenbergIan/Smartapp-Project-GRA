import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import { MaterialIcons } from '@expo/vector-icons'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_accent, theme_errors, theme_main } from '../../styles/colors'
import { useEffect, useState } from 'react'
import ProgressIndicator from '../../components/ProgressIndicator'
import { getPlatforms } from '../../utils/requests'
import NavigationButton from '../../components/NavigationButton'
import { Checkbox as CheckboxType } from '../../interfaces/checkbox'
import { FlatList } from 'react-native-gesture-handler'
import Checkbox from 'expo-checkbox'
import { usePlatforms } from '../../utils/platformFilterContext'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

// indien nog tijd => component maken (lijst van checkboxes komt nog vaker terug)

export default () => {
  const [input, setInput] = useState<string>()
  const [rerender, setRerender] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [pressed, setPressed] = useState<boolean>()
  const [originalPlatforms, setOriginalPlatforms] = useState<CheckboxType[]>([])
  const [filteredPlatforms, setFilteredPlatforms] = useState<CheckboxType[]>([])
  const [checkedPlatforms, setCheckedPlatforms] = useState<CheckboxType[]>([])

  const { platforms, setPlatforms } = usePlatforms()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  useEffect(() => {
    getPlatforms().then((r) => {
      var array: CheckboxType[] = []
      array = r.data
      array.forEach((c) => {
        c.checked = false
      })
      setFilteredPlatforms(array)
      setOriginalPlatforms(array)
    })
  }, [])

  useEffect(() => {
    if (filteredPlatforms.length >= 1) {
      // restore context if user has selected platforms before
      if (platforms && platforms.length >= 1 && !pressed) {
        setPressed(true)
        var pa = [...platforms]
        var op = [...originalPlatforms]
        var fp = [...filteredPlatforms]
        setCheckedPlatforms(pa.sort((a, b) => a.name.localeCompare(b.name)))

        pa.forEach((platform) => {
          var index = fp.findIndex((p) => p.id == platform.id)
          fp.splice(index, 1)
          index = op.findIndex((p) => p.id == platform.id)
          op[index].checked = true
        })
        setFilteredPlatforms(fp.sort((a, b) => a.name.localeCompare(b.name)))
        setOriginalPlatforms(op.sort((a, b) => a.name.localeCompare(b.name)))
        checkSelection()
        refresh()
      }
    }
  }, [originalPlatforms])

  useEffect(() => {
    checkSelection()
    if (error === '' && checkedPlatforms.length >= 1) {
      setPlatforms(checkedPlatforms)
      navigate('FilteringGenres')
    }
  }, [pressed])

  useEffect(() => {
    if (checkedPlatforms.length >= 1) {
      setPlatforms(checkedPlatforms)
    }
  }, [checkedPlatforms])

  useEffect(() => {
    if (input) {
      var pa: CheckboxType[] = []
      originalPlatforms.forEach((platform) => {
        if (
          !checkedPlatforms.some((p) => p.id == platform.id) &&
          platform.name.toLowerCase().includes(input.toLowerCase())
        ) {
          pa.push(platform)
        }
      })
      setFilteredPlatforms(pa)
    } else {
      var pa: CheckboxType[] = []
      originalPlatforms.forEach((platform) => {
        if (!checkedPlatforms.some((p) => p.id == platform.id)) {
          pa.push(platform)
        }
      })
      setFilteredPlatforms(pa)
    }
  }, [input])

  const handleCheckbox = (id: number) => {
    if (originalPlatforms) {
      var pa = [...originalPlatforms]
      var index = originalPlatforms.findIndex((p) => p.id == id)
      var platform = pa[index]
      platform.checked = !platform.checked
      if (platform.checked) {
        setCheckedPlatforms((checkedPlatforms) =>
          [...checkedPlatforms, platform].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        )

        var array = [...filteredPlatforms]
        var index = array.findIndex((p) => p.id == id)
        array.splice(index, 1)
        setFilteredPlatforms(array)
      } else {
        var array = [...checkedPlatforms]
        var index = array.findIndex((p) => p.id == id)
        array.splice(index, 1)
        setCheckedPlatforms(array)

        setFilteredPlatforms((filteredPlatforms) =>
          [...filteredPlatforms, platform].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        )
      }
      setPressed(true)
      checkSelection()
      refresh()
    }
  }

  const refresh = () => {
    setRerender(!rerender)
  }

  const checkSelection = () => {
    if (originalPlatforms) {
      var choices = originalPlatforms.filter((p) => p.checked == true)

      if (choices.length < 1 && pressed) {
        setError('Select one or more platforms.')
      } else if (pressed) {
        setError('')
      }
    }
  }

  const handlePress = () => {
    setPressed(true)

    if (error === '' && checkedPlatforms.length >= 1) {
      setPlatforms(checkedPlatforms)
      navigate('FilteringGenres')
    }
  }

  const renderCheckbox = ({ item }: { item: CheckboxType }) => {
    return (
      <View
        style={[UtilsStyle.flex_row, UtilsStyle.ai_center, UtilsStyle.mb_3]}
        key={item.id}
      >
        <Checkbox
          style={[UtilsStyle.mr_1, { height: 24, width: 24 }]}
          value={item.checked}
          onValueChange={() => handleCheckbox(item.id)}
          color={item.checked ? theme_accent.alpha : undefined}
        />
        <Text
          onPress={() => handleCheckbox(item.id)}
          numberOfLines={2}
          style={[TextStyle.body, { width: 144 }]}
        >
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Advanced Search" />
        <View style={(UtilsStyle.full_size, UtilsStyle.p_1)}>
          <View style={[{ height: 136 }]}>
            <View style={[UtilsStyle.mb_2, UtilsStyle.mt_2]}>
              <ProgressIndicator position={0} />
            </View>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_2]}>
              Choose your platform(s)
            </Text>
            <View
              style={[
                UtilsStyle.flex_row,
                CoreStyle.searchbar,
                UtilsStyle.mb_3,
                UtilsStyle.center_content_v,
              ]}
            >
              <MaterialIcons
                style={UtilsStyle.mr_2}
                name="search"
                color={theme_main.light}
                size={24}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={theme_main.light}
                style={[TextStyle.body, { width: 276 }]}
                value={input}
                onChangeText={setInput}
              />
              {input ? (
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss()
                    setInput('')
                  }}
                >
                  <MaterialIcons
                    style={UtilsStyle.ml_1}
                    name="close"
                    color={theme_main.light}
                    size={24}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <FlatList
            data={filteredPlatforms}
            ListHeaderComponent={
              <FlatList
                data={checkedPlatforms}
                renderItem={renderCheckbox}
                extraData={rerender}
                numColumns={2}
              />
            }
            renderItem={renderCheckbox}
            extraData={rerender}
            numColumns={2}
            style={[{ height: 424 }, error ? UtilsStyle.mb_1 : UtilsStyle.mb_4]}
          />
          {error ? (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_2,
                { color: theme_errors.error_dark },
              ]}
            >
              {error}
            </Text>
          ) : null}
          <NavigationButton
            text="Continue"
            style="square"
            action={() => handlePress()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

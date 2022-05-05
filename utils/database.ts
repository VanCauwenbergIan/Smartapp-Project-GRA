import Game from '../interfaces/game'
import { app } from './firebase'
import { getDatabase, ref, set, get, update } from 'firebase/database'
import { FirebaseDatabaseTypes } from '@react-native-firebase/database'

export const database = function (userId: string) {
  const db = getDatabase(
    app,
    'https://gra-app-6605b-default-rtdb.europe-west1.firebasedatabase.app/',
  )
  const favorites = ref(db, `${userId}/favorites`)
  const history = ref(db, `${userId}/history`)

  const snapshotToArray = function (snapshot: any): any[] {
    var array: any[] = []

    snapshot.forEach((child: any) => {
      var item = child.val()
      item.key = child.key

      array.push(item)
    })

    return array
  }

  const getFavorites = async function () {
    var result = await get(favorites)
    return snapshotToArray(result)
  }

  const getHistory = async function () {
    var result = await get(history)
    return snapshotToArray(result)
  }

  const setFavorites = async function (objects: Game[]) {
    await set(favorites, objects)
  }

  const setHistory = async function (objects: Game[]) {
    await set(history, objects)
  }

  return {
    getFavorites: getFavorites,
    setFavorites: setFavorites,
    getHistory: getHistory,
    setHistory: setHistory,
  }
}

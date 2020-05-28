import { openDb } from 'idb'

const DB_NAME = 'BasIndexDB'
const DB_ASSETS_NAME = "BasAssetsDB"
const DB_VER = 1
export const LATEST_ROOT_DOMAINS = 'latest_root_domains'
export const LATEST_SUB_DOMAINS = 'latest_sub_domains'

const dbPromise = _ => {
  if(!('indexedDB' in window)){
    throw new Error('Browser does not support IndexedDB.')
  }

  return openDb(DB_ASSETS_NAME, DB_VER, upgradeDb =>{
    if (!upgradeDb.objectStoreNames.contains(LATEST_ROOT_DOMAINS)){
      upgradeDb.createObjectStore(LATEST_ROOT_DOMAINS)
    }
  })
}

/**
 *
 * @param {*} key
 * @param {*} data
 */
export async function setData(key, data) {
  console.log('setData:',key,data)
  return (await dbPromise()).put(key,data)
}

export const checkStorage = async storeName => {
  return dbPromise()
    .then( db => {
      const tx = db.transaction(storeName,'readonly')
      const store = tx.objectStore(storeName)
      return store.get(storeName)
    })
    .catch(error =>{
      throw error
    })
}

export const saveToStorage = async (storeName,data) => {
  return dbPromise()
    .then(db => {
      const tx = db.transaction(storeName,'readwrite')
      const store = tx.objectStore(storeName)
      store.put(data,storeName)

      return tx.complete
    }).catch(error => {
      return error
    })
}

export default {
  LATEST_ROOT_DOMAINS,
  LATEST_SUB_DOMAINS,
  checkStorage,
  saveToStorage,
}

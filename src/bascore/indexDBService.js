import { openDb } from 'idb'

const DB_NAME = 'BasIndexDB'
const DB_VER = 1
export const LATEST_ROOT_DOMAINS = 'latest_root_domains'
export const LATEST_SUB_DOMAINS = 'latest_sub_domains'

const dbPromise = _ => {
  if(!('indexedDB' in window)){
    throw new Error('Browser does not support IndexedDB.')
  }

  return openDb(DB_NAME, DB_VER, upgradeDb =>{
    if (!upgradeDb.objectStoreNames.contains(LATEST_ROOT_DOMAINS)){
      upgradeDb.createObjectStore(LATEST_ROOT_DOMAINS)
    }

    if (!upgradeDb.objectStoreNames.contains(LATEST_SUB_DOMAINS)) {
      upgradeDb.createObjectStore(LATEST_SUB_DOMAINS)
    }
  })
}

const checkStorage = async storeName => {
  return dbPromise()
    .then( db => {
      const tx = db.transaction(storeName,'readonly')
      const store = tx.objectStore(storeName)

      return store.get(storeName)
    })
    .catch(error =>{
      return error
    })
}

const saveToStorage = async (storeName,jsonData) => {
  return dbPromise()
    .then(db => {

    }).catch(error => {
      return error
    })
}

export default {
  checkStorage,
  saveToStorage,
}

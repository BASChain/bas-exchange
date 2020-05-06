import * as types from './obs-enums'

window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

const DB_HOLDER = {
  dbr:null,
  dbm:null
}

const CONF_PROPS = {
  version:1,
  1:'dbm',
  3:'dbr'
}

export default {

  async getDB(chainId){
    //if(!chainId)chainId = 3
    return new Promise((resolve,reject) =>{
      const dbname = CONF_PROPS[chainId];

      if (dbname) reject(`Unspport ChainId:${chainId}`);

      if (DB_HOLDER[dbname]) return DB_HOLDER[dbname];

      let request = window.indexedDB.open(dbname,CONF_PROPS.version);

      request.onerror = e => {
        console.log('Error opening db',e)
        reject('Open Error')
      }

      request.onsuccess = e => {
        DB_HOLDER[dbname] = e.target.result;
        resolve(DB_HOLDER[dbname])
      }

      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        DB_HOLDER[dbname] = e.target.result;
        //Create root sub

      }

    })
  }
}

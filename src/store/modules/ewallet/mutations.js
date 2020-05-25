import * as types from './mutation-types'

function validAssetKey(asset){
  const keys = ['domaintext','name','hash','owner','isRoot','expire']
  if(typeof asset !== 'object')return false
  let assetKeys = Object.keys(asset)
  for(let i =0;i<keys.length;i++){
    if (!assetKeys.includes(keys[i]))return false
  }
  return true
}

/**
 *
 * @param {*} mail
 */
function validMailKey(mail){
  const keys = ['domainhash', 'expiration','aliasName','owner','hash','domaintext']
  if(typeof mail !== 'object')return false

  for(let i =0 ;i<keys.length;i++){
    if (!mail.hasOwnProperty(keys[i]))return false;
  }

  return true
}

export default {
  [types.SET_LOAD_ASSETS_STATE](state,number){
    // -1 (total-1)
    state.loadAssetState = number
  },
  [types.LOAD_EWALLET_HASHES](state,hashes){
    state.hashes = hashes
  },
  [types.SET_EWALLET_TOTAL](state,total){
    state.total = total
  },
  [types.LOAD_EWALLET_ASSETS](state,assets){
    state.assets = assets
  },
  [types.ADD_OR_UPDATE_ASSET](state,asset){
    if(validAssetKey(asset)){
      const hash = asset.hash.toLowerCase()
      const originAsset = state.assets.find(a => a.hash.toLowerCase() === hash)
      if (!originAsset){
        state.assets.push(asset)
      }else{
        const index = state.assets.findIndex(a => a.hash.toLowerCase() === hash)
        state.assets.splice(index, 1, Object.assign({}, originAsset, asset))
      }
    }
  },
  [types.UPDATE_ASSET_PROPS](state,asset){
    if(asset && asset.hash){
      const hash = asset.hash.toLowerCase()
      const originAsset = state.assets.find(a => a.hash.toLowerCase()===hash)

      if (originAsset){
        const index = state.assets.findIndex(a => a.hash.toLowerCase()===hash)
        console.log("originAsset:", originAsset)
        state.assets.splice(index, 1, Object.assign({}, originAsset,asset))
        console.log("new:", state.assets[index])
      }
    }
  },
  [types.LOAD_EWALLET_MAILS](state,mails) {
    state.mails = mails||[]
  },
  [types.UPDATE_EWMAIL_PROPS](state,mail){
    const hash = mail.hash
    if(hash){
      const origin = state.mails.find(m => m.hash.toLowerCase() === hash.toLowerCase())
      if(origin){
        const idx = state.mails.findIndex(m => m.hash.toLowerCase() === hash.toLowerCase())
        state.mails.splice(idx,1,Object.assign({},origin,mail))
      }
    }
  },
  [types.ADD_OR_UPDATE_MAIL](state,mail){
    if(mail && validMailKey(mail)){
      const hash = mail.hash
      if(hash){
        const origin = state.mails.find( m => m.hash.toLowerCase() === mail.hash.toLowerCase())
        if(origin){
          const idx = state.mails.findIndex(m => m.hash.toLowerCase() === hash.toLowerCase())
          state.mails.splice(idx,1,Object.assign({},origin,mail))
        }else{
          state.mails.push[mail]
        }
      }
    }
  },
  [types.REMOVE_ASSET_BY_HASH](state,hash){
    if(state.assets&&state.assets.length && hash){
      const idx = state.assets.findIndex(a => a.hash.toLowerCase() === hash.toLowerCase() )
      if(idx>=0){
        state.assets.splice(idx,1)
      }
    }
  }
}

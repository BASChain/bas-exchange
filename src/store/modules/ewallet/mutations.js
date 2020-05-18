import * as types from './mutation-types'

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
    const hash = asset.hash
    let assets = state.assets
    const existIdx = assets.findIndex( it => it.hash === hash)
    
  }
}

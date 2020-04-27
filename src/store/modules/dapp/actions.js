import * as types from './mutation-types'

const DEF_DATA_TYPE_DICTS = [
  {}
]
/**
 * load DAppConfiguration from Server api
 * @param {*} param0
 * @param {*} param1
 */
export async function loadDAppConfiguration({commit,state},{chainId=3}){
  //Because metamask not login or uninstall show domain state data transfrom maybe need.
  //like domain price trans wei to bas ed.
  //TODO call server api should get all dappState


}

/**
 * load Domain data type dictions from contract
 *
 * @param {*} param0
 * @param {*} param1
 */
export async function loadDataTypeDiction({commit,state},{chainId=3}){
  //TODO
}

export default {
  loadDAppConfiguration,
};

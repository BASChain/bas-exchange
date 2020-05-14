/**
 * Biz Error Codes 6 length
 * Web3 Error Codes 4 length
 * RPC Error Codes 5 length -32601
 */
/* ================= Biz API Errors =================== */
export const NO_UPDATE_PERMISSIONS = 110110;
// 2xxxxx Domains
export const ROOT_REGIST_CLOSE = 200001;

export const DOMAIN_HAS_TAKEN = 200002;

export const DOMAIN_FORMAT_ILLEGAL = 200003;

export const DOMAIN_TOP_EXPIRED = 200005;
// 3xxxxx Markets


// 9xxxxx
// input Parameters illegal
export const PARAM_ILLEGAL = 999999

/* ================= WEB3  OR RPC =================== */
//1xxx
export const NO_METAMASK = 1000;

export const LACK_OF_ETH = 1001;

export const LACK_OF_TOKEN = 1002;



//3xxx
export const UNSUPPORT_NETWORK = 3001;

//4xxx ref MetaMask
export const USER_REJECTED_REQUEST = 4001

export const NO_ACCOUNT = 4999

//9xxx
export const UNKNOWN = 9999

// RPC
export const RPC_SERVER_ERROR = -32000;
export const METHOD_NOT_FOUND = -32601;
export const INVALID_PARAMS = -32602;
export const RPC_TIMEOUT = -32603;

export default {
  NO_UPDATE_PERMISSIONS,
  ROOT_REGIST_CLOSE,
  DOMAIN_HAS_TAKEN,
  DOMAIN_FORMAT_ILLEGAL,
  DOMAIN_TOP_EXPIRED,


  PARAM_ILLEGAL,
  // ****** web3 or rpc */
  NO_METAMASK,
  LACK_OF_ETH,
  LACK_OF_TOKEN,

  //3xxx
  UNSUPPORT_NETWORK,
  //4xxx
  USER_REJECTED_REQUEST,
  NO_ACCOUNT,
  UNKNOWN,

  //RPC
  RPC_SERVER_ERROR,
  METHOD_NOT_FOUND,
  INVALID_PARAMS,
  RPC_TIMEOUT
};

/**
 * Biz Error Codes 6 length
 * Web3 Error Codes 4 length
 * RPC Error Codes 5 length -32601
 */
/* ================= Biz API Errors =================== */
// 2xxxxx Domains
export const ROOT_REGIST_CLOSE = 200001;

export const DOMAIN_HAS_TAKEN = 200002;

// 3xxxxx Markets

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

//
export const RPC_TIMEOUT = -32601;

export default {
  ROOT_REGIST_CLOSE,
  DOMAIN_HAS_TAKEN,


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
  RPC_TIMEOUT
};

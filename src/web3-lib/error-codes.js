/**
 * Only define Web3 Level error codes,
 * Business logic error don't define it here,see bizlib/biz-codes
 * 4 length Code
 */
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

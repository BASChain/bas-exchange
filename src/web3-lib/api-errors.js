/**
 * Biz Error Codes 6 length
 * Web3 Error Codes 4 length
 * RPC Error Codes 5 length -32601
 */
/* ================= Biz API Errors =================== */
export const NO_UPDATE_PERMISSIONS = 110110;
export const ACCOUNT_NOT_MATCHED = 119119;

// 2xxxxx Domains
export const ROOT_REGIST_CLOSE = 200001;

export const DOMAIN_HAS_TAKEN = 200002;

export const DOMAIN_FORMAT_ILLEGAL = 200003;

export const DOMAIN_NOT_EXIST = 200004;

export const DOMAIN_TOP_EXPIRED = 200005;
export const DOMAIN_EXPIRED = 200006;


// 3xxxxx Markets

// 4xxxxxx Mail
export const MAILSERVICE_INACTIVED = 4000000;
export const MAILSERVICE_HAS_ACTIVED = 400001;
export const MAILSERVICE_ONLY_RARE_OPEN = 400002;
export const MAIL_REGIST_NOT_OPEN = 400003;
export const MAIL_NAME_ILLEGAL=400004;
export const MAIL_REGIST_BY_OWNER = 400005;

//
export const MAIL_HASH_EXIST = 410000;
export const MAIL_YEAR_OVER_MAX = 410001;
/** valid false ababdoned */
export const MAIL_HASH_INVALID = 410002;
/** 被占用 */
export const MAIL_ALIAS_HAS_TAKEN = 410003;
export const MAIL_HASH_EXPIRED = 410004;


// 7xxxxx common
export const RECHARGE_YEAR_RANGE = 700001
export const TOKEN_HAS_GET = 700002


// 9xxxxx
// input Parameters illegal
/**
 * 999999 Error shuld controll in coding
 * don't show front user
 */
export const PARAM_ILLEGAL = 999999

/* ================= WEB3  OR RPC =================== */
//1xxx
export const NO_METAMASK = 1000;

export const LACK_OF_ETH = 1001;

export const LACK_OF_TOKEN = 1002;

export const ENOUGH_BALANCE_OF_ETH = 1008
export const MORE_THAN_MIN_TOKEN = 1009




//3xxx
export const UNSUPPORT_NETWORK = 3001;

//4xxx ref MetaMask
export const USER_REJECTED_REQUEST = 4001

export const NO_ACCOUNT = 4999

export const TOKEN_APPROVE_FAIL = 5999

//9xxx
export const UNKNOWN = 9999

// RPC
export const RPC_SERVER_ERROR = -32000;
export const METHOD_NOT_FOUND = -32601;
export const INVALID_PARAMS = -32602;
export const RPC_TIMEOUT = -32603;

export default {
  NO_UPDATE_PERMISSIONS,
  ACCOUNT_NOT_MATCHED,
  ROOT_REGIST_CLOSE,
  DOMAIN_HAS_TAKEN,
  DOMAIN_FORMAT_ILLEGAL,
  DOMAIN_NOT_EXIST,
  DOMAIN_TOP_EXPIRED,
  DOMAIN_EXPIRED,


  //4xxxxx Mail
  MAILSERVICE_INACTIVED,
  MAILSERVICE_HAS_ACTIVED,
  MAILSERVICE_ONLY_RARE_OPEN,
  MAIL_REGIST_NOT_OPEN,
  MAIL_REGIST_BY_OWNER,
  MAIL_HASH_EXIST,
  MAIL_YEAR_OVER_MAX,
  MAIL_HASH_INVALID,
  MAIL_ALIAS_HAS_TAKEN,
  MAIL_HASH_EXPIRED,

  //7xxxxx common
  RECHARGE_YEAR_RANGE,
  TOKEN_HAS_GET,

  PARAM_ILLEGAL,
  // ****** web3 or rpc */
  NO_METAMASK,
  LACK_OF_ETH,
  LACK_OF_TOKEN,
  ENOUGH_BALANCE_OF_ETH,
  MORE_THAN_MIN_TOKEN,

  //3xxx
  UNSUPPORT_NETWORK,
  //4xxx
  USER_REJECTED_REQUEST,
  NO_ACCOUNT,
  UNKNOWN,

  TOKEN_APPROVE_FAIL,
  //RPC
  RPC_SERVER_ERROR,
  METHOD_NOT_FOUND,
  INVALID_PARAMS,
  RPC_TIMEOUT
};

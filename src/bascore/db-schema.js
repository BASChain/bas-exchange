export const EWALLET_MAIL_PREFIX = 'mails';
export const EWALLET_ASSETS_PREFIX = 'assets'
export const EWALLET_ORDERS_PREFIX = 'orders'

export const KEY_DELIMITER ='_'

export function getKey(prefix,...wallet){
  const keyiters = [prefix, ...wallet]

  return keyiters.join(KEY_DELIMITER)
}

export default {
  getKey,
  EWALLET_MAIL_PREFIX,
  EWALLET_ASSETS_PREFIX,
  EWALLET_ORDERS_PREFIX,
}

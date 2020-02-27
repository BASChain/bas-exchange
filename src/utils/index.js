import numeral from 'numeral'
import DateFormat from 'fast-date-format'


export const STD_DATEFORMAT = "YYYY-MM-DD"


/**
 *
 * @param {string,number(second),Date} dt
 * @param {*} format
 * YYYY MM DD mm ss
 * SSS 000...999
 * DDDD 001..365
 * @see https://www.npmjs.com/package/fast-date-format
 */
export const dateFormat = (dt,format) =>{
  console.log('Utile',dt)
  if(!dt)return ''
  if(typeof dt ==='number' || typeof dt === 'string'){
    dt = new Date(dt*1000)
  }
  let dataFormat = new DateFormat(format||STD_DATEFORMAT)

  return dataFormat.format(dt)
}

/**
 * ms
 * @param {*} dtend
 * @param {*} dtstart
 */
export const diffDays = (dtend,dtstart) =>{
  if(!dtend )return 0;
  if(!dtstart)dtstart = new Date().getTime()
  return Math.floor((dtend-dtstart)/(24*3600*1000))
}

export const diffYears = (dtend,dtstart) =>{
  if(!dtend )return 0;
  if(!dtstart)dtstart = new Date().getTime()
  return Math.floor((dtend-dtstart)/(24*3600*1000*365))
}

export const CurrencyFormat = (bn,format)=>{
  if(typeof bn === 'Object'){
    bn = bn.toString();
  }
  const _format = format ||'0[.]00'

  return numeral(bn).format(_format)
}

export const toASCII = (str) =>{
  if(!str||str.length == 0)return "0x00"
  return "0x" + str.split("").map(e => e.charCodeAt()).reduce((a,b)=> a.toString(16)+b.toString(16))
}

/**
 * bytes to String
 * @param {bytes} ascii
 */
export const bytesToStr = (ascii) =>{
  const charCodes = []
  for(var i=2;i<ascii.length-1;i +=2){
    charCodes.push("0x"+ascii[i]+ascii[i+1])
  }
  return charCodes.map(e => String.fromCharCode(e)).reduce((a,b)=>a+b)
}

export const intToDate = (ts)=>{
  return new Date(ts*1000)
}

export const bytes2IPv4 = (hex) =>{
  if(hex.startsWith('0x'))hex = hex.substr(2)

}

export default {
  CurrencyFormat,
  dateFormat,
  diffDays,
  diffYears,
  toASCII,
  bytesToStr,
  intToDate,
}

import numeral from 'numeral'

export const CurrencyFormat = (bn,format)=>{
  if(typeof bn === 'Object'){
    bn = bn.toString();
  }
  const _format = format ||'0[.]00'

  return numeral(bn).format(_format)
}

export default {
  CurrencyFormat
}

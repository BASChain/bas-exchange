import BaseProxy from './Proxy'
import { networkAPIEndpoint } from '@/bizlib/web3'

const AUTOCOMP = "autocomplete"
const getDomain = 'registerDomain'

class AutoCompProxy extends BaseProxy {
  constructor(parameters = {}) {
    const prefix = networkAPIEndpoint()
    super(`api${prefix}`, parameters);
  }

  getSuggests(text){
    console.log('text>>>>',text)

    return this.submit(
      'post',
      `${this.endpoint}/${AUTOCOMP}`,
      {"text":text}
    )
  }

  getRegistDomain(text){
    return this.submit(
      'post',
      `${this.endpoint}/${getDomain}`,
      { "domainname": text.trim().toLowerCase() }
    )

  }
}

export default AutoCompProxy

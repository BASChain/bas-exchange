import BaseProxy from './Proxy'

const AUTOCOMP = "autocomplete"

class AutoCompProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api', parameters);
  }

  getSuggests(text){
    console.log('text>>>>',text)

    return this.submit(
      'post',
      `${this.endpoint}/${AUTOCOMP}`,
      {"text":text}
    )
  }
}

export default AutoCompProxy

import Vue from 'vue'

/**
 * BAS SERVER API ENDPOINT
 */
class BaseProxy {
  constructor(endpoint,parameters = {}){
    this.endpoint = endpoint
    this.parameters = parameters
  }

  setParameters(parameters) {
    Object.keys(parameters).forEach((key) =>{
      this.parameters[key] = parameters[key];
    })

    return this;
  }

  setParameter(name,value){
    this.parameters[name] =value;
    return this;
  }

  removeParameters(parameters){
    parameters.forEach((parameter)=>{
      delete this.parameters[parameter]
    })
    return this;
  }

  removeParameter(parameter){
    delete this.parameters[parameter]
    return this
  }

  /**
   * The method used to perform an AJAX-request.
   * @param {*} requestType
   * @param {*} url
   * @param {*} data
   */
  submit(requestType,url,data=null) {
    return new Promise((resolve,reject) =>{
      Vue.$http[requestType](url+this.getParameterString(),data)
        .then((response)=>{
          console.log(`url:${url}`,response.status,'<<<>>>',response.data)
          if(response.status ==200){
            resolve(response.data||{state:1})
          }else{
            reject(response.status)
          }
        })
        .catch(({response}) =>{
          console.log(response, '<<<>>>', response)
          if (response){
            reject(response.status)
          }else{
            reject('unknow')
          }
        })
    })
  }

  all(){
    return this.submit('get',`/${this.endpoint}`)
  }




  getParameterString(){
    const keys = Object.keys(this.parameters);

    const parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`)

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`;
  }
}

export default BaseProxy;

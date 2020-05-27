

const DomainCheckRules = [
  ['isRare', /^[0-9a-z]{1,6}$/],
  ['specialEn', /[`~!@#$%^&*()+<>?:"{},\/;'[\]]/im],
  ['specialLocal', /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im],
  ['dotTimes', /\./gi],
  ['hasSpace',/[ ]/g],
  ['positiveNumber', /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/]
]


export const getDomainRules = () => {
  return buildRules(DomainCheckRules)
}

/**
 *
 * @param {*} ruleName
 */
export function getRule(ruleName){
  let rules = buildRules(DomainCheckRules)
  return rules.find(item => item.name == ruleName)
}

/**
 *
 * @param {*} ruleTuples
 */
function buildRules(ruleTuples){
  return ruleTuples.map(tuple => {
    return {
      name:tuple[0],
      expr:tuple[1]
    }
  })
}

export default {
  getDomainRules,
  getRule
}

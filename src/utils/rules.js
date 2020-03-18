

const DomainCheckRules = [
  ['isRare', /^[0-9a-z]{1,6}$/],
  ['specialEn', /[`~!@#$%^&*()+<>?:"{},\/;'[\]]/im],
  ['specialLocal', /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im],
  ['dotTimes', /\./ig]
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

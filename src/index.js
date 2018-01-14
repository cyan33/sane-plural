import rules, { addRules } from './rules'
import { type } from './utils'

function plural(noun, amount, pluralForm) {
  // fallback
  if (arguments.length === 3) {
    return amount > 1 ? pluralForm : noun
  }

  if (arguments.length === 1 && type(noun) !== 'string') {
    throw Error('Must provide a string as noun.')
  }
  
  if (amount <= 1) return noun

  for (let rule of rules) {
    const key = rule[0]
    if (type(key) === 'string' && noun === key) {
      return type(rule[1]) === 'function' ? rule[1](noun) : rule[1]
    }

    if (type(key) === 'regexp' && key.test(noun)) {
      return type(rule[1]) === 'function' ? rule[1](noun, key) : rule[1]
    }
  }

  return noun + 's'
}

export default plural
export { addRules }

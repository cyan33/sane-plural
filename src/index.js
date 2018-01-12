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
    const key = Object.keys(rule)[0]

    if (type(key) === 'string' && key === noun) {
      return type(rule[key]) === 'function' ? rule[key](noun) : rule[key]
    }

    if (type(key) === 'regex' && key.test(noun)) {
      return type(rule[key]) === 'function' ? rule[key](noun, key) : rule[key]
    }
  }

  return noun + 's'
}

export default plural
export { addRules }

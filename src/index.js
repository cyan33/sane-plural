import rules, { addRule } from './rules'

function type(o) {
  return toString.call(o).slice(8, -1).toLowerCase()
}

function plural(noun, amount, pluralForm) {
  // fallback
  if (arguments.length === 3) {
    return amount > 1 ? pluralForm : noun
  }

  if (amount > 1 || amount === undefined ) {
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

  return noun
}

export default plural
export { addRule }

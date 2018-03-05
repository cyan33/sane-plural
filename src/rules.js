import { type } from './utils'
import irregularPlurals from 'irregular-plurals'

const rules = []

function addSingleRule(rule, fn) {
  rules.unshift([rule, fn])
  return
}

export function addRules(rule, fn) {
  if (type(rule) === 'object' && !fn) {
    for (let key in rule) {
      addSingleRule(key, rule[key])
    }
    return
  }
  addSingleRule(rule, fn)
}

function prepareRules() {
  addSingleRule(/x$|ch$|s$/i, (w) => w + 'es')
  addSingleRule(/[^aeiouy]o$/i, (w) => w + 'es')
  addSingleRule(/[^aeiou]y$|quy$/i, (w) => w.slice(0, -1) + 'ies')
  addSingleRule(/(fe?$)/i, (w, regex) => {
    return w === 'dwarf' || w === 'roof' ? w + 's' : w.replace(regex, 'ves')
  })

  // irregular plurals
  addRules(irregularPlurals)

  return rules
}

export default prepareRules()

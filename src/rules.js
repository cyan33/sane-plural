import { type } from './utils'

const rules = []

function addSingleRule(rule, fn) {
  rules.unshift({
    [rule]: fn
  })
  return plural
}

export function addRules(rule, fn) {
  if (type(rule) === 'object') {
    for (let key in rule) {
      addSingleRule(rule, rule[key])
    }
    return plural
  }
  addSingleRule(rule, fn)
}

function prepareRules() {
  addRules({
    [/x$|ch$|s$/i]: (w) => w + 'es',
    [/[^aeiouy]o$/i]: (w) => w + 'es',
    [/[^aeiou]y$|quy$/i]: (w) => w.slice(0, -1) + 'ies',
    [/(fe?$)/i]: (w, regex) => w === 'dwarf' || w === 'roof' ? w + 's' : w.replace(regex, 'ves')
  })

  // woman, man
  addRules(/^(?:wo)?man$/i, (w) => w.replace(/a/, 'e'))

  // remain unchanged
  addRules(/\b(?:bison|cod|deer|fowl|halibut|moose|sheep|kudos?|premises|shambles)\b/i, (w) => w)

  // irregular plurals
  addRules({
    'criterion': 'criteria',
    'bacterium': 'bacteria',
    'memo': 'memos',
    'cello': 'cellos',
    'die': 'dice',
    'goose': 'geese',
    'mouse': 'mice',
    'person': 'people',
    'chilli': 'chillies',
  })

  return rules
}

export default prepareRules()

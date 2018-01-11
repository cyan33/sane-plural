const rules = []

export function addRule(rule, fn = (w) => w) {
  rules.unshift({
    [rule]: fn
  })
  return plural
}

function prepareRules() {
  // ending in 'vocal + y' or 'quy'
  addRule(/[^aeiou]y$|quy$/i, (w) => w.slice(0, -1) + 'ies')

  // append 'es'
  addRule(/x$|ch$|s$/i, (w) => w + 'es')

  // vocal + o => 's', or append 'es'
  addRule(/[aeiouy]o$/i, (w) => w + 's')
  addRule(/[^aeiouy]o$/i, (w) => w + 'es')

  // ending in 'f' => 'ves'
  addRule(/(fe?$)/i, (w, regex) => w === 'dwarf' || w === 'roof' ? w + 's' : w.replace(regex, 'ves'))

  // woman, man
  addRule(/^(?:wo)?man$/i, (w) => w.replace(/a/, 'e'))

  // remain unchanged
  addRule(/\b(?:bison|cod|deer|fowl|halibut|moose|sheep|kudos?|premises|shambles)\b/i, (w) => w)

  // spcial forms
  addRule('criterion', 'criteria')
  addRule('bacterium', 'bacteria')
  addRule('memo', 'memos')
  addRule('cello', 'cellos')
  addRule('die', 'dice')
  addRule('goose', 'geese')
  addRule('mouse', 'mice')
  addRule('person', 'people')
  addRule('chilli', 'chillies')

  return rules
}

export default prepareRules()

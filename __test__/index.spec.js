const {
  default: plural,
  addRules
} = require('../lib')

describe('let\'s get the plural form in a sane way', () => {
  it('gives the plural form if it\'s provided only one parameter', () => {
    expect(plural('apple')).toBe('apples')
    expect(plural('zebra')).toBe('zebras')
  });

  it('gives the correct form of plural nouns', () => {
    // ending in 'es'
    expect(plural('peach')).toBe('peaches')
    expect(plural('beach')).toBe('beaches')

    // ending in 'o'
    expect(plural('tomato')).toBe('tomatoes')
    expect(plural('yoyo')).toBe('yoyos')

    // ending in 'y'
    expect(plural('family')).toBe('families')
    expect(plural('bay')).toBe('bays')
    expect(plural('soliloquy')).toBe('soliloquies')
    expect(plural('duy')).toBe('duys')

    // ending in 'f'
    expect(plural('knife')).toBe('knives')
    expect(plural('dwarf')).toBe('dwarfs')

    // irregular forms
    expect(plural('criterion')).toBe('criteria')
    expect(plural('bison')).toBe('bison')
    expect(plural('woman')).toBe('women')
  })

  it('can give out the result according to the amount given', () => {
    expect(plural('apple', 1)).toBe('apple')
    expect(plural('woman', 1)).toBe('woman')
  })

  it('can provide a fallback according to the 3rd parameter', () => {
    expect(plural('apple', 3, 'good')).toBe('good')
    expect(plural('apple', 1, 'good')).toBe('apple')
  })

  it('can add customized rules', () => {
    // add simple string
    addRules({
      'apple': 'pear',
      'sun': 'moon'
    })
    expect(plural('apple')).toBe('pear')
    expect(plural('sun')).toBe('moon')

    // add regexp
    addRules(/singer/i, (w, regex) => {
      return w.replace(regex, 'lol')
    })
    expect(plural('singera')).toBe('lola')

    addRules(/child/i, 'notchildren')
    expect(plural('child', 30)).toBe('notchildren')
  })

  it('customized fallback will ignore rules', () => {
    addRules('plane', 'jetplanes')
    expect(plural('plane', 10, 'planes')).toBe('planes')
  })
})

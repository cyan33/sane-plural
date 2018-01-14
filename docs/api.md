# APIs

## Basic Usage

```js
import plural from 'sane-plural'

plural('zebra', 2) // zebras
plural('sheep', 2) // sheep
plural('peach', 2) // peaches

// if you provide only the noun
// you'll be given the plural form by default
plural('apple') // apples
```

## Fallback / Add Rules

Most of the time it gives you the correct form of the noun that is given. But it's hard to cover all English words' irregular plural form. Or sometime when the amount is equal or greater than 2, you may want another word rather than its plural.

**I highly recommend you submit an issue or PR for those that are not covered.**

Anyway, in these cases, there are two ways to fix:

You can provide a third parameter to explicitly specify the plural form as a fallback:

```js
plural('person', 3, 'people')
```

Or add a rule globally:

```js
import { addRules } from 'sane-plural'

// make sure this is executed before you call `plural`
addRules('person', 'people')

// or provide a regex and a callback function as the rule of procession
addRules(/\bsheep|deer\b/i, (word) => word)

// the callback function could also take a second parameter, which is the regex you've specified
addRules(/(fe?$)/i, (word, regex) => {
  return w.replace(regex, 'ves')
})
```

And you could add a bunch of rules together wrapped in an object:

```js
addRules({
  'person': 'people',
  'man': 'men'
})

// regex can only be added this way and cannot be passed into an object as a key
addRules(/\bsheep|deer\b/i, (word) => word)
addRules(/(fe?$)/i, (word, regex) => {
  return w.replace(regex, 'ves')
})
```

Also note that the last few rules you add have the highest priority, and if a noun satisfies it, it will return early to make the following rules be of no use. i.e. Priority-wise, the rules are in **decendant** order.

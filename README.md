# sane-plural

The sane way to get the plural form of nouns.

[Full document](docs/api.md)

## Usage

```sh
npm install --save sane-plural
```

Instead of:

```js
var amount = 5
console.log(`${amount > 1 ? 'record' : 'records'}.`)  // records
```

Do:

```js
import plural from 'sane-plural'

var amount = 5
console.log(`${plural('record', amount)}`)  // "records"
```

You can also provide fallbacks to the function call, or add global customized rules. See more [here](docs/api.md)

## Motivation

There is an npm package called `plural`, but for the last two years no one has been maintaining it and the API seems to me a little bit un-intuitive. So I decided to write one my own.

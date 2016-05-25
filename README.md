## html-parser-lite [![Build Status](https://travis-ci.org/creeperyang/html-parser-lite.svg?branch=master)](https://travis-ci.org/creeperyang/html-parser-lite)

> A light weight html parser and more.

### Usage

```js
const fs = require('fs')
const HtmlParser = require('html-parser-lite')

let parser = new HtmlParser()
let nodeTree = parser.parse(fs.readFileSync('test/textures/simple.html').toString())

console.log(nodeTree)
```

### License

[MIT](https://opensource.org/licenses/mit-license.php)
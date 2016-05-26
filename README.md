## html-parser-lite [![Build Status](https://travis-ci.org/creeperyang/html-parser-lite.svg?branch=master)](https://travis-ci.org/creeperyang/html-parser-lite)

> A light weight html parser and more.

[![NPM](https://nodei.co/npm/html-parser-lite.png?compact=true)](https://nodei.co/npm/html-parser-lite/)

### Usage

```js
const fs = require('fs')
const HtmlParser = require('html-parser-lite')
const RawHtmlParser = HtmlParser.RawHtmlParser

// HtmlParser will parse html to nodes tree，somehow like dom tree
// so you can iterate the tree to get info like textContent, attrs...
let parser = new HtmlParser()
let html = fs.readFileSync('test/textures/simple.html').toString()
let rootNode = parser.parse(html)

console.log(rootNode, rootNode.childNodes)


// RawHtmlParser is the base of HtmlParser.
// If you use RawHtmlParser, you must implement the scanner.
parser = new RawHtmlParser({
    // the for methods must be implemented yourself
    scanner: {
        startElement(tagName, attrs, isSelfColse, input) {
            tagName = tagName.toLowerCase()
            // your logic
        },
        endElement(tagName) {},
        characters(text) {},
        comment(text) {}
    }
})
parser.parse(html)
```

### License

[MIT](https://opensource.org/licenses/mit-license.php)

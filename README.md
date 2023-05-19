## html-parser-lite [![Test CI](https://github.com/creeperyang/html-parser-lite/actions/workflows/node.js.yml/badge.svg)](https://github.com/creeperyang/html-parser-lite/actions/workflows/node.js.yml)

> A light weight html parser and more.

[![NPM](https://nodei.co/npm/html-parser-lite.png?compact=true)](https://nodei.co/npm/html-parser-lite/)

### API

**`parse(html: string, options?: object)=>Node|Node[]`:**


|property|type|desc|defaults|
|--------|---------|-------|-------|
| `html` | `string` | The string to parse | None |
| `options.wrapWithDocument` | `boolean` | Whether force to create a document node as root wrapper. | `false` |
| `options.ignoreWhitespaceText` | `boolean` | Whether create text node when all the chars are white space. | `true` |
| `options.scanner` | `HtmlScanner` | Inner html scanner. Config it only when you want to implement custom complex logic. | inner `HtmlScanner` instance |

If `options.ignoreWhitespaceText` set to `true`, it will return a `DocumentNode`(as the root of the whole tree); otherwise, it will return an array of nodes.

#### Important Tips

The library's goal is not to behave the same as the browser, it just parses html string to node tree.

When you use default options (just run `parse(html)`)，it will always return an array of nodes. And the white space between tags will be ignored. Take `<p>s t a r t</p>↵  ↵<p>   </p>` for example:

- `↵  ↵` between two paragraphs will be ignored, so only return two paragraph nodes.
- The first paragraph `<p>s t a r t</p>` will keep all white space characters.
- The second paragraph `<p>   </p>` will ingore white space, so this `p` node has no text child node.

If you want to keep white space(which generates corresponding text nodes), set `options.ignoreWhitespaceText=false`.

### Usage

```js
const fs = require('fs')
const parse = require('html-parser-lite')
const html = fs.readFileSync('test/textures/simple.html').toString()

// html-parser will parse html to nodes array (default behavior).
const nodes = parse(html)
// JSON.stringify(nodes):
// [{"tagName":"doctype","nodeType":10,"publicId":"","systemId":"","name":"html"},{"tagName":"html","nodeType":1,"childNodes":[{"tagName":"head","nodeType":1,"childNodes":[{"tagName":"meta","nodeType":1,"childNodes":[],"attrs":{"charset":"utf-8"}},{"tagName":"title","nodeType":1,"childNodes":[{"tagName":"text","nodeType":3,"textContent":"hi"}],"attrs":{}}],"attrs":{}},{"tagName":"body","nodeType":1,"childNodes":[{"tagName":"h1","nodeType":1,"childNodes":[{"tagName":"text","nodeType":3,"textContent":"heading title"}],"attrs":{}}],"attrs":{}}],"attrs":{"class":"html-ok","lang":"zh-hans-cn"},"className":"html-ok"}]
```

### License

[MIT](https://opensource.org/licenses/mit-license.php)

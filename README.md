## html-parser-lite [![Test CI](https://github.com/creeperyang/html-parser-lite/actions/workflows/node.js.yml/badge.svg)](https://github.com/creeperyang/html-parser-lite/actions/workflows/node.js.yml)

> A light weight html parser and more.

[![NPM](https://nodei.co/npm/html-parser-lite.png?compact=true)](https://nodei.co/npm/html-parser-lite/)

### Usage

```js
const fs = require('fs')
const parse = require('html-parser-lite')

const html = fs.readFileSync('test/textures/simple.html').toString()

// html-parser will parse html to nodes array (default behavior).
const nodes = parse(html) // The same as `parse(html, { forceWrapper: false })`
/**
    [
    DoctypeNode {
        tagName: 'doctype',
        nodeType: 10,
        textContent: '',
        parentNode: null,
        attrs: {},
        childNodes: [],
        id: undefined,
        systemId: '',
        publicId: '',
        name: 'html'
    },
    Node {
        tagName: 'html',
        nodeType: 1,
        textContent: '',
        parentNode: null,
        attrs: { class: 'html-ok', lang: 'zh-hans-cn' },
        childNodes: [ [Node], [Node] ],
        id: '',
        className: 'html-ok'
    }
    ]
*/
console.log(nodes)

// Or you can make it somehow like dom tree:
const dom = parse(html, { forceWrapper: true })
console.log(dom)
/**
    DocumentNode {
    tagName: 'document',
    nodeType: 9,
    textContent: '',
    parentNode: null,
    attrs: {},
    childNodes: [
        DoctypeNode {
        tagName: 'doctype',
        nodeType: 10,
        textContent: '',
        parentNode: [Circular *1],
        attrs: {},
        childNodes: [],
        id: undefined,
        systemId: '',
        publicId: '',
        name: 'html'
        },
        Node {
        tagName: 'html',
        nodeType: 1,
        textContent: '',
        parentNode: [Circular *1],
        attrs: [Object],
        childNodes: [Array],
        id: '',
        className: 'html-ok'
        }
    ],
    isVirtualRoot: false
    }
*/
```

### API

**`parse(html: string, options?: {forceWrapper:boolean})`:**

- If `forceWrapper=true`, returns `DocumentNode` (subclass of internal `Node` class);
- If `forceWrapper=false`, returns `Node[]`.

### License

[MIT](https://opensource.org/licenses/mit-license.php)

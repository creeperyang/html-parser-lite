const fs = require('fs')
const path = require('path')
const should = require('should')
const HtmlParser = require('../src')
const Node = require('../src/node')

describe('API', function() {
    it('should parse html to nodes tree', function() {
        let html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        let parser = new HtmlParser()
        let tree = parser.parse(html.toString())
        tree.should.have.properties({
            tagName: 'document',
            nodeType: 9,
            parentNode: undefined
        })
        tree.should.have.property('childNodes').with.lengthOf(2)
        tree.should.instanceof(Node.DocumentNode)
        tree.childNodes[0].should.be.instanceof(Node.DoctypeNode).and.have.property('name', 'html')
        tree.childNodes[1].should.have.properties({
            tagName: 'html',
            nodeType: 1,
            parentNode: tree,
            attrs: {
                lang: 'zh-hans-cn',
                class: 'html-ok'
            },
            className: 'html-ok'
        })
    })
})

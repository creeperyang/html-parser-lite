const fs = require('fs')
const path = require('path')
const should = require('should') // eslint-disable-line
const HtmlParser = require('../src')
const Node = require('../src/node')

describe('HtmlParser', function() {
    const parser = new HtmlParser()
    it('should parse html to nodes tree correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        const tree = parser.parse(html.toString())
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
    it('should parse complex doctype correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/doctype.html'))
        const tree = parser.parse(html.toString())
        tree.should.have.properties({
            tagName: 'document',
            nodeType: 9,
            parentNode: undefined
        })
        tree.should.have.property('childNodes').with.lengthOf(1)
        tree.childNodes[0].should.be.instanceof(Node.DoctypeNode).and.have.properties({
            tagName: 'doctype',
            nodeType: 10,
            parentNode: tree,
            publicId: '-//W3C//DTD XHTML 1.0 Transitional//EN',
            systemId: 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd',
            name: 'html'
        })
    })
    it('should handle attributes correctly', function() {
        const html = '<img src="1.png" alt="" width="621" height=422 loaded>'
        const tree = parser.parse(html)
        tree.childNodes[0].attrs.should.deepEqual({
            src: '1.png',
            alt: '',
            width: '621',
            height: '422',
            loaded: true
        })
        should.strictEqual(tree.childNodes[0].id, '')
        should.strictEqual(tree.childNodes[0].className, '')

        // eslint-disable-next-line quotes
        const html2 = "<p align=center style='text-align:center;' id=''></p>"
        const tree2 = parser.parse(html2)
        tree2.childNodes[0].attrs.should.deepEqual({
            align: 'center',
            style: 'text-align:center;',
            id: ''
        })
    })
})

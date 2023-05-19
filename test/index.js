const fs = require('fs')
const path = require('path')
const should = require('should') // eslint-disable-line
const parse = require('../src')
const Node = require('../src/node')

describe('Main', function() {
    it('[remove white space]should parse html to nodes tree correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        const tree = parse(html.toString(), { wrapWithDocument: true })
        tree.should.have.properties({
            tagName: 'document',
            nodeType: 9,
            parentNode: null
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

        // deep compare
        const expected = require('./textures/simple_no_whitespace.json')
        JSON.parse(JSON.stringify(tree)).should.deepEqual(expected)
    })
    it('[with white space]should parse html to nodes tree correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        const tree = parse(html.toString(), { wrapWithDocument: true, ignoreWhitespaceText: false })
        const expected = require('./textures/simple_with_whitespace.json')
        JSON.parse(JSON.stringify(tree)).should.deepEqual(expected)
    })

    it('[remove white space, no wrapper]should parse html to nodes tree correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        const tree = parse(html.toString(), { wrapWithDocument: false })
        tree.should.have.length(2)
        tree[0].should.be.instanceof(Node.DoctypeNode).and.have.property('name', 'html')
        tree[1].should.have.properties({
            tagName: 'html',
            nodeType: 1,
            parentNode: null,
            attrs: {
                lang: 'zh-hans-cn',
                class: 'html-ok'
            },
            className: 'html-ok'
        })
    })
    it('[with white space, no wrapper]should parse html to nodes tree correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/simple.html'))
        const tree = parse(html.toString(), { wrapWithDocument: false, ignoreWhitespaceText: false })
        tree.should.have.length(3)
        const expected = require('./textures/simple_no_wrapper_with_whitespace.json')
        JSON.parse(JSON.stringify(tree)).should.deepEqual(expected)
    })

    it('[custom]should handle white space correctly', function() {
        const html = '<div>   </div><p> abc </p>'
        const tree = parse(html, {
            scanner: {
                startElement() { },
                endElement() { },
                characters(text) {
                    text.should.be.exactly(' abc ')
                },
                comment() { },
                getRootNode() {
                    return { isVirtualRoot: false }
                }
            },
            ignoreWhitespaceText: true
        })
        tree.should.be.eql({ isVirtualRoot: false })
    })

    it('should parse complex doctype correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/doctype.html'))
        const tree = parse(html.toString(), { wrapWithDocument: true })
        tree.should.have.properties({
            tagName: 'document',
            nodeType: 9,
            parentNode: null
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
    it('should parse complex doctype correctly without wrapper', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/doctype.html'))
        const tree = parse(html.toString(), { wrapWithDocument: false })
        tree.should.have.length(1)
        tree[0].should.be.instanceof(Node.DoctypeNode).and.have.properties({
            tagName: 'doctype',
            nodeType: 10,
            parentNode: null,
            publicId: '-//W3C//DTD XHTML 1.0 Transitional//EN',
            systemId: 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd',
            name: 'html'
        })
    })
    it('should handle attributes correctly', function() {
        const html = '<img src="1.png" alt="" width="621" height=422 loaded>'
        const tree = parse(html, { wrapWithDocument: true })
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
        const tree2 = parse(html2, { wrapWithDocument: true })
        tree2.childNodes[0].attrs.should.deepEqual({
            align: 'center',
            style: 'text-align:center;',
            id: ''
        })
    })
})

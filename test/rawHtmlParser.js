const fs = require('fs')
const path = require('path')
const should = require('should') // eslint-disable-line
const HtmlParser = require('../src').RawHtmlParser

describe('RawHtmlParser', function() {
    const html = fs.readFileSync(path.resolve(__dirname, 'textures/partial.html'))

    it('should drop whitespace characters with `option.ignoreWhitespaceText=true`', function() {
        const parser = new HtmlParser({
            scanner: {
                startElement() {},
                endElement() {},
                characters(text) {
                    text.should.not.match(/^\s*$/)
                },
                comment() {}
            },
            ignoreWhitespaceText: true
        })
        parser.parse(html.toString())
    })
    it('should throw error if not implement `startElement/endElement/characters/comment` method of instance.scanner', function() {
        const parser = new HtmlParser()
        try {
            parser.parse(html.toString())
        } catch (err) {
            err.should.be.instanceof(Error)
        }
    })
    it('should parse html correctly', function() {
        const expected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'textures/partial.json')))
        const startElementQueue = []
        const endElementQueue = []
        const textQueue = []
        const commentQueue = []
        const parser = new HtmlParser({
            scanner: {
                startElement(tagName, attrs, isSelfColse, input) {
                    tagName = tagName.toLowerCase()
                    startElementQueue.push({
                        tagName,
                        attrs,
                        isSelfColse,
                        input
                    })
                },
                endElement(tagName) {
                    endElementQueue.push(tagName)
                },
                characters(text) {
                    textQueue.push(text)
                },
                comment(text) {
                    commentQueue.push(text)
                }
            }
        })
        parser.parse(html.toString())
        startElementQueue.should.deepEqual(expected.startElementQueue)
        endElementQueue.should.deepEqual(expected.endElementQueue)
        textQueue.should.deepEqual(expected.textQueue)
        commentQueue.should.deepEqual(expected.commentQueue)
    })
})

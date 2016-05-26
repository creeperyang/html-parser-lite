const fs = require('fs')
const path = require('path')
const should = require('should') // eslint-disable-line
const HtmlParser = require('../src').RawHtmlParser

describe('RawHtmlParser', function() {
    it('should parse html correctly', function() {
        const html = fs.readFileSync(path.resolve(__dirname, 'textures/partial.html'))
        const expected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'textures/partial.json')))
        const startElementQueue = []
        const endElementQueue = []
        const textQueue = []
        const commentQueue = []
        const scanner = {
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
        const parser = new HtmlParser()
        parser.scanner = scanner
        parser.parse(html.toString())
        startElementQueue.should.deepEqual(expected.startElementQueue)
        endElementQueue.should.deepEqual(expected.endElementQueue)
        textQueue.should.deepEqual(expected.textQueue)
        commentQueue.should.deepEqual(expected.commentQueue)
    })
})

// attribute, like href="javascript:void(0)"
// 1. start with name (not empty and not =)
// 2. and then \s*=\s*
// 3. and value can be "value" | 'value' | value
// 4. 2 and 3 are optional
const attrRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
const endTagRe = /^<\/([^>\s]+)[^>]*>/m
// start tag, like <a href="link"> <img/>
// 1. must start with <tagName
// 2. optional attrbutes
// 3. /> or >
const startTagRe = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m
const selfCloseTagRe = /\s*\/\s*>\s*$/m

const mustImplementMethod = (name) => {
    throw new Error(`Must implement the method ${name ? name : ''}`)
}

/**
 * This is a simple html parser. Will read and parse html string.
 *
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */
class HtmlParser {
    constructor() {}
    parse(html) {
        let treatAsChars = false
        let index, leftPart, rightPart, match
        while (html.length) {
            // comment
            if (html.substring(0, 4) === '<!--') {
                index = html.indexOf('-->')
                if (index !== -1) {
                    this.contentHandler.comment(html.substring(4, index))
                    html = html.substring(index + 3);
                    treatAsChars = false
                } else {
                    treatAsChars = true
                }
            }
            // end tag
            else if (html.substring(0, 2) === '</') {
                if (match = this.endTagRe.exec(html)) {
                    html = RegExp.rightContext
                    treatAsChars = false
                    this.parseEndTag(RegExp.lastMatch, match[1])
                } else {
                    treatAsChars = true
                }
            }
            // start tag
            else if (html.charAt(0) === '<') {
                if (match = this.startTagRe.exec(html)) {
                    html = RegExp.rightContext
                    treatAsChars = false
                    this.parseStartTag(RegExp.lastMatch, match[1], match)
                } else {
                    treatAsChars = true
                }
            }

            if (treatAsChars) {
                index = html.indexOf('<')
                if (index === -1) {
                    this.contentHandler.characters(html)
                    html = ''
                } else {
                    this.contentHandler.characters(html.substring(0, index))
                    html = html.substring(index)
                }
            }

            treatAsChars = true;
        }
    }

    parseStartTag(input, tagName, match) {
        let isSelfColse = selfCloseTagRe.test(input)
        let attrInput = match[2]
        if (isSelfColse) {
            attrInput = attrInput.replace(/\s*\/\s*$/, '')
        }
        let attrs = this.parseAttributes(tagName, attrInput)
        this.contentHandler.startElement(tagName, attrs, isSelfColse, match[0])
    }
    parseEndTag(input, tagName) {
        this.contentHandler.endElement(tagName);
    }
    parseAttributes(tagName, input) {
        let attrs = {}
        input.replace(this.attrRe, (attr, name, c2, value, c4, valueInQuote, c6, valueInSingleQuote) => {
            attrs[name] = valueInSingleQuote || valueInQuote || value || true;
        })
        return attrs
    }
    parseAttribute(input) {

    }
}

HtmlParser.prototype.attrRe = attrRe
HtmlParser.prototype.endTagRe = endTagRe
HtmlParser.prototype.startTagRe = startTagRe
HtmlParser.prototype.contentHandler = {
    startElement() {
        mustImplementMethod('startElement')
    },
    endElement() {
        mustImplementMethod('endElement')
    },
    characters() {
        mustImplementMethod('characters')
    },
    comment() {
        mustImplementMethod('comment')
    }
}

module.exports = HtmlParser

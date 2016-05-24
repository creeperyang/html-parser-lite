const Parser = require('./parser')
const HtmlScanner = require('./scanner')

class HtmlParser extends Parser {
    constructor() {
        super()
    }
    parse(html) {
        super.parse(html)
        return this.contentHandler.getRootNode()
    }
}

HtmlParser.prototype.contentHandler = new HtmlScanner()

module.exports = HtmlParser

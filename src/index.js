const Parser = require('./parser')
const HtmlScanner = require('./scanner')

class HtmlParser extends Parser {
    constructor() {
        super()
        this.contentHandler = new HtmlScanner()
    }
    parse(html) {
        super.parse(html)
        return this.contentHandler.getRootNode()
    }
}

module.exports = HtmlParser

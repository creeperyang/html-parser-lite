const Parser = require('./parser')
const HtmlScanner = require('./scanner')

class HtmlParser extends Parser {
    constructor() {
        super()
        this.scanner = new HtmlScanner()
    }
    parse(html) {
        super.parse(html)
        return this.scanner.getRootNode()
    }
}

exports = module.exports = HtmlParser
exports.RawHtmlParser = Parser
exports.HtmlScanner = HtmlScanner

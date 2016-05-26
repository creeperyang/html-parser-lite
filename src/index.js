const Parser = require('./parser')
const HtmlScanner = require('./scanner')

class HtmlParser extends Parser {
    constructor() {
        super()
        this.scanner = new HtmlScanner()
    }
    parse(html) {
        super.parse(html)
        const tree = this.scanner.getRootNode()
        // always reset scanner after parse finish
        this.scanner.reset()
        return tree
    }
}

exports = module.exports = HtmlParser
exports.RawHtmlParser = Parser
exports.HtmlScanner = HtmlScanner

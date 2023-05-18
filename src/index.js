const Parser = require('./parser')
const HtmlScanner = require('./scanner')

/**
 * @typedef {import('./node').DocumentNode} DocumentNode
 * @typedef {import('./node')} Node
 */

/**
 * Parse html string.
 * @param {string} string The string to parse.
 * @param {object} options supported options.
 * @returns {Node[] | DocumentNode}
 */
const parse = (string, options = { forceWrapper: false }) => {
    const parser = new Parser({
        scanner: new HtmlScanner({
            forceWrapper: options.forceWrapper
        })
    })
    parser.parse(string)
    const root = parser.scanner.getRootNode()
    if (root.isVirtualRoot) {
        const nodes = root.childNodes
        nodes.forEach(v => (v.parentNode = null))
        return nodes
    }
    return root
}

module.exports = parse

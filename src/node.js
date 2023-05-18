'use strict'

/**
 * Enum for node types.
 * @readonly
 * @enum {number}
 */
const NODE_TYPE = {
    /**
     * Normal element, such as `<div>`
     */
    ELEMENT_NODE: 1,
    /**
     * text
     */
    TEXT_NODE: 3,
    /**
     * comment
     */
    COMMENT_NODE: 8,
    /**
     * document
     */
    DOCUMENT_NODE: 9,
    /**
     * Doctype node, such as `<!doctype html>`
     */
    DOCUMENT_TYPE_NODE: 10
}

class Node {
    /**
     * Construct node.
     * @param {object} options
     * @param {!string} options.tagName - tag name, such as "div"
     * @param {!NODE_TYPE} options.nodeType - node type
     * @param {?object} options.attrs - attributes
     * @param {?string} options.textContent - text content
     * @param {?Node} options.parentNode - parent node
     * @param {?Node[]} options.childNodes - child nodes
     */
    constructor({ tagName, nodeType, attrs, textContent, parentNode, childNodes }) {
        this.tagName = tagName
        this.nodeType = nodeType
        this.textContent = textContent || ''
        this.parentNode = parentNode || null
        this.attrs = attrs || {}
        /**
         * @public
         * @type {Node[]}
         */
        this.childNodes = childNodes || []

        if (nodeType === NODE_TYPE.ELEMENT_NODE) {
            // The id and className will always be string (if no value, just set to empty string)
            this.id = typeof attrs.id === 'string' ? attrs.id : ''
            this.className = typeof attrs.class === 'string' ? attrs.class : ''
        }
    }
    appendChild(node) {
        if (!node) {
            return
        }
        node.parentNode = this
        this.childNodes.push(node)
    }
    insertAfter(node, targetNode) {
        if (!targetNode) return this.appendChild(node)
        this.childNodes.some((n, i) => {
            if (n === targetNode) {
                node.parentNode = this
                this.childNodes.splice(i, 0, node)
                return true
            }
        })
    }
    insertBefore(node, targetNode) {
        if (!targetNode) return this.appendChild(node)
        this.childNodes.some((n, i) => {
            if (n === targetNode) {
                node.parentNode = this
                i === 0 ? this.childNodes.unshift(node) : this.childNodes.splice(i - 1, 0, node)
                return true
            }
        })
    }
    removeChild(node) {
        if (!node) {
            throw new Error('Invalid argument.')
        }
        this.childNodes.some((n, i) => {
            if (n === node) {
                node.parentNode = null
                this.childNodes.splice(i, 1)
                return node
            }
        })
    }
    toJSON() {
        const json = {
            tagName: this.tagName,
            nodeType: this.nodeType,
            childNodes: this.childNodes,
            textContent: this.textContent,
            attrs: this.attrs
        }
        if (this.id) json.id = this.id
        if (this.className) json.className = this.className
        return json
    }
}

exports = module.exports = Node
exports.NODE_TYPE = NODE_TYPE

class DoctypeNode extends Node {
    constructor(options) {
        super(options)
        this.id = undefined
        this.nodeType = NODE_TYPE.DOCUMENT_TYPE_NODE
        this.systemId = options.systemId || ''
        this.publicId = options.publicId || ''
        this.name = options.name || 'html'
    }
    toJSON() {
        return {
            tagName: this.tagName,
            nodeType: this.nodeType,
            publicId: this.publicId,
            systemId: this.systemId,
            name: this.name
        }
    }
}

class DocumentNode extends Node {
    getElementById(id) {
        if (!id) return null
        return iterate(this.childNodes)
        function iterate(nodes) {
            let result
            nodes.some(node => {
                if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) return false
                if (node.id === id) return (result = node)
                return (result = iterate(node.childNodes))
            })
            return result
        }
    }
}

exports.DoctypeNode = DoctypeNode
exports.DocumentNode = DocumentNode

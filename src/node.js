// NODE_TYPE
const ELEMENT_NODE = 1
const TEXT_NODE = 3
const COMMENT_NODE = 8
const DOCUMENT_NODE = 9
const DOCUMENT_TYPE_NODE = 10 // <!doctype html>

class Node {
    constructor({tagName, nodeType, attrs, textContent, parentNode, childNodes}) {
        this.tagName = tagName
        this.nodeType = nodeType
        this.textContent = textContent
        this.parentNode = parentNode
        this.attrs = attrs
        this.childNodes = childNodes || []

        if (nodeType === ELEMENT_NODE) {
            if (attrs.id) this.id = attrs.id
            if (attrs.class) this.className = attrs.class
        }
    }
    appendChild(node) {
        if (node) {
            // ensure correct parentNode
            node.parentNode = this
            this.childNodes.push(node)
        }
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
    toJSON() {
        let json = {
            tagName: this.tagName,
            nodeType: this.nodeType
        }
        if (this.childNodes.length) json.childNodes = this.childNodes
        if (this.textContent) json.textContent = this.textContent
        if (this.attrs) json.attrs = this.attrs
        if (this.id) json.id = this.id
        if (this.className) json.className = this.className
        return json
    }
    getElementsByTagName(tagName) {

    }
    getElementsByClassName(className) {

    }
}

exports = module.exports = Node
exports.NODE_TYPE = {
    ELEMENT_NODE,
    TEXT_NODE,
    COMMENT_NODE,
    DOCUMENT_NODE,
    DOCUMENT_TYPE_NODE
}

class DoctypeNode extends Node {
    constructor(options) {
        super(options)
        this.id = undefined
        this.nodeType = DOCUMENT_TYPE_NODE
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
                if (node.nodeType !== ELEMENT_NODE) return false
                if (node.id === id) return (result = node)
                return (result = iterate(node.childNodes))
            })
            return result
        }
    }
}

exports.DoctypeNode = DoctypeNode
exports.DocumentNode = DocumentNode

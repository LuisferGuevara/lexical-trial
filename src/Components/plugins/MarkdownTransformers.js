"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYGROUND_TRANSFORMERS = exports.HR = void 0;
const markdown_1 = require("@lexical/markdown");
const LexicalHorizontalRuleNode_1 = require("@lexical/react/LexicalHorizontalRuleNode");
exports.HR = {
    dependencies: [LexicalHorizontalRuleNode_1.HorizontalRuleNode],
    export: (node) => {
        return (0, LexicalHorizontalRuleNode_1.$isHorizontalRuleNode)(node) ? "***" : null;
    },
    regExp: /^(---|\*\*\*|___)\s?$/,
    replace: (parentNode, _1, _2, isImport) => {
        const line = (0, LexicalHorizontalRuleNode_1.$createHorizontalRuleNode)();
        // TODO: Get rid of isImport flag
        if (isImport || parentNode.getNextSibling() != null) {
            parentNode.replace(line);
        }
        else {
            parentNode.insertBefore(line);
        }
        line.selectNext();
    },
    type: "element"
};
exports.PLAYGROUND_TRANSFORMERS = [
    exports.HR,
    ...markdown_1.ELEMENT_TRANSFORMERS,
    ...markdown_1.TEXT_FORMAT_TRANSFORMERS,
    ...markdown_1.TEXT_MATCH_TRANSFORMERS
];

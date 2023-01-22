// "use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("@lexical/code");
const markdown_1 = require("@lexical/markdown");
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const MarkdownTransformers_ts_1 = require("./MarkdownTransformers.ts");
function ActionsPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const handleMarkdownToggle = (0, react_1.useCallback)(() => {
        editor.update(() => {
            const root = (0, lexical_1.$getRoot)();
            const firstChild = root.getFirstChild();
            if ((0, code_1.$isCodeNode)(firstChild) && firstChild.getLanguage() === "markdown") {
                (0, markdown_1.$convertFromMarkdownString)(firstChild.getTextContent(), MarkdownTransformers_ts_1.PLAYGROUND_TRANSFORMERS);
            }
            else {
                const markdown = (0, markdown_1.$convertToMarkdownString)(MarkdownTransformers_ts_1.PLAYGROUND_TRANSFORMERS);
                root
                    .clear()
                    .append((0, code_1.$createCodeNode)("markdown").append((0, lexical_1.$createTextNode)(markdown)));
            }
            root.selectEnd();
        });
    }, [editor]);
    return (<div className="actions">
      <button className="action-button" onClick={handleMarkdownToggle} title="Convert From Markdown" aria-label="Convert from markdown">
        <i className="markdown"/>
      </button>
    </div>);
}
export default ActionsPlugin;

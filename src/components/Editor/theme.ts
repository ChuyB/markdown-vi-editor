import { EditorView, placeholder, drawSelection } from "@codemirror/view";
import { tags, tagHighlighter } from "@lezer/highlight";

export const highlight = tagHighlighter([
  {
    tag: tags.heading1,
    class: "heading h1",
  },
  {
    tag: tags.heading2,
    class: "heading h2",
  },
  {
    tag: tags.heading3,
    class: "heading h3",
  },
  {
    tag: tags.heading4,
    class: "heading h4",
  },
  {
    tag: tags.heading5,
    class: "heading h5",
  },
  {
    tag: tags.heading6,
    class: "heading h6",
  },
]);

export const theme = EditorView.theme({
  "&.cm-editor, .cm-editor": {
    backgroundColor: "transparent",
    height: "100%",
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
  ".cm-content": {
    whiteSpace: "pre-wrap",
  },
  ".cm-content, .cm-gutters": {
    fontFamily: "Poppins",
    fontSize: "1rem",
  },
  ".cm-cursor": {
    backgroundColor: "#fff",
    width: "1.3px",
    border: "none",
  },
  "& .cm-fat-cursor": {
    backgroundColor: "#fff !important",
  },
  "&:not(.cm-focused) .cm-fat-cursor": {
    background: "none !important",
    outline: "#fff solid 1px !important",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(255, 255, 255, 0.3) !important",
  },
  ".placeholder": {
    color: "#DCD7C9",
  },
  ".heading": {
    display: "inline-block",
    fontWeight: "700",
    marginBottom: "0.5em",
  },
  ".h1": {
    fontSize: "1.8rem",
  },
  ".h2": {
    fontSize: "1.6rem",
  },
  ".h3": {
    fontSize: "1.4rem",
  },
  ".h4": {
    fontSize: "1.3rem",
  },
  ".h5": {
    fontSize: "1.2rem",
  },
  ".h6": {
    fontSize: "1.1rem",
    fontWeight: "500",
  },
});

export const lineWrapp = EditorView.lineWrapping;

export const textPlaceholder = placeholder("Start typing...");

export const selection = drawSelection();

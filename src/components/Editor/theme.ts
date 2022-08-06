import {
  EditorView,
  placeholder,
  drawSelection,
  Decoration,
  WidgetType,
} from "@codemirror/view";
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
  ".cm-content, .cm-scroller": {
    fontFamily: "inherit",
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

class InlineImage extends WidgetType {
  constructor(readonly url: string) {
    super();
  }

  toDOM(): HTMLElement {
    let element: HTMLElement = document.createElement("img");
    element.setAttribute("url", this.url);
    element.className = "cm-inline-image";
    return element;
  }
}

export const lineWrapp = EditorView.lineWrapping;

export const textPlaceholder = placeholder("Start typing...");

export const selection = drawSelection();

export const inlineImage = Decoration.widget({
  widget: new InlineImage(
    "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  ),
});

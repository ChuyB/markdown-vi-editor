import {
  EditorView,
  placeholder,
  drawSelection,
  Decoration,
  WidgetType,
} from "@codemirror/view";
import { tags, tagHighlighter } from "@lezer/highlight";

export const colors = {
  white: "#fff",
  black: "#000",
  navy: "#2C3639",
  navyLight: "#3F4E4F",
  brown: "#A27B5C",
  sand: "#DCD7C9",
  purple: "#7F5283",
  green: "#76BA99",
  blue: "#256D85",
};

export const highlight = tagHighlighter([
  {
    tag: tags.content,
    class: "text",
  },
  {
    tag: tags.heading1,
    class: "text heading h1",
  },
  {
    tag: tags.heading2,
    class: "text heading h2",
  },
  {
    tag: tags.heading3,
    class: "text heading h3",
  },
  {
    tag: tags.heading4,
    class: "text heading h4",
  },
  {
    tag: tags.heading5,
    class: "text heading h5",
  },
  {
    tag: tags.heading6,
    class: "text heading h6",
  },
  {
    tag: tags.list,
    class: "decorator list-item",
  },
  {
    tag: tags.keyword,
    class: "decorator keyword",
  },
  {
    tag: [tags.processingInstruction, tags.inserted],
    class: "tags",
  },
  {
    tag: tags.strong,
    class: "strong",
  },
  {
    tag: [tags.function(tags.variableName), tags.labelName],
    class: "decorator definitions",
  },
  {
    tag: tags.string,
    class: "string",
  },
]);

export const theme = EditorView.theme({
  ".cm-placeholder": {
    display: "inline-block",
    marginLeft: "0.5em",
  },
  ".heading": {
    display: "inline-block",
    fontWeight: "700",
    margin: "0.5em 0",
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
  ".list-item.tags": {
    display: "inline-block",
    margin: "0.2em 0 0.2em 1em",
  },
  ".keywords": {
    color: colors.purple,
  },
  ".strong": {
    fontWeight: "700",
  },
  ".definitions": {
    color: colors.blue,
  },
  ".string": {
    color: colors.green,
  },
});

class InlineImage extends WidgetType {
  constructor(readonly url: string) {
    super();
  }

  toDOM(): HTMLElement {
    const element: HTMLElement = document.createElement("img");
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

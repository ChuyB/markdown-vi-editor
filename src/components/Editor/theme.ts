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
    class: "text heading heading_1",
  },
  {
    tag: tags.heading2,
    class: "text heading heading_2",
  },
  {
    tag: tags.heading3,
    class: "text heading heading_3",
  },
  {
    tag: tags.heading4,
    class: "text heading heading_4",
  },
  {
    tag: tags.heading5,
    class: "text heading heading_5",
  },
  {
    tag: tags.heading6,
    class: "text heading heading_6",
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
    class: "bold",
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

export const lineWrapp = EditorView.lineWrapping;

export const textPlaceholder = placeholder("Start typing...");

export const selection = drawSelection();

import styles from "./styles.module.scss";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { syntaxHighlighting } from "@codemirror/language";
import { tags, tagHighlighter } from "@lezer/highlight";
import { useEffect, useRef } from "react";

const highlighter = tagHighlighter([
  {
    tag: tags.heading,
    class: ".cm-heading",
  },
]);
const customTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    heigth: "100%",
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
  ".cm-gutters": {
    color: "#3F4E4F",
  },
  ".cm-line": {
    wordBreak: "break-word",
  },
  ".cm-content": {
    caretColor: "white",
    whiteSpace: "pre-line",
  },
  ".cm-content, .cm-gutters": {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',sans-serif",
    fontSize: "1.2em",
  },
  ".cm-gutters, .cm-activeLine, .cm-activeLineGutter": {
    backgroundColor: "transparent",
    border: "none",
  },
  "& .cm-fat-cursor": {
    backgroundColor: "#fff !important",
  },
  "&:not(.cm-focused) .cm-fat-cursor": {
    background: "none !important",
    outline: "#fff solid 0.8px !important",
  },
});

export default function Editor(): JSX.Element {
  const editorElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorElement.current == null) return;

    const initialState = EditorState.create({
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        vim(),
        customTheme,
        syntaxHighlighting(highlighter),
      ],
    });

    const view = new EditorView({
      state: initialState,
      parent: editorElement.current,
    });

    return () => view?.destroy();
  }, [editorElement.current]);

  return <div ref={editorElement} className={styles.Editor} />;
}

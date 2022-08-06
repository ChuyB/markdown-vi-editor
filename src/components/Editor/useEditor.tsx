import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { syntaxHighlighting } from "@codemirror/language";
import { RefObject, useEffect, useRef } from "react";
import {
  highlight,
  theme,
  lineWrapp,
  textPlaceholder,
  selection,
  inlineImage,
} from "./theme";

export function useEditor(): [
  RefObject<HTMLDivElement>,
  EditorView | undefined
] {
  const editorParentElement = useRef<HTMLDivElement>(null);

  let editorView: EditorView | undefined = undefined;

  useEffect(() => {
    if (editorParentElement.current == null) return;

    const initialState = EditorState.create({
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        vim(),
        theme,
        lineWrapp,
        textPlaceholder,
        selection,
        syntaxHighlighting(highlight),
      ],
    });

    editorView = new EditorView({
      state: initialState,
      parent: editorParentElement.current,
    });

    return () => editorView?.destroy();
  }, [editorParentElement.current]);

  return [editorParentElement, editorView];
}

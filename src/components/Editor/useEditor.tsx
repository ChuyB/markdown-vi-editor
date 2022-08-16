import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { syntaxHighlighting } from "@codemirror/language";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { highlight, lineWrapp, textPlaceholder, selection } from "./theme";

interface propsTypes {
  initialDoc: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function useEditor(
  props: propsTypes
): [RefObject<HTMLDivElement>, EditorView | undefined] {
  const editorParentElement = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | undefined>(
    undefined
  );
  const { initialDoc, setState } = props;
  let view: EditorView | undefined = undefined;

  useEffect(() => {
    if (editorParentElement.current == null) return;

    const initialState = EditorState.create({
      doc: initialDoc,
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        vim(),
        lineWrapp,
        textPlaceholder,
        selection,
        syntaxHighlighting(highlight),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            setState(update.state.toJSON().doc);
          }
        }),
      ],
    });

    view = new EditorView({
      state: initialState,
      parent: editorParentElement.current,
    });

    setEditorView(view);

    return () => view?.destroy();
  }, [editorParentElement.current]);

  return [editorParentElement, editorView];
}

import { createContext } from "react";
import { EditorValues } from "./types";

export const EditorStateContext = createContext<EditorValues>({
  editorState: undefined,
  setEditorState: () => undefined,
});

export interface EditorValues {
  editorState: string | undefined;
  setEditorState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export type Theme = "light" | "dark" | undefined;

export interface CurrentFile {
  path: string | undefined;
}

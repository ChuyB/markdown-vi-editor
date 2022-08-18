import "./styles.scss";
import { useEditor } from "./useEditor";
import { useContext, useEffect } from "react";
import { EditorStateContext } from "@/helpers/EditorStateContext";

export default function Editor(): JSX.Element {
  const { editorState, setEditorState } = useContext(EditorStateContext);
  const [ref, editorView] = useEditor({
    initialDoc: editorState,
    setState: setEditorState,
  });

  const setFocus = () => {
    editorView?.focus();
  };

  useEffect(() => {
    window.addEventListener("focus", setFocus);
    return () => window.removeEventListener("focus", setFocus);
  }, []);

  return <div ref={ref} className="Editor" />;
}

import "./styles.scss";
import { useEditor } from "./useEditor";
import { EditorValues } from "@/helpers/types";
import { useEffect } from "react";

export default function Editor(props: EditorValues): JSX.Element {
  const { state, setState } = props;
  const [ref, editorView] = useEditor({
    initialDoc: state,
    setState,
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

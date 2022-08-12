import "./styles.scss";
import { useEditor } from "./useEditor";
import { EditorValues } from "@/helpers/types";

export default function Editor(props: EditorValues): JSX.Element {
  const { state, setState } = props;
  const [ref, editorView] = useEditor({
    initialDoc: state,
    setState,
  });

  window.addEventListener("focus", () => {
    editorView?.focus();
  });

  return <div ref={ref} className="Editor light" />;
}

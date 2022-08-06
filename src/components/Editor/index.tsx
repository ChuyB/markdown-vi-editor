import styles from "./styles.module.scss";
import { useEditor } from "./useEditor";

export default function Editor(): JSX.Element {
  const [ref, editorView] = useEditor();

  window.addEventListener("focus", (e) => {
    editorView?.focus();
  });

  return <div ref={ref} className={styles.Editor} />;
}

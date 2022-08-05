import styles from "./styles.module.scss";
import { useEditor } from "./useEditor";

export default function Editor(): JSX.Element {
  const [ref, editorView] = useEditor();
  return <div ref={ref} className={styles.Editor} />;
}

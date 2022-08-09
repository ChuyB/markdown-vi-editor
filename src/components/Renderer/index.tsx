import styles from "./styles.module.scss";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

interface propsType {
  state: string;
}

export default function Renderer(props: propsType): JSX.Element {
  const state = micromark(props.state, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <div className={styles.Renderer}>
      <iframe srcDoc={state} />
    </div>
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkToc from "remark-toc";

import "katex/dist/katex.min.css";
import "./highlight.min.css";
import "./styles.scss";

interface propsType {
  state: string;
}

export default function Renderer(props: propsType): JSX.Element {
  const markdown = props.state;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkToc, emoji]}
      rehypePlugins={[
        [rehypeHighlight, { plainText: ["flow", "seq"] }],
        rehypeKatex,
      ]}
      className="Renderer"
    >
      {markdown}
    </ReactMarkdown>
  );
}

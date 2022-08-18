import { useContext } from "react";
import { EditorStateContext } from "@/helpers/EditorStateContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkToc from "remark-toc";

// @ts-ignore: Unreachable code error
import rehypeRaw from "rehype-raw";

import "katex/dist/katex.min.css";
import "./highlight.min.css";
import "./styles.scss";

export default function Renderer(): JSX.Element {
  const { editorState } = useContext(EditorStateContext);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkToc, emoji]}
      rehypePlugins={[
        [rehypeHighlight, { plainText: ["flow", "seq"], ignoreMissing: true }],
        rehypeKatex,
        rehypeRaw,
      ]}
      className="Renderer"
    >
      {editorState ? editorState : ""}
    </ReactMarkdown>
  );
}

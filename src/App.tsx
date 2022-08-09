import React, { useState } from "react";
import Preview from "./routes/Preview";
import Index from "./routes/Index";
import { Routes, Route } from "react-router-dom";
import { EditorStateContext } from "./helpers/EditorStateContext";

const App: React.FC = () => {
  const [editorState, setEditorState] = useState<string | undefined>();
  return (
    <EditorStateContext.Provider
      value={{ state: editorState, setState: setEditorState }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="preview" element={<Preview />} />
      </Routes>
    </EditorStateContext.Provider>
  );
};

export default App;

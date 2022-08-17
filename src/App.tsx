import "styles/global.scss";
import React, { useEffect, useState } from "react";
import Preview from "./routes/Preview";
import Index from "./routes/Index";
import { Routes, Route } from "react-router-dom";
import { EditorStateContext } from "./helpers/EditorStateContext";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    fileManager: {
      openFile: (callback: (event: string, value: string) => void) => void;
    };
    darkMode: {
      getTheme: () => boolean;
    };
  }
}

const App: React.FC = () => {
  const [editorState, setEditorState] = useState<string | undefined>("");
  const navigate = useNavigate();
  window.fileManager.openFile(async (event, value) => {
    await setEditorState(value);
    navigate("/preview");
  });

  return (
    <EditorStateContext.Provider value={{ editorState, setEditorState }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="preview" element={<Preview />} />
      </Routes>
    </EditorStateContext.Provider>
  );
};

export default App;

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
      getSaveFilePath: (
        callback: (event: string, value: string | number) => void
      ) => void;
      saveFile: (path: string | number, data: string) => void;
    };
    darkMode: {
      getTheme: () => boolean;
    };
    debug: {
      debug: (callback: (event: string, info: []) => void) => void;
    };
  }
}

const App: React.FC = () => {
  const [editorState, setEditorState] = useState<string | undefined>("");
  const [savePath, setSavePath] = useState<string | number | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    window.fileManager.openFile(async (event, value) => {
      await setEditorState(value);
      navigate("/preview");
    });

    window.fileManager.getSaveFilePath(async (event, value) => {
      const path = await value;
      setSavePath(path);
    });

    window.debug.debug((event, info) => {
      console.log(info);
    });
  }, []);

  useEffect(() => {
    if (savePath !== undefined)
      window.fileManager.saveFile(savePath, editorState ? editorState : "");
  }, [savePath]);

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

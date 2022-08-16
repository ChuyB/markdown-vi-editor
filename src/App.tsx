import "styles/global.scss";
import React, { useEffect, useState } from "react";
import Preview from "./routes/Preview";
import Index from "./routes/Index";
import { Routes, Route } from "react-router-dom";
import { EditorStateContext } from "./helpers/EditorStateContext";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [editorState, setEditorState] = useState<string | undefined>("");

  const navigate = useNavigate();
  const openFile = async (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "t") {
      const dialogConfig = {
        title: "Select a file",
        buttonLabel: "Open",
        properties: ["openFile"],
      };
      await window.fileManager.openDialog(
        "showOpenDialog",
        dialogConfig,
        (err, data) => {
          setEditorState(data);
          if (err) throw new Error(err);
        }
      );
      navigate("/preview");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", openFile);
    return () => document.removeEventListener("keydown", openFile);
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
